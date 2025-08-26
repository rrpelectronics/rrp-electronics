'use client'
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import Link from 'next/link';
import Banner from '@/app/components/Banner';
import VideoImgSection from '@/app/components/VideoImgSection';
import { useHeaderHeight } from '@/app/context/HeaderHeightContext';
import Osat from './Osat';
import Fab from './Fab';
import Technologies from './Technologies';
import Packaging from './Packaging';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Page = () => {
  const mainRef = useRef(null);
  const solutionHeaderRef = useRef(null);
  const headerHeight = useHeaderHeight();

  // Sticky header
  useEffect(() => {
    if (!solutionHeaderRef.current || !mainRef.current || headerHeight === undefined) return;

    const ctx = gsap.context(() => {
      const solutionHeaderElement = solutionHeaderRef.current;
      const mainHeight = mainRef.current.offsetHeight;

      ScrollTrigger.create({
        trigger: solutionHeaderElement,
        start: `top ${headerHeight}px`,
        end: `${mainHeight - headerHeight}px ${headerHeight}px`,
        // markers: true,
        onEnter: () => {
          gsap.set(solutionHeaderElement, {
            position: "fixed",
            top: `${headerHeight}px`,
            left: 0,
            right: 0,
            zIndex: 50,
            width: "100%"
          });
        },
        onLeave: () => {
          gsap.set(solutionHeaderElement, {
            position: "static",
            top: "auto",
            left: "auto",
            right: "auto",
            zIndex: "auto",
            width: "auto"
          });
        },
        onEnterBack: () => {
          gsap.set(solutionHeaderElement, {
            position: "fixed",
            top: `${headerHeight}px`,
            left: 0,
            right: 0,
            zIndex: 10,
            width: "100%"
          });
        },
        onLeaveBack: () => {
          gsap.set(solutionHeaderElement, {
            position: "static",
            top: "auto",
            left: "auto",
            right: "auto",
            zIndex: "auto",
            width: "auto"
          });
        },
      });
    }, solutionHeaderRef);

    return () => ctx.revert();
  }, [headerHeight]);

  // Active link + smooth scroll
  useEffect(() => {
    if (!solutionHeaderRef.current) return;

    const links = solutionHeaderRef.current.querySelectorAll("a");

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
          l.classList.remove("text-primary");}
        );
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
                offsetY: 100,
              },
              ease: "power2.out",
            });
          }
        });
      });
    }, solutionHeaderRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className='min-h-screen w-full relative'>
      <Banner 
        imgSrc={"/images/solutions/banner.webp"} 
        heading={"Smart Solutions for a Smarter Future"} 
        text={"At RRP Electronics, we are shaping the future of semiconductor innovation in India. Our integrated solutions span advanced OSAT capabilities, next-gen packaging, prototyping, and specialized display technologies designed to drive scalability, reliability, and real-world impact. Explore how we're enabling the next wave of electronics excellence."}
      />

      {/* Sticky Header Nav */}
      <div ref={solutionHeaderRef} className="bg-white min-w-full overflow-x-auto no-scrollbar px-3.5 md:px-5 lg:px-10 py-5 flex gap-4 md:gap-12 border-b border-borderPrimary items-center">
        <li className="shrink-0 list-none w-fit text-bodyLarge leading-[120%] font-neueMontreal">
          <Link href={"#osat"} className="text-primary">OSAT</Link>
        </li>
        <li className="shrink-0 list-none w-fit text-bodyLarge leading-[120%] font-neueMontreal">
          <Link href={"#advanced-packaging"} className="text-textPrimary">Advanced Packaging</Link>
        </li>
        <li className="shrink-0 list-none w-fit text-bodyLarge leading-[120%] font-neueMontreal">
          <Link href={"#fab"} className="text-textPrimary">Fab</Link>
        </li>
        <li className="shrink-0 list-none w-fit text-bodyLarge leading-[120%] font-neueMontreal">
          <Link href={"#display"} className="text-textPrimary">Display</Link>
        </li>
      </div>

      {/* Sections */}
      <Osat id="osat"/>
      <VideoImgSection 
        videoSrc={"/images/solutions/osat-process.mp4"} 
        heading={"Inside the \n OSAT Process"} 
        text={"From wafer to package, see how our world-class OSAT process delivers precision, performance, and scalability at every stage of chip assembly and testing."}
      />
      <Packaging id="advanced-packaging"/>
      <Fab id="fab"/>
      <Technologies id="display"/>
    </main>
  )
}

export default Page;