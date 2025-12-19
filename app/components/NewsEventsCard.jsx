"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { generateSlug } from "@/app/utils/slugUtils";

const NewsEventsCard = ({
  newsEventImg,
  imgBgClass = "center",
  title,
  date,
  source,
  link,
  target = "_blank",
  variant = "default", // "default" for news, "event" for events
  id, // Add id prop for events
  eventType = "past", // Add eventType prop to distinguish between upcoming and past events
}) => {
  // Determine the image aspect ratio based on variant
  const imageAspect =
    variant === "event" ? "aspect-[400/248]" : "aspect-square";
  const imageWidth = variant === "event" ? "w-full" : "w-[150px]";

  // For events, generate slug from title
  const eventLink =
    variant === "event" && id ? `/events/${generateSlug(title)}` : link;

  // Use img tag for upcoming events, Next.js Image for past events
  const renderImage = () => {
    if (variant === "event" && eventType === "upcoming") {
      // For upcoming events, use regular img tag with specified classes
      return (
        <img src={newsEventImg} alt={title} className="mx-auto h-full w-auto" />
      );
    } else {
      // For past events and news, use Next.js Image component
      return (
        <Image
          src={newsEventImg}
          alt={title}
          fill
          sizes="100vw"
          className={`object-cover object-${imgBgClass}`}
        />
      );
    }
  };

  return (
    <Link
      href={eventLink}
      target={target}
      className={`flex ${
        variant === "event" ? "flex-col gap-4" : "gap-4"
      } items-stretch`}
    >
      <div
        className={`${imageAspect} ${imageWidth} overflow-hidden rounded-md ${
          eventType === "upcoming" ? "bg-whiteBg" : ""
        } relative`}
      >
        {renderImage()}
      </div>
      <div className="flex flex-col gap-3.5 md:gap-4.5 flex-1">
        <p className="text-textPrimary text-caption lg:text-bodySmallest leading-[120%] font-neueMontreal">
          {date} {source && `| ${source}`}
        </p>
        <p
          className={`text-bodyLarge text-black leading-[120%] mb-2.5 line-clamp-2 text-ellipsis ${
            variant === "event" ? "" : "md:w-[90%]"
          }`}
        >
          {title}
        </p>
        <p className="w-fit text-sm text-primary font-neueMontreal leading-[120%] underline decoration-solid decoration-primary">
          Read More
        </p>
      </div>
    </Link>
  );
};

export default NewsEventsCard;
