"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { leadersData } from "../leadersData";
import { useAppContext } from "./AppContext";
import UseBodyScrollLock from "../hooks/UseBodyScrollLock";

const Popup = () => {
  const { state, setState } = useAppContext();
  const { selectedIndex, isActive } = state;

  let cursor = useRef();
  let popup = useRef();
  let popupDesc = useRef();
  let popupImage = useRef();

  // Use the body scroll lock hook
  UseBodyScrollLock(isActive, ".popup-content-scrollable");

  function initalizePopup(index) {
    if (
      typeof index === "undefined" ||
      index < 0 ||
      index >= leadersData.length
    ) {
      return;
    }

    const leaders = leadersData[index];
    if (popupDesc.current) {
      popupDesc.current.innerHTML = leaders.description;
    }
    if (popupImage.current) {
      popupImage.current.src = leaders.imgPathPopup;
      popupImage.current.alt = leaders.name;
    }
  }

  function moveCursor(e) {
    if (cursor.current) {
      cursor.current.style.display = "block";
      let x = e.clientX;
      let y = e.clientY;
      cursor.current.style.left = `${x - 40}px`;
      cursor.current.style.top = `${y - 40}px`;
    }
  }

  useGSAP(() => {
    let popuptl = gsap.timeline();

    popuptl
      .to(popup.current, {
        opacity: isActive ? "1" : "0",
        pointerEvents: isActive ? "all" : "none",
        duration: 0.65,
        ease: "power1.inOut",
      })
      .to(popupDesc.current, {
        opacity: isActive ? "1" : "0",
        duration: "0.65",
      });
  }, [isActive]);

  useEffect(() => {
    if (typeof selectedIndex !== "undefined") {
      initalizePopup(selectedIndex);
    }
  }, [selectedIndex]);

  const handleClose = () => {
    setState((prev) => ({ ...prev, isActive: false }));
  };

  return (
    <div
      ref={popup}
      role="presentation"
      className="@container bg-whiteBg fixed inset-0 px-3.5 md:px-5 lg:px-10 overflow-y-scroll z-[60]"
      onMouseMove={moveCursor}
      onClick={handleClose}
    >
      {/* Custom cursor for larger screens */}
      <div
        ref={cursor}
        className="hidden @6xl:flex justify-center items-center w-10 h-10 bg-primary rounded-full fixed top-50 left-50 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10"
      >
        <img
          src="/images/icons/close.svg"
          alt="Close Popup"
          className="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* Close button for smaller screens */}
      <div className="flex @6xl:hidden justify-center items-center w-10 h-10 bg-primary rounded-full fixed top-15 right-3.5 z-10">
        <img src="/images/icons/close.svg" alt="Close Popup" />
      </div>

      <div className="w-full min-h-screen flex flex-col md:flex-row gap-y-4 gap-5 popup-content-scrollable">
        <div className="relative w-full md:w-1/2 h-[100vh] overflow-hidden">
          <img
            ref={popupImage}
            className="object-center h-screen mx-auto object-contain"
          />
        </div>
        <div className="w-full md:w-1/2 h-screen flex flex-col py-2 lg:py-15 gap-y-6 md:gap-y-8 lg:gap-y-10">
          <div className="flex flex-col gap-y-4">
            <h1 className="text-heading3 text-primary leading-[105%] tracking-heading3">
              {leadersData[selectedIndex]?.name}
            </h1>
            <p className="text-bodyBase text-textPrimary">
              {leadersData[selectedIndex]?.position}
            </p>
          </div>
          <p
            ref={popupDesc}
            className="text-bodyLarge leading-[120%] font-neueMontreal text-textPrimary"
          >
            {leadersData[selectedIndex]?.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Popup;