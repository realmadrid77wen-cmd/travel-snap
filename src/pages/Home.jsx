import { useState, useEffect } from 'react';
import { getAllEntries } from '../db/db';
import EntryCard from '../components/EntryCard';
import EmptyState from '../components/EmptyState';
import { useTheme } from '../context/ThemeContext';
import { Loader2, Search } from 'lucide-react';

export default function Home() {
  const { isDark } = useTheme();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadEntries();
  }, []);

  async function loadEntries() {
    try {
      const data = await getAllEntries();
      setEntries(data);
    } catch (err) {
      console.error('Failed to load entries:', err);
    } finally {
      setLoading(false);
    }
  }

  const filteredEntries = entries.filter(
    (entry) =>
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (entries.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="px-5 py-6">
      {/* Search Bar */}
      <div className="relative mb-5">
        <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
        <input
          type="text"
          placeholder="Search entries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full pl-11 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm ${
            isDark ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-white text-gray-900 placeholder-gray-400'
          }`}
        />
      </div>

      {/* Entry Count */}
      <p className={`text-xs font-medium uppercase tracking-wider mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
        {filteredEntries.length} {filteredEntries.length === 1 ? 'entry' : 'entries'}
      </p>

      {/* Entry Grid */}
      <div className="grid gap-5 sm:grid-cols-2">
        {filteredEntries.map((entry) => (
          <EntryCard key={entry.id} entry={entry} />
        ))}
      </div>

      {filteredEntries.length === 0 && searchTerm && (
        <p className={`text-center py-16 text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          No entries match "{searchTerm}"
        </p>
      )}
    </div>
  );
}
