'use client';
import React from 'react';
import Banner from '@/app/components/Banner';
import QualityCards from './QualityCards';
import Certifications from './Certifications';

export const compliances = () => {
  return (
    <main className="min-h-screen w-full relative">
      <Banner imgSrc={"/images/compliances/banner.webp"} heading={"Driven by Excellence, \n Guided by Standards"} text={"We Deliver Semiconductors Built on a Foundation of Quality, Precision, and Compliance"}/>
      <QualityCards/>
      <Certifications/>
    </main>
  )
}

export default compliances;