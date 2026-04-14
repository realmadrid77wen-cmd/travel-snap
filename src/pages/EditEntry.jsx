import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEntryById, updateEntry } from '../db/db';
import { useGeolocation } from '../hooks/useGeolocation';
import { useCamera } from '../hooks/useCamera';
import CameraCapture from '../components/CameraCapture';
import LocationPicker from '../components/LocationPicker';
import { useTheme } from '../context/ThemeContext';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';

export default function EditEntry() {
  const { isDark } = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const {
    location,
    loading: locationLoading,
    error: locationError,
    getCurrentLocation,
    clearLocation,
  } = useGeolocation();

  const {
    photo,
    setPhoto,
    isCameraOpen,
    error: cameraError,
    videoRef,
    canvasRef,
    openCamera,
    capturePhoto,
    closeCamera,
    clearPhoto,
  } = useCamera();

  useEffect(() => {
    loadEntry();
  }, [id]);

  async function loadEntry() {
    try {
      const entry = await getEntryById(id);
      if (!entry) {
        navigate('/');
        return;
      }
      setTitle(entry.title);
      setDescription(entry.description || '');
      setDate(entry.date);
      if (entry.photo) setPhoto(entry.photo);
      if (entry.latitude && entry.longitude) {
        // We need to manually set the location since useGeolocation doesn't have a setter
        // We'll handle this through the location state
      }
    } catch (err) {
      console.error('Failed to load entry:', err);
      navigate('/');
    } finally {
      setLoading(false);
    }
  }

  // Store the original location separately
  const [originalLocation, setOriginalLocation] = useState(null);

  useEffect(() => {
    async function fetchOriginalLocation() {
      const entry = await getEntryById(id);
      if (entry?.latitude && entry?.longitude) {
        setOriginalLocation({ latitude: entry.latitude, longitude: entry.longitude });
      }
    }
    fetchOriginalLocation();
  }, [id]);

  const effectiveLocation = location || originalLocation;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;

    setSaving(true);
    try {
      await updateEntry(id, {
        title: title.trim(),
        description: description.trim(),
        date,
        latitude: effectiveLocation?.latitude || null,
        longitude: effectiveLocation?.longitude || null,
        photo: photo || null,
      });
      navigate(`/entry/${id}`);
    } catch (err) {
      console.error('Failed to update entry:', err);
      alert('Failed to update entry. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="px-5 py-6 max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
        >
          <ArrowLeft className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
        </button>
        <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Edit Entry</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'
            }`}
          />
        </div>

        {/* Date */}
        <div>
          <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'
            }`}
          />
        </div>

        {/* Description */}
        <div>
          <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
              isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'
            }`}
          />
        </div>

        {/* Photo */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Photo
          </label>
          <CameraCapture
            photo={photo}
            isCameraOpen={isCameraOpen}
            error={cameraError}
            videoRef={videoRef}
            canvasRef={canvasRef}
            openCamera={openCamera}
            capturePhoto={capturePhoto}
            closeCamera={closeCamera}
            clearPhoto={clearPhoto}
            onFileUpload={(dataUrl) => setPhoto(dataUrl)}
          />
        </div>

        {/* Location */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Location
          </label>
          <LocationPicker
            location={effectiveLocation}
            loading={locationLoading}
            error={locationError}
            onGetLocation={getCurrentLocation}
            onClear={() => {
              clearLocation();
              setOriginalLocation(null);
            }}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={saving || !title.trim()}
          className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-blue-600/25"
        >
          <Save className="w-5 h-5" />
          {saving ? 'Updating...' : 'Update Entry'}
        </button>
      </form>
    </div>
  );
}
