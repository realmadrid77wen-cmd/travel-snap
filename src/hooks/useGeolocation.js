import { useState, useCallback } from 'react';

async function reverseGeocode(lat, lon) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=14&addressdetails=1`,
      { headers: { 'Accept-Language': 'en' }, signal: controller.signal }
    );
    clearTimeout(timeoutId);
    const data = await res.json();
    if (data && data.address) {
      const { city, town, village, county, state, country } = data.address;
      const place = city || town || village || county || '';
      const region = state || '';
      const parts = [place, region, country].filter(Boolean);
      return parts.join(', ');
    }
    return null;
  } catch {
    return null;
  }
}

export function useGeolocation() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        // Set location immediately so UI unblocks
        setLocation({
          latitude: lat,
          longitude: lon,
          placeName: `${lat.toFixed(4)}, ${lon.toFixed(4)}`,
        });
        setLoading(false);
        // Then try to get place name in background
        reverseGeocode(lat, lon).then((name) => {
          if (name) {
            setLocation((prev) => (prev ? { ...prev, placeName: name } : prev));
          }
        });
      },
      (err) => {
        setError(`Failed to get location: ${err.message}`);
        setLoading(false);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 300000,
      }
    );
  }, []);

  const clearLocation = useCallback(() => {
    setLocation(null);
    setError(null);
  }, []);

  return { location, loading, error, getCurrentLocation, clearLocation };
}
