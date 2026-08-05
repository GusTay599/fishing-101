// Database schema and initialization

import Database from 'better-sqlite3';
import type { Database as SqliteDatabase } from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

import { seedFishingSpots } from './seed-spots.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_DIR = path.join(__dirname, '../../data');
const DB_PATH = path.join(DB_DIR, 'fishing_catches.db');

export function initDatabase(): SqliteDatabase {
  // Ensure data directory exists
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  const db = new Database(DB_PATH);
  
  // Enable WAL mode for better concurrency
  db.pragma('journal_mode = WAL');
  
  // Create tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS catches (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      species TEXT NOT NULL,
      weight_lbs REAL,
      weight_oz REAL,
      length_inches REAL,
      girth_inches REAL,
      latitude REAL NOT NULL,
      longitude REAL NOT NULL,
      location_name TEXT,
      water_type TEXT NOT NULL,
      bait TEXT,
      lure TEXT,
      technique TEXT,
      depth_ft REAL,
      water_temp_f REAL,
      air_temp_f REAL,
      weather_condition TEXT,
      wind_speed_mph REAL,
      wind_direction REAL,
      moon_phase TEXT,
      moon_illumination REAL,
      tide_stage TEXT,
      tide_height_ft REAL,
      notes TEXT,
      photos TEXT, -- JSON array
      caught_at TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    
    CREATE INDEX IF NOT EXISTS idx_catches_caught_at ON catches(caught_at);
    CREATE INDEX IF NOT EXISTS idx_catches_species ON catches(species);
    CREATE INDEX IF NOT EXISTS idx_catches_location ON catches(latitude, longitude);
    CREATE INDEX IF NOT EXISTS idx_catches_created_at ON catches(created_at);
    CREATE INDEX IF NOT EXISTS idx_catches_user_id ON catches(user_id);
    
    CREATE TABLE IF NOT EXISTS tide_stations (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      latitude REAL NOT NULL,
      longitude REAL NOT NULL,
      state TEXT,
      timezone TEXT
    );
    
    CREATE TABLE IF NOT EXISTS weather_cache (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      latitude REAL NOT NULL,
      longitude REAL NOT NULL,
      data TEXT NOT NULL, -- JSON
      fetched_at TEXT NOT NULL DEFAULT (datetime('now')),
      expires_at TEXT NOT NULL
    );
    
    CREATE INDEX IF NOT EXISTS idx_weather_cache_location ON weather_cache(latitude, longitude);
    CREATE INDEX IF NOT EXISTS idx_weather_cache_expires ON weather_cache(expires_at);
    
    CREATE TABLE IF NOT EXISTS tide_cache (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      station_id TEXT NOT NULL,
      date TEXT NOT NULL, -- YYYY-MM-DD
      data TEXT NOT NULL, -- JSON
      fetched_at TEXT NOT NULL DEFAULT (datetime('now')),
      expires_at TEXT NOT NULL
    );
    
    CREATE INDEX IF NOT EXISTS idx_tide_cache_station_date ON tide_cache(station_id, date);
    CREATE INDEX IF NOT EXISTS idx_tide_cache_expires ON tide_cache(expires_at);
    
    CREATE TABLE IF NOT EXISTS fishing_spots (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      latitude REAL NOT NULL,
      longitude REAL NOT NULL,
      description TEXT,
      water_type TEXT NOT NULL,
      species TEXT, -- JSON array
      access_type TEXT NOT NULL,
      image_urls TEXT, -- JSON array of base64 data URLs
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      avatar_url TEXT,
      preferences TEXT, -- JSON
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    
    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    
    -- Forum tables
    CREATE TABLE IF NOT EXISTS forum_posts (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      category TEXT NOT NULL,
      title TEXT NOT NULL,
      body TEXT NOT NULL,
      pinned INTEGER NOT NULL DEFAULT 0,
      locked INTEGER NOT NULL DEFAULT 0,
      views INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
    
    CREATE INDEX IF NOT EXISTS idx_forum_posts_category ON forum_posts(category);
    CREATE INDEX IF NOT EXISTS idx_forum_posts_user_id ON forum_posts(user_id);
    CREATE INDEX IF NOT EXISTS idx_forum_posts_created_at ON forum_posts(created_at);
    
    CREATE TABLE IF NOT EXISTS forum_comments (
      id TEXT PRIMARY KEY,
      post_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      body TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (post_id) REFERENCES forum_posts(id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
    
    CREATE INDEX IF NOT EXISTS idx_forum_comments_post_id ON forum_comments(post_id);
    CREATE INDEX IF NOT EXISTS idx_forum_comments_user_id ON forum_comments(user_id);
    
    CREATE TABLE IF NOT EXISTS forum_likes (
      id TEXT PRIMARY KEY,
      post_id TEXT,
      comment_id TEXT,
      user_id TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (post_id) REFERENCES forum_posts(id),
      FOREIGN KEY (comment_id) REFERENCES forum_comments(id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
    
    CREATE INDEX IF NOT EXISTS idx_forum_likes_post ON forum_likes(post_id);
    CREATE INDEX IF NOT EXISTS idx_forum_likes_comment ON forum_likes(comment_id);
    
    -- Migration: add image_urls to fishing_spots if missing
    PRAGMA table_info(fishing_spots);
  `);
  
  // Check if image_urls column exists, add if not
  const columns = db.prepare("PRAGMA table_info(fishing_spots)").all() as { name: string }[];
  if (!columns.some(c => c.name === 'image_urls')) {
    db.exec(`ALTER TABLE fishing_spots ADD COLUMN image_urls TEXT`);
  }
  
  // Seed UK fishing spots
  seedFishingSpots(db);
  
  return db;
}

const db: SqliteDatabase = initDatabase();

export { db };

// Helper functions
export function getDb(): SqliteDatabase {
  return db;
}

// Catches CRUD
export interface CatchRow {
  id: string;
  user_id: string | null;
  species: string;
  weight_lbs: number | null;
  weight_oz: number | null;
  length_inches: number | null;
  girth_inches: number | null;
  latitude: number;
  longitude: number;
  location_name: string | null;
  water_type: string;
  bait: string | null;
  lure: string | null;
  technique: string | null;
  depth_ft: number | null;
  water_temp_f: number | null;
  air_temp_f: number | null;
  weather_condition: string | null;
  wind_speed_mph: number | null;
  wind_direction: number | null;
  moon_phase: string | null;
  moon_illumination: number | null;
  tide_stage: string | null;
  tide_height_ft: number | null;
  notes: string | null;
  photos: string | null; // JSON string
  caught_at: string;
  created_at: string;
  updated_at: string;
}

export function createCatch(catchData: Omit<CatchRow, 'id' | 'created_at' | 'updated_at'> & { id: string }): void {
  const stmt = db.prepare(`
    INSERT INTO catches (
      id, user_id, species, weight_lbs, weight_oz, length_inches, girth_inches,
      latitude, longitude, location_name, water_type, bait, lure, technique,
      depth_ft, water_temp_f, air_temp_f, weather_condition,
      wind_speed_mph, wind_direction, moon_phase, moon_illumination,
      tide_stage, tide_height_ft, notes, photos, caught_at, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  stmt.run(
    catchData.id,
    catchData.user_id || null,
    catchData.species,
    catchData.weight_lbs,
    catchData.weight_oz,
    catchData.length_inches,
    catchData.girth_inches,
    catchData.latitude,
    catchData.longitude,
    catchData.location_name,
    catchData.water_type,
    catchData.bait,
    catchData.lure,
    catchData.technique,
    catchData.depth_ft,
    catchData.water_temp_f,
    catchData.air_temp_f,
    catchData.weather_condition,
    catchData.wind_speed_mph,
    catchData.wind_direction,
    catchData.moon_phase,
    catchData.moon_illumination,
    catchData.tide_stage,
    catchData.tide_height_ft,
    catchData.notes,
    catchData.photos,
    catchData.caught_at,
    new Date().toISOString(),
    new Date().toISOString()
  );
}

export function getCatch(id: string): CatchRow | null {
  const stmt = db.prepare('SELECT * FROM catches WHERE id = ?');
  return stmt.get(id) as CatchRow | null;
}

export function getCatches(filters: {
  species?: string;
  water_type?: string;
  startDate?: string;
  endDate?: string;
  minWeight?: number;
  maxWeight?: number;
  bait?: string;
  lure?: string;
  technique?: string;
  latitude?: number;
  longitude?: number;
  radius?: number;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
} = {}): { data: CatchRow[]; total: number } {
  let whereClause = 'WHERE 1=1';
  const params: any[] = [];
  
  if (filters.species) {
    whereClause += ' AND species LIKE ?';
    params.push(`%${filters.species}%`);
  }
  
  if (filters.water_type) {
    whereClause += ' AND water_type = ?';
    params.push(filters.water_type);
  }
  
  if (filters.startDate) {
    whereClause += ' AND caught_at >= ?';
    params.push(filters.startDate);
  }
  
  if (filters.endDate) {
    whereClause += ' AND caught_at <= ?';
    params.push(filters.endDate);
  }
  
  if (filters.minWeight !== undefined) {
    whereClause += ' AND (weight_lbs + weight_oz/16.0) >= ?';
    params.push(filters.minWeight);
  }
  
  if (filters.maxWeight !== undefined) {
    whereClause += ' AND (weight_lbs + weight_oz/16.0) <= ?';
    params.push(filters.maxWeight);
  }
  
  if (filters.bait) {
    whereClause += ' AND bait LIKE ?';
    params.push(`%${filters.bait}%`);
  }
  
  if (filters.lure) {
    whereClause += ' AND lure LIKE ?';
    params.push(`%${filters.lure}%`);
  }
  
  if (filters.technique) {
    whereClause += ' AND technique LIKE ?';
    params.push(`%${filters.technique}%`);
  }
  
  if (filters.latitude !== undefined && filters.longitude !== undefined && filters.radius !== undefined) {
    const degRadius = filters.radius / 111;
    whereClause += ` AND latitude BETWEEN ? AND ? AND longitude BETWEEN ? AND ?`;
    params.push(
      filters.latitude - degRadius,
      filters.latitude + degRadius,
      filters.longitude - degRadius,
      filters.longitude + degRadius
    );
  }
  
  const sortBy = filters.sortBy || 'caught_at';
  const sortOrder = filters.sortOrder || 'desc';
  const allowedSortColumns = ['caught_at', 'species', 'weight_lbs', 'length_inches', 'created_at'];
  const safeSortBy = allowedSortColumns.includes(sortBy) ? sortBy : 'caught_at';
  
  const page = filters.page || 1;
  const pageSize = filters.pageSize || 20;
  const offset = (page - 1) * pageSize;
  
  // Get total count
  const countStmt = db.prepare(`SELECT COUNT(*) as total FROM catches ${whereClause}`);
  const total = (countStmt.get(...params) as { total: number }).total;
  
  // Get paginated data
  const dataStmt = db.prepare(`
    SELECT * FROM catches ${whereClause}
    ORDER BY ${safeSortBy} ${sortOrder.toUpperCase()}
    LIMIT ? OFFSET ?
  `);
  const data = dataStmt.all(...params, pageSize, offset) as CatchRow[];
  
  return { data, total };
}

export function updateCatch(id: string, updates: Partial<CatchRow>): boolean {
  const allowedFields = [
    'species', 'weight_lbs', 'weight_oz', 'length_inches', 'girth_inches',
    'latitude', 'longitude', 'location_name', 'water_type', 'bait', 'lure',
    'technique', 'depth_ft', 'water_temp_f', 'air_temp_f', 'weather_condition',
    'wind_speed_mph', 'wind_direction', 'moon_phase', 'moon_illumination',
    'tide_stage', 'tide_height_ft', 'notes', 'photos', 'caught_at'
  ];
  
  const setClause = Object.keys(updates)
    .filter(key => allowedFields.includes(key))
    .map(key => `${key} = ?`)
    .join(', ');
  
  if (!setClause) return false;
  
  const values = Object.entries(updates)
    .filter(([key]) => allowedFields.includes(key))
    .map(([, value]) => value);
  
  values.push(new Date().toISOString()); // updated_at
  values.push(id);
  
  const stmt = db.prepare(`
    UPDATE catches SET ${setClause}, updated_at = ? WHERE id = ?
  `);
  
  const result = stmt.run(...values);
  return result.changes > 0;
}

export function deleteCatch(id: string): boolean {
  const stmt = db.prepare('DELETE FROM catches WHERE id = ?');
  const result = stmt.run(id);
  return result.changes > 0;
}

export function getCatchStats(): {
  totalCatches: number;
  speciesCount: number;
  totalWeight: number;
  avgWeight: number;
  maxWeight: number;
  topSpecies: Array<{ species: string; count: number; avg_weight: number }>;
  topBaits: Array<{ bait: string; count: number }>;
  monthlyCatches: Array<{ month: string; count: number }>;
} {
  const totalStmt = db.prepare('SELECT COUNT(*) as count FROM catches');
  const totalCatches = (totalStmt.get() as { count: number }).count;
  
  const speciesStmt = db.prepare('SELECT COUNT(DISTINCT species) as count FROM catches');
  const speciesCount = (speciesStmt.get() as { count: number }).count;
  
  const weightStmt = db.prepare('SELECT SUM(weight_lbs + weight_oz/16.0) as total, AVG(weight_lbs + weight_oz/16.0) as avg, MAX(weight_lbs + weight_oz/16.0) as max FROM catches WHERE weight_lbs IS NOT NULL OR weight_oz IS NOT NULL');
  const weightData = weightStmt.get() as { total: number | null; avg: number | null; max: number | null };
  
  const topSpeciesStmt = db.prepare(`
    SELECT species, COUNT(*) as count, AVG(weight_lbs + weight_oz/16.0) as avg_weight
    FROM catches 
    GROUP BY species 
    ORDER BY count DESC 
    LIMIT 10
  `);
  const topSpecies = topSpeciesStmt.all() as Array<{ species: string; count: number; avg_weight: number }>;
  
  const topBaitsStmt = db.prepare(`
    SELECT bait, COUNT(*) as count
    FROM catches
    WHERE bait IS NOT NULL AND bait != ''
    GROUP BY bait
    ORDER BY count DESC
    LIMIT 10
  `);
  const topBaits = topBaitsStmt.all() as Array<{ bait: string; count: number }>;
  
  const monthlyCatchesStmt = db.prepare(`
    SELECT strftime('%Y-%m', caught_at) as month, COUNT(*) as count
    FROM catches
    GROUP BY month
    ORDER BY month DESC
    LIMIT 12
  `);
  const monthlyCatches = monthlyCatchesStmt.all() as Array<{ month: string; count: number }>;
  
  return {
    totalCatches,
    speciesCount,
    totalWeight: weightData.total || 0,
    avgWeight: weightData.avg || 0,
    maxWeight: weightData.max || 0,
    topSpecies,
    topBaits,
    monthlyCatches: monthlyCatches.reverse()
  };
}

// Tide Stations
export interface TideStationRow {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  state: string | null;
  timezone: string | null;
}

export function upsertTideStation(station: TideStationRow): void {
  const stmt = db.prepare(`
    INSERT INTO tide_stations (id, name, latitude, longitude, state, timezone)
    VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      name = excluded.name,
      latitude = excluded.latitude,
      longitude = excluded.longitude,
      state = excluded.state,
      timezone = excluded.timezone
  `);
  stmt.run(station.id, station.name, station.latitude, station.longitude, station.state, station.timezone);
}

export function getNearbyTideStations(latitude: number, longitude: number, radiusKm: number = 50): TideStationRow[] {
  const degRadius = radiusKm / 111;
  const stmt = db.prepare(`
    SELECT * FROM tide_stations
    WHERE latitude BETWEEN ? AND ? AND longitude BETWEEN ? AND ?
    ORDER BY 
      (latitude - ?) * (latitude - ?) + (longitude - ?) * (longitude - ?)
    LIMIT 10
  `);
  return stmt.all(
    latitude - degRadius, latitude + degRadius,
    longitude - degRadius, longitude + degRadius,
    latitude, latitude, longitude, longitude
  ) as TideStationRow[];
}

// Weather Cache
export interface WeatherCacheRow {
  id: number;
  latitude: number;
  longitude: number;
  data: string;
  fetched_at: string;
  expires_at: string;
}

export function getCachedWeather(latitude: number, longitude: number): WeatherCacheRow | null {
  const stmt = db.prepare(`
    SELECT * FROM weather_cache 
    WHERE latitude = ? AND longitude = ? AND expires_at > datetime('now')
    ORDER BY fetched_at DESC LIMIT 1
  `);
  return stmt.get(latitude, longitude) as WeatherCacheRow | null;
}

export function setCachedWeather(latitude: number, longitude: number, data: any, ttlMinutes: number = 30): void {
  const expiresAt = new Date(Date.now() + ttlMinutes * 60 * 1000).toISOString();
  const stmt = db.prepare(`
    INSERT INTO weather_cache (latitude, longitude, data, expires_at)
    VALUES (?, ?, ?, ?)
  `);
  stmt.run(latitude, longitude, JSON.stringify(data), expiresAt);
}

// Tide Cache
export interface TideCacheRow {
  id: number;
  station_id: string;
  date: string;
  data: string;
  fetched_at: string;
  expires_at: string;
}

export function getCachedTide(stationId: string, date: string): TideCacheRow | null {
  const stmt = db.prepare(`
    SELECT * FROM tide_cache 
    WHERE station_id = ? AND date = ? AND expires_at > datetime('now')
    ORDER BY fetched_at DESC LIMIT 1
  `);
  return stmt.get(stationId, date) as TideCacheRow | null;
}

export function setCachedTide(stationId: string, date: string, data: any, ttlHours: number = 24): void {
  const expiresAt = new Date(Date.now() + ttlHours * 60 * 60 * 1000).toISOString();
  const stmt = db.prepare(`
    INSERT INTO tide_cache (station_id, date, data, expires_at)
    VALUES (?, ?, ?, ?)
  `);
  stmt.run(stationId, date, JSON.stringify(data), expiresAt);
}

// Fishing Spots
export interface FishingSpotRow {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  description: string | null;
  water_type: string;
  species: string; // JSON
  access_type: string;
  image_urls: string | null; // JSON array of base64 data URLs
  created_at: string;
}

export function createFishingSpot(spot: Omit<FishingSpotRow, 'created_at'> & { created_at: string }): void {
  const stmt = db.prepare(`
    INSERT INTO fishing_spots (id, name, latitude, longitude, description, water_type, species, access_type, image_urls, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  stmt.run(spot.id, spot.name, spot.latitude, spot.longitude, spot.description, spot.water_type, spot.species, spot.access_type, spot.image_urls, spot.created_at);
}

export function getFishingSpots(filters: {
  latitude?: number;
  longitude?: number;
  radiusKm?: number;
  water_type?: string;
  name?: string;
} = {}): FishingSpotRow[] {
  let whereClause = 'WHERE 1=1';
  const params: any[] = [];
  
  if (filters.latitude !== undefined && filters.longitude !== undefined && filters.radiusKm !== undefined) {
    const degRadius = filters.radiusKm / 111;
    whereClause += ` AND latitude BETWEEN ? AND ? AND longitude BETWEEN ? AND ?`;
    params.push(
      filters.latitude - degRadius,
      filters.latitude + degRadius,
      filters.longitude - degRadius,
      filters.longitude + degRadius
    );
  }
  
  if (filters.water_type) {
    whereClause += ' AND water_type = ?';
    params.push(filters.water_type);
  }
  
  if (filters.name) {
    whereClause += ' AND name LIKE ?';
    params.push(`%${filters.name}%`);
  }
  
  const stmt = db.prepare(`
    SELECT * FROM fishing_spots ${whereClause}
    ORDER BY created_at DESC
    LIMIT 50
  `);
  return stmt.all(...params) as FishingSpotRow[];
}

// Users
export interface UserRow {
  id: string;
  email: string;
  name: string;
  password_hash: string;
  avatar_url: string | null;
  preferences: string | null; // JSON
  created_at: string;
  updated_at: string;
}

export interface UserPublic {
  id: string;
  email: string;
  name: string;
  avatar_url: string | null;
  preferences: any;
  created_at: string;
}

export function createUser(userData: { id: string; email: string; name: string; password_hash: string }): UserRow {
  const defaultPrefs = JSON.stringify({
    units: 'imperial',
    theme: 'system',
    notifications: { tide_alerts: true, solunar_alerts: true, weather_alerts: false },
    default_water_type: 'freshwater',
  });
  
  const stmt = db.prepare(`
    INSERT INTO users (id, email, name, password_hash, preferences, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, datetime('now'), datetime('now'))
  `);
  stmt.run(userData.id, userData.email.toLowerCase(), userData.name, userData.password_hash, defaultPrefs);
  
  return getUserById(userData.id)!;
}

export function getUserById(id: string): UserRow | null {
  const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
  return stmt.get(id) as UserRow | null;
}

export function getUserByEmail(email: string): UserRow | null {
  const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
  return stmt.get(email.toLowerCase()) as UserRow | null;
}

export function updateUserPrefs(id: string, preferences: any): boolean {
  const stmt = db.prepare(`
    UPDATE users SET preferences = ?, updated_at = datetime('now') WHERE id = ?
  `);
  const result = stmt.run(JSON.stringify(preferences), id);
  return result.changes > 0;
}

export function userToPublic(user: UserRow): UserPublic {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    avatar_url: user.avatar_url,
    preferences: user.preferences ? JSON.parse(user.preferences) : null,
    created_at: user.created_at,
  };
}

// Forum
export const FORUM_CATEGORIES = [
  { id: 'general', name: 'General Discussion', description: 'Chat about anything fishing-related', icon: '💬', color: '#0d9488' },
  { id: 'spots', name: 'Fishing Spots & Reports', description: 'Share your favourite spots and recent session reports', icon: '📍', color: '#0891b2' },
  { id: 'tackle', name: 'Tackle & Techniques', description: 'Discuss rods, reels, rigs, and fishing methods', icon: '🎣', color: '#7c3aed' },
  { id: 'species', name: 'Species Talk', description: 'Identify fish, share tips for specific species', icon: '🐟', color: '#059669' },
  { id: 'news', name: 'News & Events', description: 'Fishing news, competitions, and events', icon: '📰', color: '#d97706' },
  { id: 'help', name: 'Help & Questions', description: 'Ask questions and get advice from the community', icon: '❓', color: '#dc2626' },
];

export interface ForumPostRow {
  id: string;
  user_id: string;
  category: string;
  title: string;
  body: string;
  pinned: number;
  locked: number;
  views: number;
  created_at: string;
  updated_at: string;
}

export interface ForumCommentRow {
  id: string;
  post_id: string;
  user_id: string;
  body: string;
  created_at: string;
}

export function createForumPost(post: { id: string; user_id: string; category: string; title: string; body: string }): void {
  const stmt = db.prepare(`
    INSERT INTO forum_posts (id, user_id, category, title, body)
    VALUES (?, ?, ?, ?, ?)
  `);
  stmt.run(post.id, post.user_id, post.category, post.title, post.body);
}

export function getForumPosts(filters: {
  category?: string;
  search?: string;
  page?: number;
  pageSize?: number;
} = {}): { data: Array<ForumPostRow & { author_name: string; comment_count: number; like_count: number }>; total: number } {
  let whereClause = 'WHERE 1=1';
  const params: any[] = [];

  if (filters.category) {
    whereClause += ' AND p.category = ?';
    params.push(filters.category);
  }

  if (filters.search) {
    whereClause += ' AND (p.title LIKE ? OR p.body LIKE ?)';
    params.push(`%${filters.search}%`, `%${filters.search}%`);
  }

  const page = filters.page || 1;
  const pageSize = filters.pageSize || 20;
  const offset = (page - 1) * pageSize;

  const countStmt = db.prepare(`SELECT COUNT(*) as total FROM forum_posts p ${whereClause}`);
  const total = (countStmt.get(...params) as { total: number }).total;

  const dataStmt = db.prepare(`
    SELECT p.*, u.name as author_name,
      (SELECT COUNT(*) FROM forum_comments c WHERE c.post_id = p.id) as comment_count,
      (SELECT COUNT(*) FROM forum_likes l WHERE l.post_id = p.id) as like_count
    FROM forum_posts p
    LEFT JOIN users u ON p.user_id = u.id
    ${whereClause}
    ORDER BY p.pinned DESC, p.created_at DESC
    LIMIT ? OFFSET ?
  `);
  const data = dataStmt.all(...params, pageSize, offset) as Array<ForumPostRow & { author_name: string; comment_count: number; like_count: number }>;

  return { data, total };
}

export function getForumPost(id: string): (ForumPostRow & { author_name: string; comment_count: number; like_count: number }) | null {
  // Increment views
  db.prepare('UPDATE forum_posts SET views = views + 1 WHERE id = ?').run(id);

  const stmt = db.prepare(`
    SELECT p.*, u.name as author_name,
      (SELECT COUNT(*) FROM forum_comments c WHERE c.post_id = p.id) as comment_count,
      (SELECT COUNT(*) FROM forum_likes l WHERE l.post_id = p.id) as like_count
    FROM forum_posts p
    LEFT JOIN users u ON p.user_id = u.id
    WHERE p.id = ?
  `);
  return stmt.get(id) as (ForumPostRow & { author_name: string; comment_count: number; like_count: number }) | null;
}

export function deleteForumPost(id: string): boolean {
  // Delete comments first
  db.prepare('DELETE FROM forum_comments WHERE post_id = ?').run(id);
  db.prepare('DELETE FROM forum_likes WHERE post_id = ?').run(id);
  const result = db.prepare('DELETE FROM forum_posts WHERE id = ?').run(id);
  return result.changes > 0;
}

export function getForumComments(postId: string): Array<ForumCommentRow & { author_name: string }> {
  const stmt = db.prepare(`
    SELECT c.*, u.name as author_name
    FROM forum_comments c
    LEFT JOIN users u ON c.user_id = u.id
    WHERE c.post_id = ?
    ORDER BY c.created_at ASC
  `);
  return stmt.all(postId) as Array<ForumCommentRow & { author_name: string }>;
}

export function createForumComment(comment: { id: string; post_id: string; user_id: string; body: string }): void {
  const stmt = db.prepare(`
    INSERT INTO forum_comments (id, post_id, user_id, body)
    VALUES (?, ?, ?, ?)
  `);
  stmt.run(comment.id, comment.post_id, comment.user_id, comment.body);
}

export function deleteForumComment(id: string): boolean {
  db.prepare('DELETE FROM forum_likes WHERE comment_id = ?').run(id);
  const result = db.prepare('DELETE FROM forum_comments WHERE id = ?').run(id);
  return result.changes > 0;
}

export function toggleForumLike(userId: string, postId?: string, commentId?: string): boolean {
  // Check if like exists
  let existing;
  if (postId) {
    existing = db.prepare('SELECT id FROM forum_likes WHERE user_id = ? AND post_id = ?').get(userId, postId);
  } else if (commentId) {
    existing = db.prepare('SELECT id FROM forum_likes WHERE user_id = ? AND comment_id = ?').get(userId, commentId);
  }

  if (existing) {
    // Unlike
    if (postId) {
      db.prepare('DELETE FROM forum_likes WHERE user_id = ? AND post_id = ?').run(userId, postId);
    } else if (commentId) {
      db.prepare('DELETE FROM forum_likes WHERE user_id = ? AND comment_id = ?').run(userId, commentId);
    }
    return false;
  } else {
    // Like
    const id = uuidv4();
    if (postId) {
      db.prepare('INSERT INTO forum_likes (id, post_id, user_id) VALUES (?, ?, ?)').run(id, postId, userId);
    } else if (commentId) {
      db.prepare('INSERT INTO forum_likes (id, comment_id, user_id) VALUES (?, ?, ?)').run(id, commentId, userId);
    }
    return true;
  }
}

export function hasUserLiked(userId: string, postId?: string, commentId?: string): boolean {
  if (postId) {
    return !!db.prepare('SELECT id FROM forum_likes WHERE user_id = ? AND post_id = ?').get(userId, postId);
  } else if (commentId) {
    return !!db.prepare('SELECT id FROM forum_likes WHERE user_id = ? AND comment_id = ?').get(userId, commentId);
  }
  return false;
}

export function getForumStats(): { totalPosts: number; totalComments: number; totalUsers: number } {
  const posts = (db.prepare('SELECT COUNT(*) as count FROM forum_posts').get() as { count: number }).count;
  const comments = (db.prepare('SELECT COUNT(*) as count FROM forum_comments').get() as { count: number }).count;
  const users = (db.prepare('SELECT COUNT(DISTINCT user_id) as count FROM forum_posts').get() as { count: number }).count;
  return { totalPosts: posts, totalComments: comments, totalUsers: users };
}