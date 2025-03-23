'use client'
import React, { useRef, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Toast } from 'primereact/toast';
import { addDaysToDate, getCurrentTimestamp } from '../utils/helper.api';
import { useSession } from "next-auth/react";
import axios from 'axios';
import { API_URL, WEB_URL } from '../utils/config';
import '@/app/components/payment.css'

function CheckoutForm({ item, setVisible, setsubscribe, userplandetailid }) {
  const { id, name, days, quiz_attempts, quiz_questions, interview_attempts, interview_questions, cv_template, price } = item
  const { data: session, status } = useSession();

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#424770",
        fontWeight: 500,
        fontSize: "18px",
        fontSmoothing: "antialiased",
        lineHeight: "3.5",
        padding: "15px 17px",
        backgroundColor: "#ffffff",  // Adding a light background color
        border: "2px solid grey",  // Attractive, subtle border
        borderRadius: "4px",  // Rounded corners for a modern look
        boxShadow: "0 4px 6px rgba(50,50,93,.1), 0 1px 3px rgba(0,0,0,.08)",  // Subtle shadow for depth
        "::placeholder": {
          color: "#aab7c4",
          fontStyle: "bold",
        },
        ':-webkit-autofill': {
          backgroundColor: "#fce883",
          // color: "#424770",
          fontSize: "18px",
        }
      },
      invalid: {
        color: "#9e2146",
        iconColor: "#9e2146",
        fontWeight: "bold",
        border: "2px solid #ff6347",  // More pronounced border color on error
      }
    },
    hidePostalCode: true
  };

  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setloading] = useState(false);


  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null)
    setloading(true)
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: card,
    });
    console.log(paymentMethod,"paymentMethod");
    if (error) {
      setloading(false)
      setError(error.message);
    } else {
      const paymentMethodId = paymentMethod.id;
      fetch(`${WEB_URL}/api/stripe/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentMethodId, price }),
      })
        .then(response => response.json())
        .then( async paymentConfirmation => {
          setloading(false)
          setError(null)
          setVisible(false)
           console.log(paymentConfirmation);
          if (paymentConfirmation.status.status === "succeeded") {


            try {
              const start_date = getCurrentTimestamp()
              const expire_date = addDaysToDate(start_date, days)
              const formData = new FormData();
              formData.append('user_id', session.user_id);
              formData.append('id', userplandetailid);
              formData.append('package_id', id);
              formData.append('package_name', name);
              formData.append('days', days);
              formData.append('quiz_attempts', quiz_attempts);
              formData.append('quiz_questions', quiz_questions);
              formData.append('interview_attempts', interview_attempts);
              formData.append('interview_questions', interview_questions);
              formData.append('cv_templates', cv_template);
              formData.append('active', 1);
              formData.append('start_date', start_date);
              formData.append('expire_date', expire_date);
              formData.append('transction_id', paymentConfirmation.status.payment_method);
              formData.append('price', price);
              const response = await axios.post(`${API_URL}/update_user_package.php`, formData);
              console.log(response.data);
            } catch (e) {
              console.log("user plan store fail", e);

            } finally {

            }


            setsubscribe("Plan subscribed successfuly");
          }
        })
        .catch(err => {
          setloading(false)
          setError(err.message);
        });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement  id="card-element" options={CARD_ELEMENT_OPTIONS} />
        <center>
          <button className='site-button mt-4' type="submit" disabled={!stripe}>
            {loading ? (
              <div className="spinner-border text-white" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>) : (
              `Pay $${price}`
            )}
          </button>
        </center>
        {error && <div className='text-danger mt-4' >{error}</div>}
      </form>
    </>

  );
}

export default CheckoutForm;
