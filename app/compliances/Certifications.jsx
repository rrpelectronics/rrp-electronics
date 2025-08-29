"use client";
import React from "react";
import SectionHeader from "@/app/components/SectionHeader";
import { useTextAnimation } from "@/app/hooks/UseTextAnimation";

export default function Certifications() {
  const { containerRef } = useTextAnimation();
  return (
    <section className="h-fit w-full py-10 md:py-15 bg-white">
      <SectionHeader
        heading={"Certifications & Standards"}
        text={
          "At RRP Electronics, our globally recognized certifications reflect our commitment to quality, safety, and sustainability, ensuring every product meets international standards."
        }
      />

      <div
        ref={containerRef}
        className="col-span-4 grid grid-cols-4 gap-x-3.5 md:gap-x-5 gap-y-6 px-3.5 md:px-5 lg:px-5"
      >
        <div className="col-span-4 md:col-span-2 aspect-[590/290] w-full p-4 flex flex-col justify-between bg-whiteBg">
          <div className="flex justify-end">
            <img
              src="/images/icons/arrow_outward.svg"
              alt="ISO Icon"
              className="h-7 w-7 md:h-10 md:w-10"
            />
          </div>
          <div className="flex flex-col gap-4">
            <h3
              data-animate-text
              className="text-heading4 leading-[115%] text-black"
            >
              ISO 9001:2015
            </h3>
            <p
              data-animate-text
              className="text-bodySmall leading-[120%] text-textPrimary"
            >
              Quality Management System (QMS)
            </p>
          </div>
        </div>

        <div className="col-span-4 md:col-span-2 aspect-[590/290] w-full p-4 flex flex-col justify-between bg-whiteBg">
          <div className="flex justify-end">
            <img
              src="/images/icons/arrow_outward.svg"
              alt="ISO Icon"
              className="h-7 w-7 md:h-10 md:w-10"
            />
          </div>
          <div className="flex flex-col gap-4">
            <h3
              data-animate-text
              className="text-heading4 leading-[115%] text-black"
            >
              ISO 14001:2015
            </h3>
            <p
              data-animate-text
              className="text-bodySmall leading-[120%] text-textPrimary"
            >
              Environmental Management System (EMS)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
