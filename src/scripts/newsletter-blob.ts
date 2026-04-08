import { put, del, list } from '@vercel/blob';
import { getAllItems, updateItem } from '../lib/cms-actions';
import { TABLES } from '../lib/database-schema';
import fs from 'fs/promises';
import path from 'path';

async function run() {
  require('dotenv').config({ path: '.env.local' });
  console.log("Starting newsletter PDF upload & /migrated folder cleanup...");

  // 1. Process Newsletter PDFs from local /public folder if needed
  const newsletters = await getAllItems(TABLES.NEWSLETTERS);
  let totalNewsletterUpdates = 0;

  for (const item of newsletters) {
    let updatedItem = { ...item };
    
    // The newsletter link/file is typically stored in `link` or `image`?
    // Let's check `link` which might point to `/pdf/` or `pdf/`
    if (updatedItem.link && updatedItem.link.includes('/documents/') && !updatedItem.link.includes('vercel-storage.com')) {
      try {
        const localPath = updatedItem.link.startsWith('/') ? updatedItem.link.substring(1) : updatedItem.link;
        const fullPath = path.join(process.cwd(), 'public', localPath);
        
        console.log(`Reading local PDF: ${fullPath}`);
        const fileBuffer = await fs.readFile(fullPath);
        
        const filename = path.basename(localPath);
        
        // Ensure no timestamp or /migrated prefix
        const base = filename.split('.')[0];
        const ext = filename.split('.')[1] || 'pdf';
        const newFilename = `${base}-${Date.now().toString().slice(-4)}.${ext}`;
        
        const blob = await put(newFilename, fileBuffer, {
          access: 'public',
          token: process.env.BLOB_READ_WRITE_TOKEN
        });
        
        updatedItem.link = blob.url;
        console.log(`Uploaded Newsletter PDF -> ${blob.url}`);
      } catch (err: any) {
        console.error(`Failed to process local PDF ${updatedItem.link}:`, err.message);
      }
    }
    
    // Also check image if Newsletter has an image/thumbnail 
    if (updatedItem.image && updatedItem.image.includes('/images/') && !updatedItem.image.includes('vercel-storage.com')) {
      try {
        const localPath = updatedItem.image.startsWith('/') ? updatedItem.image.substring(1) : updatedItem.image;
        const fullPath = path.join(process.cwd(), 'public', localPath);
        
        console.log(`Reading local image: ${fullPath}`);
        const fileBuffer = await fs.readFile(fullPath);
        
        const filename = path.basename(localPath);
        const base = filename.split('.')[0];
        const ext = filename.split('.')[1] || 'webp';
        const newFilename = `${base}-${Date.now().toString().slice(-4)}.${ext}`;
        
        const blob = await put(newFilename, fileBuffer, {
          access: 'public',
          token: process.env.BLOB_READ_WRITE_TOKEN
        });
        
        updatedItem.image = blob.url;
        console.log(`Uploaded Newsletter Image -> ${blob.url}`);
      } catch (err: any) {
        console.error(`Failed to process local image ${updatedItem.image}:`, err.message);
      }
    } else if (updatedItem.image && updatedItem.image.includes('/migrated/')) {
        // Just in case it's in /migrated
        try {
            const urlStr = updatedItem.image;
            const res = await fetch(urlStr);
            const arrayBuffer = await res.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            
            const parts = urlStr.split('/');
            let filename = parts[parts.length - 1];
            
            if (/^\d{13}-/.test(filename)) {
              filename = filename.substring(14);
            }
            
            const extension = filename.split('.').pop() || 'webp';
            const base = filename.replace('.' + extension, '');
            const newFilename = `${base}-${Date.now().toString().slice(-4)}.${extension}`;
            
            const blob = await put(newFilename, buffer, {
              access: 'public',
              token: process.env.BLOB_READ_WRITE_TOKEN
            });
            updatedItem.image = blob.url;
        } catch(e: any) {
            console.error(`Failed to re-upload migrated image:`, e.message);
        }
    }

    if (JSON.stringify(item) !== JSON.stringify(updatedItem)) {
      console.log(`Updating Newsletter ${item.title} in DB...`);
      await updateItem(TABLES.NEWSLETTERS, item.id, updatedItem);
      totalNewsletterUpdates++;
    }
  }
  console.log(`Newsletter updates: ${totalNewsletterUpdates}`);

  // 2. Delete /migrated folder items from Vercel Blob
  console.log("Fetching blobs in /migrated folder...");
  let cursor;
  let deletedCount = 0;
  
  do {
    const listResult = await list({
      prefix: 'migrated/',
      cursor,
      token: process.env.BLOB_READ_WRITE_TOKEN
    });

    if (listResult.blobs.length > 0) {
      const urlsToDelete = listResult.blobs.map(b => b.url);
      console.log(`Deleting ${urlsToDelete.length} blobs...`);
      await del(urlsToDelete, { token: process.env.BLOB_READ_WRITE_TOKEN });
      deletedCount += urlsToDelete.length;
    }

    cursor = listResult.cursor;
  } while (cursor);

  console.log(`Cleanup complete. Deleted ${deletedCount} blobs from /migrated/`);
  process.exit(0);
}

run().catch(console.error);
