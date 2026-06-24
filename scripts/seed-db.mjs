/**
 * Seed script: Migrates existing JSON data from /data/*.json into Neon Postgres.
 * 
 * Usage: node scripts/seed-db.mjs
 */

import { readFileSync } from 'fs';
import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load .env.local
config({ path: resolve('.env.local') });

const DATABASE_URL = process.env.DATABASE_URL || process.env.POSTGRES_URL;
if (!DATABASE_URL) {
  console.error('Neither DATABASE_URL nor POSTGRES_URL found in .env.local');
  process.exit(1);
}

console.log('Connecting to Neon...');

const sql = neon(DATABASE_URL);

// Create tables
async function createTables() {
  console.log('Creating tables...');

  try {
    await sql`CREATE TABLE IF NOT EXISTS rrp_news (
      id TEXT PRIMARY KEY,
      title TEXT,
      date TEXT,
      source TEXT,
      link TEXT,
      "newsEventImg" TEXT,
      "imgBgClass" TEXT DEFAULT 'object-center',
      description TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )`;
    console.log('  rrp_news OK');
  } catch(e) {
    console.error('  rrp_news FAILED:', e.message);
  }

  try {
    await sql`CREATE TABLE IF NOT EXISTS rrp_events (
      id TEXT PRIMARY KEY,
      title TEXT,
      date TEXT,
      source TEXT,
      link TEXT,
      thumbnail TEXT,
      "newsEventBanner" TEXT,
      "newsEventImg" TEXT,
      banner TEXT,
      description TEXT,
      gallery JSONB DEFAULT '[]',
      "eventType" TEXT DEFAULT 'upcoming',
      created_at TIMESTAMPTZ DEFAULT NOW()
    )`;
    console.log('  rrp_events OK');
  } catch(e) {
    console.error('  rrp_events FAILED:', e.message);
  }

  try {
    await sql`CREATE TABLE IF NOT EXISTS rrp_careers (
      id TEXT PRIMARY KEY,
      title TEXT,
      department TEXT,
      type TEXT,
      location TEXT,
      description TEXT,
      link TEXT,
      "experienceMin" INTEGER,
      "experienceMax" INTEGER,
      "fresherAllowed" BOOLEAN DEFAULT true,
      "extraPoints" JSONB DEFAULT '[]',
      created_at TIMESTAMPTZ DEFAULT NOW()
    )`;
    console.log('  rrp_careers OK');
  } catch(e) {
    console.error('  rrp_careers FAILED:', e.message);
  }

  try {
    await sql`CREATE TABLE IF NOT EXISTS rrp_newsletter (
      id TEXT PRIMARY KEY,
      title TEXT,
      date TEXT,
      description TEXT,
      link TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )`;
    console.log('  rrp_newsletter OK');
  } catch(e) {
    console.error('  rrp_newsletter FAILED:', e.message);
  }

  console.log('Tables done');
}

async function seedNews() {
  console.log('Seeding rrp_news...');
  const data = JSON.parse(readFileSync(resolve('data', 'rrp_news.json'), 'utf-8'));
  
  const existing = await sql`SELECT COUNT(*) as count FROM rrp_news`;
  if (parseInt(existing[0].count) > 0) {
    console.log(`  Already has ${existing[0].count} rows, skipping.`);
    return;
  }

  for (const item of data) {
    try {
      await sql`INSERT INTO rrp_news (id, title, date, source, link, "newsEventImg", "imgBgClass", description)
        VALUES (${item.id}, ${item.title || null}, ${item.date || null}, ${item.source || null}, ${item.link || null}, ${item.newsEventImg || null}, ${item.imgBgClass || 'object-center'}, ${item.description || null})
        ON CONFLICT (id) DO NOTHING`;
    } catch (err) {
      console.error(`  Failed ${item.id}:`, err.message);
    }
  }

  const count = await sql`SELECT COUNT(*) as count FROM rrp_news`;
  console.log(`  rrp_news: ${count[0].count} rows`);
}

async function seedEvents() {
  console.log('Seeding rrp_events...');
  const data = JSON.parse(readFileSync(resolve('data', 'rrp_events.json'), 'utf-8'));
  
  const existing = await sql`SELECT COUNT(*) as count FROM rrp_events`;
  if (parseInt(existing[0].count) > 0) {
    console.log(`  Already has ${existing[0].count} rows, skipping.`);
    return;
  }

  for (const item of data) {
    const galleryJson = JSON.stringify(item.gallery || []);
    try {
      await sql`INSERT INTO rrp_events (id, title, date, source, link, thumbnail, "newsEventBanner", "newsEventImg", banner, description, gallery, "eventType")
        VALUES (${item.id}, ${item.title || null}, ${item.date || null}, ${item.source || null}, ${item.link || null}, ${item.thumbnail || null}, ${item.newsEventBanner || null}, ${item.newsEventImg || item.thumbnail || null}, ${item.banner || item.newsEventBanner || null}, ${item.description || null}, ${galleryJson}::jsonb, ${item.eventType || 'past'})
        ON CONFLICT (id) DO NOTHING`;
    } catch (err) {
      console.error(`  Failed ${item.id}:`, err.message);
    }
  }

  const count = await sql`SELECT COUNT(*) as count FROM rrp_events`;
  console.log(`  rrp_events: ${count[0].count} rows`);
}

async function seedCareers() {
  console.log('Seeding rrp_careers...');
  const data = JSON.parse(readFileSync(resolve('data', 'rrp_careers.json'), 'utf-8'));
  
  const existing = await sql`SELECT COUNT(*) as count FROM rrp_careers`;
  if (parseInt(existing[0].count) > 0) {
    console.log(`  Already has ${existing[0].count} rows, skipping.`);
    return;
  }

  for (const item of data) {
    const extraPointsJson = JSON.stringify(item.extraPoints || []);
    try {
      await sql`INSERT INTO rrp_careers (id, title, department, type, location, description, link, "experienceMin", "experienceMax", "fresherAllowed", "extraPoints")
        VALUES (${item.id}, ${item.title || null}, ${item.department || null}, ${item.type || null}, ${item.location || null}, ${item.description || null}, ${item.link || null}, ${item.experienceMin ?? null}, ${item.experienceMax ?? null}, ${item.fresherAllowed ?? true}, ${extraPointsJson}::jsonb)
        ON CONFLICT (id) DO NOTHING`;
    } catch (err) {
      console.error(`  Failed ${item.id}:`, err.message);
    }
  }

  const count = await sql`SELECT COUNT(*) as count FROM rrp_careers`;
  console.log(`  rrp_careers: ${count[0].count} rows`);
}

async function seedNewsletters() {
  console.log('Seeding rrp_newsletter...');
  const data = JSON.parse(readFileSync(resolve('data', 'rrp_newsletter.json'), 'utf-8'));
  
  const existing = await sql`SELECT COUNT(*) as count FROM rrp_newsletter`;
  if (parseInt(existing[0].count) > 0) {
    console.log(`  Already has ${existing[0].count} rows, skipping.`);
    return;
  }

  for (const item of data) {
    try {
      await sql`INSERT INTO rrp_newsletter (id, title, date, description, link)
        VALUES (${item.id}, ${item.title || null}, ${item.date || null}, ${item.description || null}, ${item.link || null})
        ON CONFLICT (id) DO NOTHING`;
    } catch (err) {
      console.error(`  Failed ${item.id}:`, err.message);
    }
  }

  const count = await sql`SELECT COUNT(*) as count FROM rrp_newsletter`;
  console.log(`  rrp_newsletter: ${count[0].count} rows`);
}

async function main() {
  console.log('Starting database seed...');
  
  // Test connection first
  try {
    const result = await sql`SELECT 1 as test`;
    console.log('Connection test: OK');
  } catch(e) {
    console.error('Connection test FAILED:', e.message);
    process.exit(1);
  }

  await createTables();
  await seedNews();
  await seedEvents();
  await seedCareers();
  await seedNewsletters();

  console.log('Seed complete!');
}

main().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
