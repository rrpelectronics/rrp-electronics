"use client";
import React, { useState, useEffect } from "react";
import { fetchNews } from "@/utils/newsFetch";
import NewsEventsCard from "@/components/NewsEventsCard";
import NewsEventsCardSuspense from "@/components/suspense/NewsEventsCardSuspense";

// Main News Component
const News = ({ id }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const newsData = await fetchNews(); // Fetch all news
        setNews(newsData);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsData();
  }, []);

  // Loading Skeleton
  if (loading) {
    return (
      <section
        id={id}
        className="@container w-full h-fit grid grid-cols-4 md:grid-cols-12 gap-x-3 md:gap-x-5 px-3.5 md:px-5 lg:px-10 py-10"
      >
        <h3 className="text-wrap text-heading1 text-black tracking-heading1 leading-[90%] col-span-4 md:col-span-12 @6xl:col-span-3 mb-10">
          News
        </h3>
        <ul className="col-span-4 md:col-span-12 @6xl:col-span-9 grid grid-cols-4 w-full h-fit gap-y-7.5 md:gap-y-10 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <li key={i} className="col-span-4 lg:col-span-2">
              <NewsEventsCardSuspense />
            </li>
          ))}
        </ul>
      </section>
    );
  }

  // Error State
  if (error) {
    return (
      <section
        id={id}
        className="@container w-full h-fit grid grid-cols-4 md:grid-cols-12 gap-x-3 md:gap-x-5 px-3.5 md:px-5 lg:px-10 py-10"
      >
        <h3 className="text-wrap text-heading1 text-black tracking-heading1 leading-[90%] col-span-4 md:col-span-12 @6xl:col-span-3 mb-10">
          News
        </h3>
        <div className="col-span-4 md:col-span-12 @6xl:col-span-9">
          <p className="text-primary">
            Failed to load news. Please try again later.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id={id}
      className="@container w-full h-fit grid grid-cols-4 md:grid-cols-12 gap-x-3 md:gap-x-5 px-3.5 md:px-5 lg:px-10 py-10"
    >
      <h3 className="text-wrap text-heading1 text-black tracking-heading1 leading-[90%] col-span-4 md:col-span-12 @6xl:col-span-3 mb-10">
        News
      </h3>
      <ul className="col-span-4 md:col-span-12 @6xl:col-span-9 grid grid-cols-4 w-full h-fit gap-y-7.5 md:gap-y-10 gap-4">
        {news.map((newsItem) => {
          // Skip news without thumbnail or with empty thumbnail
          if (!newsItem.newsEventImg || newsItem.newsEventImg.trim() === "")
            return null;

          return (
            <li key={newsItem.id} className="col-span-4 lg:col-span-2">
              <NewsEventsCard
                imgBgClass="center"
                newsEventImg={newsItem.newsEventImg}
                date={newsItem.date}
                source={newsItem.source}
                title={newsItem.title}
                link={newsItem.link}
                target="_blank"
                id={newsItem.id} // Pass ID for consistency
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default News;
