"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap/all";
import { ScrollTrigger } from "gsap/all";
import { useHeaderHeight } from "@/app/context/HeaderHeightContext";
import { useTextAnimation } from "@/app/hooks/UseTextAnimation";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  { title: "Designed for innovation and customization" },
  { title: "Specialized in compound semiconductors" },
  {
    title: "Optimized for agile development in IR and photonic technologies",
  },
];

export default function Fab({ id }) {
  const sectionRef = useRef(null);
  const fixedHeaderRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const headerHeight = useHeaderHeight();
  const { containerRef } = useTextAnimation();

  console.log(headerHeight);

  useEffect(() => {
    if(window.innerWidth < 768) return;
    const ctx = gsap.context(() => {
      const cardsHeight = cardsContainerRef.current.offsetHeight;
      const fixedHeaderHeight = fixedHeaderRef.current.offsetHeight;

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: `top ${headerHeight + 65}px`,
          end: `${cardsHeight + 60}px ${fixedHeaderHeight + 194}px`,
          pin: fixedHeaderRef.current,
          pinSpacing: false,
          // markers: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [headerHeight]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="bg-white px-3.5 md:px-5 lg:px-10 py-10 md:py-15"
    >
      <div ref={containerRef} className="grid grid-cols-4 gap-5">
        <div
          ref={fixedHeaderRef}
          className="col-span-4 md:col-span-2 flex flex-col gap-5 h-fit"
        >
          <h3
            data-animate-text
            className="text-heading2 tracking-heading2 leading-[110%]"
          >
            Prototype Fab
          </h3>
          <p
            data-animate-text
            className="font-neueMontreal text-bodyBase text-textPrimary leading-[120%] md:w-[80%]"
          >
            India’s Prototype Compound Semiconductor Fabrication Facility. We will be
            developing a state-of-the-art prototype compound semiconductor fab,
            focused on infrared (IR) detectors a foundational technology for
            aerospace, defense, medical imaging, and autonomous systems.
          </p>
        </div>

        <div
          ref={cardsContainerRef}
          className="col-span-4 md:col-span-2 grid grid-cols-1 md:grid-cols-2 grid-rows-3 md:grid-rows-3 relative"
        >
          <Card
            title={cards[0].title}
            className="w-full h-full bg-darkBg text-white md:col-start-1 row-start-1"
            icon="/images/icons/packaging1.svg"
          />
          <Card
            title={cards[1].title}
            className="w-full h-full bg-whiteBg text-black md:col-start-2 row-start-2"
            icon="/images/icons/packaging2.svg"
          />
          <Card
            title={cards[2].title}
            className="w-full h-full bg-primary text-white md:col-start-1 row-start-3"
            icon="/images/icons/packaging3.svg"
          />
        </div>
      </div>
    </section>
  );
}

function Card({ title, className, icon }) {
  return (
    <div
      className={`relative flex flex-col justify-between p-4 bg-lightestGrey aspect-square w-[283px] h-[283px] ${className}`}
    >
      <img src={icon} alt="Card Icon" className="w-7 h-7 md:w-10 md:h-10" />
      <div data-animate-text className="mt-auto text-heading4 md:text-bodyBase lg:text-heading4 leading-[115%]">
        {title}
      </div>
    </div>
  );
}
