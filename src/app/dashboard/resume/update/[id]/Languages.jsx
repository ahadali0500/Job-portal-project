"use client";
import { Button } from "primereact/button";
import React, { useState } from "react";
import { InputNumber } from "primereact/inputnumber";
import { Accordion, AccordionTab } from "primereact/accordion";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

export default function Languages({
  validationlanguageErrors,
  handleChangelanguage,
  languageData,
  setlanguageData,
}) {
  const handleAppendDiv = () => {
    setlanguageData((prevState) => [...prevState, { name: "" }]);
  };

  const divdel = (index) => {
    setlanguageData((prevState) => {
      return prevState.filter((_, i) => i !== index);
    });
  };

  return (
    <>
      <button onClick={handleAppendDiv} className="site-button mb-4">
        <i className="pi pi-plus"></i>Add language
      </button>
      <Accordion activeIndex={0}>
        {languageData.map((data, index) => (
          <AccordionTab
            key={index}
            header={
              index === 0 ? (
                <div
                  style={
                    validationlanguageErrors[index] != null &&
                    validationlanguageErrors[index].nameEmpty !== "filled"
                      ? { color: " red" }
                      : {}
                  }
                >
                  language
                </div>
              ) : (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div
                    style={
                      validationlanguageErrors[index] != null &&
                      validationlanguageErrors[index].nameEmpty !== "filled"
                        ? { color: " red" }
                        : {}
                    }
                  >
                    language
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
              <div className="flex-auto">
                <label className="font-bold block mb-2">Languages</label>
                <InputText
                  placeholder="e.g English"
                  className={`w-full ${
                    validationlanguageErrors[index] != null &&
                    validationlanguageErrors[index].nameEmpty != "filled"
                      ? "border-red-500"
                      : ""
                  }`}
                  name="name"
                  value={data.name}
                  onChange={(e) => handleChangelanguage(e, index)}
                />
                {validationlanguageErrors[index] != null
                  ? validationlanguageErrors[index].nameEmpty != "filled" && (
                      <p className="text-red-500">
                        {validationlanguageErrors[index].nameEmpty}
                      </p>
                    )
                  : null}
              </div>
            </div>
          </AccordionTab>
        ))}
      </Accordion>
    </>
  );
}
