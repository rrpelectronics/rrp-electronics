"use client";
import React from "react";

const JourneyYear = ({
  yearRef,
  yearTextRef,
  prevRef,
  nextRef,
  activeIndex,
  total,
}) => (
  <div className="col-span-4 flex justify-between items-center">
    <h3
      ref={yearRef}
      className="mb-6.5 col-span-4 text-display text-primary tracking-display leading-[110%] w-fit px-3.5 md:px-5 lg:px-10"
    >
      <span ref={yearTextRef}>2024</span>
    </h3>
    <div className="flex justify-center items-center gap-3 md:gap-4 col-span-1 w-fit ml-auto mr-0 h-fit pr-3.5 md:pr-5 lg:pr-10">
      <button
        ref={prevRef}
        disabled={activeIndex === 0}
        className="cursor-pointer h-7 w-7 text-white md:h-10 md:w-10 flex justify-center items-center disabled:opacity-60 disabled:pointer-events-none disabled:cursor-not-allowed"
      >
        {/* Left Arrow SVG */}
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40">
          <rect width="40" height="40" rx="20" fill="#2E2E30" />
          <path
            d="M22 25.3L16.7 20 22 14.7 22.7 15.4 18.1 20 22.7 24.6 22 25.3Z"
            fill="currentColor"
          />
        </svg>
      </button>
      <button
        ref={nextRef}
        disabled={activeIndex === total - 1}
        className="cursor-pointer h-7 w-7 text-white md:h-10 md:w-10 flex justify-center items-center -scale-x-100 disabled:opacity-60 disabled:pointer-events-none disabled:cursor-not-allowed"
      >
        {/* Right Arrow SVG (mirrored) */}
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40">
          <rect width="40" height="40" rx="20" fill="#2E2E30" />
          <path
            d="M22 25.3L16.7 20 22 14.7 22.7 15.4 18.1 20 22.7 24.6 22 25.3Z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  </div>
);

export default JourneyYear;
