"use client";
import React from 'react';
import InsideBanner from './InsideBanner';
import About from './About';


const page = () => {
  return (
    <main className="min-h-screen w-full relative">
     <InsideBanner/>
     <About/>
    </main>
  );
}

export default page;