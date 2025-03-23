'use client'
import Breadcrumbs from '@/app/components/MineBreadcrumb'
import React, { useRef } from 'react'
import Link from "next/link";
import Data from './Data';
import { Toast } from 'primereact/toast';
import { WEB_NAME } from '@/app/utils/config';

export default function page() {
    const toast = useRef(null);
  return (
    <>
      <Toast ref={toast} />
      <Breadcrumbs name="Resume" ></Breadcrumbs>
      <Data></Data>
    </>
  )
}
