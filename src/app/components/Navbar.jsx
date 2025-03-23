"use client";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { Skeleton } from "primereact/skeleton";
import { signOut } from 'next-auth/react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { data: session, status } = useSession();
  const { push } = useRouter();
  const recipientEmail = 'info@desired-tech.com';
  const subject = 'Regarding your inquiry';
  const body = 'Dear recipient,';
  const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const [logoutval, setlogoutval] = useState('Logout');
  const toast = useRef(null);
  const accept = async () => {
    setlogoutval('Logging out..')
    try {
      await signOut({ redirect: false }).then(() => {
        toast.current.show({ severity: 'info', summary: 'success', detail: 'Logout successfully!', life: 3000 });
        setlogoutval('Logout')
        push("/auth/signin");
      });
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }
  const handleMailtoClick = () => {
    window.location.href = mailtoUrl;
  };
  
  const reject = () => {
    toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
  }
  const handleLogout = () => {
    confirmDialog({
      message: 'Are you sure to log out? Please confirm before proceeding?',
      icon: 'pi pi-info-circle',
      accept,
      reject
    });
  };
  if (status === "loading") {
    return (
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <Skeleton width="10rem" height="4rem" borderRadius="16px"></Skeleton>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            style={{ padding: "0px 0px 0px 85px" }}
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
          >
            <Skeleton
              height="2rem"
              className="mb-2"
              borderRadius="16px"
            ></Skeleton>
            <Skeleton
              width="10rem"
              height="4rem"
              className="ml-5"
              borderRadius="16px"
            ></Skeleton>
          </div>
        </div>
      </nav>
    );
  } else {
    return (
      <>
        <ConfirmDialog />
        <Toast ref={toast} />
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container">
            <Link href="/">
              <img
                style={{ width: "150px" }}
                src="/image/logo/updatedlogo.png"
                alt=""
              />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse navbarpad"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {!session && (
                  <>
                    <li className="nav-item nvpd">
                      <Link className="nav-link active" href="/">
                        Home
                      </Link>
                    </li>
                    <li className="nav-item nvpd">
                      <Link className="nav-link" href="/pages/about-us">
                        About us
                      </Link>
                    </li>
                    <li className="nav-item nvpd">
                      <Link className="nav-link" href="/subscription">
                        Subscription
                      </Link>
                    </li>
                    <li className="nav-item nvpd">
                      <Link className="nav-link" href="/article">
                        Article
                      </Link>
                    </li>
                    <li className="nav-item nvpd">
                      <Link className="nav-link" href="/auth/signup">
                        Signup
                      </Link>
                    </li>
                  </>
                )}
                {session && (
                  <>
                    <li className="nav-item nvpd">
                      <Link className="nav-link active" href="/">
                        Home
                      </Link>
                    </li>
                    <li className="nav-item nvpd">
                      <Link className="nav-link" href="/subscription">
                        Subscription
                      </Link>
                    </li>
                    <li className="nav-item nvpd">
                      <Link className="nav-link" href="/article">
                        Article
                      </Link>
                    </li>
                    <li className="nav-item nvpd">
                      <Link className="nav-link" href="/auth/profile">
                        Profile
                      </Link>
                    </li>
                    <li className="nav-item nvpd">
                      <Link className="nav-link" href="/history">
                        History
                      </Link>
                    </li>
                  </>
                )}
              </ul>
              {!session && (
                <>
                  <Link href="/auth/signin" className="site-button pd-m">
                    <i className="feather-briefcase" /> Get Started
                  </Link>
                </>
              )}
              {session && (
                <>
                  <div style={{ cursor: 'pointer' }} className="navbootbtn2 mr-3" onClick={handleLogout} dangerouslySetInnerHTML={{ __html: logoutval }} />
                  <Link href="/dashboard" className="site-button pd-m">
                    Dashboard
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      </>
    );
  }
}
