import Breadcrumbs from "@/app/components/MineBreadcrumb";
import React from "react";
import Data from "./Data";
import "primeicons/primeicons.css";
import { WEB_NAME } from "@/app/utils/config";

export const metadata = {
    title: `Saved Articles - ${WEB_NAME}`,
};

export default function page() {
    return (
        <>
            <Breadcrumbs name="Saved Articles"></Breadcrumbs>
            <Data></Data>
        </>
    );
}