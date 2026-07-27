import React from 'react';
import { ToastMessage } from '../types';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

interface ToastProps {
  toast: ToastMessage | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-[#2C633E] shrink-0" />
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center space-x-3 bg-white border border-gray-200 rounded-2xl shadow-xl p-4 max-w-md animate-in slide-in-from-bottom-5 duration-200">
      {icons[toast.type]}
      <div className="flex-1 pr-2">
        <h4 className="text-xs font-bold text-gray-900">{toast.title}</h4>
        <p className="text-xs text-gray-600 mt-0.5">{toast.message}</p>
      </div>
      <button
        onClick={onClose}
        className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
