import { useContext, useEffect, useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { leadersData } from "../leadersData";
import { useAppContext } from "./AppContext";
// import SplitType from "split-type"

const Popup = () => {
  const { state, setState } = useAppContext();
  const { selectedIndex, isActive } = state;

  let cursor = useRef();
  let popup = useRef();
  let popupDesc = useRef();
  let popupImage = useRef();
  // let text = new SplitType('.popupDescription', { types: 'lines' })

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
      popupImage.current.src = leaders.imgPath;
      popupImage.current.alt = leaders.name;
    }
  }

  function moveCursor(e) {
    if (cursor.current) {
      cursor.current.style.display = "block";
      let x = e.clientX;
      let y = e.clientY;
      cursor.current.style.left = `${x - 10}px`;
      cursor.current.style.top = `${y - 10}px`;
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
      className="fixed inset-0 flex flex-col justify-start padding-block-[72px] padding-inline-[40px] bg-white overflow-visible z-[10000] px-10"
      onMouseMove={moveCursor}
      onClick={handleClose}
    >
      <div
        ref={cursor}
        className="w-10 h-10 bg-primary rounded-full absolute top-50 left-50 -translate-x-1/2 -translate-y-1/2"
      ></div>
      <div className="w-full h-screen flex flex-row gap-y-4">
        <img ref={popupImage} className="w-1/2 h-screen object-contain" />
        <div className="w-1/2 h-screen flex flex-col gap-y-4">
          <h1 className="text-heading3 text-primary leading-[105%] tracking-heading3">
            {leadersData[selectedIndex].name}
          </h1>
          <p className="text-bodyBase text-textPrimary">
            {leadersData[selectedIndex].position}
          </p>
          <p ref={popupDesc} className="text-sm text-gray-500">
            {leadersData[selectedIndex].position}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Popup;
