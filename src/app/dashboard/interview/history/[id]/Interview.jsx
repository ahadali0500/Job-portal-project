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
import { copyText } from "@/app/utils/helper.api";


export default function Interview({ data, intTitle }) {
    console.log("hiiii",data);
    const { data: session, status } = useSession();
    const toast = useRef(null);
    const [visible, setVisible] = useState(false);
    const [currdata, setCurrdata] = useState(null);
    const [bottompopupexp, setbottompopupexp] = useState(false);
    const [bottompopuphistory, setbottompopuphistory] = useState(false);
    const [bottompopupinfo, setbottompopupinfo] = useState(false);



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

   

    const verify = () => {
        if (data[currdata].user_answers.length > 0) {
            console.log("hit");
            return true  
        }else{
            return false     
        }
    }

    const popup = (index) => {
        setVisible(true);
        setCurrdata(index)
    }

    const exp = () => {
        const vr = verify()
        if (vr) {
            setVisible(false)
            setbottompopupexp(true)
        }else{
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
        }else{
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
        }else{
            toast.current.show({ severity: 'info', summary: 'Unattempted Question', life: 6000 });

        }
    }
    const closeinfo = () => {
        setVisible(true)
        setbottompopupinfo(false)
    }
    const share = () => {

    }


 
    const copy = (text) => {
        const out = copyText(text)
        console.log("ok", out);
        if (out) {
          toast.current.show({ severity: 'success', summary: 'success', detail: 'Text copied to clipboard:' });
        }
      }


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
                                        <span style={{ backgroundColor: determineBadgeColor(item.type), color: 'white', padding: '5px 10px', borderRadius: '5px', width: '100px', fontSize: '14px' }} >{item.type}</span>
                                        <span style={{ fontSize: '17px', marginLeft: '10px' }}>Q{index + 1}: {item.question}</span>
                                    </div>
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            {currdata != null &&
                <>
                    <Dialog header={<span style={{ backgroundColor: determineBadgeColor(data[currdata].type), color: 'white', padding: '5px 10px', borderRadius: '5px', width: '100px', fontSize: '14px' }} >{data[currdata].type}</span>} visible={visible} className="modal-popup"  onHide={() => setVisible(false)}>
                        <p className="m-0">
                            {data[currdata].question}
                        </p>
                        <br></br>
                        <div className="mt-2 text-center" >
                            <i onClick={() => exp()} style={{ fontSize: '25px', cursor: 'pointer', color: '#003366' }} className="pi pi-reply ml-4"></i>
                            <i onClick={() => history()} style={{ fontSize: '25px', cursor: 'pointer', color: '#003366' }} className="pi pi-history ml-4"></i>
                            <i onClick={() => info()} style={{ fontSize: '25px', cursor: 'pointer', color: '#003366' }} className="pi pi-info-circle ml-4" ></i>
                            <i onClick={() => copy(data[currdata].question)} style={{ fontSize: '25px', cursor: 'pointer', color: '#003366' }} className="pi pi-copy ml-4"></i>
                        </div>
                    </Dialog>

                  
                   
                    <Dialog header="Explanation" visible={bottompopupexp} className="modal-popup"  onHide={closeexp}>
                        <h3>{data[currdata].question}</h3><br></br>
                        <p>{data[currdata].detail_answer}</p>
                    </Dialog>

                    <Dialog header="History" visible={bottompopuphistory} className="modal-popup"  onHide={closehistory}>
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

                    <Dialog header="" visible={bottompopupinfo} className="modal-popup"  onHide={closeinfo}>
                        <h3>{data[currdata].question}</h3><br></br>
                        {data[currdata].user_answers.length > 0 ? (
                            data[currdata].user_answers[data[currdata].user_answers.length-1].ai_res.split(/(?<=\.)\s/).map((item, index) => (
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
