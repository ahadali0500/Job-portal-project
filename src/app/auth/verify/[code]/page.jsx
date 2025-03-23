import Breadcrumbs from "@/app/components/MineBreadcrumb";
import React from "react";
import "primeicons/primeicons.css";
import { API_URL, WEB_NAME } from "@/app/utils/config";
import "primeicons/primeicons.css";

export const metadata = {
  title: `Verify - ${WEB_NAME}`,
};

export default async function Page({ params }) {
  const data = await getData(params.code)
    return (
      <>
        <Breadcrumbs name="Verifications"></Breadcrumbs>
        <center><h3 style={{ marginTop: '80px' }} >{data.message}</h3><span><img style={{width:'100px'}} src="/image/other/verified.png" ></img></span></center>
        <br></br><br></br>
      </>
    );
}


async function getData(params) {
  const res = await fetch(`${API_URL}/verify.php?code=${params}`, {
    method: 'GET',
    cache: 'no-store'
  })
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

