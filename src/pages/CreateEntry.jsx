import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEntry } from '../db/db';
import { useGeolocation } from '../hooks/useGeolocation';
import { useCamera } from '../hooks/useCamera';
import CameraCapture from '../components/CameraCapture';
import LocationPicker from '../components/LocationPicker';
import { useTheme } from '../context/ThemeContext';
import { ArrowLeft, Save } from 'lucide-react';

export default function CreateEntry() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
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

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;

    setSaving(true);
    try {
      await createEntry({
        title: title.trim(),
        description: description.trim(),
        date,
        latitude: location?.latitude || null,
        longitude: location?.longitude || null,
        placeName: location?.placeName || null,
        photo: photo || null,
      });
      navigate('/');
    } catch (err) {
      console.error('Failed to create entry:', err);
      alert('Failed to save entry. Please try again.');
    } finally {
      setSaving(false);
    }
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
        <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>New Entry</h2>
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
            placeholder="e.g. Sunset at Brighton Beach"
            required
            className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              isDark ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-white border-gray-200 text-gray-900'
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
            placeholder="Describe your experience..."
            rows={4}
            className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
              isDark ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-white border-gray-200 text-gray-900'
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
            location={location}
            loading={locationLoading}
            error={locationError}
            onGetLocation={getCurrentLocation}
            onClear={clearLocation}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={saving || !title.trim()}
          className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-blue-600/25"
        >
          <Save className="w-5 h-5" />
          {saving ? 'Saving...' : 'Save Entry'}
        </button>
      </form>
    </div>
  );
}
