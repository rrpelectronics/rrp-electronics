"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const GridEventCards = ({ newsEventImg, imgBgClass, title, date, source, link }) => {
  return (
    <li className="col-span-4 md:col-span-2 flex gap-4">
      <div className="col-span-4 md:col-span-2 flex gap-4">
        <div className="aspect-square w-[150px] relative overflow-hidden rounded-md">
          <Image
            src={newsEventImg}
            alt={title}
            fill
            sizes="100vw"
            className={`object-cover object-${imgBgClass}`}
          />
        </div>
        <div className="flex flex-col gap-3.5 md:gap-4.5 flex-1">
          <p className="text-textPrimary text-caption lg:text-bodySmallest leading-[120%] font-neueMontreal">
            {date} {source && `| ${source}`}
          </p>
          <p className="text-bodyLarge text-black leading-[120%] mb-2.5 line-clamp-2 text-ellipsis">
            {title}
          </p>
          <Link
            href={link}
            target="_blank"
            className="w-fit text-sm text-primary font-neueMontreal leading-[120%] underline decoration-solid decoration-primary"
          >
            Read More
          </Link>
        </div>
      </div>
    </li>
  );
}

export default GridEventCards