'use client'
import { SITE_URL } from '@/app/utils/config';
import { useGetData } from '@/app/utils/helper.api';
import { Skeleton } from 'primereact/skeleton';
import React, { useState } from 'react'

export default function Templates({id, setid, setfolder, userplaninfo}) {
    const { loading, data } = useGetData("fetch_resume_templates.php");
console.log(userplaninfo);
    const check = (id, folder) => {
        setid(id)
        setfolder(folder)
    }

    console.log(data);
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
                                    <Skeleton height="15rem" borderRadius="16px"></Skeleton>
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
                <h3 className='text-center mt-5 mb-5' >Select any one template</h3>
                <div className=' row' >
                    {
                        data.map((item, index) => (
                            <>
                                <div onClick={item.package_id <= userplaninfo.package_id ? () => check(item.id, item.folder) : undefined}   style={{ border: '1px solid #003366', borderRadius: '5px', width:'32%', marginRight: '10px',  marginBottom: '20px' }} key={index} className={`col-lg-4 cursor-pointer  ${ item.package_id <= userplaninfo.package_id ? '' : 'item-containerss' } `} >
                                    {id == item.id ? <h3 style={{ padding: '15px', backgroundColor: '#13a523', color: 'white' }} className='text-center'>{item.name}  <i style={{ fontSize: '20px' }} className='pi pi-check-circle' ></i> </h3> : <h3 style={{ padding: '15px', color: '#003366' }} className='text-center'>{item.name } {id == item.id ? <i style={{ fontSize: '20px' }} className='pi pi-check-circle' ></i> : ''}</h3>}
                                    <img style={{ width: '350px', height: '450px' }} src={`${SITE_URL}/${item.thumbnail}`} ></img>
                                </div>
                             </>
                        ))
                    }

                </div>
            </>
        )

    }
}
