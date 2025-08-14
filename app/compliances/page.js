'use client';
import React from 'react';
import Banner from '@/app/components/Banner';
import QualityCards from './QualityCards';
import Certifications from './Certifications';

export const compliances = () => {
  return (
    <main className="h-full w-full relative overflow-hidden">
      <Banner imgSrc={"/images/compliances/banner.webp"} heading={"Driven by Excellence, \n Guided by Standards"} text={"We Deliver Semiconductors Built on a Foundation of Quality, Precision, and Compliance"}/>
      <div className='w-full h-16'></div>
      <QualityCards/>
      <div className='w-full h-16'></div>
      <Certifications/>
    </main>
  )
}

export default compliances;