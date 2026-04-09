/**
 * Robust date parsing utility to handle various formats consistently across browsers.
 * Supports: DD/MM/YYYY, YYYY-MM-DD, Month YYYY, DD Month YYYY, etc.
 */
export const getParsedDate = (dateStr: any): Date => {
  if (!dateStr || typeof dateStr !== 'string') return new Date(0);
  const trimmed = dateStr.trim();
  const d = new Date(trimmed);
  if (!isNaN(d.getTime())) return d;

  // Try parsing parts
  const parts = trimmed.split(/[\/\-\s,.]+/).filter(Boolean);
  
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

/**
 * Extracts year from a date string.
 */
export const getYearFromDate = (dateStr: any): string | null => {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) {
    return d.getFullYear().toString();
  }
  const match = dateStr.toString().match(/\b(20\d{2})\b/);
  return match ? match[1] : null;
};

/**
 * Generic sorting utility for news, events, and newsletters.
 */
export const sortItems = (items: any[], sortBy: string, dateField: string = 'date') => {
  if (!items || items.length === 0) return [];
  const result = [...items];
  
  result.sort((a, b) => {
    // Alphabetical sort
    if (sortBy === "az") {
       return (a.title || "").localeCompare(b.title || "");
    }
    
    // Date-based sort
    const dateA = getParsedDate(a[dateField]).getTime();
    const dateB = getParsedDate(b[dateField]).getTime();
    
    if (sortBy === "old") {
      // If dates are equal, use ID as secondary sort for stability
      if (dateA === dateB) return String(a.id || "").localeCompare(String(b.id || ""));
      return dateA - dateB;
    }
    
    // Default: latest (newest first)
    if (dateA === dateB) return String(b.id || "").localeCompare(String(a.id || ""));
    return dateB - dateA;
  });
  
  return result;
};
