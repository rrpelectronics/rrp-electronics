import { getAllItems } from '@/lib/cms-actions';
import { TABLES } from '@/lib/aws';
import events_data, { EventData } from './eventsData';

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

  // Fallback for special formats
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
 * Fetch events data from AWS with local data fallback
 */
export const fetchEvents = async (limit: number | null = null, eventType: "upcoming" | "past" | null = null) => {
  let allEvents = [];
  
  try {
    const awsEvents = await getAllItems(TABLES.EVENTS);
    if (awsEvents && awsEvents.length > 0) {
      allEvents = awsEvents;
    } else {
      allEvents = events_data;
    }
  } catch (error) {
    allEvents = events_data;
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

  // Apply limit
  if (limit) {
    filteredEvents = filteredEvents.slice(0, limit);
  }

  return filteredEvents.map((item) => ({
    id: item.id.toString(),
    newsEventImg: item.newsEventImg || item.thumbnail || item.newsEventBanner || "/images/news-events/placeholder.webp",
    title: item.title || "No title",
    date: item.date instanceof Date ? item.date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    }) : item.date || "Date not available",
    source: item.source || "",
    link: item.link || "#",
    imgBgClass: "object-cover",
    eventType: isFutureEvent(item.date) ? "upcoming" : "past",
    description: item.description,
    gallery: item.gallery || [],
    thumbnail: item.thumbnail || item.newsEventBanner,
    banner: item.newsEventBanner || item.thumbnail,
  }));
};

/**
 * Fetch single event by ID
 */
export const fetchEventById = async (eventId: string) => {
  let allEvents = [];
  try {
    allEvents = await getAllItems(TABLES.EVENTS);
    if (!allEvents.length) allEvents = events_data;
  } catch (e) {
    allEvents = events_data;
  }

  const foundEvent = allEvents.find((e) => e.id.toString() === eventId);
  if (!foundEvent) {
    throw new Error("Event not found");
  }

  return {
    id: foundEvent.id.toString(),
    newsEventImg: foundEvent.newsEventImg || foundEvent.thumbnail || foundEvent.newsEventBanner || "/images/news-events/placeholder.webp",
    title: foundEvent.title || "No title",
    date: foundEvent.date instanceof Date ? foundEvent.date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    }) : foundEvent.date || "Date not available",
    source: foundEvent.source || "",
    link: foundEvent.link || "#",
    imgBgClass: "object-cover",
    eventType: isFutureEvent(foundEvent.date) ? "upcoming" : "past",
    description: foundEvent.description,
    gallery: foundEvent.gallery || [],
    thumbnail: foundEvent.thumbnail || foundEvent.newsEventBanner,
    banner: foundEvent.newsEventBanner || foundEvent.thumbnail,
  };
};

