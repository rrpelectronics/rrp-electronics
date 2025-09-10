"use client";
import React, { useState, useEffect } from "react";
import { useTextAnimation } from "@/app/hooks/UseTextAnimation";

const VideoImgSection = ({ videoSrc, heading, text, placeholder }) => {
  const { containerRef } = useTextAnimation();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [shouldAutoplay, setShouldAutoplay] = useState(false);

  const openVideo = () => setIsVideoOpen(true);
  const closeVideo = () => setIsVideoOpen(false);

  useEffect(() => {
    let scrollTimeout;

    const handleScroll = () => {
      setShowFloatingButton(false);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setShowFloatingButton(true);
      }, 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(scrollTimeout);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  const handleMouseMove = (e) => {
    const container = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - container.left,
      y: e.clientY - container.top,
    });
    setShowFloatingButton(true);
  };

  const handleMouseEnter = () => {
    setShowFloatingButton(true);
  };

  const handleMouseLeave = () => {
    setShowFloatingButton(false);
  };


  //Check screen size and set autoplay
  useEffect(() => {
    const checkAutoplay = () => {
      setShouldAutoplay(window.innerWidth >= 1152);
    };
    checkAutoplay();
    window.addEventListener("resize", checkAutoplay);
    return () => window.removeEventListener("resize", checkAutoplay);
  }, []);




  return (
    <>
      <section className="relative h-fit overflow-hidden py-10 px-3.5 md:px-5 lg:px-10 md:py-15 bg-white">
        <div
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={openVideo}
          ref={containerRef}
          className="relative h-screen overflow-hidden"
        >
          {/* Floating Play Button */}
          <button
            onClick={openVideo}
            className={`absolute z-30 py-2 px-2 rounded-sm font-neueMontreal text-bodySmall leading-[100%] w-[130px] h-fit flex justify-center items-center gap-2 text-white bg-primary pointer-events-auto cursor-pointer transition-opacity duration-10 ${
              showFloatingButton
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
            style={{
              left: `${mousePosition.x}px`,
              top: `${mousePosition.y}px`,
              transform: "translate(-10%, -50%)",
            }}
          >
            <div className="p-0.5 rounded flex justify-center items-center bg-white/30">
              <img src="/images/icons/play.svg" alt="play button" />
            </div>
            Play Video
          </button>

          {/* Play Button (mobile/tablet) */}
          <div className="xl:hidden z-2 top-1/2 left-1/2 -translate-1/2 absolute opacity-100 rounded-full font-neueMontreal text-bodySmall leading-[100%] w-fit h-fit flex justify-center items-center gap-2 text-white bg-white/20">
            <img
              src="/images/icons/play.svg"
              alt="play button"
              className="h-14 w-14"
            />
          </div>

          {videoSrc && (
            <div className="absolute inset-0 z-0">
              <video
                className="w-full h-full object-cover object-center"
                autoPlay
                muted
                loop
                playsInline
                controls={false}
                poster={placeholder}
              >
                <source src={videoSrc} type="video/mp4" />
              </video>
            </div>
          )}
          <div className="z-2 relative grid grid-cols-4 gap-x-3 md:gap-x-5 w-full h-full py-10 px-3.5 md:px-5 lg:px-10 md:py-15">
            <h3
              data-animate-text
              className="col-span-4 lg:col-span-2 text-white text-heading2 tracking-heading2 leading-[110%] max-w-[590px]"
            >
              {heading.split("\n").map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </h3>

            <div className="col-span-4 col-start-1 lg:col-span-1 lg:col-start-4 flex flex-col gap-5 lg:gap-6 justify-end lg:justify-start">
              <p
                data-animate-text
                className="text-white text-bodyBase font-neueMontreal leading-[120%]"
              >
                {text}
              </p>
            </div>
          </div>
          <div className="absolute inset-0 bg-black/80 z-1"></div>
        </div>
      </section>

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed h-full w-full inset-0 z-50 flex items-center justify-center bg-black/100">
          <button
            onClick={closeVideo}
            className="cursor-pointer absolute w-fit top-3.5 right-3.5 md:top-5 md:right-5 lg:top-10 lg:right-10 z-60 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
          >
            <img
              src="/images/icons/close-button.svg"
              alt="close video"
              className="w-6 h-6"
            />
          </button>
          <div className="relative w-full h-full max-w-[90vw] lg:max-w-[75vw] max-h-[90vh] mx-4">
            <div className="w-full h-full rounded-lg overflow-hidden">
              <video className="w-full h-full object-contain" controls autoPlay>
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoImgSection;
