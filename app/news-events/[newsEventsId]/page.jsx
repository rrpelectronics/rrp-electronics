"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const EventDetailPage = ({ params }) => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null);

  const resolvedParams = React.use(params);
  const eventId = resolvedParams.newsEventsId;

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(
          `https://eloquent-art-0e51a537b4.strapiapp.com/api/event?populate=*`
        );
        const data = await res.json();
        const foundEvent = data.data.find((e) => e.id.toString() === eventId);

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

    fetchEvent();
  }, [eventId]);

  // Function to render text with **markdown** style bold spans
  const renderTextWithSpans = (text) => {
    if (!text) return text;
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        const boldText = part.slice(2, -2);
        return (
          <span key={index} className="text-black font-semibold">
            {boldText}
          </span>
        );
      }
      return part;
    });
  };

  // Parse description into sections
  const parseDescription = (description) => {
    if (!description) return [];
    const sections = description.split("\n\n").filter((para) => para.trim());

    return sections.map((section) => {
      // Check if section contains list items (lines starting with -)
      const lines = section.split("\n");
      const hasListItems = lines.some((line) => line.trim().startsWith("-"));

      if (hasListItems) {
        const listItems = [];
        let currentText = "";

        lines.forEach((line) => {
          if (line.trim().startsWith("-")) {
            listItems.push(line.trim().substring(1).trim());
          } else if (line.trim()) {
            currentText += line + " ";
          }
        });

        return {
          type: "list",
          intro: currentText.trim(),
          items: listItems,
        };
      }

      return {
        type: "paragraph",
        content: section,
      };
    });
  };

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
          <a href="/news-events" className="text-primary underline">
            Back to Events
          </a>
        </div>
      </main>
    );
  }

  const bannerImage =
    event.Thumbnail?.formats?.large?.url || event.Thumbnail?.url;
  const galleryImages =
    event.Gallery?.map((img) => img.formats?.large?.url || img.url) || [];
  const date = new Date(event.Date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
  const sections = parseDescription(event.Description);

  return (
    <main className="h-fit w-full py-10 px-3.5 md:px-5 lg:px-10 grid grid-cols-4 gap-x-3 md:gap-x-5">
      <h1 className="col-span-4 lg:col-start-2 lg:col-span-2 text-[32px] md:text-[48px] lg:text-[56px] leading-[110%] mb-3 md:mb-5">
        {event.Title}
      </h1>
      <div className="col-span-4 lg:col-start-2 lg:col-span-2 flex items-center mb-6 md:mb-8">
        <p className="text-[16px] leading-[130%] text-[#646464]">{date}</p>
      </div>

      {bannerImage && (
        <div className="col-span-4 relative overflow-hidden h-[30vh] sm:h-[70vh] lg:h-[80vh] w-full mb-6 md:mb-8">
          <Image
            src={bannerImage}
            alt={event.Title}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}

      <div className="col-span-4 lg:col-start-2 lg:col-span-2 flex flex-col gap-y-6 text-[#646464]">
        {sections.map((section, index) => {
          if (section.type === "list") {
            return (
              <div key={index} className="flex flex-col gap-y-4">
                {section.intro && (
                  <p className="text-bodyLarge leading-[130%]">
                    {renderTextWithSpans(section.intro)}
                  </p>
                )}
                <ul className="list-disc list-inside ml-4 md:ml-5 lg:ml-10 flex flex-col gap-y-3.5 md:gap-y-5 text-bodyLarge font-neueMontreal leading-[130%]">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{renderTextWithSpans(item)}</li>
                  ))}
                </ul>
              </div>
            );
          }

          return (
            <p
              key={index}
              className="text-bodyLarge font-neueMontreal leading-[130%]"
            >
              {renderTextWithSpans(section.content)}
            </p>
          );
        })}
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