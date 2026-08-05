// Interactive Leaflet map picker for selecting fishing locations
import { useEffect, useRef, useCallback } from 'react';
import L from 'leaflet';

// Fix default marker icon paths for bundled builds
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

interface MapPickerProps {
  latitude: number;
  longitude: number;
  onLocationSelect: (lat: number, lng: number) => void;
  height?: string;
}

// UK center coordinates
const UK_CENTER: L.LatLngTuple = [54.0, -2.0];
const UK_ZOOM = 6;
const MARKER_ZOOM = 12;

export function MapPicker({
  latitude,
  longitude,
  onLocationSelect,
  height = '400px',
}: MapPickerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, {
      center: (latitude && longitude) ? [latitude, longitude] : UK_CENTER,
      zoom: (latitude && longitude) ? MARKER_ZOOM : UK_ZOOM,
      scrollWheelZoom: true,
    });

    // OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    // Place initial marker if coords provided
    if (latitude && longitude) {
      markerRef.current = L.marker([latitude, longitude], { draggable: true })
        .addTo(map)
        .bindPopup(`Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}`)
        .openPopup();

      // Allow dragging marker to reposition
      markerRef.current.on('dragend', () => {
        const pos = markerRef.current?.getLatLng();
        if (pos) {
          onLocationSelect(pos.lat, pos.lng);
          markerRef.current?.setPopupContent(
            `Lat: ${pos.lat.toFixed(6)}, Lng: ${pos.lng.toFixed(6)}`
          );
        }
      });
    }

    // Click to place / move marker
    map.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;

      if (markerRef.current) {
        // Move existing marker
        markerRef.current.setLatLng([lat, lng]);
        markerRef.current.setPopupContent(
          `Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}`
        );
        markerRef.current.openPopup();
      } else {
        // Create new marker
        markerRef.current = L.marker([lat, lng], { draggable: true })
          .addTo(map)
          .bindPopup(`Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}`)
          .openPopup();

        markerRef.current.on('dragend', () => {
          const pos = markerRef.current?.getLatLng();
          if (pos) {
            onLocationSelect(pos.lat, pos.lng);
            markerRef.current?.setPopupContent(
              `Lat: ${pos.lat.toFixed(6)}, Lng: ${pos.lng.toFixed(6)}`
            );
          }
        });
      }

      onLocationSelect(lat, lng);
      map.setView([lat, lng], MARKER_ZOOM);
    });

    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
      markerRef.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Update marker when lat/lng change externally
  useEffect(() => {
    const map = mapInstance.current;
    if (!map || !latitude || !longitude) return;

    if (markerRef.current) {
      markerRef.current.setLatLng([latitude, longitude]);
      markerRef.current.setPopupContent(
        `Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}`
      );
    }
  }, [latitude, longitude]);

  return (
    <div>
      <div
        ref={mapRef}
        style={{ height, width: '100%', borderRadius: '8px', border: '1px solid var(--color-border)' }}
      />
      <p className="text-xs text-text-muted mt-2">
        Click anywhere on the map to place a marker. Drag the marker to fine-tune your position.
      </p>
    </div>
  );
}
