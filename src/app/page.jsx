import Link from "next/link";
import ClickEventDemo from "./components/slider/Slider";
import Data from "./article/Homearticles";
import { WEB_NAME } from "./utils/config";

export const metadata = {
  title: `Home - ${WEB_NAME}`,
};


export default function Home() {
  return (
    <>
      <ClickEventDemo></ClickEventDemo>
      <div className="container mt-7">
        <h2 className="text-center mb-5" >Our Services</h2>
        <div className="twm-job-categories-section-2 m-b30">
          <div className="job-categories-style1 m-b30">
            <div className="row">

              <div className="col-lg-3 col-md-6">
                <div className="job-categories-block-2 m-b30">
                  <div className="twm-media">
                    <img src="/image/other/write.png" ></img>
                  </div>
                  <div className="twm-content">
                    <h3><b>Resume</b></h3>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="job-categories-block-2 m-b30">
                  <div className="twm-media">
                    <img src="/image/other/speech-bubble.png" ></img>
                  </div>
                  <div className="twm-content">
                    <h3><b>AI Quizzes</b></h3>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="job-categories-block-2 m-b30">
                  <div className="twm-media">
                    <img src="/image/other/interview.png" ></img>
                  </div>
                  <div className="twm-content">
                    <h3><b>AI Interview</b></h3>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="job-categories-block-2 m-b30">
                  <div className="twm-media">
                    <img src="/image/other/bulb.png" ></img>
                  </div>
                  <div className="twm-content">
                    <h3><b>Tips and Tricks</b></h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="section-full mt-5 mb-7 site-bg-white twm-explore-area2">
        <div className="container">
          <div className="section-content">
            <div className="twm-explore-content-2">
              <div className="row">
                <div className="col-lg-8 col-md-12">
                  <div className="twm-explore-content-outer2">
                    <div className="twm-explore-top-section">
                      <div className="twm-title-large">
                        <h2>Empower Your Career with Comprehensive Services </h2>
                        <p>
                          Unlock your potential with our suite of expert services. From valuable tips and tricks to professional resume assistance, interactive AI quizzes, and thorough interview preparation, we provide everything you need to excel in your career. Join us and take the next step towards success
                        </p>
                      </div>
                      <div className="twm-read-more">
                        <Link href="/pages/about-us/" className="site-button">
                          Read More
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
                <div className="col-lg-4 col-md-12">
                  <div className="twm-explore-media-wrap2">
                    <div className="twm-media">
                      <img src="/images/gir-large-2.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      <div className="section-full mt-5 site-bg-gray twm-about-1-area">
        <br></br><br></br>
        <div className="container">
          <div className="twm-about-1-section-wrap">
            <div className="row">
              <div className="col-lg-6 col-md-12">
                <div className="twm-about-1-section">
                  <div className="twm-media">
                    <img src="images/home-4/about/ab-1.png" alt="" />
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="twm-about-1-section-right">
                  {/* TITLE START*/}
                  <div className="section-head left wt-small-separator-outer">
                    <div className="wt-small-separator site-text-primary">
                      <div>About us</div>
                    </div>
                    <h2 className="wt-title">
                      Streamlined Career Development Journey.
                    </h2>
                  </div>
                  {/* TITLE END*/}
                  <ul className="description-list">
                    <li>
                      <i className="feather-check" />
                      Unlock career opportunities with ease.
                    </li>
                    <li>
                      <i className="feather-check" />
                      Craft impressive resumes tailored to your goals.
                    </li>
                    <li>
                      <i className="feather-check" />
                      Sharpen your interview skills with interactive quizzes.
                    </li>
                    <li>
                      <i className="feather-check" />
                      Stay ahead with expert tips and tricks for success.
                    </li>
                    <li>
                      <i className="feather-check" />
                      Navigate your career journey confidently with our guidance.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>




      <div
        className="section-full p-t120 p-b90 twm-how-it-work-area"
        style={{ backgroundImage: "url(/images/home-7/hiw-bg.jpg)" }}
      >
        <div className="container">
          {/* TITLE START*/}
          <div className="section-head center wt-small-separator-outer  content-white">
            <div className="wt-small-separator">
              <div>Working Process</div>
            </div>
            <h2 className="wt-title">Follow Our Steps, We Will Help You</h2>
          </div>
          {/* TITLE END*/}
          <div className="twm-how-it-work-section3">
            <div className="row">
              <div className="col-xl-4 col-lg-6 col-md-6">
                <div className="twm-w-process-steps-h-page-7">
                  <div className="twm-w-pro-top">
                    <div className="twm-media">
                      <span>
                        <img src="/images/work-process/icon1.png" alt="icon1" />
                      </span>
                    </div>
                    <span className="twm-large-number  text-clr-sky">01</span>
                  </div>
                  <h4 className="twm-title">Create an Account</h4>
                  <p>
                    Sign up quickly and securely to start your journey.
                  </p>
                </div>
              </div>
              <div className="col-xl-4 col-lg-6 col-md-6">
                <div className="twm-w-process-steps-h-page-7">
                  <div className="twm-w-pro-top">
                    <div className="twm-media">
                      <span>
                        <img src="/images/work-process/icon2.png" alt="icon1" />
                      </span>
                    </div>
                    <span className="twm-large-number text-clr-pink">02</span>
                  </div>
                  <h4 className="twm-title">Buy a Subscription</h4>
                  <p>
                    Unlock premium features with our affordable plans.
                  </p>
                </div>
              </div>
              <div className="col-xl-4 col-lg-6 col-md-6">
                <div className="twm-w-process-steps-h-page-7">
                  <div className="twm-w-pro-top">
                    <div className="twm-media">
                      <span>
                        <img src="/images/work-process/icon3.png" alt="icon1" />
                      </span>
                    </div>
                    <span className="twm-large-number  text-clr-green">03</span>
                  </div>
                  <h4 className="twm-title">Generate Resume & Take Interview Quiz</h4>
                  <p>
                    Build Your Resume & Prepare for Interviews.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Data></Data>
      <br></br><br></br>
    </>
  );
}
