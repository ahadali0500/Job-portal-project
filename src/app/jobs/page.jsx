import React from "react";
import Breadcrumbs from "../components/MineBreadcrumb";
import { WEB_NAME } from "../utils/config";

export const metadata = {
  title: `Jobs - ${WEB_NAME}`,
};

export default function page() {
  return (
    <>
      <Breadcrumbs name="Jobs"></Breadcrumbs>
      <div className="section-full p-t120  p-b90 site-bg-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="product-filter-wrap d-flex justify-content-between align-items-center m-b30">
                <center>
                  <span className=" woocommerce-result-count-left">
                    Showing 2,150 jobs
                  </span>
                </center>
              </div>
              <div className="twm-jobs-list-wrap">
                <ul>
                  <li>
                    <div className="twm-jobs-list-style1 mb-5">
                      <div className="twm-media">
                        <img alt="#" src="images/jobs-company/pic1.jpg" />
                      </div>
                      <div className="twm-mid-content">
                        <a className="twm-job-title" href="job-detail.html">
                          <h4>
                            Senior Web Designer
                            <span className="twm-job-post-duration">
                              / 1 days ago
                            </span>
                          </h4>
                        </a>
                        <p className="twm-job-address">
                          1363-1385 Sunset Blvd Los Angeles, CA 90026, USA
                        </p>
                        <a
                          className="twm-job-websites site-text-primary"
                          href="https://themeforest.net/user/thewebmax/portfolio"
                        >
                          https://thewebmax.com
                        </a>
                      </div>
                      <div className="twm-right-content">
                        <div className="twm-jobs-category green">
                          <span className="twm-bg-green">New</span>
                        </div>
                        <div className="twm-jobs-amount">
                          $2500 <span>/ Month</span>
                        </div>
                        <a
                          className="twm-jobs-browse site-text-primary"
                          href="job-detail.html"
                        >
                          Browse Job
                        </a>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="twm-jobs-list-style1 mb-5">
                      <div className="twm-media">
                        <img alt="#" src="images/jobs-company/pic2.jpg" />
                      </div>
                      <div className="twm-mid-content">
                        <a className="twm-job-title" href="job-detail.html">
                          <h4>
                            Sr. Rolling Stock Technician
                            <span className="twm-job-post-duration">
                              / 15 days ago
                            </span>
                          </h4>
                        </a>
                        <p className="twm-job-address">
                          1363-1385 Sunset Blvd Los Angeles, CA 90026, USA
                        </p>
                        <a
                          className="twm-job-websites site-text-primary"
                          href="https://themeforest.net/user/thewebmax/portfolio"
                        >
                          https://thewebmax.com
                        </a>
                      </div>
                      <div className="twm-right-content">
                        <div className="twm-jobs-category green">
                          <span className="twm-bg-brown">Intership</span>
                        </div>
                        <div className="twm-jobs-amount">
                          $2500 <span>/ Month</span>
                        </div>
                        <a
                          className="twm-jobs-browse site-text-primary"
                          href="job-detail.html"
                        >
                          Browse Job
                        </a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
