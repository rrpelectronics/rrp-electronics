"use client";
import React, { useState, useEffect, useMemo } from "react";
import { fetchEvents } from "@/utils/eventFetch";
import NewsEventsCard from "@/components/NewsEventsCard";
import NewsEventsCardSuspense from "@/components/suspense/NewsEventsCardSuspense";
import { Calendar, SortAsc, Filter, Layers, ChevronDown, Check, ArrowUpDown } from "lucide-react";
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
              <li
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`px-5 py-3 text-[16px] cursor-pointer flex items-center justify-between hover:bg-gray-50 transition-colors ${value === option.value ? "text-primary font-neueMontrealMd" : "text-gray-600"
                  }`}
              >
                {option.label}
                {value === option.value && <Check size={18} className="text-primary" />}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Mobile Unified Filter Component
const MobileUnifiedFilterEvents = ({ sortBy, setSortBy, activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0 });
  const buttonRef = React.useRef(null);

  const updateCoords = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({ top: rect.bottom });
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
          style={{ top: `${coords.top + 10}px` }}
          className="fixed right-4 sm:right-5 z-[9999] animate-in fade-in slide-in-from-top-2 h-fit w-max"
        >
          {/* Invisible overlay to strictly close upon clicking outside */}
          <div className="fixed inset-0 select-none bg-transparent" onClick={() => setIsOpen(false)} style={{ zIndex: -1 }} />
          <ul className="min-w-full bg-white border border-gray-100 rounded-2xl shadow-[0_10px_50px_rgba(0,0,0,0.15)] py-3 overflow-y-auto max-h-[70vh] no-scrollbar">
            <li onClick={() => { setActiveTab('all'); setIsOpen(false); }} className={`px-4 py-2.5 text-sm cursor-pointer flex items-center justify-between hover:bg-gray-50 transition-colors ${activeTab === 'all' ? 'text-primary font-neueMontrealMd' : 'text-gray-600'}`}>
              All Events
            </li>
            <li onClick={() => { setActiveTab('upcoming'); setIsOpen(false); }} className={`px-4 py-2.5 text-sm cursor-pointer flex items-center justify-between hover:bg-gray-50 transition-colors ${activeTab === 'upcoming' ? 'text-primary font-neueMontrealMd' : 'text-gray-600'}`}>
              Upcoming
            </li>
            <li onClick={() => { setActiveTab('past'); setIsOpen(false); }} className={`px-4 py-2.5 text-sm cursor-pointer flex items-center justify-between hover:bg-gray-50 transition-colors ${activeTab === 'past' ? 'text-primary font-neueMontrealMd' : 'text-gray-600'}`}>
              Past
            </li>

            <li onClick={() => { setSortBy(sortBy === 'latest' ? 'old' : 'latest'); setIsOpen(false); }} className={`px-4 py-2.5 text-sm cursor-pointer flex items-center justify-between hover:bg-gray-50 transition-colors ${sortBy === 'latest' || sortBy === 'old' ? 'text-primary font-neueMontrealMd' : 'text-gray-600'}`}>
              <div className="flex items-center gap-3">Date <ArrowUpDown size={14} /></div>
            </li>
            <li onClick={() => { setSortBy('az'); setIsOpen(false); }} className={`px-4 py-2.5 text-sm cursor-pointer flex items-center justify-between hover:bg-gray-50 transition-colors ${sortBy === 'az' ? 'text-primary font-neueMontrealMd' : 'text-gray-600'}`}>
              <div className="flex items-center gap-3">A-Z <ArrowUpDown size={14} /></div>
            </li>
          </ul>
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

        // Fetch all events for the current tab category
        let eventType = null;
        if (activeTab === "past") {
          eventType = "past";
        } else if (activeTab === "upcoming") {
          eventType = "upcoming";
        }

        const eventData = await fetchEvents(null, eventType);
        setEvents(eventData);

        // If on "all" tab, check if we should show tabs (based on upcoming presence)
        if (activeTab === "all") {
          const upcomingEvents = eventData.filter(e => e.eventType === "upcoming");
          setShowTabs(upcomingEvents.length > 0);
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEventsData();
  }, [activeTab]);

  // Filter and Sort events
  const filteredAndSortedEvents = useMemo(() => {
    let result = [...events];

    // Filter by Date (Year)
    if (filters.date !== "all") {
      result = result.filter((item) => {
        const year = new Date(item.date).getFullYear().toString();
        return year === filters.date;
      });
    }

    // Sort
    if (sortBy === "az") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "latest") {
      result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === "old") {
      result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }

    return result;
  }, [events, filters, sortBy]);

  // Pagination logic
  // const totalPages = Math.ceil(filteredAndSortedEvents.length / itemsPerPage);
  // const currentItems = filteredAndSortedEvents.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );
  const currentItems = filteredAndSortedEvents;

  const years = useMemo(() => {
    const y = new Set(
      events
        .map((item) => {
          const d = new Date(item.date);
          return isNaN(d.getTime()) ? null : d.getFullYear().toString();
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
                  { label: "A-Z", value: "az" },
                ]}
              />
            </div>

            {/* Mobile Unified Filter */}
            <div className="flex lg:hidden items-center">
              <MobileUnifiedFilterEvents activeTab={activeTab} setActiveTab={setActiveTab} sortBy={sortBy} setSortBy={setSortBy} />
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

