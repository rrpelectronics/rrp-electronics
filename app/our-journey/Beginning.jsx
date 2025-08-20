"use client";
import React from "react";
import Image from "next/image";

const Beginning = () => {
  return (
    <section className="h-fit w-full grid grid-cols-4 gap-y-10 md:gap-y-15 lg:gap-y-0 gap-x-3 md:gap-x-5 px-3.5 md:px-5 lg:px-10 py-10 md:py-15 bg-white">
      <div className="col-span-2 lg:col-span-1 w-full aspect-[285/214] relative lg:mt-[28%]">
        <Image
          src="/images/our-journey/beginning-top.webp"
          alt="Beginning 1"
          fill
          sizes="25vw"
          className="object-cover object-center"
        />
      </div>
      <div className="hidden md:block lg:hidden col-span-1 w-full aspect-[142/106] relative mt-auto">
        <Image
          src="/images/our-journey/beginning-micro-1.webp"
          alt="Beginning Micro 1"
          fill
          sizes="25%"
          className="object-cover object-center"
        />
      </div>
      <div className="col-span-4 lg:col-span-2 flex flex-col gap-21">
        <div className="hidden lg:block relative aspect-[142/106] w-[25%] ml-auto mr-0">
          <Image
            src="/images/our-journey/beginning-micro-1.webp"
            alt="Beginning Micro 1"
            fill
            sizes="25%"
            className="object-cover object-center"
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-5 md:gap-8 max-w-[590px] mx-auto">
          <h3 className="text-center text-heading2 text-black leading-[105%] tracking-heading2">
            The Beginning
          </h3>
          <p className="text-center text-bodyBase text-textPrimary leading-[120%] font-neueMontreal">
            RRP Electronics was founded with a mission to revolutionize India's
            semiconductor landscape. With a commitment to high-quality,
            scalable, and sustainable solutions, we set out to build a facility
            that would empower industries, fuel innovation, and strengthen
            India’s electronics ecosystem.
          </p>
        </div>
        <div className="hidden lg:block relative aspect-[142/106] w-[25%]">
          <Image
            src="/images/our-journey/beginning-micro-2.webp"
            alt="Beginning Micro 2"
            fill
            sizes="25%"
            className="object-cover object-center"
          />
        </div>
      </div>
      <div className="hidden md:block lg:hidden col-start-2 col-span-1 w-full aspect-[142/106] relative">
        <Image
          src="/images/our-journey/beginning-micro-2.webp"
          alt="Beginning Micro 1"
          fill
          sizes="25%"
          className="object-cover object-center"
        />
      </div>
      <div className="col-span-2 col-start-3 lg:col-span-1 lg:col-start-4 w-full aspect-[285/214] relative lg:mt-[90%]">
        <Image
          src="/images/our-journey/beginning-bottom.webp"
          alt="Beginning 2"
          fill
          sizes="25vw"
          className="object-cover object-center"
        />
      </div>
    </section>
  );
};

export default Beginning;
