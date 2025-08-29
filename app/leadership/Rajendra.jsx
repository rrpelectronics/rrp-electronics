"use client";
import React from "react";
import Image from "next/image";
import { useTextAnimation } from "@/app/hooks/UseTextAnimation";

const RajendraUpdate = () => {
  const { containerRef } = useTextAnimation();

  return (
    <section
      ref={containerRef}
      className="h-fit w-full grid grid-cols-4 gap-x-3 md:gap-x-5 gap-y-6 px-3.5 md:px-5 lg:px-10 py-10 md:py-15 items-stretch"
    >
      <div className="bg-whiteBg col-span-4 sm:col-span-2 h-[40vh] md:h-[50vh] lg:h-[70vh] relative overflow-hidden">
        <img
          src={"/images/leadership/rajendra-sir.webp"}
          alt="Mr. Rajendra Chodankar"
          className="h-full w-auto mx-auto"
        />
      </div>
      <div className="col-span-4 sm:col-span-2 flex flex-col justify-between lg:gap-y-8">
        <div className="flex flex-col gap-y-2 md:gap-y-4">
          <h3
            data-animate-text
            className="text-heading3 tracking-heading3 lg:text-heading2 lg:tracking-heading2 leading-[110%] text-primary"
          >
            Rajendra Chodankar
          </h3>
          <p
            data-animate-text
            className="text-black text-bodySmall lg:text-bodyBase leading-[120%] font-neueMontreal"
          >
            Founder & Chairman
          </p>
        </div>
        <div className="text-textPrimary leading-[120%] text-bodyBase lg:text-bodyLarge font-neueMontreal mt-8 sm:mt-0 flex flex-col gap-y-4">
          <p data-animate-text>
            Under the leadership of Mr. Rajendra Chodankar, RRP Electronics Ltd.
            has emerged as one of the fastest-growing players in the
            semiconductor industry with its advanced OSAT facility. The company
            is expanding into fan-out packaging, memory device assembly, and a
            dedicated fab lab for thermal imaging devices, strengthening its
            position in high-tech manufacturing.
          </p>
          <p data-animate-text>
            With 40+ years of engineering expertise, Mr. Chodankar—an innovator,
            patent holder, and Padma Shri nominee—founded India’s first
            nano-machining facility (2001) and achieved 1-micron tolerance
            prototyping (2005). His work spans mass spectrometry, vacuum
            systems, elemental analysis, space telescope components, and
            delivering 10,000+ optical parts for fire-control systems.
          </p>
          <p data-animate-text>
            His vision, rooted in precision and innovation, continues to drive
            India’s progress in advanced manufacturing and semiconductors.
          </p>
        </div>
      </div>
    </section>
  );
};

export default RajendraUpdate;
