"use client";
import React, { useState, Suspense } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

const LoadingSkeleton = ({ id }) => (
  <section
    id={id}
    className="@container w-full h-fit grid grid-cols-4 md:grid-cols-12 gap-x-3 md:gap-x-5 px-3.5 md:px-5 lg:px-10 py-10"
  >
    <ul className="col-span-4 md:col-span-12 grid grid-cols-4 w-full h-fit gap-y-7.5 md:gap-y-10 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <li key={i} className="col-span-4 lg:col-span-2">
          <div className="flex gap-4 items-stretch animate-pulse">
            <div className="aspect-square w-[150px] bg-gray-200 rounded-md" />
            <div className="ml-4 flex flex-col gap-3.5 md:gap-4.5 flex-1">
              <div className="h-4 bg-gray-200 rounded w-32" />
              <div className="h-5 bg-gray-200 rounded w-full" />
              <div className="h-5 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-20" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  </section>
);

const fetchNews = async () => {
  const response = await axios.get(
    "https://eloquent-art-0e51a537b4.strapiapp.com/api/news?populate=*"
  );
  const rawData = response.data.data;
  const sorted = rawData.sort(
    (a, b) => new Date(b.PublishDate) - new Date(a.PublishDate)
  );
  const limited = sorted.slice(0, 4);
  return limited.map((item) => ({
    id: item.id.toString(),
    newsEventImg: item.Thumbnail?.url
      ? item.Thumbnail.url
      : "/images/news-events/placeholder.webp",
    title: item.Title,
    date: new Date(item.PublishDate).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    }),
    source: item.Publisher,
    link: item.Link,
    imgBgClass: "object-cover",
  }));
};

const fetchEvents = async () => {
  const response = await axios.get(
    "https://eloquent-art-0e51a537b4.strapiapp.com/api/event?populate=*"
  ); // Assuming Strapi endpoint: /api/events
  return response.data.data.map((item) => ({
    id: item.id.toString(),
    newsEventBanner: item.Thumbnail?.url
      ? item.Thumbnail.url
      : "/images/news-events/placeholder.webp",
    title: item.Title,
    date: new Date(item.Date).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    }),
    source: null, // Events may not have a publisher
    imgBgClass: "object-cover",
  }));
};

const DataGrid = ({ activeTab }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    const loadData = async () => {
      try {
        setError(null);
        const fetchFn = activeTab === "events" ? fetchEvents : fetchNews;
        const result = await fetchFn();
        setData(result);
      } catch (err) {
        setError("Failed to load data");
        console.error(err);
      }
    };

    loadData();
  }, [activeTab]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!data) {
    return <LoadingSkeleton id="news-loading" />; // Reuse skeleton for both tabs
  }

  return (
    <ul className="w-full h-fit grid justify-center items-stretch grid-cols-4 gap-y-7.5 gap-x-3 md:gap-x-5 px-3.5 md:px-5 lg:px-10">
      {data.map((item, id) => {
        const imgSrc =
          activeTab === "events" ? item.newsEventBanner : item.newsEventImg;
        if (!imgSrc) return null; // Skip rendering if no image
        return (
          <Link
            href={
              activeTab === "events"
                ? `/news-events/${item.id}`
                : `${item.link}`
            }
            target={activeTab === "events" ? `` : `_blank`}
            key={id}
            className="col-span-4 md:col-span-2 flex gap-4 cursor-pointer"
          >
            <div className="aspect-square w-[150px] relative overflow-hidden rounded-md">
              <Image
                src={imgSrc}
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
              <p className="w-fit text-sm text-primary font-neueMontreal leading-[120%] underline decoration-solid decoration-primary">
                Read More
              </p>
            </div>
          </Link>
        );
      })}
    </ul>
  );
};

const News = () => {
  const [activeTab, setActiveTab] = useState("news"); // 'events' or 'news'
  const pathname = usePathname();

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
            href={`${
              activeTab === "events"
                ? "/news-events/#events"
                : "/news-events/#news"
            }`}
            className={`px-3 py-2 w-fit flex items-center justify-center rounded-full text-bodySmall leading-[120%] font-neueMontreal border-1 cursor-pointer transition-colors text-primary border-primary`}
          >
            View all
          </Link>
        </div>
      </div>
      <Suspense fallback={<LoadingSkeleton id="news-fallback" />}>
        <DataGrid activeTab={activeTab} />
      </Suspense>
    </section>
  );
};

export default News;
