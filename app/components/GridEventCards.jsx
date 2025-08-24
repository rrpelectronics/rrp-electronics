"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const GridEventCards = ({ newsEventImg, imgBgClass, title, date, source, link }) => {
  return (
    <li className="col-span-4 sm:col-span-2 grid grid-cols-4 gap-4">
      <div className="col-span-4 sm:col-span-2 relative aspect-[340/192] sm:aspect-[285/214] w-full">
        <Image
          src={newsEventImg}
          alt={title}
          fill
          sizes="25vw"
          className={`object-cover ${imgBgClass}`}
        />
      </div>
      <div className="col-span-4 sm:col-span-2 flex flex-col justify-between h-full">
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