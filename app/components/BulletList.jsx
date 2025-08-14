"use client";
import React from 'react';

const BulletList = ({ items = [] }) => {
  return (
    <ul>
      {items.map((text, idx) => (
        <li
          key={idx}
          className={`flex items-center gap-2 ${
          idx === 0
              ? "border-y-1 border-y-borderPrimary"
              : "border-b-1 border-b-borderPrimary"
          } `}
        >
          <img
            src="/images/icons/operation.svg"
            alt={`Icon ${idx + 1}`}
            className="shrink-0 w-6 h-6"
          />
          <span
          className={`py-4 md:py-5 text-bodyBase text-textPrimary leading-[120%] font-neueMontreal`}
          >
            {text}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default BulletList;