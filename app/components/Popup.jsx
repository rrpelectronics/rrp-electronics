"use client";
import React, { useState, useEffect, useRef } from "react";

export default function Popup({ onClose }) {
  const [isVisible, setIsVisible] = useState(false);
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    scrollPositionRef.current =
      window.pageYOffset || document.documentElement.scrollTop;

    const body = document.body;
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollPositionRef.current}px`;
    body.style.width = "100%";
    body.style.paddingRight = `${scrollBarWidth}px`;

    return () => {
      // Restore body scroll
      body.style.overflow = "";
      body.style.position = "";
      body.style.top = "";
      body.style.width = "";
      body.style.paddingRight = "";

      // Restore scroll position
      window.scrollTo(0, scrollPositionRef.current);
    };
  }, []);

  useEffect(() => {
    const visibleTimer = setTimeout(() => setIsVisible(true), 100);
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
      if (onClose) {
        onClose();
      }
    }, 300);
  };

  // Prevent touch scroll on the overlay
  const handleTouchMove = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-300 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        WebkitOverflowScrolling: "touch",
        height: "100vh",
        height: "100dvh", // Dynamic viewport height for iOS
      }}
      onTouchMove={handleTouchMove}
    >
      <div
        className={`flex flex-col items-center justify-center gap-[6px] transition-all duration-300 ease-in-out px-4 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <button
          onClick={handleClose}
          className="w-[90%] sm:w-[98%] mx-auto text-[#ff6b35] font-medium text-right cursor-pointer text-sm md:text-base active:opacity-70 transition-opacity"
          aria-label="Close"
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          Close
        </button>
        <div
          className="w-[90%] sm:w-[50vw] lg:w-[30vw] aspect-[348/440] mx-auto overflow-hidden"
          style={{
            WebkitUserSelect: "none",
            userSelect: "none",
          }}
        >
          <img
            src="/images/home/popup.webp"
            alt="Card Image"
            className="h-full w-auto object-contain"
            draggable="false"
            style={{
              WebkitUserDrag: "none",
              pointerEvents: "none",
            }}
          />
        </div>
      </div>
    </div>
  );
}