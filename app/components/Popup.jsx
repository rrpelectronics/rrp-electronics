"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { leadersData } from "@/app/leadersData";
import { useAppContext } from "@/app/components/AppContext";
import UseBodyScrollLock from "@/app/hooks/UseBodyScrollLock";

const Popup = () => {
  const { state, setState } = useAppContext();
  const { selectedIndex, isActive } = state;

  let cursor = useRef();
  let popup = useRef();
  let popupDesc = useRef();
  let popupImage = useRef();

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
      const isMobile = window.innerWidth < 1152;

      if (isMobile) {
        cursor.current.style.position = "fixed";
        cursor.current.style.top = "20px";
        cursor.current.style.right = "20px";
        cursor.current.style.left = "auto";
        cursor.current.style.transform = "none";
      } else {
        let x = e.clientX;
        let y = e.clientY;
        cursor.current.style.position = "absolute";
        cursor.current.style.left = `${x - 10}px`;
        cursor.current.style.top = `${y - 10}px`;
        cursor.current.style.right = "auto";
        cursor.current.style.transform = "translate(-50%, -50%)";
      }
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
      className="@container overflow-y-scroll min-h-screen overflow-x-hidden fixed inset-0 flex flex-col md:flex-row justify-start bg-whiteBg z-[70] md:px-5 lg:px-7.5 px-3.5"
      onMouseMove={moveCursor}
      onClick={handleClose}
    >
      <div
        ref={cursor}
        className="bg-primary flex justify-center items-center w-10 h-10 rounded-full @6xl:fixed @6xl:top-50 @6xl:left-50 @6xl:-translate-x-1/2 @6xl:-translate-y-1/2 fixed top-5 right-3.5 z-[60]"
      >
        <img src="/images/icons/close.svg" className="w-full h-full scale-75" />
      </div>
      <div className="w-full min-h-screen flex flex-col md:grid md:grid-cols-4 md:gap-4">
        <img
          ref={popupImage}
          className="w-full h-1/2 md:h-screen md:col-span-2 object-contain"
        />
        <div className="bg-white flex-1 md:col-span-2 flex flex-col justify-center gap-y-6 pt-4 md:pt-15">
          <div className="flex flex-col gap-y-4 mb-4">
            <h1 className="flex flex-col gap-4 text-heading3 text-primary leading-[105%] tracking-heading3">
              {leadersData[selectedIndex]?.name}
            </h1>
            <p className="text-bodySmall text-black font-neueMontreal">
              {leadersData[selectedIndex]?.position}
            </p>
          </div>
          {leadersData[selectedIndex]?.description &&
            leadersData[selectedIndex]?.description.length > 0 && (
              <React.Fragment>
                {leadersData[selectedIndex]?.description.map((para, id) => (
                  <p
                    key={id}
                    className="text-bodyBase text-textPrimary font-neueMontreal leading-[120%]"
                  >
                    {para}
                  </p>
                ))}
              </React.Fragment>
            )}
        </div>
      </div>
    </div>
  );
};

export default Popup;
