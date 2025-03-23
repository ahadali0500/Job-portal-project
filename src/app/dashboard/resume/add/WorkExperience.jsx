"use client";
import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";

export default function WorkExperience({
  handleChangeExperience,
  validationWorkExperienceErrors,
  workExperienceData,
  setWorkExperienceData,
}) {
  console.log(validationWorkExperienceErrors);

  const handleAppendDiv = () => {
    setWorkExperienceData((prevState) => [
      ...prevState,
      {
        experiencePlace: "",
        experienceLocation: "",
        EndDate: null,
        experienceTitle: "",
        StartDate: null,
        chkdata: false,
        experienceDescription: "",
      },
    ]);
  };

  const divdel = (index) => {
    setWorkExperienceData((prevState) => {
      return prevState.filter((_, i) => i !== index);
    });
  };

  const [visible, setVisible] = useState(false);
  const [jobtitle, setjobtitle] = useState('');
  const [jobtitleerror, setjobtitleerror] = useState('');
  const [Index, setIndex] = useState('');
  const [loading, setLoading] = useState(false);

  const genrateairesponse = () => {
    if (jobtitle == "") {
      setjobtitleerror("Job description is required!")
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

          setWorkExperienceData(prevState => {
            return prevState.map((item, index) => {
              if (index === Index) {
                return {
                  ...item,
                  experienceDescription: data.candidates[0].content.parts[0].text,
                };
              } else {
                return item;
              }
            });
          })

          setVisible(false)
          setjobtitleerror('')

          //   console.log(data.candidates[0].content.parts[0].text);
        } catch (error) {
          console.error('Error:', error);
        }
      }
      generateResponse()
    }
  }

  return (
    <>
      <center>
        <Button onClick={handleAppendDiv} className="site-button mb-4">
          <i className="pi pi-plus"></i>Add Work Experience
        </Button>
      </center>
      <Accordion activeIndex={0}>
        {workExperienceData.map((data, index) => (
          <AccordionTab
            key={index}
            header={
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  style={
                    validationWorkExperienceErrors[index] != null &&
                      (validationWorkExperienceErrors[index].experiencePlaceEmpty !==
                        "filled" ||
                        validationWorkExperienceErrors[index].experienceLocationEmpty !==
                        "filled" ||
                        validationWorkExperienceErrors[index].experienceTitleEmpty !==
                        "filled" ||
                        validationWorkExperienceErrors[index]
                          .experienceDescriptionEmpty !== "filled")
                      ? { color: "red" }
                      : {}
                  }
                >
                  Work Experience
                </div>
                <div>
                  <i
                    onClick={() => divdel(index)}
                    className="pi pi-trash text-danger"
                  />
                </div>
              </div>
            }
          >
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-12">
                <div className="form-group mb-3">
                  <label className="font-bold block mb-2">Company Name</label>
                  <InputText
                    placeholder="e.g Amazon, Micrsoft"
                    className={`w-full ${validationWorkExperienceErrors[index] != null &&
                      validationWorkExperienceErrors[index].experiencePlaceEmpty !=
                      "filled"
                      ? "border-red-500"
                      : ""
                      }`}
                    name="experiencePlace"
                    value={data.experiencePlace}
                    onChange={(e) => handleChangeExperience(e, index)}
                  />
                  {validationWorkExperienceErrors[index] != null
                    ? validationWorkExperienceErrors[index].experiencePlaceEmpty !=
                    "filled" && (
                      <p className="text-red-500">
                        {
                          validationWorkExperienceErrors[index]
                            .experiencePlaceEmpty
                        }
                      </p>
                    )
                    : null}
                </div>
                <div className="form-group mb-3">
                  <label className="font-bold block mb-2">Address</label>
                  <InputText
                    placeholder="Enter Street address"
                    className={`w-full ${validationWorkExperienceErrors[index] != null &&
                      validationWorkExperienceErrors[index].experienceLocationEmpty !=
                      "filled"
                      ? "border-red-500"
                      : ""
                      }`}
                    value={data.experienceLocation}
                    name="experienceLocation"
                    onChange={(e) => handleChangeExperience(e, index)}
                  />
                  {validationWorkExperienceErrors[index] != null
                    ? validationWorkExperienceErrors[index].experienceLocationEmpty !=
                    "filled" && (
                      <p className="text-red-500">
                        {validationWorkExperienceErrors[index].experienceLocationEmpty}
                      </p>
                    )
                    : null}
                </div>
                {!data.chkdata && (
                  <div className="form-group mb-3">
                    <label className="font-bold block mb-2">End Date</label>
                    <input
                      type="date"
                      placeholder="DD/MM/YY"
                      className={`w-full form-control ${validationWorkExperienceErrors[index] != null &&
                        validationWorkExperienceErrors[index].EndDateEmpty !=
                        "filled"
                        ? "border-red-500"
                        : ""
                        }`}
                      name="EndDate"
                      value={data.EndDate}
                      onChange={(e) => handleChangeExperience(e, index)}
                    /> {validationWorkExperienceErrors[index] != null
                      ? validationWorkExperienceErrors[index].EndDateEmpty !=
                      "filled" && (
                        <p className="text-red-500">
                          {validationWorkExperienceErrors[index].EndDateEmpty}
                        </p>
                      )
                      : null}
                  </div>
                )}
                <div className="form-group mb-3">
                  <Checkbox
                    name="chkdata"
                    disabled={data.StartDate === null ? true : false}
                    checked={data.chkdata}
                    onChange={(e) => handleChangeExperience(e, index)}
                  />
                  <span className="mt-1"> I currently working here</span>
                </div>
                {validationWorkExperienceErrors[index] != null
                  ? validationWorkExperienceErrors[index].numerousEmpty !=
                  "filled" && (
                    <p className="text-red-500">
                      {validationWorkExperienceErrors[index].numerousEmpty}
                    </p>
                  )
                  : null}
              </div>


              <div className="col-xl-6 col-lg-6 col-md-12">
                <div className="form-group mb-3">
                  <label className="font-bold block mb-2">Job Title</label>
                  <InputText
                    placeholder="e.g Software Engineer"
                    className={`w-full ${validationWorkExperienceErrors[index] != null &&
                      validationWorkExperienceErrors[index].experienceTitleEmpty !=
                      "filled"
                      ? "border-red-500"
                      : ""
                      }`}
                    value={data.experienceTitle}
                    name="experienceTitle"
                    onChange={(e) => {
                      handleChangeExperience(e, index);
                      setjobtitle(e.target.value);
                    }}
                  />
                  {validationWorkExperienceErrors[index] != null
                    ? validationWorkExperienceErrors[index].experienceTitleEmpty !=
                    "filled" && (
                      <p className="text-red-500">
                        {validationWorkExperienceErrors[index].experienceTitleEmpty}
                      </p>
                    )
                    : null}
                </div>
                <div className="form-group mb-3">
                  <label className="font-bold block mb-2">Start Date</label>
                  <input
                    type="date"
                    placeholder="DD/MM/YY"
                    className={`w-full form-control ${validationWorkExperienceErrors[index] != null &&
                      validationWorkExperienceErrors[index].StartDateEmpty !=
                      "filled"
                      ? "border-red-500"
                      : ""
                      }`}
                    value={data.StartDate}
                    name="StartDate"
                    onChange={(e) => handleChangeExperience(e, index)}
                  />
                  {validationWorkExperienceErrors[index] != null
                    ? validationWorkExperienceErrors[index].StartDateEmpty !=
                    "filled" && (
                      <p className="text-red-500">
                        {validationWorkExperienceErrors[index].StartDateEmpty}
                      </p>
                    )
                    : null}
                </div>
              </div>
              <div className="col-xl-12 col-lg-12 col-md-12">
                <div className="form-group mb-3">
                  <label className="font-bold block mb-2">
                    Job Description
                  </label>
                  <InputTextarea
                    placeholder="Write here"
                    className={`w-full ${validationWorkExperienceErrors[index] != null &&
                      validationWorkExperienceErrors[index]
                        .experienceDescriptionEmpty != "filled"
                      ? "border-red-500"
                      : ""
                      }`}
                    value={data.experienceDescription}
                    name="experienceDescription"
                    onChange={(e) => handleChangeExperience(e, index)}
                  />
                  {validationWorkExperienceErrors[index] != null
                    ? validationWorkExperienceErrors[index]
                      .experienceDescriptionEmpty != "filled" && (
                      <p className="text-red-500">
                        {
                          validationWorkExperienceErrors[index]
                            .experienceDescriptionEmpty
                        }
                      </p>
                    )
                    : null}
                </div>
                <Button onClick={() => { setVisible(true), setIndex(index) }} className="site-button" label="AI Writer" />
              </div>
            </div>
          </AccordionTab>
        ))}
      </Accordion>

      <Dialog header="AI Writer" visible={visible} className="modal-popup" onHide={() => setVisible(false)}>
        <h3>What job are you applying for?</h3>
        <p className="m-0">
          Tell us the job description of your desired job and we will generate a tailored profile section for that job title based on the rest of your resume.
        </p>
        <br></br>
        <div className="form-group mb-3">
          <div className="flex-auto">
            <InputText
              name="jobtitle"
              value={jobtitle}
              onChange={(e) => { setjobtitle(e.target.value) }}
              placeholder="Enter job description...."
              disabled
              className={`w-full ${jobtitleerror ? 'p-invalid' : ''}`}
            />
            {jobtitleerror && <p className="text-red-500">{jobtitleerror}</p>}
          </div>
          <br></br>
          <div style={{ display: 'flex', justifyContent: 'space-between' }} >
            <Button
              className="site-button"
              label="Cancel"
              onClick={() => { setVisible(false),setjobtitleerror('') }}
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
    </>
  );
}
