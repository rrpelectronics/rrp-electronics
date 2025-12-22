"use client";
import React, { useState, Suspense } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { fetchEvents } from "@/app/utils/eventFetch";
import NewsEventsCard from "@/app/components/NewsEventsCard";
import NewsEventsCardSuspense from "@/app/components/suspense/NewsEventsCardSuspense";

const DataGrid = ({ activeTab, hasUpcoming }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    const loadData = async () => {
      try {
        setError(null);
        const result = await fetchEvents(100, "all");

        if (!hasUpcoming) {
          setData(result.slice(0, 3));
          return;
        }

        const now = new Date();
        const filteredData = result.filter((event) => {
          const eventDate = new Date(event.date);
          if (activeTab === "upcoming") {
            return eventDate >= now;
          } else {
            return eventDate < now;
          }
        });

        setData(filteredData.slice(0, 3));
      } catch (err) {
        setError("Failed to load data");
        console.error(err);
      }
    };

    loadData();
  }, [activeTab, hasUpcoming]);

  if (error) {
    return (
      <div className="text-textSecondary px-3.5 md:px-5 lg:px-10 text-heading4 flex justify-center items-center h-[75vh] lg:h-[50vh]">
        Data not available
      </div>
    );
  }

  if (!data) {
    return (
      <ul className="w-full h-fit grid justify-center items-stretch grid-cols-4 sm:grid-cols-12 gap-y-7.5 gap-x-3 md:gap-x-5 px-3.5 md:px-5 lg:px-10">
        {[1, 2, 3, 4].map((i) => (
          <li key={i} className="col-span-4 sm:col-span-6 md:col-span-4">
            <NewsEventsCardSuspense variant="event" />
          </li>
        ))}
      </ul>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-textSecondary px-3.5 md:px-5 lg:px-10 text-heading4 flex justify-center items-center h-[75vh] lg:h-[50vh]">
        Data not available
      </div>
    );
  }

  return (
    <ul className="w-full h-fit grid justify-center items-stretch grid-cols-4 sm:grid-cols-12 gap-y-7.5 gap-x-3 md:gap-x-5 px-3.5 md:px-5 lg:px-10">
      {data.map((item) => {
        const imgSrc = item.newsEventImg;
        if (!imgSrc) return null;
        return (
          <li key={item.id} className="col-span-4 sm:col-span-6 md:col-span-4">
            <NewsEventsCard
              newsEventImg={imgSrc}
              title={item.title}
              date={item.date}
              source={item.source}
              link={`/events/${item.id}`}
              imgBgClass={item.imgBgClass}
              target=""
              variant="event"
              id={item.id}
              eventType={item.eventType}
            />
          </li>
        );
      })}
    </ul>
  );
};

const Events = () => {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [hasUpcoming, setHasUpcoming] = useState(false);

  React.useEffect(() => {
    const checkUpcoming = async () => {
      try {
        const allEvents = await fetchEvents(100, "all");
        const now = new Date();
        
        const upcomingExists = allEvents.some((event) => {
          const eventDate = new Date(event.date);
          return eventDate >= now;
        });

        setHasUpcoming(upcomingExists);
      } catch (err) {
        setHasUpcoming(false);
      }
    };

    checkUpcoming();
  }, []);

  return (
    <section className="h-fit w-full py-10 md:py-15 bg-white">
      <div className="grid grid-cols-4 gap-x-3 md:gap-x-5 px-3.5 md:px-5 lg:px-10 mb-8 md:mb-10 items-end">
        <h3
          className={`col-span-2 text-heading2 tracking-heading2 leading-[110%] max-w-[590px] ${
            hasUpcoming && "mb-7"
          }`}
        >
          Our Events & <br /> Happenings
        </h3>
        {/* Tabs Area */}
        {hasUpcoming && (
          <div className="md:col-start-1 col-span-3 md:col-span-2 flex items-center justify-center w-fit gap-2.5 sm:gap-4 lg:gap-6">
            {/* PAST TAB */}
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-3 py-2 w-fit flex items-center justify-center rounded-full text-sm sm:text-bodySmall leading-[120%] font-neueMontreal border-1 cursor-pointer transition-colors ${
                activeTab === "upcoming"
                  ? "text-white bg-primary border-primary"
                  : "text-textPrimary border-textPrimary hover:text-primary hover:border-primary"
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`px-3 py-2 w-fit flex items-center justify-center rounded-full text-sm sm:text-bodySmall leading-[120%] font-neueMontreal border-1 cursor-pointer transition-colors ${
                activeTab === "past"
                  ? "text-white bg-primary border-primary"
                  : "text-textPrimary border-textPrimary hover:text-primary hover:border-primary"
              }`}
            >
              Past Events
            </button>
          </div>
        )}
        <div className="col-start-4 col-span-1 md:col-start-3 md:col-span-2 flex items-center justify-center w-fit ml-auto mr-0 gap-4.5 lg:gap-6">
          <Link
            href={"/events"}
            className={`px-3 py-2 w-fit flex items-center justify-center rounded-full text-sm sm:text-bodySmall leading-[120%] font-neueMontreal border-1 cursor-pointer transition-colors text-primary border-primary`}
          >
            View all
          </Link>
        </div>
      </div>

      <Suspense fallback={<NewsEventsCardSuspense variant="event" />}>
        <DataGrid activeTab={activeTab} hasUpcoming={hasUpcoming} />
      </Suspense>
    </section>
  );
};

export default Events;