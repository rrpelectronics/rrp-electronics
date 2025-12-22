"use client";
import React, { useState, useEffect, Suspense } from "react";
import HeadingCenter from "@/app/components/HeadingCenter";
import { useTextAnimation } from "@/app/hooks/UseTextAnimation";
import { fetchJobs } from "@/app/utils/jobFetch";
import JobItem from "@/app/components/job/JobItem";
import TableHeader from "@/app/components/job/TableHeader";
import JobListLoading from "@/app/components/job/JobListLoading";

const JobListContent = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const jobsData = await fetchJobs();
        const limited = jobsData.slice(0, 4);
        setJobs(limited);
      } catch (err) {
        setError("Failed to load jobs");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  const renderJobListContent = () => {
    if (loading) {
      return <JobListLoading />;
    }

    if (error) {
      return (
        <li className="grid grid-cols-4 gap-x-3 md:gap-x-5 gap-y-4 md:gap-y-5 py-6 border-b-1 border-b-borderPrimary">
          <div className="col-span-4 text-center text-red-500">{error}</div>
        </li>
      );
    }

    return (
      <>
        {jobs.length > 0 ? (
          jobs.map((job, index) => (
            <JobItem key={job.id} job={job} index={index} />
          ))
        ) : (
          <li className="grid grid-cols-4 gap-x-3 md:gap-x-5 gap-y-4 md:gap-y-5 py-6 border-b-1 border-b-borderPrimary">
            <div className="col-span-4 text-center text-gray-500">
              No jobs available at the moment.
            </div>
          </li>
        )}
      </>
    );
  };

  return <>{renderJobListContent()}</>;
};

const JobList = () => {
  const { containerRef } = useTextAnimation();
  return (
    <section className="h-fit w-full px-3.5 md:px-5 lg:px-10 py-10 md:py-15 bg-white">
      <HeadingCenter
        heading="Who We Hire"
        text="Join a team of experts driving the next generation of semiconductor packaging"
      />
      <ul ref={containerRef} className="w-full h-fit flex flex-col">
        <TableHeader />
        <Suspense fallback={<JobListLoading />}>
          <JobListContent />
        </Suspense>
      </ul>
    </section>
  );
};

export default JobList;
