import MineBreadcrumb from '@/app/components/MineBreadcrumb'
import React from 'react'
import Data from './Data'
import "primeicons/primeicons.css";
import { WEB_NAME } from '@/app/utils/config';

export const metadata = {
  title: `Quiz - ${WEB_NAME}`,
};

export default function page() {
  return (
    <>
       <MineBreadcrumb name="Quiz History" ></MineBreadcrumb>
       <Data></Data>
    </>
  )
}
