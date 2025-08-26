"use client";
import React, { useState } from "react";
import GridEventCards from "@/app/components/GridEventCards";
import Link from "next/link";

const press_data = [
  {
    newsEventImg: "/images/news-events/press-1.webp",
    title:
      "RRP Electronics to establish first semiconductor plant in Maharashtra",
    date: "April 05",
    source: "India Today",
    link: "#",
    imgBgClass: "object-center",
  },
  {
    newsEventImg: "/images/news-events/press-2.webp",
    title:
      "RRP Electronics to establish first semiconductor plant in Maharashtra",
    date: "April 05",
    source: "India Today",
    link: "#",
    imgBgClass: "object-top",
  },
];

const news_data = [
  {
    newsEventImg: "/images/news-events/news-1.webp",
    title:
      "Tendulkar-backed RRP Electronics unveils semiconductor facility in Maharashtra",
    date: "March 28",
    source: "India Business Journal",
    link: "#",
    imgBgClass: "object-center",
  },
  {
    newsEventImg: "/images/news-events/news-2.webp",
    title:
      "RRP Electronics Ltd Launched Maharashtra's First OSAT Semiconductor Manufacturing Facility.",
    date: "September 19",
    source: "The Print",
    link: "#",
    imgBgClass: "object-center",
  },
];

const News = () => {
  const [activeTab, setActiveTab] = useState("news"); // 'press' or 'news'

  const getCurrentData = () => {
    return activeTab === "press" ? press_data : news_data;
  };

  return (
    <section className="h-fit w-full py-10 md:py-15 bg-white">
      <div className="grid grid-cols-4 gap-x-3 md:gap-x-5 px-3.5 md:px-5 lg:px-10 mb-8 md:mb-10 items-end">
        <h3 className="col-span-4 md:col-span-2 text-heading2 tracking-heading2 leading-[110%] max-w-[590px] mb-5 md:mb-0">
          What's New at <br /> RRP Electronics
        </h3>
        <div className="col-span-4 md:col-span-2 flex items-center justify-center w-fit md:ml-auto gap-4.5 lg:gap-6">
          <Link
            href={"/news-events"}
            className={`p-3 w-fit flex items-center justify-center rounded-full text-bodySmall leading-[120%] font-neueMontreal border-1 cursor-pointer transition-colors text-primary border-primary`}
          >
            View all
          </Link>
        </div>
      </div>
      <ul className="w-full h-fit grid justify-center items-stretch grid-cols-4 gap-y-7.5 gap-x-3 md:gap-x-5 px-3.5 md:px-5 lg:px-10">
        {getCurrentData().map((item, id) => (
          <GridEventCards
            key={id}
            newsEventImg={item.newsEventImg}
            imgBgClass={item.imgBgClass}
            title={item.title}
            date={item.date}
            source={item.source}
            link={item.link}
          />
        ))}
      </ul>
    </section>
  );
};

export default News;
