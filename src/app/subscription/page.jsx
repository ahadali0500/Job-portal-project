import React from "react";
import Link from "next/link";
import Breadcrumbs from "../components/MineBreadcrumb";
import Data from "./Data";
import { WEB_NAME } from "../utils/config";

export const metadata = {
  title: `Subscription - ${WEB_NAME}`,
};

export default function page() {
  return (
    <>
      <Breadcrumbs name="subscription"></Breadcrumbs>
      <br></br>
      <Data></Data>
    </>
  );
}
