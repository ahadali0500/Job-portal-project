import MineBreadcrumb from '@/app/components/MineBreadcrumb'
import React from 'react'
import Data from './Data'
import "primeicons/primeicons.css";
import { WEB_NAME } from '@/app/utils/config';

export const metadata = {
  title: `Interview details - ${WEB_NAME}`,
};

export default function page({params}) {
  return (
    <>
       <MineBreadcrumb  name="Interview History" ></MineBreadcrumb>
       <Data param={params.id}></Data>
    </>
  )
}
