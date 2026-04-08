import React from "react";

const NewsletterCardSuspense = () => {
  return (
    <div className="flex flex-col gap-3.5 md:gap-4.5 flex-1 py-1 justify-between animate-pulse">
      <div className="flex w-full gap-3">
        {/* Icon placeholder */}
        <div className="w-8 h-8 rounded-md bg-gray-200 shrink-0" />
        
        <div className="flex flex-col gap-2 w-full">
          {/* Date placeholder */}
          <div className="h-4 bg-gray-200 rounded w-24 mb-1" />
          
          {/* Title placeholders */}
          <div className="h-5 bg-gray-200 rounded w-full" />
          <div className="h-5 bg-gray-200 rounded w-4/5" />
        </div>
      </div>
      
      {/* Link placeholder with left margin matching the icon + gap */}
      <div className="ml-11 h-4 bg-gray-200 rounded w-24" />
    </div>
  );
};

export default NewsletterCardSuspense;
