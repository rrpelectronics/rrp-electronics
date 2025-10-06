"use client"
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap/all';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import News from './News';
import Events from './Events';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const pages = () => {
  const mainRef = useRef(null);
  const newEventsHeaderRef = useRef(null);

  useEffect(() => {
    if (!newEventsHeaderRef.current) return;

    const ctx = gsap.context(() => {
      const solutionHeaderElement = newEventsHeaderRef.current;

      ScrollTrigger.create({
        trigger: solutionHeaderElement,
        start: `top 0`,
        end: "max",
        pin: true,
        pinSpacing: false,
        // markers: true, // Uncomment for debugging
      });
    }, newEventsHeaderRef);

    return () => ctx.revert();
  }, []);

  // Active link + smooth scroll
  useEffect(() => {
    if (!newEventsHeaderRef.current) return;

    const links = newEventsHeaderRef.current.querySelectorAll("a");

    const ctx = gsap.context(() => {
      // ScrollTrigger for each section
      links.forEach((link) => {
        const targetId = link.getAttribute("href")?.replace("#", "");
        const targetEl = document.getElementById(targetId);

        if (targetEl) {
          ScrollTrigger.create({
            trigger: targetEl,
            start: "top center",
            end: "bottom center",
            onEnter: () => setActive(link),
            onEnterBack: () => setActive(link),
          });
        }
      });

      function setActive(activeLink) {
        links.forEach((l) =>{
          l.classList.remove("text-primary");
          l.classList.add("text-textPrimary");
        });
        activeLink.classList.add("text-primary");
        activeLink.classList.remove("text-textPrimary");
      }

      // Smooth scroll with offset
      links.forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const targetId = link.getAttribute("href")?.replace("#", "");
          const targetEl = document.getElementById(targetId);

          if (targetEl) {
            gsap.to(window, {
              duration: 1,
              scrollTo: {
                y: targetEl,
                offsetY: 104 + 80, // Account for both main header and sticky nav
              },
              ease: "power2.out",
            });
          }
        });
      });
    }, newEventsHeaderRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="min-h-screen w-full relative">
      <div
        ref={newEventsHeaderRef}
        className={`z-60 flex items-center justify-start gap-4 lg:gap-6 w-full h-fit bg-white py-3.5 md:py-5 px-3.5 md:px-5 lg:px-10`}
      >
        <Link
          href={"#news"}
          className={`py-2 w-fit flex items-center justify-center rounded-fullshrink-0 list-none text-bodyLarge leading-[120%] font-neueMontreal cursor-pointer transition-colors`}
        >
          News
        </Link>
        <Link
          href={"#events"}
          className={`py-2 w-fit flex items-center justify-center rounded-fullshrink-0 list-none text-bodyLarge leading-[120%] font-neueMontreal cursor-pointer transition-colors`}
        >
          Events
        </Link>
      </div>
      <News id={"news"}/>
      <Events id={"events"}/>
    </main>
  );
}

export default pages