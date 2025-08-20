"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { leadersData } from "@/app/leadership/leadersData";
import { useAppContext } from "@/app/components/AppContext";
import UseBodyScrollLock from "@/app/hooks/UseBodyScrollLock";

const Popup = () => {
  const { state, setState } = useAppContext();
  const { selectedIndex, isActive } = state;

  let popup = useRef();
  let popupDesc = useRef();
  let popupImage = useRef();
  let cursorRef = useRef();

  UseBodyScrollLock(isActive, ".popup-content-scrollable");

  function initalizePopup(index) {
    if (
      typeof index === "undefined" ||
      index < 0 ||
      index >= leadersData.length
    )
      return;
    const leaders = leadersData[index];
    if (popupDesc.current) popupDesc.current.innerHTML = leaders.description;
    if (popupImage.current) {
      popupImage.current.src = leaders.imgPathPopup;
      popupImage.current.alt = leaders.name;
    }
  }

  useGSAP(() => {
    let popuptl = gsap.timeline();
    popuptl
      .to(popup.current, {
        opacity: isActive ? 1 : 0,
        pointerEvents: isActive ? "all" : "none",
        duration: 0.65,
        ease: "power1.inOut",
      })
      .to(popupDesc.current, {
        opacity: isActive ? 1 : 0,
        duration: 0.65,
      });
  }, [isActive]);

  useEffect(() => {
    if (typeof selectedIndex !== "undefined") initalizePopup(selectedIndex);
  }, [selectedIndex]);

  const handleClose = () => {
    setState((prev) => ({ ...prev, isActive: false }));
  };

  useEffect(() => {
    const moveCursor = (e) => {
      if (!cursorRef.current) return;
      if (window.innerWidth >= 1152) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.2,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div
      ref={popup}
      role="presentation"
      className="@container fixed inset-0 z-[70] bg-white cursor-none"
      onClick={handleClose}
    >
      <div
        className="popup-content-scrollable h-full overflow-y-auto overflow-x-hidden md:px-5 lg:px-7.5 px-3.5 select-none"
        data-lenis-prevent
      >
        <div className="min-h-full flex flex-col md:grid md:grid-cols-4 md:gap-4 md:items-start">
          <div className="bg-whiteBg md:col-span-2 flex justify-center items-start md:h-svh md:sticky top-0">
            <img
              ref={popupImage}
              className="w-full max-h-[50vh] md:max-h-full object-contain"
              alt={leadersData[selectedIndex]?.name}
            />
          </div>

          <div className="md:col-span-2 flex flex-col justify-start gap-y-6 py-8 md:py-10">
            <div className="flex flex-col gap-y-4 mb-4">
              <h1 className="flex flex-col gap-4 text-heading3 text-primary leading-[105%] tracking-heading3">
                {leadersData[selectedIndex]?.name}
              </h1>
              <p className="text-bodySmall text-black font-neueMontreal">
                {leadersData[selectedIndex]?.position}
              </p>
            </div>

            {leadersData[selectedIndex]?.description?.length > 0 && (
              <div className="h-fit space-y-4">
                {leadersData[selectedIndex].description.map((para, id) => (
                  <p
                    key={id}
                    className="text-bodyBase text-textPrimary font-neueMontreal leading-[120%]"
                  >
                    {para}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 pointer-events-none z-[80] hidden @6xl:block"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <img
          src="/images/icons/close-button.svg"
          alt="Popup Cursor"
          className="w-full h-full object-contain"
        />
      </div>

      <div
        className="fixed top-5 md:top-8 lg:top-10 right-3.5 md:right-5 lg:right-10 w-10 h-10 pointer-events-none z-[80] block @6xl:hidden"
      >
        <img
          src="/images/icons/close-button.svg"
          alt="Popup Close button for less then 1152"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default Popup;
