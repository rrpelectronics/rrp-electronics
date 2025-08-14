'use client';
import React from 'react';
import Banner from '@/app/components/Banner';
import Logistics from './Logistics';

export const logistics = () => {
  return (
    <main className="min-h-screen w-full relative">
      <Banner imgSrc={"/images/logistics/banner.webp"} heading={"Strategically Located for Seamless Supply Chain & Logistics"} text={"Global Reach, Local Advantage – Efficient and Reliable Delivery from the Heart of Mumbai"}/>
      <Logistics/>
    </main>
  )
}

export default logistics;