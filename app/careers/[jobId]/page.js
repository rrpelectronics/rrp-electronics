"use client";
import React, { useRef, useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useTextAnimation } from "@/app/hooks/UseTextAnimation";
import dynamic from "next/dynamic";
import axios from "axios";

const CareersContact = dynamic(
  () => import("./CareersContact"),
  { ssr: false }
);

// Loading skeleton component
const JobDetailsLoading = () => (
  <main className="min-h-screen w-full relative">
    <section className="w-full h-fit py-10 px-3.5 md:px-5 lg:px-10 flex flex-col items-start justify-center">
      <div className="flex flex-col gap-4 w-full">
        <div className="h-6 bg-gray-200 animate-pulse rounded w-1/3"></div>
        <div className="h-16 bg-gray-200 animate-pulse rounded w-2/3"></div>
        <div className="h-6 bg-gray-200 animate-pulse rounded w-1/4"></div>
        <div className="h-10 bg-gray-200 animate-pulse rounded w-32"></div>
      </div>
    </section>
    <section className="w-full h-full px-3.5 md:px-5 lg:px-10">
      <div className="w-full grid grid-cols-4">
        <div className="w-full col-span-4 flex flex-col md:grid md:grid-cols-4 gap-4 md:gap-0 py-10 md:py-15">
          <div className="md:col-span-2">
            <div className="h-10 bg-gray-200 animate-pulse rounded w-40"></div>
          </div>
          <div className="col-span-4 md:col-span-2 flex flex-col gap-6 w-[90%]">
            <div className="h-4 bg-gray-200 animate-pulse rounded w-full"></div>
            <div className="h-4 bg-gray-200 animate-pulse rounded w-full"></div>
            <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 animate-pulse rounded w-full"></div>
            <div className="h-4 bg-gray-200 animate-pulse rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </section>
  </main>
);

// Main content component
const JobDetailsContent = ({ jobId }) => {
  const sectionRef = useRef(null);
  const { containerRef } = useTextAnimation();
  
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        // First fetch all jobs to find the one with matching ID
        const response = await axios.get(
          "https://eloquent-art-0e51a537b4.strapiapp.com/api/careers?populate=*"
        );
        
        const rawData = response.data.data;
        const item = rawData.find((job) => job.id === jobId);
        
        if (!item) {
          setError("Job not found");
          setLoading(false);
          return;
        }
        
        // Format the job data to match the previous structure
        const formattedJob = {
          id: item.id,
          title: item.Role,
          department: item.Department,
          location: item.Location,
          type: item.Mode === "Full" ? "Full-time" : item.Mode,
          mode: item.Mode,
          fresherAllowed: item.Fresher,
          experienceMin: item.min_experience,
          experienceMax: item.max_experience,
          description: item.Description,
        };
        
        setJob(formattedJob);
      } catch (err) {
        setError("Failed to load job details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  // Generate experience text
  const getExperienceText = () => {
    if (!job) return "";
    
    let experienceText = "";

    if (job.experienceMin && job.experienceMax) {
      if (job.experienceMin === job.experienceMax) {
        experienceText = `Experience: ${job.experienceMin} year${
          job.experienceMin > 1 ? "s" : ""
        } required`;
      } else {
        experienceText = `Experience: ${job.experienceMin}–${job.experienceMax} years preferred`;
      }
    } else if (job.experienceMin) {
      experienceText = `Experience: ${job.experienceMin}+ years preferred`;
    } else if (job.experienceMax) {
      experienceText = `Experience: Up to ${job.experienceMax} years preferred`;
    }

    if (job.fresherAllowed && experienceText) {
      experienceText += ", but freshers may also apply";
    } else if (job.fresherAllowed && !experienceText) {
      experienceText = "Freshers are welcome to apply";
    }

    return experienceText;
  };

  // Loading state
  if (loading) {
    return <JobDetailsLoading />;
  }

  // Error state
  if (error || !job) {
    return (
      <main className="min-h-screen w-full relative">
        <section className="w-full h-fit py-10 px-3.5 md:px-5 lg:px-10 flex flex-col items-center justify-center">
          <div className="text-center">
            <h2 className="text-heading2 text-black mb-4">Job Not Found</h2>
            <p className="text-bodyBase text-textPrimary mb-6">
              {error || "The job you're looking for doesn't exist."}
            </p>
            <Link
              href="/careers"
              className="text-bodySmall text-white font-neueMontreal leading-[120%] bg-primary rounded-full px-6 py-3"
            >
              Back to Careers
            </Link>
          </div>
        </section>
      </main>
    );
  }

  // Clean job title (remove line breaks for form submission)
  const cleanJobTitle = job.title.replace(/\n/g, " ").trim();

  return (
    <main className="min-h-screen w-full relative">
      {/* Hero Section */}
      <section className="w-full h-fit py-10 px-3.5 md:px-5 lg:px-10 flex flex-col items-start justify-center">
        <div ref={containerRef} className="flex flex-col">
          <p
            data-animate-text
            className="text-bodyLarge leading-[120%] text-textPrimary font-neueMontreal mb-8"
          >
            {job.department} / {job.type}
          </p>
          <h3
            data-animate-text
            className="text-display text-black leading-[110%] tracking-display mb-4 max-w-[840px]"
          >
            {job.title.split("\n").map((line, i) => (
              <React.Fragment key={i}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </h3>
          <p className="text-textPrimary text-bodyLarge leading-[120%] font-neueMontreal mb-13">
            Location: {job.location}
          </p>
          <Link
            data-animate-text
            href={"mailto:hr@rrpelectronics.com"}
            className="text-bodySmall text-white font-neueMontreal leading-[120%] bg-primary rounded-full w-fit px-4 md:px-6 py-2 md:py-3"
          >
            Apply Now
          </Link>
        </div>
      </section>

      {/* Description Section */}
      <section
        ref={sectionRef}
        className="w-full h-full px-3.5 md:px-5 lg:px-10"
      >
        <div className="w-full grid grid-cols-4">
          <div className="w-full col-span-4 flex flex-col md:grid md:grid-cols-4 gap-4 md:gap-0 py-10 md:py-15">
            <div className="md:col-span-2 flex items-start">
              <h3 className="text-heading2 text-black leading-[110%]">
                Description
              </h3>
            </div>
            <div className="col-span-4 md:col-span-2 flex flex-col gap-6 w-[90%]">
              {/* Description - Split by newlines to preserve paragraph breaks */}
              {job.description.split('\n').filter(para => para.trim()).map((paragraph, index) => (
                <p
                  key={index}
                  className="text-textPrimary text-bodyLarge leading-[120%] font-neueMontreal"
                >
                  {paragraph.trim()}
                </p>
              ))}

              {/* Experience Text */}
              {getExperienceText() && (
                <p className="text-textPrimary text-bodyLarge leading-[120%] font-neueMontreal">
                  {getExperienceText()}
                </p>
              )}

              {/* Apply Link */}
              <Link
                href={"mailto:hr@rrpelectronics.com"}
                className="leading-[110%] text-bodyLarge text-textPrimary font-neueMontreal"
              >
                Think you're a great fit? Drop your resume at &nbsp;
                <span className="text-primary underline decoration-solid decoration-primary">
                  hr@rrpelectronics.com
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Form Section */}
      {/* <section id="apply-now" className="@container w-full h-full px-3.5 md:px-5 lg:px-10">
        <div className="w-full grid grid-cols-4">
          <div className="w-full col-span-4 flex flex-col md:grid md:grid-cols-4 gap-4 md:gap-0 py-10 md:py-15">
            <div className="md:col-span-2 flex items-start">
              <h3 className="text-heading2 text-black leading-[110%] mb-6">
                Join Us Now
              </h3>
            </div>
            <div className="col-span-4 @4xl:col-span-2 flex flex-col gap-6">
              <CareersContact jobTitle={cleanJobTitle} />
            </div>
          </div>
        </div>
      </section> */}
    </main>
  );
};

// Main wrapper component with Suspense
const JobDetailsPage = ({ params }) => {
  const resolvedParams = React.use(params);
  const jobId = parseInt(resolvedParams.jobId);

  return (
    <Suspense fallback={<JobDetailsLoading />}>
      <JobDetailsContent jobId={jobId} />
    </Suspense>
  );
};

export default JobDetailsPage;