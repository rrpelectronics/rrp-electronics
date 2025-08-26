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
            <h3 className="text-heading2 text-black leading-[110%]">About Us</h3>
          </div>
          <div className="md:col-span-2">
            <p className="text-textPrimary text-bodyBase leading-[120%] font-neueMontreal">
              At RRP S4E, we specialize in precision engineering and electro-optics, providing cutting-edge solutions to defense, aerospace, and high-tech industries. With over three decades of innovation and a strong commitment to excellence, we are at the forefront of technological advancements, including drone systems, VTOL technologies, and defense applications.
            </p>
          </div>
        </div>
        
        {/* the role */}
        <div className="w-full col-span-4 flex flex-col md:grid md:grid-cols-4 gap-4 md:gap-0 py-10 md:py-15">
          <div className="md:col-span-2 flex items-start">
            <h3 className="text-heading2 text-black leading-[110%]">The Role</h3>
          </div>
          <div className="md:col-span-2">
            <p className="text-textPrimary text-bodyBase leading-[120%] font-neueMontreal">
              We are looking for a Drone Systems Engineer to join our Defense Technology team. In this role, you will design, develop, and test advanced drone systems, playing a key part in RRP S4E's defense solutions. Your work will push the boundaries of drone technologies, focusing on lightweight, high-performance systems for military and defense applications.
            </p>
          </div>
        </div>
        
        {/* responsibilities */}
        <div className="w-full col-span-4 flex flex-col md:grid md:grid-cols-4 gap-4 md:gap-0 py-10 md:py-15">
          <div className="md:col-span-2 flex items-start">
            <h3 className="text-heading2 text-black leading-[110%]">Responsibilities</h3>
          </div>
          <div className="md:col-span-2">
            <ul className="pl-5 list-disc text-textPrimary text-bodyBase leading-[120%] font-neueMontreal space-y-4 md:space-y-6">
              <li>Design, develop, and optimize drone systems for defense applications, including hardware, software, and integration.</li>
              <li>Collaborate with cross-functional teams to meet stringent performance and safety requirements.</li>
              <li>Lead testing, troubleshooting, and validation of drone systems, ensuring quality and functionality.</li>
              <li>Collaborate with cross-functional teams to meet stringent performance and safety requirements.</li>
            </ul>
          </div>
        </div>
        
        {/*join RRP S4E */}
        <div className="w-full col-span-4 flex flex-col md:grid md:grid-cols-4 gap-4 md:gap-0 py-10 md:py-15">
          <div className="md:col-span-2 flex items-start">
            <h3 className="text-heading2 text-black leading-[110%]">Why Join RRP S4E</h3>
          </div>
          <div className="md:col-span-2">
            <p className="text-textPrimary text-bodyBase leading-[120%] font-neueMontreal mb-4">
              At RRP S4E, you'll be part of a team that's redefining defense technology. We offer competitive salaries, opportunities for professional development, and a culture of innovation where your ideas are valued. Join us to work on projects that have a real impact on global defense and aerospace advancements.
            </p>
            <p className="text-textPrimary text-bodyBase leading-[120%] font-neueMontreal mb-9">
              If you're passionate about pushing the limits of drone technology and eager to contribute to groundbreaking projects, we want to hear from you!
            </p>
            <Link
              href={"/contact-us"}
              className="text-bodySmall text-primary leading-[120%] bg-none border border-primary rounded-full w-fit px-4 md:px-6 py-2 md:py-3"
            >
              Apply Now
            </Link>
          </div>
        </div>
        
      </div>
    </section>
  )
}