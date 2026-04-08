"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface NewsEventsCardProps {
  newsEventImg?: string;
  imgBgClass?: string;
  title: string;
  date: any;
  source?: string;
  link: string;
  target?: string;
  variant?: "default" | "event";
  id?: string;
  eventType?: "past" | "upcoming";
  priority?: boolean;
}

const NewsEventsCard: React.FC<NewsEventsCardProps> = ({
  newsEventImg,
  imgBgClass = "center",
  title,
  date,
  source,
  link,
  target = "_blank",
  variant = "default",
  id,
  eventType = "past",
  priority = false,
}) => {
  const imageAspect =
    variant === "event" ? "aspect-[400/248]" : "aspect-square";
  const imageWidth = variant === "event" ? "w-full" : "w-[150px]";
  const eventLink =
    variant === "event" && id ? `/events/${id}` : link;
  // Internal event pages should open in the same tab
  const linkTarget = variant === "event" && id ? "_self" : target;

  // Check if the image is from our own domain or an external domain
  const isExternalImage =
    newsEventImg &&
    (newsEventImg.startsWith("http") ||
      newsEventImg.startsWith("https") ||
      newsEventImg.startsWith("//"));

  const renderDate = (val: any) => {
    if (!val) return "";
    try {
      if (typeof val === "string") {
        if (!val.includes("T") && isNaN(Date.parse(val))) return val;
      }
      const d = new Date(val);
      if (isNaN(d.getTime())) return String(val);

      const options = { month: "long", year: "numeric" } as const;

      return new Intl.DateTimeFormat("en-GB", options).format(d);
    } catch {
      return String(val);
    }
  };

  // For external images or when Image component fails, fallback to regular img tag
  const renderImage = () => {
    // For upcoming events, always use regular img tag
    if (eventType === "upcoming") {
      return (
        <img
          src={newsEventImg || "/images/news-events/placeholder.webp"}
          alt={title}
          className={`object-cover object-${imgBgClass} w-full h-full`}
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            (e.target as HTMLImageElement).src = "/images/news-events/placeholder.webp";
          }}
        />
      );
    }

    // For past events and news, try Next.js Image first, fallback to regular img
    if (isExternalImage) {
      // For external images, use regular img tag to avoid optimization issues
      return (
        <img
          src={newsEventImg}
          alt={title}
          className={`object-cover object-${imgBgClass} w-full h-full`}
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            (e.target as HTMLImageElement).src = "/images/news-events/placeholder.webp";
          }}
        />
      );
    } else {
      // For local images, try Next.js Image component first
      return (
        <Image
          src={newsEventImg || "/images/news-events/placeholder.webp"}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          className={`object-cover object-${imgBgClass}`}
          onError={(e) => {
            // Fallback to regular img tag if Next.js Image fails
            const target = e.target as HTMLImageElement;
            if (target && target.parentElement) {
              target.parentElement.innerHTML = `
                <img 
                  src="${newsEventImg || "/images/news-events/placeholder.webp"}" 
                  alt="${title}"
                  class="object-cover object-${imgBgClass} w-full h-full"
                  onerror="this.src='/images/news-events/placeholder.webp'"
                />
              `;
            }
          }}
        />
      );
    }
  };

  return (
    <Link
      href={eventLink}
      target={linkTarget}
      className={`flex ${variant === "event" ? "flex-col gap-4" : "gap-4"
        } items-stretch`}
    >
      <div
        className={`${imageAspect} ${imageWidth} overflow-hidden rounded-md ${eventType === "upcoming" ? "bg-whiteBg" : ""
          } relative`}
      >
        {newsEventImg ? (
          renderImage()
        ) : (
          <img
            src="/images/news-events/placeholder.webp"
            alt={title}
            className={`object-cover object-${imgBgClass} w-full h-full`}
          />
        )}
      </div>
      <div className="flex flex-col gap-3.5 md:gap-4.5 flex-1">
        <p className="text-textPrimary text-caption lg:text-bodySmallest leading-[120%] font-neueMontreal">
          {renderDate(date)} {source && `| ${source}`}
        </p>
        <p
          className={`text-bodyLarge text-black leading-[120%] mb-2.5 line-clamp-2 text-ellipsis ${variant === "event" ? "" : "md:w-[90%]"
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
