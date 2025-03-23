import React from 'react'
import MineBreadcrumb from '../components/MineBreadcrumb'
import Data from './Data'
import { WEB_NAME } from '../utils/config';

export const metadata = {
  title: `History - ${WEB_NAME}`,
};

export default function page() {
  
  return (
    <>
      <MineBreadcrumb name="Your History" ></MineBreadcrumb>
      <Data></Data>
    </>
  )
}
