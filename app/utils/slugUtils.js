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

/**
 * Find an item by slug from a list of items
 * @param {Array} items - Array of items to search through
 * @param {string} slug - The slug to search for
 * @param {string} titleField - The field name containing the title (default: 'title')
 * @returns {Object|null} - The matching item or null if not found
 */
export const findBySlug = (items, slug, titleField = 'title') => {
  if (!items || !slug) return null;
  
  return items.find(item => {
    const itemTitle = item[titleField];
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
  return findBySlug(events, slug, 'Title');
};