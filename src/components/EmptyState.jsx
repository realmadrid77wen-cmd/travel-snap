import { Link } from 'react-router-dom';
import { Compass, Plus } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function EmptyState() {
  const { isDark } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <Compass className={`w-16 h-16 mb-4 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
      <h2 className={`text-xl font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
        No Entries Yet
      </h2>
      <p className={`mb-6 max-w-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
        Start documenting your travel adventures! Capture moments with photos and locations.
      </p>
      <Link
        to="/entry/new"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-medium hover:bg-blue-700 transition-colors no-underline"
      >
        <Plus className="w-5 h-5" />
        Create First Entry
      </Link>
    </div>
  );
}
