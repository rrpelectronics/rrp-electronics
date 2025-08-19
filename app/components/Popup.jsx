import { useContext, useEffect, useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { leadersData } from "../leadersData";
import { useAppContext } from "./AppContext";

const Popup = () => {
  const { state, setState } = useAppContext();
  const { selectedIndex, isActive } = state;

  let cursor = useRef();
  let popup = useRef();
  let popupDesc = useRef();
  let popupImage = useRef();

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
      popupImage.current.src = leaders.imgThum;
      popupImage.current.alt = leaders.name;
    }
  }

  function moveCursor(e) {
    if (cursor.current) {
      cursor.current.style.display = "block";
      const isMobile = window.innerWidth < 768;
      
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
      className="overflow-scroll md:overflow-visible fixed inset-0 flex flex-col md:flex-row justify-start padding-block-[72px] padding-inline-[40px] bg-white z-[10000] md:px-10 px-3.5"
      onMouseMove={moveCursor}
      onClick={handleClose}
    >
      <div
        ref={cursor}
        className="bg-whiteBg flex justify-center items-center w-10 h-10 rounded-full md:absolute md:top-50 md:left-50 md:-translate-x-1/2 md:-translate-y-1/2 fixed top-5 right-5 z-[10001]"
      >
        <img src="/Images/icons/close.svg" className="w-full h-full scale-75"/>
      </div>
      <div className="w-full h-full flex flex-col md:grid md:grid-cols-4 md:gap-4">
        <img 
          ref={popupImage} 
          className="w-full h-1/2 md:h-screen md:col-span-2 object-contain" 
        />

        <div className="bg-white flex-1 md:col-span-2 md:h-screen flex flex-col justify-center gap-y-4 pt-4 md:pt-0">
          <div>
            <h1 className="flex flex-col gap-4 text-heading3 text-primary leading-[105%] tracking-heading3">
              {leadersData[selectedIndex]?.name}
            </h1>
            <p className="text-bodySmall text-black">
              {leadersData[selectedIndex]?.position}
            </p>
          </div>
          <div>
            <p ref={popupDesc} className="text-bodyBase text-textPrimary">
              {leadersData[selectedIndex]?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;