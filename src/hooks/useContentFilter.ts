"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import { getYearFromDate, sortItems } from "@/utils/dateUtils";

interface FilterState {
  date: string;
  source?: string;
  [key: string]: any;
}

export function useContentFilter(
  fetchFn: () => Promise<any[]>,
  initialFilters: FilterState,
  initialSort: string = "latest"
) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [sortBy, setSortBy] = useState(initialSort);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFn();
      setData(result || []);
    } catch (err: any) {
      setError(err.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }, [fetchFn]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const reset = () => {
    setFilters(initialFilters);
    setSortBy(initialSort);
  };

  const isFiltered = useMemo(() => {
    const isSortDirty = sortBy !== initialSort;
    const areFiltersDirty = Object.keys(initialFilters).some(
      (key) => filters[key] !== initialFilters[key]
    );
    return isSortDirty || areFiltersDirty;
  }, [filters, sortBy, initialFilters, initialSort]);

  const years = useMemo(() => {
    const y = new Set(data.map((item) => getYearFromDate(item.date)).filter(Boolean));
    return ["all", ...Array.from(y).sort((a, b) => b.localeCompare(a))];
  }, [data]);

  const filteredItems = useMemo(() => {
     let result = [...data];
     
     // Apply generic filters (date, source, tab, etc.)
     Object.keys(filters).forEach(key => {
        const val = filters[key];
        if (val === "all") return;
        
        if (key === "date") {
           result = result.filter(item => getYearFromDate(item.date) === val);
        } else {
           // Direct match for other filters (source, type, etc.)
           result = result.filter(item => item[key] === val);
        }
     });
     
     return sortItems(result, sortBy);
  }, [data, filters, sortBy]);

  return {
    items: data,
    filteredItems,
    loading,
    error,
    filters,
    setFilters,
    sortBy,
    setSortBy,
    isFiltered,
    years,
    reset,
    refresh: loadData
  };
}
