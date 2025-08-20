"use client";
import React from 'react';
import HeadingCenter from '@/app/components/HeadingCenter';

const JobList = () => {
  return (
    <section className="h-fit w-full px-3.5 md:px-5 lg:px-10 py-10 md:py-15 bg-white">
      <HeadingCenter
        heading={"Who We Hire"}
        text={
          "Join a team of experts driving the next generation of semiconductor packaging"
        }
      />
    </section>
  );
}

export default JobList