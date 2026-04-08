import { getAllItems } from "@/lib/cms-actions";
import { TABLES } from "@/lib/database-schema";

export interface NewsData {
  id: string;
  newsEventImg: string;
  title: string;
  date: string;
  source?: string;
  link: string;
  imgBgClass: string;
}

/**
 * Fetch news data from Neon database
 */
export const fetchNews = async (limit: number | null = null) => {
  let allNews: any[] = [];
  
  try {
    allNews = await getAllItems(TABLES.NEWS);
  } catch (error) {
    console.error("News fetch failed:", error);
    allNews = [];
  }

  // Robust date parsing helper for sorting
  const getParsedDate = (dateStr: string) => {
    if (!dateStr || typeof dateStr !== 'string') return new Date(0);
    const trimmed = dateStr.trim();
    const d = new Date(trimmed);
    if (!isNaN(d.getTime())) return d;

    const parts = trimmed.split(/[\/\-\s,.]+/).filter(Boolean);
    let year = -1;
    let month = 0;
    let day = 1;
    const monthNames = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

    parts.forEach((part, i) => {
      const num = parseInt(part);
      if (part.length === 4 && !isNaN(num) && num > 1900) {
        year = num;
      } else {
        const lower = part.toLowerCase();
        const mIdx = monthNames.findIndex(m => lower.startsWith(m));
        if (mIdx !== -1) month = mIdx;
        else if (!isNaN(num) && num > 0 && num <= 31) {
          if (day === 1 || i === 0) day = num;
        }
      }
    });

    if (year !== -1) return new Date(year, month, day);
    const yearMatch = trimmed.match(/\b(20\d{2})\b/);
    if (yearMatch) return new Date(parseInt(yearMatch[1]), 0, 1);
    return new Date(0);
  };

  // Sort by date descending (latest first)
  allNews.sort((a, b) => {
    const dateA = getParsedDate(a.date).getTime();
    const dateB = getParsedDate(b.date).getTime();
    // Use id as a tie-breaker (assuming larger ID is newer)
    if (dateA === dateB) return b.id - a.id;
    return dateB - dateA;
  });

  let displayedNews = allNews;
  if (limit) {
    displayedNews = allNews.slice(0, limit);
  }

  return displayedNews.map((item) => ({
    id: item.id.toString(),
    newsEventImg: item.newsEventImg || "/images/news-events/placeholder.webp",
    title: item.title || "No title",
    date: item.date || "Date not available",
    source: item.source || "",
    link: item.link || "#",
    imgBgClass: item.imgBgClass || "object-cover",
  }));
};

/**
 * Fetch single news by ID
 */
export const fetchNewsById = async (newsId: string) => {
  try {
    const allNews = await getAllItems(TABLES.NEWS);
    const item = allNews.find((n: any) => n.id.toString() === newsId);
    if (item) return item;
  } catch (err) {
    console.error("News fetch by ID failed:", err);
  }
  
  throw new Error("News not found");
};
