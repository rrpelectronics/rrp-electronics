"use client";
import React from "react";
import Link from "next/link";

const BannerStack = ({ video, imgSrc, heading, text, placeholder }) => {
  return (
    <section className="h-svh w-full sticky top-0 left-0 -z-1 overflow-hidden">
      {video && (
        <video
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          className="absolute left-0 top-0 w-full h-full object-cover object-center"
          poster={placeholder}
        >
          <source src={video} type="video/mp4" />
        </video>
      )}
      {imgSrc && (
        <img
          src={imgSrc}
          alt={"Banner Image"}
          className="object-cover object-center absolute h-full w-full inset-0"
        />
      )}
      <div className="bg-black/50 inset-0 absolute h-full w-full" />
      <div className="h-full w-full grid grid-cols-4 gap-x-3 md:gap-x-5 items-center px-3.5 md:px-5 lg:px-10 py-10 relative z-1">
        <h1 className="max-w-[996px] tracking-display text-display sm:text-heading1 md:text-display text-white leading-[110%] absolute pe-3.5 md:pe-10 left-3.5 md:left-10 top-1/2 -translate-y-1/2">
          {heading.split("\n").map((line, i) => (
            <React.Fragment key={i}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </h1>
        {/* {text && (
          <p className="text-white text-bodyLarge font-neueMontreal leading-[120%] col-span-4 col-start-1 sm:col-span-2 sm:col-start-3 mt-auto">
            {text}
          </p>
        )} */}
      </div>
    </section>
  );
};

export default BannerStack;
