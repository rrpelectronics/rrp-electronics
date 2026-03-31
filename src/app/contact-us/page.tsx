"use client";
import React from 'react';
import Contact from './Contact';
import List from './List';

const page = () => {
  return (
    <main className="@container min-h-screen w-full mt-20 lg:mt-30">
      <Contact />
      <List/>
    </main>
  );
}

export default page
