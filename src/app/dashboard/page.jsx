import React from "react";
import Breadcrumbs from "../components/MineBreadcrumb";
import Link from "next/link";
import { WEB_NAME } from "../utils/config";

export const metadata = {
  title: `Dashboard - ${WEB_NAME}`,
};

export default function page() {
  return (
    <>
      <Breadcrumbs name="Dashboard"></Breadcrumbs>
      <div className="container mt-7">
        <div className="twm-job-categories-section-2 m-b30">
          <div className="job-categories-style1 m-b30">
            <div className="row">

              <div className="col-lg-3 col-md-6">
                <Link href="/dashboard/resume">
                  <div className="job-categories-block-2 m-b30">
                    <div className="twm-media">
                      <img src="/image/other/write.png" ></img>
                    </div>
                    <div className="twm-content">
                      <h3><b>Resume</b></h3>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="col-lg-3 col-md-6">
                <Link href="/dashboard/quiz">
                  <div className="job-categories-block-2 m-b30">
                    <div className="twm-media">
                      <img src="/image/other/speech-bubble.png" ></img>
                    </div>
                    <div className="twm-content">
                      <h3><b>AI Quizzes</b></h3>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="col-lg-3 col-md-6">
                <Link href="/dashboard/interview">
                  <div className="job-categories-block-2 m-b30">
                    <div className="twm-media">
                      <img src="/image/other/interview.png" ></img>
                    </div>
                    <div className="twm-content">
                      <h3><b>AI Interview</b></h3>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="col-lg-3 col-md-6">
                <Link href="/dashboard/tips-and-tricks">
                  <div className="job-categories-block-2 m-b30">
                    <div className="twm-media">
                      <img src="/image/other/bulb.png" ></img>
                    </div>
                    <div className="twm-content">
                      <h3><b>Tips and Tricks</b></h3>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
