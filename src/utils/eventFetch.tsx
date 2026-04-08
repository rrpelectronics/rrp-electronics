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
  filteredEvents.sort((a, b) => {
    const dateA = getParsedDate(a.date).getTime();
    const dateB = getParsedDate(b.date).getTime();
    if (dateA === dateB) return b.id - a.id;
    return dateB - dateA;
  });

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
