import axios from 'axios';
import events_data from './eventsData.js';

// Helper function to format dates safely
const formatEventDate = (dateValue) => {
  if (!dateValue) return "Date not available";
  
  const dateObj = new Date(dateValue);
  if (isNaN(dateObj.getTime())) return "Invalid Date";
  
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
};

// Helper function to get image URL with fallbacks
const getEventImageUrl = (item) => {
  return (
    item.Thumbnail?.formats?.medium?.url ||
    item.Thumbnail?.url ||
    item.thumbnail?.formats?.medium?.url ||
    item.thumbnail?.url ||
    item.newsEventBanner || // For hardcoded data
    item.Banner || // For hardcoded data
    "/images/news-events/placeholder.webp"
  );
};

// Helper function to determine if an event is in the future or past
const isFutureEvent = (eventDate) => {
  if (!eventDate) return false;
  
  const currentDate = new Date();
  
  // Handle Date objects first (from updated eventsData.js)
  if (eventDate instanceof Date) {
    return eventDate > currentDate;
  }
  
  // Handle string dates like "January 2026"
  if (typeof eventDate === "string") {
    // Try to parse the date string
    const eventDateObj = new Date(eventDate);
    
    // If parsing failed, try to create a date from month/year format
    if (isNaN(eventDateObj.getTime())) {
      // For formats like "January 2026", create date as first day of that month
      const parts = eventDate.split(" ");
      if (parts.length === 2) {
        const [month, year] = parts;
        const monthIndex = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ].indexOf(month);
        
        if (monthIndex !== -1) {
          const constructedDate = new Date(parseInt(year), monthIndex, 1);
          return constructedDate > currentDate;
        }
      }
    } else {
      return eventDateObj > currentDate;
    }
  } else {
    // Handle timestamps
    const eventDateObj = new Date(eventDate);
    return eventDateObj > currentDate;
  }
  
  return false;
};

// Import hardcoded event data as fallback


/**
 * Fetch events data from API with optional filtering by event type
 * Falls back to hardcoded data if API fails
 */
export const fetchEvents = async (limit = null, eventType = null) => {
  try {
    const response = await axios.get(
      "https://eloquent-art-0e51a537b4.strapiapp.com/api/events?populate=*"
    );

    const data = response.data;
    
    // Filter by event type if specified
    let filteredEvents = data.data;
    if (eventType) {
      if (eventType === "upcoming") {
        filteredEvents = data.data.filter(event => 
          isFutureEvent(event.Date || event.PublishDate)
        );
      } else if (eventType === "past") {
        filteredEvents = data.data.filter(event => 
          !isFutureEvent(event.Date || event.PublishDate)
        );
      }
    }
    
    // Sort by date (newest first / latest to oldest)
    let sortedEvents = filteredEvents.sort(
      (a, b) => new Date(b.Date || b.PublishDate) - new Date(a.Date || a.PublishDate)
    );
    
    // Apply limit if specified
    if (limit) {
      sortedEvents = sortedEvents.slice(0, limit);
    }
    
    return sortedEvents.map((item) => ({
      id: item.id.toString(),
      newsEventImg: getEventImageUrl(item),
      title: item.Title || item.title || "No title",
      date: formatEventDate(item.Date || item.PublishDate),
      source: item.Source || item.source || item.Publisher || item.publisher || "",
      link: item.Link || item.link || "#",
      imgBgClass: "object-cover",
      eventType: isFutureEvent(item.Date || item.PublishDate) ? "upcoming" : "past",
      // Keep only one description field
      description: item.Description || item.description,
      // Keep gallery data
      Gallery: item.Gallery || [],
      // Keep only necessary image fields for banner/thumbnail usage
      thumbnail: item.Thumbnail?.formats?.medium?.url || item.Thumbnail?.url || item.thumbnail?.formats?.medium?.url || item.thumbnail?.url || item.newsEventBanner || item.newsEventBanner?.url,
      banner: item.Banner?.url || item.banner?.url || item.Banner || item.banner || item.newsEventBanner || item.newsEventBanner?.url || item.thumbnail,
    }));
  } catch (error) {
    // Fallback to hardcoded data
    let filteredEvents = events_data;
    
    // Filter by event type if specified for hardcoded data
    if (eventType) {
      if (eventType === "upcoming") {
        filteredEvents = events_data.filter(event => 
          isFutureEvent(event.date)
        );
      } else if (eventType === "past") {
        filteredEvents = events_data.filter(event => 
          !isFutureEvent(event.date)
        );
      }
    }
    
    // Apply limit if specified
    if (limit) {
      filteredEvents = filteredEvents.slice(0, limit);
    }
    
    return filteredEvents.map((item) => ({
      id: item.id.toString(),
      newsEventImg: item.thumbnail || item.newsEventBanner || item.Banner || "/images/news-events/placeholder.webp",
      title: item.title || "No title",
      date: item.date instanceof Date ? item.date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      }) : item.date || "Date not available",
      source: item.source || "",
      link: item.link || "#",
      imgBgClass: "object-cover",
      eventType: isFutureEvent(item.date) ? "upcoming" : "past", // Determine based on date for hardcoded data
      // Keep only one description field
      description: item.Description || item.description,
      // Keep gallery data
      gallery: item.Gallery || [],
      // Keep only necessary image fields for banner/thumbnail usage
      thumbnail: item.thumbnail || item.newsEventBanner || item.Banner,
      banner: item.Banner || item.banner || item.newsEventBanner || item.thumbnail,
    }));
  }
};

/**
 * Fetch single event by ID
 * Falls back to hardcoded data if API fails
 */
export const fetchEventById = async (eventId) => {
  try {
    // Fetch all events to get properly formatted data
    const allEvents = await fetchEvents();
    const foundEvent = allEvents.find((e) => e.id.toString() === eventId);
    
    if (!foundEvent) {
      throw new Error("Event not found");
    }
    
    return foundEvent;
  } catch (error) {
    console.error("Error fetching event by ID from API, falling back to hardcoded data:", error);
    
    // Fallback to hardcoded data
    const foundEvent = events_data.find((e) => e.id.toString() === eventId);
    
    if (!foundEvent) {
      throw new Error("Event not found in hardcoded data either");
    }
    
    // Format the found event to match the expected structure
    return {
      id: foundEvent.id.toString(),
      newsEventImg: foundEvent.thumbnail || foundEvent.newsEventBanner || foundEvent.Banner || "/images/news-events/placeholder.webp",
      title: foundEvent.title || "No title",
      date: foundEvent.date instanceof Date ? foundEvent.date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      }) : foundEvent.date || "Date not available",
      source: foundEvent.source || "",
      link: foundEvent.link || "#",
      imgBgClass: "object-cover",
      eventType: isFutureEvent(foundEvent.date) ? "upcoming" : "past", // Determine based on date for hardcoded data
      // Keep only one description field
      description: foundEvent.Description || foundEvent.description,
      // Keep gallery data
      gallery: foundEvent.Gallery || [],
      // Keep only necessary image fields for banner/thumbnail usage
      thumbnail: foundEvent.thumbnail || foundEvent.newsEventBanner || foundEvent.Banner,
      banner: foundEvent.Banner || foundEvent.banner || foundEvent.newsEventBanner || foundEvent.thumbnail,
    };
  }
};