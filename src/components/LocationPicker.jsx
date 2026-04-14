import { MapPin, Loader2, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function LocationPicker({ location, loading, error, onGetLocation, onClear }) {
  const { isDark } = useTheme();

  return (
    <div className="space-y-2">
      {error && <p className="text-sm text-red-500">{error}</p>}

      {location ? (
        <div className={`flex items-center justify-between rounded-lg px-4 py-3 ${
          isDark ? 'bg-green-900/30 border border-green-800' : 'bg-green-50 border border-green-200'
        }`}>
          <div className="flex items-center gap-2 min-w-0">
            <MapPin className="w-5 h-5 text-green-600 shrink-0" />
            <div className="min-w-0">
              <span className={`text-sm block truncate ${isDark ? 'text-green-400' : 'text-green-800'}`}>
                {location.placeName || `${location.latitude.toFixed(5)}, ${location.longitude.toFixed(5)}`}
              </span>
              {location.placeName && (
                <span className={`text-xs block ${isDark ? 'text-green-600' : 'text-green-600/60'}`}>
                  {location.latitude.toFixed(5)}, {location.longitude.toFixed(5)}
                </span>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={onClear}
            className="text-green-600 hover:text-green-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={onGetLocation}
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl transition-colors font-medium disabled:opacity-50 ${
            isDark ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Getting Location...
            </>
          ) : (
            <>
              <MapPin className="w-5 h-5" />
              Get Current Location
            </>
          )}
        </button>
      )}
    </div>
  );
}
