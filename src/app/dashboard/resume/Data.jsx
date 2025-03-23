'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useSession } from "next-auth/react";
import { API_URL, SITE_URL } from '@/app/utils/config';
import axios from 'axios';
import Link from 'next/link';
import { Skeleton } from 'primereact/skeleton';
import { Toast } from 'primereact/toast';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
import { useRouter } from "next/navigation";
import { Tooltip } from 'primereact/tooltip';
        
export default function Data() {
    const { data: session, status, loading: sessionLoading } = useSession();
    const [data, setData] = useState([]);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [fetched, setfetched] = useState(false);
    const toast = useRef(null);

    const loadMoreData = async () => {
        try {
            setLoading(true);
            const formData = new FormData();
            if (session) {
                formData.append('user_id', session.user_id);
            } else {
                formData.append('user_id', "null");
            }
            const response = await axios.post(`${API_URL}/fetch_cv.php`, formData);
            setfetched(true)
            setData(response.data)
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const deletecv = async (id) => {
        try {
            const formData = new FormData();
            formData.append('id', id);
            const response = await axios.post(`${API_URL}/delete_cv.php`, formData);
            toast.current.show({
                severity: "success",
                detail: "Resume removed successfully",
                life: 6000,
            });
            const newData = data.filter(item => item.id !== id);
            setData(newData);
            setfetched(true)
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
        }
    };

    const viewcv = async (id, folder) => {
        window.open(`https://desired-techs.com/job-bank/resume/${folder}/index.php?id=${id}`,'_blank')
    };
    console.log(data);
    useEffect(() => {
        if (session && !fetched) {
            loadMoreData();
        }
    }, [session]);
    const menuLeft = useRef(null);
    function createMenuItems(itemId) {
        return [
            {
                label: 'Options',
                items: [
                    {
                        label: 'Edit',
                        icon: 'pi pi-file-edit',
                        command: () => {
                            router.push(`/dashboard/resume/update/${itemId}`)
                        }
                    },
                    {
                        label: 'Delete',
                        icon: 'pi pi-trash',
                        command: () => {
                           
                        }
                    },
                    {
                        label: 'View',
                        icon: 'pi pi-eye',
                        command: () => {
                            console.log("View item", itemId);
                        }
                    }
                ]
            }
        ];
    }
    const handleMenuToggle = (menuRef, position) => (event) => {
        menuRef.current.toggle(event);
    };
    return (
        <>
            <Toast ref={toast} />
            {loading ? (
                <>
                    <div className="section-full mt-5 p-b90 site-bg-white">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-12 col-lg-12 col-md-12 m-b30">
                                    <div className="twm-right-section-panel candidate-save-job site-bg-gray">
                                        <div className="product-filter-wrap d-flex justify-content-between align-items-center m-b30">
                                            <span className="woocommerce-result-count-left">
                                            </span>
                                            <Link style={{ float: 'right' }} href="/dashboard/resume/add" ><button className='site-button' >+ Resume</button></Link>
                                        </div>
                                        <div className="twm-candidates-grid-wrap">
                                            <div className="container mt-5">
                                                <div className="twm-job-categories-section-2 m-b30">
                                                    <div className="job-categories-style1 m-b30">
                                                        <div className="row">
                                                            {[...Array(6)].map((_, index) => (
                                                                <div
                                                                    key={index}
                                                                    style={{ marginBottom: "10px" }}
                                                                    className="col-lg-6 col-md-6"
                                                                >
                                                                    <Skeleton height="15rem" borderRadius="16px"></Skeleton>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="section-full mt-5  p-b90 site-bg-white">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-12 col-lg-12 col-md-12 m-b30">
                                    <div className="twm-right-section-panel candidate-save-job site-bg-gray">
                                        <div className="product-filter-wrap d-flex justify-content-between align-items-center m-b30">
                                            <span className="woocommerce-result-count-left">
                                                Showing {data.length} Resumes
                                            </span>
                                            <Link style={{ float: 'right' }} href="/dashboard/resume/add" ><button className='site-button' >+ Resume</button></Link>
                                        </div>
                                        <div className="twm-candidates-grid-wrap">
                                            <div className="row">
                                                {data.length < 1 &&
                                                    <>
                                                        <center>
                                                            <img style={{ width: '150px' }} src="/image/other/resume.jpeg" ></img>
                                                            <h4 className='mt-2' >Create a beautiful resume and score the job you\'ve always wanted</h4>
                                                        </center>
                                                    </>
                                                }
                                                {data.map((item, index) => (
                                                    
                                                    <div className="col-lg-6 col-md-6">
                                                        <div className="twm-candidates-grid-style1 mb-5">
                                                            <div className="twm-media">
                                                                <div className="twm-media-pic">
                                                                    {item.image != '' ?
                                                                        <img src={`${SITE_URL}/user_data/user_${session.user_id}/images/${item.image}`} alt="#" />
                                                                        :
                                                                        <img src={`/image/other/blank.jpg`} alt="#" />

                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="twm-mid-content">
                                                                <Link href="" className="twm-job-title">
                                                                    <h4>{item.fullName} </h4>
                                                                </Link>
                                                                <p>{item.currentPosition}</p>
                                                                <div className="twm-fot-content">
                                                                    <div className="twm-left-info">
                                                                        <p className="twm-candidate-address">
                                                                            <i className="feather-map-pin" />
                                                                            {item.country}
                                                                        </p>
                                                                        <div className="twm-jobs-vacancies">
                                                                            <div className="flex justify-content-center" style={{padding:'5px'}} >
                                                                                <Tooltip target=".trash" />
                                                                                <Tooltip target=".edit" />
                                                                                <i style={{padding:'0px 13px'}}  onClick={()=>deletecv(item.id)} className='pi pi-trash res-icon trash' data-pr-tooltip="delete" ></i>
                                                                                <i style={{padding:'0px 13px'}}  onClick={()=>{router.push(`/dashboard/resume/update/${item.id}`)}}className='pi pi-file-edit res-icon edit' data-pr-tooltip="edit" ></i>
                                                                                <i  style={{padding:'0px 13px'}} onClick={()=>viewcv(item.id, item.cv_temp)}  className='pi pi-eye res-icon' ></i>
                                                                                {/* <Toast ref={toast}></Toast>
                                                                                <Menu model={createMenuItems(item.id)} popup ref={menuLeft} id={"popup_menu_" + item.id} />
                                                                                <i style={{ cursor: 'pointer' }} onClick={handleMenuToggle(menuLeft, 'Left')} aria-controls={"popup_menu_" + item.id} aria-haspopup className='pi pi-ellipsis-v'></i> */}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
