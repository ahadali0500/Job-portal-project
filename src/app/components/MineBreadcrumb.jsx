import Link from "next/link";
import React from "react";

export default function MineBreadcrumb(props) {
  return (
    <>
      <div className="wt-bnr-inr overlay-wraper bg-center" style={{ backgroundImage: "url(/images/banner/1.jpg)" }}>
        <div className="overlay-main site-bg-white opacity-01" />
        <div className="container">
          <div className="wt-bnr-inr-entry">
            <div className="banner-title-outer">
              <div className="banner-title-name">
                <h2 className="wt-title">{props.name}</h2>
              </div>
            </div>
            <div>
              <ul className="wt-breadcrumb breadcrumb-style-2">
                <li><Link href="/">Home</Link></li>
                <li>{props.name}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
