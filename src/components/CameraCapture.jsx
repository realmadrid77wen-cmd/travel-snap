import { useEffect } from 'react';
import { Camera, X, Upload } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function CameraCapture({
  photo,
  isCameraOpen,
  error,
  videoRef,
  canvasRef,
  openCamera,
  capturePhoto,
  closeCamera,
  clearPhoto,
  onFileUpload,
}) {
  useEffect(() => {
    if (isCameraOpen && videoRef.current) {
      const interval = setInterval(() => {
        if (videoRef.current && videoRef.current.srcObject) {
          videoRef.current.play().catch(() => {});
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isCameraOpen, videoRef]);

  const { isDark } = useTheme();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      onFileUpload(reader.result);
    };
    reader.readAsDataURL(file);
  };

  if (photo) {
    return (
      <div className="relative">
        <img
          src={photo}
          alt="Captured"
          className="w-full h-64 object-cover rounded-lg"
        />
        <button
          type="button"
          onClick={clearPhoto}
          className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  if (isCameraOpen) {
    return (
      <div className="relative">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-64 object-cover rounded-lg bg-black"
        />
        <canvas ref={canvasRef} className="hidden" />
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-4">
          <button
            type="button"
            onClick={capturePhoto}
            className="bg-white text-gray-800 px-4 py-2 rounded-full font-medium shadow-lg hover:bg-gray-100 transition-colors"
          >
            <Camera className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={closeCamera}
            className="bg-red-500 text-white px-4 py-2 rounded-full font-medium shadow-lg hover:bg-red-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={openCamera}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-colors font-medium ${
            isDark ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Camera className="w-5 h-5" />
          Take Photo
        </button>
        <label className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-colors font-medium cursor-pointer ${
          isDark ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}>
          <Upload className="w-5 h-5" />
          Upload
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
}
