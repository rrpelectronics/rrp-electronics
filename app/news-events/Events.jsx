"use client";
import React, { useState, useEffect } from "react";
import GridEventCards from "@/app/components/GridEventCards";

// Main Events Component
const Events = ({ id }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(
          "https://eloquent-art-0e51a537b4.strapiapp.com/api/event?populate=*"
        );

        if (!res.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await res.json();
        // Sort by date (newest first)
        const sortedEvents = data.data.sort(
          (a, b) => new Date(b.Date) - new Date(a.Date)
        );
        setEvents(sortedEvents);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Loading Skeleton
  if (loading) {
    return (
      <section
        id={id}
        className="@container w-full h-fit grid grid-cols-4 md:grid-cols-12 gap-x-3 md:gap-x-5 px-3.5 md:px-5 lg:px-10 py-10 overflow-x-hidden"
      >
        <h3 className="text-wrap text-heading1 text-black tracking-heading1 leading-[90%] col-span-4 md:col-span-12 @6xl:col-span-3 mb-10">
          Events
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
        className="@container w-full h-fit grid grid-cols-4 md:grid-cols-12 gap-x-3 md:gap-x-5 px-3.5 md:px-5 lg:px-10 py-10 overflow-x-hidden"
      >
        <h3 className="text-wrap text-heading1 text-black tracking-heading1 leading-[90%] col-span-4 md:col-span-12 @6xl:col-span-3 mb-10">
          Events
        </h3>
        <div className="col-span-4 md:col-span-12 @6xl:col-span-9">
          <p className="text-red-600">
            Failed to load events. Please try again later.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id={id}
      className="@container w-full h-fit grid grid-cols-4 md:grid-cols-12 gap-x-3 md:gap-x-5 px-3.5 md:px-5 lg:px-10 py-10 overflow-x-hidden"
    >
      <h3 className="text-wrap text-heading1 text-black tracking-heading1 leading-[90%] col-span-4 md:col-span-12 @6xl:col-span-3 mb-10">
        Events
      </h3>
      <ul className="col-span-4 md:col-span-12 @6xl:col-span-9 grid grid-cols-4 w-full h-fit gap-y-7.5 md:gap-y-10 gap-4">
        {events.map((event) => {
          const thumbnail =
            event.Thumbnail?.formats?.medium?.url || event.Thumbnail?.url;
          const date = new Date(event.Date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
          });

          return (
            <GridEventCards
              key={event.id}
              imgBgclass="center"
              newsEventImg={thumbnail}
              date={date}
              title={event.Title}
              link={`/news-events/${event.id}`}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default Events;