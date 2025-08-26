'use client'
import React, { useRef } from 'react'
import Link from 'next/link';
import gsap from 'gsap/all';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


export default function About() {
  const sectionRef = useRef(null);
  
  return (
    <section ref={sectionRef} className="w-full h-full px-3.5 md:px-5 lg:px-10">
      <div className="w-full grid grid-cols-4">
        {/* about us */}
        <div className="w-full col-span-4 flex flex-col md:grid md:grid-cols-4 gap-4 md:gap-0 py-10 md:py-15">
          <div className="md:col-span-2 flex items-start">
            <h3 className="text-heading2 text-black leading-[110%]">
              Description
            </h3>
          </div>
          <div className="col-span-4 md:col-span-2 flex flex-col gap-6 w-[80%]">
            <p className="text-textPrimary text-bodyBase leading-[120%] font-neueMontreal">
              We are looking for enthusiastic Diploma holders in Electronics
              Engineering to join our team. This is an excellent opportunity for
              freshers and trainees who want to build a career in the
              semiconductor and electronics domain.
            </p>
            <Link
              href={"mailto: hr@rrpelectronics.com"}
              className="leading-[110%] text-bodyBase text-textPrimary font-neueMontreal"
            >
              Think you’re a great fit? Drop your resume at &nbsp;
              <span className="text-primary underline decoration-solid decoration-primary">
                hr@rrpelectronics.com
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}