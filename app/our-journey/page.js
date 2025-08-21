"use client";
import React from 'react';
import Banner from '@/app/components/Banner';
import Text from '@/app/components/Text';
import Beginning from './Beginning';
import Future from './Future';
import OurJourney from './OurJourney';

const page = () => {
  return (
    <main className='min-h-screen w-full'>
      <Banner
        imgSrc={"/images/our-journey/banner.webp"}
        heading={"From Vision to Reality – \n A Journey of Innovation"}
      />
      <Text
        text={
          "Our journey reflects India’s ambition to be a global semiconductor hub. What started as a vision has evolved into a fully operational world-class OSAT facility, pioneering next-gen technology."
        }
      />
      <Beginning/>
      <OurJourney/>
      <Future/>
    </main>
  );
}

export default page