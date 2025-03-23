"use client";
import React, { useEffect, useState } from "react";
import "primeicons/primeicons.css";
import { useSession } from "next-auth/react";
import axios from "axios";
import { API_URL } from "@/app/utils/config";
import { Skeleton } from "primereact/skeleton";
import { timestamp } from "@/app/utils/helper.api";
import { Dialog } from 'primereact/dialog';
import Link from "next/link";
import Interview from "./Interview";

export default function Data({ param }) {
  const { data: session, status } = useSession();
  const [dt, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (!session?.user_id) return;  // Ensure user_id is present
      const formData = new FormData();
      formData.append('id', param);

      try {
        const response = await axios.post(`${API_URL}/fetch_interview.php`, formData);
        setData(response.data);
      } catch (e) {
        setError(e.toString());
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [session]);

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
                    className="col-lg-12 col-md-12"
                  >
                    <Skeleton height="6rem" borderRadius="16px"></Skeleton>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  } else {
    return (
      
      // console.log(dt[0])
      // console.log("alllllllllll",JSON.parse(dt[0].interview_questions))
      <>
        <Interview data={JSON.parse(dt[0].interview_questions)} intTitle={dt[0].topic} ></Interview>
      </>
    )
  }

}