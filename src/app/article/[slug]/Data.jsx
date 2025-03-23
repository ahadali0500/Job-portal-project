'use client'
import Breadcrumbs from "@/app/components/MineBreadcrumb";
import { SITE_URL, WEB_URL } from "@/app/utils/config";
import { copyText, timestamp } from "@/app/utils/helper.api";
import React, { useRef } from "react";
import {
    FacebookShareButton,
    FacebookIcon,
    WhatsappShareButton,
    WhatsappIcon,
    LinkedinIcon,
    LinkedinShareButton,
    TwitterShareButton,
    TwitterIcon
} from 'react-share';
import { Toast } from "primereact/toast";


export default function page({ data }) {

    const toast = useRef(null);
    const copy = (text) => {
        const out = copyText(text)
        console.log("ok", out);
        if (out) {
            toast.current.show({ severity: 'success', summary: 'success', detail: 'Text copied to clipboard:' });
        }
    }
    return (
        <>
            <div className="section-full  p-t120 p-b90 bg-white">
                <Toast ref={toast} />
                <div className="container">
                    <div className="section-content">
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-8 col-md-12">
                                <div className="blog-post-single-outer">
                                    <div className="blog-post-single bg-white">
                                        <div className="wt-post-info">
                                            <div className="wt-post-media m-b30">
                                                <img alt="" src={`${SITE_URL}/images/articles/${data.image}`} />
                                            </div>
                                            <div className="wt-post-title ">
                                                <div className="wt-post-meta-list">
                                                    <div className="wt-list-content post-date">
                                                        {timestamp(data.created_at)}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="wt-post-discription">
                                                <span dangerouslySetInnerHTML={{ __html: data.text }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <center>
                                <div style={{ display: 'fllex' }} >
                                    <FacebookShareButton
                                        url={`${WEB_URL}/article/${data.slug}`}
                                    >
                                        <FacebookIcon size={40} round={true} />
                                    </FacebookShareButton>
                                    <WhatsappShareButton style={{ padding: '2px' }}
                                        url={`${WEB_URL}/article/${data.slug}`}
                                    >
                                        <WhatsappIcon size={40} round={true} />
                                    </WhatsappShareButton>
                                    <LinkedinShareButton style={{ padding: '2px' }}
                                        url={`${WEB_URL}/article/${data.slug}`}
                                    >
                                        <LinkedinIcon size={40} round={true} />
                                    </LinkedinShareButton>
                                    <TwitterShareButton style={{ padding: '2px' }}
                                        url={`${WEB_URL}/article/${data.slug}`}
                                    >
                                        <TwitterIcon size={40} round={true} />
                                    </TwitterShareButton>
                                    <i onClick={() => copy(`${WEB_URL}/article/${data.slug}`)} style={{ fontSize: '25px', cursor: 'pointer', position: 'relative', top: '5px', left: '5px' }} className="pi pi-copy" ></i>
                                </div>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
