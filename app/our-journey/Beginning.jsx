// Updated Beginning component using the hook
"use client";
import React from "react";
import Image from "next/image";
import { useParallax } from "@/app/hooks/useParallax";
import { useTextAnimation } from "@/app/hooks/UseTextAnimation";

const Beginning = () => {
  const { containerRef } = useTextAnimation();
  const image1Ref = useParallax(1);
  const image2Ref = useParallax(-1);
  const image3Ref = useParallax(1);
  const image4Ref = useParallax(-1);

  return (
    <section className="h-fit w-full grid grid-cols-4 gap-y-10 md:gap-y-15 lg:gap-y-0 gap-x-3 md:gap-x-5 px-3.5 md:px-5 lg:px-10 py-10 md:py-15 bg-white">
      <div className="col-span-2 lg:col-span-1 w-full aspect-[285/214] relative overflow-hidden lg:mt-[28%]">
        <div ref={image1Ref} className="w-full h-full">
          <Image
            src="/images/our-journey/beginning-top.webp"
            alt="Beginning 1"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </div>

      <div className="col-span-4 lg:col-span-2 flex flex-col gap-21">
        <div className="hidden lg:block relative overflow-hidden aspect-[142/106] w-[25%] ml-auto mr-0">
          <div ref={image2Ref} className="w-full h-full">
            <Image
              src="/images/our-journey/beginning-micro-1.webp"
              alt="Beginning Micro 1"
              fill
              sizes="25%"
              className="object-cover object-center"
            />
          </div>
        </div>

        <div
          ref={containerRef}
          className="flex flex-col items-center justify-center gap-5 md:gap-8 max-w-[590px] mx-auto"
        >
          <h3
            data-animate-text
            className="text-center text-heading2 text-black leading-[110%] tracking-heading2"
          >
            The Beginning
          </h3>
          <p
            data-animate-text
            className="text-center text-bodyBase text-textPrimary leading-[120%] font-neueMontreal"
          >
            RRP Electronics was founded with a mission to revolutionize India's
            semiconductor landscape. With a commitment to high-quality,
            scalable, and sustainable solutions, we set out to build a facility
            that would empower industries, fuel innovation, and strengthen
            India's electronics ecosystem.
          </p>
        </div>

        <div className="hidden lg:block relative overflow-hidden aspect-[142/106] w-[25%]">
          <div ref={image3Ref} className="w-full h-full">
            <Image
              src="/images/our-journey/beginning-micro-2.webp"
              alt="Beginning Micro 2"
              fill
              sizes="25%"
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>

      <div className="col-span-2 col-start-3 lg:col-span-1 lg:col-start-4 w-full aspect-[285/214] relative overflow-hidden lg:mt-[90%]">
        <div ref={image4Ref} className="w-full h-full">
          <Image
            src="/images/our-journey/beginning-bottom.webp"
            alt="Beginning 2"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
};

export default Beginning;
