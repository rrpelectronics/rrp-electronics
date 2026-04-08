"use client";
import React, { useState, useEffect, useMemo } from "react";
import { fetchNews } from "@/utils/newsFetch";
import NewsEventsCard from "@/components/NewsEventsCard";
import NewsEventsCardSuspense from "@/components/suspense/NewsEventsCardSuspense";
import { Newspaper, SortAsc, Filter, Layers, Globe, ChevronDown, Check, ArrowUpDown, FilterX } from "lucide-react";
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
          <span className="text-gray-400">{label}:</span>
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
                className={`w-full px-5 py-3 text-[16px] cursor-pointer flex items-center justify-between hover:bg-gray-50 transition-colors ${value === option.value ? "text-primary font-medium" : "text-gray-600"
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
const MobileUnifiedFilterNews = ({ sortBy, setSortBy, filters, setFilters, years }) => {
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
        className={`px-3.5 lg:px-5 py-2 lg:py-2.5 rounded-full text-sm lg:text-[16px] gap-2 lg:gap-3 flex justify-center items-center border transition-all cursor-pointer ${isOpen ? "border-primary text-primary" : "border-gray-200 text-gray-700 bg-white hover:border-gray-900"}`}
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
          <div className="fixed inset-0 select-none bg-black/0 cursor-pointer" onClick={() => setIsOpen(false)} style={{ zIndex: -1 }} />
          <div className="relative z-10 min-w-full bg-white border border-gray-100 rounded-2xl shadow-[0_10px_50px_rgba(0,0,0,0.15)] py-3 overflow-y-auto max-h-[70vh] no-scrollbar">
            {/* Year Filters */}
            {years.map((year) => (
              <label
                key={year}
                className={`w-full px-4 py-2.5 text-sm cursor-pointer flex items-center justify-between hover:bg-gray-50 transition-colors ${filters.date === year ? 'text-primary font-neueMontrealMd' : 'text-gray-600'}`}
              >
                <input
                  type="radio"
                  name="news-year"
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
                  name="news-sort"
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

// Main News Component
const News = ({ id }) => {
  const headerHeight = useHeaderHeight();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination & Filtering state
  const [filters, setFilters] = useState({
    date: "all",
    source: "all",
  });
  const [sortBy, setSortBy] = useState("latest"); // latest, old, az
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const newsData = await fetchNews(); // Fetch all news
        setNews(newsData);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsData();
  }, []);

  // Robust date parsing helper
  const getParsedDate = (dateStr) => {
    if (!dateStr || typeof dateStr !== 'string') return new Date(0);
    const trimmed = dateStr.trim();
    const d = new Date(trimmed);
    if (!isNaN(d.getTime())) return d;

    // Try parsing parts (supports DD/MM/YYYY, DD-MM-YYYY, DD Month YYYY, etc.)
    const parts = trimmed.split(/[\/\-\s,.]+/).filter(Boolean);
    
    // Attempt to find a year
    let year = -1;
    let month = 0; // Default to Jan
    let day = 1;

    // Months map for name parsing
    const monthNames = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

    parts.forEach((part, i) => {
      const num = parseInt(part);
      if (part.length === 4 && !isNaN(num) && num > 1900) {
        year = num;
      } else {
        const lower = part.toLowerCase();
        const mIdx = monthNames.findIndex(m => lower.startsWith(m));
        if (mIdx !== -1) {
          month = mIdx;
        } else if (!isNaN(num) && num > 0 && num <= 31) {
          // If we haven't assigned day yet, or if it's the first part
          if (day === 1 || i === 0) day = num;
        }
      }
    });

    if (year !== -1) {
      return new Date(year, month, day);
    }

    // Regex fallback for year if all else fails
    const yearMatch = trimmed.match(/\b(20\d{2})\b/);
    if (yearMatch) return new Date(parseInt(yearMatch[1]), 0, 1);

    return new Date(0);
  };

  // Filter and Sort news
  const isFiltered = filters.date !== "all" || sortBy !== "latest";

  const filteredAndSortedNews = useMemo(() => {
    let result = [...news];

    // Filter by Source
    if (filters.source !== "all") {
      result = result.filter((item) => item.source === filters.source);
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
      result.sort((a, b) => {
        const dateA = getParsedDate(a.date).getTime();
        const dateB = getParsedDate(b.date).getTime();
        if (dateA === dateB) return b.id.localeCompare(a.id); // Tie-breaker
        return dateB - dateA;
      });
    } else if (sortBy === "old") {
      result.sort((a, b) => {
        const dateA = getParsedDate(a.date).getTime();
        const dateB = getParsedDate(b.date).getTime();
        if (dateA === dateB) return a.id.localeCompare(b.id); // Tie-breaker
        return dateA - dateB;
      });
    }

    return result;
  }, [news, filters, sortBy]);

  // Pagination logic
  // const totalPages = Math.ceil(filteredAndSortedNews.length / itemsPerPage);
  // const currentItems = filteredAndSortedNews.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );
  const currentItems = filteredAndSortedNews;

  // Get unique sources and years for filters
  const sources = useMemo(() => {
    const s = new Set(news.map((item) => item.source).filter(Boolean));
    return ["all", ...Array.from(s)];
  }, [news]);

  const years = useMemo(() => {
    const y = new Set(
      news
        .map((item) => {
          if (!item.date) return null;
          const d = new Date(item.date);
          if (!isNaN(d.getTime())) {
            return d.getFullYear().toString();
          }
          // Fallback: search for a 4-digit year in the string (e.g., "15/03/2026")
          const match = item.date.match(/\b(20\d{2})\b/);
          return match ? match[1] : null;
        })
        .filter(Boolean)
    );
    return ["all", ...Array.from(y).sort((a, b) => b.localeCompare(a))];
  }, [news]);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when filtering/sorting
  }, [filters, sortBy, itemsPerPage]);

  // Loading Skeleton
  if (loading) {
    return (
      <div id={id} className="relative">
        <div
          style={{ top: headerHeight - 1 }}
          className="sticky z-40 bg-white border-b px-3.5 md:px-5 lg:px-10 py-4 shadow-2xs"
        >
          <div className="flex items-center justify-between gap-10 md:gap-15 max-w-[1920px] mx-auto">
            <div className="flex items-center gap-3 text-primary">
              <Newspaper size={24} />
              <h3 className="text-heading4 text-black font-neueMontrealMd font-medium">
                News
              </h3>
            </div>
          </div>
        </div>

        <section className="@container w-full h-fit px-3.5 md:px-5 lg:px-10 py-12">
          <div className="max-w-[1920px] mx-auto">
            <ul className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 w-full h-fit gap-y-7.5 md:gap-y-10 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <li key={i} className="col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4">
                  <NewsEventsCardSuspense />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div id={id} className="relative">
        <div
          style={{ top: headerHeight - 1 }}
          className="sticky z-40 bg-white border-b px-3.5 md:px-5 lg:px-10 py-4 shadow-2xs"
        >
          <div className="flex items-center justify-between gap-10 md:gap-15 max-w-[1920px] mx-auto">
            <div className="flex items-center gap-3 text-primary">
              <Newspaper size={24} />
              <h3 className="text-heading4 text-black font-neueMontrealMd font-medium">
                News
              </h3>
            </div>
          </div>
        </div>

        <section className="@container w-full h-fit px-3.5 md:px-5 lg:px-10 py-12">
          <div className="max-w-[1920px] mx-auto">
            <div className="col-span-12 py-32 text-center">
              <div className="inline-flex p-6 bg-red-50 rounded-full mb-6">
                <Newspaper size={32} className="text-red-300" />
              </div>
              <p className="text-heading4 text-gray-400">Failed to load news. Please try again later.</p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div id={id} className="relative">
      {/* Sticky Filter Header */}
      <div
        style={{ top: headerHeight - 1 }}
        className="sticky z-40 bg-white border-b px-3.5 md:px-5 lg:px-10 py-4 shadow-2xs"
      >
        <div className="flex items-center justify-between gap-10 md:gap-15 max-w-[1920px] mx-auto">
          <div className="flex items-center gap-4 text-primary">
            <Newspaper size={24} />
            <h3 className="text-heading4 text-black  font-neueMontrealMd font-medium">
              News
            </h3>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1 md:pb-0 relative z-[110] flex-nowrap">
            {/* Desktop Filters */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={() => {
                  setFilters({ ...filters, date: "all" });
                  setSortBy("latest");
                }}
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
                onClick={() => {
                  setFilters({ ...filters, date: "all" });
                  setSortBy("latest");
                }}
                disabled={!isFiltered}
                className={`text-sm lg:text-[16px] font-medium transition-all whitespace-nowrap px-2 flex items-center gap-1 ${isFiltered ? "text-primary hover:opacity-70 cursor-pointer" : "text-gray-400 cursor-default opacity-50"
                  }`}
              >
                <FilterX size={14} />
                Reset
              </button>
              <MobileUnifiedFilterNews
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

          {/* Pagination Controls */}
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
        </div>
      </section>
    </div>
  );
};

export default News;

