"use client";
import React, { useState, Suspense } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { fetchNews } from "@/utils/newsFetch";
import NewsEventsCard from "@/components/NewsEventsCard";
import NewsEventsCardSuspense from "@/components/suspense/NewsEventsCardSuspense";

const DataGrid = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    const loadData = async () => {
      try {
        setError(null);
        const result = await fetchNews(4);
        setData(result);
      } catch (err) {
        setError("Failed to load data");
        console.error(err);
      }
    };

    loadData();
  }, []);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!data) {
    return (
      <ul className="w-full h-fit grid justify-center items-stretch grid-cols-4 gap-y-7.5 gap-x-3 md:gap-x-5 px-3.5 md:px-5 lg:px-10">
        {[1, 2, 3, 4].map((i) => (
          <li key={i} className="col-span-4 md:col-span-2">
            <NewsEventsCardSuspense />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="w-full h-fit grid justify-center items-stretch grid-cols-4 gap-y-7.5 gap-x-3 md:gap-x-5 px-3.5 md:px-5 lg:px-10">
      {data.map((item, id) => {
        const imgSrc = item.newsEventImg;
        if (!imgSrc) return null;
        return (
          <li key={item.id} className="col-span-4 md:col-span-2">
            <NewsEventsCard
              newsEventImg={imgSrc}
              title={item.title}
              date={item.date}
              source={item.source}
              link={item.link}
              imgBgClass={item.imgBgClass}
              target="_blank"
              id={item.id} // Pass ID for consistency
            />
          </li>
        );
      })}
    </ul>
  );
};

const News = () => {
  const pathname = usePathname();

  return (
    <section className="h-fit w-full py-10 md:py-15 bg-white">
      <div className="grid grid-cols-4 gap-x-3 md:gap-x-5 px-3.5 md:px-5 lg:px-10 mb-8 md:mb-10 items-end">
        <h3 className="col-span-3 text-heading2 tracking-heading2 leading-[110%] max-w-[590px]">
          What's New at <br /> RRP Electronics
        </h3>
        <div className="col-span-1 flex items-center justify-center w-fit ml-auto mr-0">
          <Link
            href="/news"
            className="px-3 py-2 w-fit flex items-center justify-center rounded-full text-bodySmall leading-[120%] font-neueMontreal border-1 cursor-pointer transition-colors text-primary border-primary"
          >
            View all
          </Link>
        </div>
      </div>
      <Suspense fallback={<NewsEventsCardSuspense />}>
        <DataGrid />
      </Suspense>
    </section>
  );
};

export default News;
