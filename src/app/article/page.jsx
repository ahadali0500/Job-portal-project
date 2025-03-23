import Breadcrumbs from "@/app/components/MineBreadcrumb";
import React from "react";
import Data from "./Data";
import "primeicons/primeicons.css";
import { WEB_NAME } from "../utils/config";

export const metadata = {
    title: `Articles - ${WEB_NAME}`,
};

export default function page() {
    return (
        <>
            <Breadcrumbs name="Articles"></Breadcrumbs>
            <Data></Data>
        </>
    );
}