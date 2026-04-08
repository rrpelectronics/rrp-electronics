import { getAllItems } from '@/lib/cms-actions';
import { TABLES } from '@/lib/database-schema';

export interface EventData {
  id: string;
  newsEventBanner?: string;
  thumbnail?: string;
  newsEventImg?: string;
  title: string;
  date: string;
  description?: string;
  gallery?: { url: string }[];
  source?: string;
  link?: string;
  banner?: string;
  eventType?: string;
}

// Helper function to determine if an event is in the future or past
const isFutureEvent = (eventDate: Date | string | number | null | undefined) => {
  if (!eventDate) return false;

  const currentDate = new Date();

  // Handle Date objects first
  if (eventDate instanceof Date) {
    return eventDate > currentDate;
  }

  // Handle string dates
  const eventDateObj = new Date(eventDate);
  if (!isNaN(eventDateObj.getTime())) {
      return eventDateObj > currentDate;
  }

  // Fallback for special formats like "January 2026"
  if (typeof eventDate === "string") {
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
  }

  return false;
};

/**
 * Fetch events data from Neon database
 */
export const fetchEvents = async (limit: number | null = null, eventType: "upcoming" | "past" | null = null) => {
  let allEvents: any[] = [];
  
  try {
    allEvents = await getAllItems(TABLES.EVENTS);
  } catch (error) {
    console.error("Failed to fetch events:", error);
    allEvents = [];
  }

  let filteredEvents = allEvents;

  // Filter by event type
  if (eventType) {
    if (eventType === "upcoming") {
      filteredEvents = allEvents.filter(event => isFutureEvent(event.date));
    } else if (eventType === "past") {
      filteredEvents = allEvents.filter(event => !isFutureEvent(event.date));
    }
  }

  // Helper to parse date string to timestamp for sorting
  const getSortTime = (dateVal: string | null | undefined) => {
    if (!dateVal) return 0;
    const d = new Date(dateVal);
    if (!isNaN(d.getTime())) return d.getTime();
    
    // Fallback for special formats
    const parts = dateVal.split(" ");
    if (parts.length === 2) {
      const monthIndex = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ].indexOf(parts[0]);
      if (monthIndex !== -1) {
        return new Date(parseInt(parts[1]), monthIndex, 1).getTime();
      }
    }
    return 0;
  };

  // Sort by date descending
  filteredEvents.sort((a, b) => getSortTime(b.date) - getSortTime(a.date));

  // Apply limit
  if (limit) {
    filteredEvents = filteredEvents.slice(0, limit);
  }

  return filteredEvents.map((item) => ({
    id: item.id.toString(),
    newsEventImg: item.newsEventImg || item.thumbnail || item.newsEventBanner || "/images/news-events/placeholder.webp",
    title: item.title || "No title",
    date: item.date || "Date not available",
    source: item.source || "",
    link: item.link || "#",
    imgBgClass: "object-cover",
    eventType: item.eventType || (isFutureEvent(item.date) ? "upcoming" : "past"),
    description: item.description,
    gallery: item.gallery || [],
    thumbnail: item.thumbnail || item.newsEventBanner,
    banner: item.banner || item.newsEventBanner || item.thumbnail,
  }));
};

/**
 * Fetch single event by ID
 */
export const fetchEventById = async (eventId: string) => {
  let allEvents: any[] = [];
  try {
    allEvents = await getAllItems(TABLES.EVENTS);
  } catch (e) {
    console.error("Failed to fetch events:", e);
    allEvents = [];
  }

  const foundEvent = allEvents.find((e) => e.id.toString() === eventId);
  if (!foundEvent) {
    throw new Error("Event not found");
  }

  return {
    id: foundEvent.id.toString(),
    newsEventImg: foundEvent.newsEventImg || foundEvent.thumbnail || foundEvent.newsEventBanner || "/images/news-events/placeholder.webp",
    title: foundEvent.title || "No title",
    date: foundEvent.date || "Date not available",
    source: foundEvent.source || "",
    link: foundEvent.link || "#",
    imgBgClass: "object-cover",
    eventType: foundEvent.eventType || (isFutureEvent(foundEvent.date) ? "upcoming" : "past"),
    description: foundEvent.description,
    gallery: foundEvent.gallery || [],
    thumbnail: foundEvent.thumbnail || foundEvent.newsEventBanner,
    banner: foundEvent.banner || foundEvent.newsEventBanner || foundEvent.thumbnail,
  };
};
