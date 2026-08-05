// Weather Page — search by place name
import { useState, useEffect, useRef } from 'react';
import { useWeather, useGeolocation, useSearchLocations } from '../hooks/useApi';
import { format } from 'date-fns';

const WIND_DIRS = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];

function getWindDir(deg: number): string {
  const idx = Math.round(deg / 22.5) % 16;
  return WIND_DIRS[idx];
}

function getMoonIcon(phase: string) {
  const icons: Record<string, React.ReactNode> = {
    'New Moon': <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />,
    'Waxing Crescent': <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />,
    'First Quarter': <path d="M12 2a10 10 0 0 1 10 10A10 10 0 0 1 12 2z" />,
    'Waxing Gibbous': <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />,
    'Full Moon': <circle cx="12" cy="12" r="10" fill="currentColor" />,
    'Waning Gibbous': <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />,
    'Last Quarter': <path d="M12 2a10 10 0 0 0 10 10A10 10 0 0 0 12 2z" />,
    'Waning Crescent': <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />,
  };
  return icons[phase] || icons['New Moon'];
}

function getConditionIcon(icon: string) {
  const code = icon.replace('n', '').replace('d', '');
  const icons: Record<string, React.ReactNode> = {
    '01': <circle cx="12" cy="12" r="5" fill="currentColor" />,
    '02': <path d="M12 2a10 10 0 0 1 10 10A10 10 0 0 1 12 2z" />,
    '03': <path d="M12 2a10 10 0 0 1 10 10A10 10 0 0 1 12 2z" />,
    '04': <path d="M12 2a10 10 0 0 1 10 10A10 10 0 0 1 12 2z" />,
    '09': <path d="M12 2a10 10 0 0 1 10 10A10 10 0 0 1 12 2z" />,
    '10': <path d="M12 2a10 10 0 0 1 10 10A10 10 0 0 1 12 2z" />,
    '11': <path d="M12 2a10 10 0 0 1 10 10A10 10 0 0 1 12 2z" />,
    '13': <path d="M12 2a10 10 0 0 1 10 10A10 10 0 0 1 12 2z" />,
    '50': <path d="M12 2a10 10 0 0 1 10 10A10 10 0 0 1 12 2z" />,
  };
  return icons[code] || icons['01'];
}

// WMO weather code to emoji/text for daily forecast
const WMO_CODES: Record<number, { emoji: string; label: string }> = {
  0: { emoji: '☀️', label: 'Clear' },
  1: { emoji: '🌤️', label: 'Mainly Clear' },
  2: { emoji: '⛅', label: 'Partly Cloudy' },
  3: { emoji: '☁️', label: 'Overcast' },
  45: { emoji: '🌫️', label: 'Fog' },
  48: { emoji: '🌫️', label: 'Rime Fog' },
  51: { emoji: '🌦️', label: 'Light Drizzle' },
  53: { emoji: '🌦️', label: 'Drizzle' },
  55: { emoji: '🌧️', label: 'Heavy Drizzle' },
  61: { emoji: '🌧️', label: 'Light Rain' },
  63: { emoji: '🌧️', label: 'Rain' },
  65: { emoji: '🌧️', label: 'Heavy Rain' },
  71: { emoji: '🌨️', label: 'Light Snow' },
  73: { emoji: '🌨️', label: 'Snow' },
  75: { emoji: '❄️', label: 'Heavy Snow' },
  80: { emoji: '🌦️', label: 'Rain Showers' },
  81: { emoji: '🌧️', label: 'Showers' },
  82: { emoji: '⛈️', label: 'Violent Showers' },
  85: { emoji: '🌨️', label: 'Snow Showers' },
  95: { emoji: '⛈️', label: 'Thunderstorm' },
  96: { emoji: '⛈️', label: 'Thunderstorm + Hail' },
  99: { emoji: '⛈️', label: 'Severe Thunderstorm' },
};

function getWmoInfo(code: number) {
  return WMO_CODES[code] || { emoji: '🌤️', label: 'Unknown' };
}

export function WeatherPage() {
  const { position, loading: geoLoading, error: geoError, requestLocation } = useGeolocation();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [locationName, setLocationName] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [showLocationResults, setShowLocationResults] = useState(false);

  // Search locations using the locationQuery state
  const { data: locationResults } = useSearchLocations(locationQuery);

  const { data: weatherData, loading, error, refetch } = useWeather(latitude, longitude);

  const handleLocationSelect = (loc: { latitude: number; longitude: number; display_name: string }) => {
    setLatitude(loc.latitude);
    setLongitude(loc.longitude);
    setLocationName(loc.display_name);
    setLocationQuery(loc.display_name);
    setShowLocationResults(false);
  };

  const handleUseLocation = () => {
    if (position) {
      setLatitude(position.latitude);
      setLongitude(position.longitude);
      setLocationName('');
      setLocationQuery(`${position.latitude.toFixed(4)}, ${position.longitude.toFixed(4)}`);
    }
  };

  // Show search results when typing
  useEffect(() => {
    if (locationQuery.length >= 2 && locationResults.length > 0) {
      setShowLocationResults(true);
    }
  }, [locationResults, locationQuery]);

  const current = weatherData?.current;
  const dailyForecast = current?.daily || [];
  const moonPhase = weatherData?.moon_phase;
  const solunarPeriods = weatherData?.solunar_periods || [];
  const hasLocation = latitude !== 0 && longitude !== 0;

  return (
    <div>
      <div className="page-header">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="page-title">Weather & Solunar</h1>
            <p className="page-subtitle">Real-time conditions, forecasts, and fish feeding times</p>
          </div>
        </div>
      </div>

      {/* Location Controls */}
      <div className="card mb-6">
        <div className="card-body">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="form-group flex-1">
              <label htmlFor="weather-location" className="label">Location</label>
              <div className="relative">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  ref={searchInputRef}
                  id="weather-location"
                  type="text"
                  className="input"
                  style={{ paddingLeft: '2.5rem' }}
                  value={locationQuery}
                  onChange={(e) => {
                    setLocationQuery(e.target.value);
                    if (e.target.value.length < 2) setShowLocationResults(false);
                  }}
                  onFocus={() => {
                    if (locationQuery.length >= 2 && locationResults.length > 0) {
                      setShowLocationResults(true);
                    }
                  }}
                  onBlur={() => setTimeout(() => setShowLocationResults(false), 200)}
                  placeholder="Search by town, city, or postcode..."
                />
                {showLocationResults && locationResults.length > 0 && (
                  <ul className="absolute z-50 w-full mt-1 bg-bg-card border rounded-lg shadow-lg max-h-60 overflow-auto">
                    {locationResults.map((loc, i) => (
                      <li key={i}>
                        <button
                          type="button"
                          className="w-full text-left p-3 hover:bg-bg-hover"
                          onClick={() => handleLocationSelect(loc)}
                        >
                          <div className="font-medium">{loc.display_name.split(',')[0]}</div>
                          <div className="text-xs text-text-secondary">{loc.display_name}</div>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="form-group flex items-end gap-2">
              <button type="button" className="btn btn-secondary" onClick={handleUseLocation} disabled={geoLoading}>
                {geoLoading ? (
                  <>
                    <span className="spinner-sm" /> Detecting...
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
                    </svg>
                    My Location
                  </>
                )}
              </button>
              {hasLocation && (
                <button type="button" className="btn btn-primary" onClick={refetch} disabled={loading}>
                  {loading ? <span className="spinner-sm" /> : 'Refresh'}
                </button>
              )}
            </div>
          </div>
          {geoError && (
            <p className="text-danger text-sm mt-2" role="alert">{geoError}</p>
          )}
        </div>
      </div>

      {!hasLocation ? (
        /* No location set — show search prompt */
        <div className="card">
          <div className="card-body text-center py-12">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-4 text-text-muted" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <h3 className="text-xl font-semibold text-text mb-2">Search for a Location</h3>
            <p className="text-text-secondary mb-6">Type a town, city, or postcode above to get weather data.</p>
            <button
              onClick={() => searchInputRef.current?.focus()}
              className="btn btn-primary"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              Search Location
            </button>
          </div>
        </div>
      ) : loading ? (
        <div className="card">
          <div className="card-body text-center py-12">
            <div className="spinner mx-auto mb-4" />
            <p className="text-text-secondary">Loading weather data...</p>
          </div>
        </div>
      ) : error ? (
        <div className="card">
          <div className="card-body text-center py-12">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-4 text-danger" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p className="text-text">{error}</p>
            <button onClick={refetch} className="btn btn-primary mt-4">Retry</button>
          </div>
        </div>
      ) : current ? (
        <>
          {/* Location display */}
          {locationName && (
            <div className="mb-4 flex items-center gap-2 text-sm text-text-secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>Location: <strong>{locationName.split(',')[0]}</strong></span>
              <span className="text-text-muted">— {locationName.split(',').slice(1, 3).join(',').trim()}</span>
            </div>
          )}

          {/* Current Conditions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="card">
              <div className="card-body text-center">
                <div className="flex justify-center mb-3">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" aria-hidden="true">
                    {getConditionIcon(current.icon)}
                  </svg>
                </div>
                <p className="text-4xl font-bold text-text tabular-nums">{current.temperature}°C</p>
                <p className="text-text-secondary capitalize">{current.description}</p>
                <p className="text-sm text-text-muted mt-1">Feels like {current.feels_like}°C</p>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h3 className="text-sm font-semibold text-text-secondary mb-3">Wind</h3>
                <div className="flex items-center justify-center gap-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-text tabular-nums">{current.wind_speed} mph</p>
                    <p className="text-sm text-text-secondary">{getWindDir(current.wind_direction)}</p>
                  </div>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-secondary" style={{ transform: `rotate(${current.wind_direction - 90}deg)` }} aria-hidden="true">
                    <path d="M13 2L3 14h7v8l10-10h-7z" />
                  </svg>
                </div>
                {current.wind_gust && (
                  <p className="text-sm text-text-muted mt-2 text-center">Gusts to {current.wind_gust} mph</p>
                )}
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h3 className="text-sm font-semibold text-text-secondary mb-3">Pressure & Humidity</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-bg rounded-lg">
                    <p className="text-2xl font-bold text-text tabular-nums">{current.pressure} hPa</p>
                    <p className="text-sm text-text-secondary">Pressure</p>
                  </div>
                  <div className="text-center p-3 bg-bg rounded-lg">
                    <p className="text-2xl font-bold text-text tabular-nums">{current.humidity}%</p>
                    <p className="text-sm text-text-secondary">Humidity</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div className="text-center p-3 bg-bg rounded-lg">
                    <p className="text-2xl font-bold text-text tabular-nums">{current.clouds}%</p>
                    <p className="text-sm text-text-secondary">Cloud Cover</p>
                  </div>
                  <div className="text-center p-3 bg-bg rounded-lg">
                    <p className="text-2xl font-bold text-text tabular-nums">{(current.visibility / 1609).toFixed(1)} mi</p>
                    <p className="text-sm text-text-secondary">Visibility</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h3 className="text-sm font-semibold text-text-secondary mb-3">Sun & Moon</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary flex items-center gap-2">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <circle cx="12" cy="12" r="5" />
                        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                      </svg>
                      Sunrise
                    </span>
                    <span className="font-medium tabular-nums">{format(current.sunrise * 1000, 'h:mm a')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary flex items-center gap-2">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                      </svg>
                      Sunset
                    </span>
                    <span className="font-medium tabular-nums">{format(current.sunset * 1000, 'h:mm a')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary flex items-center gap-2">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        {getMoonIcon(moonPhase?.phase || 'New Moon')}
                      </svg>
                      Moon
                    </span>
                    <span className="font-medium capitalize">{moonPhase?.phase}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Illumination</span>
                    <div className="flex items-center gap-3">
                      <div className="progress w-32" style={{ height: '8px' }}>
                        <div className="progress-bar" style={{ width: `${(moonPhase?.illumination || 0) * 100}%` }} />
                      </div>
                      <span className="font-medium tabular-nums text-sm">{Math.round((moonPhase?.illumination || 0) * 100)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Solunar Periods */}
          <div className="card mb-6">
            <div className="card-header">
              <h2 className="text-lg font-semibold text-text flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                Solunar Feeding Periods
              </h2>
            </div>
            <div className="card-body">
              <p className="text-text-secondary text-sm mb-4">
                Best fishing times based on moon position. Major periods = moon overhead/underfoot (2 hrs). Minor = moon rise/set (1 hr).
              </p>
              {solunarPeriods.length === 0 ? (
                <p className="text-text-muted text-center py-4">No solunar data available</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {solunarPeriods.slice(0, 8).map((period, i) => (
                    <div key={i} className={`p-4 rounded-lg border ${period.type === 'major' ? 'border-primary/50 bg-primary-light/30' : 'border-secondary/50 bg-secondary/10'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`badge ${period.type === 'major' ? 'badge-primary' : 'badge-secondary'}`}>
                          {period.type === 'major' ? 'Major Period' : 'Minor Period'}
                        </span>
                        <span className="font-mono text-sm text-text-secondary">
                          Rating: {'★'.repeat(Math.round(period.rating))}{'☆'.repeat(5 - Math.round(period.rating))}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-secondary">Start</span>
                        <span className="font-medium tabular-nums">{format(period.start * 1000, 'h:mm a')}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-secondary">End</span>
                        <span className="font-medium tabular-nums">{format(period.end * 1000, 'h:mm a')}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm mt-1">
                        <span className="text-text-secondary">Duration</span>
                        <span className="font-medium tabular-nums">
                          {Math.round((period.end - period.start) / 60)} min
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 7-Day Forecast */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-lg font-semibold text-text">7-Day Forecast</h2>
            </div>
            <div className="card-body">
              {dailyForecast.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
                  {dailyForecast.slice(0, 7).map((day, i) => {
                    const wmo = getWmoInfo(day.weather_code);
                    const date = new Date(day.date + 'T00:00:00');
                    const isToday = i === 0;
                    return (
                      <div
                        key={day.date}
                        className={`rounded-lg p-3 text-center border ${isToday ? 'border-primary bg-primary/5' : 'border-border'}`}
                      >
                        <div className="text-xs font-medium text-text-secondary mb-1">
                          {isToday ? 'Today' : format(date, 'EEE')}
                        </div>
                        <div className="text-xs text-text-secondary mb-1">{format(date, 'MMM d')}</div>
                        <div className="text-2xl my-1">{wmo.emoji}</div>
                        <div className="text-xs text-text-secondary mb-2">{wmo.label}</div>
                        <div className="font-semibold text-text">
                          {Math.round(day.temperature_2m_max)}°
                        </div>
                        <div className="text-xs text-text-secondary">
                          {Math.round(day.temperature_2m_min)}°
                        </div>
                        {day.precipitation_probability_max > 0 && (
                          <div className="text-xs text-blue-500 mt-1">
                            💧 {day.precipitation_probability_max}%
                          </div>
                        )}
                        <div className="text-xs text-text-secondary mt-1">
                          🌬️ {Math.round(day.wind_speed_10m_max)} mph
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-text-secondary text-center py-8">
                  Search for a location to see the 7-day forecast.
                </p>
              )}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
