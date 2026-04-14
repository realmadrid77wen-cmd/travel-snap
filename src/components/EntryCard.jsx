import { Link } from 'react-router-dom';
import { MapPin, Calendar, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function EntryCard({ entry }) {
  const { isDark } = useTheme();

  const formattedDate = new Date(entry.date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <Link
      to={`/entry/${entry.id}`}
      className={`block rounded-2xl overflow-hidden transition-all duration-200 no-underline ${
        isDark
          ? 'bg-gray-800 hover:bg-gray-750 shadow-lg shadow-black/20'
          : 'bg-white hover:shadow-lg shadow-sm shadow-gray-200/50'
      }`}
    >
      {entry.photo ? (
        <div className="w-full h-44 overflow-hidden">
          <img
            src={entry.photo}
            alt={entry.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      ) : (
        <div className={`w-full h-28 flex items-center justify-center ${
          isDark ? 'bg-gray-700' : 'bg-gradient-to-br from-blue-50 to-indigo-50'
        }`}>
          <MapPin className={`w-8 h-8 ${isDark ? 'text-gray-500' : 'text-blue-200'}`} />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className={`text-base font-semibold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {entry.title}
          </h3>
          <ChevronRight className={`w-4 h-4 shrink-0 mt-0.5 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
        </div>
        {entry.description && (
          <p className={`text-sm line-clamp-2 mt-1.5 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {entry.description}
          </p>
        )}
        <div className={`flex items-center gap-3 mt-3 pt-3 border-t text-xs ${
          isDark ? 'border-gray-700 text-gray-500' : 'border-gray-100 text-gray-400'
        }`}>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {formattedDate}
          </span>
          {entry.latitude && entry.longitude && (
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {entry.latitude.toFixed(2)}, {entry.longitude.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
