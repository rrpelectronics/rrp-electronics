"use client";
import { useState, useEffect } from "react";

const useSmallScreen = () => {
  const [isDevice, setIsDevice] = useState(false);

  useEffect(() => {
    // Set initial value after component mounts
    setIsDevice(window.innerWidth < 640);

    const handleResize = () => {
      setIsDevice(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isDevice;
};
export default useSmallScreen;