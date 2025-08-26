"use client"
import React from 'react';
import Banner from '@/app/components/Banner';
import Text from '@/app/components/Text';
import ImageLayout from '@/app/components/ImageLayout';

const imgLayoutData = [
  {
    src: "/images/projects/project1.webp",
    title: "Compound Semiconductor FAB",
    description: "A next-gen facility focused on high-performance compound semiconductors for future-ready applications.",
    dates: {
      initiated: "November 2024",
      expected: "2026"
    }
  }, 
  {
    src: "/images/projects/project2.webp",
    title: "Wafer Level Packaging (with DECA Technologies)",
    description: "An advanced packaging solution designed to redefine performance, efficiency, and scalability in semiconductor devices.",
    dates: {
      initiated: "November 2024",
      expected: "2026"
    }
  }, 
]

const page = () => {
  return (
    <main className='min-h-screen w-full'>
      <Banner imgSrc={"/images/projects/banner.webp"} heading={"Shaping the Future – \n What’s Next for \n RRP Electronics?"}/>
      <Text text={"At RRP Electronics, we’re always looking ahead. From cutting-edge technology rollouts to new strategic partnerships, here’s a glimpse into what’s coming next."}/>
      <ImageLayout heading={"Next-Gen Projects in the Making"} imageLayoutData={imgLayoutData}/>
    </main>
  )
}

export default page