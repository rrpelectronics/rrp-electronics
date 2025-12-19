"use client"
import React from 'react'

const JobDetailsLoading = () => {
  return (
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
}

export default JobDetailsLoading