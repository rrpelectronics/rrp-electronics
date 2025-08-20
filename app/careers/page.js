"use client";
import React from 'react';
import Banner from '@/app/components/Banner';
import Text from '@/app/components/Text';
import JobList from './JobList';

const page = () => {
  return (
    <main className="min-h-screen w-full relative">
      <Banner
        imgSrc={"/images/careers/banner.webp"}
        heading={"Be Part of the \n Semiconductor Evolution"}
      />
      <Text
        text={
          "Join RRP electronics and be part of a team transforming India’s semiconductor landscape. Work on cutting-edge technologies, collaborate with industry pioneers, and accelerate your career in a dynamic, innovation-driven environment."
        }
      />
      <JobList/>
    </main>
  );
}

export default page;