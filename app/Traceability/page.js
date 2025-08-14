'use client';
import React from 'react';
import Banner from '@/app/components/Banner';
import StackCards from './StackCards';

const traceability = () => {
  return (
    <main className='h-full w-full relative overflow-hidden'>
      <Banner imgSrc={"/images/traceability/banner.webp"} heading={"End-to-End Traceability \n You Can Trust"} text={"Ensuring Precision, Accountability, and Quality at Every Stage of Semiconductor Manufacturing"}/> 
      <div className='w-full h-10 md:h-16'></div>
      <StackCards/>
    </main>
  )
}

export default traceability