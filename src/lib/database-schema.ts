// Database table names for Neon Postgres
export const TABLES = {
  NEWS: "rrp_news",
  EVENTS: "rrp_events",
  CAREERS: "rrp_careers",
  NEWSLETTERS: "rrp_newsletter",
};

/**
 * SQL statements to create all CMS tables.
 * Each table uses TEXT id as primary key (UUID generated in app layer).
 * JSON/JSONB columns store arrays like gallery images.
 */
export const CREATE_TABLE_SQL = {
  [TABLES.NEWS]: `
    CREATE TABLE IF NOT EXISTS rrp_news (
      id TEXT PRIMARY KEY,
      title TEXT,
      date TEXT,
      source TEXT,
      link TEXT,
      "newsEventImg" TEXT,
      "imgBgClass" TEXT DEFAULT 'object-center',
      description TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `,
  [TABLES.EVENTS]: `
    CREATE TABLE IF NOT EXISTS rrp_events (
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
    );
  `,
  [TABLES.CAREERS]: `
    CREATE TABLE IF NOT EXISTS rrp_careers (
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
    );
  `,
  [TABLES.NEWSLETTERS]: `
    CREATE TABLE IF NOT EXISTS rrp_newsletter (
      id TEXT PRIMARY KEY,
      title TEXT,
      date TEXT,
      description TEXT,
      link TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `,
};
