"use client";
import React, { useRef, useEffect, useState, createRef } from "react";
import gsap from "gsap/all";
import Image from "next/image";
import { useTextAnimation } from "@/app/hooks/UseTextAnimation";

const OurJourney = () => {
  const yearRef = useRef(null);
  const yearTextRef = useRef(null);
  const timelineRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const { containerRef } = useTextAnimation();

  const itemRefs = useRef([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [yearWidth, setYearWidth] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const [gap, setGap] = useState(0);

  const events = [
    {
      date: "March, 2024",
      title: "Bhoomi Poojan Ceremony",
      image: "/images/our-journey/bhoomi-poojan-ceremony.webp",
      desc: "The foundation of RRP Electronics was laid with a traditional Bhoomi Poojan, marking the beginning of our journey in the semiconductor domain.",
    },
    {
      date: "September, 2024",
      title: "Grand Inauguration",
      image: "/images/our-journey/grand-inauguration.webp",
      desc: "RRP Electronics officially opened its doors, setting new benchmarks in semiconductor innovation and OSAT services.",
    },
    {
      date: "December, 2024",
      title: "Strategic Collaborations",
      image: "/images/our-journey/strategic-collaborations.webp",
      desc: "We formed key partnerships with AMB and PalmTech, expanding our capabilities and laying the groundwork for future technological advancements.",
    },
    {
      date: "January, 2025",
      title: "MoU with Deca Technologies",
      image: "/images/our-journey/mou-with-deca.webp",
      desc: "A significant milestone – we signed a Memorandum of Understanding (MoU) with Deca Technologies, signaling the start of a high-impact collaboration.",
    },
    {
      date: "February, 2025",
      title: "Press Conference Announcement",
      image: "/images/our-journey/press-conference-announcement.webp",
      desc: "We hosted a press conference to announce the RRP–Deca partnership, highlighting our shared vision for advancing Wafer Level Packaging technologies.",
    },
  ];

  // Initialize refs for each event item
  useEffect(() => {
    itemRefs.current = events.map(
      (_, i) =>
        itemRefs.current[i] || {
          dot: createRef(),
          date: createRef(),
          img: createRef(),
          title: createRef(),
          desc: createRef(),
        }
    );
  }, [events.length]);

  // Update widths and gap on mount and resize
  useEffect(() => {
    const updateWidths = () => {
      if (yearRef.current) {
        setYearWidth(yearRef.current.getBoundingClientRect().width);
      }
      if (timelineRef.current && timelineRef.current.children[0]) {
        setItemWidth(
          timelineRef.current.children[0].getBoundingClientRect().width
        );
      }
      setGap(window.innerWidth >= 768 ? 48 : 28);
    };
    updateWidths();
    window.addEventListener("resize", updateWidths);
    return () => window.removeEventListener("resize", updateWidths);
  }, []);

  // Set initial styles for the first item
  useEffect(() => {
    if (itemRefs.current[0] && yearWidth > 0) {
      const { dot, date, img, title, desc } = itemRefs.current[0];
      const yearOffset = yearWidth / 2 - yearWidth * 0.18;
      gsap.set(dot.current, {
        marginLeft: yearOffset,
        marginRight: yearOffset,
        backgroundColor: "#FF5C19",
      });
      gsap.set(date.current, { marginLeft: 0, marginRight: 0 });
      gsap.set([img.current, title.current, desc.current], {
        clipPath: "inset(0% 0% 0% 0%)",
      });
    }
  }, [yearWidth]);

  // Adjust timeline position on activeIndex, itemWidth, gap changes
  useEffect(() => {
    if (timelineRef.current && itemWidth > 0) {
      gsap.set(timelineRef.current, {
        translateX: `-${activeIndex * (itemWidth + gap)}px`,
      });
    }
  }, [activeIndex, itemWidth, gap]);

  // Adjust active dot margin on yearWidth change
  useEffect(() => {
    if (itemRefs.current[activeIndex] && yearWidth > 0) {
      const yearOffset = yearWidth / 2 - yearWidth * 0.18;
      gsap.set(itemRefs.current[activeIndex].dot.current, {
        marginLeft: yearOffset,
        marginRight: yearOffset,
      });
    }
  }, [yearWidth, activeIndex]);

  // Handle year countdown animation
  useEffect(() => {
    if (yearTextRef.current) {
      // Extract year from current and previous event dates
      const getYear = (date) => date.split(", ")[1].trim();
      const currentYear = getYear(events[activeIndex].date);
      const prevYear =
        activeIndex > 0 ? getYear(events[activeIndex - 1]?.date) : currentYear;

      // Update year text content
      if (yearTextRef.current.textContent !== currentYear) {
        if (currentYear !== prevYear) {
          // Animate only when year changes
          const tl = gsap.timeline();
          tl.to(yearTextRef.current, {
            yPercent: -100,
            opacity: 0,
            duration: 0.25,
            ease: "power2.inOut",
            onComplete: () => {
              yearTextRef.current.textContent = currentYear;
              gsap.set(yearTextRef.current, {
                yPercent: 100,
                opacity: 0,
              });
            },
          }).to(yearTextRef.current, {
            yPercent: 0,
            opacity: 1,
            duration: 0.25,
            ease: "power2.inOut",
          });
        } else {
          // Directly set the year without animation if it's the same year
          yearTextRef.current.textContent = currentYear;
          gsap.set(yearTextRef.current, {
            yPercent: 0,
            opacity: 1,
          });
        }
      }
    }
  }, [activeIndex, events]);

  // Handle next click
  useEffect(() => {
    const handleNext = () => {
      if (activeIndex >= events.length - 1 || itemWidth === 0) return;
      const newIndex = activeIndex + 1;
      const translateDistance = itemWidth + gap;
      const yearOffset = yearWidth / 2 - yearWidth * 0.18;
      const nextItem = itemRefs.current[newIndex];

      const tl = gsap.timeline({
        onComplete: () => setActiveIndex(newIndex),
      });

      tl.to(
        timelineRef.current,
        {
          translateX: `-${newIndex * translateDistance + 0.5}px`,
          ease: "power2.inOut",
          duration: 1,
        },
        "a"
      )
        .to(
          nextItem.dot.current,
          {
            marginLeft: yearOffset,
            marginRight: yearOffset,
            backgroundColor: "#FF5C19",
            ease: "power2.inOut",
            duration: 1,
          },
          "a"
        )
        .to(
          nextItem.date.current,
          {
            marginLeft: 0,
            marginRight: 0,
            ease: "power2.inOut",
            duration: 1,
          },
          "a"
        )
        .to(
          nextItem.img.current,
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "power2.inOut",
            duration: 1,
          },
          "a"
        )
        .to(
          nextItem.title.current,
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "power2.inOut",
            duration: 1,
          },
          "a"
        )
        .to(
          nextItem.desc.current,
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "power2.inOut",
            duration: 1,
          },
          "a"
        );
    };

    const nextButton = nextRef.current;
    if (nextButton) {
      nextButton.addEventListener("click", handleNext);
    }
    return () => {
      if (nextButton) {
        nextButton.removeEventListener("click", handleNext);
      }
    };
  }, [activeIndex, events.length, itemWidth, gap, yearWidth]);

  // Handle prev click
  useEffect(() => {
    const handlePrev = () => {
      if (activeIndex <= 0 || itemWidth === 0) return;
      const newIndex = activeIndex - 1;
      const translateDistance = itemWidth + gap;
      const oldItem = itemRefs.current[activeIndex];
      const dotSize = 18; // Fixed dot width (4.5rem assuming 4px/rem)
      const centerMargin = (itemWidth - dotSize) / 2;
      const dateWidth = oldItem.date.current.getBoundingClientRect().width;
      const centerDateMargin = (itemWidth - dateWidth) / 2;

      const tl = gsap.timeline({
        onComplete: () => setActiveIndex(newIndex),
      });

      tl.to(
        timelineRef.current,
        {
          translateX: `-${newIndex * translateDistance}px`,
          ease: "power2.inOut",
          duration: 1,
        },
        "a"
      )
        .to(
          oldItem.dot.current,
          {
            marginLeft: centerMargin,
            marginRight: centerMargin,
            backgroundColor: "#7E7F86",
            ease: "power2.inOut",
            duration: 1,
          },
          "a"
        )
        .to(
          oldItem.date.current,
          {
            marginLeft: centerDateMargin,
            marginRight: centerDateMargin,
            ease: "power2.inOut",
            duration: 1,
          },
          "a"
        )
        .to(
          oldItem.img.current,
          {
            clipPath: "inset(0% 0% 100% 0%)",
            ease: "power2.inOut",
            duration: 1,
          },
          "a"
        )
        .to(
          oldItem.title.current,
          {
            clipPath: "inset(0% 0% 100% 0%)",
            ease: "power2.inOut",
            duration: 1,
          },
          "a"
        )
        .to(
          oldItem.desc.current,
          {
            clipPath: "inset(0% 0% 100% 0%)",
            ease: "power2.inOut",
            duration: 1,
          },
          "a"
        );
    };

    const prevButton = prevRef.current;
    if (prevButton) {
      prevButton.addEventListener("click", handlePrev);
    }
    return () => {
      if (prevButton) {
        prevButton.removeEventListener("click", handlePrev);
      }
    };
  }, [activeIndex, itemWidth, gap]);

  return (
    <section
      ref={containerRef}
      className="h-fit w-full flex flex-col justify-start gap-10 py-10 md:py-15 bg-darkBg"
    >
      <div className="h-fit w-full grid grid-cols-4 gap-x-3 md:gap-x-5 items-end px-3.5 md:px-5 lg:px-10">
        <h3
          data-animate-text
          className="text-heading2 text-white leading-[110%] tracking-heading2 col-span-3"
        >
          Our Evolution at <br /> RRP Electronics
        </h3>
      </div>
      <div className="h-fit w-full grid grid-cols-4 gap-x-3 md:gap-x-5">
        <div className="col-span-4 flex justify-between items-center px-3.5 md:px-10">
          <h3
            ref={yearRef}
            className="mb-6.5 col-span-4 text-display text-primary tracking-display leading-[110%] w-fit"
          >
            <span ref={yearTextRef}>2024</span>
          </h3>
          <div className="flex justify-center items-center gap-3 md:gap-4 col-span-1 w-fit ml-auto mr-0 h-fit">
            <button
              ref={prevRef}
              disabled={activeIndex === 0}
              className="cursor-pointer h-7 w-7 text-white md:h-10 md:w-10 flex justify-center items-center disabled:opacity-60 disabled:pointer-events-none disabled:cursor-not-allowed"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <rect width="40" height="40" rx="20" fill="#2E2E30" />
                <mask
                  id="mask0_453_1226"
                  maskUnits="userSpaceOnUse"
                  x="8"
                  y="8"
                  width="24"
                  height="24"
                >
                  <rect x="8" y="8" width="24" height="24" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_453_1226)">
                  <path
                    d="M22.0001 25.3078L16.6924 20L22.0001 14.6923L22.7079 15.4L18.1079 20L22.7079 24.6L22.0001 25.3078Z"
                    fill="currentColor"
                  />
                </g>
              </svg>
            </button>
            <button
              ref={nextRef}
              disabled={activeIndex === events.length - 1}
              className="cursor-pointer h-7 w-7 text-white md:h-10 md:w-10 flex justify-center items-center -scale-x-100 disabled:opacity-60 disabled:pointer-events-none disabled:cursor-not-allowed"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <rect width="40" height="40" rx="20" fill="#2E2E30" />
                <mask
                  id="mask0_453_1226"
                  maskUnits="userSpaceOnUse"
                  x="8"
                  y="8"
                  width="24"
                  height="24"
                >
                  <rect x="8" y="8" width="24" height="24" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_453_1226)">
                  <path
                    d="M22.0001 25.3078L16.6924 20L22.0001 14.6923L22.7079 15.4L18.1079 20L22.7079 24.6L22.0001 25.3078Z"
                    fill="currentColor"
                  />
                </g>
              </svg>
            </button>
          </div>
        </div>
        <div className="relative w-full overflow-x-hidden no-scrollbar col-span-4">
          <div className="w-full h-0.25 absolute bg-textSecondary z-1 top-[9px] left-0" />
          <div
            ref={timelineRef}
            className="relative flex gap-7 md:gap-12 h-fit w-fit items-start z-2 pl-3.5 md:pl-5 lg:pl-10"
          >
            {events.map((event, index) => (
              <div
                key={index}
                className="w-[285px] relative flex flex-col gap-6 justify-center items-start"
              >
                <div
                  ref={itemRefs.current[index]?.dot}
                  className="h-4.5 w-4.5 bg-textSecondary rounded-full mx-auto"
                />
                <p
                  ref={itemRefs.current[index]?.date}
                  className="text-bodyBase whitespace-nowrap text-textSecondary leading-[120%] font-neueMontreal w-fit mx-auto"
                >
                  {event.date}
                </p>
                <div
                  ref={itemRefs.current[index]?.img}
                  className="relative w-full aspect-[246/184]"
                  style={{ clipPath: "inset(0% 0% 100% 0%)" }}
                >
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="246"
                    className="object-cover object-center"
                  />
                </div>
                <p
                  ref={itemRefs.current[index]?.title}
                  className="text-white leading-[115%] text-heading4"
                  style={{ clipPath: "inset(0% 0% 100% 0%)" }}
                >
                  {event.title}
                </p>
                <p
                  ref={itemRefs.current[index]?.desc}
                  className="text-bodySmall text-textSecondary leading-[120%] font-neueMontreal -mt-2"
                  style={{ clipPath: "inset(0% 0% 100% 0%)" }}
                >
                  {event.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurJourney;
