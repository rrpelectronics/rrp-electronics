"use client";
import React, { useState, useEffect } from "react";
import { fetchEvents } from "@/app/utils/eventFetch";
import NewsEventsCard from "@/app/components/NewsEventsCard";
import NewsEventsCardSuspense from "@/app/components/suspense/NewsEventsCardSuspense";

// Main Events Component
const Events = ({ id }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [showTabs, setShowTabs] = useState(true);

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all events first to determine tabs
        const allEvents = await fetchEvents();

        // Filter for upcoming events (handle both API and hardcoded data)
        const upcomingEvents = allEvents.filter((event) => {
          // Use the eventType field which is set correctly in fetchEvents
          return (
            event.eventType && event.eventType.toLowerCase() === "upcoming"
          );
        });

        // Hide tabs when there are no upcoming events
        setShowTabs(upcomingEvents.length > 0);

        // Determine what to fetch based on activeTab
        let eventType = null;
        if (activeTab === "past") {
          eventType = "past";
        } else if (activeTab === "upcoming") {
          eventType = "upcoming";
        }
        // For "all" tab, eventType remains null to fetch all events

        const eventData = await fetchEvents(null, eventType);
        setEvents(eventData);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEventsData();
  }, [activeTab]);

  const renderTabs = () => {
    // Hide all tabs when there are no upcoming events
    if (!showTabs) {
      return null;
    }

    return (
      <div className="col-span-4 md:col-span-12 flex items-center justify-start flex-wrap w-fit gap-2.5 sm:gap-4 lg:gap-6 mb-7 md:mb-10">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-3 py-2 w-fit flex items-center justify-center rounded-full text-sm sm:text-bodySmall leading-[120%] font-neueMontreal border-1 cursor-pointer transition-colors ${
            activeTab === "all"
              ? "text-white bg-primary border-primary"
              : "text-textPrimary border-textPrimary hover:text-primary hover:border-primary"
          }`}
        >
          All Events
        </button>
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
    );
  };

  // Render content based on state
  let content;
  if (loading) {
    content = (
      <>
        {showTabs && renderTabs()}
        <ul className="col-span-4 md:col-span-12 grid grid-cols-4 sm:grid-cols-12 w-full h-fit gap-y-7.5 md:gap-y-10 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <li key={i} className="col-span-4 sm:col-span-6 md:col-span-4">
              <NewsEventsCardSuspense variant="event" />
            </li>
          ))}
        </ul>
      </>
    );
  } else if (error) {
    content = (
      <>
        {showTabs && renderTabs()}
        <div className="col-span-4 md:col-span-12">
          <div className="text-textSecondary px-3.5 md:px-5 lg:px-10 text-heading4 flex justify-center items-center h-[75vh] lg:h-[50vh]">
            Data not available
          </div>
        </div>
      </>
    );
  } else if (events.length === 0) {
    content = (
      <>
        {showTabs && renderTabs()}
        <div className="col-span-4 md:col-span-12">
          <div className="text-textSecondary px-3.5 md:px-5 lg:px-10 text-heading4 flex justify-center items-center h-[75vh] lg:h-[50vh]">
            No events found
          </div>
        </div>
      </>
    );
  } else {
    content = (
      <>
        {showTabs && renderTabs()}
        <ul className="col-span-4 sm:col-span-12 grid grid-cols-4 sm:grid-cols-12 w-full h-fit gap-y-7.5 md:gap-y-10 gap-4">
          {events.map((event) => {
            return (
              <li
                key={event.id}
                className="col-span-4 sm:col-span-6 md:col-span-4"
              >
                <NewsEventsCard
                  newsEventImg={event.newsEventImg}
                  title={event.title}
                  date={event.date}
                  source={event.source}
                  link={event.link || `/events/${event.id}`}
                  imgBgClass={event.imgBgClass}
                  variant="event"
                  target=""
                  id={event.id}
                  eventType={event.eventType || "past"} // Default to "past" for hardcoded data
                />
              </li>
            );
          })}
        </ul>
      </>
    );
  }

  return (
    <section
      id={id}
      className="@container w-full h-fit grid grid-cols-4 md:grid-cols-12 gap-x-3 md:gap-x-5 px-3.5 md:px-5 lg:px-10 py-10 overflow-x-hidden mt-20 lg:mt-30"
    >
      <h3 className="text-wrap text-heading1 text-black tracking-heading1 leading-[90%] col-span-4 md:col-span-12 mb-7 md:mb-10">
        Events
      </h3>
      {content}
    </section>
  );
};

export default Events;
