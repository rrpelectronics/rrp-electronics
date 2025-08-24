"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import UseScreenSizeSmall from "@/app/hooks/UseScreenSizeSmall";

const accordionData = [
  {
    id: "01",
    title: "Telecommunication",
    description: "Ultra-fast, low-latency network processing.",
    image: "/images/home/telecommunication.webp",
    alt: "Telecommunication",
  },
  {
    id: "02",
    title: "Industrial",
    description:
      "Smart grids, renewable energy integration, efficient power distribution.",
    image: "/images/home/industrial.webp",
    alt: "Industrial",
  },
  {
    id: "03",
    title: "Automotive & EVs",
    description: "Smart chips for self-driving cars & battery management.",
    image: "/images/home/automative_ev.webp",
    alt: "Automotive & EVs",
  },
  {
    id: "04",
    title: "Medical & Healthcare",
    description: "Next-gen diagnostic & wearable tech.",
    image: "/images/home/medical_healthcare.webp",
    alt: "Medical & Healthcare",
  },
  {
    id: "05",
    title: "Commercial",
    description:
      "Advanced IoT solutions, smart retail systems, intelligent automation.",
    image: "/images/home/commercial.webp",
    alt: "Commercial",
  },
  {
    id: "06",
    title: "Advanced Computing",
    description: "Future-ready computing for complex applications.",
    image: "/images/home/advanced_computing.webp",
    alt: "Advanced Computing",
  },
];

const Accordion = () => {
  const [openItem, setOpenItem] = useState(0);
  const itemRefs = useRef([]);
  const descriptionRefs = useRef([]);
  const imageRefs = useRef([]);
  const isSmall = UseScreenSizeSmall()

  useEffect(() => {
    accordionData.forEach((_, index) => {
      const description = descriptionRefs.current[index];
      const image = imageRefs.current[index];
      const element = itemRefs.current[index];

      const accordion_tl = gsap.timeline();

      if (openItem === index) {
        accordion_tl.to(element, {
          rowGap: "20px",
          duration: 0.75,
          ease: "power2.inOut",
        }, "a").to(description, {
          height: "auto",
          opacity: 1,
          duration: 0.75,
          marginTop : "12px",
          ease: "power2.inOut",
        }, "a").to(image, {
          height: isSmall ? "30vh" : "auto" ,
          opacity: 1,
          duration: 0.75,
          ease: "power2.inOut",
        }, "a");
      } else {
        accordion_tl.to(element, {
          rowGap: "0px",
          duration: 0.75,
          ease: "power2.inOut",
        }, "a").to(description, {
          marginTop : 0,
          height: 0,
          opacity: 0,
          duration: 0.75,
          ease: "power2.inOut",
        }, "a").to(image, {
          height: 0,
          opacity: 0,
          duration: 0.75,
          ease: "power2.inOut",
        }, "a");
      }
    });
  }, [openItem]);

  const toggleItem = (index) => {
    const isSame = openItem === index;
    const newOpenItem = isSame ? -1 : index;
    setOpenItem(newOpenItem);
  };

  return (
    <section className="bg-darkBg h-fit w-full grid grid-cols-4 gap-x-3 md:gap-x-5 px-3.5 md:px-5 lg:px-10 py-10 md:py-15">
      <h3 className="text-white text-heading2 leading-[105%] tracking-heading2 mb-8 md:mb-10 col-span-4">
        Industries We Power <br /> The Future, Powered by RRP
      </h3>
      <ul className="grid grid-cols-4 col-span-4">
        {accordionData.map((item, index) => {
          const isOpen = openItem === index;
          const isFirst = index === 0;

          return (
            <li
              key={index}
              ref={(el) => (itemRefs.current[index] = el)}
              onClick={() => toggleItem(index)}
              className={`cursor-pointer text-white grid grid-cols-4 sm:grid-cols-12 gap-x-3 md:gap-x-4 py-6 col-span-4 sm:col-span-12 ${
                isFirst
                  ? "border-y-1 border-y-borderSecondary"
                  : "border-b-1 border-b-borderSecondary"
              }`}
            >
              <div className="col-span-4 sm:col-span-5 flex gap-2 sm:gap-6 md:gap-15 lg:gap-30">
                <p className="text-white text-heading4 leading-[105%] hidden sm:block">
                  {item.id}
                </p>
                <p
                  className={`text-white text-heading4 font-neueMontreal leading-[115%] flex flex-col`}
                >
                  {item.title}
                  <span
                    ref={(el) => (descriptionRefs.current[index] = el)}
                    className={`text-bodySmall leading-[120%] text-textSecondary ${
                      isOpen ? `overflow-visible` : `overflow-hidden`
                    }`}
                  >
                    {item.description}
                  </span>
                </p>
                <button
                  onClick={() => toggleItem(index)}
                  className="ml-auto h-fit w-fit block sm:hidden"
                  aria-expanded={isOpen}
                  aria-controls={`accordion-content-${index}`}
                >
                  <svg
                    className={`ml-auto ${isOpen ? "rotate-180" : "rotate-0"}`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="7"
                    viewBox="0 0 13 7"
                    fill="none"
                  >
                    <path
                      d="M6.5 6.90162L0.5 0.901619L1.30006 0.101562L6.5 5.29501L11.6999 0.101562L12.5 0.901619L6.5 6.90162Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
              <figure
                id={`accordion-content-${index}`}
                ref={(el) => (imageRefs.current[index] = el)}
                className={`col-span-4 sm:col-span-6 sm:mx-auto relative sm:aspect-[285/212] sm:w-[285px] overflow-hidden`}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="500px"
                  className="object-cover object-center"
                />
              </figure>
              <button
                className="cursor-pointer hidden sm:block h-fit w-fit p-2 ml-auto col-start-12 col-span-1"
                onClick={() => toggleItem(index)}
                aria-expanded={isOpen}
                aria-controls={`accordion-content-${index}`}
              >
                <svg
                  className={`ml-auto h-fit w-fit ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="7"
                  viewBox="0 0 13 7"
                  fill="none"
                >
                  <path
                    d="M6.5 6.90162L0.5 0.901619L1.30006 0.101562L6.5 5.29501L11.6999 0.101562L12.5 0.901619L6.5 6.90162Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Accordion;
