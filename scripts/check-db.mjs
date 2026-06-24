import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve('.env.local') });
const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
if (!connectionString) {
  console.error('Neither DATABASE_URL nor POSTGRES_URL is configured in .env.local');
  process.exit(1);
}
const sql = neon(connectionString);

const news = await sql`SELECT COUNT(*) as c FROM rrp_news`;
const events = await sql`SELECT COUNT(*) as c FROM rrp_events`;
const careers = await sql`SELECT COUNT(*) as c FROM rrp_careers`;
const nl = await sql`SELECT COUNT(*) as c FROM rrp_newsletter`;

console.log('=== Database Contents ===');
console.log(`News: ${news[0].c} rows`);
console.log(`Events: ${events[0].c} rows`);
console.log(`Careers: ${careers[0].c} rows`);
console.log(`Newsletters: ${nl[0].c} rows`);

console.log('\n--- Events ---');
const ev = await sql`SELECT id, title FROM rrp_events ORDER BY created_at DESC`;
ev.forEach(e => console.log(`  ${e.id}: ${e.title.substring(0, 60)}`));

console.log('\n--- News ---');
const n = await sql`SELECT id, title FROM rrp_news ORDER BY created_at DESC`;
n.forEach(e => console.log(`  ${e.id}: ${e.title.substring(0, 60)}`));
