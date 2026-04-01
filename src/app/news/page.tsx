"use client"
import React, { useRef } from 'react';
import { useHeaderHeight } from '@/context/HeaderHeightContext';
import News from './News';

const pages = () => {
  const mainRef = useRef(null);
  const headerHeight = useHeaderHeight();

  return (
    <main ref={mainRef} style={{ marginTop: headerHeight }} className="min-h-screen w-full relative">
      <News id={"news"}/>
    </main>
  );
}

export default pages;
