import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Dialog } from 'primereact/dialog';
import { countryValues } from "@/app/utils/helper.api";
import Select from 'react-select';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function ContactInfo({ contactData, handleChange, validationcontactErrors, setcontactData }) {
    console.log(contactData);

    const [phone, setPhone] = useState('');

    const handleOnChange = (value) => {
        setPhone(value);
        console.log(value);
    };

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            borderColor: validationcontactErrors.country ? 'red' : (state.isFocused ? '#003366' : provided.borderColor),
            boxShadow: state.isFocused && !validationcontactErrors.country ? '0 0 0 1px #003366' : provided.boxShadow,
            '&:hover': {
                borderColor: validationcontactErrors.country ? 'red' : (state.isFocused ? '#003366' : provided.borderColor),
            },
            height: '48px',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected
                ? '#003366'
                : state.isFocused
                    ? '#cce6ff'
                    : 'white',
            color: state.isSelected ? 'white' : 'black',
            ':active': {
                ...provided[':active'],
                backgroundColor: state.isSelected ? '#003366' : '#cce6ff',
            },
        }),
    };

    const countryOptions = countryValues.map(country => ({ value: country, label: country }));

    const [visible, setVisible] = useState(false);
    const [jobtitle, setjobtitle] = useState('');
    const [jobtitleerror, setjobtitleerror] = useState('');
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);

    const genrateairesponse = () => {
        if (contactData.current_position == "") {
            setVisible(false)
            inputRef.current.focus();
        } else {
            setLoading(true)
            async function generateResponse() {
                const requestBody = JSON.stringify({
                    model: "models/text-bison-001",
                    contents: [{
                        parts: [{
                            text: `Write concise, precise and effective short paragraph (without headings) on Bio description for resume as ${jobtitle}`
                        }]
                    }]
                });

                try {
                    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAO8MAGludzlMvzk8X6NCum0z8K7PoZvcg', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: requestBody,
                    });

                    const data = await response.json();
                    setLoading(false)
                    setcontactData((prevState) => ({
                        ...prevState,
                        bio: data.candidates[0].content.parts[0].text,
                    }));
                    setVisible(false)
                    setjobtitle(''), setjobtitleerror('')

                    //   console.log(data.candidates[0].content.parts[0].text);
                } catch (error) {
                    console.error('Error:', error);
                }
            }
            generateResponse()
        }
    }

    const AIwriter = () => {
        if (contactData.current_position == "") {
            inputRef.current.focus();
        } else {
            setVisible(true)
        }
    }
    return (
        <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-12">
                <div className="form-group mb-3">
                    <div className="flex-auto">
                        <label className="font-bold block mb-2">Name</label>
                        <InputText
                            name="name"
                            value={contactData.name}
                            onChange={(selectedOption) => handleChange(selectedOption, 'other')}
                            placeholder="Name"
                            className={`w-full ${validationcontactErrors.name ? 'p-invalid' : ''}`}
                        />
                        {validationcontactErrors.name && <p className="text-red-500"> {"Name " + validationcontactErrors.name} </p>}
                    </div>
                </div>
                <div className="form-group mb-3">
                    <div className="flex-auto">
                        <label className="font-bold block mb-2">Current Position</label>
                        <InputText
                            name="current_position"
                            ref={inputRef}
                            value={contactData.current_position}
                            onChange={(selectedOption) => handleChange(selectedOption, 'other')} placeholder="e.g Software Engineer"
                            className={`w-full ${validationcontactErrors.current_position ? 'p-invalid' : ''}`}
                        />
                        {validationcontactErrors.current_position && <p className="text-red-500">{"Current position " + validationcontactErrors.current_position}</p>}
                    </div>
                </div>
                <div className="form-group mb-3">
                    <div className="flex-auto">
                        <label className="font-bold block mb-2">Address</label>
                        <InputText
                            name="address"
                            value={contactData.address}
                            onChange={(selectedOption) => handleChange(selectedOption, 'other')}
                            placeholder="e.g Apartment 4B"
                            className={`w-full ${validationcontactErrors.address ? 'p-invalid' : ''}`}
                        />
                        {validationcontactErrors.address && <p className="text-red-500">{"Address " + validationcontactErrors.address}</p>}
                    </div>
                </div>
                <div className="form-group mb-3">
                    <div className="flex-auto">
                        <label className="font-bold block mb-2">Phone Number</label>
                        <PhoneInput
                            country={'us'}
                            name="phonenumber"
                            value={contactData.phonenumber}
                            onChange={(selectedOption) => handleChange(selectedOption, 'number')}
                             containerStyle={{ border: validationcontactErrors.phonenumber  ? '1px solid red' : '1px solid #ccc', borderRadius:'5px' }} // Validation style
                            inputStyle={{ height: '50px', width: '100%', border: '0px' }} // Adjust input height
                        />
                        {validationcontactErrors.phonenumber && <p className="text-red-500">{"Phone number " + validationcontactErrors.phonenumber}</p>}
                    </div>
                </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-12">
                <div className="form-group mb-3">
                    <div className="flex-auto">
                        <label className="font-bold block mb-2">Email</label>
                        <InputText
                            name="email"
                            value={contactData.email}
                            onChange={(selectedOption) => handleChange(selectedOption, 'other')}
                            placeholder="example@gmail.com"
                            className={`w-full ${validationcontactErrors.email ? 'p-invalid' : ''}`}
                            keyfilter="email"
                        />
                        {validationcontactErrors.email && <p className="text-red-500">{"Email " + validationcontactErrors.email}</p>}
                    </div>
                </div>

                <div className="form-group mb-3">
                    <div className="flex-auto">
                        <label className="font-bold block mb-2">Street</label>
                        <InputText
                            name="street"
                            value={contactData.street}
                            onChange={(selectedOption) => handleChange(selectedOption, 'other')}
                            placeholder="Street"
                            className={`w-full ${validationcontactErrors.street ? 'p-invalid' : ''}`}
                        />
                        {validationcontactErrors.street && <p className="text-red-500">{"Street " + validationcontactErrors.street}</p>}
                    </div>
                </div>

                <div className="form-group mb-3">
                    <div className="flex-auto">
                        <label className="font-bold block mb-2">Country</label>
                        <Select
                            placeholder="Select Country"
                            name="country"
                            value={contactData.country == "" ? null : { value: contactData.country, label: contactData.country }}
                            onChange={(selectedOption) => handleChange(selectedOption, 'country')}
                            options={countryOptions}
                            isSearchable
                            styles={customStyles}
                        />
                        {validationcontactErrors.country && <p className="text-red-500">{"Country " + validationcontactErrors.country}</p>}

                    </div>
                </div>
            </div>
            <div className="col-xl-12 col-lg-12 col-md-12">
                <div className="form-group mb-3">
                    <div className="flex-auto">
                        <label className="font-bold block mb-2">Bio</label>
                        <InputTextarea
                            name="bio"
                            rows={6}
                            value={contactData.bio}
                            onChange={(selectedOption) => handleChange(selectedOption, 'other')}
                            placeholder="About me"
                            className={`w-full ${validationcontactErrors.bio ? 'p-invalid' : ''}`}
                        />
                        {validationcontactErrors.bio && <p className="text-red-500">{"Bio " + validationcontactErrors.bio}</p>}
                    </div>
                    <Button onClick={() => AIwriter()} className="site-button" label="AI Writer" />
                </div>
            </div>
            <Dialog header="AI Writer" visible={visible} className="modal-popup" onHide={() => setVisible(false)}>
                <h3>What job are you applying for?</h3>
                <p className="m-0">
                    Tell us the job title of your desired job and we will generate a tailored profile section for that job title based on the rest of your resume.
                </p>
                <br></br>
                <div className="form-group mb-3">
                    <div className="flex-auto">
                        <InputText
                            name="jobtitle"
                            value={contactData.current_position}
                            onChange={(e) => { setjobtitle(e.target.value) }}
                            placeholder="Enter job title...." disabled
                            className={`w-full ${jobtitleerror ? 'p-invalid' : ''}`}
                        />
                        {jobtitleerror && <p className="text-red-500">{jobtitleerror}</p>}
                    </div>
                    <br></br>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }} >
                        <Button
                            className="site-button"
                            label="Cancel"
                            onClick={() => { setVisible(false), setjobtitle(''), setjobtitleerror('') }}
                        />
                        <Button
                            className="site-button"
                            label={loading ? 'loading...' : 'submit'}
                            disabled={loading}
                            onClick={genrateairesponse}
                        />
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
