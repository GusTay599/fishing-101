// External API integrations for tides, weather, marine data, and geocoding

import fetch from 'node-fetch';
import { 
  TideStation, 
  TidePrediction, 
  TidePoint, 
  TideDay,
  WeatherData, 
  MoonPhase, 
  LocationSearchResult,
  MarineData,
  DailyWeatherData,
  DailyMarineData
} from '../../shared/types';

const NOAA_API_BASE = 'https://api.tidesandcurrents.noaa.gov/api/prod';
const NOAA_STATIONS_URL = `${NOAA_API_BASE}/datagetter?product=stations&format=json&units=english&time_zone=gmt`;

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY || '';
const OPENWEATHER_BASE = 'https://api.openweathermap.org/data/2.5';

const OPEN_METEO_BASE = 'https://api.open-meteo.com/v1/forecast';
const OPEN_METEO_MARINE_BASE = 'https://marine-api.open-meteo.com/v1/marine';

const NOMINATIM_BASE = 'https://nominatim.openstreetmap.org';

interface NoaaStation {
  id: string;
  name: string;
  lat: string;
  lng: string;
  state: string;
  timezone: string;
}

interface NoaaStationsResponse {
  stations: NoaaStation[];
}

interface NoaaPredictionsResponse {
  predictions: Array<{
    t: string;
    v: string;
    type: string;
  }>;
}

interface OpenWeatherResponse {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  sys: {
    sunrise: number;
    sunset: number;
  };
  clouds: {
    all: number;
  };
  visibility: number;
  dt: number;
}

interface NominatimResponse {
  lat: string;
  lon: string;
  display_name: string;
  address?: {
    city?: string;
    state?: string;
    country?: string;
  };
}

// Open-Meteo response interfaces
interface OpenMeteoCurrentResponse {
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  is_day: number;
  precipitation: number;
  rain: number;
  showers: number;
  snowfall: number;
  weather_code: number;
  cloud_cover: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  wind_gusts_10m: number;
}

interface OpenMeteoDailyResponse {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  apparent_temperature_min: number[];
  apparent_temperature_max: number[];
  sunrise: string[];
  sunset: string[];
  daylight_duration: number[];
  sunshine_duration: number[];
  uv_index_max: number[];
  uv_index_clear_sky_max: number[];
  rain_sum: number[];
  snowfall_sum: number[];
  showers_sum: number[];
  precipitation_sum: number[];
  precipitation_hours: number[];
  precipitation_probability_max: number[];
  wind_speed_10m_max: number[];
  wind_gusts_10m_max: number[];
  wind_direction_10m_dominant: number[];
  shortwave_radiation_sum: number[];
  et0_fao_evapotranspiration: number[];
}

interface OpenMeteoHourlyResponse {
  time: string[];
  is_day: number[];
  uv_index: number[];
  uv_index_clear_sky: number[];
  sunshine_duration: number[];
}

interface OpenMeteoResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current: OpenMeteoCurrentResponse;
  hourly: OpenMeteoHourlyResponse;
  daily: OpenMeteoDailyResponse;
}

// Open-Meteo Marine response interfaces
interface MarineCurrentResponse {
  wave_height: number;
  wave_period: number;
  wave_direction: number;
  wave_peak_period: number;
  wind_wave_height: number;
  wind_wave_direction: number;
  wind_wave_period: number;
  secondary_swell_wave_height: number;
  secondary_swell_wave_period: number;
  secondary_swell_wave_direction: number;
  tertiary_swell_wave_height: number;
  tertiary_swell_wave_period: number;
  tertiary_swell_wave_direction: number;
  sea_level_height_msl: number;
  sea_surface_temperature: number;
  ocean_current_velocity: number;
  ocean_current_direction: number;
}

interface MarineHourlyResponse {
  time: string[];
  wave_height: number[];
}

interface MarineDailyResponse {
  time: string[];
  wave_height_max: number[];
  wave_direction_dominant: number[];
  wave_period_max: number[];
  wind_wave_peak_period_max: number[];
  wind_wave_period_max: number[];
  wind_wave_direction_dominant: number[];
  wind_wave_height_max: number[];
  swell_wave_peak_period_max: number[];
  swell_wave_direction_dominant: number[];
  swell_wave_height_max: number[];
  swell_wave_period_max: number[];
}

interface MarineResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current: MarineCurrentResponse;
  hourly: MarineHourlyResponse;
  daily: MarineDailyResponse;
}

// Weather code mapping (WMO codes)
const WEATHER_CODES: Record<number, { condition: string; description: string; icon: string }> = {
  0: { condition: 'Clear', description: 'Clear sky', icon: '01d' },
  1: { condition: 'Mainly Clear', description: 'Mainly clear', icon: '01d' },
  2: { condition: 'Partly Cloudy', description: 'Partly cloudy', icon: '02d' },
  3: { condition: 'Overcast', description: 'Overcast', icon: '03d' },
  45: { condition: 'Fog', description: 'Fog', icon: '50d' },
  48: { condition: 'Fog', description: 'Depositing rime fog', icon: '50d' },
  51: { condition: 'Drizzle', description: 'Light drizzle', icon: '09d' },
  53: { condition: 'Drizzle', description: 'Moderate drizzle', icon: '09d' },
  55: { condition: 'Drizzle', description: 'Dense drizzle', icon: '09d' },
  56: { condition: 'Freezing Drizzle', description: 'Light freezing drizzle', icon: '09d' },
  57: { condition: 'Freezing Drizzle', description: 'Dense freezing drizzle', icon: '09d' },
  61: { condition: 'Rain', description: 'Slight rain', icon: '10d' },
  63: { condition: 'Rain', description: 'Moderate rain', icon: '10d' },
  65: { condition: 'Rain', description: 'Heavy rain', icon: '10d' },
  66: { condition: 'Freezing Rain', description: 'Light freezing rain', icon: '10d' },
  67: { condition: 'Freezing Rain', description: 'Heavy freezing rain', icon: '10d' },
  71: { condition: 'Snow', description: 'Slight snow fall', icon: '13d' },
  73: { condition: 'Snow', description: 'Moderate snow fall', icon: '13d' },
  75: { condition: 'Snow', description: 'Heavy snow fall', icon: '13d' },
  77: { condition: 'Snow', description: 'Snow grains', icon: '13d' },
  80: { condition: 'Rain Showers', description: 'Slight rain showers', icon: '09d' },
  81: { condition: 'Rain Showers', description: 'Moderate rain showers', icon: '09d' },
  82: { condition: 'Rain Showers', description: 'Violent rain showers', icon: '09d' },
  85: { condition: 'Snow Showers', description: 'Slight snow showers', icon: '13d' },
  86: { condition: 'Snow Showers', description: 'Heavy snow showers', icon: '13d' },
  95: { condition: 'Thunderstorm', description: 'Thunderstorm', icon: '11d' },
  96: { condition: 'Thunderstorm', description: 'Thunderstorm with slight hail', icon: '11d' },
  99: { condition: 'Thunderstorm', description: 'Thunderstorm with heavy hail', icon: '11d' },
};

// Fetch NOAA tide stations (kept for backward compatibility)
export async function fetchNoaaStations(): Promise<TideStation[]> {
  try {
    const response = await fetch(NOAA_STATIONS_URL);
    if (!response.ok) throw new Error(`NOAA API error: ${response.status}`);
    
    const data = await response.json() as NoaaStationsResponse;
    
    return data.stations
      .filter(s => s.lat && s.lng)
      .map(s => ({
        id: s.id,
        name: s.name,
        latitude: parseFloat(s.lat),
        longitude: parseFloat(s.lng),
        state: s.state,
        timezone: s.timezone
      }));
  } catch (error) {
    console.error('Error fetching NOAA stations:', error);
    return [];
  }
}

// Fetch tide predictions for a station and date range (NOAA) - kept for backward compat
export async function fetchTidePredictions(
  stationId: string,
  startDate: string,
  endDate: string,
  datum: string = 'MLLW',
  units: string = 'english',
  timeZone: string = 'gmt'
): Promise<TidePrediction | null> {
  try {
    const url = `${NOAA_API_BASE}/datagetter?` +
      `product=predictions&` +
      `application=NOS.COOPS.TAC.WL&` +
      `station=${stationId}&` +
      `begin_date=${startDate.replace(/-/g, '')}&` +
      `end_date=${endDate.replace(/-/g, '')}&` +
      `datum=${datum}&` +
      `units=${units}&` +
      `time_zone=${timeZone}&` +
      `format=json&` +
      `interval=hilo`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error(`NOAA predictions error: ${response.status}`);
    
    const data = await response.json() as NoaaPredictionsResponse;
    
    if (!data.predictions || data.predictions.length === 0) {
      return null;
    }
    
    const predictionsByDate: Record<string, TidePoint[]> = {};
    
    for (const pred of data.predictions) {
      const date = pred.t.split(' ')[0];
      if (!predictionsByDate[date]) {
        predictionsByDate[date] = [];
      }
      predictionsByDate[date].push({
        t: pred.t,
        v: parseFloat(pred.v),
        type: pred.type as 'H' | 'L'
      });
    }
    
    const firstDate = Object.keys(predictionsByDate)[0];
    
    return {
      station_id: stationId,
      date: firstDate,
      predictions: predictionsByDate[firstDate] || []
    };
  } catch (error) {
    console.error('Error fetching tide predictions:', error);
    return null;
  }
}

// Interface for Open-Meteo marine hourly tide response
interface OpenMeteoTideResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  hourly: {
    time: string[];
    sea_level_height_msl: number[];
  };
}

// Fetch tides from Open-Meteo marine API (works worldwide, no API key)
// Returns hourly sea level heights and computed high/low tides per day
export async function fetchTidesFromOpenMeteo(
  latitude: number,
  longitude: number,
  startDate: string,
  numDays: number = 7
): Promise<TideDay[]> {
  try {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + numDays - 1);
    const endDateStr = endDate.toISOString().split('T')[0];
    
    const params = new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      hourly: 'sea_level_height_msl',
      start_date: startDate,
      end_date: endDateStr,
      timezone: 'Europe/London'
    });
    
    const url = `${OPEN_METEO_MARINE_BASE}?${params}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Open-Meteo Marine API error: ${response.status}`);
    }
    
    const data = await response.json() as OpenMeteoTideResponse;
    
    if (!data.hourly || !data.hourly.time || !data.hourly.sea_level_height_msl) {
      return [];
    }
    
    // Group hourly data by date and find high/low tides
    const hourlyData = data.hourly.time.map((time, i) => ({
      time,
      height: data.hourly.sea_level_height_msl[i]
    })).filter(h => h.height !== null);
    
    const tideDays: TideDay[] = [];
    
    // Group by date
    const byDate: Record<string, Array<{ time: string; height: number }>> = {};
    for (const entry of hourlyData) {
      const date = entry.time.split('T')[0];
      if (!byDate[date]) byDate[date] = [];
      byDate[date].push(entry);
    }
    
    for (const [date, entries] of Object.entries(byDate)) {
      if (entries.length < 3) continue; // Need enough data points
      
      const highTides: TidePoint[] = [];
      const lowTides: TidePoint[] = [];
      
      // Find local maxima and minima (high and low tides)
      for (let i = 0; i < entries.length; i++) {
        const prev = entries[i - 1]?.height;
        const curr = entries[i].height;
        const next = entries[i + 1]?.height;
        
        if (prev !== undefined && next !== undefined) {
          if (curr > prev && curr > next) {
            // Local maximum = high tide
            highTides.push({
              t: entries[i].time,
              v: Math.round(curr * 100) / 100,
              type: 'H'
            });
          } else if (curr < prev && curr < next) {
            // Local minimum = low tide
            lowTides.push({
              t: entries[i].time,
              v: Math.round(curr * 100) / 100,
              type: 'L'
            });
          }
        }
      }
      
      tideDays.push({
        date,
        station_id: 'open-meteo',
        station_name: `${latitude.toFixed(2)}°, ${longitude.toFixed(2)}° (Open-Meteo)`,
        high_tides: highTides,
        low_tides: lowTides
      });
    }
    
    return tideDays;
  } catch (error) {
    console.error('Error fetching tides from Open-Meteo:', error);
    return [];
  }
}

// Fetch weather from Open-Meteo (free, no API key required)
export async function fetchWeather(
  latitude: number, 
  longitude: number, 
  timezone: string = 'auto'
): Promise<WeatherData | null> {
  try {
    const params = new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m,wind_gusts_10m',
      hourly: 'is_day,uv_index,uv_index_clear_sky,sunshine_duration',
      daily: 'weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_min,apparent_temperature_max,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,uv_index_clear_sky_max,rain_sum,snowfall_sum,showers_sum,precipitation_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration',
      timezone: timezone,
      wind_speed_unit: 'mph',
      temperature_unit: 'celsius',
      precipitation_unit: 'mm'
    });
    
    const url = `${OPEN_METEO_BASE}?${params}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Open-Meteo API error: ${response.status}`);
    }
    
    const data = await response.json() as OpenMeteoResponse;
    
    const current = data.current;
    const weatherInfo = WEATHER_CODES[current.weather_code] || { condition: 'Unknown', description: 'Unknown', icon: '01d' };
    
    // Convert sunrise/sunset from ISO to unix timestamp
    const sunriseTime = new Date(data.daily.sunrise[0]).getTime() / 1000;
    const sunsetTime = new Date(data.daily.sunset[0]).getTime() / 1000;
    
    // Build daily forecasts
    const daily: DailyWeatherData[] = data.daily.time.map((date, i) => ({
      date,
      weather_code: data.daily.weather_code[i],
      temperature_2m_max: data.daily.temperature_2m_max[i],
      temperature_2m_min: data.daily.temperature_2m_min[i],
      apparent_temperature_min: data.daily.apparent_temperature_min[i],
      apparent_temperature_max: data.daily.apparent_temperature_max[i],
      sunrise: data.daily.sunrise[i],
      sunset: data.daily.sunset[i],
      daylight_duration: data.daily.daylight_duration[i],
      sunshine_duration: data.daily.sunshine_duration[i],
      uv_index_max: data.daily.uv_index_max[i],
      uv_index_clear_sky_max: data.daily.uv_index_clear_sky_max[i],
      rain_sum: data.daily.rain_sum[i],
      snowfall_sum: data.daily.snowfall_sum[i],
      showers_sum: data.daily.showers_sum[i],
      precipitation_sum: data.daily.precipitation_sum[i],
      precipitation_hours: data.daily.precipitation_hours[i],
      precipitation_probability_max: data.daily.precipitation_probability_max[i],
      wind_speed_10m_max: data.daily.wind_speed_10m_max[i],
      wind_gusts_10m_max: data.daily.wind_gusts_10m_max[i],
      wind_direction_10m_dominant: data.daily.wind_direction_10m_dominant[i],
      shortwave_radiation_sum: data.daily.shortwave_radiation_sum[i],
      et0_fao_evapotranspiration: data.daily.et0_fao_evapotranspiration[i]
    }));
    
    return {
      temperature: Math.round(current.temperature_2m),
      feels_like: Math.round(current.apparent_temperature),
      humidity: current.relative_humidity_2m,
      pressure: 1013, // Open-Meteo doesn't provide pressure in free tier
      wind_speed: Math.round(current.wind_speed_10m),
      wind_direction: current.wind_direction_10m,
      wind_gust: current.wind_gusts_10m ? Math.round(current.wind_gusts_10m) : undefined,
      condition: weatherInfo.condition,
      description: weatherInfo.description,
      icon: weatherInfo.icon,
      sunrise: Math.floor(sunriseTime),
      sunset: Math.floor(sunsetTime),
      clouds: current.cloud_cover,
      visibility: 10000, // Default, not provided
      precipitation: current.precipitation,
      rain: current.rain,
      showers: current.showers,
      snowfall: current.snowfall,
      weather_code: current.weather_code,
      uv_index: data.hourly.uv_index?.[0],
      uv_index_clear_sky: data.hourly.uv_index_clear_sky?.[0],
      sunshine_duration: data.hourly.sunshine_duration?.[0],
      is_day: current.is_day,
      daily
    };
  } catch (error) {
    console.error('Error fetching weather from Open-Meteo:', error);
    // Fallback to OpenWeatherMap if available
    if (OPENWEATHER_API_KEY) {
      return fetchOpenWeatherMapWeather(latitude, longitude);
    }
    return getMockWeather();
  }
}

// Fallback to OpenWeatherMap
async function fetchOpenWeatherMapWeather(latitude: number, longitude: number): Promise<WeatherData | null> {
  try {
    const url = `${OPENWEATHER_BASE}/weather?lat=${latitude}&lon=${longitude}&appid=${OPENWEATHER_API_KEY}&units=imperial`;
    const response = await fetch(url);
    
    if (!response.ok) {
      if (response.status === 401) {
        console.warn('Invalid OpenWeatherMap API key');
        return getMockWeather();
      }
      throw new Error(`Weather API error: ${response.status}`);
    }
    
    const data = await response.json() as OpenWeatherResponse;
    
    return {
      temperature: Math.round(data.main.temp),
      feels_like: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      wind_speed: Math.round(data.wind.speed * 2.237),
      wind_direction: data.wind.deg,
      wind_gust: data.wind.gust ? Math.round(data.wind.gust * 2.237) : undefined,
      condition: data.weather[0]?.main || 'Clear',
      description: data.weather[0]?.description || 'Clear sky',
      icon: data.weather[0]?.icon || '01d',
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      clouds: data.clouds.all,
      visibility: data.visibility
    };
  } catch (error) {
    console.error('Error fetching OpenWeatherMap weather:', error);
    return getMockWeather();
  }
}

// Mock weather for development
function getMockWeather(): WeatherData {
  const now = Date.now();
  return {
    temperature: 72,
    feels_like: 70,
    humidity: 65,
    pressure: 1013,
    wind_speed: 8,
    wind_direction: 225,
    condition: 'Partly Cloudy',
    description: 'partly cloudy',
    icon: '02d',
    sunrise: Math.floor(now / 1000) - 21600,
    sunset: Math.floor(now / 1000) + 21600,
    clouds: 40,
    visibility: 10000
  };
}

// Fetch marine data from Open-Meteo Marine API
export async function fetchMarineData(
  latitude: number, 
  longitude: number, 
  timezone: string = 'auto'
): Promise<MarineData | null> {
  try {
    const params = new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      current: 'wave_height,wave_period,wave_direction,wave_peak_period,wind_wave_height,wind_wave_direction,wind_wave_period,secondary_swell_wave_height,secondary_swell_wave_period,secondary_swell_wave_direction,tertiary_swell_wave_height,tertiary_swell_wave_period,tertiary_swell_wave_direction,sea_level_height_msl,sea_surface_temperature,ocean_current_velocity,ocean_current_direction',
      hourly: 'wave_height',
      daily: 'wave_height_max,wave_direction_dominant,wave_period_max,wind_wave_peak_period_max,wind_wave_period_max,wind_wave_direction_dominant,wind_wave_height_max,swell_wave_peak_period_max,swell_wave_direction_dominant,swell_wave_height_max,swell_wave_period_max',
      timezone: timezone
    });
    
    const url = `${OPEN_METEO_MARINE_BASE}?${params}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Open-Meteo Marine API error: ${response.status}`);
    }
    
    const data = await response.json() as MarineResponse;
    const current = data.current;
    
    // Build hourly wave heights
    const hourly_wave_heights = data.hourly.time.map((time, i) => ({
      time,
      wave_height: data.hourly.wave_height[i]
    }));
    
    // Build daily forecasts
    const daily: DailyMarineData[] = data.daily.time.map((date, i) => ({
      date,
      wave_height_max: data.daily.wave_height_max[i],
      wave_direction_dominant: data.daily.wave_direction_dominant[i],
      wave_period_max: data.daily.wave_period_max[i],
      wind_wave_peak_period_max: data.daily.wind_wave_peak_period_max[i],
      wind_wave_period_max: data.daily.wind_wave_period_max[i],
      wind_wave_direction_dominant: data.daily.wind_wave_direction_dominant[i],
      wind_wave_height_max: data.daily.wind_wave_height_max[i],
      swell_wave_peak_period_max: data.daily.swell_wave_peak_period_max[i],
      swell_wave_direction_dominant: data.daily.swell_wave_direction_dominant[i],
      swell_wave_height_max: data.daily.swell_wave_height_max[i],
      swell_wave_period_max: data.daily.swell_wave_period_max[i]
    }));
    
    return {
      wave_height: current.wave_height,
      wave_period: current.wave_period,
      wave_direction: current.wave_direction,
      wave_peak_period: current.wave_peak_period,
      wind_wave_height: current.wind_wave_height,
      wind_wave_direction: current.wind_wave_direction,
      wind_wave_period: current.wind_wave_period,
      secondary_swell_wave_height: current.secondary_swell_wave_height,
      secondary_swell_wave_period: current.secondary_swell_wave_period,
      secondary_swell_wave_direction: current.secondary_swell_wave_direction,
      tertiary_swell_wave_height: current.tertiary_swell_wave_height,
      tertiary_swell_wave_period: current.tertiary_swell_wave_period,
      tertiary_swell_wave_direction: current.tertiary_swell_wave_direction,
      sea_level_height_msl: current.sea_level_height_msl,
      sea_surface_temperature: current.sea_surface_temperature,
      ocean_current_velocity: current.ocean_current_velocity,
      ocean_current_direction: current.ocean_current_direction,
      hourly_wave_heights,
      daily
    };
  } catch (error) {
    console.error('Error fetching marine data from Open-Meteo:', error);
    return null;
  }
}

// Calculate moon phase
export function calculateMoonPhase(date: Date = new Date()): MoonPhase {
  const knownNewMoon = new Date('2000-01-06T18:14:00Z').getTime();
  const lunarCycle = 29.53058867 * 24 * 60 * 60 * 1000;
  
  const diff = date.getTime() - knownNewMoon;
  const age = (diff % lunarCycle) / lunarCycle;
  const adjustedAge = age < 0 ? age + 1 : age;
  
  const illumination = Math.sin(adjustedAge * 2 * Math.PI);
  const normalizedIllumination = (illumination + 1) / 2;
  
  let phase = 'New Moon';
  if (adjustedAge < 0.03 || adjustedAge > 0.97) phase = 'New Moon';
  else if (adjustedAge < 0.22) phase = 'Waxing Crescent';
  else if (adjustedAge < 0.28) phase = 'First Quarter';
  else if (adjustedAge < 0.47) phase = 'Waxing Gibbous';
  else if (adjustedAge < 0.53) phase = 'Full Moon';
  else if (adjustedAge < 0.72) phase = 'Waning Gibbous';
  else if (adjustedAge < 0.78) phase = 'Last Quarter';
  else phase = 'Waning Crescent';
  
  const daysToNextNew = (1 - adjustedAge) * 29.53;
  const daysToNextFull = (0.5 - adjustedAge) * 29.53;
  const nextNewMoon = new Date(date.getTime() + Math.max(daysToNextNew, 0) * 24 * 60 * 60 * 1000);
  const nextFullMoon = new Date(date.getTime() + Math.max(daysToNextFull, 0) * 24 * 60 * 60 * 1000);
  
  return {
    phase,
    illumination: Math.round(normalizedIllumination * 100) / 100,
    age: Math.round(adjustedAge * 29.53 * 10) / 10,
    next_new_moon: Math.floor(nextNewMoon.getTime() / 1000),
    next_full_moon: Math.floor(nextFullMoon.getTime() / 1000)
  };
}

// Geocoding with Nominatim
export async function geocodeAddress(query: string): Promise<LocationSearchResult[]> {
  try {
    const url = `${NOMINATIM_BASE}/search?format=json&q=${encodeURIComponent(query)}&limit=10&addressdetails=1`;
    const response = await fetch(url, {
      headers: { 'User-Agent': 'FishingCatchApp/1.0' }
    });
    
    if (!response.ok) throw new Error(`Geocoding error: ${response.status}`);
    
    const data = await response.json() as NominatimResponse[];
    
    return data.map(item => ({
      latitude: parseFloat(item.lat),
      longitude: parseFloat(item.lon),
      display_name: item.display_name,
      address: item.address ? {
        city: item.address.city,
        state: item.address.state,
        country: item.address.country
      } : undefined
    }));
  } catch (error) {
    console.error('Geocoding error:', error);
    return [];
  }
}

export async function reverseGeocode(latitude: number, longitude: number): Promise<LocationSearchResult | null> {
  try {
    const url = `${NOMINATIM_BASE}/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`;
    const response = await fetch(url, {
      headers: { 'User-Agent': 'FishingCatchApp/1.0' }
    });
    
    if (!response.ok) throw new Error(`Reverse geocoding error: ${response.status}`);
    
    const data = await response.json() as NominatimResponse;
    
    return {
      latitude: parseFloat(data.lat),
      longitude: parseFloat(data.lon),
      display_name: data.display_name,
      address: data.address ? {
        city: data.address.city,
        state: data.address.state,
        country: data.address.country
      } : undefined
    };
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    return null;
  }
}

// Tide type helpers
export function getTideType(height: number, previousHeight?: number, nextHeight?: number): 'high' | 'low' | 'rising' | 'falling' {
  if (previousHeight !== undefined && nextHeight !== undefined) {
    if (height > previousHeight && height > nextHeight) return 'high';
    if (height < previousHeight && height < nextHeight) return 'low';
    if (height > previousHeight) return 'rising';
    return 'falling';
  }
  return height > 3 ? 'high' : 'low';
}

export function formatTideTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}