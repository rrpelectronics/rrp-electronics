"use client";
import React from "react";
import Image from "next/image";
import SectionHeader from "@/app/components/SectionHeader";
import { useTextAnimation } from "@/app/hooks/UseTextAnimation";

const People = () => {
  const { containerRef } = useTextAnimation();

  return (
    <section className="h-fit w-full py-10 md:py-15 bg-background">
      <SectionHeader
        heading={"Our Values & Culture"}
        text={
          "At RRP Electronics, we believe in collaboration, continuous learning, and a commitment to excellence—fostering a culture of innovation and impact."
        }
      />
      <div
        ref={containerRef}
        className="grid grid-cols-12 px-3.5 md:px-5 lg:px-10"
      >
        <div className="col-span-12 md:col-span-4 w-full aspect-square relative p-5 lg:p-6 flex flex-col justify-between bg-darkBg">
          <p
            data-animate-text
            className="text-heading4 leading-[115%] text-white"
          >
            Our Core Values
          </p>
          <p
            data-animate-text
            className="text-bodySmall font-neueMontreal text-textSecondary leading-[120%]"
          >
            Sustainability, Innovation, Integrity & Customer Focus — these
            values guide every aspect of how we operate and grow.
          </p>
        </div>
        <div className="col-span-12 md:col-span-4 w-full aspect-square relative overflow-hidden">
          <Image
            src="/images/about/people.webp"
            alt="Our Values & Culture"
            fill
            sizes="50vw"
            className="object-center object-cover z-1"
          />
          <div className="absolute top-0 left-0 z-2 p-5 lg:p-6 bg-black/70 h-full w-full flex flex-col justify-between">
            <p
              data-animate-text
              className="text-heading4 leading-[115%] text-white"
            >
             Workplace Culture
            </p>
            <p
              data-animate-text
              className="text-bodySmall font-neueMontreal text-white leading-[120%]"
            >
              We nurture an environment of growth, learning, and leadership—empowering our 
              teams to think big and innovate.
            </p>
          </div>
        </div>
        <div className="col-span-12 md:col-span-4 w-full aspect-square relative p-5 lg:p-6 flex flex-col justify-between bg-primary">
          <p
            data-animate-text
            className="text-heading4 leading-[115%] text-white"
          >
            Diversity & Inclusion
          </p>
          <p
            data-animate-text
            className="text-bodySmall font-neueMontreal text-white leading-[120%]"
          >
            We’re committed to building a dynamic, inclusive workplace where
            every voice is valued and creativity thrives.
          </p>
        </div>
      </div>
    </section>
  );
};

export default People;
