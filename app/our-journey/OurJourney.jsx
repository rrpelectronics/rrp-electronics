"use client";
import React, { useRef, useEffect, useState, createRef } from "react";
import gsap from "gsap/all";
import { useTextAnim } from "@/app/hooks/useTextAnim";
import { events } from "./data";
import JourneyHeader from "@/app/components/journey/JourneyHeader";
import JourneyYear from "@/app/components/journey/JourneyYear";
import JourneyTimeline from "@/app/components/journey/JourneyTimeline";

const OurJourney = () => {
  const yearRef = useRef(null);
  const yearTextRef = useRef(null);
  const timelineRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const { containerRef } = useTextAnim();

  const itemRefs = useRef([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [yearWidth, setYearWidth] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const [gap, setGap] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false); // Add animation state

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

  // Width + resize handling
  useEffect(() => {
    const updateWidths = () => {
      if (yearRef.current) {
        setYearWidth(yearRef.current.getBoundingClientRect().width);
      }
      if (timelineRef.current?.children[0]) {
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
          tl.to(
            yearTextRef.current,
            {
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
            },
            "a"
          ).to(
            yearTextRef.current,
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.25,
              ease: "power2.inOut",
            },
            "a"
          );
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

  // Handle date click animation with timeout protection
  const handleDateClick = (targetIndex) => {
    // Prevent clicks during animation or if same index
    if (isAnimating || targetIndex === activeIndex || itemWidth === 0) return;

    setIsAnimating(true); // Set animation state

    const translateDistance = itemWidth + gap;
    const yearOffset = yearWidth / 2 - yearWidth * 0.18;
    const dotSize = 18;
    const centerMargin = (itemWidth - dotSize) / 2;

    const tl = gsap.timeline({
      onComplete: () => {
        setActiveIndex(targetIndex);
        // Add timeout to prevent rapid clicks
        setTimeout(() => {
          setIsAnimating(false);
        }, 200); // 200ms cooldown after animation completes
      },
    });

    // Animate timeline position
    tl.to(
      timelineRef.current,
      {
        translateX: `-${targetIndex * translateDistance}px`,
        ease: "power2.inOut",
        duration: 1,
      },
      "main"
    );

    // Animate items based on their relationship to target
    events.forEach((_, index) => {
      const item = itemRefs.current[index];
      if (!item) return;

      const dateWidth = item.date.current.getBoundingClientRect().width;
      const centerDateMargin = (itemWidth - dateWidth) / 2;

      if (index === targetIndex) {
        // Animate target item to active state
        tl.to(
          item.dot.current,
          {
            marginLeft: yearOffset,
            marginRight: yearOffset,
            ease: "power2.inOut",
            duration: 1,
          },
          "main"
        )
          .to(
            item.date.current,
            {
              marginLeft: 0,
              marginRight: 0,
              ease: "power2.inOut",
              duration: 1,
            },
            "main"
          )
          .to(
            item.img.current,
            {
              clipPath: "inset(0% 0% 0% 0%)",
              ease: "power2.inOut",
              duration: 1,
            },
            "main"
          )
          .to(
            item.title.current,
            {
              clipPath: "inset(0% 0% 0% 0%)",
              ease: "power2.inOut",
              duration: 1,
            },
            "main"
          )
          .to(
            item.desc.current,
            {
              clipPath: "inset(0% 0% 0% 0%)",
              ease: "power2.inOut",
              duration: 1,
            },
            "main"
          );
      } else {
        // Animate all non-target items to inactive state (hide content, keep date visible)
        tl.to(
          item.dot.current,
          {
            marginLeft: centerMargin,
            marginRight: centerMargin,
            ease: "power2.inOut",
            duration: 1,
          },
          "main"
        )
          .to(
            item.date.current,
            {
              marginLeft: centerDateMargin,
              marginRight: centerDateMargin,
              ease: "power2.inOut",
              duration: 1,
            },
            "main"
          )
          .to(
            item.img.current,
            {
              clipPath: "inset(0% 0% 100% 0%)",
              ease: "power2.inOut",
              duration: 1,
            },
            "main"
          )
          .to(
            item.title.current,
            {
              clipPath: "inset(0% 0% 100% 0%)",
              ease: "power2.inOut",
              duration: 1,
            },
            "main"
          )
          .to(
            item.desc.current,
            {
              clipPath: "inset(0% 0% 100% 0%)",
              ease: "power2.inOut",
              duration: 1,
            },
            "main"
          );
      }
    });
  };

  // Handle next click with timeout protection
  useEffect(() => {
    const handleNext = () => {
      if (isAnimating || activeIndex >= events.length - 1) return;
      handleDateClick(activeIndex + 1);
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
  }, [activeIndex, events.length, itemWidth, gap, yearWidth, isAnimating]);

  // Handle prev click with timeout protection
  useEffect(() => {
    const handlePrev = () => {
      if (isAnimating || activeIndex <= 0) return;
      handleDateClick(activeIndex - 1);
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
  }, [activeIndex, itemWidth, gap, isAnimating]);

  return (
    <section
      ref={containerRef}
      className="h-fit w-full flex flex-col justify-start gap-10 py-10 md:py-15 bg-darkBg"
    >
      <JourneyHeader />

      <div className="h-fit w-full grid grid-cols-4 gap-x-3 md:gap-x-5">
        <JourneyYear
          yearRef={yearRef}
          yearTextRef={yearTextRef}
          prevRef={prevRef}
          nextRef={nextRef}
          activeIndex={activeIndex}
          total={events.length}
        />

        <JourneyTimeline
          timelineRef={timelineRef}
          events={events}
          itemRefs={itemRefs}
          activeIndex={activeIndex}
          handleDateClick={handleDateClick}
        />
      </div>
    </section>
  );
};

export default OurJourney;