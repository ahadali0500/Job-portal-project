import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Dropdown } from "primereact/dropdown";

export default function Skill({
  skillData,
  handleChangeskill,
  setskillData,
  validationskillErrors,
}) {
  console.log(skillData);

  const handleAppendDiv = () => {
    setskillData((prevState) => [...prevState, { skill: "", level: "" }]);
  };

  const divdel = (index) => {
    setskillData((prevState) => {
      return prevState.filter((_, i) => i !== index);
    });
  };

  const levels = [
    { name: 'Level 1', code: 1 },
    { name: 'Level 2', code: 2 },
    { name: 'Level 3', code: 3 },
    { name: 'Level 4', code: 4 },
    { name: 'Level 5', code: 5 },
  ];
  console.log(`[{ name: 'Level 1' }]`);
  return (
    <>
      <button onClick={handleAppendDiv} className="site-button mb-4">
        <i className="pi pi-plus"></i>Add skill
      </button>
      <Accordion activeIndex={0}>
        {skillData.map((data, index) => (
          <AccordionTab
            key={index}
            header={
              index === 0 ? (
                <div
                  style={
                    validationskillErrors[index] != null &&
                      (validationskillErrors[index].skillEmpty !==
                        "filled" ||
                        validationskillErrors[index].levelEmpty !== "filled")
                      ? { color: "red" }
                      : {}
                  }
                >
                  skill
                </div>
              ) : (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div
                    style={
                      validationskillErrors[index] != null &&
                        (validationskillErrors[index].skillEmpty !==
                          "filled" ||
                          validationskillErrors[index].levelEmpty !== "filled")
                        ? { color: "red" }
                        : {}
                    }
                  >
                    skill
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
                  <label className="font-bold block mb-2">Skill</label>
                  <InputText
                    name="skill"
                    value={data.skill}
                    onChange={(e) => handleChangeskill(e, index)}
                    placeholder="e.g developer"
                    className={`w-full ${validationskillErrors[index] != null &&
                      validationskillErrors[index].skillEmpty != "filled"
                      ? "border-red-500"
                      : ""
                      }`}
                  />
                  {validationskillErrors[index] != null
                    ? validationskillErrors[index].skillEmpty != "filled" && (
                      <p className="text-red-500">
                        {validationskillErrors[index].skillEmpty}
                      </p>
                    )
                    : null}
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-12">
                <div className="form-group mb-3">
                  <label className="font-bold block mb-2">Skill Level</label>
                  {console.log(`${data.level}`)}


                  <select
                    value={data.level} // Set the value to the selected level code
                    name="level"
                    onChange={(e) => handleChangeskill(e, index)} // Call handleChangeskill function on change
                    className={`form-control ${validationskillErrors[index] && validationskillErrors[index].levelEmpty !== "filled" ? "border-red-500" : ""}`}
                  >
                    <option style={{display:'none'}}  value="">Select skill level</option>
                    {levels.map((level) => (
                      <option key={level.code} value={level.code}>{level.name}</option>
                    ))}
                  </select>

                  {validationskillErrors[index] != null
                    ? validationskillErrors[index].levelEmpty !=
                    "filled" && (
                      <p className="text-red-500">
                        {validationskillErrors[index].levelEmpty}
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
