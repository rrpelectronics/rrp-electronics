/**
 * Utility functions for generating and working with URL slugs
 */

/**
 * Convert a title to a URL-friendly slug
 * @param {string} title - The title to convert
 * @returns {string} - The URL-friendly slug
 */
export const generateSlug = (title) => {
  if (!title) return '';
  
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces, underscores, and multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

export const findBySlug = (items, slug, titleField = 'title') => {
  if (!items || !slug) return null;
  
  return items.find(item => {
    // Try the specified field first
    let itemTitle = item[titleField];
    
    // If not found, try 'title' or 'Title' as fallbacks
    if (!itemTitle && titleField !== 'title') {
      itemTitle = item['title'];
    }
    if (!itemTitle && titleField !== 'Title') {
      itemTitle = item['Title'];
    }
    
    return itemTitle && generateSlug(itemTitle) === slug;
  });
};

/**
 * Find a job by slug from career data
 * @param {Array} jobs - Array of job items
 * @param {string} slug - The slug to search for
 * @returns {Object|null} - The matching job or null if not found
 */
export const findJobBySlug = (jobs, slug) => {
  return findBySlug(jobs, slug, 'Role');
};

/**
 * Find an event by slug from events data
 * @param {Array} events - Array of event items
 * @param {string} slug - The slug to search for
 * @returns {Object|null} - The matching event or null if not found
 */
export const findEventBySlug = (events, slug) => {
  // Try 'Title' first (API data), then 'title' (hardcoded data)
  return findBySlug(events, slug, 'Title') || findBySlug(events, slug, 'title');
};