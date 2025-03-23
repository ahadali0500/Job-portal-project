'use client'
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { classNames } from 'primereact/utils';
import { register } from "@/app/utils/auth.api";
import { Toast } from 'primereact/toast';
import { Calendar } from 'primereact/calendar';
import axios from "axios";
import { API_URL, SITE_URL } from "@/app/utils/config";
import { useSession } from "next-auth/react";
import { formatDatess } from "@/app/utils/helper.api";

export default function Form() {
    const toast = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [Loading, setLoading] = useState(false);
    const [Loadinguserinfo, setLoadinguserinfo] = useState(true);
    const [datauserinfo, setdatauserinfo] = useState([]);
    const { data: session, status } = useSession();

    console.log(datauserinfo);
    async function userinfo() {
        try {
            const formData = new FormData();
            formData.append('user_id', session.user_id);
            const response = await axios.post(`${API_URL}/user_info.php`, formData);
            setdatauserinfo(response.data)
            setFormDt(dt => ({
                ...dt,
                name: response.data[0].name,
                phone: response.data[0].phone,
                dob: formatDatess(response.data[0].date_of_birth),
                address: response.data[0].address,
                img: response.data[0].profile_image,
            }))
            setLoadinguserinfo(false)
            return response.data;
        } catch (e) {
            console.log("user plan detail fail", e);
            return null;
            setLoadinguserinfo(false)
        }
    };

    useEffect(() => {
        if (session && Loadinguserinfo) {
            userinfo()
        }
    }, [session])

    const [formDt, setFormDt] = useState({
        name: '',
        phone: '',
        dob: '',
        address: '',
        img: null,
    });
    console.log(formDt);
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


        setErrors(newErrors);

        if (formValid) {
            try {
                setLoading(true); // Set loading state to true

                const formData = new FormData();
                formData.append('name', formDt.name);
                formData.append('phone', formDt.phone);
                formData.append('date_of_birth', formDt.dob);
                formData.append('address', formDt.address);
                formData.append('image', selectedImage);
                formData.append('user_id', session.user_id);
                formData.append('profile_image', formDt.img);

                const response = await axios.post(`${API_URL}/update_user.php`, formData);
                if (response.data.code === 200) {
                    toast.current.show({ severity: 'success', summary: response.data.message, life: 6000 });
                } else if (response.data.code === 400) {
                    toast.current.show({ severity: 'info', summary: response.data.message, life: 6000 });
                } else {
                    toast.current.show({ severity: 'warn', summary: 'Oops! Try again later', life: 6000 });
                }
            } catch (error) {
                toast.current.show({ severity: 'warn', summary: 'Oops! Try again later', life: 6000 });
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
                                                Manage your profile
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
                                                                    backgroundImage: `url(${selectedImage instanceof File ? URL.createObjectURL(selectedImage) : !Loadinguserinfo && formDt.img != null ? `${SITE_URL}/user_data/user_${session.user_id}/images/${formDt.img}` : '/image/other/blank.jpg'})`,
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
                                                                className={classNames({ 'p-invalid': errors.phone, "w-full": true })}
                                                                placeholder="Enter your phone number"
                                                                type="phone"
                                                                name="phone"
                                                                value={formDt.phone}
                                                                onChange={handleChange} />
                                                            <span style={{ textAlign: 'left' }} className="p-error">{errors.phone}</span>

                                                        </div>

                                                        <div className="col-lg-12 mb-3">
                                                            <input
                                                                className={classNames({ 'p-invalid form-control': errors.dob, "w-full form-control": true })}
                                                                placeholder="Enter your date of birth (YYYY-MM-DD)"
                                                                type="date"
                                                                name="dob"
                                                                value={formDt.dob}
                                                                onChange={handleChange} />
                                                            <span style={{ textAlign: 'left' }} className="p-error">{errors.dob}</span>
                                                        </div>


                                                        <div className="col-lg-12 mb-3" >

                                                            <InputText
                                                                className={classNames({ 'p-invalid': errors.address, "w-full": true })}
                                                                placeholder="Enter your address"
                                                                type="address"
                                                                name="address"
                                                                value={formDt.address}
                                                                onChange={handleChange} />
                                                            <span style={{ textAlign: 'left' }} className="p-error">{errors.address}</span>

                                                        </div>


                                                        <div className="col-md-12">
                                                            <div className="">
                                                                <button type="submit" className="site-button" disabled={Loading}>
                                                                    {Loading ? (
                                                                        <div className="spinner-border text-white" role="status">
                                                                            <span className="visually-hidden">Loading...</span>
                                                                        </div>) : (
                                                                        "Save"
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
