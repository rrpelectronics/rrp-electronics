"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { useTextAnimation } from "@/app/hooks/UseTextAnimation";
import { JOB_DATA } from "../jobData";

const JobDetailsPage = ({ params }) => {
  const sectionRef = useRef(null);
  const { containerRef } = useTextAnimation();

  const resolvedParams = React.use(params);
  const jobId = parseInt(resolvedParams.jobId);
  const job = JOB_DATA[jobId];

  // Generate experience text
  const getExperienceText = () => {
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

  return (
    <main className="min-h-screen w-full relative">
      {/* Hero Section */}
      <section className="bg-whiteBg w-full h-fit pt-25 md:pt-32 lg:pt-35 pb-15 px-3.5 md:px-5 lg:px-10 flex flex-col items-start justify-center">
        <div ref={containerRef} className="flex flex-col">
          <p
            data-animate-text
            className="text-bodyLarge leading-[120%] text-textPrimary font-neueMontreal mb-8"
          >
            {job.department} / {job.type}
          </p>
          <h3
            data-animate-text
            className="text-display text-black leading-[110%] tracking-display mb-4"
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
            <div className="col-span-4 md:col-span-2 flex flex-col gap-6 w-[80%]">
              <p className="text-textPrimary text-bodyBase leading-[120%] font-neueMontreal">
                {job.description}
              </p>

              {/* Experience Text */}
              {getExperienceText() && (
                <p className="text-textPrimary text-bodyBase leading-[120%] font-neueMontreal">
                  {getExperienceText()}
                </p>
              )}

              {/* Extra Points */}
              {job.extraPoints &&
                job.extraPoints.map((point, index) => (
                  <p
                    key={index}
                    className="text-textPrimary text-bodyBase leading-[120%] font-neueMontreal"
                  >
                    {point}
                  </p>
                ))}

              {/* Apply Link */}
              <Link
                href={"mailto:hr@rrpelectronics.com"}
                className="leading-[110%] text-bodyBase text-textPrimary font-neueMontreal"
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
    </main>
  );
};

export default JobDetailsPage;
