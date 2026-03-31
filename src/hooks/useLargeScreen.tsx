"use client";
import { useState, useEffect } from "react";

const useLargeScreen = () => {
  const [isDevice, setIsDevice] = useState(false);

  useEffect(() => {
    // Set initial value after component mounts
    setIsDevice(window.innerWidth >= 1024);

    const handleResize = () => {
      setIsDevice(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isDevice;
};
export default useLargeScreen;
