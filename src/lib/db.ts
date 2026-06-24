import { neon } from '@neondatabase/serverless';

/**
 * Get a SQL query function connected to the Neon database.
 * Uses the pooled connection URL for optimal performance.
 */
export function getDb() {
  const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!databaseUrl) {
    throw new Error('Neither DATABASE_URL nor POSTGRES_URL environment variable is set');
  }
  return neon(databaseUrl);
}
