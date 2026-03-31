"use client";
import React from "react";
import JourneyItem from "./JourneyItem";

const JourneyTimeline = ({
  timelineRef,
  events,
  itemRefs,
  activeIndex,
  handleDateClick,
}) => (
  <div className="relative w-full overflow-x-hidden no-scrollbar col-span-4">
    <div className="w-full h-0.25 absolute bg-textSecondary z-1 top-[9px] left-0" />
    <div
      ref={timelineRef}
      className="w-[1657px] relative flex gap-7 md:gap-12 h-fit overflow-hidden items-start z-2 pl-3.5 md:pl-5 lg:pl-10"
    >
      {events.map((event, index) => (
        <JourneyItem
          key={index}
          event={event}
          index={index}
          itemRef={itemRefs.current[index]}
          activeIndex={activeIndex}
          handleDateClick={handleDateClick}
        />
      ))}
    </div>
  </div>
);

export default JourneyTimeline;
