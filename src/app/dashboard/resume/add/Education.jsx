import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Accordion, AccordionTab } from "primereact/accordion";

export default function Education({
  educationData,
  handleChangeEducaton,
  setEducationData,
  validationeducationErrors,
}) {

  console.log(validationeducationErrors);

  const handleAppendDiv = () => {
    setEducationData((prevState) => [
      ...prevState,
      { schoolName: "", schoolLevel: "" },
    ]);
  };

  const divdel = (index) => {
    setEducationData((prevState) => {
      return prevState.filter((_, i) => i !== index);
    });
  };

  return (
    <>
      <button onClick={handleAppendDiv} className="site-button mb-4">
        <i className="pi pi-plus"></i>Add Education
      </button>
      <Accordion activeIndex={0}>
        {educationData.map((data, index) => (
          <AccordionTab
            key={index}
            header={
              index === 0 ? (
                <div
                  style={
                    validationeducationErrors[index] != null &&
                    (validationeducationErrors[index].schoolNameEmpty !== "filled" ||
                    validationeducationErrors[index].schoolLevelEmpty !== "filled")
                      ? { color: "red" }
                      : {}
                  }
                >
                  Education
                </div>
              ) : (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div
                    style={
                      validationeducationErrors[index] != null &&
                      (validationeducationErrors[index].schoolNameEmpty !==
                        "filled" ||
                      validationeducationErrors[index].schoolLevelEmpty !==
                        "filled")
                        ? { color: "red" }
                        : {}
                    }
                  >
                    Education
                  </div>
                  <div>
                    <i
                      onClick={() => divdel(index)}
                      className="pi pi-trash text-danger"
                    ></i>
                  </div>
                </div>
              )
            }
          >
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-12">
                <div className="form-group mb-3">
                  <label className="font-bold block mb-2">Institute Name</label>
                  <InputText
                    name="schoolName"
                    value={data.schoolName}
                    onChange={(e) => handleChangeEducaton(e, index)}
                    placeholder="e.g Harvard University"
                    className={`w-full ${
                      validationeducationErrors[index] != null &&
                      validationeducationErrors[index].schoolNameEmpty !=
                        "filled"
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  {validationeducationErrors[index] != null
                    ? validationeducationErrors[index].schoolNameEmpty !=
                        "filled" && (
                        <p className="text-red-500">
                          {validationeducationErrors[index].schoolNameEmpty}
                        </p>
                      )
                    : null}
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-12">
                <div className="form-group mb-3">
                  <label className="font-bold block mb-2">Degree Name</label>
                  <InputText
                    name="schoolLevel"
                    value={data.schoolLevel}
                    onChange={(e) => handleChangeEducaton(e, index)}
                    placeholder="e.g BS in Computer Science"
                    className={`w-full ${
                      validationeducationErrors[index] != null &&
                      validationeducationErrors[index].schoolLevelEmpty !=
                        "filled"
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  {validationeducationErrors[index] != null
                    ? validationeducationErrors[index].schoolLevelEmpty !=
                        "filled" && (
                        <p className="text-red-500">
                          {validationeducationErrors[index].schoolLevelEmpty}
                        </p>
                      )
                    : null}
                </div>
              </div>
            </div>
          </AccordionTab>
        ))}
      </Accordion>
    </>
  );
}
