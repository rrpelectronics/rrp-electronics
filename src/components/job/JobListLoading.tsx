import React from "react";
import HeadingCenter from "@/components/HeadingCenter";

const JobListLoading = () => (
  <>
    {[1, 2, 3, 4].map((item, index) => (
      <li
        key={index}
        className={`grid grid-cols-4 gap-x-3 md:gap-x-5 gap-y-4 md:gap-y-5 ${
          index === 0 ? "pt-0 pb-6 lg:pt-6" : "py-6"
        } border-b-1 border-b-borderPrimary`}
      >
        <div className="col-span-4 lg:col-span-2 h-6 bg-gray-200 animate-pulse rounded w-3/4"></div>
        <div className="flex justify-between col-span-4 lg:col-span-2">
          <div className="h-5 bg-gray-200 animate-pulse rounded w-1/3"></div>
          <div className="flex justify-center items-center gap-3 lg:gap-4">
            <div className="h-5 bg-gray-200 animate-pulse rounded w-20"></div>
            <div className="h-6 w-6 bg-gray-200 animate-pulse rounded-full"></div>
          </div>
        </div>
      </li>
    ))}
  </>
);

export default JobListLoading;
