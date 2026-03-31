"use client";
import React from "react";

const Text = ({ text }) => {

  return (
    <section
      className="w-full h-fit grid grid-cols-4 gap-x-3 md:gap-x-5 px-3.5 md:px-5 lg:px-10 pt-10 pb-15 bg-background"
    >
      <p
        className="col-span-3 col-start-2 md:col-span-2 md:col-start-3 text-bodyLarge font-neueMontreal leading-[120%] text-textPrimary max-w-[590px] ml-auto "
      >
        {text}
      </p>
    </section>
  );
};

export default Text;
