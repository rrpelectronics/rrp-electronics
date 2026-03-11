"use client";
import React from "react";
import { useTextAnim } from "@/app/hooks/useTextAnim";

function Card({ title, icon, className }) {
  return (
    <div
      className={`relative flex flex-col justify-between aspect-[294/169] h-[123px] md:h-[169px] w-full px-2 pt-2 pb-3 md:px-4 md:pt-4 md:pb-5 ${className}`}
    >
      <img src={icon} alt="Card Icon" className="h-7 w-7 md:h-10 md:w-10" />
      <div
        data-animate-text
        className="text-heading4 text-black leading-[115%]"
      >
        {title}
      </div>
    </div>
  );
}

export default function Technologies({ id }) {

  const { containerRef } = useTextAnim();

  const cards = [
    { title: "Consumer electronics", icon: "/images/icons/display1.svg" },

    { title: "Industrial automation", icon: "/images/icons/display2.svg" },
    { title: "Medical imaging", icon: "/images/icons/display3.svg" },
    { title: "Automotive displays", icon: "/images/icons/display4.svg" },
  ];

  return (
    <section
      ref={containerRef}
      id={id}
      className="grid grid-cols-4 bg-white px-3.5 md:px-5 lg:px-10 py-10 md:py-15"
    >
      <div className="col-span-4 lg:col-span-2 flex flex-col justify-start mb-10">
        <h3
          data-animate-text
          className="font-neueMontrealMd text-heading2 tracking-heading2 leading-[110%] mb-5 md:mb-6"
        >
          Display Technologies
        </h3>
        <p
          data-animate-text
          className={`md:w-[80%] font-neueMontreal text-bodyBase text-textPrimary leading-[120%] whitespace-normal md:whitespace-pre-line`}
        >
          {`At RRP Electronics, we deliver high-performance display technologies that enhance user experiences across consumer electronics, industrial automation, medical imaging, and automotive systems.`}
        </p>
        <br />
        <p
          data-animate-text
          className={`md:w-[80%] font-neueMontreal text-bodyBase text-textPrimary leading-[120%] whitespace-normal md:whitespace-pre-line`}
        >
          {`From everyday devices to mission-critical applications, our solutions combine innovation and reliability to help the world see the future more clearly.`}
        </p>
      </div>

      <div className="col-span-4 lg:col-span-2 grid grid-cols-2 grid-rows-2 gap-x-3 md:gap-5">
        {cards.map((card, idx) => (
          <Card
            key={idx}
            title={card.title}
            icon={card.icon}
            className={`${
              idx < 2
                ? "border-y-1 border-y-borderPrimary"
                : "border-b-1 border-b-borderPrimary"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
