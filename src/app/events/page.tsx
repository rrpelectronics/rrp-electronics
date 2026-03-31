"use client"
import React, { useRef } from 'react';
import Events from './Events';

const pages = () => {
  const mainRef = useRef(null);
  const newEventsHeaderRef = useRef(null);

  return (
    <main ref={mainRef} className="min-h-screen w-full relative">
      <Events id={"events"}/>
    </main>
  );
}

export default pages;
