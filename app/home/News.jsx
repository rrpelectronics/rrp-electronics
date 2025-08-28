"use client";
import React, { useState } from "react";
import GridEventCards from "@/app/components/GridEventCards";
import Link from "next/link";

const news_data = [
  {
    id: "1",
    newsEventImg: "/images/news-events/deca-rrp.webp",
    title:
      "DECA Technology: Strategic Boost to India & Semiconductor Packaging Industry",
    date: "February 26, 2025",
    source: "The Hindu",
    link: "https://www.thehindu.com/business/rrp-electronics-signs-mou-with-deca-technologies-to-acquire-wafer-level-chip-packaging-capability/article69266687.ece",
    imgBgClass: "object-top",
  },
  {
    id: "2",
    newsEventImg: "/images/news-events/first-semiconductor-plant.webp",
    title:
      "RRP Electronics to set up first semiconductor plant in Maharashtra",
    date: "July 10",
    source: "The Hindu Business Line",
    link: "https://www.thehindubusinessline.com/info-tech/rrp-electronics-to-set-up-first-semiconductor-plant-in-maharashtra/article67961569.ece",
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
        <h3 className="col-span-3 md:col-span-2 text-heading2 tracking-heading2 leading-[110%] max-w-[590px]">
          What's New at <br /> RRP Electronics
        </h3>
        <div className="col-span-1 flex items-center justify-center w-fit md:ml-auto gap-4.5 lg:gap-6">
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
