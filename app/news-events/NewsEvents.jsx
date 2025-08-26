"use client";
import React from "react";
import NewsEventsCard from "@/app/components/NewsEventsCard";

const news_data = [
  {
    id: "1",
    newsEventImg: "/images/news-events/news-1.webp",
    title:
      "DECA Technology: Strategic Boost to India & Semiconductor Packaging Industry",
    date: "March 28",
    source: "India Business Journal",
    link: "/news-events/1",
    description:
      "RRP Electronics has signed a Memorandum of Understanding (MoU) with U.S.-based Deca Technologies to acquire cutting-edge wafer-level packaging technologies. The technology transfer includes M-Series and Adaptive Patterning—both critical for next-generation wafer-level chip-scale fan-out packages.",
    imgBgClass: "object-center",
  },
  {
    id: "2",
    newsEventImg: "/images/news-events/news-2.webp",
    title:
      "RRP Electronics Ltd Launched Maharashtra’s First OSAT Semiconductor Manufacturing Facility.",
    date: "September 19",
    source: "The Print",
    link: "/news-events/2",
    description:
      "RRP Electronics Ltd has launched Maharashtra's first OSAT (Outsourced Semiconductor Assembly and Test) facility, boosting the region's technological capabilities.",
    imgBgClass: "object-center",
  },
  {
    id: "3",
    newsEventImg: "/images/news-events/news-3.webp",
    title: "RRP Electronics named ‘Most Trusted Semiconductor Brand 2025’",
    date: "July 10",
    source: "Manufacturing Today India",
    link: "/news-events/3",
    description:
      "RRP Electronics has been recognized as the 'Most Trusted Semiconductor Brand 2025' by Manufacturing Today India for its innovative contributions to the industry.",
    imgBgClass: "object-center",
  },
];

const NewsEvents = () => {
  return (
    <section className="w-full h-fit px-3.5 md:px-5 lg:px-10">
      <h3 className="pt-25 md:pt-32 lg:pt-35 pb-10 text-display text-black tracking-display leading-[110%]">
        News & Events
      </h3>
      <ul className="w-full h-fit flex flex-wrap justify-between items-center gap-y-7.5 md:gap-y-10 gap-4 py-10 md:py-15">
        {news_data.map((news, id) => (
          <NewsEventsCard
            key={id}
            imgBgclass={news.imgBgClass}
            newsEventImg={news.newsEventImg}
            date={news.date}
            source={news.source}
            title={news.title}
            link={news.link}
          />
        ))}
      </ul>
    </section>
  );
};

export default NewsEvents;
