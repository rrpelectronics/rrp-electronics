import { neon } from '@neondatabase/serverless';

/**
 * Get a SQL query function connected to the Neon database.
 * Uses the pooled connection URL for optimal performance.
 */
export function getDb() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL environment variable is not set');
  }
  return neon(databaseUrl);
}
