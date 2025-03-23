import Breadcrumbs from "@/app/components/MineBreadcrumb";
import { WEB_NAME } from "@/app/utils/config";
import React from "react";

export const metadata = {
  title: `Term of Services - ${WEB_NAME}`,
};

export default function page() {
  return (
    <>
      <Breadcrumbs name="Term and Conditions"></Breadcrumbs>
      <div className="container mt-5 mb-5">
        <h2>How to convince recruiters and get your dream job</h2>
        <p>
            Please make sure you understand what rights you are claiming before you
            submit a DMCA takedown notice because it is a serious legal document.
            Consider whether you need legal advice. It's really important not to
            make false claims as this could have serious legal consequences.
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Integer tristique elit lobortis purus bibendum, quis dictum metus
            mattis. Phasellus posuere felis sed eros porttitor mattis. Curabitur
            massa magna, tempor in blandit id, porta in ligula. Aliquam laoreet nisl
            massa, at interdum mauris sollicitudin et.Harvel is a copyright
            protection platform for next-gen creators, crawling the web on a daily
            basis in order to find piracy links and copyright infringement of your
            content. I
        </p>
      </div>
    </>
  );
}
