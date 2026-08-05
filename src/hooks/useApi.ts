// API hooks
import { useState, useEffect, useCallback } from 'react';
import { 
  Catch, 
  CreateCatchInput, 
  TideStation, 
  TideDay, 
  WeatherData, 
  MoonPhase, 
  SolunarPeriod, 
  LocationSearchResult, 
  FishingSpot, 
  ApiResponse, 
  PaginatedResponse,
  MarineData
} from '../shared/types';
import { API_BASE } from '../config/api';

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return { success: false, error: data.error || 'Request failed' };
    }
    
    return data;
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Network error' };
  }
}

// Catches
export interface UseCatchesParams {
  page?: number;
  page_size?: number;
  species?: string;
  start_date?: string;
  end_date?: string;
  water_type?: string;
  sort_by?: 'caught_at' | 'created_at' | 'species' | 'weight';
  sort_order?: 'asc' | 'desc';
}

export function useCatches(params?: UseCatchesParams) {
  const [data, setData] = useState<PaginatedResponse<Catch> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCatches = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.set(key, value.toString());
        }
      });
    }
    
    const result = await fetchApi<PaginatedResponse<Catch>>(`/catches?${searchParams}`);
    
    if (result.success) {
      setData(result.data || null);
    } else {
      setError(result.error || 'Failed to fetch catches');
    }
    setLoading(false);
  }, [params]);

  useEffect(() => {
    fetchCatches();
  }, [fetchCatches]);

  return { data, loading, error, refetch: fetchCatches };
}

export function useCatch(id: string | undefined) {
  const [data, setData] = useState<Catch | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    
    fetchApi<{ catch: Catch }>(`/catches/${id}`)
      .then(result => {
        if (result.success) {
          setData(result.data?.catch || null);
        } else {
          setError(result.error || 'Failed to fetch catch');
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  return { data, loading, error };
}

export function useCreateCatch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCatch = async (input: CreateCatchInput): Promise<Catch | null> => {
    setLoading(true);
    setError(null);
    
    const result = await fetchApi<{ catch: Catch }>('/catches', {
      method: 'POST',
      body: JSON.stringify({ catch: input }),
    });
    
    setLoading(false);
    
    if (result.success) {
      return result.data?.catch || null;
    } else {
      setError(result.error || 'Failed to create catch');
      return null;
    }
  };

  return { createCatch, loading, error };
}

export function useUpdateCatch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateCatch = async (id: string, input: Partial<CreateCatchInput>): Promise<Catch | null> => {
    setLoading(true);
    setError(null);
    
    const result = await fetchApi<{ catch: Catch }>(`/catches/${id}`, {
      method: 'PUT',
      body: JSON.stringify(input),
    });
    
    setLoading(false);
    
    if (result.success) {
      return result.data?.catch || null;
    } else {
      setError(result.error || 'Failed to update catch');
      return null;
    }
  };

  return { updateCatch, loading, error };
}

export function useDeleteCatch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteCatch = async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    const result = await fetchApi(`/catches/${id}`, { method: 'DELETE' });
    
    setLoading(false);
    
    if (result.success) {
      return true;
    } else {
      setError(result.error || 'Failed to delete catch');
      return false;
    }
  };

  return { deleteCatch, loading, error };
}

export function useCatchStats() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApi<any>('/catches/stats')
      .then(result => {
        if (result.success) {
          setData(result.data);
        } else {
          setError(result.error || 'Failed to fetch stats');
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}

// Tides
export function useTides(latitude: number, longitude: number, date?: string, days = 1, locationName?: string) {
  const [data, setData] = useState<{ station: TideStation; predictions: TideDay[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchKey, setFetchKey] = useState(0);

  useEffect(() => {
    if (!latitude || !longitude) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    const params = new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
    });
    
    if (date) params.set('date', date);
    if (days) params.set('days', days.toString());
    if (locationName) params.set('name', locationName);
    
    fetchApi<{ station: TideStation; predictions: TideDay[] }>(`/tides?${params}`)
      .then(result => {
        if (result.success) {
          setData(result.data || null);
        } else {
          setError(result.error || 'Failed to fetch tides');
        }
      })
      .finally(() => setLoading(false));
  }, [latitude, longitude, date, days, fetchKey]);

  const refetch = useCallback(() => setFetchKey(k => k + 1), []);

  return { data, loading, error, refetch };
}

// Weather (includes marine data)
export function useWeather(latitude: number, longitude: number) {
  const [data, setData] = useState<{ 
    current: WeatherData; 
    marine: MarineData | null; 
    moon_phase: MoonPhase; 
    solunar_periods: SolunarPeriod[] 
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchKey, setFetchKey] = useState(0);

  useEffect(() => {
    if (!latitude || !longitude) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    fetchApi<{ 
      current: WeatherData; 
      marine: MarineData | null; 
      moon_phase: MoonPhase; 
      solunar_periods: SolunarPeriod[] 
    }>(`/weather?latitude=${latitude}&longitude=${longitude}`)
      .then(result => {
        if (result.success) {
          setData(result.data || null);
        } else {
          setError(result.error || 'Failed to fetch weather');
        }
      })
      .finally(() => setLoading(false));
  }, [latitude, longitude, fetchKey]);

  const refetch = useCallback(() => setFetchKey(k => k + 1), []);

  return { data, loading, error, refetch };
}

// Marine data only
export function useMarine(latitude: number, longitude: number, timezone = 'auto') {
  const [data, setData] = useState<MarineData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!latitude || !longitude) return;
    
    setLoading(true);
    setError(null);
    
    fetchApi<MarineData>(`/marine?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}`)
      .then(result => {
        if (result.success) {
          setData(result.data || null);
        } else {
          setError(result.error || 'Failed to fetch marine data');
        }
      })
      .finally(() => setLoading(false));
  }, [latitude, longitude, timezone]);

  return { data, loading, error };
}

// Locations
export function useSearchLocations(query: string) {
  const [data, setData] = useState<LocationSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query || query.length < 2) {
      setData([]);
      return;
    }
    
    // Debounce: wait 500ms after last keystroke before searching (Nominatim rate limit)
    const timer = setTimeout(() => {
      setLoading(true);
      setError(null);
      
      fetchApi<{ results: LocationSearchResult[] }>(`/locations/search?query=${encodeURIComponent(query)}`)
        .then(result => {
          if (result.success) {
            setData(result.data?.results || []);
          } else {
            setError(result.error || 'Failed to search locations');
            setData([]);
          }
        })
        .catch(() => {
          setError('Network error');
          setData([]);
        })
        .finally(() => setLoading(false));
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return { data, loading, error };
}

export function useReverseGeocode(latitude: number, longitude: number) {
  const [data, setData] = useState<LocationSearchResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!latitude || !longitude) return;
    
    setLoading(true);
    setError(null);
    
    fetchApi<{ location: LocationSearchResult | null }>(
      `/locations/reverse?latitude=${latitude}&longitude=${longitude}`
    )
      .then(result => {
        if (result.success) {
          setData(result.data?.location || null);
        } else {
          setError(result.error || 'Failed to reverse geocode');
        }
      })
      .finally(() => setLoading(false));
  }, [latitude, longitude]);

  return { data, loading, error };
}

// Spots
export function useSpots(latitude: number, longitude: number, radiusKm = 50, waterType?: string) {
  const [data, setData] = useState<FishingSpot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchKey, setFetchKey] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    const params = new URLSearchParams();
    
    // Only add lat/lng/radius if we have a real location (not 0,0)
    if (latitude && longitude) {
      params.set('latitude', latitude.toString());
      params.set('longitude', longitude.toString());
      params.set('radius_km', radiusKm.toString());
    }
    
    if (waterType) params.set('water_type', waterType);
    
    fetchApi<{ spots: FishingSpot[] }>(`/spots?${params}`)
      .then(result => {
        if (result.success) {
          setData(result.data?.spots || []);
        } else {
          setError(result.error || 'Failed to fetch spots');
        }
      })
      .finally(() => setLoading(false));
  }, [latitude, longitude, radiusKm, waterType, fetchKey]);

  const refetch = useCallback(() => setFetchKey(k => k + 1), []);

  return { data, loading, error, refetch };
}

// Search spots by name
export function useSearchSpots(query: string) {
  const [data, setData] = useState<FishingSpot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query || query.length < 2) {
      setData([]);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    fetchApi<{ spots: FishingSpot[] }>(`/spots?name=${encodeURIComponent(query)}`)
      .then(result => {
        if (result.success) {
          setData(result.data?.spots || []);
        } else {
          setError(result.error || 'Failed to search spots');
          setData([]);
        }
      })
      .finally(() => setLoading(false));
  }, [query]);

  return { data, loading, error };
}

// Geolocation hook
export function useGeolocation() {
  const [position, setPosition] = useState<{ latitude: number; longitude: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
    );
  }, []);

  const requestLocation = () => {
    setLoading(true);
    setError(null);
    
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return { position, loading, error, requestLocation };
}