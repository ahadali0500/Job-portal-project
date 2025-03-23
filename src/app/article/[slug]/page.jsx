import Breadcrumbs from "@/app/components/MineBreadcrumb";
import React from "react";
import Data from "./Data";
import "primeicons/primeicons.css";
import { API_URL, WEB_NAME } from "@/app/utils/config";
import "primeicons/primeicons.css";

export default async function Page({ params }) {
  const data = await getData(params.slug)
  console.log(data);
  if (!data.message) {
    return (
      <>
        <Breadcrumbs name={data.title}></Breadcrumbs>
        <Data data={data} ></Data>
      </>
    );
  } else {
    return (
      <>
        <center><h2>{data.message}</h2></center>
      </>
    );
  }

}


async function getData(params) {
  const res = await fetch(`${API_URL}/fetch_articles_detail.php?slug=${params}`, {
    method: 'GET',
    cache: 'no-store'
  })
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  return res.json()
}


export async function generateMetadata({ params }) {
  const data = await getData(params.slug)
  return {
    title:  `${data.title} - ${WEB_NAME}` ,
  }
}