"use client"
import React, { useRef } from 'react';
import News from './News';

const pages = () => {
  const mainRef = useRef(null);
  const newEventsHeaderRef = useRef(null);

  return (
    <main ref={mainRef} className="min-h-screen w-full relative mt-25 lg:mt-35">
      <News id={"news"}/>
    </main>
  );
}

export default pages;