'use client';
import React from 'react';
import Banner from '@/app/components/Banner';
import Logistics from './Logistics';

export const logistics = () => {
  return (
    <main className="h-full w-full relative overflow-hidden">
      <Banner imgSrc={"/images/logistics/banner.webp"} heading={"Strategically Located for Seamless Supply Chain & Logistics"} text={"Global Reach, Local Advantage – Efficient and Reliable Delivery from the Heart of Mumbai"}/>
      <div className='w-full h-10 md:h-16'></div>
      <Logistics/>
    </main>
  )
}

export default logistics;