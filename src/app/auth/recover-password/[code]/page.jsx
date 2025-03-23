import Breadcrumbs from "@/app/components/MineBreadcrumb";
import React from "react";
import "primeicons/primeicons.css";
import { API_URL, WEB_NAME } from "@/app/utils/config";
import "primeicons/primeicons.css";
import Form from "./Form";

export const metadata = {
  title: `Recover Password - ${WEB_NAME}`,
};

export default async function Page({ params }) {
  const data = await getData(params.code)
  console.log(data);
  if (data.code === 200) {
    return (
      <>
        <Breadcrumbs name="Recover Password"></Breadcrumbs>
        <Form params={params.code} ></Form>
      </>
    );
  } else {
    return (
      <>
        <center><h2 style={{ marginTop: '80px' }} >Link has been expired!</h2></center>
        <br></br><br></br>
      </>
    );
  }

}

async function getData(params) {
  const res = await fetch(`${API_URL}/recoverpasswordverify.php?code=${params}`, {
    method: 'GET',
    cache: 'no-store'
  })
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

