"use client";
import React from "react";
import Image from "next/image";

const JourneyItem = ({ event, index, itemRef, activeIndex, handleDateClick }) => (
  <div className="w-[285px] relative flex flex-col gap-6 justify-center items-start">
    <div
      onClick={() => handleDateClick(index)}
      className="cursor-pointer h-fit group flex flex-col gap-6 justify-center items-start"
    >
      <div
        ref={itemRef?.dot}
        className={`h-4.5 w-4.5 rounded-full mx-auto ${
          activeIndex === index
            ? "bg-primary"
            : "bg-textSecondary group-hover:bg-primary transition-colors duration-200"
        }`}
      />
      <p
        ref={itemRef?.date}
        className={`text-bodyBase whitespace-nowrap leading-[120%] font-neueMontreal w-fit mx-auto ${
          activeIndex === index
            ? "text-primary"
            : "text-textSecondary group-hover:text-primary transition-colors duration-200"
        }`}
      >
        {event.date}
      </p>
    </div>

    <div
      ref={itemRef?.img}
      className="relative w-full aspect-[246/184]"
      style={{ clipPath: "inset(0% 0% 100% 0%)" }}
    >
      <Image src={event.image} alt={event.title} fill sizes="246" className="object-cover object-center" />
    </div>

    <p
      ref={itemRef?.title}
      className="text-white leading-[115%] text-heading4"
      style={{ clipPath: "inset(0% 0% 100% 0%)" }}
    >
      {event.title}
    </p>

    <p
      ref={itemRef?.desc}
      className="text-bodySmall text-textSecondary leading-[120%] font-neueMontreal -mt-2"
      style={{ clipPath: "inset(0% 0% 100% 0%)" }}
    >
      {event.desc}
    </p>
  </div>
);

export default JourneyItem;
