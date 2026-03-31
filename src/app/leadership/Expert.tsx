"use client";
import React from "react";
import SectionHeader from "@/components/SectionHeader";
import Image from "next/image";

const Expert = () => {

  return (
    <section
      className="bg-white h-fit w-full py-10 md:py-15"
    >
      <SectionHeader
        heading={"Meet Our Experts"}
      />
      <div className="grid grid-cols-4 sm:grid-cols-12 gap-x-3 md:gap-x-5 gap-y-7 px-3.5 md:px-5 lg:px-10">
        <div className="flex flex-col gap-y-4.5 col-span-4 lg:col-span-3">
          <div className="w-full aspect-square sm:aspect-square relative bg-[#f8f8fc] flex flex-col justify-end">
            <img
              src={"/images/leadership/anil-kakodkar.webp"}
              alt="Dr. Anil Kakodkar"
              className="h-[96%] w-auto mx-auto"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <p data-animate-text className="text-heading4 leading-[115%] text-black">
              Dr. Anil Kakodkar
            </p>
            <p data-animate-text className="text-textSecondary text-bodyBase leading-[120%] font-neueMontreal">
              Our Mentor
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-y-4.5 col-span-4 lg:col-span-3">
          <div className="w-full aspect-square sm:aspect-square relative bg-[#f8f8fc] flex flex-col justify-end">
            <img
              src={"/images/leadership/sachin-tendulkar.webp"}
              alt="Dr. Anil Kakodkar"
              className="h-[96%] w-auto mx-auto"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <p data-animate-text className="text-heading4 leading-[115%] text-black">
              Sachin Tendulkar
            </p>
            <p data-animate-text className="text-textSecondary text-bodyBase leading-[120%] font-neueMontreal">
              Our Strategic Investor
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Expert;
