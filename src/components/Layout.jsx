import { NavLink, Outlet } from 'react-router-dom';
import { MapPin, Plus, Map, Compass, Settings } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Layout() {
  const { isDark } = useTheme();

  const linkClass = ({ isActive }) =>
    `flex flex-col items-center gap-1 py-1 text-[11px] font-medium transition-colors ${
      isActive
        ? 'text-blue-600'
        : isDark
        ? 'text-gray-400 hover:text-gray-200'
        : 'text-gray-400 hover:text-gray-700'
    }`;

  return (
    <div className={`flex flex-col min-h-[100dvh] ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`px-5 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm ${
        isDark ? 'bg-gray-800/95 backdrop-blur-md' : 'bg-white/95 backdrop-blur-md'
      }`}>
        <NavLink to="/" className="flex items-center gap-2.5 no-underline">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <h1 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>TravelSnap</h1>
        </NavLink>
        <NavLink
          to="/entry/new"
          className="bg-blue-600 text-white px-4 py-2.5 rounded-xl flex items-center gap-1.5 text-sm font-semibold hover:bg-blue-700 transition-colors no-underline shadow-md shadow-blue-600/25"
        >
          <Plus className="w-4 h-4" />
          New Entry
        </NavLink>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-24">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className={`fixed bottom-0 left-0 right-0 px-8 py-3 flex justify-around z-50 shadow-[0_-1px_12px_rgba(0,0,0,0.06)] ${
        isDark ? 'bg-gray-800/95 backdrop-blur-md' : 'bg-white/95 backdrop-blur-md'
      }`}>
        <NavLink to="/" className={linkClass} end>
          <MapPin className="w-5 h-5" />
          <span>Journal</span>
        </NavLink>
        <NavLink to="/map" className={linkClass}>
          <Map className="w-5 h-5" />
          <span>Map</span>
        </NavLink>
        <NavLink to="/settings" className={linkClass}>
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </NavLink>
      </nav>
    </div>
  );
}
