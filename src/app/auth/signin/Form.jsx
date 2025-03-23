'use client'
import React, { useRef, useState } from "react";
import Link from "next/link";
import { InputText } from 'primereact/inputtext';
import { Password } from "primereact/password";
import { signIn } from "next-auth/react";
import { Toast } from 'primereact/toast';
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";

export default function Form() {
    const toast = useRef(null);
    const router = useRouter();
    const [Loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
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

        if (!formData.password) {
            newErrors.password = "Password is required";
            formValid = false;
        }

        setErrors(newErrors);

        if (formValid) {
            try {
                setLoading(true);
                const signInResponse = await signIn("credentials", {
                    email: formData.email,
                    password: formData.password,
                    redirect: false,
                });
                if (signInResponse && signInResponse.error) {
                    const authres = Cookies.get('authres');
                    toast.current.show({ severity: 'error', summary: authres, life: 6000 });
                } else {
                    toast.current.show({ severity: 'success', summary: 'your account login succesfully', life: 6000 });
                    router.push("/");
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
                                        <span className="log-reg-form-title">Sign in to your account</span>
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
                                                    <div className="col-lg-12">
                                                        <div className=" mb-3">
                                                            <Password
                                                                name="password"
                                                                type="password"
                                                                className={`w-full ${errors.password ? 'p-invalid' : ''}`}
                                                                required=""
                                                                toggleMask
                                                                feedback={false}
                                                                placeholder="Password"
                                                                value={formData.password}
                                                                onChange={handleChange}
                                                            />
                                                            {errors.password && <small className="text-danger">{errors.password}</small>}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <button type="submit" className="site-button" disabled={Loading}>
                                                            {Loading ? (
                                                                <div className="spinner-border text-white" role="status">
                                                                    <span className="visually-hidden">Loading...</span>
                                                                </div>) : (
                                                                "Signin"
                                                            )}
                                                        </button>
                                                    </div>
                                                    <span className="text-center mt-2" >
                                                        Don't have an Account?
                                                        <Link href="/auth/signup"><b> Click here</b></Link>
                                                    </span>
                                                    <Link href="/auth/forgot-password" className="site-text-primary text-center"> Forgot Password</Link>
                                                    <br />
                                                    <br></br>
                                                    {/* <div  className="col-md-12 text-center">
                                                        <div className="form-group">
                                                            <span className="center-text-or">Or</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <button type="submit" className="log_with_facebook">
                                                                <i className="fab fa-facebook" />
                                                                Continue with Facebook
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
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
    );
}
