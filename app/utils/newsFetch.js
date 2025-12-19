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
    "/images/news-events/placeholder.webp"
  );
};

/**
 * Fetch news data from API
 */
export const fetchNews = async (limit = null) => {
  try {
    const res = await fetch(
      "https://eloquent-art-0e51a537b4.strapiapp.com/api/news?populate=*"
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch news: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    
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
    console.error("Error fetching news data:", error);
    throw error;
  }
};

/**
 * Fetch single news by ID
 */
export const fetchNewsById = async (newsId) => {
  try {
    const res = await fetch(
      "https://eloquent-art-0e51a537b4.strapiapp.com/api/news?populate=*"
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch news: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    const foundNews = data.data.find((n) => n.id.toString() === newsId);
    
    if (!foundNews) {
      throw new Error("News not found");
    }
    
    return foundNews;
  } catch (error) {
    console.error("Error fetching news by ID:", error);
    throw error;
  }
};