"use client";
import React from "react";
import Image from "next/image";
import HeadingCenter from "../components/HeadingCenter";

const Grid = () => {
  return (
    <section className="h-fit w-full py-10 md:py-15 bg-background">
      <HeadingCenter
        heading={"Our People. Our Principles. \n Our Progress."}
      />
      <div className="min-w-full overflow-x-scroll no-scrollbar px-3.5 md:px-7.5">
        <div className="flex w-[996px] sm:w-[150vw] lg:w-full flex-wrap lg:grid lg:grid-cols-12">
          <div className="relative overflow-hidden w-[332px] sm:w-[33.33%] lg:w-full aspect-square col-span-4">
            <Image
              src={"/images/home/young-talent.webp"}
              alt="Young Talents"
              fill
              sizes="50vw"
              className="object-cover object-center"
            />
          </div>
          <div className="flex flex-col justify-end w-[332px] sm:w-[33.33%] lg:w-full aspect-square col-span-4 p-5 lg:p-6 bg-darkBg">
            <p className="text-white text-heading3 tracking-heading3 leading-[115%]">
              Young Talent
            </p>
          </div>
          <div className="relative overflow-hidden w-[332px] sm:w-[33.33%] lg:w-full aspect-square col-span-4">
            <Image
              src={"/images/home/employement-generation.webp"}
              alt="Employement Generation"
              fill
              sizes="50vw"
              className="object-cover object-center"
            />
          </div>
          <div className="flex flex-col justify-end w-[332px] sm:w-[33.33%] lg:w-full aspect-square col-span-4 p-5 lg:p-6 bg-primary">
            <p className="text-white text-heading3 tracking-heading3 leading-[115%]">
              Employment Generation
            </p>
          </div>
          <div className="relative overflow-hidden w-[332px] sm:w-[33.33%] lg:w-full aspect-square col-span-4">
            <Image
              src={"/images/home/women.webp"}
              alt="85% Women Empowerment"
              fill
              sizes="50vw"
              className="object-cover object-center"
            />
          </div>
          <div className="flex flex-col justify-end w-[332px] sm:w-[33.33%] lg:w-full aspect-square col-span-4 p-5 lg:p-6 bg-whiteBg">
            <p className="text-black text-heading3 tracking-heading3 leading-[115%]">
              Empowering Women
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Grid;
