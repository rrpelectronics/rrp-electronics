"use client";
import React from "react";
import { fetchNews } from "@/utils/newsFetch";
import NewsEventsCard from "@/components/NewsEventsCard";
import NewsEventsCardSuspense from "@/components/suspense/NewsEventsCardSuspense";
import { Newspaper, SortAsc, Filter, FilterX } from "lucide-react";
import { useHeaderHeight } from "@/context/HeaderHeightContext";
import FilterChipDropdown from "@/components/common/FilterChipDropdown";
import { useContentFilter } from "@/hooks/useContentFilter";
import { MobileUnifiedFilter } from "@/components/common/MobileUnifiedFilter";

// Main News Component
const News = ({ id }) => {
  const headerHeight = useHeaderHeight();
  
  const {
    filteredItems: currentItems,
    loading,
    error,
    filters,
    setFilters,
    sortBy,
    setSortBy,
    isFiltered,
    years,
    reset
  } = useContentFilter(fetchNews, { date: "all", source: "all" });

  return (
    <div id={id} className="relative">
      {/* Sticky Filter Header - Rendered once for all states */}
      <div
        style={{ top: headerHeight - 1 }}
        className="sticky z-40 bg-white border-b px-3.5 md:px-5 lg:px-10 py-4 shadow-2xs"
      >
        <div className="flex items-center justify-between gap-10 md:gap-15 max-w-[1920px] mx-auto">
          <div className="flex items-center gap-4 text-primary">
            <Newspaper size={24} />
            <h3 className="text-heading4 text-black font-neueMontrealMd font-medium">
              News
            </h3>
          </div>

          {!loading && !error && (
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
                  label="Year"
                  icon={Filter}
                  value={filters.date}
                  onChange={(val) => setFilters({ ...filters, date: val })}
                  rightAlign={true}
                  options={years.map((y) => ({ label: y === "all" ? "All Years" : y, value: y }))}
                />
                <FilterChipDropdown
                  label="Sort"
                  icon={SortAsc}
                  value={sortBy}
                  onChange={setSortBy}
                  rightAlign={true}
                  options={[
                    { label: "Latest", value: "latest" },
                    { label: "Oldest", value: "old" },
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
                  sections={[
                    {
                      id: "year",
                      radioName: "news-year",
                      value: filters.date,
                      onChange: (val) => setFilters({ ...filters, date: val }),
                      options: years.map((y) => ({ label: y === "all" ? "All Years" : y, value: y })),
                    },
                    {
                      id: "sort",
                      radioName: "news-sort",
                      value: sortBy,
                      onChange: setSortBy,
                      options: [
                        { label: "Latest First", value: "latest" },
                        { label: "Oldest First", value: "old" },
                      ],
                    },
                  ]}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <section className="@container w-full h-fit px-3.5 md:px-5 lg:px-10 py-12">
        <div className="max-w-[1920px] mx-auto">
          {loading ? (
            <ul className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 w-full h-fit gap-y-7.5 md:gap-y-10 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <li key={i} className="col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4">
                  <NewsEventsCardSuspense />
                </li>
              ))}
            </ul>
          ) : error ? (
            <div className="col-span-12 py-32 text-center">
              <div className="inline-flex p-6 bg-red-50 rounded-full mb-6">
                <Newspaper size={32} className="text-red-300" />
              </div>
              <p className="text-heading4 text-gray-400">Failed to load news. Please try again later.</p>
            </div>
          ) : (
            <ul className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 w-full h-fit gap-y-7.5 md:gap-y-10 gap-4">
              {currentItems.length > 0 ? (
                currentItems.map((newsItem, index) => {
                  if (!newsItem.newsEventImg || newsItem.newsEventImg.trim() === "")
                    return null;

                  return (
                    <li key={newsItem.id} className="col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4">
                      <NewsEventsCard
                        imgBgClass="center"
                        newsEventImg={newsItem.newsEventImg}
                        date={newsItem.date}
                        source={newsItem.source}
                        title={newsItem.title}
                        link={newsItem.link}
                        target="_blank"
                        id={newsItem.id}
                        priority={index <= 5}
                      />
                    </li>
                  );
                })
              ) : (
                <div className="col-span-12 py-32 text-center">
                  <div className="inline-flex p-6 bg-gray-50 rounded-full mb-6">
                    <Filter size={32} className="text-gray-300" />
                  </div>
                  <p className="text-heading4 text-gray-400">No news found matching your filters.</p>
                </div>
              )}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};

export default News;

