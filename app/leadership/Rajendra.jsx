"use client";
import React from 'react';
import Image from 'next/image';

const Rajendra = () => {
  return (
    <section
      className="h-fit w-full grid grid-cols-4  sm:flex gap-y-4 sm:gap-x-10 lg:gap--x-15 justify-center items-center bg-darkBg bg-contain bg-center"
      style={{
        backgroundImage: "url('/images/leadership/leader-banner.webp')",
      }}
    >
      <div className="relative w-full bg-[#0f0f18] max-w-[35%] hidden sm:block">
        <img
          src="/images/leadership/rajendra.webp"
          alt="Rajendra Chodankar"
          className="w-full h-auto"
        />
      </div>
      
      <div className="w-full h-full flex flex-col px-3.5 md:px-0 sm:py-10 lg:py-15 justify-between">
        <div>
          <h3></h3>
          <p></p>
        </div>
        <p></p>
      </div>
    </section>
  );
}

export default Rajendra