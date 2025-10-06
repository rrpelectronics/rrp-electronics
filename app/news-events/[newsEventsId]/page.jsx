"use client";
import React, { useState } from "react";
import events_data from "../events_data";
import Image from "next/image";

const page = ({ params }) => {
  const resolvedParams = React.use(params);
  const eventId = parseInt(resolvedParams.newsEventsId);
  const event = events_data[eventId];
  const [selectedImage, setSelectedImage] = useState(null);

  // Function to render text with **markdown** style bold spans
  const renderTextWithSpans = (text) => {
    if (!text) return text;

    // Split text by ** markers and create JSX elements
    const parts = text.split(/(\*\*.*?\*\*)/g);

    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        // Remove the ** markers and apply bold styling
        const boldText = part.slice(2, -2);
        return (
          <span key={index} className="text-black font-neueMontrealMd">
            {boldText}
          </span>
        );
      }
      return part;
    });
  };

  // Function to render list items with **markdown** style bold spans
  const renderListItem = (item, index) => {
    return <li key={index}>{renderTextWithSpans(item)}</li>;
  };

  return (
    <main className="h-fit w-full py-10 px-3.5 md:px-5 lg:px-10 grid grid-cols-4 gap-x-3 md:gap-x-5">
      <h1 className="col-span-4 lg:col-start-2 lg:col-span-2 text-heading2 tracking-heading2 mb-3 md:mb-5">
        {event.title}
      </h1>
      <div className="col-span-4 lg:col-start-2 lg:col-span-2 flex items-center mb-6 md:mb-8">
        <p className="text-[16px] leading-[130%] text-[#646464]">
          {event.date}
        </p>
      </div>
      <div className="col-span-4 relative overflow-hidden h-[30vh] sm:h-[70vh] lg:h-[80vh] w-full mb-6 md:mb-8">
        <Image
          src={event.newsEventBanner}
          alt={event.title}
          fill
          sizes="100vw"
          className={`object-cover ${event.imgBgClass}`}
        />
      </div>
      <div className="col-span-4 lg:col-start-2 lg:col-span-2 flex flex-col gap-y-10 text-[#646464] font-neueMontreal">
        <p className="text-bodyLarge leading-[130%]">
          {renderTextWithSpans(event.content?.intro)}
        </p>
        <p className="text-bodyLarge leading-[130%]">
          {renderTextWithSpans(event.content?.body1)}
        </p>
        <p className="text-bodyLarge leading-[130%]">
          {renderTextWithSpans(event.content?.body2)}
        </p>
        {event.content?.listItems &&
          <ul className="list-disc list-inside ml-4 md:ml-5 lg:ml-10 flex flex-col gap-y-3.5 md:gap-y-5 text-bodyLarge">
            {event.content?.listItems?.map((item, index) =>
              renderListItem(item, index)
            )}
          </ul>
        }
        <p className="text-bodyLarge leading-[130%]">
          {renderTextWithSpans(event.content?.body3)}
        </p>
        <p className="text-bodyLarge leading-[130%]">
          {renderTextWithSpans(event.content?.conclusion)}
        </p>
      </div>

      {/* Gallery Section */}
      {event.galleryImages && (
        <div className="col-span-4 lg:col-start-2 lg:col-span-2 mt-16 md:mt-20">
          <h2 className="text-heading3 mb-8 md:mb-10">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {event.galleryImages.map((image, index) => (
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

      {/* Gallery Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-60 flex items-center justify-center p-4"
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
            {/* Navigation arrows */}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              const prevIndex =
                selectedImage.index > 0
                  ? selectedImage.index - 1
                  : event.galleryImages.length - 1;
              setSelectedImage({
                url: event.galleryImages[prevIndex],
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
                selectedImage.index < event.galleryImages.length - 1
                  ? selectedImage.index + 1
                  : 0;
              setSelectedImage({
                url: event.galleryImages[nextIndex],
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

export default page;
