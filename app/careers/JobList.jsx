"use client";
import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import HeadingCenter from "@/app/components/HeadingCenter";
import { useTextAnimation } from "@/app/hooks/UseTextAnimation";
import axios from "axios";

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
    <p
      data-animate-text
      className="col-span-2 text-textPrimary text-bodySmall font-neueMontreal leading-[120%] uppercase"
    >
      Position
    </p>
    <p
      data-animate-text
      className="col-span-2 text-textPrimary text-bodySmall font-neueMontreal leading-[120%] uppercase"
    >
      Location
    </p>
  </li>
));

TableHeader.displayName = "TableHeader";

// Loading skeleton component
const JobListLoading = () => (
  <section className="h-fit w-full px-3.5 md:px-5 lg:px-10 py-10 md:py-15 bg-white">
    <HeadingCenter
      heading="Who We Hire"
      text="Join a team of experts driving the next generation of semiconductor packaging"
    />
    <div className="w-full h-64 bg-gray-200 animate-pulse rounded"></div>
  </section>
);

// Main content component
const JobListContent = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { containerRef } = useTextAnimation();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "https://eloquent-art-0e51a537b4.strapiapp.com/api/careers?populate=*"
        );
        const rawData = response.data.data;
        // Sort by publishedAt descending (latest first)
        const sorted = rawData.sort(
          (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
        );
        // Limit to first 4
        const limited = sorted.slice(0, 4);
        const formattedJobs = limited.map((item) => ({
          id: item.id,
          title: item.Role,
          department: item.Department,
          location: item.Location,
          mode: item.Mode,
          fresher: item.Fresher,
          minExperience: item.min_experience,
          maxExperience: item.max_experience,
          description: item.Description,
        }));
        setJobs(formattedJobs);
      } catch (err) {
        setError("Failed to load jobs");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <JobListLoading />;
  }

  if (error) {
    return (
      <section className="h-fit w-full px-3.5 md:px-5 lg:px-10 py-10 md:py-15 bg-white">
        <HeadingCenter
          heading="Who We Hire"
          text="Join a team of experts driving the next generation of semiconductor packaging"
        />
        <div className="text-center text-red-500">{error}</div>
      </section>
    );
  }

  return (
    <section className="h-fit w-full px-3.5 md:px-5 lg:px-10 py-10 md:py-15 bg-white">
      <HeadingCenter
        heading="Who We Hire"
        text="Join a team of experts driving the next generation of semiconductor packaging"
      />
      {jobs.length > 0 ? (
        <ul ref={containerRef} className="w-full h-fit flex flex-col">
          <TableHeader />
          {jobs.map((job, index) => (
            <JobItem key={job.id} job={job} index={index} />
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">
          No jobs available at the moment.
        </p>
      )}
    </section>
  );
};

// Main wrapper component with Suspense
const JobList = () => {
  return (
    <Suspense fallback={<JobListLoading />}>
      <JobListContent />
    </Suspense>
  );
};

export default JobList;
