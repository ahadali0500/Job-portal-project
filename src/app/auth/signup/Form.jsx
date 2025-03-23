'use client'
import React, { useRef, useState } from "react";
import Link from "next/link";
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { classNames } from 'primereact/utils';
import { register } from "@/app/utils/auth.api";
import { Toast } from 'primereact/toast';
import { WEB_NAME } from "@/app/utils/config";

export const metadata = {
    title: `Signup - ${WEB_NAME}`,
};

export default function Form() {
    const toast = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [Loading, setLoading] = useState(false);
console.log(selectedImage);
    const [formDt, setFormDt] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreementChecked: false
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

        if (!formDt.name) {
            newErrors.name = 'Name is required';
            formValid = false;
        }

        if (!formDt.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formDt.email)) {
            newErrors.email = 'Invalid email address';
            formValid = false;
        }

        if (formDt.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long';
            formValid = false;
        }

        if (formDt.password !== formDt.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
            formValid = false;
        }

        if (!formDt.agreementChecked) {
            newErrors.agreementChecked = 'You must agree to the terms and privacy policy';
            formValid = false;
        }

        setErrors(newErrors);

        if (formValid) {
            try {
                setLoading(true); // Set loading state to true

                const formData = new FormData();
                formData.append('name', formDt.name);
                formData.append('email', formDt.email);
                formData.append('password', formDt.password);
                formData.append('image', selectedImage);

                const output = await register(formData);
                if (output.code === 200) {
                    setFormDt({
                        name: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                        agreementChecked: false
                    });
                    setSelectedImage(null)
                    toast.current.show({ severity: 'success', detail: 'Verification email has been sent to your email address!', life: 6000 });
                } else if (output.code === 400) {
                    let newErrors = {}
                    let formValid = true
                    newErrors.email = output.message;
                    formValid = false;
                    setErrors(newErrors)
                } else {
                    toast.current.show({ severity: 'warn', detail: 'Oops! Try again later', life: 6000 });
                }
            } catch (error) {
                toast.current.show({ severity: 'warn', detail: 'Oops! Try again later', life: 6000 });
                console.error('Error:', error);
            } finally {
                setLoading(false); // Reset loading state
            }
        }
    };


    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
        console.log(selectedImage)
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
                                                Create your Account
                                            </span>
                                        </div>
                                    </div>
                                    <div className="twm-tabs-style-2">
                                        <div className="tab-content" id="myTab2Content">
                                            <div className="tab-pane fade show active" id="twm-login-candidate">
                                                <form onSubmit={handleSubmit}>
                                                    <div className="row">
                                                        <center>
                                                            <div
                                                                style={{
                                                                    height: "150px",
                                                                    width: "150px",
                                                                    borderRadius: "50%",
                                                                    backgroundImage: `url(${selectedImage instanceof File ? URL.createObjectURL(selectedImage) : '/image/other/blank.jpg'})`,
                                                                    backgroundSize: "cover",
                                                                }}
                                                            ></div>
                                                            <div className="upload-btn-wrapper">
                                                                <button className="site-button button-sm mt-2">Upload Photo</button>
                                                                <input
                                                                    type="file"
                                                                    name="myfile"
                                                                    id="file-uploader"
                                                                    accept=".jpg, .jpeg, .png"
                                                                    onChange={handleImageChange}
                                                                />
                                                            </div>
                                                        </center>

                                                        <div className="col-lg-12 mb-3">

                                                            <InputText
                                                                className={classNames({ 'p-invalid': errors.name, "w-full": true })}
                                                                placeholder="Name"
                                                                name="name"
                                                                value={formDt.name}
                                                                onChange={handleChange} />
                                                            <span style={{ textAlign: 'left' }} className="p-error">{errors.name}</span>

                                                        </div>
                                                        <div className="col-lg-12 mb-3" >

                                                            <InputText
                                                                className={classNames({ 'p-invalid': errors.email, "w-full": true })}
                                                                placeholder="Email"
                                                                type="email"
                                                                name="email"
                                                                value={formDt.email}
                                                                onChange={handleChange} />
                                                            <span style={{ textAlign: 'left' }} className="p-error">{errors.email}</span>

                                                        </div>
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
                                                        <div className="col-lg-12 mb-3" >
                                                            <div className="twm-forgot-wrap">

                                                                <div className="form-check">
                                                                    <Checkbox inputId="Password4"
                                                                        checked={formDt.agreementChecked}
                                                                        onChange={(e) => setFormDt(prevState => ({ ...prevState, agreementChecked: e.checked }))} />
                                                                    <label htmlFor="Password4" className="p-checkbox-label rem-forgot ml-4">
                                                                        I agree to the <Link href="/pages/terms-of-services"><b>Terms of Services</b></Link> & <Link href="/pages/privacy-policy"><b>Privacy Policy</b></Link>
                                                                    </label>
                                                                </div><br></br>
                                                                <span style={{ textAlign: 'left' }} className="p-error">{errors.agreementChecked}</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="">
                                                                <button type="submit" className="site-button" disabled={Loading}>
                                                                    {Loading ? (
                                                                        <div className="spinner-border text-white" role="status">
                                                                            <span className="visually-hidden">Loading...</span>
                                                                        </div>) : (
                                                                        "Signup"
                                                                    )}
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <span className="text-center mt-3" >
                                                            Already have an Account
                                                            <Link href="/auth/signin">
                                                                <b> Click here</b>
                                                            </Link>
                                                        </span>
                                                        <br></br>
                                                        {/* <div className="col-md-12 text-center">
                                                            <div className="">
                                                                <span className="center-text-or">Or</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="">
                                                                <button type="submit" className="log_with_facebook">
                                                                    <i className="fab fa-facebook" />
                                                                    Continue with Facebook
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12 mt-3">
                                                            <div className="">
                                                                <button type="submit" className="log_with_google">
                                                                    <img src="/images/google-icon.png" alt="" />
                                                                    Continue with Google
                                                                </button>
                                                            </div>
                                                        </div> */}
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
