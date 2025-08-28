"use client";
import React, { useEffect } from 'react';
import { useFooter } from '@/app/context/FooterContext';
import Banner from "@/app/components/Banner";
import Text from "@/app/components/Text";
import Rajendra from "./Rajendra";

const page = () => {
  const { setFooterContent } = useFooter();
    
  // Set custom footer content for about page
  useEffect(() => {
    setFooterContent({
      heading: "Engage with \n Our Visionary Leaders",
      description: "Our leadership is shaping semiconductor technology. Contact us to collaborate.",
      buttonText: "Connect With Us",
      buttonLink: "/contact-us"
    });

    // Cleanup: Reset to null when component unmounts (optional)
    return () => {
      setFooterContent(null);
    };
  }, [setFooterContent]);

  return (
    <main className='min-h-screen w-full'>
      <Banner
        imgSrc={"/images/leadership/banner.webp"}
        heading={"Leaders of Innovation, \n Architects of the Future"}
      />
      <Text
        text={
          "Our leadership team brings decades of expertise in semiconductor R&D, advanced manufacturing, and global supply chain management, shaping the future of high-performance electronics."
        }
      />
      <Rajendra/>
    </main>
  );
};

export default page;
