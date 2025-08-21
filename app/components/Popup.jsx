"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { leadersData } from "@/app/leadership/leadersData";
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
      const isMobile = window.innerWidth < 1152;

      if (isMobile) {
        cursor.current.style.display = "block";
        cursor.current.style.position = "fixed";
        cursor.current.style.top = "20px";
        cursor.current.style.right = "40px";
        cursor.current.style.left = "auto";
        cursor.current.style.transform = "none";
      } else {
        cursor.current.style.display = "block";
        cursor.current.style.position = "fixed";
        cursor.current.style.left = e.clientX - 20 + "px";
        cursor.current.style.top = e.clientY - 20 + "px";
        cursor.current.style.right = "auto";
        cursor.current.style.transform = "none";
        const isNearScrollbar = e.clientX > window.innerWidth - 20;
        
        if (isNearScrollbar) {
          cursor.current.style.display = "none";
          popup.current.style.cursor = "auto";
        } else {
          cursor.current.style.display = "block";
          popup.current.style.cursor = "none";
        }
      }
    }
  }

  function handleMouseLeave() {
    const isMobile = window.innerWidth < 1152;
    if (cursor.current) {
      if (isMobile) {
        cursor.current.style.display = "none";
      } else {
        cursor.current.style.display = "none";
        if (popup.current) {
          popup.current.style.cursor = "auto";
        }
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

  useEffect(() => {
    if (isActive && cursor.current) {
      const isMobile = window.innerWidth < 1152;
      if (!isMobile) {
        cursor.current.style.display = "block";
        if (popup.current) {
          popup.current.style.cursor = "none";
        }
      } else {
        moveCursor();
      }
    }
  }, [isActive]);

  const handleClose = () => {
    setState((prev) => ({ ...prev, isActive: false }));
  };

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <section
      ref={popup}
      role="presentation"
      className="fixed inset-0 z-[70] bg-white"
      onMouseMove={moveCursor}
      onMouseLeave={handleMouseLeave}
      onClick={handleClose}
      style={{ cursor: "none" }}
    >
      <div
        ref={cursor}
        className="bg-primary flex justify-center items-center w-10 h-10 rounded-full fixed z-[80]"
        onClick={handleClose}
        style={{
          display: "none",
          pointerEvents: "none",
        }}
      >
        <img
          src="/images/icons/close.svg"
          className="w-full h-full scale-75 cursor-auto"
          alt="Close"
        />
      </div>

      <div
        className="popup-content-scrollable h-full overflow-y-auto overflow-x-hidden md:px-5 lg:px-7.5 px-3.5 select-none"
        onClick={handleContentClick}
        data-lenis-prevent
      >
        <div className="min-h-full flex flex-col md:grid md:grid-cols-4 md:gap-4 md:items-start">
          <div className="bg-whiteBg md:col-span-2 flex justify-center items-start md:top-8 md:h-[calc(100vh-4rem)] md:sticky top-0">
            <img
              ref={popupImage}
              className="w-full max-h-[50vh] md:max-h-full object-contain"
              alt=""
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

            {leadersData[selectedIndex]?.description &&
              leadersData[selectedIndex]?.description.length > 0 && (
                <div className="h-fit space-y-4">
                  {leadersData[selectedIndex]?.description.map((para, id) => (
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

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Popup;