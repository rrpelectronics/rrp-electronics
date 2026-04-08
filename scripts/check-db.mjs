import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve('.env.local') });
const sql = neon(process.env.DATABASE_URL);

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
