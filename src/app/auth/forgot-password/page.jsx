import Breadcrumbs from "@/app/components/MineBreadcrumb";
import Link from "next/link";
import React from "react";
import Form from "./Form";
import { WEB_NAME } from "@/app/utils/config";

export const metadata = {
  title: `Forgot Password - ${WEB_NAME}`,
};

export default function page() {
  return (
    <>
      <Breadcrumbs name="Recover Password"></Breadcrumbs>
      <Form></Form>
    </>
  );
}
