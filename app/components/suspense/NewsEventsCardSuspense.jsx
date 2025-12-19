import React from "react";

const NewsEventsCardSuspense = ({ variant = "default" }) => {
  // Determine the image aspect ratio based on variant
  const imageAspect =
    variant === "event" ? "aspect-[400/248]" : "aspect-square";
  const imageWidth = variant === "event" ? "w-full" : "w-[150px]";

  return (
    <div
      className={`flex ${
        variant === "event" ? "flex-col gap-4" : "gap-4"
      } items-stretch animate-pulse`}
    >
      <div className={`${imageAspect} ${imageWidth} bg-gray-200 rounded-md`} />
      <div className="flex flex-col gap-3.5 md:gap-4.5 flex-1">
        <div className="h-4 bg-gray-200 rounded w-32" />
        <div className="h-5 bg-gray-200 rounded w-full" />
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-20" />
      </div>
    </div>
  );
};

export default NewsEventsCardSuspense;
