import React from "react";
import { SITE_URL } from "@/app/utils/config";

export default function Card({ index, title, color, data, slug, icon, detail }) {
        const handleDetailClick = () => {
            detail(data,title); 
        };
    return (
        <>
            <div style={{cursor:'pointer'}} onClick={handleDetailClick}  className="col-lg-4 col-md-6" key={index}>
                <div className="job-categories-block-2 m-b30">
                    <div className="twm-media">
                        <img src={`${SITE_URL}/images/tips_and_tricks/${icon}`} />
                    </div>
                    <div className="twm-content">
                        <h3><b>{title}</b></h3>
                    </div>
                </div>
            </div>
        </>
    );
}
