"use client";
import React, { useState, useEffect } from "react";
import SectionHeader from "@/app/components/SectionHeader";
import { useTextAnimation } from "../hooks/UseTextAnimation";

export default function Certifications() {
  const { containerRef } = useTextAnimation();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  const certifications = [
    {
      title: "ISO 9001:2015",
      description: "Quality Management System (QMS)",
      image: "/images/compliances/qms.png",
    },
    {
      title: "ISO 14001:2015",
      description: "Environmental Management System (EMS)",
      image: "images/compliances/ems.png",
    },
  ];

  const openPopup = (image) => {
    setSelectedImage(image);
    setIsPopupOpen(true);

    const img = new Image();
    img.onload = () => {
      const maxWidth = window.innerWidth * 0.9;
      const maxHeight = window.innerHeight * 0.9;

      let { width, height } = img;
      if (width > maxWidth || height > maxHeight) {
        const widthRatio = maxWidth / width;
        const heightRatio = maxHeight / height;
        const scale = Math.min(widthRatio, heightRatio);

        width *= scale;
        height *= scale;
      }

      setImageDimensions({ width, height });
    };
    img.src = image;
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedImage("");
    setImageDimensions({ width: 0, height: 0 });
  };

  useEffect(() => {
    if (isPopupOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isPopupOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isPopupOpen) {
        closePopup();
      }
    };

    if (isPopupOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isPopupOpen]);

  return (
    <>
      <section
        className={`h-fit w-full py-10 md:py-15 bg-white relative ${
          isPopupOpen ? "overflow-hidden" : ""
        }`}
      >
        <div
          className={`${
            isPopupOpen ? "blur-md" : ""
          } transition-all duration-500`}
        >
          <SectionHeader
            heading={"Certifications & Standards"}
            text={
              "At RRP Electronics, our globally recognized certifications reflect our commitment to quality, safety, and sustainability, ensuring every product meets international standards."
            }
          />

          <div
            ref={containerRef}
            className="col-span-4 grid grid-cols-4 gap-x-3.5 md:gap-x-5 gap-y-6 px-3.5 md:px-5 lg:px-5"
          >
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="col-span-4 md:col-span-2 aspect-[590/290] w-full p-4 flex flex-col justify-between bg-whiteBg cursor-pointer "
                onClick={() => openPopup(cert.image)}
              >
                <div className="flex justify-end">
                  <img
                    src="/images/icons/arrow_outward.svg"
                    alt="ISO Icon"
                    className="h-7 w-7 md:h-10 md:w-10"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <h3
                    data-animate-text
                    className="text-heading4 leading-[115%] text-black"
                  >
                    {cert.title}
                  </h3>
                  <p
                    data-animate-text
                    className="text-bodySmall leading-[120%] text-textPrimary"
                  >
                    {cert.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {isPopupOpen && (
        <div
          className="w-full h-full fixed inset-0 z-50 flex items-center justify-center bg-opacity-75 backdrop-blur-md"
          onClick={closePopup}
        >
          <div
            className="relative bg-none"
            style={{
              width:
                imageDimensions.width > 0
                  ? `${imageDimensions.width}px`
                  : "auto",
              height:
                imageDimensions.height > 0
                  ? `${imageDimensions.height}px`
                  : "auto",
              maxWidth: "90vw",
              maxHeight: "90vh",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closePopup}
              className="absolute -top-4 -right-4 z-20  rounded-full p-2 cursor-pointer"
              style={{ isolation: "isolate" }}
              aria-label="Close popup"
            >
              <img
                src="/images/icons/close-button.svg"
                alt="Close"
                className="w-6 h-6"
              />
            </button>

            <img
              src={selectedImage}
              alt="Certification"
              className="w-full h-full object-contain block"
              style={{ display: "block" }}
            />
          </div>
        </div>
      )}
    </>
  );
}
