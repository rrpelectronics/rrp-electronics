"use client"
import React from 'react';
import Link from 'next/link';

const NewsEventsCard = ({ newsEventImg, title, date, source, link }) => {
  return (
    <li  className="w-full sm:w-[45%] lg:w-[30%] flex flex-col">
      <div
        className="w-full asepct-[340/192] relative overflow-hidden mb-4"
      >
        <img
          src={newsEventImg}
          alt={title}
          className="object-cover object-center"
        />
      </div>
      <p className="text-textPrimary text-caption leading-[120%] font-neueMontreal mb-4.5">
        {date} | {source}
      </p>
      <p className="text-bodyLarge text-black leading-[120%] mb-6 line-clamp-2 text-ellipsis">
        {title}
      </p>
      <Link
        href={link}
        className="w-fit text-sm text-primary font-neueMontreal leading-[120%] underline decoration-solid decoration-primary"
      >
        Read More
      </Link>
    </li>
  );
}

export default NewsEventsCard