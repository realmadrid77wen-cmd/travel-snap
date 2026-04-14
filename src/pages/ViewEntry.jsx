import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getEntryById, deleteEntry } from '../db/db';
import ConfirmDialog from '../components/ConfirmDialog';
import { useTheme } from '../context/ThemeContext';
import { ArrowLeft, Edit, Trash2, MapPin, Calendar, Loader2 } from 'lucide-react';

export default function ViewEntry() {
  const { isDark } = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    loadEntry();
  }, [id]);

  async function loadEntry() {
    try {
      const data = await getEntryById(id);
      if (!data) {
        navigate('/');
        return;
      }
      setEntry(data);
    } catch (err) {
      console.error('Failed to load entry:', err);
      navigate('/');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    try {
      await deleteEntry(id);
      navigate('/');
    } catch (err) {
      console.error('Failed to delete entry:', err);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!entry) return null;

  const formattedDate = new Date(entry.date).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="max-w-lg mx-auto">
      {/* Photo Header */}
      {entry.photo && (
        <div className="w-full h-64 relative">
          <img
            src={entry.photo}
            alt={entry.title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={() => navigate(-1)}
            className={`absolute top-4 left-4 backdrop-blur-sm p-2 rounded-full transition-colors ${isDark ? 'bg-gray-800/80 hover:bg-gray-800' : 'bg-white/80 hover:bg-white'}`}
          >
            <ArrowLeft className={`w-5 h-5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`} />
          </button>
        </div>
      )}

      <div className="px-4 py-4">
        {/* Back button (if no photo) */}
        {!entry.photo && (
          <button
            onClick={() => navigate(-1)}
            className={`p-2 rounded-lg transition-colors mb-3 ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <ArrowLeft className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
          </button>
        )}

        {/* Title */}
        <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{entry.title}</h2>

        {/* Meta Info */}
        <div className={`flex flex-wrap items-center gap-4 text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {formattedDate}
          </span>
          {entry.latitude && entry.longitude && (
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              {entry.latitude.toFixed(5)}, {entry.longitude.toFixed(5)}
            </span>
          )}
        </div>

        {/* Description */}
        {entry.description && (
          <div className={`rounded-xl border p-4 mb-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
            <p className={`whitespace-pre-wrap leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {entry.description}
            </p>
          </div>
        )}

        {/* Mini Map */}
        {entry.latitude && entry.longitude && (
          <div className={`rounded-xl border p-4 mb-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
            <h3 className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Location</h3>
            <a
              href={`https://www.openstreetmap.org/?mlat=${entry.latitude}&mlon=${entry.longitude}#map=15/${entry.latitude}/${entry.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <img
                src={`https://static-maps.yandex.ru/1.x/?lang=en-US&ll=${entry.longitude},${entry.latitude}&z=13&l=map&size=600,300&pt=${entry.longitude},${entry.latitude},pm2rdm`}
                alt="Location map"
                className="w-full h-40 object-cover rounded-lg"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </a>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Link
            to={`/entry/${entry.id}/edit`}
            className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors no-underline shadow-md shadow-blue-600/25"
          >
            <Edit className="w-4 h-4" />
            Edit
          </Link>
          <button
            onClick={() => setShowDeleteDialog(true)}
            className={`flex-1 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors border ${isDark ? 'bg-red-900/30 text-red-400 border-red-800 hover:bg-red-900/50' : 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'}`}
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        title="Delete Entry"
        message={`Are you sure you want to delete "${entry.title}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteDialog(false)}
      />
    </div>
  );
}
