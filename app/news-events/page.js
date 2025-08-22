"use client"
import React from 'react';
import NewsEvents from './NewsEvents';
import PressReleases from './PressReleases';

const pages = () => {
  return (
    <main className="min-h-screen w-full relative">
      <NewsEvents/>
      <PressReleases/>
    </main>
  );
}

export default pages