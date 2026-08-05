// Shared types between client and server

export interface Catch {
  id: string;
  user_id?: string;
  species: string;
  weight_lbs?: number;
  weight_oz?: number;
  length_inches?: number;
  girth_inches?: number;
  latitude: number;
  longitude: number;
  location_name?: string;
  water_type: 'freshwater' | 'saltwater' | 'brackish';
  bait?: string;
  lure?: string;
  technique?: string;
  depth_ft?: number;
  water_temp_f?: number;
  air_temp_f?: number;
  weather_condition?: string;
  wind_speed_mph?: number;
  wind_direction?: number;
  moon_phase?: string;
  moon_illumination?: number;
  tide_stage?: 'high' | 'low' | 'rising' | 'falling' | 'slack';
  tide_height_ft?: number;
  notes?: string;
  photos?: string[];
  caught_at: string;
  created_at: string;
  updated_at: string;
}

export interface CreateCatchInput {
  species: string;
  weight_lbs?: number;
  weight_oz?: number;
  length_inches?: number;
  girth_inches?: number;
  latitude: number;
  longitude: number;
  location_name?: string;
  water_type: 'freshwater' | 'saltwater' | 'brackish';
  bait?: string;
  lure?: string;
  technique?: string;
  depth_ft?: number;
  water_temp_f?: number;
  air_temp_f?: number;
  weather_condition?: string;
  wind_speed_mph?: number;
  wind_direction?: number;
  moon_phase?: string;
  moon_illumination?: number;
  tide_stage?: 'high' | 'low' | 'rising' | 'falling' | 'slack';
  tide_height_ft?: number;
  notes?: string;
  photos?: string[];
  caught_at: string;
}

export interface CatchStats {
  total_catches: number;
  species_count: number;
  total_weight: number;
  avg_weight: number;
  max_weight: number;
  top_species: Array<{ species: string; count: number; avg_weight: number }>;
  top_baits: Array<{ bait: string; count: number }>;
  monthly_catches: Array<{ month: string; count: number }>;
}

export interface TideStation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  state?: string;
  timezone?: string;
}

export interface TidePoint {
  t: string; // ISO timestamp
  v: number; // height in feet
  type: 'H' | 'L'; // High or Low
}

export interface TidePrediction {
  station_id: string;
  date: string;
  predictions: TidePoint[];
}

export interface TideDay {
  date: string;
  station_id: string;
  station_name: string;
  high_tides: TidePoint[];
  low_tides: TidePoint[];
}

export interface WeatherData {
  temperature: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  wind_speed: number;
  wind_direction: number;
  wind_gust?: number;
  condition: string;
  description: string;
  icon: string;
  sunrise: number;
  sunset: number;
  clouds: number;
  visibility: number;
  // Open-Meteo additions
  precipitation?: number;
  rain?: number;
  showers?: number;
  snowfall?: number;
  weather_code?: number;
  uv_index?: number;
  uv_index_clear_sky?: number;
  sunshine_duration?: number;
  is_day?: number;
  // Daily forecasts
  daily?: DailyWeatherData[];
}

export interface DailyWeatherData {
  date: string;
  weather_code: number;
  temperature_2m_max: number;
  temperature_2m_min: number;
  apparent_temperature_min: number;
  apparent_temperature_max: number;
  sunrise: string;
  sunset: string;
  daylight_duration: number;
  sunshine_duration: number;
  uv_index_max: number;
  uv_index_clear_sky_max: number;
  rain_sum: number;
  snowfall_sum: number;
  showers_sum: number;
  precipitation_sum: number;
  precipitation_hours: number;
  precipitation_probability_max: number;
  wind_speed_10m_max: number;
  wind_gusts_10m_max: number;
  wind_direction_10m_dominant: number;
  shortwave_radiation_sum: number;
  et0_fao_evapotranspiration: number;
}

export interface MarineData {
  // Current conditions
  wave_height?: number;
  wave_period?: number;
  wave_direction?: number;
  wave_peak_period?: number;
  wind_wave_height?: number;
  wind_wave_direction?: number;
  wind_wave_period?: number;
  secondary_swell_wave_height?: number;
  secondary_swell_wave_period?: number;
  secondary_swell_wave_direction?: number;
  tertiary_swell_wave_height?: number;
  tertiary_swell_wave_period?: number;
  tertiary_swell_wave_direction?: number;
  sea_level_height_msl?: number;
  sea_surface_temperature?: number;
  ocean_current_velocity?: number;
  ocean_current_direction?: number;
  // Hourly wave heights
  hourly_wave_heights?: Array<{ time: string; wave_height: number }>;
  // Daily forecasts
  daily?: DailyMarineData[];
}

export interface DailyMarineData {
  date: string;
  wave_height_max: number;
  wave_direction_dominant: number;
  wave_period_max: number;
  wind_wave_peak_period_max: number;
  wind_wave_period_max: number;
  wind_wave_direction_dominant: number;
  wind_wave_height_max: number;
  swell_wave_peak_period_max: number;
  swell_wave_direction_dominant: number;
  swell_wave_height_max: number;
  swell_wave_period_max: number;
}

export interface MoonPhase {
  phase: string;
  illumination: number;
  age: number;
  next_new_moon: number;
  next_full_moon: number;
}

export interface SolunarPeriod {
  type: 'major' | 'minor';
  start: number; // unix timestamp
  end: number;
  rating: number; // 1-5 rating
}

export interface LocationSearchResult {
  latitude: number;
  longitude: number;
  display_name: string;
  address?: {
    city?: string;
    state?: string;
    country?: string;
  };
}

export interface FishingSpot {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  description?: string;
  water_type: 'freshwater' | 'saltwater' | 'brackish';
  species: string[];
  access_type: 'shore' | 'boat' | 'kayak' | 'pier' | 'wade';
  image_urls?: string[];
  created_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

// Request/Response types
export interface GetCatchesParams {
  page?: number;
  page_size?: number;
  species?: string;
  start_date?: string;
  end_date?: string;
  water_type?: string;
  sort_by?: 'caught_at' | 'created_at' | 'species' | 'weight';
  sort_order?: 'asc' | 'desc';
}

export interface GetTidesParams {
  latitude: number;
  longitude: number;
  date?: string;
  days?: number;
}

export interface GetWeatherParams {
  latitude: number;
  longitude: number;
}

export interface SearchLocationsParams {
  query: string;
}

export interface GetSpotsParams {
  latitude: number;
  longitude: number;
  radius_km?: number;
  water_type?: 'freshwater' | 'saltwater' | 'brackish';
}

// Form types
export interface CatchFormData {
  species: string;
  weight_lbs: string;
  weight_oz: string;
  length_inches: string;
  girth_inches: string;
  latitude: string;
  longitude: string;
  location_name: string;
  water_type: 'freshwater' | 'saltwater' | 'brackish';
  bait: string;
  lure: string;
  technique: string;
  depth_ft: string;
  water_temp_f: string;
  air_temp_f: string;
  weather_condition: string;
  wind_speed_mph: string;
  wind_direction: string;
  moon_phase: string;
  moon_illumination: string;
  tide_stage: 'high' | 'low' | 'rising' | 'falling' | 'slack';
  tide_height_ft: string;
  notes: string;
  caught_at: string;
}

export const DEFAULT_CATCH_FORM_DATA: CatchFormData = {
  species: '',
  weight_lbs: '',
  weight_oz: '',
  length_inches: '',
  girth_inches: '',
  latitude: '',
  longitude: '',
  location_name: '',
  water_type: 'freshwater',
  bait: '',
  lure: '',
  technique: '',
  depth_ft: '',
  water_temp_f: '',
  air_temp_f: '',
  weather_condition: '',
  wind_speed_mph: '',
  wind_direction: '',
  moon_phase: '',
  moon_illumination: '',
  tide_stage: 'rising',
  tide_height_ft: '',
  notes: '',
  caught_at: new Date().toISOString().slice(0, 16)
};

export const FISH_SPECIES = [
  // Freshwater
  'Largemouth Bass',
  'Smallmouth Bass',
  'Spotted Bass',
  'Rainbow Trout',
  'Brown Trout',
  'Brook Trout',
  'Cutthroat Trout',
  'Lake Trout',
  'Walleye',
  'Northern Pike',
  'Muskellunge',
  'Channel Catfish',
  'Blue Catfish',
  'Flathead Catfish',
  'Bluegill',
  'Redear Sunfish',
  'Crappie (Black)',
  'Crappie (White)',
  'Yellow Perch',
  'White Bass',
  'Striped Bass (Freshwater)',
  'Carp',
  'Buffalo Fish',
  'Gar',
  'Bowfin',
  
  // Saltwater
  'Striped Bass',
  'Bluefish',
  'Weakfish',
  'Summer Flounder (Fluke)',
  'Winter Flounder',
  'Black Sea Bass',
  'Tautog (Blackfish)',
  'Scup (Porgy)',
  'Atlantic Croaker',
  'Spot',
  'Kingfish (Whiting)',
  'Spanish Mackerel',
  'King Mackerel',
  'Cobia',
  'Red Drum (Redfish)',
  'Black Drum',
  'Spotted Seatrout',
  'Weakfish',
  'Sheepshead',
  'Tarpon',
  'Snook',
  'Permit',
  'Bonefish',
  'Jack Crevalle',
  'Ladyfish',
  'Blue Runner',
  'Amberjack',
  'Goliath Grouper',
  'Red Grouper',
  'Gag Grouper',
  'Yellowtail Snapper',
  'Mangrove Snapper',
  'Mutton Snapper',
  'Lane Snapper',
  'Vermilion Snapper',
  'Mahi-Mahi (Dolphin)',
  'Wahoo',
  'Sailfish',
  'White Marlin',
  'Blue Marlin',
  'Swordfish',
  'Yellowfin Tuna',
  'Blackfin Tuna',
  'Skipjack Tuna',
  'Little Tunny (Bonito)',
  'Albacore',
  'Bigeye Tuna',
  
  // West Coast
  'California Halibut',
  'Pacific Halibut',
  'Lingcod',
  'Rockfish (Various)',
  'Cabezon',
  'Kelp Bass',
  'Sand Bass',
  'Spotted Bay Bass',
  'Barred Surfperch',
  'Redtail Surfperch',
  'White Seabass',
  'Yellowtail',
  'Dorado',
  'Roosterfish',
  'Corvina',
  'Shortfin Corvina',
];

export const BAIT_TYPES = [
  'Live Minnow',
  'Live Shrimp',
  'Live Crab',
  'Live Worm',
  'Cut Bait',
  'Squid',
  'Clam',
  'Mussel',
  'Sand Flea',
  'Bloodworm',
  'Nightcrawler',
  'Shiner',
  'Fathead Minnow',
  'Golden Shiner',
  'Creek Chub',
  'Sucker Minnow',
  'Smelt',
  'Anchovy',
  'Sardine',
  'Mackerel',
  'Ballyhoo',
  'Mullet',
  'Pinfish',
  'Grunion',
  'Ghost Shrimp',
  'Fiddler Crab',
  'Blue Crab',
  'Stone Crab',
];

export const LURE_TYPES = [
  'Soft Plastic Worm',
  'Soft Plastic Swimbait',
  'Soft Plastic Jerkbait',
  'Soft Plastic Creature',
  'Soft Plastic Tube',
  'Soft Plastic Grub',
  'Hard Jerkbait',
  'Hard Crankbait (Shallow)',
  'Hard Crankbait (Medium)',
  'Hard Crankbait (Deep)',
  'Hard Lipless Crankbait',
  'Topwater Popper',
  'Topwater Walking Bait',
  'Topwater Buzzbait',
  'Topwater Frog',
  'Spinnerbait',
  'Buzzbait',
  'Chatterbait',
  'Swim Jig',
  'Football Jig',
  'Flipping Jig',
  'Finesse Jig',
  'Hair Jig',
  'Ned Rig',
  'Drop Shot',
  'Shaky Head',
  'Carolina Rig',
  'Texas Rig',
  'Wacky Rig',
  'Neko Rig',
  'Tokyo Rig',
  'Alabama Rig',
  'Umbrella Rig',
  'Spoon',
  'Blade Bait',
  'Tailspin',
  'Inline Spinner',
  'Beetle Spin',
  'Rooster Tail',
  'Mepps',
  'Blue Fox',
  'Rapala Original Floater',
  'Rapala Shad Rap',
  'Rapala Husky Jerk',
  'Rapala X-Rap',
  'Lucky Craft Pointer',
  'Lucky Craft Flash Minnow',
  'Megabass Vision 110',
  'Jackall Squad Minnow',
  'Keitech Swing Impact',
  'Keitech Easy Shiner',
  'Zoom Trick Worm',
  'Zoom Super Fluke',
  'Zoom Brush Hog',
  'Zoom Brush Hawg',
  'Gary Yamamoto Senko',
  'Gary Yamamoto Kut Tail',
  'Berkley PowerBait',
  'Berkley Gulp!',
  'Berkley MaxScent',
  'Z-Man ElaZtech',
  'Z-Man ChatterBait',
  'Strike King',
  'Booyah',
  'War Eagle',
  'Terminator',
  'Other',
];

export const TECHNIQUES = [
  'Casting',
  'Trolling',
  'Jigging',
  'Drifting',
  'Bottom Fishing',
  'Fly Fishing',
  'Surf Casting',
  'Pier Fishing',
  'Kayak Fishing',
  'Wade Fishing',
  'Ice Fishing',
  'Bowfishing',
  'Spearfishing',
  'Noodling',
  'Trotlining',
  'Jugging',
  'Droplining',
  'Longlining',
  'Kite Fishing',
  'Deep Drop',
  'Slow Pitch Jigging',
  'Speed Jigging',
  'Vertical Jigging',
  'Pitching',
  'Flipping',
  'Skipping',
  'Punching',
  'Frogging',
  'Walking the Dog',
  'Popping',
  'Chugging',
  'Wake Baiting',
  'Swimbaiting',
  'Alabama Rig',
  'Umbrella Rig',
  'Carolina Rigging',
  'Texas Rigging',
  'Drop Shotting',
  'Shaky Heading',
  'Ned Rigging',
  'Neko Rigging',
  'Tokyo Rigging',
  'Split Shotting',
  'Mojo Rigging',
  'Free Lining',
  'Live Lining',
  'Dead Sticking',
  'Slow Rolling',
  'Burning',
  'Ripping',
  'Jerking',
  'Twitching',
  'Hopping',
  'Dragging',
  'Swimming',
  'Other',
];

export const WATER_TYPES = [
  { value: 'freshwater', label: 'Freshwater' },
  { value: 'saltwater', label: 'Saltwater' },
  { value: 'brackish', label: 'Brackish' },
];

export const TIDE_STAGES = [
  { value: 'high', label: 'High Tide' },
  { value: 'low', label: 'Low Tide' },
  { value: 'rising', label: 'Rising (Flood)' },
  { value: 'falling', label: 'Falling (Ebb)' },
  { value: 'slack', label: 'Slack' },
];

export const WEATHER_CONDITIONS = [
  'Sunny',
  'Partly Cloudy',
  'Cloudy',
  'Overcast',
  'Rain',
  'Light Rain',
  'Heavy Rain',
  'Thunderstorm',
  'Snow',
  'Fog',
  'Mist',
  'Hazy',
  'Windy',
  'Breezy',
  'Calm',
];