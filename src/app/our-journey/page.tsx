"use client";
import React, { useEffect } from 'react';
import { useFooter } from '@/context/FooterContext';
import BannerStack from '@/components/BannerStack';
import Text from '@/components/Text';
import Beginning from './Beginning';
import Future from './Future';
import OurJourney from './OurJourney';

const page = () => {
  const { setFooterContent } = useFooter();
  
    // Set custom footer content for about page
    useEffect(() => {
      setFooterContent({
        heading: "Be Part of \n Our Ongoing Journey",
        description: "RRP Electronics is evolving—let’s collaborate, invest, and grow together.",
        buttonText: "Join our Journey",
        buttonLink: "/contact-us"
      });
  
      // Cleanup: Reset to null when component unmounts (optional)
      return () => {
        setFooterContent(null);
      };
    }, [setFooterContent]);

  return (
    <main className='min-h-screen w-full relative overflow-clip'>
      <BannerStack
        imgSrc={"/images/our-journey/banner.webp"}
        heading={"From Vision to Reality – \n A Journey of Innovation"}
      />
      <Text
        text={
          "Our journey reflects India’s ambition to be a global semiconductor hub. What started as a vision has evolved into a fully operational OSAT facility, pioneering next-gen technology."
        }
      />
      <Beginning/>
      <OurJourney/>
      <Future/>
    </main>
  );
}

export default page
