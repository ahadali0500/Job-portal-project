'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import { useGetData } from "@/app/utils/helper.api";
import { Skeleton } from 'primereact/skeleton';
import Plan from './Plan';

export default function Data() {
    const [activeTab, setActiveTab] = useState('Monthly');

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    }

    const { loading, data, error } = useGetData("fetch_packages.php");
    console.log(error, "hi");
    if (loading) {
        return (
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
                                    <Skeleton height="25rem" borderRadius="16px"></Skeleton>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <>
                <div className="section-full p-b90 site-bg-white tw-pricing-area">
                    <div className="container">
                        <div className="section-head left wt-small-separator-outer">
                            <h2 className="wt-title text-center">Choose Your Plan</h2>
                        </div>
                        <div className="section-content">
                            <div className="twm-tabs-style-1">
                                <ul className="nav nav-tabs" id="myTab3" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className={`nav-link ${activeTab === 'Monthly' ? 'active' : ''}`}
                                            type="button"
                                            onClick={() => handleTabClick('Monthly')}
                                        >
                                            Monthly
                                        </button>
                                    </li>
                                    {/* <li className="nav-item" role="presentation">
                                        <button
                                            className={`nav-link ${activeTab === 'Yearly' ? 'active' : ''}`}
                                            type="button"
                                            onClick={() => handleTabClick('Yearly')}
                                        >
                                            Yearly
                                        </button>
                                    </li> */}
                                </ul>
                                <div className="tab-content" id="myTab3Content">
                                    <div
                                        className={`tab-pane fade ${activeTab === 'Monthly' ? 'show active' : ''}`}
                                        id="home"
                                        role="tabpanel"
                                    >
                                        <div className="pricing-block-outer">
                                            <div className="row justify-content-center">
                                                {data.map((item, index) => {
                                                    console.log(item.comment);
                                                    if (item.type == "Monthly") {
                                                        const comment = JSON.parse(item.comment);
                                                        if (item.id != 1) {
                                                            return (
                                                                <>
                                                                    <Plan item={item} comment={comment} ></Plan>
                                                                </>
                                                            )
                                                        }
                                                    }
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className={`tab-pane fade ${activeTab === 'Yearly' ? 'show active' : ''}`}
                                        id="profile"
                                        role="tabpanel"
                                    >
                                        <div className="pricing-block-outer">
                                            <div className="row justify-content-center">
                                                {data.map((item, index) => {
                                                    if (item.type == "Yearly") {
                                                        const comment = JSON.parse(item.comment);
                                                        return (
                                                            <>
                                                                <Plan item={item} comment={comment} ></Plan>
                                                            </>
                                                        )
                                                    }
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
