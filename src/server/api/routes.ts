// Main API routes

import { Router, Request, Response } from 'express';
import { randomBytes, pbkdf2Sync } from 'crypto';
import { db, getCatches, createCatch, getCatch, updateCatch, deleteCatch, getCatchStats, getNearbyTideStations, upsertTideStation, getCachedWeather, setCachedWeather, getCachedTide, setCachedTide, getFishingSpots, createFishingSpot, FishingSpotRow, createUser, getUserByEmail, getUserById, updateUserPrefs, userToPublic, FORUM_CATEGORIES, createForumPost, getForumPosts, getForumPost, deleteForumPost, getForumComments, createForumComment, deleteForumComment, toggleForumLike, hasUserLiked, getForumStats, ForumCommentRow } from '../database';
import {
  fetchNoaaStations,
  fetchTidePredictions,
  fetchTidesFromOpenMeteo,
  fetchWeather,
  fetchMarineData,
  calculateMoonPhase,
  geocodeAddress,
  reverseGeocode
} from './external';
import {
  GetCatchesParams,
  CreateCatchInput,
  TideStation,
  TideDay,
  TidePrediction,
  WeatherData,
  MoonPhase,
  SolunarPeriod,
  LocationSearchResult,
  FishingSpot,
  ApiResponse,
  PaginatedResponse,
  MarineData
} from '../../shared/types';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Helper to calculate solunar periods
function calculateSolunarPeriods(date: Date, latitude: number, longitude: number): SolunarPeriod[] {
  const periods: SolunarPeriod[] = [];
  const moonPhase = calculateMoonPhase(date);
  
  // Simplified solunar calculation
  const baseTime = new Date(date);
  baseTime.setHours(0, 0, 0, 0);
  
  // Approximate moon transit times (very rough)
  const moonAge = moonPhase.age;
  const majorOffset = (moonAge * 50) % 1440; // minutes
  const minorOffset = (majorOffset + 720) % 1440;
  
  for (let day = 0; day < 2; day++) {
    const dayDate = new Date(baseTime.getTime() + day * 86400000);
    
    // Major periods (2 per day)
    for (const offset of [majorOffset, (majorOffset + 720) % 1440]) {
      const start = new Date(dayDate.getTime() + offset * 60000);
      const end = new Date(start.getTime() + 2 * 60 * 60 * 1000); // 2 hours
      periods.push({
        type: 'major',
        start: Math.floor(start.getTime() / 1000),
        end: Math.floor(end.getTime() / 1000),
        rating: Math.round(3 + moonPhase.illumination * 2) // 3-5
      });
    }
    
    // Minor periods (2 per day)
    for (const offset of [minorOffset, (minorOffset + 720) % 1440]) {
      const start = new Date(dayDate.getTime() + offset * 60000);
      const end = new Date(start.getTime() + 1 * 60 * 60 * 1000); // 1 hour
      periods.push({
        type: 'minor',
        start: Math.floor(start.getTime() / 1000),
        end: Math.floor(end.getTime() / 1000),
        rating: Math.round(2 + moonPhase.illumination * 1.5) // 2-3.5
      });
    }
  }
  
  return periods.sort((a, b) => a.start - b.start);
}

// GET /api/catches - Get catches with filters and pagination
router.get('/catches', async (req: Request, res: Response) => {
  try {
    const {
      species,
      water_type,
      start_date,
      end_date,
      min_weight,
      max_weight,
      bait,
      lure,
      technique,
      latitude,
      longitude,
      radius_km = '50',
      limit = '50',
      offset = '0',
      sort_by = 'caught_at',
      sort_order = 'desc'
    } = req.query;
    
    const page = Math.floor(parseInt(offset as string) / parseInt(limit as string)) + 1;
    const pageSize = parseInt(limit as string);
    
    const result = getCatches({
      species: species as string,
      water_type: water_type as 'freshwater' | 'saltwater' | 'brackish',
      startDate: start_date as string,
      endDate: end_date as string,
      minWeight: min_weight ? parseFloat(min_weight as string) : undefined,
      maxWeight: max_weight ? parseFloat(max_weight as string) : undefined,
      bait: bait as string,
      lure: lure as string,
      technique: technique as string,
      latitude: latitude ? parseFloat(latitude as string) : undefined,
      longitude: longitude ? parseFloat(longitude as string) : undefined,
      radius: parseFloat(radius_km as string),
      page,
      pageSize,
      sortBy: sort_by as string,
      sortOrder: sort_order as 'asc' | 'desc'
    });
    
    const response: ApiResponse<PaginatedResponse<any>> = {
      success: true,
      data: {
        data: result.data,
        total: result.total,
        page,
        page_size: pageSize,
        total_pages: Math.ceil(result.total / pageSize)
      }
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error fetching catches:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch catches' });
  }
});

// POST /api/catches - Create a new catch
router.post('/catches', async (req: Request, res: Response) => {
  try {
    const input = req.body as CreateCatchInput;
    
    // Validate required fields
    if (!input.species || !input.latitude || !input.longitude || !input.caught_at) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }
    
    const id = uuidv4();
    const now = new Date().toISOString();
    
    // Get tide info for location/time
    const caughtAt = new Date(input.caught_at);
    const tideStation = getNearbyTideStations(input.latitude, input.longitude, 50)[0];
    let tideStage: any = 'slack';
    let tideHeightFt: number | undefined;
    
    if (tideStation) {
      const dateStr = caughtAt.toISOString().split('T')[0];
      const cached = getCachedTide(tideStation.id, dateStr);
      if (cached) {
        const predictions = JSON.parse(cached.data).predictions;
        // Find closest tide to catch time
        let closest = predictions[0];
        let minDiff = Math.abs(new Date(predictions[0].t).getTime() - caughtAt.getTime());
        for (const p of predictions) {
          const diff = Math.abs(new Date(p.t).getTime() - caughtAt.getTime());
          if (diff < minDiff) {
            minDiff = diff;
            closest = p;
          }
        }
        tideHeightFt = closest.v;
        tideStage = closest.type === 'H' ? 'high' : 'low';
      }
    }
    
    // Get moon phase
    const moonPhase = calculateMoonPhase(caughtAt);
    
    createCatch({
      id,
      user_id: null, // TODO: add auth
      species: input.species,
      weight_lbs: input.weight_lbs ?? null,
      weight_oz: input.weight_oz ?? null,
      length_inches: input.length_inches ?? null,
      girth_inches: input.girth_inches ?? null,
      latitude: input.latitude,
      longitude: input.longitude,
      location_name: input.location_name ?? null,
      water_type: input.water_type,
      bait: input.bait ?? null,
      lure: input.lure ?? null,
      technique: input.technique ?? null,
      depth_ft: input.depth_ft ?? null,
      water_temp_f: input.water_temp_f ?? null,
      air_temp_f: input.air_temp_f ?? null,
      weather_condition: input.weather_condition ?? null,
      wind_speed_mph: input.wind_speed_mph ?? null,
      wind_direction: input.wind_direction ?? null,
      moon_phase: moonPhase.phase,
      moon_illumination: moonPhase.illumination,
      tide_stage: tideStage ?? null,
      tide_height_ft: tideHeightFt ?? null,
      notes: input.notes ?? null,
      photos: JSON.stringify(input.photos || []),
      caught_at: input.caught_at
    });
    
    const newCatch = getCatch(id);
    
    const response: ApiResponse<{ catch: any }> = {
      success: true,
      data: { catch: newCatch }
    };
    
    res.status(201).json(response);
  } catch (error) {
    console.error('Error creating catch:', error);
    res.status(500).json({ success: false, error: 'Failed to create catch' });
  }
});

// GET /api/catches/:id - Get a single catch
router.get('/catches/:id', async (req: Request, res: Response) => {
  try {
    const catchId = req.params.id as string;
    const catch_ = getCatch(catchId);
    
    if (!catch_) {
      return res.status(404).json({ success: false, error: 'Catch not found' });
    }
    
    res.json({ success: true, data: { catch: catch_ } });
  } catch (error) {
    console.error('Error fetching catch:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch catch' });
  }
});

// PUT /api/catches/:id - Update a catch
router.put('/catches/:id', async (req: Request, res: Response) => {
  try {
    const catchId = req.params.id as string;
    const existing = getCatch(catchId);
    
    if (!existing) {
      return res.status(404).json({ success: false, error: 'Catch not found' });
    }
    
    const input = req.body as Partial<CreateCatchInput>;
    
    const success = updateCatch(catchId, {
      ...input,
      photos: input.photos ? JSON.stringify(input.photos) : undefined
    });
    
    if (!success) {
      return res.status(400).json({ success: false, error: 'No fields to update' });
    }
    
    const updated = getCatch(catchId);
    
    res.json({ success: true, data: { catch: updated } });
  } catch (error) {
    console.error('Error updating catch:', error);
    res.status(500).json({ success: false, error: 'Failed to update catch' });
  }
});

// DELETE /api/catches/:id - Delete a catch
router.delete('/catches/:id', async (req: Request, res: Response) => {
  try {
    const catchId = req.params.id as string;
    const success = deleteCatch(catchId);
    
    if (!success) {
      return res.status(404).json({ success: false, error: 'Catch not found' });
    }
    
    res.json({ success: true, message: 'Catch deleted' });
  } catch (error) {
    console.error('Error deleting catch:', error);
    res.status(500).json({ success: false, error: 'Failed to delete catch' });
  }
});

// GET /api/catches/stats - Get catch statistics
router.get('/catches/stats', async (req: Request, res: Response) => {
  try {
    const stats = getCatchStats();
    res.json({ success: true, data: stats });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch statistics' });
  }
});

// GET /api/tides - Get tide predictions using Open-Meteo Marine API (works worldwide)
router.get('/tides', async (req: Request, res: Response) => {
  try {
    const { latitude, longitude, date, days = '1', name } = req.query;
    
    if (!latitude || !longitude) {
      return res.status(400).json({ success: false, error: 'Latitude and longitude required' });
    }
    
    const lat = parseFloat(latitude as string);
    const lng = parseFloat(longitude as string);
    const startDate = date as string || new Date().toISOString().split('T')[0];
    const numDays = Math.min(parseInt(days as string), 14);
    
    // Fetch tide predictions from Open-Meteo Marine API
    const predictions = await fetchTidesFromOpenMeteo(lat, lng, startDate, numDays);
    
    if (predictions.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Could not fetch tide data for this location. Make sure it is a coastal location.' 
      });
    }
    
    // Use the searched location name if provided, otherwise fall back to coordinates
    const locationName = (typeof name === 'string' && name.trim()) 
      ? name.trim() 
      : `${lat.toFixed(4)}, ${lng.toFixed(4)} (Open-Meteo)`;
    
    // Build station info from coordinates
    const station = {
      id: 'open-meteo',
      name: locationName,
      latitude: lat,
      longitude: lng,
      state: null as string | null,
      timezone: 'Europe/London'
    };
    
    res.json({
      success: true,
      data: {
        station,
        predictions
      }
    });
  } catch (error) {
    console.error('Error fetching tides:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch tide data' });
  }
});

// GET /api/weather - Get current weather, forecast, and marine data
router.get('/weather', async (req: Request, res: Response) => {
  try {
    const { latitude, longitude } = req.query;
    
    if (!latitude || !longitude) {
      return res.status(400).json({ success: false, error: 'Latitude and longitude required' });
    }
    
    const lat = parseFloat(latitude as string);
    const lng = parseFloat(longitude as string);
    
    // Check cache
    const cached = getCachedWeather(lat, lng);
    if (cached) {
      const data = JSON.parse(cached.data);
      return res.json({ success: true, data });
    }
    
    // Fetch fresh data - weather and marine in parallel
    const [weather, marine, moonPhase] = await Promise.all([
      fetchWeather(lat, lng),
      fetchMarineData(lat, lng),
      Promise.resolve(calculateMoonPhase(new Date()))
    ]);
    
    if (!weather) {
      return res.status(500).json({ success: false, error: 'Failed to fetch weather' });
    }
    
    const solunarPeriods = calculateSolunarPeriods(new Date(), lat, lng);
    
    const responseData = {
      current: weather,
      marine,
      moon_phase: moonPhase,
      solunar_periods: solunarPeriods
    };
    
    // Cache for 30 minutes
    setCachedWeather(lat, lng, responseData, 30);
    
    res.json({ success: true, data: responseData });
  } catch (error) {
    console.error('Error fetching weather:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch weather' });
  }
});

// GET /api/marine - Get marine data (waves, sea temp, currents)
router.get('/marine', async (req: Request, res: Response) => {
  try {
    const { latitude, longitude, timezone = 'auto' } = req.query;
    
    if (!latitude || !longitude) {
      return res.status(400).json({ success: false, error: 'Latitude and longitude required' });
    }
    
    const lat = parseFloat(latitude as string);
    const lng = parseFloat(longitude as string);
    const tz = timezone as string;
    
    // Check marine cache
    const marineCacheKey = `marine_${lat}_${lng}`;
    const cached = getCachedWeather(lat, lng); // Reuse weather cache
    if (cached) {
      const data = JSON.parse(cached.data);
      if (data.marine) {
        return res.json({ success: true, data: data.marine });
      }
    }
    
    // Fetch marine data
    const marine = await fetchMarineData(lat, lng, tz);
    
    if (!marine) {
      return res.status(500).json({ success: false, error: 'Failed to fetch marine data' });
    }
    
    res.json({ success: true, data: marine });
  } catch (error) {
    console.error('Error fetching marine data:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch marine data' });
  }
});

// GET /api/locations/search - Search for locations
router.get('/locations/search', async (req: Request, res: Response) => {
  try {
    const { query } = req.query;
    
    if (!query || (query as string).length < 2) {
      return res.status(400).json({ success: false, error: 'Query must be at least 2 characters' });
    }
    
    const results = await geocodeAddress(query as string);
    
    res.json({ success: true, data: { results } });
  } catch (error) {
    console.error('Error searching locations:', error);
    res.status(500).json({ success: false, error: 'Failed to search locations' });
  }
});

// GET /api/locations/reverse - Reverse geocode
router.get('/locations/reverse', async (req: Request, res: Response) => {
  try {
    const { latitude, longitude } = req.query;
    
    if (!latitude || !longitude) {
      return res.status(400).json({ success: false, error: 'Latitude and longitude required' });
    }
    
    const location = await reverseGeocode(
      parseFloat(latitude as string),
      parseFloat(longitude as string)
    );
    
    res.json({ success: true, data: { location } });
  } catch (error) {
    console.error('Error reverse geocoding:', error);
    res.status(500).json({ success: false, error: 'Failed to reverse geocode' });
  }
});

// GET /api/spots - Get fishing spots near location
router.get('/spots', async (req: Request, res: Response) => {
  try {
    const { latitude, longitude, radius_km = '50', water_type, name } = req.query;
    
    // If searching by name only, don't require lat/lng
    if (name) {
      const spots = getFishingSpots({
        name: name as string,
        water_type: water_type as 'freshwater' | 'saltwater' | 'brackish'
      });
      
      const formattedSpots: FishingSpot[] = spots.map((s: FishingSpotRow) => ({
        id: s.id,
        name: s.name,
        latitude: s.latitude,
        longitude: s.longitude,
        description: s.description ?? undefined,
        water_type: s.water_type as 'freshwater' | 'saltwater' | 'brackish',
        species: JSON.parse(s.species || '[]'),
        access_type: s.access_type as 'shore' | 'boat' | 'kayak' | 'pier' | 'wade',
        image_urls: (JSON.parse(s.image_urls || '[]') as string[]).map(url => `/api/proxy-image?url=${encodeURIComponent(url)}`),
        created_at: s.created_at
      }));
      
      return res.json({ success: true, data: { spots: formattedSpots } });
    }
    
    if (!latitude || !longitude) {
      // Return all spots (UK overview)
      const spots = getFishingSpots({
        water_type: water_type as 'freshwater' | 'saltwater' | 'brackish'
      });
      
      const formattedSpots: FishingSpot[] = spots.map((s: FishingSpotRow) => ({
        id: s.id,
        name: s.name,
        latitude: s.latitude,
        longitude: s.longitude,
        description: s.description ?? undefined,
        water_type: s.water_type as 'freshwater' | 'saltwater' | 'brackish',
        species: JSON.parse(s.species || '[]'),
        access_type: s.access_type as 'shore' | 'boat' | 'kayak' | 'pier' | 'wade',
        image_urls: (JSON.parse(s.image_urls || '[]') as string[]).map(url => `/api/proxy-image?url=${encodeURIComponent(url)}`),
        created_at: s.created_at
      }));
      
      return res.json({ success: true, data: { spots: formattedSpots } });
    }
    
    const lat = parseFloat(latitude as string);
    const lng = parseFloat(longitude as string);
    const radius = parseFloat(radius_km as string);
    
    const spots = getFishingSpots({
      latitude: lat,
      longitude: lng,
      radiusKm: radius,
      water_type: water_type as 'freshwater' | 'saltwater' | 'brackish'
    });
    
    // Convert to shared type
    const formattedSpots: FishingSpot[] = spots.map((s: FishingSpotRow) => ({
      id: s.id,
      name: s.name,
      latitude: s.latitude,
      longitude: s.longitude,
      description: s.description ?? undefined,
      water_type: s.water_type as 'freshwater' | 'saltwater' | 'brackish',
      species: JSON.parse(s.species || '[]'),
      access_type: s.access_type as 'shore' | 'boat' | 'kayak' | 'pier' | 'wade',
      image_urls: (JSON.parse(s.image_urls || '[]') as string[]).map(url => `/api/proxy-image?url=${encodeURIComponent(url)}`),
      created_at: s.created_at
    }));
    
    res.json({ success: true, data: { spots: formattedSpots } });
  } catch (error) {
    console.error('Error fetching spots:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch fishing spots' });
  }
});

// POST /api/spots - Create a fishing spot (user submitted)
router.post('/spots', async (req: Request, res: Response) => {
  try {
    const { name, latitude, longitude, description, water_type, species, access_type, image_urls } = req.body;
    
    if (!name || !latitude || !longitude || !water_type) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }
    
    const id = uuidv4();
    const now = new Date().toISOString();
    
    console.log('Creating spot:', { id, name, latitude, longitude, water_type, access_type, species, imageCount: image_urls?.length || 0 });
    
    createFishingSpot({
      id,
      name,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      description: description || null,
      water_type,
      species: JSON.stringify(species || []),
      access_type: access_type || 'shore',
      image_urls: JSON.stringify(image_urls || []),
      created_at: now
    });
    
    console.log('Spot created successfully');
    
    // Get the created spot
    const spots = getFishingSpots({});
    const spot = spots.find((s: FishingSpotRow) => s.id === id);
    
    if (spot) {
      const formattedSpot: FishingSpot = {
        id: spot.id,
        name: spot.name,
        latitude: spot.latitude,
        longitude: spot.longitude,
        description: spot.description ?? undefined,
        water_type: spot.water_type as 'freshwater' | 'saltwater' | 'brackish',
        species: JSON.parse(spot.species || '[]'),
        access_type: spot.access_type as 'shore' | 'boat' | 'kayak' | 'pier' | 'wade',
        image_urls: JSON.parse(spot.image_urls || '[]'),
        created_at: spot.created_at
      };
      res.status(201).json({ success: true, data: { spot: formattedSpot } });
    } else {
      res.status(500).json({ success: false, error: 'Failed to create spot' });
    }
  } catch (error) {
    console.error('Error creating spot:', error);
    res.status(500).json({ success: false, error: 'Failed to create fishing spot' });
  }
});

// --- Forum routes ---

// GET /api/forum/categories - List forum categories
router.get('/forum/categories', async (_req: Request, res: Response) => {
  try {
    const stats = getForumStats();
    const categories = FORUM_CATEGORIES.map(cat => ({
      ...cat,
      post_count: 0 // Will be computed below
    }));

    // Get post counts per category
    const countStmt = db.prepare('SELECT category, COUNT(*) as count FROM forum_posts GROUP BY category');
    const counts = countStmt.all() as Array<{ category: string; count: number }>;
    for (const c of counts) {
      const cat = categories.find(cat => cat.id === c.category);
      if (cat) cat.post_count = c.count;
    }

    res.json({ success: true, data: { categories, stats } });
  } catch (error) {
    console.error('Error fetching forum categories:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch categories' });
  }
});

// GET /api/forum/posts - List posts with filtering
router.get('/forum/posts', async (req: Request, res: Response) => {
  try {
    const { category, search, page = '1', limit = '20' } = req.query;

    const result = getForumPosts({
      category: category as string,
      search: search as string,
      page: parseInt(page as string),
      pageSize: parseInt(limit as string),
    });

    res.json({
      success: true,
      data: {
        data: result.data,
        total: result.total,
        page: parseInt(page as string),
        page_size: parseInt(limit as string),
        total_pages: Math.ceil(result.total / parseInt(limit as string)),
      }
    });
  } catch (error) {
    console.error('Error fetching forum posts:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch posts' });
  }
});

// POST /api/forum/posts - Create a post
router.post('/forum/posts', async (req: Request, res: Response) => {
  try {
    const { userId, category, title, body } = req.body;

    if (!userId || !category || !title || !body) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    if (!FORUM_CATEGORIES.find(c => c.id === category)) {
      return res.status(400).json({ success: false, error: 'Invalid category' });
    }

    const user = getUserById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    if (title.length < 3 || title.length > 200) {
      return res.status(400).json({ success: false, error: 'Title must be 3-200 characters' });
    }

    if (body.length < 10 || body.length > 10000) {
      return res.status(400).json({ success: false, error: 'Post body must be 10-10000 characters' });
    }

    const id = uuidv4();
    createForumPost({ id, user_id: userId, category, title, body });

    const post = getForumPost(id);
    res.status(201).json({ success: true, data: { post } });
  } catch (error) {
    console.error('Error creating forum post:', error);
    res.status(500).json({ success: false, error: 'Failed to create post' });
  }
});

// GET /api/forum/posts/:id - Get single post with comments
router.get('/forum/posts/:id', async (req: Request, res: Response) => {
  try {
    const postId = String(req.params.id);
    const post = getForumPost(postId);
    if (!post) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }

    const comments = getForumComments(postId);
    const userId = req.query.userId ? String(req.query.userId) : null;
    let liked = false;
    if (userId) {
      liked = hasUserLiked(userId, postId);
    }

    res.json({ success: true, data: { post, comments, liked } });
  } catch (error) {
    console.error('Error fetching forum post:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch post' });
  }
});

// DELETE /api/forum/posts/:id - Delete a post
router.delete('/forum/posts/:id', async (req: Request, res: Response) => {
  try {
    const postId = String(req.params.id);
    const userId = req.query.userId ? String(req.query.userId) : null;
    const post = getForumPost(postId);
    if (!post) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }
    if (post.user_id !== userId) {
      return res.status(403).json({ success: false, error: 'Not authorized' });
    }

    deleteForumPost(postId);
    res.json({ success: true, message: 'Post deleted' });
  } catch (error) {
    console.error('Error deleting forum post:', error);
    res.status(500).json({ success: false, error: 'Failed to delete post' });
  }
});

// POST /api/forum/posts/:id/comments - Add a comment
router.post('/forum/posts/:id/comments', async (req: Request, res: Response) => {
  try {
    const { userId, body } = req.body;
    const postId = String(req.params.id);

    if (!userId || !body) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    const post = getForumPost(postId);
    if (!post) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }

    if (post.locked) {
      return res.status(403).json({ success: false, error: 'This post is locked' });
    }

    if (typeof body !== 'string' || body.length < 1 || body.length > 5000) {
      return res.status(400).json({ success: false, error: 'Comment must be 1-5000 characters' });
    }

    const id = uuidv4();
    createForumComment({ id, post_id: postId, user_id: userId, body });

    const comments = getForumComments(postId);
    res.status(201).json({ success: true, data: { comments } });
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ success: false, error: 'Failed to add comment' });
  }
});

// DELETE /api/forum/comments/:id - Delete a comment
router.delete('/forum/comments/:id', async (req: Request, res: Response) => {
  try {
    const commentId = String(req.params.id);
    const userId = req.query.userId ? String(req.query.userId) : null;
    const comment = db.prepare('SELECT * FROM forum_comments WHERE id = ?').get(commentId) as ForumCommentRow | undefined;
    if (!comment) {
      return res.status(404).json({ success: false, error: 'Comment not found' });
    }
    if (comment.user_id !== userId) {
      return res.status(403).json({ success: false, error: 'Not authorized' });
    }

    deleteForumComment(commentId);
    res.json({ success: true, message: 'Comment deleted' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ success: false, error: 'Failed to delete comment' });
  }
});

// POST /api/forum/like - Toggle like on a post or comment
router.post('/forum/like', async (req: Request, res: Response) => {
  try {
    const { userId, postId, commentId } = req.body;

    if (!userId || (!postId && !commentId)) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    const liked = toggleForumLike(userId, postId, commentId);
    res.json({ success: true, data: { liked } });
  } catch (error) {
    console.error('Error toggling like:', error);
    res.status(500).json({ success: false, error: 'Failed to toggle like' });
  }
});

// --- Auth routes ---

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const hash = pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(':');
  const verify = pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return hash === verify;
}

// POST /api/auth/register
router.post('/auth/register', async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    
    if (!email || !password || !name) {
      return res.status(400).json({ success: false, error: 'Email, password, and name are required' });
    }
    
    if (password.length < 6) {
      return res.status(400).json({ success: false, error: 'Password must be at least 6 characters' });
    }
    
    if (!email.includes('@')) {
      return res.status(400).json({ success: false, error: 'Please enter a valid email address' });
    }
    
    // Check if user already exists
    const existing = getUserByEmail(email);
    if (existing) {
      return res.status(409).json({ success: false, error: 'An account with this email already exists' });
    }
    
    const id = uuidv4();
    const password_hash = hashPassword(password);
    
    const user = createUser({ id, email, name, password_hash });
    
    res.status(201).json({
      success: true,
      data: { user: userToPublic(user) }
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ success: false, error: 'Failed to create account' });
  }
});

// POST /api/auth/login
router.post('/auth/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required' });
    }
    
    const user = getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }
    
    if (!verifyPassword(password, user.password_hash)) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }
    
    res.json({
      success: true,
      data: { user: userToPublic(user) }
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ success: false, error: 'Failed to sign in' });
  }
});

// GET /api/auth/me - Get current user by ID (passed as query param for localStorage-based session)
router.get('/auth/me', async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    
    if (!userId) {
      return res.status(401).json({ success: false, error: 'Not authenticated' });
    }
    
    const user = getUserById(userId as string);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    
    res.json({
      success: true,
      data: { user: userToPublic(user) }
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch user' });
  }
});

// PUT /api/auth/preferences - Update user preferences
router.put('/auth/preferences', async (req: Request, res: Response) => {
  try {
    const { userId, preferences } = req.body;
    
    if (!userId) {
      return res.status(401).json({ success: false, error: 'Not authenticated' });
    }
    
    const success = updateUserPrefs(userId, preferences);
    if (!success) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    
    const user = getUserById(userId);
    res.json({
      success: true,
      data: { user: user ? userToPublic(user) : null }
    });
  } catch (error) {
    console.error('Error updating preferences:', error);
    res.status(500).json({ success: false, error: 'Failed to update preferences' });
  }
});

// Image proxy cache (in-memory, simple)
const imageCache = new Map<string, { buffer: Buffer; contentType: string; ts: number }>();
const failedCache = new Set<string>(); // Track recently failed URLs
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours for success
const FAIL_TTL = 5 * 60 * 1000; // 5 minutes cooldown for failures
const failTimestamps = new Map<string, number>();

// Simple concurrency limiter - max 2 concurrent fetches to avoid flooding
let activeFetches = 0;
const MAX_CONCURRENT = 2;
const fetchQueue: Array<() => void> = [];

function acquireFetchSlot(): Promise<void> {
  return new Promise(resolve => {
    if (activeFetches < MAX_CONCURRENT) {
      activeFetches++;
      resolve();
    } else {
      fetchQueue.push(() => { activeFetches++; resolve(); });
    }
  });
}

function releaseFetchSlot() {
  activeFetches--;
  if (fetchQueue.length > 0) {
    const next = fetchQueue.shift()!;
    next();
  }
}

// GET /api/proxy-image - Proxy external images to avoid CORS/referrer issues
router.get('/proxy-image', async (req: Request, res: Response) => {
  try {
    const { url } = req.query;
    if (!url || typeof url !== 'string') {
      return res.status(400).json({ success: false, error: 'URL parameter required' });
    }
    
    // Only allow proxying from known safe domains
    const allowedDomains = [
      'upload.wikimedia.org', 'en.wikipedia.org',
      'cdn.pixabay.com', 'pixabay.com',
      'images.unsplash.com',
      'live.staticflickr.com',
    ];
    const parsedUrl = new URL(url);
    if (!allowedDomains.some(d => parsedUrl.hostname.endsWith(d))) {
      return res.status(403).json({ success: false, error: 'Domain not allowed' });
    }

    // Check success cache first
    const cached = imageCache.get(url);
    if (cached && (Date.now() - cached.ts) < CACHE_TTL) {
      res.setHeader('Content-Type', cached.contentType);
      res.setHeader('Cache-Control', 'public, max-age=86400');
      return res.send(cached.buffer);
    }

    // Check failure cooldown - don't retry within 5 minutes
    const failTs = failTimestamps.get(url);
    if (failTs && (Date.now() - failTs) < FAIL_TTL) {
      return res.status(503).json({ success: false, error: 'Image temporarily unavailable, retry later' });
    }
    
    // Concurrency limiter
    await acquireFetchSlot();
    
    try {
      // Fetch with timeout and retry - 3 attempts with linear backoff
      let lastError: Error | null = null;
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 15000);
          
          const response = await fetch(url, {
            signal: controller.signal,
            headers: {
              'User-Agent': 'Fishing101/1.0 (https://fishing-101.co.uk; contact@fishing-101.co.uk)',
              'Accept': 'image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
            },
          });
          clearTimeout(timeout);
          
          if (!response.ok) {
            lastError = new Error(`HTTP ${response.status}`);
            if (response.status === 429) {
              const delay = 3000 * (attempt + 1);
              await new Promise(r => setTimeout(r, delay));
              continue;
            }
            if (response.status >= 500) {
              await new Promise(r => setTimeout(r, 1500 * (attempt + 1)));
              continue;
            }
            // 404 or other client errors - don't retry, mark as failed
            failTimestamps.set(url, Date.now());
            return res.status(response.status).json({ success: false, error: 'Failed to fetch image' });
          }
          
          const contentType = response.headers.get('content-type') || 'image/jpeg';
          const buffer = Buffer.from(await response.arrayBuffer());
          
          // Cache success for 24 hours, clear any failure marker
          imageCache.set(url, { buffer, contentType, ts: Date.now() });
          failTimestamps.delete(url);
          
          res.setHeader('Content-Type', contentType);
          res.setHeader('Cache-Control', 'public, max-age=86400');
          return res.send(buffer);
        } catch (err: any) {
          lastError = err;
          if (attempt < 2) await new Promise(r => setTimeout(r, 2000 * (attempt + 1)));
        }
      }
      
      // All retries failed - mark as failed for 5 minutes
      failTimestamps.set(url, Date.now());
      console.error('Image proxy failed after retries:', url, lastError?.message);
      res.status(502).json({ success: false, error: 'Failed to fetch image after retries' });
    } finally {
      releaseFetchSlot();
    }
  } catch (error) {
    console.error('Image proxy error:', error);
    res.status(500).json({ success: false, error: 'Failed to proxy image' });
  }
});

export default router;