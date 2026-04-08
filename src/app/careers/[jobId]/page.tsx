"use client";
import React, { useRef, useState, useEffect, Suspense } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import JobDetailsLoading from "@/components/job/JobDetailsLoading";
import RichTextParser from "@/components/RichTextParser";
import { fetchJobBySlug } from "@/utils/jobFetch";

const CareersContact = dynamic(
  () => import("./CareersContact"),
  { ssr: false }
);

// Main content component
const JobDetailsContent = ({ jobSlug }) => {
  const sectionRef = useRef(null);

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadJobDetails = async () => {
      try {
        setLoading(true);
        // Fetch job by slug with fallback
        const jobData = await fetchJobBySlug(jobSlug);
        setJob(jobData);
      } catch (err) {
        setError("Failed to load job details: " + err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (jobSlug) {
      loadJobDetails();
    }
  }, [jobSlug]);

  // Generate experience text
  const getExperienceText = () => {
    if (!job) return "";

    let experienceText = "";

    if (job.experienceMin && job.experienceMax) {
      if (job.experienceMin === job.experienceMax) {
        experienceText = `Experience: ${job.experienceMin} year${job.experienceMin > 1 ? "s" : ""
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
        <section className="w-full h-[70vh] py-10 px-3.5 md:px-5 lg:px-10 flex flex-col items-center justify-center">
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
    <main className="min-h-screen w-full relative mt-25 lg:mt-35">
      {/* Hero Section */}
      <section className="w-full h-fit py-10 px-3.5 md:px-5 lg:px-10 flex flex-col items-start justify-center">
        <div className="flex flex-col">
          <p
                        className="text-bodyLarge leading-[120%] text-textPrimary font-neueMontreal mb-8"
          >
            {job.department} / {job.type}
          </p>
          <h3
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
            href={"#apply-now"}
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
            <div className="col-span-4 md:col-span-1 flex items-start">
              <h3 className="text-heading2 text-black leading-[110%]">
                Description
              </h3>
            </div>
            <div className="col-span-4 md:col-span-2 md:col-start-3 flex flex-col gap-6 w-[90%]">

              <RichTextParser text={job.description} />

              {/* Experience Text */}
              {getExperienceText() && (
                <p className="text-textPrimary text-bodyLarge leading-[120%] font-neueMontreal">
                  {getExperienceText()}
                </p>
              )}

              {/* Apply Link */}
              <Link
                href={"mailto:careers@rrpelectronics.com"}
                className="leading-[110%] text-bodyLarge text-textPrimary font-neueMontreal"
              >
                Think you're a great fit? Drop your resume at &nbsp;
                <span className="text-primary underline decoration-solid decoration-primary">
                  careers@rrpelectronics.com
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="apply-now" className="@container w-full h-full px-3.5 md:px-5 lg:px-10">
        <div className="w-full grid grid-cols-4">
          <div className="w-full col-span-4 flex flex-col md:grid md:grid-cols-4 gap-4 md:gap-0 py-10 md:py-15">
            <div className="col-span-4 md:col-span-1 flex items-start">
              <h3 className="text-heading2 text-black leading-[110%] mb-6">
                Join Us Now
              </h3>
            </div>
            <div className="col-span-4 @4xl:col-span-3 flex flex-col gap-6">
              <CareersContact jobTitle={cleanJobTitle} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

// Main wrapper component with Suspense
const JobDetailsPage = ({ params }: { params: Promise<{ jobId: string }> }) => {
  const resolvedParams = React.use(params);
  const jobSlug = resolvedParams.jobId; // Now using slug instead of ID

  return (
    <Suspense fallback={<JobDetailsLoading />}>
      <JobDetailsContent jobSlug={jobSlug} />
    </Suspense>
  );
};

export default JobDetailsPage;
