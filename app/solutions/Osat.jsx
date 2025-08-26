"use client";
import React from "react";
import Image from "next/image";
import BulletList from "@/app/components/BulletList";
import { useTextAnimation } from "@/app/hooks/UseTextAnimation";
import { useParallax } from "@/app/hooks/useParallax";

const cardItems = [
  "Full-suite IC packaging.",
  "Scalable from prototyping to high-volume production",
  "Focused on reliability, performance, and turnaround time",
];

export default function Osat({ id }) {
  const { containerRef } = useTextAnimation();
  const imageRef = useParallax(1.2);

  return (
    <section
      id={id}
      className="w-full h-fit bg-white flex flex-col md:grid md:grid-cols-4 gap-5 px-3.5 md:px-5 lg:px-10 py-10 md:py-15"
    >
      <div className="col-span-2 flex flex-col justify-between">
        <div
          ref={containerRef}
          className="flex flex-col gap-4 pb-20 md:pb-0 justify-between"
        >
          <h3
            data-animate-text
            className="text-heading2 tracking-tight font-neueMontrealMd text-black leading-[110%]"
          >
            OSAT (Outsourced Semiconductor Assembly and Test)
          </h3>
          <p
            data-animate-text
            className="text-textPrimary font-neueMontreal text-bodyBase leading-[120%] md:w-[80%] md:mb-10 mb-0"
          >
            We’re proud to launch Maharashtra’s first dedicated OSAT facility  
            a major leap forward in India’s semiconductor ecosystem. Designed for agility, 
            precision, and scale, our OSAT services support high-volume assembly and testing for consumer, industrial, and defense applications.
          </p>
        </div>
        <BulletList items={cardItems} />
      </div>

      <div className="col-start-3 col-span-2 flex items-center justify-center">
        <div className="overflow-hidden relative aspect-[590/442] w-full h-[248px] sm:h-[60vh]">
          <Image
            ref={imageRef}
            src="/images/solutions/solutions1.webp"
            alt="Chip Closeup"
            fill
            className="object-cover object-top"
            priority
          />
        </div>
      </div>
    </section>
  );
}
