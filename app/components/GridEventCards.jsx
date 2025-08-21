"use client";
import React from 'react';
import Link from 'next/link';

const GridEventCards = ({ newsEventImg, title, date, source, link }) => {
  return (
    <li className="col-span-4 sm:col-span-2 flex flex-col sm:flex-row sm:items-stretch gap-4">
      <div className="relative asepct-[340/192] w-full sm:aspect-[285/214] sm:w-[49%]">
        <img src={newsEventImg} alt={title} className='h-full object-cover object-center' />
      </div>
      <div className="flex flex-col justify-between h-full w-[49%]">
        <div className="flex flex-col">
          <p className="text-textPrimary text-caption leading-[120%] font-neueMontreal mb-4.5">
            {date} | {source}
          </p>
          <p className="text-bodyLarge text-black leading-[120%] mb-6 line-clamp-2 text-ellipsis">
            {title}
          </p>
        </div>
        <Link
          href={link}
          className="w-fit text-sm text-primary font-neueMontreal leading-[120%] underline decoration-solid decoration-primary"
        >
          Read More
        </Link>
      </div>
    </li>
  );
}

export default GridEventCards