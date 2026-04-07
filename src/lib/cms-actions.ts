"use server";
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { TABLES } from "./database-schema";

const getFilePath = async (tableName: string) => {
  const dirPath = path.join(process.cwd(), 'data');
  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, { recursive: true });
  }
  return path.join(dirPath, `${tableName}.json`);
};

const _readDB = async (tableName: string) => {
  const filePath = await getFilePath(tableName);
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      await fs.writeFile(filePath, '[]', 'utf-8');
      return [];
    }
    throw error;
  }
};

const _writeDB = async (tableName: string, data: any[]) => {
  const filePath = await getFilePath(tableName);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

export const getAllItems = async (tableName: string) => {
  try {
    return await _readDB(tableName);
  } catch (error) {
    console.error(`Error fetching items from local JSON (${tableName}):`, error);
    return [];
  }
};

export const getItemById = async (tableName: string, id: string) => {
  try {
    const items = await _readDB(tableName);
    return items.find((item: any) => item.id === id) || null;
  } catch (error) {
    console.error(`Error fetching item ${id} from local JSON (${tableName}):`, error);
    return null;
  }
};

export const createItem = async (tableName: string, data: any) => {
  try {
    const id = uuidv4();
    const newItem = {
      ...data,
      id
    };

    const items = await _readDB(tableName);
    items.push(newItem);
    await _writeDB(tableName, items);

    return newItem;
  } catch (error) {
    console.error(`Error creating local JSON item in ${tableName}:`, error);
    throw error;
  }
};

export const updateItem = async (tableName: string, id: string, data: any) => {
  try {
    const items = await _readDB(tableName);
    const index = items.findIndex((item: any) => item.id === id);

    if (index === -1) throw new Error("Item not found");

    items[index] = { ...items[index], ...data };

    await _writeDB(tableName, items);
    return items[index];
  } catch (error) {
    console.error(`Error updating local JSON item ${id} in ${tableName}:`, error);
    throw error;
  }
};

export const deleteItem = async (tableName: string, id: string) => {
  try {
    const items = await _readDB(tableName);
    const updatedItems = items.filter((item: any) => item.id !== id);

    if (items.length !== updatedItems.length) {
      await _writeDB(tableName, updatedItems);
    }
    return true;
  } catch (error) {
    console.error(`Error deleting local JSON item ${id} from ${tableName}:`, error);
    throw error;
  }
};
