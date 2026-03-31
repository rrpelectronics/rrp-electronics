"use client";
import React from "react";
import HeadingCenter from "@/components/HeadingCenter";
import { useTextAnim } from "@/hooks/useTextAnim";
import { useParallax } from "@/hooks/useParallax";
import Image from "next/image";

const ImageLayout = ({ heading, imageLayoutData = [] }) => {
  const { containerRef } = useTextAnim();
  const imageRef0 = useParallax(1);
  const imageRef1 = useParallax(1);

  return (
    <section
      ref={containerRef}
      className="h-fit w-full grid grid-cols-4 gap-x-3 md:gap-x-5 px-3.5 md:px-5 lg:px-10 py-10 md:py-15 bg-background overflow-hidden"
    >
      {heading && <HeadingCenter heading={heading} />}
      {imageLayoutData.map((imgLayout, id) => (
        <div
          key={id}
          className={`col-span-4 md:col-span-2 ${
            id === 0 ? "mb-6 md:mb-0" : "mt-0 md:mt-[42.5%]"
          }`}
        >
          <p
            data-animate-text
            className="text-heading4 text-black leading-[115%] mb-4 md:mb-5"
          >
            {imgLayout.title}
          </p>
          <div className="relative w-full aspect-[332/249] overflow-hidden mb-4 md:mb-5">
            <Image
              ref={id === 0 ? imageRef0 : imageRef1}
              src={imgLayout.src}
              alt={imgLayout.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center z-1"
            />
            {imgLayout.dates && (
              <div className="z-2 h-full w-full absolute left-0 top-0 p-5 lg:p-6 flex items-end bg-black/50">
                <ul className="flex gap-5 items-center justify-end h-fit w-fit">
                  <li
                    data-animate-text
                    className="rounded-full px-2 lg:px-3 py-2 border-1 border-white text-white text-caption leading-[120%] font-neueMontreal"
                  >
                    Initiated: {imgLayout.dates.initiated}
                  </li>
                  <li
                    data-animate-text
                    className="rounded-full px-2 lg:px-3 py-2 border-1 border-white text-white text-caption leading-[120%] font-neueMontreal"
                  >
                    Expected: {imgLayout.dates.expected}
                  </li>
                </ul>
              </div>
            )}
          </div>
          <p
            data-animate-text
            className="text-textPrimary font-neueMontreal text-bodySmall leading-[120%] w-[90%] lg:w-[80%]"
          >
            {imgLayout.description}
          </p>
        </div>
      ))}
    </section>
  );
};

export default ImageLayout;
