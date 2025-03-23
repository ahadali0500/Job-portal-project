"use client";
import React, { useEffect, useRef, useState } from "react";
import { Steps } from "primereact/steps";
import { Button } from "primereact/button";
import Breadcrumbs from "@/app/components/MineBreadcrumb";
import Education from "./Education";
import WorkExperience from "./WorkExperience";
import Skill from "./Skill";
import Languages from "./Languages";
import ContactInfo from "./ContactInfo";
import "primeicons/primeicons.css";
import Photo from "./Photo";
import Templates from "./Templates";
import { Toast } from "primereact/toast";
import axios from "axios";
import { API_URL, WEB_NAME } from "@/app/utils/config";
import { compareDates, containsNumber, getCurrentDate, getCurrentTimestamp, hasTimePassed, isoToHumanReadable, timestamp, validateEmail } from "@/app/utils/helper.api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Dialog } from 'primereact/dialog';

export default function ControlledDemo() {
  const { data: session, status } = useSession();
  const [visible, setVisible] = useState(false);
  const [userplaninfo, setuserplaninfo] = useState(null);
  
  const router = useRouter();
  // education
  const [educationData, setEducationData] = useState([
    { schoolName: "", schoolLevel: "" },
  ]);

  const [Loading, setLoading] = useState(false);
  const [validationeducationErrors, setValidationeducationErrors] = useState(
    []
  );

  const toast = useRef(null);
  const handleChangeEducaton = (e, index) => {
    const { name, value } = e.target;
    setEducationData((prevState) => {
      return prevState.map((item, i) => {
        if (i === index) {
          return { ...item, [name]: value };
        }
        return item;
      });
    });
  };

  const handleValidationeducation = () => {
    const errorItems = educationData.map((item, index) => {
      const errors = {};
      if (item.schoolName.trim() === "") {
        errors.schoolNameEmpty = "Institute Name is required";
      } else if (item.schoolName.trim().length < 3) {
        errors.schoolNameEmpty = "Institute Name three characters required";
      } else if (containsNumber(item.schoolName)) {
        errors.schoolNameEmpty = "Institute Name must not contain any numbers.";
      } else {
        errors.schoolNameEmpty = "filled"
      }

      if (item.schoolLevel.trim() === "") {
        errors.schoolLevelEmpty = "Degree Name is required";
      } else if (item.schoolLevel.trim().length < 3) {
        errors.schoolLevelEmpty = "Degree Name three characters required";
      } else if (containsNumber(item.schoolName)) {
        errors.schoolLevelEmpty = "Degree Name must not contain any numbers.";
      } else {
        errors.schoolLevelEmpty = "filled"
      }
      if (errors.schoolNameEmpty === "filled" && errors.schoolLevelEmpty === "filled") {
        return null;
      }
      return errors;
    });
    console.log(errorItems);
    return errorItems;
  };

  // end educaton

  // work experience
  const [workExperienceData, setWorkExperienceData] = useState([]);
  const [validationWorkExperienceErrors, setValidationWorkExperienceErrors] =
    useState([]);

  const handleChangeExperience = (e, index) => {
    const { name, value, type, checked } = e.target;
    setWorkExperienceData((prevState) => {
      return prevState.map((item, i) => {
        if (i === index) {
          if (type === "checkbox") {
            return { ...item, [name]: checked }; // Set the checked state directly for checkboxes
          } else {
            return { ...item, [name]: value }; // Set the value directly for other input types
          }
        }
        return item;
      });
    });
  };

  const handleValidationwork = () => {
    const errorItems = workExperienceData.map((item, index) => {
      console.log(item);
      const errors = {};
      if (item.experiencePlace.trim() === "") {
        errors.experiencePlaceEmpty = "Company Name is required";
      } else if (item.experiencePlace.trim().length < 3) {
        errors.experiencePlaceEmpty = "Company Name three characters required";
      } else if (containsNumber(item.experiencePlace)) {
        errors.experiencePlaceEmpty = "Company Name must not contain any numbers.";
      } else {
        errors.experiencePlaceEmpty = "filled"
      }

      if (item.experienceLocation.trim() === "") {
        errors.experienceLocationEmpty = "Address is required";
      } else if (item.experienceLocation.trim().length < 3) {
        errors.experienceLocationEmpty = "Address three characters required";
      } else {
        errors.experienceLocationEmpty = "filled"
      }

      if (item.experienceTitle.trim() === "") {
        errors.experienceTitleEmpty = "Job Title is required";
      } else if (item.experienceTitle.trim().length < 3) {
        errors.experienceTitleEmpty = "Job Title three characters required";
      } else if (containsNumber(item.experienceTitle)) {
        errors.experienceTitleEmpty = "Job Title must not contain any numbers.";
      } else {
        errors.experienceTitleEmpty = "filled"
      }


      if (item.experienceDescription.trim() === "") {
        errors.experienceDescriptionEmpty = "Job Description is required";
      } else if (item.experienceDescription.trim().length < 10) {
        errors.experienceDescriptionEmpty = "Job Title minimum ten characters required";
      } else {
        errors.experienceDescriptionEmpty = "filled"
      }

      if (compareDates(getCurrentDate(), item.StartDate) === 1 && item.StartDate != "") {
        errors.StartDateEmpty = "Start date cannot be a future date";
      } else {
        errors.StartDateEmpty = "filled"
      }

      if (item.StartDate != null && item.chkdata==false ) {
        if (compareDates(getCurrentDate(), item.EndDate) === 1 && item.EndDate != null) {
          errors.EndDateEmpty = "End date cannot be a future date";
        } else if (compareDates(item.StartDate, item.EndDate) === 2 && item.StartDate != null && item.EndDate != null) {
          errors.EndDateEmpty = "End date must be after the start date.";
        } else if (item.StartDate == null && item.EndDate != null) {
          errors.EndDateEmpty = "Start date is required for End date";
        } else if (compareDates(item.EndDate, item.StartDate) === 1 && item.StartDate != null && item.EndDate != null) {
          errors.EndDateEmpty = "End date cannot be before the start date";
        } else {
          errors.EndDateEmpty = "filled"
        }
      } else {
        errors.EndDateEmpty = "filled"
      }

      if (item.StartDate != null) {
        if ( item.EndDate ||  item.chkdata == true) {
          errors.numerousEmpty = "filled"
        } else {
          errors.numerousEmpty = "Please select either an end date or the 'currently working' checkbox because you have chosen a start date"

        }
      } else {
        errors.numerousEmpty = "filled"
      }

      if (item.EndDate != null && item.StartDate === null) {
          errors.StartDateEmpty = "Start date is required for End date"
      } else {
          errors.StartDateEmpty = "filled"
      }




      if (errors.experienceDescriptionEmpty === "filled" && errors.experienceTitleEmpty === "filled" && errors.experienceLocationEmpty === "filled" && errors.experiencePlaceEmpty === "filled" && errors.EndDateEmpty === "filled" && errors.StartDateEmpty === "filled" &&  errors.numerousEmpty === "filled") {
        return null;
      }
      return errors;
    });
    console.log(errorItems);
    return errorItems;
  };

  // endworkexperience
  // skill
  const [skillData, setskillData] = useState([{ skill: "", level: "" }]);

  const [validationskillErrors, setValidationskillErrors] = useState([]);
  const handleChangeskill = (e, index) => {
    const { name, value } = e.target;
    setskillData((prevState) => {
      return prevState.map((item, i) => {
        if (i === index) {
          if (name == 'level') {
            return { ...item, [name]: parseInt(value) };
          } else {
            return { ...item, [name]: value };
          }
        }
        return item;
      });
    });
  };


  const handleValidationskill = () => {
    const errorItems = skillData.map((item, index) => {
      const errors = {};
      if (item.skill.trim() === "") {
        errors.skillEmpty = "Skill is required";
      } else if (item.skill.trim().length < 3) {
        errors.skillEmpty = "Skill three characters required";
      } else if (containsNumber(item.skill)) {
        errors.skillEmpty = "Skill must not contain any numbers.";
      } else {
        errors.skillEmpty = "filled"
      }

      if (item.level === "") {
        errors.levelEmpty = "Degree Name is required";
      } else {
        errors.levelEmpty = "filled"
      }
      if (errors.skillEmpty === "filled" && errors.levelEmpty === "filled") {
        return null;
      }
      return errors;
    });
    console.log(errorItems);
    return errorItems;
  };

  // end skill
  // language

  const [languageData, setlanguageData] = useState([{ name: "" }]);

  const [validationlanguageErrors, setValidationlanguageErrors] = useState([]);
  const handleChangelanguage = (e, index) => {
    const { name, value } = e.target;
    setlanguageData((prevState) => {
      return prevState.map((item, i) => {
        if (i === index) {
          return { ...item, [name]: value };
        }
        return item;
      });
    });
  };


  const handleValidationlanguage = () => {
    const errorItems = languageData.map((item, index) => {
      const errors = {};
      if (item.name.trim() === "") {
        errors.nameEmpty = "Language name is required";
      } else if (item.name.trim().length < 3) {
        errors.nameEmpty = "Language name three characters required";
      } else if (containsNumber(item.name)) {
        errors.nameEmpty = "Language name must not contain any numbers.";
      } else {
        errors.nameEmpty = "filled"
      }

      if (errors.nameEmpty === "filled") {
        return null;
      }
      return errors;
    });
    console.log(errorItems);
    return errorItems;
  };


  // endlanguage
  // photo

  const [profileImage, setProfileImage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);

  console.log(profileImage);
  // end photo
  // template
  const [id, setid] = useState('')
  const [folder, setfolder] = useState('')

  // end template
  // helper function
  function checkForNull(array) {
    for (let i = 0; i < array.length; i++) {
      if (typeof array[i] === "object" && array[i] !== null) {
        return false; // Return true if any element is an object (and not null)
      }
    }
    return true; // Return false if no element is an object
  }

  // end helper function
  // contact  part
  const [contactData, setcontactData] = useState({
    name: "",
    email: "",
    current_position: "",
    street: "",
    address: "",
    country: "",
    phonenumber: "",
    bio: "",
  });

  const [validationcontactErrors, setValidationcontactErrors] = useState({
    name: "",
    email: "",
    current_position: "",
    street: "",
    address: "",
    country: "",
    phonenumber: "",
    bio: "",
  });

  const handleChange = (e, inputType) => {

    if (inputType === 'country') {
      setcontactData((prevState) => ({
        ...prevState,
        country: e.value,
      }));
    } else if (inputType === 'number') {
      setcontactData((prevState) => ({
        ...prevState,
        phonenumber: e,
      }));
    } else {
      const { name, value } = e.target;
      console.log(value, "bye");
      setcontactData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }

  };

  const handleValidationcontact = () => {
    let errors = {};
    for (const key in contactData) {
      console.log(contactData[key]);
      if (key == "name") {
        if (contactData[key].trim() == "") {
          errors[key] = "is required!";
        } else if (containsNumber(contactData[key])) {
          errors[key] = "must not contain any numbers.";
        } else if (contactData[key].trim().length < 3) {
          errors[key] = " three characters required";
        }
      }


      if (key == "email") {
        if (contactData[key].trim() == "") {
          errors[key] = " is required!";
        } else if (!validateEmail(contactData[key])) {
          errors[key] = " is invalid";
        }
      }


      if (key == "current_position") {
        if (contactData[key].trim() == "") {
          errors[key] = "is required!";
        } else if (containsNumber(contactData[key])) {
          errors[key] = "must not contain any numbers.";
        } else if (contactData[key].trim().length < 3) {
          errors[key] = " three characters required";
        }
      }


      if (key == "street") {
        if (contactData[key].trim() == "") {
          errors[key] = "is required!";
        } else if (contactData[key].trim().length < 3) {
          errors[key] = " three characters required";
        }
      }

      if (key == "address") {
        if (contactData[key].trim() == "") {
          errors[key] = "is required!";
        } else if (contactData[key].trim().length < 3) {
          errors[key] = " three characters required";
        }
      }

      if (key == "bio") {
        if (contactData[key].trim() == "") {
          errors[key] = "is required!";
        } else if (contactData[key].trim().length <= 10) {
          errors[key] = " ten characters required";
        }
      }

      if (key == "country") {
        if (contactData[key] == "") {
          errors[key] = "is required!";
        }
      }
      if (key == "phonenumber") {
        if (contactData[key] == "") {
          errors[key] = "is required!";
        } else if (contactData[key].trim().length <= 5) {
          errors[key] = "is Invalid ";
        }
      }


    }
    return errors;
  };
  // end contact

  // multistep form
  const [activeIndex, setActiveIndex] = useState(0);
  const items = [
    {
      label: "Contact Info",
    },
    {
      label: "Education",
    },
    {
      label: "Work Experience",
    },
    {
      label: "Skill",
    },
    {
      label: "Languages",
    },
    {
      label: "Photo",
    },
    {
      label: "Template",
    },
  ];

  const handleNext = (e) => {
    e.preventDefault();
    if (activeIndex == 0) {
      const condata = handleValidationcontact();
      setValidationcontactErrors(condata);
      if (Object.keys(condata).length <= 0) {
        setActiveIndex(activeIndex + 1);
      }
    } else if (activeIndex == 1) {
      const edudata = handleValidationeducation();
      setValidationeducationErrors(edudata);
      const dt = checkForNull(edudata);
      console.log(validationeducationErrors);
      console.log(dt);
      if (edudata.length > 0 && checkForNull(edudata) == true) {
        setActiveIndex(activeIndex + 1);
      }
    } else if (activeIndex == 2) {
      const workdata = handleValidationwork();
      setValidationWorkExperienceErrors(workdata);
      const dt = checkForNull(workdata);
      if (workdata.length > 0 && checkForNull(workdata) == true) {
        setActiveIndex(activeIndex + 1);
      }
      if (workExperienceData.length == 0) {
        setActiveIndex(activeIndex + 1);
      }
    } else if (activeIndex == 3) {
      const skilldata = handleValidationskill();
      setValidationskillErrors(skilldata);
      const dt = checkForNull(skilldata);
      if (skilldata.length > 0 && checkForNull(skilldata) == true) {
        setActiveIndex(activeIndex + 1);
      }
    } else if (activeIndex == 4) {
      const lan = handleValidationlanguage();
      setValidationlanguageErrors(lan);
      const dt = checkForNull(lan);
      if (lan.length > 0 && checkForNull(lan) == true) {
        setActiveIndex(activeIndex + 1);
      }
    } else if (activeIndex == 5) {
      setActiveIndex(activeIndex + 1);
    } else if (activeIndex == 6) {
      setActiveIndex(activeIndex + 1);
    }

    // setActiveIndex(activeIndex + 1);
  };

  const handlePrev = () => {
    setActiveIndex(activeIndex - 1);
  };
  console.log(activeIndex);
  // components
  const renderStepContent = () => {
    switch (activeIndex) {
      case 0:
        return (
          <ContactInfo
            contactData={contactData}
            handleChange={handleChange}
            setcontactData={setcontactData}
            validationcontactErrors={validationcontactErrors}
          />
        );
      case 1:
        return (
          <Education
            handleChangeEducaton={handleChangeEducaton}
            educationData={educationData}
            setEducationData={setEducationData}
            validationeducationErrors={validationeducationErrors}
          />
        );
      case 2:
        return (
          <WorkExperience
            handleChangeExperience={handleChangeExperience}
            validationWorkExperienceErrors={validationWorkExperienceErrors}
            workExperienceData={workExperienceData}
            setWorkExperienceData={setWorkExperienceData}
          />
        );
      case 3:
        return (
          <Skill
            skillData={skillData}
            handleChangeskill={handleChangeskill}
            setskillData={setskillData}
            validationskillErrors={validationskillErrors}
          />
        );
      case 4:
        return (
          <Languages
            languageData={languageData}
            handleChangelanguage={handleChangelanguage}
            setlanguageData={setlanguageData}
            validationlanguageErrors={validationlanguageErrors}
          />
        );
      case 5:
        return (
          <Photo
            profileImage={profileImage}
            setProfileImage={setProfileImage}
            backgroundImage={backgroundImage}
            setBackgroundImage={setBackgroundImage}
          ></Photo>
        );
      case 6:
        return (
          <Templates
            setid={setid}
            setfolder={setfolder}
            id={id}
            userplaninfo={userplaninfo}
          ></Templates>
        );
      default:
        return null;
    }
  };

  // multistep form end

  async function userplandetail() {
    try {
      const formData = new FormData();
      formData.append('user_id', session.user_id);
      formData.append('active', 1);
      const response = await axios.post(`${API_URL}/get_user_package.php`, formData);
      console.log(response.data.response);
      setuserplaninfo(response.data.response)
      return response.data;
    } catch (e) {
      console.log("user plan detail fail", e);
      return e;
    }
  };

  useEffect(()=>{
    userplandetail()
  },[])
  // submit
  const handlesubmit = async (e) => {
    e.preventDefault();

    if (id == "") {
      toast.current.show({ severity: 'error', summary: "Kindly select any resume template!", life: 6000 });
    } else {
      setLoading(true);
      const data = await userplandetail();
      if (data.code == 200) {
        if (hasTimePassed(data.response.expire_date)) {
          if (data.response.package_id == 1) {
            try {
              const formData = new FormData();
              formData.append('user_id', session.user_id);
              formData.append('type', "Free");
              formData.append('id', data.response.id);
              const response = await axios.post(`${API_URL}/manage_package.php`, formData);
              if (response.data.code == 200) {
                storeresumedata();
              }
            } catch (e) {
              console.log("user plan store fail", e);
            }
          } else {
            try {
              const formData = new FormData();
              formData.append('user_id', session.user_id);
              formData.append('type', "Purchase");
              formData.append('id', data.response.id);
              const response = await axios.post(`${API_URL}/manage_package.php`, formData);
              if (response.data.code == 200) {
                toast.current.show({ severity: 'info', summary: "Your plan has been expired!", life: 6000 });
              }
            } catch (e) {
              console.log("user plan store fail", e);
            }
          }
        } else {
          storeresumedata();
        }
      } else if (data.code == "ERR_BAD_REQUEST") {
        toast.current.show({ severity: 'info', summary: "Kindly buy our subscrption to generate a interview!", life: 6000 });
      }
    }
  }

  const storeresumedata = async () => {
    try {

      const workExperienceDataModified = workExperienceData.map(item => ({
        ...item,
        experiencePeriod: item.chkdata ? `${isoToHumanReadable(item.StartDate)} - Present` : `${isoToHumanReadable(item.StartDate)} - ${isoToHumanReadable(item.EndDate)}`
      }));


      const Data = new FormData();
      Data.append('fullName', contactData.name);
      Data.append('user_id', session.user_id);
      Data.append('currentPosition', contactData.current_position);
      Data.append('street', contactData.street);
      Data.append('address', contactData.address);
      Data.append('country', contactData.country);
      Data.append('email', contactData.email);
      Data.append('phoneNumber', contactData.phonenumber);
      Data.append('bio', contactData.bio);
      Data.append('experience', JSON.stringify(workExperienceDataModified));
      Data.append('educationDetails', JSON.stringify(educationData));
      Data.append('skills', JSON.stringify(skillData));
      Data.append('languages', JSON.stringify(languageData));
      Data.append('cv_temp', id);
      Data.append('folder', folder);
      Data.append('createdAt', getCurrentTimestamp());
      Data.append('image', profileImage);
      Data.append('backgroundImage', backgroundImage);

      const response = await axios.post(`${API_URL}/create_cv.php`, Data);
      if (response.data.code == 200) {
        toast.current.show({ severity: 'success', detail: response.data.message, life: 6000 });
        // setVisible(true)
        window.location.href = `https://desired-techs.com/job-bank/resume/${folder}/index.php?id=${response.data.id}`
        // router.push("/dashboard/resume");
      } else {
        toast.current.show({ severity: 'error', detail: response.data.message, life: 6000 });
      }
    } catch (error) {
      toast.current.show({ severity: 'warn', detail: 'Oops! Try again later', life: 6000 });
      console.error('Error:', error);
    } finally {
      setLoading(false); // Reset loading state
    }
  }


  return (
    <>
      <Toast ref={toast} />
      <Breadcrumbs name="Create Resume" />
      <div className="container mt-7">
        <div className="twm-job-categories-section-2 m-b30">
          <div className="job-categories-style1 m-b30">
            <Steps model={items} activeIndex={activeIndex} />
            {activeIndex === items.length - 1 &&
              <Button
                style={{ float: 'right' }}
                className="site-button"
                label={Loading ? 'Loading...' : 'Submit'}
                // disabled={Loading ? true : false}
                onClick={handlesubmit}
              />
            }
            <br></br>
            {renderStepContent()}

            <div className="flex justify-content-between mt-3">
              <Button
                className="site-button"
                label="Back"
                disabled={activeIndex === 0}
                onClick={handlePrev}
              />
              <Button
                className="site-button"
                label={activeIndex === items.length - 1 ? Loading ? 'Loading...' : 'Submit' : 'Next'}
                disabled={Loading ? true : false}
                onClick={activeIndex === items.length - 1 ? handlesubmit : handleNext}
              />
            </div>
          </div>
        </div>
      </div>
      <Dialog header="Resume Preview" visible={visible} style={{ width: '100vw', height: '100%', left: '0px', top: '0px' }} onHide={() => { if (!visible) return; setVisible(false); }}>
        <div className="col col-lg-12 row" >
          <div className="col-lg-2" ></div>
          <div className="col-lg-8" >
            <iframe src={`https://desired-techs.com/job-bank/resume/${folder}/`} style={{ width: '100%', height: '1000px' }} />
          </div>
          <div className="col-lg-2" ></div>
        </div>
      </Dialog>
    </>
  );
}
