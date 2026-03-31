"use client";
import React from "react";
import { useTextAnim } from "@/hooks/useTextAnim";

const SectionHeader = ({ heading, text }) => {
  const { containerRef } = useTextAnim();

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-4 gap-x-3 md:gap-x-5 px-3.5 md:px-5 lg:px-10 mb-8 md:mb-10"
    >
      <h3
        data-animate-text
        className="col-span-4 md:col-span-3 text-heading2 tracking-heading2 leading-[110%] max-w-[590px] mb-5 lg:mb-0"
      >
        {heading.split("\n").map((line, i) => (
          <React.Fragment key={i}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </h3>
      <p
        data-animate-text
        className="col-span-4 md:col-start-1 md:col-span-3 lg:col-span-1 text-bodyBase text-textPrimary font-neueMontreal leading-[120%]"
      >
        {text}
      </p>
    </div>
  );
};

export default SectionHeader;
