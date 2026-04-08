"use client";
import React, { useState, useEffect, useMemo } from "react";
import { fetchEvents } from "@/utils/eventFetch";
import NewsEventsCard from "@/components/NewsEventsCard";
import NewsEventsCardSuspense from "@/components/suspense/NewsEventsCardSuspense";
import { Calendar, SortAsc, Filter, Layers, ChevronDown, Check, ArrowUpDown, FilterX } from "lucide-react";
import { useHeaderHeight } from "@/context/HeaderHeightContext";

// Filter Chip Dropdown Component
const FilterChipDropdown = ({ value, onChange, options = [], label, icon: Icon, rightAlign = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, right: 0 });
  const buttonRef = React.useRef(null);
  const timeoutRef = React.useRef(null);
  const selectedOption = options.find((opt) => opt.value === value) || options[0] || { label: "Select", value: "" };

  const updateCoords = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom,
        left: rect.left,
        right: (typeof window !== 'undefined' ? window.innerWidth : 1200) - rect.right,
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("scroll", updateCoords);
      window.addEventListener("resize", updateCoords);
    }
    return () => {
      window.removeEventListener("scroll", updateCoords);
      window.removeEventListener("resize", updateCoords);
    };
  }, [isOpen]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    updateCoords();
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  return (
    <div
      className="relative flex-shrink-0"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        ref={buttonRef}
        type="button"
        className={`px-5 py-2.5 rounded-full text-[16px] flex items-center gap-3 border transition-all cursor-pointer active:scale-95 ${isOpen
          ? "border-primary text-primary"
          : "border-gray-200 text-gray-700 bg-white hover:border-gray-900"
          }`}
      >
        <div className="flex items-center gap-2 pointer-events-none">
          {Icon && <Icon size={16} className={isOpen ? "text-primary" : "text-gray-400"} />}
          <span className="text-gray-400 font-medium">{label}:</span>
          <span className="text-inherit">{selectedOption.label}</span>
        </div>
        <ChevronDown
          size={16}
          className={`transition-transform duration-300 pointer-events-none ${isOpen ? "rotate-180 text-primary" : "text-gray-400"}`}
        />
      </button>

      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: `${coords.top + 10}px`,
            ...(rightAlign ? { right: `${coords.right}px` } : { left: `${coords.left}px` }),
            zIndex: 9999
          }}
          className="animate-in fade-in slide-in-from-top-2 duration-200 h-fit w-max"
          onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }}
        >
          <ul className="min-w-[220px] bg-white border border-gray-100 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] py-3">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-5 py-3 text-[16px] cursor-pointer flex items-center justify-between hover:bg-gray-50 transition-colors ${value === option.value ? "text-primary font-neueMontrealMd" : "text-gray-600"
                  }`}
              >
                {option.label}
                {value === option.value && <Check size={18} className="text-primary" />}
              </button>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Mobile Unified Filter Component
const MobileUnifiedFilterEvents = ({ sortBy, setSortBy, activeTab, setActiveTab, filters, setFilters, years }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, right: 0 });
  const buttonRef = React.useRef(null);

  const updateCoords = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom,
        right: (typeof window !== 'undefined' ? window.innerWidth : 375) - rect.right
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("scroll", updateCoords);
      window.addEventListener("resize", updateCoords);
    }
    return () => {
      window.removeEventListener("scroll", updateCoords);
      window.removeEventListener("resize", updateCoords);
    };
  }, [isOpen]);

  const handleOpen = () => {
    updateCoords();
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative flex-shrink-0">
      <button
        ref={buttonRef}
        onClick={handleOpen}
        className={`px-3.5 lg:px-5 py-2 lg:py-2.5 rounded-full text-sm lg:text-[16px] flex items-center gap-2 lg:gap-3 border transition-all cursor-pointer ${isOpen ? "border-primary text-primary" : "border-gray-200 text-gray-700 bg-white hover:border-gray-900"}`}
      >
        <Filter size={16} className={isOpen ? "text-primary" : "text-gray-400"} />
        <span className="font-medium text-inherit">Filter</span>
        <ChevronDown size={16} className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : "text-gray-400"}`} />
      </button>

      {isOpen && (
        <div
          style={{ top: `${coords.top + 10}px`, right: `${coords.right}px` }}
          className="fixed z-[9999] animate-in fade-in slide-in-from-top-2 h-fit w-max"
        >
          {/* Invisible overlay to strictly close upon clicking outside */}
          <div className="fixed inset-0 select-none bg-black/0 cursor-pointer" onClick={() => setIsOpen(false)} style={{ zIndex: -1 }} />
          <div className="relative z-10 min-w-full bg-white border border-gray-100 rounded-2xl shadow-[0_10px_50px_rgba(0,0,0,0.15)] py-3 overflow-y-auto max-h-[70vh] no-scrollbar">
            {[
              { label: 'All Events', value: 'all' },
              { label: 'Upcoming', value: 'upcoming' },
              { label: 'Past', value: 'past' }
            ].map((tab) => (
              <label key={tab.value} className={`w-full px-4 py-2.5 text-sm cursor-pointer flex items-center justify-between hover:bg-gray-50 transition-colors ${activeTab === tab.value ? 'text-primary font-neueMontrealMd' : 'text-gray-600'}`}>
                <input
                  type="radio"
                  name="event-tab"
                  value={tab.value}
                  checked={activeTab === tab.value}
                  onChange={() => {
                    setActiveTab(tab.value);
                    setTimeout(() => setIsOpen(false), 100);
                  }}
                  className="sr-only"
                />
                {tab.label}
              </label>
            ))}

            <div className="h-px bg-gray-100 my-2" />

            {/* Year Filters */}
            {years.map((year) => (
              <label
                key={year}
                className={`w-full px-4 py-2.5 text-sm cursor-pointer flex items-center justify-between hover:bg-gray-50 transition-colors ${filters.date === year ? 'text-primary font-neueMontrealMd' : 'text-gray-600'}`}
              >
                <input
                  type="radio"
                  name="event-year"
                  value={year}
                  checked={filters.date === year}
                  onChange={() => {
                    setFilters({ ...filters, date: year });
                    setTimeout(() => setIsOpen(false), 100);
                  }}
                  className="sr-only"
                />
                {year === "all" ? "All Years" : year}
              </label>
            ))}

            <div className="h-px bg-gray-100 my-2" />

            {/* Sorting */}
            {[
              { label: 'Latest First', value: 'latest' },
              { label: 'Oldest First', value: 'old' }
            ].map((option) => (
              <label
                key={option.value}
                className={`w-full px-4 py-2.5 text-sm cursor-pointer flex items-center justify-between hover:bg-gray-50 transition-colors ${sortBy === option.value ? 'text-primary font-neueMontrealMd' : 'text-gray-600'}`}
              >
                <input
                  type="radio"
                  name="event-sort"
                  value={option.value}
                  checked={sortBy === option.value}
                  onChange={() => {
                    setSortBy(option.value);
                    setTimeout(() => setIsOpen(false), 100);
                  }}
                  className="sr-only"
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Main Events Component
const Events = ({ id }) => {
  const headerHeight = useHeaderHeight();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [showTabs, setShowTabs] = useState(true);

  // Pagination & Additional Filtering state
  const [filters, setFilters] = useState({
    date: "all",
  });
  const [sortBy, setSortBy] = useState("latest"); // latest, old, az
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        setLoading(true);
        setError(null);
        const eventData = await fetchEvents();
        setEvents(eventData);
        
        // Initial tabs check
        const upcomingEvents = eventData.filter(e => e.eventType === "upcoming");
        setShowTabs(upcomingEvents.length > 0);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEventsData();
  }, []);

  // Robust date parsing helper
  const getParsedDate = (dateStr) => {
    if (!dateStr) return new Date(0);
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) return d;

    // Try parsing DD/MM/YYYY or DD-MM-YYYY
    const parts = dateStr.split(/[\/\-]/);
    if (parts.length === 3) {
      if (parts[0].length === 4) return new Date(parts[0], parts[1] - 1, parts[2]); // YYYY/MM/DD
      if (parts[2].length === 4) return new Date(parts[2], parts[1] - 1, parts[0]); // DD/MM/YYYY
    }

    // Regex fallback for year
    const yearMatch = dateStr.match(/\b(20\d{2})\b/);
    if (yearMatch) return new Date(parseInt(yearMatch[1]), 0, 1);

    return new Date(0);
  };

  // Filter and Sort events
  const filteredAndSortedEvents = useMemo(() => {
    let result = [...events];

    // Filter by Tab (Status)
    if (activeTab === "upcoming") {
      result = result.filter(e => e.eventType === "upcoming");
    } else if (activeTab === "past") {
      result = result.filter(e => e.eventType === "past");
    }

    // Filter by Date (Year)
    if (filters.date !== "all") {
      result = result.filter((item) => {
        const d = getParsedDate(item.date);
        return d.getFullYear().toString() === filters.date;
      });
    }

    // Sort
    if (sortBy === "az") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "latest") {
      result.sort((a, b) => getParsedDate(b.date).getTime() - getParsedDate(a.date).getTime());
    } else if (sortBy === "old") {
      result.sort((a, b) => getParsedDate(a.date).getTime() - getParsedDate(b.date).getTime());
    }

    return result;
  }, [events, filters, sortBy, activeTab]);

  // Pagination logic
  // const totalPages = Math.ceil(filteredAndSortedEvents.length / itemsPerPage);
  // const currentItems = filteredAndSortedEvents.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );
  const currentItems = filteredAndSortedEvents;

  const isFiltered = filters.date !== "all" || sortBy !== "latest" || activeTab !== "all";

  const years = useMemo(() => {
    const y = new Set(
      events
        .map((item) => {
          if (!item.date) return null;
          const d = new Date(item.date);
          if (!isNaN(d.getTime())) {
            return d.getFullYear().toString();
          }
          // Fallback: search for a 4-digit year in the string
          const match = item.date.match(/\b(20\d{2})\b/);
          return match ? match[1] : null;
        })
        .filter(Boolean)
    );
    return ["all", ...Array.from(y).sort((a, b) => b.localeCompare(a))];
  }, [events]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy, activeTab, itemsPerPage]);

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
      {/* Sticky Filter Header */}
      <div
        style={{ top: headerHeight - 1 }}
        className="sticky z-40 bg-white border-b px-3.5 md:px-5 lg:px-10 py-4 shadow-2xs"
      >
        <div className="flex items-center justify-between gap-6 max-w-[1920px] mx-auto">
          <div className="flex items-center gap-3 text-primary">
            <Calendar size={24} />
            <h3 className="text-heading4 text-black  font-neueMontrealMd">
              Events
            </h3>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1 md:pb-0 relative z-[110] flex-nowrap">

            {/* Desktop Filters */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={() => {
                  setFilters({ ...filters, date: "all" });
                  setSortBy("latest");
                  setActiveTab("all");
                }}
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
                onClick={() => {
                  setFilters({ ...filters, date: "all" });
                  setSortBy("latest");
                  setActiveTab("all");
                }}
                disabled={!isFiltered}
                className={`text-sm lg:text-[16px] font-medium transition-all whitespace-nowrap px-2 flex items-center gap-1 ${isFiltered ? "text-primary hover:opacity-70 cursor-pointer" : "text-gray-400 cursor-default opacity-50"
                  }`}
              >
                <FilterX size={14} />
                Reset
              </button>
              <MobileUnifiedFilterEvents
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                sortBy={sortBy}
                setSortBy={setSortBy}
                filters={filters}
                setFilters={setFilters}
                years={years}
              />
            </div>

            {/* <FilterChipDropdown
              label="Size"
              icon={Layers}
              value={itemsPerPage}
              onChange={setItemsPerPage}
              rightAlign={true}
              options={[
                { label: "4", value: 4 },
                { label: "6", value: 6 },
                { label: "8", value: 8 },
                { label: "10", value: 10 },
              ]}
            /> */}
          </div>
        </div>
      </div>

      <section className="@container w-full h-fit px-3.5 md:px-5 lg:px-10 py-12">
        <div className="max-w-[1920px] mx-auto">
          {/* renderTabs() */}

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
            <>
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

              {/* Pagination */}
              {/* totalPages > 1 && (
                <div className="mt-16 flex items-center justify-center gap-4 flex-wrap px-4">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-primary cursor-pointer disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-full border transition-all cursor-pointer flex items-center justify-center ${currentPage === page
                          ? "bg-primary text-white border-primary"
                          : "border-gray-200 text-gray-500 hover:border-primary hover:text-primary"
                          }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-primary cursor-pointer disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              ) */}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Events;

