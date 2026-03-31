import React from "react";
import Link from "next/link";

const JobItem = React.memo(({ job }) => {
  // Use slug ID directly
  const jobSlug = job.id;

  return (
    <li
      className={`grid grid-cols-4 gap-x-3 md:gap-x-5 gap-y-4 md:gap-y-5 ${job.id === "diploma-engineers-electronics" ? "pt-0 pb-6 lg:pt-6" : "py-6"
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
          href={`/careers/${jobSlug}`}
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
  );
});

JobItem.displayName = "JobItem";

export default JobItem;
