export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { getDb } from '@/lib/db';
import { getAllItems, updateItem } from '@/lib/cms-actions';
import { TABLES } from '@/lib/database-schema';
import fs from 'fs/promises';
import path from 'path';

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

export async function GET() {
  try {
    const processUrl = async (urlStr: string) => {
      try {
        if (!urlStr.includes('/migrated/')) return urlStr;
        
        // Fetch existing from Vercel Blob
        const res = await fetch(urlStr);
        if (!res.ok) throw new Error('Fetch failed ' + res.status);
        const arrayBuffer = await res.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        // e.g. "https://rxwdpgz5cd3mic72.public.blob.vercel-storage.com/migrated/1775631790434-et-expo-1.webp"
        const parts = urlStr.split('/');
        let filename = parts[parts.length - 1]; // "1775631790434-et-expo-1.webp"
        
        // Remove the 13-digit timestamp prefix if it exists
        if (/^\d{13}-/.test(filename)) {
          filename = filename.substring(14);
        }
        
        // Upload
        const blob = await put(filename, buffer, {
          access: 'public',
        });
        
        console.log(`Re-uploaded ${filename}`);
        return blob.url;
      } catch (err: any) {
        console.error(`Failed on ${urlStr}: ${err.message}`);
        return urlStr; // fallback
      }
    };

    const tables = [TABLES.NEWS, TABLES.EVENTS, TABLES.CAREERS, TABLES.NEWSLETTERS];
    let totalUpdated = 0;
    const successes: string[] = [];

    for (const table of tables) {
      const items = await getAllItems(table);
      for (const item of items) {
        const updatedItem = await processObjectStrings(item, async (p) => {
          if (p.includes('/migrated/')) {
            const newUrl = await processUrl(p);
            if (newUrl !== p) successes.push(newUrl);
            return newUrl;
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

    return NextResponse.json({ success: true, totalUpdated, successes });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
