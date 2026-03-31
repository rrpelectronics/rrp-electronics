import events_data, { EventData } from './eventsData';

// Helper function to determine if an event is in the future or past
const isFutureEvent = (eventDate: Date | string | number | null | undefined) => {
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

/**
 * Fetch events data from local data with optional filtering by event type
 */
export const fetchEvents = async (limit: number | null = null, eventType: "upcoming" | "past" | null = null) => {
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
    newsEventImg: item.thumbnail || item.newsEventBanner || "/images/news-events/placeholder.webp",
    title: item.title || "No title",
    date: item.date instanceof Date ? item.date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    }) : item.date || "Date not available",
    source: item.source || "",
    link: item.link || "#",
    imgBgClass: "object-cover",
    eventType: isFutureEvent(item.date) ? "upcoming" : "past", // Determine based on date for hardcoded data
    description: item.description,
    gallery: item.gallery || [],
    thumbnail: item.thumbnail || item.newsEventBanner,
    banner: item.newsEventBanner || item.thumbnail,
  }));
};

/**
 * Fetch single event by ID from local data
 */
export const fetchEventById = async (eventId: string) => {
  const foundEvent = events_data.find((e) => e.id.toString() === eventId);

  if (!foundEvent) {
    throw new Error("Event not found");
  }

  // Format the found event to match the expected structure
  return {
    id: foundEvent.id.toString(),
    newsEventImg: foundEvent.thumbnail || foundEvent.newsEventBanner || "/images/news-events/placeholder.webp",
    title: foundEvent.title || "No title",
    date: foundEvent.date instanceof Date ? foundEvent.date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    }) : foundEvent.date || "Date not available",
    source: foundEvent.source || "",
    link: foundEvent.link || "#",
    imgBgClass: "object-cover",
    eventType: isFutureEvent(foundEvent.date) ? "upcoming" : "past", // Determine based on date for hardcoded data
    description: foundEvent.description,
    gallery: foundEvent.gallery || [],
    thumbnail: foundEvent.thumbnail || foundEvent.newsEventBanner,
    banner: foundEvent.newsEventBanner || foundEvent.thumbnail,
  };
};
