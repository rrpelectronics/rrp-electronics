"use client";
import React from "react";
import NewsEventsCard from "@/app/components/NewsEventsCard";

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
    newsEventImg: "/images/news-events/horngcom.webp",
    title:
      "HorngCom Technology Partners with RRP Electronics to Expand Semiconductor OSAT Capabilities in India",
    date: "May 20, 2025",
    source: "The Hindu Business Line",
    link: "https://www.thehindubusinessline.com/info-tech/horngcom-tech-rrp-electronics-sign-pact-target-12-m-revenue-in-fy26/article69597072.ece",
    imgBgClass: "object-center",
  },
  {
    id: "3",
    newsEventImg: "/images/news-events/first-semiconductor-plant.webp",
    title:
      "RRP Electronics to set up first semiconductor plant in Maharashtra’",
    date: "July 10",
    source: "The Hindu Business Line",
    link: "https://www.thehindubusinessline.com/info-tech/rrp-electronics-to-set-up-first-semiconductor-plant-in-maharashtra/article67961569.ece",
    imgBgClass: "object-center",
  },
  {
    id: "4",
    newsEventImg: "/images/news-events/macronix.webp",
    title:
      "RRP Electronics recently visited Macronix International Co., Ltd., a global leader in Non-Volatile Memory (NVM) technology.",
    date: "Januray 2025",
    link: "https://www.linkedin.com/posts/rrp-electronics_rrpelectronics-osat-atmp-activity-7276855109978902529-klp6?utm_source=share&amp;utm_medium=member_ios",
    imgBgClass: "object-center",
  },
  {
    id: "5",
    newsEventImg: "/images/news-events/palm.webp",
    title:
      "RRP Electronics signed an MoU with Palm Tech to develop advanced displays, including TFT LCDs, OLEDs, and touch panels.",
    date: "Januray 2025",
    link: "https://www.linkedin.com/posts/rrp-electronics_rrpelectronics-osat-atmp-activity-7275396975103987714-SRwG?utm_source=share&amp;utm_medium=member_ios",
    imgBgClass: "object-center",
  },
  {
    id: "6",
    newsEventImg: "/images/news-events/amb.webp",
    title:
      " RRP Electronics signed a groundbreaking MoU with AMB Taiwan to collaborate on memory module production.",
    date: "Januray 2025",
    link: "https://www.linkedin.com/posts/rrp-electronics_rrpelectronics-osat-atmp-activity-7274309804196585472-DrtI?utm_source=share&amp;utm_medium=member_ios",
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
