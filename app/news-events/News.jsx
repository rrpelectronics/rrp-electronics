"use client";
import React from "react";
import GridEventCards from "@/app/components/GridEventCards";
import news_data from "./news_data";

const News = ({ id }) => {
  return (
    <section id={id} className="@container w-full h-fit grid grid-cols-4 md:grid-cols-12 gap-x-3 md:gap-x-5 px-3.5 md:px-5 lg:px-10 py-10">
      <h3 className="text-wrap text-display text-black tracking-display leading-[90%] col-span-4 md:col-span-12 @6xl:col-span-3 mb-10">
        News
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

export default News;
