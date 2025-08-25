"use client";
import React from 'react';
import NewsEventsCard from '@/app/components/NewsEventsCard';

const news_data = [
  {
    id: "1",
    newsEventImg: "/images/news-events/news-1.webp",
    title:
      "Tendulkar-backed RRP Electronics unveils semiconductor facility in Maharashtra",
    date: "March 28",
    source: "India Business Journal",
    link: "/news-events/1",
    description:
      "RRP Electronics, backed by Sachin Tendulkar, has unveiled a state-of-the-art semiconductor facility in Maharashtra, marking a significant step in India's semiconductor industry growth.",
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
  {
    id: "4",
    newsEventImg: "/images/news-events/news-3.webp",
    title: "RRP Electronics named ‘Most Trusted Semiconductor Brand 2025’",
    date: "July 10",
    source: "Manufacturing Today India",
    link: "/news-events/4",
    description:
    "RRP Electronics earns the prestigious title of 'Most Trusted Semiconductor Brand 2025' for its reliable and cutting-edge semiconductor solutions.",
    imgBgClass: "object-center",
  },
  {
    id: "5",
    newsEventImg: "/images/news-events/news-1.webp",
    title:
    "Tendulkar-backed RRP Electronics unveils semiconductor facility in Maharashtra",
    date: "March 28",
    source: "India Business Journal",
    link: "/news-events/5",
    description:
    "RRP Electronics, with support from Sachin Tendulkar, opens a new semiconductor facility in Maharashtra, strengthening India's position in global tech.",
    imgBgClass: "object-center",
  },
  {
    id: "6",
    newsEventImg: "/images/news-events/news-2.webp",
    title:
    "RRP Electronics Ltd Launched Maharashtra’s First OSAT Semiconductor Manufacturing Facility.",
    date: "September 19",
    source: "The Print",
    link: "/news-events/6",
    description:
    "The launch of RRP Electronics' OSAT facility in Maharashtra marks a milestone in India's journey towards self-reliance in semiconductor manufacturing.",
    imgBgClass: "object-center",
  },
];

const NewsEvents = () => {

  return (
    <section className="w-full h-fit px-3.5 md:px-5 lg:px-10">
      <h3 className="pt-25 md:pt-32 lg:pt-35 pb-10 text-display text-black tracking-display leading-[105%]">
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
}

export default NewsEvents