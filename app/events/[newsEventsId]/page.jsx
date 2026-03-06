"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import events_data from "@/app/utils/eventsData";
import RichTextParser from "@/app/components/RichTextParser";
import UseScreenSizeSmall from "@/app/hooks/UseScreenSizeSmall";

const isFutureEvent = (eventDate) => {
  if (!eventDate) return false;

  const currentDate = new Date();

  // Handle Date objects first (from updated eventsData.js)
  if (eventDate instanceof Date) {
    return eventDate > currentDate;
  }

  // Handle string dates from hardcoded data (like "January 2026")
  if (typeof eventDate === "string") {
    // Try to parse the date string
    const eventDateObj = new Date(eventDate);

    // If parsing failed, try to create a date from month/year format
    if (isNaN(eventDateObj.getTime())) {
      const parts = eventDate.split(" ");
      if (parts.length === 2) {
        const [month, year] = parts;
        const monthIndex = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ].indexOf(month);

        if (monthIndex !== -1) {
          const constructedDate = new Date(parseInt(year), monthIndex, 1);
          return constructedDate > currentDate;
        }
      }
      return false; // If we can't parse the string, it's not a future event
    } else {
      return eventDateObj > currentDate;
    }
  }

  // Handle Date objects or timestamps from API
  const eventDateObj = new Date(eventDate);
  return eventDateObj > currentDate;
};

const getGalleryImageUrl = (img) => {
  if (typeof img === "string") {
    return img;
  }

  return (
    img?.formats?.large?.url ||
    img?.formats?.medium?.url ||
    img?.formats?.small?.url ||
    img?.url ||
    "/images/news-events/placeholder.webp"
  );
};

// Helper function to get banner image URL with fallbacks
const getBannerImageUrl = (event, isMobile) => {
  // For mobile devices, prioritize thumbnail over banner for both hardcoded and API data
  if (isMobile) {
    if (event.thumbnail) {
      return event.thumbnail;
    }
  }

  if (event.banner) {
    return event.banner;
  }

  if (event.thumbnail) {
    return event.thumbnail;
  }

  return "/images/news-events/placeholder.webp";
};

const EventDetailPage = ({ params }) => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null);
  const isMobile = UseScreenSizeSmall();
  const router = useRouter();

  const resolvedParams = React.use(params);
  const eventSlug = resolvedParams?.newsEventsId;

  useEffect(() => {
    if (eventSlug) {
      const foundEvent = events_data.find((e) => e.id === eventSlug);

      if (!foundEvent) {
        setError("Event not found");
      } else {
        // Map data properties to match what the component expects
        setEvent({
          ...foundEvent,
          description: foundEvent.Description || foundEvent.description,
          banner: foundEvent.newsEventBanner || foundEvent.Banner || foundEvent.banner,
        });
      }
      setLoading(false);
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

  const bannerImage = getBannerImageUrl(event, isMobile);
  // Use proper fallbacks for gallery images
  const galleryImages =
    (event.Gallery || event.gallery || [])
      .map((img) => getGalleryImageUrl(img))
      .filter(Boolean) || [];

  // Handle date formatting for both API and hardcoded data
  let date;
  try {
    if (event.Date) {
      date = new Date(event.Date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      });
    } else if (event.PublishDate) {
      date = new Date(event.PublishDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      });
    } else if (event.date instanceof Date) {
      // Format Date object
      date = event.date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      });
    } else {
      // For string dates or fallback
      date = event.date || "Date not available";
    }
  } catch (e) {
    date = event.date || "Date not available";
  }

  // Determine if this is an upcoming event based on the eventType field
  const isUpcomingEvent = event.eventType === "upcoming";

  return (
    <main className="h-fit w-full py-10 px-3.5 md:px-5 lg:px-10 grid grid-cols-4 gap-x-3 md:gap-x-5">
      <button
        onClick={() => router.back()}
        className="col-span-4 lg:col-start-2 flex items-center lg:col-span-2 text-[16px] leading-[130%] text-primary cursor-pointer text-left mb-6"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M15 18 9 12l6-6 1.4 1.4L11.8 12l4.6 4.6L15 18Z" />
        </svg>
        Go Back
      </button>
      <h1 className="col-span-4 lg:col-start-2 lg:col-span-2 text-[32px] md:text-[48px] leading-[110%] mb-3 md:mb-5">
        {event.Title || event.title}
      </h1>
      <div className="col-span-4 lg:col-start-2 lg:col-span-2 flex items-center mb-6 md:mb-8">
        <p className="text-[16px] leading-[130%] text-[#646464]">{date}</p>
      </div>

      {bannerImage && (
        <div
          className={`col-span-4 relative overflow-hidden aspect-[400/248] sm:aspect-[1440/600] w-full mb-6 md:mb-8 ${isUpcomingEvent ? "bg-whiteBg" : ""
            }`}
        >
          <img
            src={bannerImage || "/images/news-events/placeholder.webp"}
            alt={event.Title || event.title}
            className={`${isUpcomingEvent
              ? "w-full h-full"
              : "w-full h-full object-cover object-center"
              }`}
            onError={(e) => {
              // Fallback to placeholder if image fails to load
              e.target.src = "/images/news-events/placeholder.webp";
            }}
          />
        </div>
      )}

      <div className="col-span-4 lg:col-start-2 lg:col-span-2 flex flex-col gap-y-6 text-[#646464]">
        {/* Using RichTextParser for event description */}
        <RichTextParser text={event.description} />
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
                <img
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    // Fallback to placeholder if image fails to load
                    e.target.src = "/images/news-events/placeholder.webp";
                  }}
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
            <div className="relative w-full h-[80vh] flex justify-center items-center">
              <img
                src={selectedImage.url}
                alt={`Gallery image ${selectedImage.index + 1}`}
                className="object-contain h-full w-auto"
                onError={(e) => {
                  // Fallback to placeholder if image fails to load
                  e.target.onerror = null;
                  e.target.src = "/images/news-events/placeholder.webp";
                }}
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