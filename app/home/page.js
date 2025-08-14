"use client";
import React from 'react';
import Banner from '@/app/components/Banner';
import VideoImgSection from '@/app/components/VideoImgSection';
import Carousel from './Carousel';
import Accordion from './Accordion';
import Grid from './Grid';

const Home = () => {
    return (
      <main className="min-h-screen w-full relative">
        <Banner 
          video={"/images/home/banner-video.mp4"}
          heading={"Maharashtra’s First \n Operational OSAT Facility. \n Expanding Forward."}
          text={"Driving India’s semiconductor momentum with scalable, next-gen packaging and testing capabilities from the heart of Maharashtra."}
        />
        <Carousel/>
        <Accordion/>
        <VideoImgSection videoSrc={"/images/common/video.mp4"} heading={"Inside the \n OSAT Process"} text={"From wafer to package, see how our world-class OSAT process delivers precision, performance, and scalability at every stage of chip assembly and testing."}/>
        <Grid/>
      </main>
    );
}

export default Home;