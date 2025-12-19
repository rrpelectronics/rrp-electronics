"use client";
import React, { useState, useEffect } from "react";
import UseBodyScrollLock from "@/app/hooks/UseBodyScrollLock";

export default function Popup({ onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  UseBodyScrollLock(isVisible);

  useEffect(() => {
    const visibleTimer = setTimeout(() => setIsVisible(true), 0);
    return () => clearTimeout(visibleTimer);
  }, []);

  useEffect(() => {
    if (isVisible) {
      const closeTimer = setTimeout(() => {
        handleClose();
      }, 8000);

      return () => clearTimeout(closeTimer);
    }
  }, [isVisible]);

  const handleClose = () => {
    if (onClose) {
      onClose(); 
    }
    setIsVisible(false);
    setTimeout(() => {
    }, 1000);
  };

  return (
    <div
      className={`w-full h-screen fixed inset-0 flex items-center justify-center z-70 backdrop-blur-sm bg-black/60 transition-opacity duration-1000 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`flex flex-col items-center justify-center gap-[6px] transition-opacity duration-1000 ease-in-out h-screen ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          onClick={handleClose}
          className="w-[90%] sm:w-[98%] mx-auto text-primary font-neueMontreal text-end cursor-pointer text-bodySmall 2xl:text-bodyLarge"
          aria-label="Close"
        >
          Close
        </button>
        <div
          className="w-[90%] sm:w-[50vw] lg:w-[30vw] aspect-[348/440] mx-auto overflow-hidden"
        >
          <img
            src="/images/home/popup.webp"
            alt="Card Image"
            className="h-full w-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}
