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
  let sortedNews: any[] = [];
  
  try {
    sortedNews = await getAllItems(TABLES.NEWS);
  } catch (error) {
    console.error("News fetch failed:", error);
    sortedNews = [];
  }

  if (limit) {
    sortedNews = sortedNews.slice(0, limit);
  }

  return sortedNews.map((item) => ({
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
