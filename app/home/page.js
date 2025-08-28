"use client";
import React from 'react';
import Banner from '@/app/components/BannerStack';
import VideoImgSection from '@/app/components/VideoImgSection';
import Carousel from './Carousel';
import Accordion from './Accordion';
import Grid from './Grid';
import News from './News';
import PopupCard from '../components/pop-up';

const Home = () => {
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