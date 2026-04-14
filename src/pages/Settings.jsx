import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, Info, Smartphone } from 'lucide-react';

export default function Settings() {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <div className="px-4 py-6 max-w-lg mx-auto">
      <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Settings
      </h2>

      {/* Theme Toggle */}
      <div className={`rounded-xl border p-4 mb-4 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isDark ? (
              <Moon className="w-5 h-5 text-blue-400" />
            ) : (
              <Sun className="w-5 h-5 text-yellow-500" />
            )}
            <div>
              <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Dark Mode
              </p>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {isDark ? 'Dark theme is active' : 'Light theme is active'}
              </p>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className={`relative w-12 h-7 rounded-full transition-colors ${
              isDark ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                isDark ? 'translate-x-5' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>
      </div>

      {/* About Section */}
      <div className={`rounded-xl border p-4 mb-4 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
        <div className="flex items-center gap-3 mb-3">
          <Info className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
          <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>About</p>
        </div>
        <div className={`space-y-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          <p>TravelSnap is a Progressive Web App for capturing and documenting your travel experiences with photos and GPS locations.</p>
          <p>Version 1.0.0</p>
        </div>
      </div>

      {/* Features Section */}
      <div className={`rounded-xl border p-4 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
        <div className="flex items-center gap-3 mb-3">
          <Smartphone className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
          <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Features</p>
        </div>
        <ul className={`space-y-1.5 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          <li>• Camera & Photo Upload</li>
          <li>• GPS Location Tracking</li>
          <li>• Interactive Map View</li>
          <li>• Offline Storage (IndexedDB)</li>
          <li>• PWA - Install on Device</li>
          <li>• Dark / Light Theme</li>
        </ul>
      </div>
    </div>
  );
}
