import { put } from '@vercel/blob';
import { getDb } from '../lib/db';
import { getAllItems, updateItem } from '../lib/cms-actions';
import { TABLES } from '../lib/database-schema';

async function processObjectStrings(obj: any, processString: (str: string) => Promise<string>): Promise<any> {
  const result = { ...obj };
  for (const [key, value] of Object.entries(result)) {
    if (typeof value === 'string' && value.includes('vercel-storage.com')) {
      result[key] = await processString(value);
    } else if (Array.isArray(value)) {
      result[key] = await Promise.all(
        value.map(async (item) => {
          if (item && typeof item === 'object' && item.url && item.url.includes('vercel-storage.com')) {
            return { ...item, url: await processString(item.url) };
          } else if (typeof item === 'string' && item.includes('vercel-storage.com')) {
            return await processString(item);
          }
          return item;
        })
      );
    }
  }
  return result;
}

async function run() {
  require('dotenv').config({ path: '.env.local' });
  console.log("Starting migration...");

  const processUrl = async (urlStr: string) => {
    try {
      if (!urlStr.includes('/migrated/')) return urlStr;
      
      const res = await fetch(urlStr);
      if (!res.ok) throw new Error('Fetch failed ' + res.status);
      const arrayBuffer = await res.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      const parts = urlStr.split('/');
      let filename = parts[parts.length - 1];
      
      if (/^\d{13}-/.test(filename)) {
        filename = filename.substring(14);
      }
      
      // Append a unique UUID just to be absolutely safe
      const extension = filename.split('.').pop();
      const base = filename.replace('.' + extension, '');
      const newFilename = `${base}-${Date.now().toString().slice(-4)}.${extension}`;
      
      const blob = await put(newFilename, buffer, {
        access: 'public',
        token: process.env.BLOB_READ_WRITE_TOKEN
      });
      
      console.log(`Re-uploaded to ${blob.url}`);
      return blob.url;
    } catch (err: any) {
      console.error(`Failed on ${urlStr}: ${err.message}`);
      return urlStr;
    }
  };

  const tables = [TABLES.NEWS, TABLES.EVENTS, TABLES.CAREERS, TABLES.NEWSLETTERS];
  let totalUpdated = 0;

  for (const table of tables) {
    const items = await getAllItems(table);
    console.log(`Processing table ${table} with ${items.length} items...`);
    for (const item of items) {
      const updatedItem = await processObjectStrings(item, async (p) => {
        if (p.includes('/migrated/')) {
          return await processUrl(p);
        }
        return p;
      });
      
      if (JSON.stringify(item) !== JSON.stringify(updatedItem)) {
        console.log(`Updating ${item.title}...`);
        await updateItem(table, item.id, updatedItem);
        totalUpdated++;
      }
    }
  }

  console.log(`Migration complete! Total updated: ${totalUpdated}`);
  process.exit(0);
}

run().catch(console.error);
