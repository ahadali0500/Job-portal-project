import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function Footer() {
    const { data: session, status } = useSession();
    const handleMailtoClick = () => {
      window.location.href = mailtoUrl;
    };
    const recipientEmail = 'info@desired-tech.com';
    const subject = 'Regarding your inquiry';
    const body = 'Dear recipient,';
    const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    
    <>
      <footer
        className="footer-dark"
        style={{ backgroundColor:'#003366' }}
      >
        <div className="container">
          {/* FOOTER BLOCKES START */}
          <div className="footer-top">
            <div className="row">
              <div className="col-lg-3 col-md-12">
                <div className="widget widget_about">
                  <div className="logo-footer clearfix">
                    <Link href="/">
                      <img width="150px" src="/image/logo/updatedwhitelogo.png" alt="" />
                    </Link>
                  </div>
                  <ul className="ftr-list">
                    <li>
                      <p>
                        <span>Email :</span>info@desired-tech.com
                      </p>
                    </li>
                    <li>
                      <p>
                        <span>Call :</span>(+92) 306 6001671
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-9 col-md-12">
                <div className="row">
                  <div className="col-lg-4 col-md-6 col-sm-6">
                    <div className="widget widget_services ftr-list-center">
                      <h3 className="widget-title">Useful Links</h3>
                      <ul>
                        <li>
                          <Link href="/pages/about-us">About us</Link>
                        </li>
                        <li>
                          <Link href="/pages/privacy-policy">
                            Privacy Policy
                          </Link>
                        </li>
                        <li>
                          <Link href="/pages/terms-of-services">
                            Terms of Services
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6">
                    <div className="widget widget_services ftr-list-center">
                      <h3 className="widget-title">Main Links</h3>
                      <ul>
                        <li>
                          <Link href="/">Home</Link>
                        </li>
                        {!session && (
                          <>
                            <li>
                              <Link href="/auth/signup">Signup</Link>
                            </li>
                          </>
                        )}
                         {session && (
                          <>
                            <li>
                              <Link href="/jobs">Jobs</Link>
                            </li>
                          </>
                        )}
                        <li>
                          <Link href="/subscription">Subscription</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6">
                    <div className="widget widget_services ftr-list-center">
                      <h3 className="widget-title">Quick Links</h3>
                      <ul>
                        <li>
                          <Link href="/pages/rate-us">Rate us</Link>
                        </li>
                        <li>
                          <Link href="/article">Article</Link>
                        </li>
                        <li>
                          <div style={{cursor:'pointer'}}  onClick={handleMailtoClick} href="/pages/contact-us">Contact us</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* FOOTER COPYRIGHT */}
          <div className="footer-bottom">
            <div className="footer-bottom-info">
              <div className="footer-copy-right">
                <span className="copyrights-text">
                  Copyright © 2024 by Desired Technology
                </span>
              </div>
              <ul className="social-icons">
                <li>
                  <Link href="" className="fab fa-facebook-f" />
                </li>
                <li>
                  <Link href="" className="fab fa-twitter" />
                </li>
                <li>
                  <Link href="" className="fab fa-instagram" />
                </li>
                <li>
                  <Link href="" className="fab fa-youtube" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
