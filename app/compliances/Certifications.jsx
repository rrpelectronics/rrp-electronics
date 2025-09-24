"use client";
import React, { useState, useEffect } from "react";
import SectionHeader from "@/app/components/SectionHeader";
import { useTextAnimation } from "@/app/hooks/UseTextAnimation";
import UseBodyScrollLock from "@/app/hooks/UseBodyScrollLock";

export default function Certifications() {
  const { containerRef } = useTextAnimation();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  UseBodyScrollLock(isPopupOpen);

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
    {
      title: "ANSI ESD S20.20:2021 & IEC 61340 5-1",
      description: "Electrostatic Discharge Control Program",
      image: "/images/compliances/edcp.png",
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
            className="col-span-4 grid grid-cols-4 md:grid-cols-12 gap-x-3.5 md:gap-x-5 gap-y-6 px-3.5 md:px-5 lg:px-10"
          >
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="col-span-4 aspect-[590/290] w-full h-[290px] p-4 flex flex-col justify-between bg-whiteBg cursor-pointer "
                onClick={() => openPopup(cert.image)}
              >
                <div className="flex justify-end">
                  <img
                    src="/images/icons/arrow_outward.svg"
                    alt="ISO Icon"
                    className="h-7 w-7 md:h-10 md:w-10"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p
                    data-animate-text
                    className="text-heading4 leading-[115%] text-black"
                  >
                    {cert.title}
                  </p>
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
          className={`flex flex-col gap-y-10 md:gap-y-15 w-full min-h-screen overflow-y-auto fixed inset-0 z-60 items-start justify-center bg-opacity-75 backdrop-blur-md`}
          //if imgs are  more then one: --- py-10 md:py-15 justify-start
          onClick={closePopup}
        >
          <button
            onClick={closePopup}
            className="fixed top-5 right-3.5 md:right-5 lg:right-10 z-20 rounded-full p-2 cursor-pointer"
            style={{ isolation: "isolate" }}
            aria-label="Close popup"
          >
            <img
              src="/images/icons/close-button.svg"
              alt="Close"
              className="w-6 h-6"
            />
          </button>
          <div
            className="relative bg-none mx-auto"
            style={{
              width:
                imageDimensions.width > 0
                  ? `${imageDimensions.width}px`
                  : "auto",
              height:
                imageDimensions.height > 0
                  ? `${imageDimensions.height}px`
                  : "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
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