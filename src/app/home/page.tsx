"use client";
import React, { useEffect } from "react";
import { useFooter } from "@/context/FooterContext";
import BannerStack from "@/components/BannerStack";
import Text from "@/components/Text";
import VideoImgSection from "@/components/VideoImgSection";
import Carousel from "./Carousel";
import Accordion from "./Accordion";
import Grid from "./Grid";
import News from "./News";
import Events from "./Events";

const Home = () => {
  const { setFooterContent } = useFooter();

  useEffect(() => {
    setFooterContent({
      heading: "Shaping the Future.\nPowering Innovation.",
      description:
        "Powering the next generation of semiconductors with precision, scale, and intelligence.",
      buttonText: "Connect with Us",
      buttonLink: "/contact-us",
    });
    
    return () => {
      setFooterContent(null);
    };
  }, [setFooterContent]);

  return (
    <main className="min-h-screen w-full relative">
      <BannerStack
        video={"/images/home/banner-video.mp4"}
        heading={
          "Maharashtra’s First \n Operational OSAT Facility. \n Expanding Forward."
        }
        placeholder={"/images/home/banner_placeholder.webp"}
      />
      <Text text={
          "Driving India’s semiconductor momentum with scalable, next-gen packaging and testing capabilities from the heart of Maharashtra."
        }/>
      <Carousel />
      <Accordion />
      {/* <VideoImgSection
        videoSrc={"/images/home/osat-process.mp4"}
        heading={"Inside the \n OSAT Process"}
        text={
          "From wafer to package, see how our world-class OSAT process delivers precision, performance, and scalability at every stage of chip assembly and testing."
        }
        placeholder={"/images/home/osat_placeholder.webp"}
      /> */}
      <Grid />
      <News />
      <Events/>
    </main>
  );
};

export default Home;
