// Tides Page
import { useState, useEffect } from 'react';
import { useTides, useGeolocation, useSearchLocations, useReverseGeocode } from '../hooks/useApi';
import { format, parseISO, addDays, startOfDay } from 'date-fns';

export function TidesPage() {
  const { position, loading: geoLoading, error: geoError, requestLocation } = useGeolocation();
  
  const [latitude, setLatitude] = useState(position?.latitude || 0);
  const [longitude, setLongitude] = useState(position?.longitude || 0);
  const [locationName, setLocationName] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [showLocationResults, setShowLocationResults] = useState(false);
  const [date, setDate] = useState(() => format(new Date(), 'yyyy-MM-dd'));
  const [days, setDays] = useState(7);

  // Search locations using the locationQuery state
  const { data: locationResults } = useSearchLocations(locationQuery);
  
  const { data: reverseGeocode } = useReverseGeocode(latitude, longitude);
  const { data: tideData, loading, error, refetch } = useTides(latitude, longitude, date, days, locationName || locationQuery);

  // Derive the display name: search result > reverse geocode > tide station > fallback
  const displayName = locationName
    || reverseGeocode?.display_name
    || tideData?.station.name
    || '';

  const handleLocationSelect = (loc: { latitude: number; longitude: number; display_name: string }) => {
    setLatitude(loc.latitude);
    setLongitude(loc.longitude);
    setLocationName(loc.display_name);
    setLocationQuery('');
    setShowLocationResults(false);
  };

  const handleUseLocation = () => {
    if (position) {
      setLatitude(position.latitude);
      setLongitude(position.longitude);
      setLocationQuery('');
      setLocationName(''); // reverse geocode will fill this in
    }
  };

  useEffect(() => {
    if (position && !latitude && !longitude) {
      setLatitude(position.latitude);
      setLongitude(position.longitude);
    }
  }, [position]);

  const getTideTypeLabel = (type: 'H' | 'L') => type === 'H' ? 'High Tide' : 'Low Tide';
  const getTideTypeClass = (type: 'H' | 'L') => type === 'H' ? 'badge-primary' : 'badge-secondary';

  const isTidePassed = (tideTime: string) => new Date(tideTime) < new Date();

  return (
    <div>
      <div className="page-header">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="page-title">Tide Tables</h1>
            <p className="page-subtitle">Tide predictions for your fishing spots</p>
          </div>
        </div>
      </div>

      {/* Location & Date Controls */}
      <div className="card mb-6">
        <div className="card-body">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="form-group flex-1">
              <label htmlFor="tide-location" className="label">Location</label>
              <div className="relative">
                <input
                  id="tide-location"
                  type="text"
                  className="input"
                  value={locationQuery || displayName}
                  onChange={(e) => {
                    setLocationQuery(e.target.value);
                    setShowLocationResults(e.target.value.length >= 2);
                  }}
                  onFocus={() => setShowLocationResults(locationQuery.length >= 2)}
                  onBlur={() => setTimeout(() => setShowLocationResults(false), 200)}
                  placeholder="Search for a coastal location..."
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
              <div className="flex gap-2 mt-2">
                <button type="button" className="btn btn-secondary btn-sm" onClick={handleUseLocation}>
                  Use My Location
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="tide-date" className="label">Start Date</label>
              <input
                id="tide-date"
                type="date"
                className="input"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={format(new Date(), 'yyyy-MM-dd')}
              />
            </div>

            <div className="form-group">
              <label htmlFor="tide-days" className="label">Days</label>
              <select
                id="tide-days"
                className="input select"
                value={days}
                onChange={(e) => setDays(parseInt(e.target.value))}
              >
                {[1, 2, 3, 5, 7, 14].map(d => (
                  <option key={d} value={d}>{d} day{d > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>

            <div className="form-group flex items-end">
              <button type="button" className="btn btn-primary" onClick={refetch} disabled={loading}>
                {loading ? <span className="spinner-sm" /> : 'Refresh'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tide Data */}
      {loading ? (
        <div className="card">
          <div className="card-body text-center py-12">
            <div className="spinner mx-auto mb-4" />
            <p className="text-text-secondary">Loading tide predictions...</p>
          </div>
        </div>
      ) : error ? (
        <div className="card">
          <div className="card-body text-center py-12">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-4 text-danger" aria-hidden="true">
              <path d="M3 12c1.5-2.5 3.5-2.5 5 0s3.5 2.5 5 0 3.5-2.5 5 0" />
            </svg>
            <p className="text-text">{error}</p>
            <button onClick={refetch} className="btn btn-primary mt-4">Retry</button>
          </div>
        </div>
      ) : tideData ? (
        <>
          <div className="mb-4 flex items-center gap-2 text-sm text-text-secondary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>Station: <strong>{displayName || tideData.station.name}</strong></span>
            {tideData.station.state && <span>• {tideData.station.state}</span>}
          </div>

          {tideData.predictions.map((day, dayIndex) => (
            <div key={day.date} className="card mb-4">
              <div className="card-header bg-bg">
                <h3 className="text-lg font-semibold text-text">
                  {format(parseISO(day.date), 'EEEE, MMMM d, yyyy')}
                  {dayIndex === 0 && <span className="badge badge-primary ml-2">Today</span>}
                </h3>
              </div>
              <div className="card-body">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* High Tides */}
                  <div>
                    <h4 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M3 12c1.5-2.5 3.5-2.5 5 0s3.5 2.5 5 0 3.5-2.5 5 0" />
                      </svg>
                      High Tides
                    </h4>
                    {day.high_tides.length === 0 ? (
                      <p className="text-text-muted text-sm">No high tides this day</p>
                    ) : (
                      <ul className="space-y-2" role="list">
                        {day.high_tides.map((tide, i) => (
                          <li key={i} className={`flex items-center justify-between p-3 rounded-lg ${isTidePassed(tide.t) ? 'bg-bg opacity-60' : 'bg-primary-light/50'}`}>
                            <div className="flex items-center gap-3">
                              <span className={`badge ${getTideTypeClass(tide.type)}`}>{getTideTypeLabel(tide.type)}</span>
                              <span className="text-xl font-bold text-text tabular-nums">
                                {format(parseISO(tide.t), 'h:mm a')}
                              </span>
                            </div>
                            <span className="text-lg font-semibold text-text tabular-nums">
                              {tide.v.toFixed(1)} ft
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Low Tides */}
                  <div>
                    <h4 className="text-sm font-semibold text-secondary mb-3 flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M3 12c1.5-2.5 3.5-2.5 5 0s3.5 2.5 5 0 3.5-2.5 5 0" />
                      </svg>
                      Low Tides
                    </h4>
                    {day.low_tides.length === 0 ? (
                      <p className="text-text-muted text-sm">No low tides this day</p>
                    ) : (
                      <ul className="space-y-2" role="list">
                        {day.low_tides.map((tide, i) => (
                          <li key={i} className={`flex items-center justify-between p-3 rounded-lg ${isTidePassed(tide.t) ? 'bg-bg opacity-60' : 'bg-secondary/10'}`}>
                            <div className="flex items-center gap-3">
                              <span className={`badge ${getTideTypeClass(tide.type)}`}>{getTideTypeLabel(tide.type)}</span>
                              <span className="text-xl font-bold text-text tabular-nums">
                                {format(parseISO(tide.t), 'h:mm a')}
                              </span>
                            </div>
                            <span className="text-lg font-semibold text-text tabular-nums">
                              {tide.v.toFixed(1)} ft
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {tideData.predictions.length === 0 && (
            <div className="card">
              <div className="card-body text-center py-12">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-4 text-text-muted" aria-hidden="true">
                  <path d="M3 12c1.5-2.5 3.5-2.5 5 0s3.5 2.5 5 0 3.5-2.5 5 0" />
                </svg>
                <p className="text-text-secondary">No tide data available for this location and date range.</p>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="card">
          <div className="card-body text-center py-12">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-4 text-text-muted" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <h3 className="text-xl font-semibold text-text mb-2">Enable Location</h3>
            <p className="text-text-secondary mb-6">Get tide predictions for your area.</p>
            <button
              onClick={requestLocation}
              disabled={geoLoading}
              className="btn btn-primary"
              aria-busy={geoLoading}
            >
              {geoLoading ? (
                <>
                  <span className="spinner-sm" /> Detecting...
                </>
              ) : geoError ? (
                'Try Again'
              ) : (
                'Allow Location Access'
              )}
            </button>
            {geoError && (
              <p className="text-danger text-sm mt-3" role="alert">{geoError}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}