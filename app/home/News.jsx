"use client";
import React, { useState } from "react";
import GridEventCards from "@/app/components/GridEventCards";
import Link from "next/link";
import Image from "next/image";
import events_data from "@/app/news-events/events_data";

const news_data = [
  {
    id: "1",
    newsEventImg: "/images/news-events/mou.webp",
    title: "RRP Electronics signs 4 MoU to strengthen operations",
    date: "September 2025",
    source: "The Hindu",
    link: "https://www.thehindu.com/business/rrp-electronics-signs-4-mou-to-strengthen-operations/article70020011.ece",
    imgBgClass: "object-center",
  },
  {
    id: "2",
    newsEventImg: "/images/news-events/land-allotment.webp",
    title: "Maharashtra allots 100 acres to chip firm RRP Electronics",
    date: "September 2025",
    source: "The Hindu",
    link: "https://www.thehindu.com/business/maharashtra-allots-100-acres-to-chip-firm-rrp-electronics/article70043223.ece",
    imgBgClass: "object-left",
  },
  {
    id: "3",
    newsEventImg: "/images/news-events/horngcom.webp",
    title:
      "HorngCom Technology Partners with RRP Electronics to Expand Semiconductor OSAT Capabilities in India",
    date: "May 2025",
    source: "The Hindu Business Line",
    link: "https://www.thehindubusinessline.com/info-tech/horngcom-tech-rrp-electronics-sign-pact-target-12-m-revenue-in-fy26/article69597072.ece",
    imgBgClass: "object-center",
  },
  {
    id: "4",
    newsEventImg: "/images/news-events/deca-rrp.webp",
    title:
      "DECA Technology: Strategic Boost to India & Semiconductor Packaging Industry",
    date: "February 2025",
    source: "The Hindu",
    link: "https://www.thehindu.com/business/rrp-electronics-signs-mou-with-deca-technologies-to-acquire-wafer-level-chip-packaging-capability/article69266687.ece",
    imgBgClass: "object-top",
  },
];

const News = () => {
  const [activeTab, setActiveTab] = useState("news"); // 'events' or 'news'

  const getCurrentData = () => {
    return activeTab === "events" ? events_data : news_data;
  };

  return (
    <section className="h-fit w-full py-10 md:py-15 bg-white">
      <div className="grid grid-cols-4 gap-x-3 md:gap-x-5 px-3.5 md:px-5 lg:px-10 mb-8 md:mb-10 items-end">
        <h3 className="col-span-3 text-heading2 tracking-heading2 leading-[110%] max-w-[590px] mb-7">
          What's New at <br /> RRP Electronics
        </h3>
        <div className="col-span-2 flex items-center justify-center w-fit gap-4 lg:gap-6">
          <button
            onClick={() => setActiveTab("news")}
            className={`px-3 py-2 w-fit flex items-center justify-center rounded-full text-bodySmall leading-[120%] font-neueMontreal border-1 cursor-pointer transition-colors ${
              activeTab === "news"
                ? "text-white bg-primary border-primary"
                : "text-textPrimary border-textPrimary hover:text-primary hover:border-primary"
            }`}
          >
            News
          </button>
          <button
            onClick={() => setActiveTab("events")}
            className={`px-3 py-2 w-fit flex items-center justify-center rounded-full text-bodySmall leading-[120%] font-neueMontreal border-1 cursor-pointer transition-colors ${
              activeTab === "events"
                ? "text-white bg-primary border-primary"
                : "text-textPrimary border-textPrimary hover:text-primary hover:border-primary"
            }`}
          >
            Events
          </button>
        </div>
        <div className="col-span-2 flex items-center justify-center w-fit ml-auto mr-0 gap-4.5 lg:gap-6">
          <Link
            href={"/news-events"}
            className={`px-3 py-2 w-fit flex items-center justify-center rounded-full text-bodySmall leading-[120%] font-neueMontreal border-1 cursor-pointer transition-colors text-primary border-primary`}
          >
            View all
          </Link>
        </div>
      </div>
      <ul className="w-full h-fit grid justify-center items-stretch grid-cols-4 gap-y-7.5 gap-x-3 md:gap-x-5 px-3.5 md:px-5 lg:px-10">
        {getCurrentData().map((item, id) => (
          <div key={id} className="col-span-4 md:col-span-2 flex gap-4">
            <div className="aspect-square w-[150px] relative overflow-hidden rounded-md">
              <Image
                src={
                  activeTab === "events"
                    ? item.newsEventBanner
                    : item.newsEventImg
                }
                alt={item.title}
                fill
                sizes="100vw"
                className={`object-cover object-${item.imgBgClass}`}
              />
            </div>
            <div className="flex flex-col gap-3.5 md:gap-4.5 flex-1">
              <p className="text-textPrimary text-caption lg:text-bodySmallest leading-[120%] font-neueMontreal">
                {item.date} {item.source && `| ${item.source}`}
              </p>
              <p className="text-bodyLarge text-black leading-[120%] mb-2.5 line-clamp-2 text-ellipsis">
                {item.title}
              </p>
              <Link
                href={activeTab === "events" ? `/news-events/${item.id}` : item.link}
                className="w-fit text-sm text-primary font-neueMontreal leading-[120%] underline decoration-solid decoration-primary"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </ul>
    </section>
  );
};

export default News;
