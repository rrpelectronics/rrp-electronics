'use client'
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import Link from 'next/link';
import Banner from '@/app/components/Banner';
import VideoImgSection from '@/app/components/VideoImgSection';
import { useFooter } from '@/app/context/FooterContext';
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
  const { setFooterContent } = useFooter();

  // GSAP Pin Header
  useEffect(() => {
    if (!solutionHeaderRef.current || headerHeight === undefined) return;

    const ctx = gsap.context(() => {
      const solutionHeaderElement = solutionHeaderRef.current;

      ScrollTrigger.create({
        trigger: solutionHeaderElement,
        start: `top ${headerHeight}px`,
        end: "max", // Adjust this based on when you want it to unpin
        pin: true,
        pinSpacing: false, // Set to true if you want to maintain spacing
        // markers: true, // Uncomment for debugging
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
                offsetY: headerHeight + 80, // Account for both main header and sticky nav
              },
              ease: "power2.out",
            });
          }
        });
      });
    }, solutionHeaderRef);

    return () => ctx.revert();
  }, [headerHeight]);

   // Set custom footer content for solutions page
    useEffect(() => {
      setFooterContent({
        heading: "Ready to Build \n With Us?",
        description: "From concept to production, RRP Electronics delivers high-impact semiconductor solutions.",
        buttonText: "Connect with Us",
        buttonLink: "/contact-us"
      });
  
      // Cleanup: Reset to null when component unmounts
      return () => {
        setFooterContent(null);
      };
    }, [setFooterContent]);

  return (
    <main ref={mainRef} className='min-h-screen w-full relative overflow-x-hidden'>
      <Banner 
        imgSrc={"/images/solutions/banner.webp"} 
        heading={"Smart Solutions for a Smarter Future"} 
        text={"At RRP Electronics, we are shaping the future of semiconductor innovation in India. Our integrated solutions span advanced OSAT capabilities, next-gen packaging, prototyping, and specialized display technologies designed to drive scalability, reliability, and real-world impact. Explore how we're enabling the next wave of electronics excellence."}
      />

      {/* Sticky Header Nav */}
      <div ref={solutionHeaderRef} className="bg-white min-w-full overflow-x-auto no-scrollbar px-3.5 md:px-5 lg:px-10 py-5 flex gap-4 md:gap-12 border-b border-borderPrimary items-center z-40">
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