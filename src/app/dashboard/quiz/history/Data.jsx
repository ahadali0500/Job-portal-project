"use client";
import React, { useEffect, useState } from "react";
import "primeicons/primeicons.css";
import { useSession } from "next-auth/react";
import axios from "axios";
import { API_URL } from "@/app/utils/config";
import { Skeleton } from "primereact/skeleton";
import { timestamp } from "@/app/utils/helper.api";
import { Dialog } from 'primereact/dialog';
import Quiz from "./Quiz";

export default function Data() {
  const { data: session, status } = useSession();
  const [dt, setData] = useState([]);
  const [currentdata, setCurrentdata] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    async function fetchData() {
      if (!session?.user_id) return;  // Ensure user_id is present
      const formData = new FormData();
      formData.append('user_id', session.user_id);

      try {
        setLoading(true);
        const response = await axios.post(`${API_URL}/fetch_quiz.php`, formData);
        setData(response.data);
      } catch (e) {
        setError(e.toString());
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [session]);

  const dai = (item) => {
    setVisible(true)
     console.log(JSON.parse(item.quiz_detail));
     setCurrentdata(pre=>{

      const pur = {...pre};
      pur.data=JSON.parse(item.quiz_detail);
      pur.name=item.quiz_title
      pur.total_questions=item.total_questions
      pur.correct_answers=item.correct_answers
      pur.score=item.score
      return pur;
     })
  }

  if (status === "loading" || loading) {
    return (
      <>
        <div className="container mt-7">
          <div className="twm-job-categories-section-2 m-b30">
            <div className="job-categories-style1 m-b30">
              <div className="row">
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    style={{ marginBottom: "10px" }}
                    className="col-lg-4 col-md-6"
                  >
                    <Skeleton height="12rem" borderRadius="16px"></Skeleton>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <h2 className="text-center mt-5">Your Quizzes</h2>
      <section className="container mt-4 mb-5">
        <div className="row">
          {dt.slice().reverse().map((item, index) => (
            <div style={{cursor:'pointer'}} key={index} onClick={() => dai(item)} className="col-lg-4 mb-4">
              <div className="box">
                <h3 className="mb-4"><i className="pi pi-info-circle"></i> {item.quiz_title}</h3>
                <h5>Score: {item.score}%</h5> 
                <p>Completed on: {timestamp(item.created_at)}</p> 
              </div>
            </div>
          ))}
        </div>
      </section>

      <Dialog header={`Quiz Topic: ${currentdata.name} `} visible={visible} className="modal-popup"  onHide={() => setVisible(false)}>
          <Quiz data={currentdata.data} total_questions={currentdata.total_questions}  correct_answers={currentdata.correct_answers} score={currentdata.score} ></Quiz>
      </Dialog>
    </>
  );
}