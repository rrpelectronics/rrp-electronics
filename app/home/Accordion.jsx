"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const accordionData = [
  {
    id: "01",
    title: "Telecommunication",
    description: "Ultra-fast, low-latency network processing.",
    image: "/images/home/accordion-1.webp",
    alt: "Telecommunication",
  },
  {
    id: "02",
    title: "Industrial",
    description:
      "Smart grids, renewable energy integration, efficient power distribution.",
    image: "/images/home/accordion-1.webp",
    alt: "Industrial",
  },
  {
    id: "03",
    title: "Automotive & EVs",
    description: "Smart chips for self-driving cars & battery management.",
    image: "/images/home/accordion-1.webp",
    alt: "Automotive & EVs",
  },
  {
    id: "04",
    title: "Medical & Healthcare",
    description: "Next-gen diagnostic & wearable tech.",
    image: "/images/home/accordion-1.webp",
    alt: "Medical & Healthcare",
  },
  {
    id: "05",
    title: "Commercial",
    description:
      "Advanced IoT solutions, smart retail systems, intelligent automation.",
    image: "/images/home/accordion-1.webp",
    alt: "Commercial",
  },
  {
    id: "06",
    title: "Advanced Computing",
    description: "Future-ready computing for complex applications.",
    image: "/images/home/accordion-1.webp",
    alt: "Advanced Computing",
  },
];

const Accordion = () => {
  const [openItem, setOpenItem] = useState(0);
  const [shouldScroll, setShouldScroll] = useState(false);
  const itemRefs = useRef([]);
  const descriptionRefs = useRef([]);
  const imageRefs = useRef([]);
  const topOffset = 100;

  useEffect(() => {
    accordionData.forEach((_, index) => {
      const description = descriptionRefs.current[index];
      const image = imageRefs.current[index];
      const element = itemRefs.current[index];

      if (openItem === index) {
        // Open animation
        gsap.to(description, {
          height: "auto",
          opacity: 1,
          duration: 0.75,
          ease: "power2.inOut",
          OnStart: () => {
            if (shouldScroll && element) {
              const rect = element.getBoundingClientRect();
              const scrollTop =
                window.pageYOffset || document.documentElement.scrollTop;
              window.scrollTo({
                top: rect.top + scrollTop - topOffset,
                behavior: "smooth",
              });
              setShouldScroll(false);
            }
          },
        });
        gsap.to(image, {
          height: "auto",
          opacity: 1,
          duration: 0.75,
          ease: "power2.inOut",
        });
      } else {
        // Close animation
        gsap.to(description, {
          height: 0,
          opacity: 0,
          duration: 0.75,
          ease: "power2.inOut",
        });
        gsap.to(image, {
          height: 0,
          opacity: 0,
          duration: 0.75,
          ease: "power2.inOut",
        });
      }
    });
  }, [openItem, shouldScroll]);

  const toggleItem = (index) => {
    const isSame = openItem === index;
    setOpenItem(isSame ? -1 : index);
    setShouldScroll(!isSame);
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
              className={`cursor-pointer text-white grid grid-cols-4 sm:grid-cols-12 gap-x-3 md:gap-x-4 py-6 col-span-4 sm:col-span-12 gap-y-5 ${
                isFirst
                  ? "border-y-1 border-y-borderSecondary"
                  : "border-b-1 border-b-borderSecondary"
              }`}
            >
              <div className="col-span-4 sm:col-span-5 flex gap-2 sm:gap-6 md:gap-15 lg:gap-30">
                <p className="text-white text-heading4 leading-[105%] hidden sm:block">
                  {item.id}
                </p>
                <p className="text-white text-heading4 leading-[115%] flex flex-col gap-2 lg:gap-4">
                  {item.title}
                  <span
                    ref={(el) => (descriptionRefs.current[index] = el)}
                    className={`text-bodySmall leading-[120%] text-textSecondary ${
                      isOpen
                        ? "overflow-visible block h-fit opacity-100"
                        : "overflow-hidden hidden h-0 opacity-0"
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
                className={`col-span-4 sm:col-span-6 sm:mx-auto relative aspect-[285/212] sm:w-[285px] overflow-hidden ${
                  isOpen ? "h-fit block opacity-100" : "h-0 hidden opacity-0"
                }`}
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
