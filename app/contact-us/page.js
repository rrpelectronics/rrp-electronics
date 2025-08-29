"use client";
import React from 'react';
import Contact from './Contact';
import List from './List';

const page = () => {
  return (
    <main className="@container min-h-screen w-full">
      <Contact />
      <List/>
    </main>
  );
}

export default page