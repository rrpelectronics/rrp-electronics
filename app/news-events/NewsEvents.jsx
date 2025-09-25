"use client";
import React from "react";
import GridEventCards from "@/app/components/GridEventCards";

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
  {
    id: "5",
    newsEventImg: "/images/news-events/macronix.webp",
    title:
      "RRP Electronics visited Macronix International, a global leader in Non-Volatile Memory (NVM) technology.",
    date: "January 2025",
    link: "https://www.linkedin.com/posts/rrp-electronics_rrpelectronics-osat-atmp-activity-7276855109978902529-klp6?utm_source=share&amp;utm_medium=member_ios",
    imgBgClass: "object-center",
  },
  {
    id: "6",
    newsEventImg: "/images/news-events/palm.webp",
    title:
      "RRP Electronics signed an MoU with Palm Tech to develop advanced displays, including TFT LCDs, OLEDs, and touch panels.",
    date: "January 2025",
    link: "https://www.linkedin.com/posts/rrp-electronics_rrpelectronics-osat-atmp-activity-7275396975103987714-SRwG?utm_source=share&amp;utm_medium=member_ios",
    imgBgClass: "object-center",
  },
  {
    id: "7",
    newsEventImg: "/images/news-events/amb.webp",
    title:
      " RRP Electronics signed a groundbreaking MoU with AMB Taiwan to collaborate on memory module production.",
    date: "January 2025",
    link: "https://www.linkedin.com/posts/rrp-electronics_rrpelectronics-osat-atmp-activity-7274309804196585472-DrtI?utm_source=share&amp;utm_medium=member_ios",
    imgBgClass: "object-center",
  },
  {
    id: "8",
    newsEventImg: "/images/news-events/first-semiconductor-plant.webp",
    title: "RRP Electronics to set up first semiconductor plant in Maharashtra",
    date: "July 2024",
    source: "The Hindu Business Line",
    link: "https://www.thehindubusinessline.com/info-tech/rrp-electronics-to-set-up-first-semiconductor-plant-in-maharashtra/article67961569.ece",
    imgBgClass: "object-center",
  },
];

const NewsEvents = () => {
  return (
    <section className="@container w-full h-fit grid grid-cols-4 md:grid-cols-12 gap-x-3 md:gap-x-5 px-3.5 md:px-5 lg:px-10 py-10">
      <h3 className="text-wrap text-display text-black tracking-display leading-[90%] col-span-4 md:col-span-12 @6xl:col-span-3 mb-10">
        News & Events
      </h3>
      <ul className="col-span-4 md:col-span-12 @6xl:col-span-9 grid grid-cols-4 w-full h-fit gap-y-7.5 md:gap-y-10 gap-4">
        {news_data.map((news, id) => (
          <GridEventCards
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
