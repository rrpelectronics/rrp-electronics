"use client";
import React, { useState, useEffect } from "react";
import GridEventCards from "@/app/components/GridEventCards";

// Main News Component
const News = ({ id }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(
          "https://eloquent-art-0e51a537b4.strapiapp.com/api/news?populate=*"
        );

        if (!res.ok) {
          throw new Error("Failed to fetch news");
        }

        const data = await res.json();
        // Sort by date (newest first)
        const sortedNews = data.data.sort(
          (a, b) =>
            new Date(b.PublishDate || b.Date) -
            new Date(a.PublishDate || a.Date)
        );
        setNews(sortedNews);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
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
          <p className="text-red-600">
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
          const thumbnail =
            newsItem.Thumbnail?.formats?.medium?.url ||
            newsItem.Thumbnail?.url ||
            newsItem.thumbnail?.formats?.medium?.url ||
            newsItem.thumbnail?.url;

          // Parse date more robustly
          let date = "Date not available";
          const dateValue =
            newsItem.PublishDate ||
            newsItem.Date ||
            newsItem.date ||
            newsItem.publishDate;
          if (dateValue) {
            const dateObj = new Date(dateValue);
            if (!isNaN(dateObj.getTime())) {
              date = dateObj.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              });
            }
          }

          // Skip news without thumbnail or with empty thumbnail
          if (!thumbnail || thumbnail.trim() === "") return null;

          return (
            <GridEventCards
              key={newsItem.id}
              imgBgclass="center"
              newsEventImg={thumbnail}
              date={date}
              source={newsItem.Source || newsItem.source || ""}
              title={newsItem.Title || newsItem.title || "No title"}
              link={newsItem.Link || newsItem.link || "#"}
              target="_blank"
            />
          );
        })}
      </ul>
    </section>
  );
};

export default News;
