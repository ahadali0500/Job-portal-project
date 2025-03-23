'use client'
import React, { useRef, useState } from "react";
import { useGetData, copyText } from "@/app/utils/helper.api";
import { Skeleton } from "primereact/skeleton";
import Card from "./Card";
import { Tooltip } from "primereact/tooltip";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
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
import { WEB_URL } from "@/app/utils/config";

export default function Data() {
  const toast = useRef(null);
  const { loading, data } = useGetData("fetch_tips_and_tricks.php");
  const [detailData, setDetailData] = useState([]);
  const [detailtitle, setDetailTitle] = useState('');
  const [visible, setVisible] = useState(false);
  const [modaldata, setmodaldata] = useState('');
  const [dialoguecount, setdialoguecount] = useState(0);

  const modal = (index, tip) => {
    console.log(index, tip);
    setmodaldata(tip)
    setVisible(true)
  }

  const handlePrev = () => {
    let newCount = dialoguecount - 1;
    if (newCount < 1) {
      newCount = detailData.length - 1;
    }
    setdialoguecount(newCount);
  }

  const handleNext = () => {
    let newCount = dialoguecount + 1;
    console.log("hit", newCount);

    if (newCount > detailData.length - 1) {
      newCount = 0;
    }
    setdialoguecount(newCount);
  }
  const handleBack = () => {
    setDetailData([])
  }

  const copy = (text) => {
    const out = copyText(text)
    console.log("ok", out);
    if (out) {
      toast.current.show({ severity: 'success', summary: 'success', detail: 'Text copied to clipboard:' });
    }
  }
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
      <div className="container mt-7">
        <div className="twm-job-categories-section-2 m-b30">
          <div className="job-categories-style1 m-b30">
            <div className="row">
              {detailData.length <= 0 ? (
                data.map((item, index) => {
                  const tipsAndTricks = JSON.parse(item.tips_and_tricks);
                  return (
                    <Card
                      key={index}
                      index={index}
                      title={item.title}
                      color={item.color}
                      data={tipsAndTricks}
                      slug={item.slug}
                      icon={item.icon}
                      detail={() => {
                        setDetailData(tipsAndTricks);
                        setDetailTitle(item.title);
                      }}
                    />
                  );
                })
              ) : (
                <>
                  <Tooltip target=".dt" mouseTrack mouseTrackLeft={10} />
                  <button style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '130px' }} onClick={handleBack} className="site-button" ><i className="pi pi-arrow-left mt-1" style={{ marginBottom: '5px' }} />Back</button>
                  <center><h2>{detailtitle}</h2></center>
                  <div style={{ position: 'relative' }} className="job-card m-b30 mt-4" >
                    {detailData.map((item, subIndex) => (
                      <div
                        onClick={() => modal(subIndex, item.tip)}
                        className="dt"
                        data-pr-tooltip="Click to view to Tips"
                        style={{ padding: "10px", cursor: "pointer" }}
                        key={subIndex}
                      >
                        <i className="pi pi-arrow-right" style={{ fontSize: "16px" }}></i>
                        <span style={{ marginLeft: "15px" }}>
                          <strong>{item.title}</strong>
                        </span>
                        <i className="pi pi-question-circle ml-2" style={{ fontSize: "14px" }}></i>
                      </div>
                    ))}
                  </div>
                  <Dialog
                    header={
                      <center><img style={{ height: '70px', width: '70px' }} src="/image/other/light-bulb.png" ></img></center>
                    }
                    visible={visible} className="modal-popup"  onHide={() => setVisible(false)}>
                    <div style={{ display: 'flex' }} >
                      <strong className="ml-2 mt-1" >{detailData[dialoguecount].tip}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }} >
                      <div onClick={handlePrev} className="leftarrow" ><i className="pi pi-arrow-left" style={{ fontSize: '20px', marginTop: '5px' }}></i></div>
                      <div className="mt-2" ><i onClick={() => copy(detailData[dialoguecount].tip)} style={{ fontSize: '25px', cursor: 'pointer' }} className="pi pi-copy" ></i></div>
                      <div onClick={handleNext} className="leftarrow" ><i className="pi pi-arrow-right" style={{ fontSize: '20px', marginTop: '5px' }}></i></div>
                    </div>
                  </Dialog>
                </>
              )}
            </div>
          </div>
        </div>
        <Toast ref={toast} />
      </div>
    );
  }
}
