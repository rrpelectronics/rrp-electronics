'use client';
import React from 'react';
import Banner from '@/app/components/Banner';
import StackCards from './StackCards';

const traceability = () => {
  return (
    <main className='min-h-full w-full relative'>
      <Banner imgSrc={"/images/traceability/banner.webp"} heading={"End-to-End Traceability \n You Can Trust"} text={"Ensuring Precision, Accountability, and Quality at Every Stage of Semiconductor Manufacturing"}/>
      <StackCards/>
    </main>
  )
}

export default traceability