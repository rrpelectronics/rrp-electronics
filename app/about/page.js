"use client";
import React, { useEffect } from 'react';
import { useFooter } from '@/app/context/FooterContext';
import Banner from '@/app/components/Banner';
import Text from '@/app/components/Text';
import ImageLayout from '@/app/components/ImageLayout';
import VideoImgSection from '@/app/components/VideoImgSection';
import Impact from './Impact';
import People from './People';

const imgLayoutData = [
  {
    src: "/images/about/about1.webp",
    title: "Who We Are",
    description: "RRP Electronics is Maharashtra’s first OSAT-focused semiconductor company, leading innovation with a commitment to precision,sustainability, and excellence. We’re shaping India’s semiconductor future with world-class technology and trusted expertise."
  }, 
  {
    src: "/images/about/about2.webp",
    title: "What We Do",
    description: "We provide advanced OSAT services and end-to-end semiconductor solutions—ranging from chip packaging to electronics manufacturing.Our smart infrastructure and strict quality systems ensure high-performance, reliable outcomes across industries."
  }, 
]

const page = () => {
   const { setFooterContent } = useFooter();

  // Set custom footer content for about page
  useEffect(() => {
    setFooterContent({
      heading: "Let’s Shape the Future of \n Electronics Together",
      description: "Interested in partnering with RRP Electronics? We’d love to connect.",
      buttonText: "Connect with Us",
      buttonLink: "/contact-us"
    });

    // Cleanup: Reset to null when component unmounts (optional)
    return () => {
      setFooterContent(null);
    };
  }, [setFooterContent]);
  
  return (
    <main className='min-h-screen w-full'>
      <Banner imgSrc={"/images/about/banner.webp"} heading={"Pioneering Precision and \n Innovation in OSAT Services"}/>
      <Text text={"At RRP Electronics, we specialize in advanced OSAT (Outsourced Semiconductor Assembly and Test) services, combining cutting-edge technology with unwavering precision. From concept to completion, we drive innovation that powers next-gen electronics and shapes a smarter, connected future."}/>
      <ImageLayout imageLayoutData={imgLayoutData}/>
      <Impact/>
      <People/>
      <VideoImgSection videoSrc={"/images/about/osat-process.mp4"} heading={"State-of-the-Art Manufacturing & OSAT Facility"} text={"We nurture an environment of growth, learning, and leadership—empowering our teams to think big and innovate."}/>
    </main>
  )
}

export default page