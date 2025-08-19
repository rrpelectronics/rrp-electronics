"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import UseScreenSizeMedium from "../hooks/UseScreenSizeMedium";

const OurJourney = () => {
  const yearRef = useRef(null);
  const timelineRef = useRef(null);
  const containerRef = useRef(null);
  const [yearWidth, setYearWidth] = useState(0);
  const [currentYear, setCurrentYear] = useState("2024");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const titleRef = useRef([]);
  const isMedium = UseScreenSizeMedium();

  // Enhanced timeline items with buffer for smooth infinite scroll
  const timelineItems = useRef([0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5]);
  const [renderKey, setRenderKey] = useState(0);

  //Functionality for Active Dot Alignment
  useEffect(() => {
    const updateWidth = () => {
      if (yearRef.current) {
        const width = yearRef.current.getBoundingClientRect().width;
        setYearWidth(width);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Timeline data for easy reference
  const timelineData = [
    { year: "2024", month: "March", image: "/images/our-journey/image1.webp" },
    {
      year: "2024",
      month: "September",
      image: "/images/our-journey/image1.webp",
    },
    {
      year: "2024",
      month: "December",
      image: "/images/our-journey/image1.webp",
    },
    {
      year: "2025",
      month: "January",
      image: "/images/our-journey/image1.webp",
    },
    {
      year: "2025",
      month: "February",
      image: "/images/our-journey/image1.webp",
    },
    {
      year: "2025",
      month: "September",
      image: "/images/our-journey/image1.webp",
    },
  ];

  // Get element width for calculations
  const getElementWidth = useCallback(() => {
    return isMedium ? 200 : 240; // Approximate width including gaps
  }, [isMedium]);

  // Get actual data index
  const getActualIndex = (index) => index % timelineData.length;

  // Render timeline element with optimized performance
  const renderTimelineElement = useCallback(
    (itemIndex, arrayPosition) => {
      const actualIndex = getActualIndex(itemIndex);
      const data = timelineData[actualIndex];
      const isActive = arrayPosition === 0 && actualIndex === activeIndex;

      return (
        <div
          key={`${actualIndex}-${arrayPosition}-${renderKey}`}
          ref={(el) => {
            if (isActive) titleRef.current[actualIndex] = el;
          }}
          style={isActive ? getActiveElementStyle() : getInactiveElementStyle()}
          className={`
          flex flex-col gap-6 justify-center cursor-pointer
          ${isActive ? "items-start" : "items-center"}
          ${isAnimating ? "pointer-events-none" : ""}
        `}
          onClick={() =>
            !isAnimating && handleTimelineClick(actualIndex, arrayPosition)
          }
        >
          <div
            style={
              isActive
                ? {
                    marginInline: isMedium
                      ? (yearWidth - 60) / 2 - (yearWidth - 60) * 0.05
                      : (yearWidth - 28) / 2 - (yearWidth - 28) * 0.05,
                  }
                : {}
            }
            className={`h-4.5 w-4.5 rounded-full cursor-pointer will-change-auto ${
              isActive ? "bg-primary" : "bg-textPrimary"
            }`}
          />
          <p className="text-bodyBase text-textSecondary leading-[120%] font-neueMontreal whitespace-nowrap">
            {data.month}, {data.year}
          </p>
        </div>
      );
    },
    [activeIndex, yearWidth, isMedium, isAnimating, renderKey]
  );

  // Get styles for active element
  const getActiveElementStyle = () => ({
    width: "clamp(15.375rem, 12.587rem + 12.39vw, 19.5rem)",
    // marginRight: "clamp(1.25rem, -2.712rem + 17.61vw, 11.375rem)",
    flexShrink: 0,
    willChange: "width, margin",
  });

  // Get styles for inactive elements
  const getInactiveElementStyle = () => ({
    width: "200px",
    marginRight: "0",
    flexShrink: 0,
    willChange: "width, margin",
  });

  // Ultra-smooth animation using requestAnimationFrame
  const animateToPosition = (targetX, duration = 600) => {
    return new Promise((resolve) => {
      const startTime = performance.now();
      const startX = translateX;
      const distance = targetX - startX;

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Smooth easing function
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentX = startX + distance * easeOutCubic;

        setTranslateX(currentX);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          resolve();
        }
      };

      requestAnimationFrame(animate);
    });
  };

  // Optimized click handler
  const handleTimelineClick = async (clickedActualIndex, clickedPosition) => {
    if (isAnimating || clickedPosition === 0) return;

    setIsAnimating(true);

    // Update state immediately for instant visual feedback
    setActiveIndex(clickedActualIndex);
    setCurrentYear(timelineData[clickedActualIndex].year);

    const elementWidth = getElementWidth();
    const moveDistance = elementWidth * clickedPosition;

    try {
      // Phase 1: Smooth slide animation
      await animateToPosition(-moveDistance, 500);

      // Phase 2: Instant rearrangement (happens off-screen)
      const currentItems = [...timelineItems.current];

      // Rotate array to bring clicked item to front
      for (let i = 0; i < clickedPosition; i++) {
        const item = currentItems.shift();
        currentItems.push(item);
      }

      timelineItems.current = currentItems;

      // Reset position instantly (no visual change since items moved)
      setTranslateX(0);
      setRenderKey((prev) => prev + 1); // Force re-render with new order

      // Small delay for DOM to settle
      await new Promise((resolve) => setTimeout(resolve, 50));
    } catch (error) {
      console.error("Animation error:", error);
    } finally {
      setIsAnimating(false);
    }
  };

  // Handle next button click
  const handleNextClick = () => {
    if (isAnimating) return;

    const nextActualIndex = (activeIndex + 1) % timelineData.length;
    // Find the position of next item in current array
    const nextPosition = timelineItems.current.findIndex(
      (item) => getActualIndex(item) === nextActualIndex
    );

    if (nextPosition > 0) {
      handleTimelineClick(nextActualIndex, nextPosition);
    }
  };

  return (
    <section className="h-full w-full flex flex-col justify-start gap-10 py-15 lg:py-25 bg-black">
      <div className="h-fit w-full grid grid-cols-4 gap-x-3 md:gap-x-4 items-end px-3.5 md:px-10">
        <h3 className="text-heading2 text-white leading-[110%] tracking-heading2 col-span-3">
          Our Evolution at <br /> RRP Electronics
        </h3>
        <div className="flex justify-center items-center gap-3 md:gap-4 col-span-1 w-fit ml-auto mr-0 h-fit">
          <button
            disabled
            className="cursor-pointer h-7 w-7 text-white md:h-10 md:w-10 flex justify-center items-center opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
            >
              <rect width="40" height="40" rx="20" fill="#2E2E30" />
              <mask
                id="mask0_453_1226"
                maskUnits="userSpaceOnUse"
                x="8"
                y="8"
                width="24"
                height="24"
              >
                <rect x="8" y="8" width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_453_1226)">
                <path
                  d="M22.0001 25.3078L16.6924 20L22.0001 14.6923L22.7079 15.4L18.1079 20L22.7079 24.6L22.0001 25.3078Z"
                  fill="currentColor"
                />
              </g>
            </svg>
          </button>
          <button
            className={`cursor-pointer h-7 w-7 text-white md:h-10 md:w-10 flex justify-center items-center -scale-x-100 rounded-full transition-all duration-200 ${
              isAnimating
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-orange/20"
            }`}
            onClick={handleNextClick}
            disabled={isAnimating}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
            >
              <rect width="40" height="40" rx="20" fill="#2E2E30" />
              <mask
                id="mask0_453_1227"
                maskUnits="userSpaceOnUse"
                x="8"
                y="8"
                width="24"
                height="24"
              >
                <rect x="8" y="8" width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_453_1227)">
                <path
                  d="M22.0001 25.3078L16.6924 20L22.0001 14.6923L22.7079 15.4L18.1079 20L22.7079 24.6L22.0001 25.3078Z"
                  fill="currentColor"
                />
              </g>
            </svg>
          </button>
        </div>
      </div>

      <div className="h-fit w-full grid grid-cols-4 gap-x-3 md:gap-x-4">
        <div className="relative mb-6.5 col-span-4 px-3.5 md:px-10">
          <h3
            ref={yearRef}
            className="text-display text-primary tracking-display leading-[105%] w-fit transition-all duration-300 ease-out"
            style={{ willChange: "contents" }}
          >
            {currentYear}
          </h3>
          <div
            style={{ top: "calc(100% + 35px)" }}
            className="w-full left-0 h-0.25 absolute bg-textSecondary z-1"
          />
        </div>

        <div
          ref={containerRef}
          className="relative min-w-full overflow-hidden col-span-4"
          style={{ willChange: "transform" }}
        >
          <div
            ref={timelineRef}
            className="flex gap-7 md:gap-8 h-fit items-start relative z-2 px-8 md:px-16"
            style={{
              width: "max-content",
              transform: `translate3d(${translateX}px, 0, 0)`,
              willChange: "transform",
              backfaceVisibility: "hidden",
              perspective: "1000px",
            }}
          >
            {timelineItems.current.map((itemIndex, arrayPosition) =>
              renderTimelineElement(itemIndex, arrayPosition)
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-x-3 md:gap-x-4 px-3.5 md:px-10">
        <div className="flex flex-col gap-6 justify-center items-start col-span-2 max-w-[22.5rem]">
          <img
            src={timelineData[activeIndex].image}
            alt={getEventTitle(activeIndex)}
            className="w-full h-full object-cover transition-opacity duration-300 ease-out"
            loading="lazy"
          />
          <p
            className="text-white leading-[115%] text-heading4 transition-all duration-300 ease-out"
            style={{ willChange: "contents" }}
          >
            {getEventTitle(activeIndex)}
          </p>
          <p
            className="text-bodySmall text-textSecondary leading-[120%] font-neueMontreal -mt-2 transition-all duration-300 ease-out"
            style={{ willChange: "contents" }}
          >
            {getEventDescription(activeIndex)}
          </p>
        </div>
        <div className="col-span-2 flex justify-end items-start">
          <div
            className="w-[285px] h-[214px] rounded-lg overflow-hidden transition-all duration-300 ease-out"
            style={{
              aspectRatio: "285/214",
              willChange: "contents",
            }}
          ></div>
        </div>
      </div>
    </section>
  );

  // Helper functions for dynamic content
  function getEventTitle(index) {
    const titles = [
      "Bhoomi Poojan Ceremony",
      "Infrastructure Development",
      "Technology Integration",
      "Production Commencement",
      "Quality Certification",
      "Market Expansion",
    ];
    return titles[index] || "Bhoomi Poojan Ceremony";
  }

  function getEventDescription(index) {
    const descriptions = [
      "The foundation of RRP Electronics was laid with a traditional Bhoomi Poojan, marking the beginning of our journey in the semiconductor domain.",
      "Major infrastructure development phase with state-of-the-art facilities and equipment installation for semiconductor manufacturing.",
      "Integration of cutting-edge technology and automated systems to enhance production capabilities and quality standards.",
      "Official commencement of production operations with first batch of high-quality semiconductor components.",
      "Achievement of international quality certifications and compliance with global semiconductor industry standards.",
      "Strategic expansion into new markets and establishment of partnerships with leading technology companies worldwide.",
    ];
    return descriptions[index] || descriptions[0];
  }
};

export default OurJourney;
