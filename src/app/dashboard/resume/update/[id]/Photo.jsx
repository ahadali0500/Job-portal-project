import React, { useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { SITE_URL } from "@/app/utils/config";

export default function Photo({ profileImage, setProfileImage, backgroundImage, setBackgroundImage, Image }) {
  console.log(Image);
  const fileInputProRef = useRef(null);
  const fileInputBacRef = useRef(null);
  const { data: session, status } = useSession();

  const handleProChange = (event) => {
    const selectedFile = event.target.files[0];
    setProfileImage(selectedFile);
  };

  const handleBacChange = (event) => {
    const selectedFile = event.target.files[0];
    setBackgroundImage(selectedFile);
  };

  const handleProButtonClick = (e) => {
    e.preventDefault();
    fileInputProRef.current.click();
  };

  const handleBacButtonClick = (e) => {
    e.preventDefault();
    fileInputBacRef.current.click();
  };


  return (
    <div>
      <br></br>
      <center>
        <div
          style={{
            height: "220px",
            width: "100%",
            borderRadius: "4px",
            backgroundImage: backgroundImage
              ? `url(${URL.createObjectURL(backgroundImage)})`
              : (Image.profileImage !== ""
                ? `url(${SITE_URL}/user_data/user_${session.user_id}/images/${Image.backgroundImage})`
                : "none"),
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: backgroundImage ? "transparent" : "#ccccccbd",
          }}
        ></div>
        <div
          style={{
            height: "150px",
            width: "150px",
            borderRadius: "50%",
            backgroundImage: `url(${profileImage instanceof File ? URL.createObjectURL(profileImage) : Image.profileImage != '' ? `${SITE_URL}/user_data/user_${session.user_id}/images/${Image.profileImage}` : '/image/other/blank.jpg'
              })`,
            backgroundSize: "cover",
            position: "relative",
            top: "-80px",
          }}
        ></div>
        <div className="upload-btn-wrapper">
          <input
            ref={fileInputProRef}
            type="file"
            name="profileImage"
            id="profile-image-uploader"
            accept=".jpg, .jpeg, .png"
            onChange={handleProChange}
            style={{ display: "none" }}
          />
          <input
            ref={fileInputBacRef}
            type="file"
            name="backgroundImage"
            id="background-image-uploader"
            accept=".jpg, .jpeg, .png"
            onChange={handleBacChange}
            style={{ display: "none" }}
          />
        </div>
        <div style={{ position: "relative", top: "-80px" }}>
          <h3>Upload a Profile Photo</h3>
          <p>
            If photos are not your thing, There is no pressure to have one. We
            will fill in your profile with a default photo!
          </p>
          <button className="site-button button-sm" onClick={handleProButtonClick}>Upload Profile Photo</button>
          <button className="site-button button-sm" onClick={handleBacButtonClick}>Upload Background Image</button>
        </div>
      </center>
    </div>
  );
}
