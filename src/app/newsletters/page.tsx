"use client";
import React, { useState, useEffect, useMemo } from "react";
import { getAllItems } from "@/lib/cms-actions";
import { TABLES } from "@/lib/database-schema";
import { Mail, SortAsc, FileText, ChevronDown, Check, ArrowUpDown, FilterX } from "lucide-react";
import { useHeaderHeight } from "@/context/HeaderHeightContext";
import Link from "next/link";
import NewsletterCardSuspense from "@/components/suspense/NewsletterCardSuspense";
import FilterChipDropdown from "@/components/common/FilterChipDropdown";
import { useContentFilter } from "@/hooks/useContentFilter";


import { MobileUnifiedFilter } from "@/components/common/MobileUnifiedFilter";

// Simplified Newsletter Card with PDF icon and Orange theme
const NewsletterCard = ({ title, date, link }) => {
  return (
    <Link
      href={link}
      target="_blank"
      className="flex gap-4 items-stretch"
    >
      <div className="flex flex-col flex-1 py-1 justify-between">
        <div className="flex w-full gap-3">
          <FileText size={32} strokeWidth={1.5} className="text-primary" />
          <div className="flex flex-col gap-2 w-full">
            {/* <p className="text-textPrimary text-caption lg:text-bodySmallest leading-[120%] font-neueMontreal">
              {date}
            </p> */}
            <p className="text-bodyLarge text-black leading-[120%] md:w-[90%] font-neueMontrealMd">
              {title}
            </p>
          </div>
        </div>
        <p className="ml-11 w-fit text-sm text-primary font-neueMontreal leading-[120%] underline decoration-solid decoration-primary">
          View Insights
        </p>
      </div>
    </Link>
  );
};

const NewslettersPage = () => {
  const headerHeight = useHeaderHeight();
  
  const fetchNewsletters = useMemo(() => () => getAllItems(TABLES.NEWSLETTERS), []);
  const {
     filteredItems: sortedNewsletters,
     loading: isLoading,
     sortBy,
     setSortBy,
     isFiltered,
     reset
  } = useContentFilter(fetchNewsletters, { date: "all" });

  return (
    <main style={{ marginTop: headerHeight }} className="min-h-screen bg-white">
      {/* Sticky Filter Header */}
      <div
        style={{ top: headerHeight - 1 }}
        className="sticky z-40 bg-white border-b px-3.5 md:px-5 lg:px-10 py-4 shadow-2xs"
      >
        <div className="flex items-center justify-between gap-8 md:gap-15 max-w-[1920px] mx-auto">
          <div className="flex items-center gap-3 text-primary">
            <Mail size={20} />
            <h1 className="text-bodyLarge md:text-heading4 text-black font-neueMontrealMd font-medium">
              Newsletters
            </h1>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1 md:pb-0 relative z-[110] flex-nowrap">
            {/* Desktop Filters */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={reset}
                disabled={!isFiltered}
                className={`text-[16px] font-medium transition-all whitespace-nowrap flex items-center gap-1.5 mr-2 ${isFiltered ? "text-primary hover:opacity-70 cursor-pointer" : "text-gray-400 cursor-default opacity-50"
                  }`}
              >
                <FilterX size={16} />
                Reset
              </button>
              <FilterChipDropdown
                label="Sort By"
                icon={SortAsc}
                value={sortBy}
                onChange={setSortBy}
                rightAlign={true}
                options={[
                  { label: "Latest First", value: "latest" },
                  { label: "Oldest First", value: "old" },
                ]}
              />
            </div>

            {/* Mobile Unified Filter */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={reset}
                disabled={!isFiltered}
                className={`text-sm lg:text-[16px] font-medium transition-all whitespace-nowrap px-2 flex items-center gap-1 ${isFiltered ? "text-primary hover:opacity-70 cursor-pointer" : "text-gray-400 cursor-default opacity-50"
                  }`}
              >
                <FilterX size={14} />
                Reset
              </button>
              <MobileUnifiedFilter 
                buttonLabel="Sort"
                icon={ArrowUpDown}
                sections={[
                  {
                    id: "sort",
                    radioName: "newsletter-sort",
                    value: sortBy,
                    onChange: setSortBy,
                    options: [
                      { label: "Latest First", value: "latest" },
                      { label: "Oldest First", value: "old" },
                    ]
                  }
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      <section className="@container w-full h-fit px-3.5 md:px-5 lg:px-10 py-12 lg:py-16">
        <div className="max-w-[1920px] mx-auto">
          {isLoading ? (
            <ul className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 w-full h-fit gap-y-12 md:gap-y-16 gap-6 md:gap-10">
              {[...Array(3)].map((_, i) => (
                <li key={i} className="col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-6 xl:col-span-4">
                  <NewsletterCardSuspense />
                </li>
              ))}
            </ul>
          ) : sortedNewsletters.length > 0 ? (
            <ul className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 w-full h-fit gap-y-12 md:gap-y-16 gap-6 md:gap-10">
              {sortedNewsletters.map((n) => (
                <li key={n.id} className="col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-6 xl:col-span-4">
                  <NewsletterCard
                    title={n.title}
                    date={n.date}
                    link={n.link}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="col-span-12 py-32 text-center">
              <div className="inline-flex p-6 bg-gray-50 rounded-full mb-6">
                <FileText size={32} className="text-gray-300" />
              </div>
              <p className="text-heading4 text-gray-400">No newsletters found.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default NewslettersPage;
