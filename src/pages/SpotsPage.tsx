// Spots Page - Map-based fishing spot discovery with name search and catch reports
import { useState, useEffect, useRef } from 'react';
import { useSpots, useSearchSpots, useSearchLocations, useGeolocation } from '../hooks/useApi';
import { FishingSpot } from '../shared/types';
import { FishingSpotsMap } from '../components/FishingSpotsMap';
import { PhotoUpload } from '../components/PhotoUpload';
import { API_BASE } from '../config/api';

export function SpotsPage() {
  const { position, loading: geoLoading, error: geoError, requestLocation } = useGeolocation();
  
  const [latitude, setLatitude] = useState(position?.latitude || 0);
  const [longitude, setLongitude] = useState(position?.longitude || 0);
  const [locationQuery, setLocationQuery] = useState('');
  const [showLocationResults, setShowLocationResults] = useState(false);
  const [radius, setRadius] = useState(500);
  const [waterType, setWaterType] = useState<'freshwater' | 'saltwater' | 'brackish' | ''>('');
  
  // Spot name search
  const [spotNameQuery, setSpotNameQuery] = useState('');
  const [showSpotResults, setShowSpotResults] = useState(false);
  const { data: nameSearchResults } = useSearchSpots(spotNameQuery);
  
  // Location search
  const { data: locationResults } = useSearchLocations(locationQuery);
  
  // Add spot modal
  const [showAddSpot, setShowAddSpot] = useState(false);
  const [newSpotCoords, setNewSpotCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [addSpotForm, setAddSpotForm] = useState({
    name: '',
    water_type: 'freshwater' as 'freshwater' | 'saltwater' | 'brackish',
    access_type: 'shore' as 'shore' | 'boat' | 'kayak' | 'pier' | 'wade',
    species: '',
    description: '',
  });
  const [addSpotPhotos, setAddSpotPhotos] = useState<string[]>([]);
  const [addSpotLoading, setAddSpotLoading] = useState(false);
  
  // Selected spot
  const [selectedSpot, setSelectedSpot] = useState<FishingSpot | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  
  const { data: spots, loading, error, refetch } = useSpots(latitude, longitude, radius, waterType || undefined);
  const mapRef = useRef<HTMLDivElement>(null);

  const handleLocationSelect = (loc: { latitude: number; longitude: number; display_name: string }) => {
    setLatitude(loc.latitude);
    setLongitude(loc.longitude);
    setLocationQuery(loc.display_name);
    setShowLocationResults(false);
  };

  const handleUseLocation = () => {
    if (position) {
      setLatitude(position.latitude);
      setLongitude(position.longitude);
      setLocationQuery(`${position.latitude.toFixed(4)}, ${position.longitude.toFixed(4)}`);
    }
  };

  useEffect(() => {
    if (position && !latitude && !longitude) {
      setLatitude(position.latitude);
      setLongitude(position.longitude);
    }
  }, [position]);

  // Map click to add new spot
  const handleMapClick = (lat: number, lng: number) => {
    setNewSpotCoords({ lat, lng });
    setAddSpotForm({ name: '', water_type: 'freshwater', access_type: 'shore', species: '', description: '' });
    setShowAddSpot(true);
  };

  const handleSpotClick = (spot: FishingSpot) => {
    setSelectedSpot(spot);
  };

  // Submit new spot
  const handleAddSpot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSpotCoords || !addSpotForm.name.trim()) return;
    
    setAddSpotLoading(true);
    try {
      const response = await fetch(`${API_BASE}/spots`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: addSpotForm.name.trim(),
          latitude: newSpotCoords.lat,
          longitude: newSpotCoords.lng,
          water_type: addSpotForm.water_type,
          access_type: addSpotForm.access_type,
          species: addSpotForm.species.split(',').map(s => s.trim()).filter(Boolean),
          description: addSpotForm.description.trim() || undefined,
          image_urls: addSpotPhotos,
        }),
      });
      
      const result = await response.json();
      if (result.success) {
        setShowAddSpot(false);
        setNewSpotCoords(null);
        setAddSpotForm({ name: '', water_type: 'freshwater', access_type: 'shore', species: '', description: '' });
        setAddSpotPhotos([]);
        refetch();
      } else {
        alert(result.error || 'Failed to add spot');
      }
    } catch (err) {
      console.error('Failed to add spot:', err);
      alert('Failed to add spot — check console for details');
    } finally {
      setAddSpotLoading(false);
    }
  };

  // Handle spot name search selection
  const handleSpotNameSelect = (spot: FishingSpot) => {
    setSpotNameQuery(spot.name);
    setShowSpotResults(false);
    setLatitude(spot.latitude);
    setLongitude(spot.longitude);
    setSelectedSpot(spot);
    setViewMode('map');
  };

  const getAccessTypeColor = (type: FishingSpot['access_type']) => {
    const colors: Record<FishingSpot['access_type'], string> = {
      shore: 'badge-primary',
      boat: 'badge-secondary',
      kayak: 'badge-accent',
      pier: 'badge-success',
      wade: 'badge-warning',
    };
    return colors[type] || 'badge-neutral';
  };

  const getWaterTypeColor = (type: FishingSpot['water_type']) => {
    const colors: Record<FishingSpot['water_type'], string> = {
      freshwater: 'badge-primary',
      saltwater: 'badge-secondary',
      brackish: 'badge-accent',
    };
    return colors[type] || 'badge-neutral';
  };

  return (
    <div>
      <div className="page-header">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="page-title">Fishing Spots</h1>
            <p className="page-subtitle">Discover and save productive fishing locations</p>
          </div>
          <div className="flex gap-2">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                setNewSpotCoords(null);
                setAddSpotForm({ name: '', water_type: 'freshwater', access_type: 'shore', species: '', description: '' });
                setShowAddSpot(true);
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add Spot
            </button>
            <button
              className={`btn btn-sm ${viewMode === 'map' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setViewMode('map')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                <line x1="8" y1="2" x2="8" y2="18" />
                <line x1="16" y1="6" x2="16" y2="22" />
              </svg>
              Map
            </button>
            <button
              className={`btn btn-sm ${viewMode === 'list' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setViewMode('list')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
              List
            </button>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="card mb-6">
        <div className="card-body">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Spot Name Search */}
            <div className="form-group flex-1">
              <label htmlFor="spot-name-search" className="label">Search Spots by Name</label>
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
                  id="spot-name-search"
                  type="text"
                  className="input"
                  style={{ paddingLeft: '2.5rem' }}
                  value={spotNameQuery}
                  onChange={(e) => {
                    setSpotNameQuery(e.target.value);
                    setShowSpotResults(e.target.value.length >= 2);
                  }}
                  onFocus={() => {
                    if (spotNameQuery.length >= 2 && nameSearchResults.length > 0) {
                      setShowSpotResults(true);
                    }
                  }}
                  onBlur={() => setTimeout(() => setShowSpotResults(false), 200)}
                  placeholder="e.g. Brighton Pier, Lake Windermere..."
                />
                {showSpotResults && nameSearchResults.length > 0 && (
                  <ul className="absolute z-50 w-full mt-1 bg-bg-card border rounded-lg shadow-lg max-h-60 overflow-auto">
                    {nameSearchResults.map((spot) => (
                      <li key={spot.id}>
                        <button
                          type="button"
                          className="w-full text-left p-3 hover:bg-bg-hover"
                          onClick={() => handleSpotNameSelect(spot)}
                        >
                          <div className="font-medium">{spot.name}</div>
                          <div className="text-xs text-text-secondary">
                            {spot.water_type} • {spot.access_type} • {spot.latitude.toFixed(4)}, {spot.longitude.toFixed(4)}
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Location Search */}
            <div className="form-group flex-1">
              <label htmlFor="spot-location" className="label">Search Area</label>
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
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <input
                  id="spot-location"
                  type="text"
                  className="input"
                  style={{ paddingLeft: '2.5rem' }}
                  value={locationQuery}
                  onChange={(e) => {
                    setLocationQuery(e.target.value);
                    setShowLocationResults(e.target.value.length >= 2);
                  }}
                  onFocus={() => setShowLocationResults(locationQuery.length >= 2)}
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
              <div className="flex gap-2 mt-2">
                <button type="button" className="btn btn-secondary btn-sm" onClick={handleUseLocation}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
                  </svg>
                  My Location
                </button>
              </div>
            </div>

            <div className="form-group flex items-end">
              <label htmlFor="radius" className="label">Radius</label>
              <select
                id="radius"
                className="input select w-auto"
                value={radius}
                onChange={(e) => setRadius(parseInt(e.target.value))}
              >
                <option value={10}>10 km</option>
                <option value={25}>25 km</option>
                <option value={50}>50 km</option>
                <option value={100}>100 km</option>
                <option value={500}>All UK</option>
              </select>
            </div>

            <div className="form-group flex items-end">
              <label htmlFor="water-type" className="label">Water</label>
              <select
                id="water-type"
                className="input select w-auto"
                value={waterType}
                onChange={(e) => setWaterType(e.target.value as typeof waterType)}
              >
                <option value="">All</option>
                <option value="freshwater">Freshwater</option>
                <option value="saltwater">Saltwater</option>
                <option value="brackish">Brackish</option>
              </select>
            </div>

            <div className="form-group flex items-end">
              <button className="btn btn-primary" onClick={refetch} disabled={loading}>
                {loading ? <span className="spinner-sm" /> : 'Search'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Map / List View */}
      {viewMode === 'map' ? (
        <div className="card mb-6 overflow-hidden">
          <div className="relative" ref={mapRef}>
            {loading && (
              <div className="absolute top-4 right-4 z-[1000] bg-bg-card border rounded-lg shadow-lg px-4 py-2 flex items-center gap-2">
                <span className="spinner-sm" />
                <span className="text-sm text-text-secondary">Loading spots...</span>
              </div>
            )}
            <FishingSpotsMap
              spots={spots}
              onMapClick={handleMapClick}
              center={latitude && longitude ? [latitude, longitude] : [54.0, -2.0]}
              zoom={latitude && longitude ? 10 : 6}
              height="500px"
            />
          </div>
          <div className="card-body bg-bg text-sm text-text-secondary">
            <p>
              <strong>{spots.length}</strong> spot{spots.length !== 1 ? 's' : ''} found.
              {' '}Click anywhere on the map to add a new spot.
            </p>
          </div>
        </div>
      ) : (
        <>
          {loading ? (
            <div className="card">
              <div className="card-body text-center py-12">
                <div className="spinner mx-auto mb-4" />
                <p className="text-text-secondary">Searching for fishing spots...</p>
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
          ) : spots.length === 0 ? (
            <div className="card">
              <div className="card-body text-center py-16">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-4 text-text-muted" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <h3 className="text-xl font-semibold text-text mb-2">No spots found</h3>
                <p className="text-text-secondary mb-6">Try expanding your search radius, search by name, or add a new spot.</p>
                <div className="flex gap-2 justify-center">
                  <button className="btn btn-primary" onClick={() => setViewMode('map')}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                    </svg>
                    Open Map
                  </button>
                  <button className="btn btn-secondary" onClick={() => { setNewSpotCoords(null); setShowAddSpot(true); }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Add Spot
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {spots.map(spot => (
                <button
                  key={spot.id}
                  type="button"
                  className="card text-left hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => { setSelectedSpot(spot); setViewMode('map'); }}
                >
                  <div className="card-body">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-text truncate">{spot.name}</h3>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-2">
                          <span className={`badge ${getWaterTypeColor(spot.water_type)} capitalize`}>{spot.water_type}</span>
                          <span className={`badge ${getAccessTypeColor(spot.access_type)}`}>{spot.access_type}</span>
                        </div>
                        {spot.description && (
                          <p className="text-text-secondary text-sm mb-3 line-clamp-2">{spot.description}</p>
                        )}
                        {spot.species.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {spot.species.slice(0, 5).map(s => (
                              <span key={s} className="badge badge-neutral text-xs">{s}</span>
                            ))}
                            {spot.species.length > 5 && (
                              <span className="badge badge-neutral text-xs">+{spot.species.length - 5} more</span>
                            )}
                          </div>
                        )}
                        <p className="text-xs text-text-muted">
                          {spot.latitude.toFixed(4)}, {spot.longitude.toFixed(4)}
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {/* Selected Spot Detail Panel */}
      {selectedSpot && (
        <div className="card mb-6 border-primary/30">
          <div className="card-header flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-text">{selectedSpot.name}</h3>
              <span className={`badge ${getWaterTypeColor(selectedSpot.water_type)} capitalize`}>{selectedSpot.water_type}</span>
              <span className={`badge ${getAccessTypeColor(selectedSpot.access_type)}`}>{selectedSpot.access_type}</span>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => setSelectedSpot(null)} aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <div className="card-body">
            {/* Spot Photos */}
            {selectedSpot.image_urls && selectedSpot.image_urls.length > 0 && (
              <div className="mb-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {selectedSpot.image_urls.map((url, i) => (
                    <div key={i} className="relative group">
                      <img
                        src={url}
                        alt={`${selectedSpot.name} photo ${i + 1}`}
                        className="w-full h-32 object-cover rounded-lg border border-border cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => window.open(url, '_blank')}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedSpot.description && (
              <p className="text-text-secondary mb-4">{selectedSpot.description}</p>
            )}
            
            {selectedSpot.species.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-text mb-2">Target Species</h4>
                <div className="flex flex-wrap gap-1">
                  {selectedSpot.species.map(s => (
                    <span key={s} className="badge badge-neutral text-xs">{s}</span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-4 text-sm text-text-muted">
              <span className="flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {selectedSpot.latitude.toFixed(6)}, {selectedSpot.longitude.toFixed(6)}
              </span>
              <span className="text-text-muted">•</span>
              <span>Added {new Date(selectedSpot.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      )}

      {/* Add Spot Modal */}
      {showAddSpot && (
        <div className="modal-overlay" onClick={() => setShowAddSpot(false)} role="dialog" aria-modal="true" aria-labelledby="add-spot-title">
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 id="add-spot-title" className="modal-title">
                {newSpotCoords ? 'Add Fishing Spot' : 'Add New Spot'}
              </h2>
              <button className="modal-close" onClick={() => setShowAddSpot(false)} aria-label="Close">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="modal-body">
              {!newSpotCoords ? (
                /* Location picker instructions */
                <div className="mb-6">
                  <p className="text-text-secondary text-sm mb-4">
                    Switch to Map view and click anywhere on the map to choose a location, or enter coordinates below:
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="form-group">
                      <label htmlFor="manual-lat" className="label">Latitude</label>
                      <input
                        id="manual-lat"
                        type="number"
                        step="any"
                        className="input"
                        placeholder="e.g. 50.8225"
                        onChange={(e) => {
                          const lat = parseFloat(e.target.value);
                          const lng = parseFloat((document.getElementById('manual-lng') as HTMLInputElement)?.value || '0');
                          if (!isNaN(lat) && !isNaN(lng)) {
                            setNewSpotCoords({ lat, lng });
                          }
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="manual-lng" className="label">Longitude</label>
                      <input
                        id="manual-lng"
                        type="number"
                        step="any"
                        className="input"
                        placeholder="e.g. -0.1372"
                        onChange={(e) => {
                          const lng = parseFloat(e.target.value);
                          const lat = parseFloat((document.getElementById('manual-lat') as HTMLInputElement)?.value || '0');
                          if (!isNaN(lat) && !isNaN(lng)) {
                            setNewSpotCoords({ lat, lng });
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                /* Show selected location */
                <div className="mb-4">
                  <div className="flex items-center gap-2 p-3 bg-bg rounded-lg border">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" aria-hidden="true">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span className="text-sm text-text">
                      Lat: {newSpotCoords.lat.toFixed(6)}, Lng: {newSpotCoords.lng.toFixed(6)}
                    </span>
                  </div>
                </div>
              )}

              <form onSubmit={handleAddSpot}>
                <div className="form-group">
                  <label htmlFor="spot-name" className="label">Spot Name <span className="text-danger">*</span></label>
                  <input
                    id="spot-name"
                    type="text"
                    className="input"
                    required
                    value={addSpotForm.name}
                    onChange={(e) => setAddSpotForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="e.g. Brixham Harbour, Lake Windermere"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="spot-water-type" className="label">Water Type</label>
                    <select
                      id="spot-water-type"
                      className="input select"
                      value={addSpotForm.water_type}
                      onChange={(e) => setAddSpotForm(f => ({ ...f, water_type: e.target.value as typeof addSpotForm.water_type }))}
                    >
                      <option value="freshwater">Freshwater</option>
                      <option value="saltwater">Saltwater</option>
                      <option value="brackish">Brackish</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="spot-access" className="label">Access Type</label>
                    <select
                      id="spot-access"
                      className="input select"
                      value={addSpotForm.access_type}
                      onChange={(e) => setAddSpotForm(f => ({ ...f, access_type: e.target.value as typeof addSpotForm.access_type }))}
                    >
                      <option value="shore">Shore</option>
                      <option value="boat">Boat</option>
                      <option value="kayak">Kayak</option>
                      <option value="pier">Pier</option>
                      <option value="wade">Wade</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="spot-species" className="label">Target Species (comma separated)</label>
                  <input
                    id="spot-species"
                    type="text"
                    className="input"
                    value={addSpotForm.species}
                    onChange={(e) => setAddSpotForm(f => ({ ...f, species: e.target.value }))}
                    placeholder="Bass, Carp, Trout, Pike"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="spot-desc" className="label">Description</label>
                  <textarea
                    id="spot-desc"
                    className="input textarea"
                    rows={3}
                    value={addSpotForm.description}
                    onChange={(e) => setAddSpotForm(f => ({ ...f, description: e.target.value }))}
                    placeholder="Best times, tips, hazards, access info..."
                  />
                </div>

                <div className="form-group">
                  <label className="label">Photos of the Spot</label>
                  <PhotoUpload
                    photos={addSpotPhotos}
                    onPhotosChange={setAddSpotPhotos}
                    maxPhotos={5}
                    maxWidth={800}
                    quality={0.8}
                  />
                </div>
                
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowAddSpot(false)}>Cancel</button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={addSpotLoading || !addSpotForm.name.trim() || !newSpotCoords}
                  >
                    {addSpotLoading ? <span className="spinner-sm" /> : 'Add Spot'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
