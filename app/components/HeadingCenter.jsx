"uyse client";
import React from "react";
import { useTextAnimation } from "@/app/hooks/UseTextAnimation";

const HeadingCenter = ({ heading, text }) => {
  const { containerRef } = useTextAnimation();
  return (
    <div
      ref={containerRef}
      className="col-span-4 flex flex-col justify-center items-center gap-5 mb-8 md:mb-10"
    >
      <h3
        data-animate-text
        className="text-center text-heading2 text-black leading-[110%] tracking-heading2"
      >
        {heading.split("\n").map((line, i) => (
          <React.Fragment key={i}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </h3>
      {text && (
        <p
          data-animate-text
          className="max-w-[414px] w-full text-center text-textPrimary text-bodyLarge font-neueMontreal leading-[120%]"
        >
          {text}
        </p>
      )}
    </div>
  );
};

export default HeadingCenter;
