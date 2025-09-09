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
  <div className="col-span-4 grid grid-cols-4 items-center mb-6.5">
    <h3
      ref={yearRef}
      className="col-span-2 text-display text-primary tracking-display leading-[110%] w-fit px-3.5 md:px-5 lg:px-10"
    >
      <span ref={yearTextRef}>2024</span>
    </h3>
    <div className="col-span-2 flex justify-center items-center gap-3 md:gap-4 ml-auto mr-0 h-fit pr-3.5 md:pr-5 lg:pr-10">
      <button
        ref={prevRef}
        disabled={activeIndex === 0}
        className="flex cursor-pointer items-center justify-center rounded-full bg-[#2E2E30] text-white
             h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12
             disabled:opacity-60 disabled:pointer-events-none"
      >
        {/* Left Arrow */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 md:h-5 md:w-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M15 18 9 12l6-6 1.4 1.4L11.8 12l4.6 4.6L15 18Z" />
        </svg>
      </button>

      <button
        ref={nextRef}
        disabled={activeIndex === total - 1}
        className="flex cursor-pointer items-center justify-center rounded-full bg-[#2E2E30] text-white
             h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12
             disabled:opacity-60 disabled:pointer-events-none -scale-x-100"
      >
        {/* Right Arrow (mirrored) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 md:h-5 md:w-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M15 18 9 12l6-6 1.4 1.4L11.8 12l4.6 4.6L15 18Z" />
        </svg>
      </button>
    </div>
  </div>
);

export default JourneyYear;
