"use client";
import React from "react";
import Link from "next/link";
import { useTextAnimation } from "@/app/hooks/UseTextAnimation";

const RajendraUpdate = () => {
  const { containerRef } = useTextAnimation();

  return (
    <section
      ref={containerRef}
      className="bg-white h-fit w-full grid grid-cols-4 gap-x-3 md:gap-x-5 gap-y-6 px-3.5 md:px-5 lg:px-10 py-10 md:py-15 items-stretch"
    >
      <div className="bg-whiteBg col-span-4 sm:col-span-2 h-[40vh] md:h-[50vh] lg:h-[70vh] relative overflow-hidden">
        <img
          src={"/images/leadership/rajendra-sir.webp"}
          alt="Mr. Rajendra Chodankar"
          className="h-full w-auto mx-auto"
        />
      </div>
      <div className="col-span-4 sm:col-span-2 flex flex-col justify-between lg:gap-y-8">
        <div className="flex items-start justify-between">
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
          <Link
            href={"https://www.linkedin.com/company/rrp-electronics"}
            target="_blank"
            className="text-textSecondary hover:text-primary transition-colors ease-in-out h-5 md:h-7 w-5 md:w-7 mt-[6px] md:mt-[12px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              className="h-full w-full"
            >
              <path
                d="M25.9273 0H2.06718C0.92422 0 0 0.902343 0 2.01797V25.9766C0 27.0922 0.92422 28 2.06718 28H25.9273C27.0703 28 28 27.0922 28 25.9819V2.01797C28 0.902343 27.0703 0 25.9273 0ZM8.30703 23.8602H4.15078V10.4945H8.30703V23.8602ZM6.22891 8.67344C4.89453 8.67344 3.81719 7.59609 3.81719 6.26719C3.81719 4.93828 4.89453 3.86094 6.22891 3.86094C7.55781 3.86094 8.63516 4.93828 8.63516 6.26719C8.63516 7.59062 7.55781 8.67344 6.22891 8.67344ZM23.8602 23.8602H19.7094V17.3632C19.7094 15.8156 19.6813 13.8195 17.5496 13.8195C15.3891 13.8195 15.061 15.5094 15.061 17.2539V23.8602H10.9156V10.4945H14.8972V12.3211H14.9531C15.5039 11.2711 16.8602 10.161 18.8789 10.161C23.0836 10.161 23.8602 12.9281 23.8602 16.5266V23.8602Z"
                fill="currentColor"
              />
            </svg>
          </Link>
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
