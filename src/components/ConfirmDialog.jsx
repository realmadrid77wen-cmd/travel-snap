import { useTheme } from '../context/ThemeContext';

export default function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel }) {
  const { isDark } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] px-4">
      <div className={`rounded-xl p-6 max-w-sm w-full shadow-xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
        <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className={`flex-1 py-2.5 rounded-lg border font-medium transition-colors ${
              isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
