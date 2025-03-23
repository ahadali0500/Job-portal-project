'use client'
import React, { useRef, useState } from "react";
import Link from "next/link";
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import axios from "axios";
import { API_URL } from "@/app/utils/config";

export default function Form() {
    const toast = useRef(null);
    const [Loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formValid = true;
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = "Email is required";
            formValid = false;
        }
        setErrors(newErrors);
        if (formValid) {
            setLoading(true);
            try {
                const Data = new FormData();
                Data.append('email', formData.email);
                const response = await axios.post(`${API_URL}/recover.php`, Data);
                if (response.data.code==200) {
                    toast.current.show({ severity: 'success', detail: response.data.message, life: 6000 });
                }else{
                    toast.current.show({ severity: 'error', detail: response.data.message, life: 6000 });
                } 
            } catch (error) {
                const errorMessage = error.message;
                console.error("Custom error:", errorMessage);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="section-full site-bg-white">
            <Toast ref={toast} />
            <div className="container-fluid">
                <div className="row">
                <div className="col-xl-3 col-lg-3 col-md-3"></div>
                    <div className="col-xl-6 col-lg-6 col-md-7">
                        <div className="twm-log-reg-form-wrap">
                            <div className="twm-log-reg-inner">
                                <div className="twm-log-reg-head">
                                    <div className="twm-log-reg-logo">
                                        <h3>Enter your Email below, we will send you password reset mail.</h3>
                                    </div>
                                </div>
                                <div className="twm-tabs-style-2">
                                    <div className="tab-content" id="myTab2Content">
                                        <div className="tab-pane fade show active" id="twm-Signin-candidate">
                                            <form onSubmit={handleSubmit}>
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="form-group mb-3">
                                                            <InputText
                                                                name="email"
                                                                type="email"
                                                                required=""
                                                                className={` ${errors.email ? 'p-invalid' : ''}`}
                                                                placeholder="Email"
                                                                value={formData.email}
                                                                onChange={handleChange}
                                                            />
                                                            {errors.email && <small className="text-danger">{errors.email}</small>}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <button type="submit" className="site-button" disabled={Loading}>
                                                            {Loading ? (
                                                                <div className="spinner-border text-white" role="status">
                                                                    <span className="visually-hidden">Loading...</span>
                                                                </div>) : (
                                                                "Send Email"
                                                            )}
                                                        </button>
                                                    </div>
                                                    <span className="text-center mt-4" >
                                                        Don't have an Account?
                                                        <Link href="/auth/signup"><b> Click here</b></Link>
                                                    </span>
                                                    <br />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-3"></div>
                </div>
            </div>
        </div>
    );
}
