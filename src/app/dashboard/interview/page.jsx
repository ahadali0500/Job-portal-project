import MineBreadcrumb from '@/app/components/MineBreadcrumb'
import React from 'react'
import Form from './Form'
import "primeicons/primeicons.css";
import Interview from './Interview';
import { WEB_NAME } from '@/app/utils/config';

export const metadata = {
  title: `Interview - ${WEB_NAME}`,
};

export default function page() {
  return (
    <>
      <MineBreadcrumb name="AI Interview" ></MineBreadcrumb>
      <Form></Form>
    </>
  )
}
