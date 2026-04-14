import { useState, useEffect } from 'react';
import { getAllEntries } from '../db/db';
import MapView from '../components/MapView';
import { useTheme } from '../context/ThemeContext';
import { Loader2, MapPin } from 'lucide-react';

export default function MapPage() {
  const { isDark } = useTheme();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getAllEntries();
        setEntries(data);
      } catch (err) {
        console.error('Failed to load entries:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  const entriesWithLocation = entries.filter((e) => e.latitude && e.longitude);

  if (entriesWithLocation.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
        <MapPin className={`w-16 h-16 mb-4 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
        <h2 className={`text-xl font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>No Locations Yet</h2>
        <p className={`max-w-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          Create entries with location data to see them on the map.
        </p>
      </div>
    );
  }

  return (
    <div className="h-[calc(100dvh-8rem)]">
      <MapView entries={entries} />
    </div>
  );
}
