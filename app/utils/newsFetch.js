import axios from 'axios';

/**
 * News data fetching utilities
 */

// Helper function to format dates safely
const formatNewsDate = (dateValue) => {
  if (!dateValue) return "Date not available";
  
  const dateObj = new Date(dateValue);
  if (isNaN(dateObj.getTime())) return "Invalid Date";
  
  return dateObj.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
};

// Helper function to get image URL with fallbacks
const getNewsImageUrl = (item) => {
  return (
    item.Thumbnail?.formats?.medium?.url ||
    item.Thumbnail?.url ||
    item.thumbnail?.formats?.medium?.url ||
    item.thumbnail?.url ||
    item.newsEventImg || // For hardcoded data
    "/images/news-events/placeholder.webp"
  );
};

// Import hardcoded news data as fallback
import { news_data } from './newsData.js';

/**
 * Fetch news data from API
 * Falls back to hardcoded data if API fails
 */
export const fetchNews = async (limit = null) => {
  try {
    const response = await axios.get(
      "https://eloquent-art-0e51a537b4.strapiapp.com/api/news?populate=*"
    );

    const data = response.data;
    
    // Sort by date (newest first / latest to oldest)
    let sortedNews = data.data.sort(
      (a, b) =>
        new Date(b.PublishDate || b.Date) -
        new Date(a.PublishDate || a.Date)
    );
    
    // Apply limit if specified
    if (limit) {
      sortedNews = sortedNews.slice(0, limit);
    }
    
    return sortedNews.map((item) => ({
      id: item.id.toString(),
      newsEventImg: getNewsImageUrl(item),
      title: item.Title || item.title || "No title",
      date: formatNewsDate(item.PublishDate || item.Date || item.date || item.publishDate),
      source: item.Source || item.source || item.Publisher || item.publisher || "",
      link: item.Link || item.link || "#",
      imgBgClass: "object-cover",
    }));
  } catch (error) {
    console.error("Error fetching news data from API, falling back to hardcoded data:", error);
    
    // Fallback to hardcoded data
    let sortedNews = news_data;
    
    // Apply limit if specified
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
  }
};

/**
 * Fetch single news by ID
 * Falls back to hardcoded data if API fails
 */
export const fetchNewsById = async (newsId) => {
  try {
    const response = await axios.get(
      "https://eloquent-art-0e51a537b4.strapiapp.com/api/news?populate=*"
    );

    const data = response.data;
    const foundNews = data.data.find((n) => n.id.toString() === newsId);
    
    if (!foundNews) {
      throw new Error("News not found");
    }
    
    return foundNews;
  } catch (error) {
    console.error("Error fetching news by ID from API, falling back to hardcoded data:", error);
    
    // Fallback to hardcoded data
    const foundNews = news_data.find((n) => n.id.toString() === newsId);
    
    if (!foundNews) {
      throw new Error("News not found in hardcoded data either");
    }
    
    return foundNews;
  }
};