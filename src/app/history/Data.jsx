'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { hasTimePassed, timestamp, useGetData } from "@/app/utils/helper.api";
import { Skeleton } from 'primereact/skeleton';
import { useSession } from "next-auth/react";
import { API_URL } from '../utils/config';
import axios from 'axios';

export default function Data() {
  const [activeTab, setActiveTab] = useState('current');
  const [currentloading, setcurrentloading] = useState(true);
  const [historyloading, sethistoryloading] = useState(true);
  const [current, setcurrent] = useState([]);
  const [history, sethistory] = useState([]);
  const { data: session, status } = useSession();
  
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  }

  console.log(current);
  console.log(history);

  async function userplandetail() {
    try {
      setcurrentloading(true);
      const formData = new FormData();
      formData.append('user_id', session.user_id);
      formData.append('active', 1);
      const response = await axios.post(`${API_URL}/get_user_package.php`, formData);
      setcurrentloading(false)
      setcurrent(response.data.response);
    } catch (e) {
      console.log("user plan details fail", e);
      setcurrentloading(false);
    }
  };

  async function userhistorydetail() {
    try {
      sethistoryloading(true);
      const formData = new FormData();
      formData.append('user_id', session.user_id);
      const response = await axios.post(`${API_URL}/fetch_user_package_history.php`, formData);
      sethistoryloading(false)
      sethistory(response.data);
    } catch (e) {
      console.log("user plan details fail", e);
      sethistoryloading(false);
    }
  };

  useEffect(() => {
    if (session) {
      userplandetail()
      userhistorydetail()
    }
  }, [session])


  return (
    <>
      <div className="section-full p-b90 mt-6 site-bg-white tw-pricing-area">
        <div className="container">
          <div className="section-head left wt-small-separator-outer">
            <h2 className="wt-title text-center">Your Subscription history</h2>
          </div>
          <div className="section-content">
            <div className="twm-tabs-style-1">
              <ul className="nav nav-tabs" id="myTab3" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${activeTab === 'current' ? 'active' : ''}`}
                    type="button"
                    onClick={() => handleTabClick('current')}
                  >
                    Current Plan Details
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${activeTab === 'old' ? 'active' : ''}`}
                    type="button"
                    onClick={() => handleTabClick('old')}
                  >
                    Plans History
                  </button>
                </li>
              </ul>
              <div className="tab-content" id="myTab3Content">
                <div
                  className={`tab-pane fade ${activeTab === 'current' ? 'show active' : ''}`}
                  id="home"
                  role="tabpanel"
                >
                  <div className="pricing-block-outer">
                    <div className="row justify-content-center">
                      {currentloading ? (
                        <div className="container mt-7">
                          <div className="twm-job-categories-section-2 m-b30">
                            <div className="job-categories-style1 m-b30">
                              <div className="row">
                                {[...Array(1)].map((_, index) => (
                                  <div
                                    key={index}
                                    style={{ marginBottom: "10px" }}
                                    className="col-lg-12 col-md-12"
                                  >
                                    <Skeleton height="5rem" borderRadius="16px"></Skeleton>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="table-responsive">
                            <table className="table twm-table table-striped table-borderless">
                              <thead>
                                <tr>
                                  <th>Package</th>
                                  <th>Days</th>
                                  <th>Resume</th>
                                  <th>Interview Attempts</th>
                                  <th>Interview Question</th>
                                  <th>Quiz Attempts</th>
                                  <th>Quiz Question</th>
                                  <th>Package starting date</th>
                                  <th>Package expiry date</th>
                                  <th>Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                    <td>{current.package_name}</td>
                                    <td>{current.days}</td>
                                    <td>{current.cv_templates}</td>
                                    <td>{current.interview_attempts}-Remaining</td>
                                    <td>{current.interview_questions}-Question</td>
                                    <td>{current.quiz_attempts}-Remaining</td>
                                    <td>{current.quiz_questions}-Question</td>
                                    <td>{timestamp(current.start_date)}</td>
                                    <td>{timestamp(current.expire_date)}</td>
                                  <td>{!hasTimePassed(current.expire_date) ? <><button className='badge bg-success' >Active</button></> : <><button className='badge bg-danger' >Expired</button></>}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className={`tab-pane fade ${activeTab === 'old' ? 'show active' : ''}`}
                  id="profile"
                  role="tabpanel"
                >
                  <div className="pricing-block-outer">
                    <div className="row justify-content-center">
                      {historyloading ? (
                        <div className="container mt-7">
                          <div className="twm-job-categories-section-2 m-b30">
                            <div className="job-categories-style1 m-b30">
                              <div className="row">
                                {[...Array(3)].map((_, index) => (
                                  <div
                                    key={index}
                                    style={{ marginBottom: "10px" }}
                                    className="col-lg-12 col-md-12"
                                  >
                                    <Skeleton height="5rem" borderRadius="16px"></Skeleton>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="table-responsive">
                            <table className="table twm-table table-striped table-borderless">
                              <thead>
                                <tr>
                                  <th>Package</th>
                                  <th>Days</th>
                                  <th>Resume</th>
                                  <th>Interview Attempts</th>
                                  <th>Interview Question</th>
                                  <th>Quiz Attempts</th>
                                  <th>Quiz Question</th>
                                  <th>Package starting date</th>
                                  <th>Package expiry date</th>
                                  <th>Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {history.map((item, index) => (
                                  <tr>
                                    <td>{item.package_name}</td>
                                    <td>{item.days}</td>
                                    <td>{item.cv_templates}</td>
                                    <td>{item.interview_attempts}-Remaining</td>
                                    <td>{item.interview_questions}-Question</td>
                                    <td>{item.quiz_attempts}-Remaining</td>
                                    <td>{item.quiz_questions}-Question</td>
                                    <td>{timestamp(item.start_date)}</td>
                                    <td>{timestamp(item.expire_date)}</td>
                                    <td>{history.length==index+1 ? <><button className='badge bg-success' >Active</button></> : <><button className='badge bg-danger' >Expired</button></>}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </>
                      )}
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
