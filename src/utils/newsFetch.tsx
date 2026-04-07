import { getAllItems } from "@/lib/cms-actions";
import { TABLES } from "@/lib/database-schema";
// Import hardcoded news data as fallback
import { news_data, NewsData } from './newsData';

/**
 * Fetch news data from AWS DynamoDB with local fallback
 */
export const fetchNews = async (limit: number | null = null) => {
  let sortedNews = [];
  
  try {
    // Try fetching from AWS first
    const awsNews = await getAllItems(TABLES.NEWS);
    if (awsNews && awsNews.length > 0) {
      sortedNews = awsNews;
    } else {
      // Fallback to local data
      sortedNews = news_data;
    }
  } catch (error) {
    console.error("AWS news fetch failed, falling back to local:", error);
    sortedNews = news_data;
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
    const awsNews = await getAllItems(TABLES.NEWS);
    const item = awsNews.find((n) => n.id.toString() === newsId);
    if (item) return item;
  } catch (err) {}
  
  const foundNews = news_data.find((n) => n.id.toString() === newsId);
  if (!foundNews) {
    throw new Error("News not found");
  }
  return foundNews;
};

