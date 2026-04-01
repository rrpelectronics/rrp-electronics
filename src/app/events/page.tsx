"use client"
import React, { useRef } from 'react';
import { useHeaderHeight } from '@/context/HeaderHeightContext';
import Events from './Events';

const pages = () => {
  const mainRef = useRef(null);
  const headerHeight = useHeaderHeight();

  return (
    <main ref={mainRef} style={{ marginTop: headerHeight }} className="min-h-screen w-full relative">
      <Events id={"events"}/>
    </main>
  );
}

export default pages;
