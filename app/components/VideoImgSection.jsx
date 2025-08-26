"use client";
import React from "react";
import Link from "next/link";
import { useTextAnimation } from "@/app/hooks/UseTextAnimation";
import { useFormContext } from "react-hook-form";

const VideoImgSection = ({ videoSrc, imgSrc, heading, text }) => {
  const { containerRef } = useTextAnimation();

  return (
    <section className="relative h-[700px] overflow-hidden">
      {videoSrc && (
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover object-center"
            autoPlay
            muted
            loop
            playsInline
            controls={false}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      )}
      {imgSrc && (
        <Image
          src={imgSrc}
          alt={"Banner Image"}
          sizes="100vw"
          fill
          className="object-cover object-center"
        />
      )}

      <div
        ref={containerRef}
        className="relative z-10 py-10 px-3.5 md:px-5 lg:px-10 md:py-15 h-full"
      >
        <div className="grid grid-cols-4 gap-x-3 md:gap-x-5 w-full h-full">
          <h3
            data-animate-text
            className="col-span-4 lg:col-span-2 text-white text-heading2 tracking-heading2 leading-[110%] max-w-[590px]"
          >
            {heading.split("\n").map((line, i) => (
              <React.Fragment key={i}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </h3>

          <div className="col-span-4 col-start-1 lg:col-span-1 lg:col-start-4 flex flex-col gap-5 lg:gap-6 justify-end lg:justify-start">
            <p
              data-animate-text
              className="text-white text-bodyBase font-neueMontreal leading-[120%]"
            >
              {text}
            </p>
            {/* <Link
              href={"#"}
              className="w-fit bg-primary text-bodySmall leading-[120%] text-white px-3.5 py-3.5 md:px-6 md:py-3 rounded-full"
            >
              Explore OSAT Process
            </Link> */}
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-black/80 z-1"></div>
    </section>
  );
};

export default VideoImgSection;
