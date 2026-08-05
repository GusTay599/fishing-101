// Add/Edit Catch Page
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateCatch, useUpdateCatch, useCatch, useCatchStats } from '../hooks/useApi';
import { useSearchLocations, useReverseGeocode } from '../hooks/useApi';
import { useTides } from '../hooks/useApi';
import { useWeather } from '../hooks/useApi';
import { useGeolocation } from '../hooks/useApi';
import { CreateCatchInput, Catch } from '../shared/types';
import { FISH_SPECIES, BAIT_TYPES, LURE_TYPES, TECHNIQUES, WATER_TYPES, TIDE_STAGES, WEATHER_CONDITIONS } from '../shared/types';
import { MapPicker } from '../components/MapPicker';
import { PhotoUpload } from '../components/PhotoUpload';

const DEFAULT_FORM: CreateCatchInput = {
  species: '',
  weight_lbs: undefined,
  weight_oz: undefined,
  length_inches: undefined,
  girth_inches: undefined,
  latitude: 0,
  longitude: 0,
  location_name: '',
  water_type: 'freshwater',
  bait: '',
  lure: '',
  technique: '',
  depth_ft: undefined,
  water_temp_f: undefined,
  air_temp_f: undefined,
  weather_condition: '',
  wind_speed_mph: undefined,
  wind_direction: undefined,
  moon_phase: '',
  moon_illumination: undefined,
  tide_stage: 'rising',
  tide_height_ft: undefined,
  notes: '',
  photos: [],
  caught_at: new Date().toISOString().slice(0, 16),
};

export function AddCatchPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  
  const { data: existingCatch, loading: catchLoading } = useCatch(id);
  const { createCatch, loading: createLoading, error: createError } = useCreateCatch();
  const { updateCatch, loading: updateLoading, error: updateError } = useUpdateCatch();
  
  const { position: geoPosition } = useGeolocation();
  const { data: locationResults, loading: locationLoading } = useSearchLocations('');
  const { data: reverseGeocode } = useReverseGeocode(0, 0);
  
  const [form, setForm] = useState<CreateCatchInput>(DEFAULT_FORM);
  const [locationQuery, setLocationQuery] = useState('');
  const [showLocationResults, setShowLocationResults] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number; name: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Load existing catch if editing
  useEffect(() => {
    if (isEditing && existingCatch) {
      setForm({
        species: existingCatch.species,
        weight_lbs: existingCatch.weight_lbs,
        weight_oz: existingCatch.weight_oz,
        length_inches: existingCatch.length_inches,
        girth_inches: existingCatch.girth_inches,
        latitude: existingCatch.latitude,
        longitude: existingCatch.longitude,
        location_name: existingCatch.location_name || '',
        water_type: existingCatch.water_type,
        bait: existingCatch.bait || '',
        lure: existingCatch.lure || '',
        technique: existingCatch.technique || '',
        depth_ft: existingCatch.depth_ft,
        water_temp_f: existingCatch.water_temp_f,
        air_temp_f: existingCatch.air_temp_f,
        weather_condition: existingCatch.weather_condition || '',
        wind_speed_mph: existingCatch.wind_speed_mph,
        wind_direction: existingCatch.wind_direction,
        moon_phase: existingCatch.moon_phase || '',
        moon_illumination: existingCatch.moon_illumination,
        tide_stage: existingCatch.tide_stage || 'rising',
        tide_height_ft: existingCatch.tide_height_ft,
        notes: existingCatch.notes || '',
        photos: existingCatch.photos || [],
        caught_at: existingCatch.caught_at.slice(0, 16),
      });
      setSelectedLocation({
        lat: existingCatch.latitude,
        lng: existingCatch.longitude,
        name: existingCatch.location_name || '',
      });
    } else if (!isEditing && geoPosition) {
      setForm(prev => ({ ...prev, latitude: geoPosition.latitude, longitude: geoPosition.longitude }));
    }
  }, [isEditing, existingCatch, geoPosition]);

  // Auto-fetch tide/weather when location changes
  const { data: tideData } = useTides(form.latitude, form.longitude, form.caught_at.split('T')[0], 1);
  const { data: weatherData } = useWeather(form.latitude, form.longitude);

  // Auto-fill conditions from weather
  useEffect(() => {
    if (weatherData?.current && !form.weather_condition) {
      setForm(prev => ({
        ...prev,
        weather_condition: weatherData.current.condition,
        air_temp_f: Math.round(weatherData.current.temperature),
        wind_speed_mph: Math.round(weatherData.current.wind_speed),
        wind_direction: weatherData.current.wind_direction,
      }));
    }
  }, [weatherData]);

  // Auto-fill tide
  useEffect(() => {
    if (tideData?.predictions[0] && !form.tide_stage) {
      const now = new Date(form.caught_at);
      const highTides = tideData.predictions[0].high_tides;
      const lowTides = tideData.predictions[0].low_tides;
      const allTides = [...highTides, ...lowTides].sort((a, b) => new Date(a.t).getTime() - new Date(b.t).getTime());
      
      let closest = allTides[0];
      let minDiff = Math.abs(new Date(allTides[0].t).getTime() - now.getTime());
      for (const t of allTides) {
        const diff = Math.abs(new Date(t.t).getTime() - now.getTime());
        if (diff < minDiff) {
          minDiff = diff;
          closest = t;
        }
      }
      
      setForm(prev => ({
        ...prev,
        tide_stage: closest.type === 'H' ? 'high' : 'low',
        tide_height_ft: closest.v,
      }));
    }
  }, [tideData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    const submitData: CreateCatchInput = {
      ...form,
      weight_lbs: form.weight_lbs || undefined,
      weight_oz: form.weight_oz || undefined,
      length_inches: form.length_inches || undefined,
      girth_inches: form.girth_inches || undefined,
      depth_ft: form.depth_ft || undefined,
      water_temp_f: form.water_temp_f || undefined,
      air_temp_f: form.air_temp_f || undefined,
      wind_speed_mph: form.wind_speed_mph || undefined,
      wind_direction: form.wind_direction || undefined,
      moon_illumination: form.moon_illumination || undefined,
      tide_height_ft: form.tide_height_ft || undefined,
      latitude: form.latitude,
      longitude: form.longitude,
      caught_at: new Date(form.caught_at).toISOString(),
    };
    
    let result: Catch | null = null;
    if (isEditing && id) {
      result = await updateCatch(id, submitData);
    } else {
      result = await createCatch(submitData);
    }
    
    setSubmitting(false);
    
    if (result) {
      navigate('/catches');
    }
  };

  const handleLocationSelect = (loc: { latitude: number; longitude: number; display_name: string }) => {
    setForm(prev => ({ ...prev, latitude: loc.latitude, longitude: loc.longitude }));
    setSelectedLocation({ lat: loc.latitude, lng: loc.longitude, name: loc.display_name });
    setLocationQuery(loc.display_name);
    setShowLocationResults(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="page-header">
        <h1 className="page-title">{isEditing ? 'Edit Catch' : 'Log New Catch'}</h1>
        <p className="page-subtitle">{isEditing ? 'Update your catch record' : 'Record the details of your catch'}</p>
      </div>

      <form onSubmit={handleSubmit} className="card" noValidate>
        <div className="card-body">
          {/* Species & Basics */}
          <fieldset>
            <legend className="text-lg font-semibold text-text mb-4">Basic Info</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label htmlFor="species" className="label">Species <span className="text-danger">*</span></label>
                <input
                  id="species"
                  type="text"
                  className="input"
                  list="species-list"
                  value={form.species}
                  onChange={(e) => setForm({ ...form, species: e.target.value })}
                  required
                  autoComplete="off"
                  placeholder="Start typing..."
                />
                <datalist id="species-list">
                  {FISH_SPECIES.map(s => <option key={s} value={s} />)}
                </datalist>
              </div>
              
              <div className="form-group">
                <label htmlFor="water_type" className="label">Water Type</label>
                <select
                  id="water_type"
                  className="input select"
                  value={form.water_type}
                  onChange={(e) => setForm({ ...form, water_type: e.target.value as CreateCatchInput['water_type'] })}
                >
                  {WATER_TYPES.map(w => <option key={w.value} value={w.value}>{w.label}</option>)}
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="form-group">
                <label htmlFor="caught_at" className="label">Date & Time <span className="text-danger">*</span></label>
                <input
                  id="caught_at"
                  type="datetime-local"
                  className="input"
                  value={form.caught_at}
                  onChange={(e) => setForm({ ...form, caught_at: e.target.value })}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="weight_lbs" className="label">Weight (lbs)</label>
                <input
                  id="weight_lbs"
                  type="number"
                  className="input"
                  min="0"
                  step="0.5"
                  value={form.weight_lbs || ''}
                  onChange={(e) => setForm({ ...form, weight_lbs: e.target.value ? parseFloat(e.target.value) : undefined })}
                  placeholder="0"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="weight_oz" className="label">Weight (oz)</label>
                <input
                  id="weight_oz"
                  type="number"
                  className="input"
                  min="0"
                  max="15"
                  step="0.5"
                  value={form.weight_oz || ''}
                  onChange={(e) => setForm({ ...form, weight_oz: e.target.value ? parseFloat(e.target.value) : undefined })}
                  placeholder="0"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="form-group">
                <label htmlFor="length_inches" className="label">Length (inches)</label>
                <input
                  id="length_inches"
                  type="number"
                  className="input"
                  min="0"
                  step="0.25"
                  value={form.length_inches || ''}
                  onChange={(e) => setForm({ ...form, length_inches: e.target.value ? parseFloat(e.target.value) : undefined })}
                  placeholder="0"
                />
              </div>
              <div className="form-group">
                <label htmlFor="girth_inches" className="label">Girth (inches)</label>
                <input
                  id="girth_inches"
                  type="number"
                  className="input"
                  min="0"
                  step="0.25"
                  value={form.girth_inches || ''}
                  onChange={(e) => setForm({ ...form, girth_inches: e.target.value ? parseFloat(e.target.value) : undefined })}
                  placeholder="0"
                />
              </div>
            </div>
          </fieldset>

          {/* Location */}
          <fieldset className="mt-6 pt-6 border-t">
            <legend className="text-lg font-semibold text-text mb-4">Location <span className="text-danger">*</span></legend>

            {/* Search bar above map */}
            <div className="form-group">
              <label htmlFor="location" className="label">Search Location</label>
              <div className="relative">
                <input
                  id="location"
                  type="text"
                  className="input"
                  value={locationQuery || selectedLocation?.name || ''}
                  onChange={(e) => {
                    setLocationQuery(e.target.value);
                    setShowLocationResults(e.target.value.length >= 2);
                  }}
                  onFocus={() => setShowLocationResults(locationQuery.length >= 2)}
                  onBlur={() => setTimeout(() => setShowLocationResults(false), 200)}
                  placeholder="Search for a place, or click directly on the map below"
                  aria-autocomplete="list"
                  aria-controls="location-results"
                />
                {showLocationResults && locationResults.length > 0 && (
                  <ul id="location-results" className="absolute z-50 w-full mt-1 bg-bg-card border rounded-lg shadow-lg max-h-60 overflow-auto" role="listbox">
                    {locationResults.map((loc, i) => (
                      <li key={i} role="option">
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
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    if (geoPosition) {
                      setForm(prev => ({ ...prev, latitude: geoPosition.latitude, longitude: geoPosition.longitude }));
                      setSelectedLocation({ lat: geoPosition.latitude, lng: geoPosition.longitude, name: `Lat: ${geoPosition.latitude.toFixed(4)}, Lng: ${geoPosition.longitude.toFixed(4)}` });
                      setLocationQuery(`Lat: ${geoPosition.latitude.toFixed(4)}, Lng: ${geoPosition.longitude.toFixed(4)}`);
                    }
                  }}
                >
                  Use My Location
                </button>
                {form.latitude !== 0 && form.longitude !== 0 && (
                  <span className="flex items-center text-sm text-success">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="mr-1">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {selectedLocation?.name || `Lat: ${form.latitude.toFixed(4)}, Lng: ${form.longitude.toFixed(4)}`}
                  </span>
                )}
              </div>
            </div>

            {/* Interactive Map */}
            <div className="form-group mt-4">
              <MapPicker
                latitude={form.latitude}
                longitude={form.longitude}
                onLocationSelect={(lat, lng) => {
                  setForm(prev => ({ ...prev, latitude: lat, longitude: lng }));
                  setSelectedLocation({ lat, lng, name: '' });
                }}
                height="400px"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="form-group">
                <label htmlFor="location_name" className="label">Location Name</label>
                <input
                  id="location_name"
                  type="text"
                  className="input"
                  value={form.location_name}
                  onChange={(e) => setForm({ ...form, location_name: e.target.value })}
                  placeholder="e.g., Brixham Harbour, Lake Windermere, Brighton Pier"
                />
              </div>
              <div className="form-group">
                <label htmlFor="depth_ft" className="label">Depth (ft)</label>
                <input
                  id="depth_ft"
                  type="number"
                  className="input"
                  min="0"
                  value={form.depth_ft || ''}
                  onChange={(e) => setForm({ ...form, depth_ft: e.target.value ? parseInt(e.target.value) : undefined })}
                  placeholder="0"
                />
              </div>
            </div>

            {/* Hidden lat/lng inputs for form submission */}
            <input type="hidden" name="latitude" value={form.latitude} />
            <input type="hidden" name="longitude" value={form.longitude} />
          </fieldset>

          {/* Bait, Lure, Technique */}
          <fieldset className="mt-6 pt-6 border-t">
            <legend className="text-lg font-semibold text-text mb-4">Presentation</legend>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-group">
                <label htmlFor="bait" className="label">Bait</label>
                <input
                  id="bait"
                  type="text"
                  className="input"
                  list="bait-list"
                  value={form.bait}
                  onChange={(e) => setForm({ ...form, bait: e.target.value })}
                  placeholder="Live shrimp, cut bait, etc."
                  autoComplete="off"
                />
                <datalist id="bait-list">
                  {BAIT_TYPES.map(b => <option key={b} value={b} />)}
                </datalist>
              </div>
              
              <div className="form-group">
                <label htmlFor="lure" className="label">Lure</label>
                <input
                  id="lure"
                  type="text"
                  className="input"
                  list="lure-list"
                  value={form.lure}
                  onChange={(e) => setForm({ ...form, lure: e.target.value })}
                  placeholder="Soft plastic, crankbait, etc."
                  autoComplete="off"
                />
                <datalist id="lure-list">
                  {LURE_TYPES.map(l => <option key={l} value={l} />)}
                </datalist>
              </div>
              
              <div className="form-group">
                <label htmlFor="technique" className="label">Technique</label>
                <input
                  id="technique"
                  type="text"
                  className="input"
                  list="technique-list"
                  value={form.technique}
                  onChange={(e) => setForm({ ...form, technique: e.target.value })}
                  placeholder="Casting, trolling, jigging, etc."
                  autoComplete="off"
                />
                <datalist id="technique-list">
                  {TECHNIQUES.map(t => <option key={t} value={t} />)}
                </datalist>
              </div>
            </div>
          </fieldset>

          {/* Conditions */}
          <fieldset className="mt-6 pt-6 border-t">
            <legend className="text-lg font-semibold text-text mb-4">Conditions <span className="text-text-secondary font-normal">(auto-filled from weather)</span></legend>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="form-group">
                <label htmlFor="weather_condition" className="label">Weather</label>
                <input
                  id="weather_condition"
                  type="text"
                  className="input"
                  list="weather-list"
                  value={form.weather_condition}
                  onChange={(e) => setForm({ ...form, weather_condition: e.target.value })}
                  autoComplete="off"
                />
                <datalist id="weather-list">
                  {WEATHER_CONDITIONS.map(w => <option key={w} value={w} />)}
                </datalist>
              </div>
              
              <div className="form-group">
                <label htmlFor="air_temp_f" className="label">Air Temp (°C)</label>
                <input
                  id="air_temp_f"
                  type="number"
                  className="input"
                  value={form.air_temp_f || ''}
                  onChange={(e) => setForm({ ...form, air_temp_f: e.target.value ? parseInt(e.target.value) : undefined })}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="water_temp_f" className="label">Water Temp (°C)</label>
                <input
                  id="water_temp_f"
                  type="number"
                  className="input"
                  value={form.water_temp_f || ''}
                  onChange={(e) => setForm({ ...form, water_temp_f: e.target.value ? parseInt(e.target.value) : undefined })}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="wind_speed_mph" className="label">Wind (mph)</label>
                <input
                  id="wind_speed_mph"
                  type="number"
                  className="input"
                  min="0"
                  value={form.wind_speed_mph || ''}
                  onChange={(e) => setForm({ ...form, wind_speed_mph: e.target.value ? parseInt(e.target.value) : undefined })}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="form-group">
                <label htmlFor="wind_direction" className="label">Wind Direction (°)</label>
                <input
                  id="wind_direction"
                  type="number"
                  className="input"
                  min="0"
                  max="360"
                  value={form.wind_direction || ''}
                  onChange={(e) => setForm({ ...form, wind_direction: e.target.value ? parseInt(e.target.value) : undefined })}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="tide_stage" className="label">Tide Stage</label>
                <select
                  id="tide_stage"
                  className="input select"
                  value={form.tide_stage}
                  onChange={(e) => setForm({ ...form, tide_stage: e.target.value as CreateCatchInput['tide_stage'] })}
                >
                  {TIDE_STAGES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="tide_height_ft" className="label">Tide Height (ft)</label>
                <input
                  id="tide_height_ft"
                  type="number"
                  className="input"
                  step="0.1"
                  value={form.tide_height_ft || ''}
                  onChange={(e) => setForm({ ...form, tide_height_ft: e.target.value ? parseFloat(e.target.value) : undefined })}
                />
              </div>
            </div>
            
            <div className="form-group mt-4">
              <label htmlFor="moon_phase" className="label">Moon Phase</label>
              <input
                id="moon_phase"
                type="text"
                className="input"
                value={form.moon_phase}
                onChange={(e) => setForm({ ...form, moon_phase: e.target.value })}
                placeholder="e.g., Full Moon, Waxing Gibbous"
              />
            </div>
          </fieldset>

          {/* Notes */}
          <fieldset className="mt-6 pt-6 border-t">
            <legend className="text-lg font-semibold text-text mb-4">Notes</legend>
            <div className="form-group">
              <textarea
                id="notes"
                className="input textarea"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="Anything else worth remembering... weather changes, bite times, what worked/didn't, etc."
                rows={4}
              />
            </div>
          </fieldset>

          {/* Photos */}
          <fieldset className="mt-6 pt-6 border-t">
            <legend className="text-lg font-semibold text-text mb-4">Photos</legend>
            <PhotoUpload
              photos={form.photos || []}
              onPhotosChange={(photos) => setForm({ ...form, photos })}
              maxPhotos={5}
            />
          </fieldset>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-end mt-8 pt-6 border-t">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting || createLoading || updateLoading}
            >
              {submitting ? (
                <>
                  <span className="spinner-sm" />
                  Saving...
                </>
              ) : isEditing ? (
                'Update Catch'
              ) : (
                'Save Catch'
              )}
            </button>
          </div>
        </div>
      </form>

      {(createError || updateError) && (
        <div className="alert alert-danger mt-4" role="alert">
          <svg className="alert-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <div className="alert-content">
            <p className="alert-message">{createError || updateError}</p>
          </div>
        </div>
      )}
    </div>
  );
}