"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import UseBodyScrollLock from "@/app/hooks/UseBodyScrollLock";

export default function Popup() {
  const [showPopup, setShowPopup] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Use the body scroll lock hook
  UseBodyScrollLock(showPopup);

  useEffect(() => {
    setShowPopup(true);
    const visibleTimer = setTimeout(() => setIsVisible(true), 50);
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
    setIsVisible(false);
    setTimeout(() => {
      setShowPopup(false);
    }, 1000);
  };

  if (!showPopup) return null;

  return (
    <div
      className={`w-full h-screen fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/60 transition-opacity duration-1000 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`flex flex-col items-start gap-[6px] transition-opacity duration-1000 ease-in-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          onClick={handleClose}
          className="w-full text-end text-white text-bodySmall"
          aria-label="Close"
        >
          Close
        </button>
        <div className="w-[348px] h-[435px] aspect-[4/3] overflow-hidden">
          <Image
            src="/Images/home/pop-up.webp"
            alt="Card Image"
            width={348}
            height={435}
            className="object-cover w-full h-full"
            priority
          />
        </div>
      </div>
    </div>
  );
}
