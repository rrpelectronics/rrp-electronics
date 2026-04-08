"use server";
import { v4 as uuidv4 } from 'uuid';
import { getDb } from './db';
import { TABLES, CREATE_TABLE_SQL } from './database-schema';

/**
 * Valid columns per table — prevents inserting/updating non-existent columns.
 */
const TABLE_COLUMNS: Record<string, string[]> = {
  [TABLES.NEWS]: ['id', 'title', 'date', 'source', 'link', 'newsEventImg', 'imgBgClass', 'description'],
  [TABLES.EVENTS]: ['id', 'title', 'date', 'source', 'link', 'thumbnail', 'newsEventBanner', 'newsEventImg', 'banner', 'description', 'gallery', 'eventType'],
  [TABLES.CAREERS]: ['id', 'title', 'department', 'type', 'location', 'description', 'link', 'experienceMin', 'experienceMax', 'fresherAllowed', 'extraPoints'],
  [TABLES.NEWSLETTERS]: ['id', 'title', 'date', 'description', 'link'],
};

/**
 * Filter data to only include valid columns for the given table.
 */
function filterColumns(tableName: string, data: Record<string, any>): Record<string, any> {
  const validCols = TABLE_COLUMNS[tableName];
  if (!validCols) return data;
  const filtered: Record<string, any> = {};
  for (const key of Object.keys(data)) {
    if (validCols.includes(key)) {
      filtered[key] = data[key];
    }
  }
  return filtered;
}

/**
 * Ensure the table exists before any operation.
 */
async function ensureTable(tableName: string) {
  const sql = getDb();
  const createSql = CREATE_TABLE_SQL[tableName];
  if (createSql) {
    await sql.query(createSql);
  }
}

/**
 * Parse JSONB fields that may come back as strings or already-parsed objects.
 */
function parseRow(row: any) {
  if (!row) return row;
  const parsed = { ...row };
  // Only parse JSONB fields if they exist in the row
  if ('gallery' in parsed) {
    parsed.gallery = typeof parsed.gallery === 'string' ? JSON.parse(parsed.gallery) : (parsed.gallery || []);
  }
  if ('extraPoints' in parsed) {
    parsed.extraPoints = typeof parsed.extraPoints === 'string' ? JSON.parse(parsed.extraPoints) : (parsed.extraPoints || []);
  }
  return parsed;
}

/**
 * Get all items from a Neon Postgres table.
 * sql.query() returns rows directly as an array (not { rows }).
 */
export const getAllItems = async (tableName: string) => {
  try {
    await ensureTable(tableName);
    const sql = getDb();
    const rows = await sql.query(`SELECT * FROM ${tableName} ORDER BY created_at DESC`);
    return rows.map(parseRow);
  } catch (error) {
    console.error(`Error fetching items from ${tableName}:`, error);
    return [];
  }
};

/**
 * Get a single item by ID.
 */
export const getItemById = async (tableName: string, id: string) => {
  try {
    await ensureTable(tableName);
    const sql = getDb();
    const rows = await sql.query(`SELECT * FROM ${tableName} WHERE id = $1`, [id]);
    if (rows.length === 0) return null;
    return parseRow(rows[0]);
  } catch (error) {
    console.error(`Error fetching item ${id} from ${tableName}:`, error);
    return null;
  }
};

/**
 * Create a new item in the table.
 */
export const createItem = async (tableName: string, data: any) => {
  try {
    await ensureTable(tableName);
    const sql = getDb();
    const id = data.id || uuidv4();
    const newItem = filterColumns(tableName, { ...data, id });

    const keys = Object.keys(newItem);
    const quotedCols = keys.map(k => `"${k}"`).join(', ');
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
    const values = keys.map(k => {
      const val = newItem[k];
      if (Array.isArray(val) || (typeof val === 'object' && val !== null)) {
        return JSON.stringify(val);
      }
      return val;
    });

    await sql.query(`INSERT INTO ${tableName} (${quotedCols}) VALUES (${placeholders})`, values);
    return newItem;
  } catch (error) {
    console.error(`Error creating item in ${tableName}:`, error);
    throw error;
  }
};

/**
 * Update an existing item by ID.
 */
export const updateItem = async (tableName: string, id: string, data: any) => {
  try {
    await ensureTable(tableName);
    const sql = getDb();

    const rawData = { ...data };
    delete rawData.id;
    delete rawData.created_at;
    const updateData = filterColumns(tableName, rawData);

    const keys = Object.keys(updateData);
    if (keys.length === 0) return data;

    const setClauses = keys.map((k, i) => `"${k}" = $${i + 1}`).join(', ');
    const values = keys.map(k => {
      const val = updateData[k];
      if (Array.isArray(val) || (typeof val === 'object' && val !== null)) {
        return JSON.stringify(val);
      }
      return val;
    });
    values.push(id);

    await sql.query(`UPDATE ${tableName} SET ${setClauses} WHERE id = $${keys.length + 1}`, values);
    return { ...data, id };
  } catch (error) {
    console.error(`Error updating item ${id} in ${tableName}:`, error);
    throw error;
  }
};

/**
 * Delete an item by ID.
 */
export const deleteItem = async (tableName: string, id: string) => {
  try {
    await ensureTable(tableName);
    const sql = getDb();
    await sql.query(`DELETE FROM ${tableName} WHERE id = $1`, [id]);
    return true;
  } catch (error) {
    console.error(`Error deleting item ${id} from ${tableName}:`, error);
    throw error;
  }
};
