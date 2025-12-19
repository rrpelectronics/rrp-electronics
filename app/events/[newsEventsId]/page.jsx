"use client";
import React, { useState, useEffect } from "react";
import { findEventBySlug } from "@/app/utils/slugUtils";
import { fetchEventById } from "@/app/utils/eventFetch";
import Image from "next/image";
import RichTextParser from "@/app/components/RichTextParser";

// Helper function to determine if an event is in the future or past
const isFutureEvent = (eventDate) => {
  const currentDate = new Date();
  const eventDateObj = new Date(eventDate);
  return eventDateObj > currentDate;
};

const EventDetailPage = ({ params }) => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null);

  const resolvedParams = React.use(params);
  const eventSlug = resolvedParams.newsEventsId;

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        // First try to find by slug
        const res = await fetch(
          "https://eloquent-art-0e51a537b4.strapiapp.com/api/events?populate=*"
        );

        if (!res.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await res.json();
        const foundEvent = findEventBySlug(data.data, eventSlug);

        if (!foundEvent) {
          setError("Event not found");
        } else {
          setEvent(foundEvent);
        }
      } catch (err) {
        setError("Failed to load event");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (eventSlug) {
      fetchEvent();
    }
  }, [eventSlug]);

  if (loading) {
    return (
      <main className="h-fit w-full py-10 px-3.5 md:px-5 lg:px-10 grid grid-cols-4 gap-x-3 md:gap-x-5">
        <div className="col-span-4 lg:col-start-2 lg:col-span-2 animate-pulse">
          <div className="h-12 bg-gray-200 rounded mb-6" />
          <div className="h-6 bg-gray-200 rounded w-32 mb-8" />
          <div className="h-[400px] bg-gray-200 rounded mb-8" />
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !event) {
    return (
      <main className="h-fit w-full py-10 px-3.5 md:px-5 lg:px-10 grid grid-cols-4 gap-x-3 md:gap-x-5">
        <div className="col-span-4 lg:col-start-2 lg:col-span-2 text-center">
          <h1 className="text-4xl font-bold mb-4">
            {error || "Event not found"}
          </h1>
          <a href="/events" className="text-primary underline">
            Back to Events
          </a>
        </div>
      </main>
    );
  }

  const bannerImage =
    event.Banner?.formats?.large?.url || event.Banner?.url;
  const galleryImages =
    event.Gallery?.map((img) => img.formats?.large?.url || img.url) || [];
  const date = new Date(event.Date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  // Determine if this is an upcoming event based on date
  const isUpcomingEvent = isFutureEvent(event.Date);

  // Render banner image based on event type
  const renderBannerImage = () => {
    if (isUpcomingEvent) {
      // For upcoming events, use regular img tag with specified classes
      return (
        <img
          src={bannerImage}
          alt={event.Title}
          className="mx-auto h-full w-auto"
        />
      );
    } else {
      // For past events, use Next.js Image component
      return (
        <Image
          src={bannerImage}
          alt={event.Title}
          fill
          sizes="100vw"
          className="object-cover"
        />
      );
    }
  };

  return (
    <main className="h-fit w-full py-10 px-3.5 md:px-5 lg:px-10 grid grid-cols-4 gap-x-3 md:gap-x-5">
      <h1 className="col-span-4 lg:col-start-2 lg:col-span-2 text-[32px] md:text-[48px] lg:text-[56px] leading-[110%] mb-3 md:mb-5">
        {event.Title}
      </h1>
      <div className="col-span-4 lg:col-start-2 lg:col-span-2 flex items-center mb-6 md:mb-8">
        <p className="text-[16px] leading-[130%] text-[#646464]">{date}</p>
      </div>

      {bannerImage && (
        <div
          className={`col-span-4 relative overflow-hidden aspect-[1440/514] w-full mb-6 md:mb-8 ${
            isUpcomingEvent ? "bg-whiteBg" : ""
          }`}
        >
          {renderBannerImage()}
        </div>
      )}

      <div className="col-span-4 lg:col-start-2 lg:col-span-2 flex flex-col gap-y-6 text-[#646464]">
        {/* Using RichTextParser for event description */}
        <RichTextParser text={event.Description} />
      </div>

      {galleryImages.length > 0 && (
        <div className="col-span-4 lg:col-start-2 lg:col-span-2 mt-16 md:mt-20">
          <h2 className="text-[32px] md:text-[40px] mb-8 md:mb-10">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="aspect-square relative cursor-pointer overflow-hidden rounded-lg"
                onClick={() => setSelectedImage({ url: image, index })}
              >
                <Image
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="cursor-pointer absolute top-5 md:top-6 lg:top-10 right-4 md:right-5 lg:right-10 text-white text-2xl hover:text-gray-300 transition-colors z-10"
          >
            ✕
          </button>
          <div
            className="relative max-w-4xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[80vh]">
              <Image
                src={selectedImage.url}
                alt={`Gallery image ${selectedImage.index + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              const prevIndex =
                selectedImage.index > 0
                  ? selectedImage.index - 1
                  : galleryImages.length - 1;
              setSelectedImage({
                url: galleryImages[prevIndex],
                index: prevIndex,
              });
            }}
            className="absolute left-4 md:left-5 lg:left-10 top-1/2 flex cursor-pointer items-center justify-center rounded-full bg-[#2E2E30] text-white h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 md:h-5 md:w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M15 18 9 12l6-6 1.4 1.4L11.8 12l4.6 4.6L15 18Z" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              const nextIndex =
                selectedImage.index < galleryImages.length - 1
                  ? selectedImage.index + 1
                  : 0;
              setSelectedImage({
                url: galleryImages[nextIndex],
                index: nextIndex,
              });
            }}
            className="absolute right-4 md:right-5 lg:right-10 top-1/2 flex cursor-pointer items-center justify-center rounded-full bg-[#2E2E30] text-white h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 -scale-x-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 md:h-5 md:w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M15 18 9 12l6-6 1.4 1.4L11.8 12l4.6 4.6L15 18Z" />
            </svg>
          </button>
        </div>
      )}
    </main>
  );
};

export default EventDetailPage;
