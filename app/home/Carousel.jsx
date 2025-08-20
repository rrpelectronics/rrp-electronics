"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import HeadingCenter from "../components/HeadingCenter";

const slides = [
  {
    title: "QFN Packages",
    description:
      "Quad Flat No-Lead (QFN) is a surface-mount IC package with no external leads, offering excellent thermal and electrical performance in a compact form.",
    image: "/images/home/qfn.webp",
    features: [
      {
        icon: "/images/icons/memory.svg",
        title: "Compact & lightweight",
        text: "Suited for space-constrained designs.",
      },
      {
        icon: "/images/icons/thermometer.svg",
        title: "Thermal Efficiency",
        text: "Enables smooth operations.",
      },
      {
        icon: "/images/icons/mobile.svg",
        title: "Applications",
        text: "IoT, mobile devices, RF, automotive, and industrial systems.",
      },
    ],
  },
  {
    title: "BGA Packages",
    description:
      "Ball Grid Array (BGA) is a high-density package that uses solder balls for interconnection, ideal for complex, high-performance applications.",
    image: "/images/home/bga.webp",
    features: [
      {
        icon: "/images/icons/select-all.svg",
        title: "High Pin Count Capability",
        text: "Suited for space-constrained designs.",
      },
      {
        icon: "/images/icons/thermometer.svg",
        title: "Thermal Efficiency",
        text: "Ideal for high-power applications",
      },
      {
        icon: "/images/icons/mobile.svg",
        title: "Applications",
        text: "CPUs, GPUs, memory modules, networking hardware",
      },
    ],
  },
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  const handleChange = (index) => {
    setCurrent(index);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearTimeout(timeoutRef.current);
  }, [current]);

  return (
    <section className="h-max w-full grid grid-cols-4 gap-x-3 md:gap-x-5 px-3.5 md:px-5 lg:px-10 py-10 md:py-15 bg-background">
      <HeadingCenter heading={"Packaging Services"} />
      {/* Content grid */}
      <div className="grid grid-cols-4 gap-y-6 gap-x-3 md:gap-x-5 col-span-4 w-full">
        {/* Left Text */}
        <div className="col-span-4 sm:col-span-1">
          <p className="text-primary text-heading3 tracking-heading3 leading-[105%] mb-3 md:mb-5">
            {slides[current].title}
          </p>
          <p className="font-neueMontreal text-bodyBase text-textPrimary leading-[120%]">
            {slides[current].description}
          </p>
        </div>

        {/* Center Image */}
        <div className="col-span-4 sm:col-span-2 flex justify-center items-center">
          <figure className="w-full sm:w-[60%] lg:w-[30vw] aspect-[285/200] sm:aspect-square mx-auto relative">
            <Image
              src={slides[current].image}
              alt={slides[current].title}
              fill
              sizes="585px"
              className="object-contain object-center"
            />
          </figure>
        </div>

        {/* Right List */}
        <ul className="col-span-4 sm:col-span-1 flex flex-col justify-end">
          {slides[current].features.map((feature, index) => (
            <li
              className={`py-4 lg:py-5 ${
                index === 0
                  ? "border-y-1 border-y-[#eeeef1]"
                  : "border-b-1 border-b-[#eeeef1]"
              }`}
              key={index}
            >
              <img
                src={feature.icon}
                alt={feature.title}
                className="w-7 h-7 lg:w-10 lg:h-10 mb-3.5 lg:mb-4"
              />
              <p className="capitalize text-heading4 text-black leading-[105%] mb-1 lg:mb-2">
                {feature.title}
              </p>
              <p className="text-bodySmall font-neueMontreal text-textPrimary leading-[120%]">
                {feature.text}
              </p>
            </li>
          ))}
        </ul>

        {/* Progress Indicators */}
        <div className="flex h-fit w-fit justify-center items-center gap-x-2 md:gap-x-3 mx-auto col-span-4">
          {slides.map((_, index) => (
            <div
              key={index}
              onClick={() => handleChange(index)}
              className="p-2  cursor-pointer"
            >
              <div className="w-15 h-0.75 bg-[#d9d9d9] relative overflow-hidden rounded-full">
                <div
                  className={`absolute top-0 left-0 h-full ${
                    current === index
                      ? "w-full bg-primary transition-[width] duration-[8000ms]"
                      : "w-0"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Carousel;
