'use client'
import React, { useRef, useState } from "react";
import Link from "next/link";
import { InputText } from 'primereact/inputtext';
import { Password } from "primereact/password";
import { signIn } from "next-auth/react";
import { Toast } from 'primereact/toast';
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import Quiz from "./Quiz";
import axios from "axios";
import Score from "./Score";
import { Dialog } from 'primereact/dialog';
import { API_URL } from "@/app/utils/config";
import { useSession } from "next-auth/react";
import { addDaysToDate, getCurrentTimestamp, hasTimePassed } from "@/app/utils/helper.api";

export default function Form() {
    const toast = useRef(null);
    const router = useRouter();
    const { data: session, status } = useSession();
    const [visible, setVisible] = useState(false);
    const [reject, setreject] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [Loadingmsg, setLoadingmsg] = useState('');
    const [mcqdata, setmcqdata] = useState([]);
    const [userplaninfo, setuserplaninfo] = useState([]);
    const [formData, setFormData] = useState({
        question: "",
    });
    const [errors, setErrors] = useState({});
    console.log(formData.question);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };




    function preprocessJsonString(jsonString) {
        const explanationPattern = /"explanation":\s*"([^"]+)"/g;
        return jsonString.replace(explanationPattern, (match, p1) => {
            const preprocessedExplanation = p1.replace(/"/g, '\\"');
            return `"explanation": "${preprocessedExplanation}"`;
        });
    }

    function cleanJSONString(jsonString) {
        // Remove any leading characters that are not part of a valid JSON structure
        const cleanedString = jsonString.replace(/^[^{\[]+/, '').replace(/[`]+/g, '');
        return cleanedString;
    }

    async function userplandetail() {
        try {
            const formData = new FormData();
            formData.append('user_id', session.user_id);
            formData.append('active', 1);
            const response = await axios.post(`${API_URL}/get_user_package.php`, formData);
            setuserplaninfo(response.data);
            return response.data;
        } catch (e) {
            console.log("user plan details fail", e);
            return e;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formValid = true;
        const newErrors = {};

        if (!formData.question) {
            newErrors.question = "Write Quiz Topic!";
            formValid = false;
        }

        setErrors(newErrors);

        if (formValid) {
            try {
                setLoading(true);
                setLoadingmsg('validating package...')
                const data = await userplandetail()
                console.log(data.response);
                if (data.code == 200) {
                    if (hasTimePassed(data.response.expire_date)) {
                        if (data.response.package_id == 1) {
                            try {
                                const formData = new FormData();
                                formData.append('user_id', session.user_id);
                                formData.append('type', "Free");
                                formData.append('id', data.response.id);
                                const response = await axios.post(`${API_URL}/manage_package.php`, formData);
                                if (response.data.code == 200) {
                                    await generateQuizAndApply(data.response.quiz_questions, data.response);
                                }
                            } catch (e) {
                                console.log("user plan store fail", e);
                            }
                        } else {
                            try {
                                const formData = new FormData();
                                formData.append('user_id', session.user_id);
                                formData.append('type', "Purchase");
                                formData.append('id', data.response.id);
                                const response = await axios.post(`${API_URL}/manage_package.php`, formData);
                                if (response.data.code == 200) {
                                    toast.current.show({ severity: 'info', summary: "Your plan has been expired!", life: 6000 });
                                }
                            } catch (e) {
                                console.log("user plan store fail", e);
                            }
                        }
                    } else if (data.response.quiz_attempts > 0) {
                        await generateQuizAndApply(data.response.quiz_questions, data.response, formData.question);
                    } else {
                        toast.current.show({ severity: 'info', summary: "Your quiz attempts hase been completed!", life: 6000 });
                    }
                } else if (data.code == "ERR_BAD_REQUEST") {
                    toast.current.show({ severity: 'info', summary: "Kindly buy our subscrption to generate a quiz!", life: 6000 });
                }
            } catch (error) {
                const errorMessage = error.message;
                console.error("Custom error:", errorMessage);
            } finally {
                setLoading(false);
                setLoadingmsg('')

            }
        }
    };


    const generateQuizAndApply = async (quiz_questions, userinfo, question) => {
        console.log(userinfo, "generateQuizAndApply");
        console.log(question);
        setLoadingmsg('Generating Quiz...')
        const formData = new FormData();
        formData.append('id', userinfo.id);
        formData.append('quiz_attempts', userinfo.quiz_attempts - 1);
        formData.append('interview_attempts', userinfo.interview_attempts);

        const requestBody = JSON.stringify({
            model: "models/text-bison-001",
            "contents": [{
                parts: [{
                    text: `
                    generate a JSON object encompassing exactly ${quiz_questions} multiple-choice questions about '${question}', tailored to diverse professional fields specified by the user. Each question should closely follow the provided template for clarity and consistency.
                      
                      The JSON object should have the following structure:
                      {
                        "code": 200,
                        "questions": [
                          {
                            "type": "Type of question",
                            "difficulty": "Difficulty level",
                            "category": "Category",
                            "question": "The question text",
                            "correct_answer": "The correct answer",
                            "explanation": "A brief explanation of the correct answer",
                            "incorrect_answers": ["Incorrect answer 1", "Incorrect answer 2", "Incorrect answer 3"]
                          }
                        ]
                      }
                    
                      Guidelines:
                      - Maintain simplicity in presentation.
                      - Avoid using ordinal labels or numbers for choices.
                      - Ensure clear and consistent formatting across all questions.
                      - Generate all ${quiz_questions} questions in a single response without interruption.
                      - Ensure the JSON format is correct, without any special characters or spaces at the beginning or end.
                    `,
                }]
            }]
        });

        try {
            const response = await axios.post('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyBdDskMB_q9gdOj-LvzRCofvarZoFd9uCs', requestBody, {
                headers: { 'Content-Type': 'application/json' }
            });

            const jsonResponse = JSON.parse(response.data.candidates[0].content.parts[0].text);
            if (jsonResponse.code === 200) {
                const textWithQuestions = response.data.candidates[0].content.parts[0].text;
                const preprocessedResponse = textWithQuestions;
                const questionsJson = JSON.parse(preprocessedResponse);
                questionsJson['questions'].forEach(function (item) {
                    item.selected_answer = null;
                });
                await axios.post(`${API_URL}/update_user_package_attempts.php`, formData);
                setmcqdata(questionsJson['questions']);
            } else {
                var newErr={};
                newErr.question =  jsonResponse.message;
                setErrors(newErr);
            }

        } catch (error) {
            console.log(error);
            setVisible(true);
        }
    };

    return (
        <div className="section-full site-bg-white">
            <Toast ref={toast} />
            <div className="container-fluid">
                {!mcqdata.length > 0 ? (
                    <>
                        <Link href="/dashboard/quiz/history" ><button className="site-button mt-4 mb-4"><i className="pi pi-history"  ></i>Quiz History</button></Link>
                        <div className="row">
                            <div className="col-xl-3 col-lg-3 col-md-3"></div>
                            <div className="col-xl-6 col-lg-6 col-md-7">
                                <div className="twm-log-reg-form-wrap">
                                    <div className="twm-log-reg-inner">
                                        <div className="twm-log-reg-head">
                                            <div className="twm-log-reg-logo">
                                                <span className="log-reg-form-title">Test Prepartion</span>
                                            </div>
                                        </div>
                                        <div className="twm-tabs-style-2">
                                            <div className="tab-content" id="myTab2Content">
                                                <div className="tab-pane fade show active" id="twm-Signin-candidate">
                                                    <form onSubmit={handleSubmit}>
                                                        <div className="row">
                                                            <div className="col-lg-12">
                                                                <div className="form-group mb-3">
                                                                    <InputText
                                                                        name="question"
                                                                        type="question"
                                                                        required=""
                                                                        className={` ${errors.question ? 'p-invalid' : ''}`}
                                                                        placeholder="Search Quiz e.g Software Engineer"
                                                                        value={formData.question}
                                                                        onChange={handleChange}
                                                                    />
                                                                    {errors.question && <small className="text-danger">{errors.question}</small>}
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12">
                                                                <button type="submit" className="site-button" disabled={Loading}>
                                                                    {Loading ? (
                                                                        <><div className="spinner-border text-white" role="status">
                                                                            <span className="visually-hidden">Loading...</span>
                                                                        </div>  <span style={{position: 'relative',top: '-7px',left: '7px',fontSize: '18px'}} >{Loadingmsg}</span></>) : (
                                                                        "Start Quiz"
                                                                    )}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-3"></div>
                        </div>
                    </>
                ) : (
                    <Quiz data={mcqdata} setdata={setmcqdata} type="new" quizTitle={formData.question} ></Quiz>
                )
                }
            </div>
            <br></br>
            <Dialog header="Alert" visible={visible} className="modal-popup" onHide={() => setVisible(false)}>
                <p className="m-0">
                    We\'re not able to generate the quiz at the moment. Please wait a few moments and try again. We appreciate your patience and understanding.
                </p>
            </Dialog>
        </div>
    );
}



