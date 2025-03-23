"use client";

import React, { useState, useEffect } from "react";
import { Galleria } from "primereact/galleria";
import "./slider.css"; // Import CSS file

export const PhotoService = {
  getData() {
    return [
      {
        itemImageSrc: "/image/slider/artwork_2.jpg",
        thumbnailImageSrc: "/image/slider/artwork_2.jpg",
        alt: "Ace your diagnostic, skill, and personality tests with personalized preparation and feedback.",
        title: "Test Prepration",
      },
      {
        itemImageSrc: "/image/slider/artwork_3.jpg",
        thumbnailImageSrc: "/image/slider/artwork_1.jpg",
        alt: "Create standout resumes and cover letters with ease. Tailor your professional profile to perfection",
        title: "Craft Future",
      },
      
    ];
  },

  getImages() {
    return Promise.resolve(this.getData());
  },
};

export default function ItemWithoutThumbnailsDemo() {
  const [images, setImages] = useState(null);

  useEffect(() => {
    PhotoService.getImages().then((data) => setImages(data));
  }, []);

  const itemTemplate = (item) => {
    return (
      <div className="item-container">
        <img className="item-image" src={item.itemImageSrc} alt={item.alt} />
        <div className="overlay"></div>
      </div>
    );
  };

  const thumbnailTemplate = (item) => {
    return (
      <img
        src={item.thumbnailImageSrc}
        alt={item.alt}
        style={{ display: "block" }}
      />
    );
  };

  const caption = (item) => {
    return (
      <div className="centered-container">
        <div className="centered-heading text-white font-bold">{item.title}</div>
        <p className="centered-paragraph text-white">{item.alt}</p>
      </div>
    );
  };

  return (
    <>
      <div style={{border:'0px'}} className="card">
        <Galleria
          value={images}
          numVisible={5}
          circular
          transitionInterval={4000}
          style={{ width: "100%" }}
           showItemNavigatorsOnHover showIndicators
          showThumbnails={false} item={itemTemplate} thumbnail={thumbnailTemplate}
          autoPlay
          caption={caption}
        />


      </div>
    </>
  );
}
