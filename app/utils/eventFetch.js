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
    "/images/news-events/placeholder.webp"
  );
};

// Helper function to determine if an event is in the future or past
const isFutureEvent = (eventDate) => {
  const currentDate = new Date();
  const eventDateObj = new Date(eventDate);
  return eventDateObj > currentDate;
};

/**
 * Fetch events data from API with optional filtering by event type
 */
export const fetchEvents = async (limit = null, eventType = null) => {
  try {
    const res = await fetch(
      "https://eloquent-art-0e51a537b4.strapiapp.com/api/events?populate=*"
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch events: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    
    // Filter by event type if specified
    let filteredEvents = data.data;
    if (eventType) {
      if (eventType === "upcoming") {
        // Filter for future events
        filteredEvents = data.data.filter(event => 
          isFutureEvent(event.Date || event.PublishDate)
        );
      } else if (eventType === "past") {
        // Filter for past events
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
    }));
  } catch (error) {
    console.error("Error fetching events data:", error);
    throw error;
  }
};

export const fetchEventById = async (eventId) => {
  try {
    const res = await fetch(
      "https://eloquent-art-0e51a537b4.strapiapp.com/api/events?populate=*"
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch event: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    const foundEvent = data.data.find((e) => e.id.toString() === eventId);
    
    if (!foundEvent) {
      throw new Error("Event not found");
    }
    
    return foundEvent;
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    throw error;
  }
};