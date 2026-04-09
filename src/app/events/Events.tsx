"use client";
import React, { useState, useEffect } from "react";
import NewsEventsCard from "@/components/NewsEventsCard";
import NewsEventsCardSuspense from "@/components/suspense/NewsEventsCardSuspense";
import { Calendar, SortAsc, Filter, FilterX } from "lucide-react";
import { useHeaderHeight } from "@/context/HeaderHeightContext";
import FilterChipDropdown from "@/components/common/FilterChipDropdown";
import { sortItems } from "@/utils/dateUtils";
import { useContentFilter } from "@/hooks/useContentFilter";
import { getAllItems } from "@/lib/cms-actions";
import { TABLES } from "@/lib/database-schema";
import { MobileUnifiedFilter } from "@/components/common/MobileUnifiedFilter";

// Main Events Component
const Events = ({ id }) => {
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
  } = useContentFilter(
    () => getAllItems(TABLES.EVENTS), 
    { date: "all", eventType: "all" }
  );

  const activeTab = filters.eventType;
  const setActiveTab = (val: string) => setFilters({ ...filters, eventType: val });

  const [showTabs, setShowTabs] = useState(true);

  // Initial check for upcoming events to decide if we show tabs
  useEffect(() => {
    if (currentItems.length > 0 && showTabs) {
       const hasUpcoming = currentItems.some(e => e.eventType === "upcoming");
       if (!hasUpcoming && filters.eventType === "all") {
          // setShowTabs(false); // Optional: hide if none found initially
       }
    }
  }, [currentItems, showTabs, filters.eventType]);

  const renderTabs = () => {
    if (!showTabs) return null;
    return (
      <div className="flex items-center justify-start flex-wrap w-fit gap-2.5 sm:gap-4 lg:gap-6 mb-7 md:mb-10">
        {["all", "upcoming", "past"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-2 w-fit flex items-center justify-center rounded-full text-sm sm:text-bodySmall leading-[120%] font-neueMontreal border-1 cursor-pointer transition-colors capitalize ${activeTab === tab
              ? "text-white bg-primary border-primary"
              : "text-textPrimary border-textPrimary hover:text-primary hover:border-primary"
              }`}
          >
            {tab} Events
          </button>
        ))}
      </div>
    );
  };

  return (
    <div id={id} className="relative">
      {/* Sticky Filter Header - Rendered once for all states */}
      <div
        style={{ top: headerHeight - 1 }}
        className="sticky z-40 bg-white border-b px-3.5 md:px-5 lg:px-10 py-4 shadow-2xs"
      >
        <div className="flex items-center justify-between gap-6 max-w-[1920px] mx-auto">
          <div className="flex items-center gap-3 text-primary">
            <Calendar size={24} />
            <h3 className="text-heading4 text-black font-neueMontrealMd">
              Events
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
                  label="Status"
                  icon={Calendar}
                  value={activeTab}
                  onChange={(val) => setActiveTab(val)}
                  rightAlign={true}
                  options={[
                    { label: "All Events", value: "all" },
                    { label: "Upcoming Events", value: "upcoming" },
                    { label: "Past Events", value: "past" },
                  ]}
                />
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
                      id: "status",
                      radioName: "event-status",
                      value: activeTab,
                      onChange: setActiveTab,
                      options: [
                        { label: "All Events", value: "all" },
                        { label: "Upcoming", value: "upcoming" },
                        { label: "Past Events", value: "past" },
                      ],
                    },
                    {
                      id: "year",
                      radioName: "event-year",
                      value: filters.date,
                      onChange: (val) => setFilters({ ...filters, date: val }),
                      options: years.map((y) => ({ label: y === "all" ? "All Years" : y, value: y })),
                    },
                    {
                      id: "sort",
                      radioName: "event-sort",
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
                <li key={i} className="col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-4">
                  <NewsEventsCardSuspense variant="event" />
                </li>
              ))}
            </ul>
          ) : error ? (
            <div className="text-textSecondary text-heading4 py-20 text-center">
              Data not available
            </div>
          ) : currentItems.length === 0 ? (
            <div className="text-textSecondary text-heading4 py-20 text-center">
              No events found matching your criteria
            </div>
          ) : (
            <ul className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 w-full h-fit gap-y-7.5 md:gap-y-10 gap-4">
              {currentItems.map((event, index) => (
                <li key={event.id} className="col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-4">
                  <NewsEventsCard
                    newsEventImg={event.newsEventImg}
                    title={event.title}
                    date={event.date}
                    source={event.source}
                    link={event.link || `/events/${event.id}`}
                    imgBgClass={event.imgBgClass}
                    variant="event"
                    id={event.id}
                    eventType={event.eventType || "past"}
                    priority={index <= 5}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};

export default Events;

