"use client";
import React from "react";
import Image from "next/image";
import { useTextAnimation } from "@/app/hooks/UseTextAnimation";

const RajendraUpdate = () => {
  const { containerRef } = useTextAnimation();

  return (
    <section
      ref={containerRef}
      className="h-fit w-full grid grid-cols-4 gap-x-3 md:gap-x-5 gap-y-6 px-3.5 md:px-5 lg:px-10 py-10 md:py-15"
    >
      <div className="col-span-4 sm:col-span-2 w-full aspect-square relative overflow-hidden">
        <Image
          src={"/images/leadership/rajendra-sir.webp"}
          alt="Mr. Rajendra Chodankar"
          fill
          sizes="50vw"
          className="object-cover object-center"
        />
      </div>
      <div className="col-span-4 sm:col-span-2 flex flex-col justify-between gap-y-8">
        <div className="flex flex-col gap-y-4">
          <h3
            data-animate-text
            className="text-heading3 tracking-heading3 leading-[110%] text-primary"
          >
            Rajendra Chodankar
          </h3>
          <p
            data-animate-text
            className="text-black text-bodySmall leading-[120%] font-neueMontreal"
          >
            Founder & Chairman
          </p>
        </div>
        <div className="text-textPrimary leading-[120%] text-bodyBase font-neueMontreal mt-8 sm:mt-0 flex flex-col gap-y-4">
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
