"use client";
import React, { useEffect } from 'react';
import { useFooter } from '@/app/context/FooterContext';
import Banner from '@/app/components/BannerStack';
import VideoImgSection from '@/app/components/VideoImgSection';
import Carousel from './Carousel';
import Accordion from './Accordion';
import Grid from './Grid';
import News from './News';
import PopupCard from '../components/pop-up';

const Home = () => {
  const { setFooterContent } = useFooter();

  useEffect(() => {
    setFooterContent({
      heading: "Shaping the Future.\nPowering Innovation.",
      description: "Powering the next generation of semiconductors with precision, scale, and intelligence.",
      buttonText: "Connect with Us",
      buttonLink: "/contact-us"
    });
  }, [setFooterContent]);
  
  return (
    <main className="min-h-screen w-full relative">
      <PopupCard/>
      <Banner 
        video={"/images/home/banner-video.mp4"}
        heading={"Maharashtra’s First \n Operational OSAT Facility. \n Expanding Forward."}
        text={"Driving India’s semiconductor momentum with scalable, next-gen packaging and testing capabilities from the heart of Maharashtra."}
      />
      <Carousel/>
      <Accordion/>
      <VideoImgSection videoSrc={"/images/home/osat-process.mp4"} heading={"Inside the \n OSAT Process"} text={"From wafer to package, see how our world-class OSAT process delivers precision, performance, and scalability at every stage of chip assembly and testing."}/>
      <Grid/>
      <News/>
    </main>
  );
}

export default Home;