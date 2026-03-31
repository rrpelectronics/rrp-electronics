"use client";
import React from "react";
import Image from "next/image";
import HeadingCenter from "@/components/HeadingCenter";

const Grid = () => {

  return (
    <section className="h-fit w-full py-10 md:py-15 bg-background">
      <HeadingCenter heading={"Our People. Our Principles. \n Our Progress."} />
      <div
        className="grid grid-cols-4 px-3.5 md:px-5 lg:px-10 gap-x-3 gap-y-6 sm:gap-y-0 sm:gap-x-0 sm:grid-cols-12"
      >
        <div className="relative overflow-hidden w-full aspect-square col-span-4">
          <Image
            src={"/images/home/young-talent.webp"}
            alt="Young Talents"
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            className="object-cover object-center"
          />
          <div className="bg-black/70 absolute z-2 inset-0" />
        </div>
        <div className="flex flex-col justify-end w-full aspect-square col-span-4 p-5 lg:p-6 bg-darkBg">
          <p
                        className="text-white text-heading4 leading-[115%]"
          >
            Young Talent
          </p>
        </div>
        <div className="relative overflow-hidden w-full aspect-square col-span-4">
          <Image
            src={"/images/home/employement-generation.webp"}
            alt="Employement Generation"
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            className="object-cover object-center"
          />
          <div className="bg-black/70 absolute z-2 inset-0" />
        </div>
        <div className="flex flex-col justify-end w-full aspect-square col-span-4 p-5 lg:p-6 bg-primary">
          <p
                        className="text-white text-heading4 leading-[115%]"
          >
            Employment Generation
          </p>
        </div>
        <div className="relative overflow-hidden w-full aspect-square col-span-4">
          <Image
            src={"/images/home/women.webp"}
            alt="85% Women Empowerment"
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            className="object-cover object-center"
          />
          <div className="bg-black/70 absolute z-2 inset-0" />
        </div>
        <div className="flex flex-col justify-end w-full aspect-square col-span-4 p-5 lg:p-6 bg-whiteBg">
          <p
                        className="text-black text-heading4 leading-[115%]"
          >
            Empowering Women
          </p>
        </div>
      </div>
    </section>
  );
};

export default Grid;
