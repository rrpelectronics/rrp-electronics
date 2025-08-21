"use client";
import React from 'react';
import SectionHeader from '@/app/components/SectionHeader';
import GridEventCards from '@/app/components/GridEventCards';

const press_data = [
  {
    newsEventImg: "/images/news-events/press-1.webp",
    title:
      "RRP Electronics to establish first semiconductor plant in Maharashtra",
    date: "April 05",
    source: "India Today",
    link: "#",
  },
  {
    newsEventImg: "/images/news-events/press-2.webp",
    title:
      "RRP Electronics to establish first semiconductor plant in Maharashtra",
    date: "April 05",
    source: "India Today",
    link: "#",
  },
];

const PressReleases = () => {
  return (
    <section className="h-fit w-full py-10 md:py-15">
      <SectionHeader
        heading={"Press Releases"}
        text={"Official announcements from RRP Electronics."}
      />
      <ul className="w-full h-fit grid justify-center items-stretch grid-cols-4 gap-y-7.5 gap-x-3 md:gap-x-5 px-3.5 md:px-5 lg:px-10">
        {press_data.map((item, id) => (
          <GridEventCards key={id} newsEventImg={item.newsEventImg} title={item.title} date={item.date} source={item.source} link={item.link}/>
        ))}
      </ul>
    </section>
  );
}

export default PressReleases