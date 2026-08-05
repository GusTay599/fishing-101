// Interactive Leaflet map for viewing and adding fishing spots
import { useEffect, useRef, useCallback, useMemo } from 'react';
import L from 'leaflet';
import { FishingSpot } from '../shared/types';

// Fix default marker icon paths
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

// Custom marker icons by water type
function createSpotIcon(waterType: string): L.DivIcon {
  const colors: Record<string, string> = {
    freshwater: '#3b82f6',  // blue
    saltwater: '#0ea5e9',   // sky
    brackish: '#8b5cf6',    // purple
  };
  const color = colors[waterType] || '#0d9488';

  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      width: 28px; height: 28px;
      background: ${color};
      border: 3px solid white;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    "><div style="
      width: 100%; height: 100%;
      display: flex; align-items: center; justify-content: center;
      transform: rotate(45deg);
      color: white; font-size: 14px;
    ">🐟</div></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -30],
  });
}

interface FishingSpotsMapProps {
  spots: FishingSpot[];
  onSpotClick?: (spot: FishingSpot) => void;
  onMapClick?: (lat: number, lng: number) => void;
  center?: L.LatLngTuple;
  zoom?: number;
  height?: string;
  className?: string;
}

const UK_CENTER: L.LatLngTuple = [54.0, -2.0];

export function FishingSpotsMap({
  spots,
  onSpotClick,
  onMapClick,
  center = UK_CENTER,
  zoom = 6,
  height = '500px',
  className = '',
}: FishingSpotsMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const initialFitDone = useRef(false);
  const spotsJsonRef = useRef('');

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, {
      center,
      zoom,
      scrollWheelZoom: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    // Click handler for adding new spots
    if (onMapClick) {
      map.on('click', (e: L.LeafletMouseEvent) => {
        onMapClick(e.latlng.lat, e.latlng.lng);
      });
    }

    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
      markersRef.current = [];
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Update markers only when spots data actually changes (not on callback changes)
  useEffect(() => {
    const map = mapInstance.current;
    if (!map) return;

    // Only recreate markers if spots data changed
    const newJson = JSON.stringify(spots.map(s => s.id));
    if (newJson === spotsJsonRef.current) return;
    spotsJsonRef.current = newJson;

    // Clear old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    // Add spot markers
    spots.forEach((spot) => {
      const icon = createSpotIcon(spot.water_type);
      const marker = L.marker([spot.latitude, spot.longitude], { icon })
        .addTo(map);

      // Popup content
      const speciesList = spot.species?.slice(0, 5).join(', ') || 'Various';
      const hasPhotos = spot.image_urls && spot.image_urls.length > 0;
      const popupHtml = `
        <div style="min-width: 180px;">
          ${hasPhotos ? `<img src="${spot.image_urls![0]}" alt="${spot.name}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 6px; margin-bottom: 8px; background: #e5e7eb;" onerror="this.style.display='none';this.nextElementSibling.style.display='block'" /><div style="display:none;text-align:center;padding:20px 0;color:#9ca3af;font-size:11px;">Loading image...</div>` : ''}
          <strong style="font-size: 14px;">${spot.name}</strong>
          <div style="margin-top: 4px;">
            <span style="
              display: inline-block; padding: 1px 8px; border-radius: 12px; font-size: 11px; text-transform: capitalize;
              background: ${spot.water_type === 'freshwater' ? '#dbeafe' : spot.water_type === 'saltwater' ? '#e0f2fe' : '#ede9fe'};
              color: ${spot.water_type === 'freshwater' ? '#1d4ed8' : spot.water_type === 'saltwater' ? '#0369a1' : '#6d28d9'};
            ">${spot.water_type}</span>
            <span style="
              display: inline-block; padding: 1px 8px; border-radius: 12px; font-size: 11px; text-transform: capitalize; margin-left: 4px;
              background: #f3f4f6; color: #374151;
            ">${spot.access_type}</span>
          </div>
          ${spot.description ? `<p style="margin-top: 6px; font-size: 12px; color: #6b7280; line-height: 1.4;">${spot.description}</p>` : ''}
          <p style="margin-top: 4px; font-size: 11px; color: #9ca3af;">${speciesList}</p>
        </div>
      `;

      marker.bindPopup(popupHtml, { maxWidth: 280 });

      markersRef.current.push(marker);
    });

    // Fit bounds only on initial load
    if (spots.length > 0 && !initialFitDone.current) {
      initialFitDone.current = true;
      const bounds = L.latLngBounds(spots.map((s) => [s.latitude, s.longitude]));
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 12 });
    }
  }, [spots]);

  // Fly to a specific location (used when searching)
  const flyTo = useCallback((lat: number, lng: number, zoomLevel = 12) => {
    mapInstance.current?.flyTo([lat, lng], zoomLevel, { duration: 1.5 });
  }, []);

  // Expose flyTo via ref callback on the container
  return (
    <div className={className}>
      <div
        ref={(el) => {
          mapRef.current = el;
          if (el) (el as any).__flyTo = flyTo;
        }}
        style={{ height, width: '100%', borderRadius: '8px', border: '1px solid var(--color-border)' }}
      />
    </div>
  );
}
