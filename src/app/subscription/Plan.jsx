'use client'
import React, { useEffect, useRef, useState } from "react";
import Link from 'next/link';
import { useSession } from "next-auth/react";
import { Dialog } from 'primereact/dialog';
import Stripeform from "../components/CheckoutForm";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Toast } from "primereact/toast";
import { hasTimePassed, useGetDataPar, userplandata } from "../utils/helper.api";
import { API_URL } from "../utils/config";
import axios from "axios";

const stripePromise = loadStripe('pk_test_51P8HdbJUuIKY8I258ECQRr9u6AIWfqB2Y4Hx0IxqH8eHij7EiBZP2L6JLO6vbTA6DG58NQpz8XOL7JXWJlHUbf1L00YfbjvS9I');

export default function Plan({ item, comment }) {
  const { name, price } = item
  const { data: session, status } = useSession();
  const [visible, setVisible] = useState(false);
  const [subscribe, setsubscribe] = useState('');
  const [loading, setloading] = useState(false);
  const [userplan, setuserplan] = useState({});
  const toast = useRef(null);


  async function userplandetail() {
    try {
      const formData = new FormData();
      formData.append('user_id', session.user_id);
      formData.append('active', 1);
      const response = await axios.post(`${API_URL}/get_user_package.php`, formData);
      return response.data;
    } catch (e) {
      console.log("user plan detail fail", e);
      return null;
    }
  };




  useEffect(() => {
    if (subscribe != "") {
      toast.current.show({ severity: 'success', summary: subscribe, life: 6000 });
    }
  }, [subscribe])

  const subscr = async () => {
    setloading(true);
    const data = await userplandetail()
    if (data && data.code == 200) {
      setuserplan(data.response)
    }
    console.log(data.response);
    
    if (data && data.code == 200 && data.response.package_name == "Free" || hasTimePassed(data.response.expire_date) || (data.response.quiz_attempts== 0 && data.response.interview_attempts== 0)) {
        setloading(false)
        setVisible(true)
    } else {
      setloading(false)
      toast.current.show({ severity: 'error', summary: 'You have already subcribed a plan', life: 6000 })
    }
  }

  return (
    <div className="col-lg-4 col-md-6 m-b30">
      <div className="pricing-table-1">
        <div className="p-table-title">
          <h4 className="wt-title">{name}</h4>
        </div>
        <div className="p-table-inner">
          <div className="p-table-price">
            <span>${price}</span>
            <p>per Month</p>
          </div>
          <div className="p-table-list">
            <h4>Features</h4>
            <ul>
              {comment.map((dc, index) => (
                <li key={index}>
                  <i className="feather-check" />{dc}
                </li>
              ))}
            </ul>
          </div>
          {session && (
            <>
              <div className="p-table-btn">
                <button onClick={() => subscr()} className="site-button" >
                  {loading ? (
                    <div className="spinner-border text-white" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>) : (
                    `Subscribe`
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <Dialog header="Provide following details to subscribe plan " visible={visible} className="modal-popup"  onHide={() => setVisible(false)}>
        <Elements stripe={stripePromise}>
          <Stripeform setloading={setloading} userplandetailid={userplan.id} item={item} setVisible={setVisible} setsubscribe={setsubscribe}  ></Stripeform>
        </Elements>
      </Dialog>
      <Toast ref={toast} />
    </div>
  );
}
