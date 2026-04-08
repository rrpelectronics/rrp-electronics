"use client";
import React, { useState, useEffect, useMemo } from "react";
import { getAllItems } from "@/lib/cms-actions";
import { TABLES } from "@/lib/database-schema";
import { Mail, SortAsc, FileText, ChevronDown, Check, ArrowUpDown, FilterX } from "lucide-react";
import { useHeaderHeight } from "@/context/HeaderHeightContext";
import Link from "next/link";
import NewsletterCardSuspense from "@/components/suspense/NewsletterCardSuspense";
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
                className={`w-full px-5 py-3 text-[16px] cursor-pointer flex items-center justify-between hover:bg-gray-50 transition-colors ${value === option.value ? "text-primary" : "text-gray-600"
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
const MobileUnifiedFilter = ({ sortBy, setSortBy }) => {
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
        <ArrowUpDown size={16} className={isOpen ? "text-primary" : "text-gray-400"} />
        <span className="font-medium text-inherit">Sort</span>
        <ChevronDown size={16} className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : "text-gray-400"}`} />
      </button>

      {isOpen && (
        <div
          style={{ top: `${coords.top + 10}px`, right: `${coords.right}px` }}
          className="fixed z-[9999] animate-in fade-in slide-in-from-top-2 h-fit w-max"
        >
          <div className="fixed inset-0 select-none bg-black/0 cursor-pointer" onClick={() => setIsOpen(false)} style={{ zIndex: -1 }} />
          <div className="relative z-10 min-w-full bg-white border border-gray-100 rounded-2xl shadow-[0_10px_50px_rgba(0,0,0,0.15)] py-3 overflow-hidden">
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
                  name="newsletter-sort"
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
  const [sortBy, setSortBy] = useState("latest");
  const [newslettersData, setNewslettersData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const data = await getAllItems(TABLES.NEWSLETTERS);
        setNewslettersData(data || []);
      } catch (err) {
        console.error("Failed to load newsletters", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const isFiltered = sortBy !== "latest";

  // Filter and Sort newsletters
  const sortedNewsletters = useMemo(() => {
    let result = [...newslettersData];

    // Sort
    if (sortBy === "az") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "latest") {
      result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === "old") {
      result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }

    return result;
  }, [sortBy, newslettersData]);

  return (
    <main style={{ marginTop: headerHeight }} className="min-h-screen bg-white">
      {/* Sticky Filter Header */}
      <div
        style={{ top: headerHeight - 1 }}
        className="sticky z-40 bg-white border-b px-3.5 md:px-5 lg:px-10 py-4 shadow-2xs"
      >
        <div className="flex items-center justify-between gap-10 md:gap-15 max-w-[1920px] mx-auto">
          <div className="flex items-center gap-3 text-primary">
            <Mail size={24} />
            <h1 className="text-heading4 text-black font-neueMontrealMd font-medium">
              Newsletters
            </h1>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1 md:pb-0 relative z-[110] flex-nowrap">
            {/* Desktop Filters */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={() => {
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
                onClick={() => {
                  setSortBy("latest");
                }}
                disabled={!isFiltered}
                className={`text-sm lg:text-[16px] font-medium transition-all whitespace-nowrap px-2 flex items-center gap-1 ${isFiltered ? "text-primary hover:opacity-70 cursor-pointer" : "text-gray-400 cursor-default opacity-50"
                  }`}
              >
                <FilterX size={14} />
                Reset
              </button>
              <MobileUnifiedFilter sortBy={sortBy} setSortBy={setSortBy} />
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
