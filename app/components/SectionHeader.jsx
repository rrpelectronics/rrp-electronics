"use client";
import React from "react";

const SectionHeader = ({ heading, text }) => {
  return (
    <div className="grid grid-cols-4 gap-x-3 md:gap-x-5 px-3.5 md:px-5 lg:px-10 mb-8 md:mb-10">
      <h3 className="col-span-4 md:col-span-3 text-heading2 tracking-heading2 leading-[110%] max-w-[590px] mb-5 md:mb-6">
        {heading.split("\n").map((line, i) => (
          <React.Fragment key={i}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </h3>
      <p className="col-span-4 md:col-span-1 text-bodyBase text-textPrimary font-neueMontreal leading-[120%]">
        {text}
      </p>
    </div>
  );
};

export default SectionHeader;
