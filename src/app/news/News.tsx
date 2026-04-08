"use client";
import React, { useState, useEffect, useMemo } from "react";
import { fetchNews } from "@/utils/newsFetch";
import NewsEventsCard from "@/components/NewsEventsCard";
import NewsEventsCardSuspense from "@/components/suspense/NewsEventsCardSuspense";
import { Newspaper, SortAsc, Filter, Layers, Globe, ChevronDown, Check, ArrowUpDown } from "lucide-react";
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
    }, 100);
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
          ? "border-primary text-primary bg-primary/5 ring-4 ring-primary/5"
          : "border-gray-200 text-gray-700 bg-white hover:border-primary/50 hover:text-primary"
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
            top: `${70}px`,
            ...(rightAlign ? { right: `${coords.right}px` } : { left: `${coords.left}px` }),
            zIndex: 9999
          }}
          className="animate-in fade-in slide-in-from-top-2 duration-200"
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
                className={`px-5 py-3 text-[16px] cursor-pointer flex items-center justify-between hover:bg-primary/5 hover:text-primary transition-colors ${value === option.value ? "text-primary bg-primary/5" : "text-gray-600"
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
const MobileUnifiedFilterNews = ({ sortBy, setSortBy }) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = React.useRef(null);

  return (
    <div className="relative flex-shrink-0">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`px-3.5 lg:px-5 py-2 lg:py-2.5 rounded-full text-sm lg:text-[16px] gap-2 lg:gap-3 flex justify-center items-center border transition-all cursor-pointer ${isOpen ? "border-primary text-primary bg-primary/5 ring-4 ring-primary/5" : "border-gray-200 text-gray-700 bg-white hover:border-primary/50"}`}
      >
        <Filter size={16} className={isOpen ? "text-primary" : "text-gray-400"} />
        <span className="font-medium text-inherit">Filter</span>
        <ChevronDown size={16} className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : "text-gray-400"}`} />
      </button>

      {isOpen && (
        <div className="fixed right-4 sm:right-5 top-[70px] z-[9999] animate-in fade-in slide-in-from-top-2">
          {/* Invisible overlay to strictly close upon clicking outside */}
          <div className="fixed inset-0 select-none bg-transparent" onClick={() => setIsOpen(false)} style={{ zIndex: -1 }} />
          <ul className="min-w-full bg-white border border-gray-100 rounded-2xl shadow-[0_10px_50px_rgba(0,0,0,0.15)] py-3 overflow-hidden">
            <li onClick={() => { setSortBy(sortBy === 'latest' ? 'old' : 'latest'); setIsOpen(false); }} className={`px-4 py-2.5 text-sm cursor-pointer flex items-center justify-between hover:bg-primary/5 transition-colors ${sortBy === 'latest' || sortBy === 'old' ? 'text-primary bg-primary/5 font-neueMontrealMd' : 'text-gray-600'}`}>
              <div className="flex items-center gap-3">Date <ArrowUpDown size={14} /></div>
            </li>
            <li onClick={() => { setSortBy('az'); setIsOpen(false); }} className={`px-4 py-2.5 text-sm cursor-pointer flex items-center justify-between hover:bg-primary/5 transition-colors ${sortBy === 'az' ? 'text-primary bg-primary/5 font-neueMontrealMd' : 'text-gray-600'}`}>
              <div className="flex items-center gap-3">A-Z <ArrowUpDown size={14} /></div>
            </li>
          </ul>
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

  // Filter and Sort news
  const filteredAndSortedNews = useMemo(() => {
    let result = [...news];

    // Filter by Source
    if (filters.source !== "all") {
      result = result.filter((item) => item.source === filters.source);
    }

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
          const d = new Date(item.date);
          return isNaN(d.getTime()) ? null : d.getFullYear().toString();
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
          className="sticky z-40 bg-white/95 backdrop-blur-md border-b-2 border-gray-100 px-3.5 md:px-5 lg:px-10 py-4 shadow-sm"
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
          className="sticky z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 px-3.5 md:px-5 lg:px-10 py-4 shadow-sm"
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
        className="sticky z-40 bg-white/95 backdrop-blur-md border-b px-3.5 md:px-5 lg:px-10 py-4 shadow-2xs"
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
              <MobileUnifiedFilterNews sortBy={sortBy} setSortBy={setSortBy} />
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

