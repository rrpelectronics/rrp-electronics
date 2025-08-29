"use client";
import React from "react";
import Link from "next/link";
import HeadingCenter from "@/app/components/HeadingCenter";
import { useTextAnimation } from "@/app/hooks/UseTextAnimation";
import { JOB_DATA } from "./jobData.js";

const JobItem = React.memo(({ job }) => (
  <li
    className={`grid grid-cols-4 gap-x-3 md:gap-x-5 gap-y-4 md:gap-y-5 ${
      job.id === 0 ? "pt-0 pb-6 lg:pt-6" : "py-6"
    } border-b-1 border-b-borderPrimary`}
  >
    <p
      data-animate-text
      className="col-span-4 lg:col-span-2 text-heading4 leading-[115%] text-black"
    >
      {job.title}
    </p>
    <ul className="flex justify-between col-span-4 lg:col-span-2">
      <li
        data-animate-text
        className="text-bodyBase text-black leading-[120%] font-neueMontreal"
      >
        {job.location}
      </li>
      <Link
        href={`/careers/${job.id}`}
        className="flex justify-center items-center h-fit w-fit gap-3 lg:gap-4"
        aria-label={`View job details for ${job.title}`}
      >
        <p
          data-animate-text
          className="leading-[110%] text-bodyBase text-primary underline decoration-solid decoration-primary font-neueMontreal"
        >
          Job Details
        </p>
        <img
          data-animate-text
          src="/images/icons/arrow_outward.svg"
          alt={`Job Details of ${job.title}`}
          className="h-5.5 w-5.5 md:h-6 md:w-6"
          loading="lazy"
        />
      </Link>
    </ul>
  </li>
));

JobItem.displayName = "JobItem";

const TableHeader = React.memo(() => (
  <li className="hidden lg:grid grid-cols-4 gap-x-3 md:gap-x-5 gap-y-4 pb-5.5 border-b-1 border-b-borderPrimary">
    <p data-animate-text className="col-span-2 text-textPrimary text-bodySmall font-neueMontreal leading-[120%] uppercase">
      Position
    </p>
    <p data-animate-text className="col-span-2 text-textPrimary text-bodySmall font-neueMontreal leading-[120%] uppercase">
      Location
    </p>
  </li>
));

TableHeader.displayName = "TableHeader";

const JobList = () => {
  const { containerRef } = useTextAnimation()
  return (
    <section className="h-fit w-full px-3.5 md:px-5 lg:px-10 py-10 md:py-15 bg-white">
      <HeadingCenter
        heading="Who We Hire"
        text="Join a team of experts driving the next generation of semiconductor packaging"
      />
      <ul ref={containerRef} className="w-full h-fit flex flex-col">
        <TableHeader />
        {JOB_DATA.map((job) => (
          <JobItem key={job.id} job={job} />
        ))}
      </ul>
    </section>
  );
};

export default JobList;