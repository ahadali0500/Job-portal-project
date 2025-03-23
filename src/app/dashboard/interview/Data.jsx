'use client'
import React, { useEffect, useRef, useState } from "react";
import { Dialog } from 'primereact/dialog';
import { Sidebar } from 'primereact/sidebar';
import { InputTextarea } from "primereact/inputtextarea";
import axios from "axios";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import { API_URL } from "@/app/utils/config";
import { Toast } from 'primereact/toast';
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import { copyText } from "@/app/utils/helper.api";


export default function Data({ data, setintdata, intTitle }) {
    const { data: session, status } = useSession();
    const [showspeaker, setshowspeaker] = useState(false);
    const [showmike, setshowmike] = useState(false);
    const [isListening, setIsListening] = useState(false);

    const {transcript,resetTranscript,browserSupportsSpeechRecognition} = useSpeechRecognition();
    const toast = useRef(null);
    const [visible, setVisible] = useState(false);
    const [currdata, setCurrdata] = useState(null);
    const [seconds, setSeconds] = useState(40);
    const [isActive, setIsActive] = useState(false);
    const [bottompopupexp, setbottompopupexp] = useState(false);
    const [bottompopuphistory, setbottompopuphistory] = useState(false);
    const [bottompopupinfo, setbottompopupinfo] = useState(false);
    const [bottompopupshare, setbottompopupshare] = useState(false);
    const [bottompopupmike, setbottompopupmike] = useState(false);
    const [bottompopupans, setbottompopupans] = useState(false);
    const [answer, setanswer] = useState(transcript);
    const [apidata, setapidata] = useState({});
    const [answervalid, setanswervalid] = useState('');
    const [dbrecordid, setdbrecordid] = useState(null);
    const [ansloading, setansloading] = useState(false);

    console.log(data);

    // Function to determine the badge color based on the type
    function determineBadgeColor(type) {
        const colorMapping = {
            Technical: '#8BC34A',
            Conceptual: '#2196F3',
            Situational: '#4CAF50',
            Logical: '#FF9800',
        };
        return colorMapping[type] || 'transparent'; // Default to transparent if type not found
    }

    async function storedata() {
        try {
            const now = new Date();
            const timestamp = format(now, 'yyyy-MM-dd HH:mm:ss');
            const formData = new FormData();
            formData.append('user_id', session.user_id);
            formData.append('interview_questions', JSON.stringify(data));
            formData.append('topic', intTitle);
            formData.append('created_at', timestamp);
            const response = await axios.post(`${API_URL}/user_interview.php`, formData);
            setdbrecordid(response.data.interview_question_id)


        } catch (error) {
            // return error;
            console.log(error);
        }
    }

    async function updatedata() {
        try {
            const formData = new FormData();
            formData.append('interview_questions', JSON.stringify(data));
            formData.append('id', dbrecordid);
            const response = await axios.post(`${API_URL}/update_user_interview.php`, formData);
            setansloading(false)
            setanswer('')
            return response.data;

        } catch (error) {
            setansloading(false)
            // return error;
            console.log(error);
        }
    }


    function preprocessJsonString(jsonString) {
        jsonString = jsonString.trim(); // Remove leading/trailing whitespace
        jsonString = jsonString.replace(/```json|```/g, ''); // Remove Markdown ticks
        jsonString = jsonString.replace(/\n/g, ''); // Remove new lines to clean up the string further

        const jsonObjectMatch = jsonString.match(/{.*}/);
        return jsonObjectMatch ? jsonObjectMatch[0] : null;
    }

    async function checkInterviewAnswer() {
        setansloading(true)
        try {
            const body = JSON.stringify({
                model: "models/text-bison-001",
                contents: [{
                    parts: [{
                        text: `Craft a JSON object to encompass your views as "${intTitle}" on the answer of the interviewee during interview. The question posed was "${data[currdata].question}". This is classified as a "${data[currdata].type}" question. The interviewee's response was "${answer}". As "${intTitle}", which is aimed at diverse professional fields as specified by the user, ensure each response must closely follow a template ensuring clarity and adherence to guidelines for consistency. Specifically, for the interview answer response, present the comment on the interviewee's answer under the 'comment' key, give the percentage of accuracy to the interviewee's answer under the 'accuracy' key, and describe whether the answer is relevant to the given question under the 'relevance' key. Ensure that the key names 'comment', 'accuracy', 'answer', and 'relevance' are used without modification to maintain consistency across data handling.`
                    }]
                }]
            });


            const URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAO8MAGludzlMvzk8X6NCum0z8K7PoZvcg';

            const response = await axios.post(URL, body, {
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.status === 200) {
                const textWithQuestions = response.data.candidates[0].content.parts[0].text;
                const preprocessedResponse = preprocessJsonString(textWithQuestions);
                console.log(preprocessedResponse);
                const questionsJson = JSON.parse(preprocessedResponse);
                const newAnswer = {
                    user_res: answer,
                    ai_res: questionsJson.comment
                }
                setintdata(prevData => {
                    const updatedData = [...prevData];
                    if (updatedData[currdata]) {
                        const userAnswers = updatedData[currdata].user_answers ? [...updatedData[currdata].user_answers] : [];
                        updatedData[currdata].user_answers = [...userAnswers, newAnswer];
                    }
                    return updatedData;
                });
                setapidata(newAnswer);
            } else {
                console.log('HTTP Error:', response.status);
            }

        } catch (e) {
            console.log('An error occurred:', e);
        }
    }



    const verify = () => {
        if (data[currdata].user_answers.length > 0) {
            console.log("hit");
            return true
        } else {
            return false
        }
    }

    const popup = (index) => {
        setVisible(true);
        setCurrdata(index)
    }
    const mike = () => {
        setVisible(false)
        setbottompopupmike(true)
        setshowspeaker(true)
        setshowmike(false)
        setIsActive(false);
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(data[currdata].question);
            utterance.onend = () => {
                console.log("Finished speaking");
                setshowspeaker(false)
                setshowmike(true)
                setIsActive(true);
            };
            window.speechSynthesis.speak(utterance);
        } else {
            alert("Your browser doesn't support text-to-speech.");
        }

    }
    const closemike = () => {
        setVisible(true)
        setbottompopupmike(false)
        setshowspeaker(false)
        setSeconds(40)
        setIsActive(false);

    }
    const ans = () => {
        setVisible(false)
        setbottompopupmike(false)
        setbottompopupans(true)
        setSeconds(40)
        setIsActive(false);
    }
    const closeans = () => {
        setVisible(true)
        setbottompopupans(false)
        setansloading(false)

    }

    const formsubmit = async () => {
        if (answer == "") {
            setanswervalid('Answer is required!');
        } else {
            setanswervalid('')
            await checkInterviewAnswer()
            setbottompopupinfo(true)
            setbottompopupans(false)
        }
    }

    const exp = () => {
        const vr = verify()
        if (vr) {
            setVisible(false)
            setbottompopupexp(true)
        } else {
            toast.current.show({ severity: 'info', summary: 'Unattempted Question', life: 6000 });

        }
    }
    const closeexp = () => {
        setVisible(true)
        setbottompopupexp(false)
    }
    const history = () => {
        const vr = verify()
        if (vr) {
            setVisible(false)
            setbottompopuphistory(true)
        } else {
            toast.current.show({ severity: 'info', summary: 'Unattempted Question', life: 6000 });

        }
    }
    const closehistory = () => {
        setVisible(true)
        setbottompopuphistory(false)
    }
    const info = () => {
        const vr = verify()
        if (vr) {
            setVisible(false)
            setbottompopupinfo(true)
        } else {
            toast.current.show({ severity: 'info', summary: 'Unattempted Question', life: 6000 });

        }
    }
    const closeinfo = () => {
        setVisible(true)
        setbottompopupinfo(false)
    }
    const share = () => {

    }


    const handleChange = (e) => {
        const data = e.target.value;
        setanswer(data);
    }

    useEffect(() => {
        async function hit() {
            console.log("okkk");
            await storedata();
        }
        hit();
    }, [])

    useEffect(() => {
        async function hit() {
            console.log("okkk");
            await updatedata();
        }
        hit();

    }, [data])
   


    useEffect(() => {
        if (isActive) {
            if (!isListening) {
                resetTranscript()
                SpeechRecognition.startListening({ continuous: true });
                setIsListening(true);
            }
        } else {
            if (isListening) {
                SpeechRecognition.stopListening();
                setIsListening(false);
            }
        }

    }, [isActive])

    const stoprecording = () => {
        ans();
        closemike()
        setanswer(transcript)
    };

    const copy = (text) => {
        const out = copyText(text)
        console.log("ok", out);
        if (out) {
            toast.current.show({ severity: 'success', summary: 'success', detail: 'Text copied to clipboard:' });
        }
    }

    console.log(transcript);
    return (
        <>
            <Toast ref={toast} />
            <section className="container mt-4 mb-5">
                <div className="row">
                    {data.map((item, index) => (
                        <div onClick={() => popup(index)} key={index} style={{ cursor: "pointer" }} className="col-lg-12 mb-4">
                            <div className="box">
                                <h3 style={{ float: "left" }}>
                                    <div>
                                        <span style={{ backgroundColor: determineBadgeColor(item.type) }} className="custom-badges" >{item.type}</span>
                                        <span style={{ marginLeft: '10px' }} className="int-q">Q{index + 1}: {item.question}</span>
                                    </div>
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            {currdata != null &&
                <>
                    <Dialog header={<span style={{ backgroundColor: determineBadgeColor(data[currdata].type), color: 'white', padding: '5px 10px', borderRadius: '5px', width: '100px', fontSize: '14px' }} >{data[currdata].type}</span>} visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                        <p className="m-0">
                            {data[currdata].question}
                        </p>
                        <br></br>
                        <div className="mt-2 text-center" >
                            <i onClick={() => mike()} style={{ fontSize: '25px', cursor: 'pointer', color: '#003366' }} className="pi pi-microphone"></i>
                            <i onClick={() => exp()} style={{ fontSize: '25px', cursor: 'pointer', color: '#003366' }} className="pi pi-reply ml-4"></i>
                            <i onClick={() => history()} style={{ fontSize: '25px', cursor: 'pointer', color: '#003366' }} className="pi pi-history ml-4"></i>
                            <i onClick={() => info()} style={{ fontSize: '25px', cursor: 'pointer', color: '#003366' }} className="pi pi-info-circle ml-4" ></i>
                            <i onClick={() => copy(data[currdata].question)} style={{ fontSize: '25px', cursor: 'pointer', color: '#003366' }} className="pi pi-copy ml-4"></i>
                        </div>
                    </Dialog>

                    <Dialog header="" visible={bottompopupans} style={{ width: '50vw' }} onHide={closeans}>
                        <div className="form-group mb-3">
                            <div className="flex-auto">
                                <label className="font-bold block mb-2">Answer</label>
                                <InputTextarea
                                    name="answer"
                                    value={answer}
                                    onChange={handleChange}
                                    placeholder="Write answer...."
                                    className={`w-full ${answervalid != "" ? 'p-invalid' : ''}`}
                                />
                                {answervalid != "" && <p className="text-red-500">{answervalid}</p>}
                            </div>
                        </div>
                        <button onClick={() => formsubmit()} className="site-button" disabled={ansloading}>
                            {ansloading ? (
                                <div className="spinner-border text-white" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>) : (
                                "submit"
                            )}
                        </button>

                    </Dialog>
                    <Dialog header="" visible={bottompopupmike} style={{ width: '50vw' }} onHide={closemike}>
                        <h3>{data[currdata].question}</h3><br></br>
                        {showspeaker &&
                            <>
                                <center><img style={{ width: '100px' }} src="/image/other/speaker.gif" ></img></center>
                            </>
                        }
                        {showmike &&
                            <>
                                <center>
                                    {isListening &&
                                        <>
                                            <h3>listening......</h3>
                                            
                                        </>
                                    }
                                    <img style={{ width: '100px' }} src="/image/other/microphone.gif" ></img>
                                    <br></br>
                                    {transcript}
                                    <br></br>
                                    <button onClick={stoprecording} className="site-button" ><i className="pi pi-stop-circle" ></i> Stop</button>
                                </center>
                            </>
                        }
                    </Dialog>
                    <Dialog header="Explanation" visible={bottompopupexp} style={{ width: '50vw' }} onHide={closeexp}>
                        <h3>{data[currdata].question}</h3><br></br>
                        <p>{data[currdata].detail_answer}</p>
                    </Dialog>

                    <Dialog header="History" visible={bottompopuphistory} style={{ width: '50vw' }} onHide={closehistory}>
                        <h3>{data[currdata].question}</h3><br></br>
                        {data[currdata].user_answers.length > 0 ? (
                            data[currdata].user_answers.slice().reverse().map((item, index) => (
                                <div className="mb-4" key={index}>
                                    <div className="row mb-2" >
                                        <div className=" col-lg-1" ><img style={{ width: '22px' }} src="/image/other/user.png" /></div>
                                        <div className=" col-lg-11" >{item.user_res}</div>
                                    </div>
                                    <div className="row" >
                                        <div className="col-lg-1" ><img style={{ width: '90px' }} src="/image/other/robot.png" /></div>
                                        <div className="col-lg-11" >{item.ai_res}</div>
                                    </div>
                                    <br></br>
                                </div>
                            ))
                        ) : (
                            <p>No data available</p>
                        )}

                    </Dialog>

                    <Dialog header="" visible={bottompopupinfo} style={{ width: '50vw' }} onHide={closeinfo}>
                        <h3>{data[currdata].question}</h3><br></br>
                        {data[currdata].user_answers.length > 0 ? (
                            data[currdata].user_answers[data[currdata].user_answers.length - 1].ai_res.split(/(?<=\.)\s/).map((item, index) => (
                                <div className="mb-4" key={index}><b><i className="pi pi-arrow-right" ></i></b> {item}<br></br></div>
                            ))
                        ) : (
                            <p>No data available</p>
                        )}

                    </Dialog>





                </>
            }


        </>
    );
}