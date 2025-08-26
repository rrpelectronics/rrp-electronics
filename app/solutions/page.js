'use client'
import React from 'react';
import Banner from '@/app/components/Banner';
import VideoImgSection from '@/app/components/VideoImgSection';
import Osat from './Osat';
import Fab from './Fab';
import Technologies from './Technologies';
import Packaging from './Packaging';

const page = () => {
  return (
    <main className='min-h-screen w-full'>
      <Banner imgSrc={"/images/solutions/banner.webp"} heading={"Smart Solutions for a Smarter Future"} text={"At RRP Electronics, we are shaping the future of semiconductor innovation in India. Our integrated solutions span advanced OSAT capabilities, next-gen packaging, prototyping, and specialized display technologies designed to drive scalability, reliability, and real-world impact. Explore how we’re enabling the next wave of electronics excellence."}/>
      <Osat/>
      <VideoImgSection videoSrc={"/images/common/video.mp4"} heading={"Inside the \n OSAT Process"} text={"From wafer to package, see how our world-class OSAT process delivers precision, performance, and scalability at every stage of chip assembly and testing."}/>
      <Packaging/>
      <Fab/>
      <Technologies/>
    </main>
  )
}

export default page