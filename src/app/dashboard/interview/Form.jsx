'use client'
import React, { useRef, useState } from "react";
import Link from "next/link";
import { InputText } from 'primereact/inputtext';
import { Password } from "primereact/password";
import { signIn } from "next-auth/react";
import { Toast } from 'primereact/toast';
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import axios from "axios";
import { Dialog } from 'primereact/dialog';
import Interview from "./Interview";
import { API_URL } from "@/app/utils/config";
import { useSession } from "next-auth/react";
import { hasTimePassed } from "@/app/utils/helper.api";

export default function Form() {
    const toast = useRef(null);
    const router = useRouter();
    const { data: session, status } = useSession();
    const [visible, setVisible] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [Loadingmsg, setLoadingmsg] = useState('');
    const [intdata, setintdata] = useState([]);
    const [userplaninfo, setuserplaninfo] = useState({});

    const [formData, setFormData] = useState({
        question: "",
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    async function generateInterview(interview_questions, userinfo) {
        setLoadingmsg('Generating Question...')
        const requestBody = JSON.stringify({
            model: "models/gemini-1.5-flash",
            contents: [{
                parts: [{
                    text: `
                      Assess the input ${formData.question} to determine if it aligns with recognized professional fields or job titles suitable for creating a quiz.
                      - If it aligns, generate a JSON object encompassing exactly ${interview_questions} interview questions about ${formData.question}, aimed at diverse professional fields as specified by the user. Each question must closely follow a template ensuring clarity and adherence to guidelines for consistency. For interview questions, present the query, give a detailed answer (at least 50 words in one paragraph) to that question, and describe the type of that question in terms of Situational, Conceptual, Logical, or Technical.
                      - The JSON object should have the following structure:
                      {
                        "code": 200,
                        "questions": [
                          {
                            "question": "",
                            "type": "",
                            "detail_answer": ""
                          }
                        ]
                      }
                      - Guidelines:
                        - Ensure the JSON format is correct, without any special characters or spaces at the beginning or end.
                        - Maintain simplicity in presentation.
                        - Avoid using ordinal labels or numbers for choices.
                        - Ensure clear and consistent formatting across all questions.
                        - Generate all ${interview_questions} questions in a single response without interruption.
                        - Ensure the JSON format is correct, without any special characters or spaces at the beginning or end.
                      - If it does not align, return a JSON object:
                      {
                        "code": 400,
                        "message": "The provided input is not a valid professional field for quiz creation."
                      }
                    `,
                }]
            }]
        });

        try {
            const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyBdDskMB_q9gdOj-LvzRCofvarZoFd9uCs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: requestBody,
            });

            const jsonResponse = await response.json();
            const questionsJson = JSON.parse(jsonResponse.candidates[0].content.parts[0].text);
            console.log(questionsJson);
            if (questionsJson.code === 200) {
                console.log(questionsJson.questions);
                const newKeyValuePair = { user_answers: [] };
                const updatedArray = questionsJson.questions.map(obj => {
                    return { ...obj, ...newKeyValuePair };
                });
                setintdata(updatedArray)
                try {
                    const formData = new FormData();
                    formData.append('id', userinfo.id);
                    formData.append('quiz_attempts', userinfo.quiz_attempts);
                    formData.append('interview_attempts', userinfo.interview_attempts - 1);
                    const response = await axios.post(`${API_URL}/update_user_package_attempts.php`, formData);
                } catch (e) {
                    console.log("user plan store fail", e);

                }
            } else {
                var newErr={};
                newErr.question =  questionsJson.message;
                setErrors(newErr);
            }

        } catch (error) {
            // setVisible(true)
            console.error(error);
        }
    }



    function preprocessJsonString(jsonString) {
        return jsonString.replace(/"explanation":\s*"([^"]+)"/g, (match, explanation) => {
            const preprocessedExplanation = explanation.replace(/"/g, '\\"');
            return `"explanation": "${preprocessedExplanation}"`;
        });
    }
    async function userplandetail() {
        try {
            const formData = new FormData();
            formData.append('user_id', session.user_id);
            formData.append('active', 1);
            const response = await axios.post(`${API_URL}/get_user_package.php`, formData);
            console.log(response.data.response);
            setuserplaninfo(response.data.response)
            return response.data;
        } catch (e) {
            console.log("user plan detail fail", e);
            return e;
        }
    };

    // async function applyToGenerateInterview(interview_questions, userinfo) {
    //     const requestBody = JSON.stringify({
    //         model: "models/text-bison-001",
    //         contents: [{
    //             parts: [{
    //                 text: `Assess the input ${formData.question} to determine if it aligns with recognized professional fields or job titles suitable for creating a interview. The system should only validate inputs directly related to job roles or industries, such as HR, Manager, Supervisor, Software Engineer, Teacher, etc. For inputs that clearly match these criteria, return a JSON object (but not write json/JSON at the start) with {"code": 200, "message": "$formData.question is a valid topic for interview creation related to professional development.}. Conversely, if the input does not correspond to a professional field or contains random, non-specific words (e.g., "congrats", "hi"), it should trigger a response indicating the unsuitability of the input for interview creation: {"code": 400, "message": "The provided input is not a valid professional field for interview creation."}. This validation ensures that interviews are tailored to professional development, enhancing educational value and relevance.`,
    //             }]
    //         }]
    //     });

    //     try {
    //         const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyBdDskMB_q9gdOj-LvzRCofvarZoFd9uCs', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: requestBody,
    //         });

    //         const jsonResponse = await response.json();
    //         const parsedContent = JSON.parse(jsonResponse.candidates[0].content.parts[0].text);

    //         if (parsedContent.code === 200) {
    //             await generateInterview(interview_questions, userinfo);
    //             console.log("ok apply");

    //         } else {
    //             setVisible(true)
    //             console.log("nope");
    //             // showInvalidMessage(parsedContent.message);
    //         }
    //     } catch (error) {
    //         setVisible(true)
    //         console.error(error);
    //     }
    // }

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
                if (data.code == 200) {
                    console.log(hasTimePassed(data.response.expire_date));
                    if (hasTimePassed(data.response.expire_date)) {
                        if (data.response.package_id == 1) {
                            try {
                                const formData = new FormData();
                                formData.append('user_id', session.user_id);
                                formData.append('type', "Free");
                                formData.append('id', data.response.id);
                                const response = await axios.post(`${API_URL}/manage_package.php`, formData);
                                if (response.data.code == 200) {
                                    await generateInterview(data.response.interview_questions, data.response);
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
                    } else if (data.response.interview_attempts > 0) {
                        await generateInterview(data.response.interview_questions, data.response);
                    } else {
                        toast.current.show({ severity: 'info', summary: "Your interview attempts hase been completed!", life: 6000 });
                    }
                } else if (data.code == "ERR_BAD_REQUEST") {
                    toast.current.show({ severity: 'info', summary: "Kindly buy our subscrption to generate a interview!", life: 6000 });
                }
            } catch (error) {
                const errorMessage = error.message;
                console.error("Custom error:", errorMessage);
            } finally {
                setLoading(false);
                setLoadingmsg('validating package...')
            }
        }
    };
    return (
        <div className="section-full site-bg-white">
            <Toast ref={toast} />
            <div className="container-fluid">
                {!intdata.length > 0 ? (
                    <>
                        <Link href="/dashboard/interview/history" ><button className="site-button mt-4 mb-4"><i className="pi pi-history"  ></i>Interview History</button></Link>
                        <div className="row">
                        <div className="col-xl-3 col-lg-3 col-md-3"></div>
                            <div className="col-xl-6 col-lg-6 col-md-7">
                                <div className="twm-log-reg-form-wrap">
                                    <div className="twm-log-reg-inner">
                                        <div className="twm-log-reg-head">
                                            <div className="twm-log-reg-logo">
                                                <span className="log-reg-form-title">Interview Prepartion</span>
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
                                                                        placeholder="Search Interview Topic e.g Software Engineer"
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
                                                                        "Generate Question"
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
                    <Interview data={intdata} setintdata={setintdata} intTitle={formData.question} ></Interview>
                )
                }
            </div>
            <br></br>
            <Dialog header="Alert" visible={visible} className="modal-popup" onHide={() => setVisible(false)}>
                <p className="m-0">
                    We\'re not able to generate the Interview Question at the moment. Please wait a few moments and try again. We appreciate your patience and understanding.
                </p>
            </Dialog>
        </div>
    );
}



