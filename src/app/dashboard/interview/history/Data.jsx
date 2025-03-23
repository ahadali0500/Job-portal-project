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

export default function Data() {
    const { data: session, status } = useSession();
    const [dt, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            if (!session?.user_id) return;  // Ensure user_id is present
            const formData = new FormData();
            formData.append('user_id', session.user_id);

            try {
                setLoading(true);
                const response = await axios.post(`${API_URL}/fetch_user_interview.php`, formData);
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
            <h2 className="text-center mt-5">Your Interview</h2>
            <section className="container mt-4 mb-5">
                <div className="row">
                    {dt.slice().reverse().map((item, index) => (
                        <div style={{ cursor: 'pointer' }} key={index} className="col-lg-4 mb-4">
                            <Link href={`/dashboard/interview/history/${item.id}`} >
                                <div className="box">
                                    <h3 className="mb-4"><i className="pi pi-info-circle"></i> {item.topic}</h3>
                                    <p>Completed on: {timestamp(item.created_at)}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

        </>
    );
}