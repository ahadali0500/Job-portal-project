'use client'
import React, { useRef, useState } from "react";
import Link from "next/link";
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { classNames } from 'primereact/utils';
import { register } from "@/app/utils/auth.api";
import { Toast } from 'primereact/toast';
import axios from "axios";
import { API_URL } from "@/app/utils/config";

export default function Form({params}) {
    const toast = useRef(null);
    const [Loading, setLoading] = useState(false);

    const [formDt, setFormDt] = useState({
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e, field) => {
        const { name, value } = e.target;
        setFormDt(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        // Perform validation
        let formValid = true;
        const newErrors = {};


        if (formDt.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long';
            formValid = false;
        }

        if (formDt.password !== formDt.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
            formValid = false;
        }

        setErrors(newErrors);

        if (formValid) {
            try {
                setLoading(true); // Set loading state to true

                const Data = new FormData();
                Data.append('password', formDt.password);
                Data.append('code', params);

                const response = await axios.post(`${API_URL}/recoverpassword.php`, Data);
                if (response.data.code==200) {
                    toast.current.show({ severity: 'success', detail: response.data.message, life: 6000 });
                }else{
                    toast.current.show({ severity: 'error', detail: response.data.message, life: 6000 });
                } 
            } catch (error) {
                toast.current.show({ severity: 'warn', detail: 'Oops! Try again later', life: 6000 });
                console.error('Error:', error);
            } finally {
                setLoading(false); // Reset loading state
            }
        }
    };

    return (
        <>
            <Toast ref={toast} />
            <div className="section-full site-bg-white">
                <div className="container-fluid">
                    <div className="row">
                    <div className="col-xl-3 col-lg-3 col-md-3"></div>
                        <div className="col-xl-6 col-lg-6 col-md-7">
                            <div className="twm-log-reg-form-wrap">
                                <div className="twm-log-reg-inner">
                                    <div className="twm-log-reg-head">
                                        <div className="twm-log-reg-logo">
                                            <span className="log-reg-form-title">
                                               Recover Password
                                            </span>
                                        </div>
                                    </div>
                                    <div className="twm-tabs-style-2">
                                        <div className="tab-content" id="myTab2Content">
                                            <div className="tab-pane fade show active" id="twm-login-candidate">
                                                <form onSubmit={handleSubmit}>
                                                    <div className="row">
                                                        
                                                        <div className="col-lg-12 mb-3" >

                                                            <Password
                                                                className={classNames({ 'p-invalid': errors.password, "w-full": true })}
                                                                placeholder="Password"
                                                                style={{ width: '100%' }}
                                                                name="password"
                                                                toggleMask
                                                                value={formDt.password}
                                                                promptLabel="Choose a password" weakLabel="Too simple" mediumLabel="Average complexity" strongLabel="Complex password"
                                                                onChange={handleChange} />
                                                            <span style={{ textAlign: 'left' }} className="p-error">{errors.password}</span>

                                                        </div>
                                                        <div className="col-lg-12 mb-3" >

                                                            <Password
                                                                className={classNames({ 'p-invalid': errors.confirmPassword, "w-full": true })}
                                                                toggleMask
                                                                placeholder="Confirm Password"
                                                                name="confirmPassword"
                                                                value={formDt.confirmPassword}
                                                                promptLabel="Choose a password" weakLabel="Too simple" mediumLabel="Average complexity" strongLabel="Complex password"
                                                                onChange={handleChange} />
                                                            <span style={{ textAlign: 'left' }} className="p-error">{errors.confirmPassword}</span>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="">
                                                                <button type="submit" className="site-button" disabled={Loading}>
                                                                    {Loading ? (
                                                                        <div className="spinner-border text-white" role="status">
                                                                            <span className="visually-hidden">Loading...</span>
                                                                        </div>) : (
                                                                        "Submit"
                                                                    )}
                                                                </button>
                                                            </div>
                                                        </div>
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
        </>
    );
}
