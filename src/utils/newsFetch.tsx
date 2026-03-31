/**
 * News data fetching utilities
 */

// Import hardcoded news data as fallback
import { news_data, NewsData } from './newsData';

/**
 * Fetch news data from local data
 */
export const fetchNews = async (limit: number | null = null) => {
  let sortedNews = news_data;

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
 * Fetch single news by ID from local data
 */
export const fetchNewsById = async (newsId: string) => {
  const foundNews = news_data.find((n) => n.id.toString() === newsId);

  if (!foundNews) {
    throw new Error("News not found");
  }

  return foundNews;
};
