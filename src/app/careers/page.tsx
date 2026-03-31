"use client";
import React from 'react';
import BannerStack from '@/components/BannerStack';
import Text from '@/components/Text';
import JobList from './JobList';
import Why from './Why';
import Culture from './Culture';

const page = () => {
  return (
    <main className="min-h-screen w-full relative overflow-clip">
      <BannerStack
        imgSrc={"/images/careers/banner.webp"}
        heading={"Be Part of the \n Semiconductor \n Evolution"}
      />
      <Text
        text={
          "Join RRP electronics and be part of a team transforming India’s semiconductor landscape. Work on cutting-edge technologies, collaborate with industry pioneers, and accelerate your career in a dynamic, innovation-driven environment."
        }
      />
      <JobList/>
      <Why/>
      <Culture/>
    </main>
  );
}

export default page;
