import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

const Toast = ({ show, message, type = 'success', onClose, duration = 4000 }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  const bgColors = {
    success:
      'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/20 dark:border-emerald-800/60 dark:text-emerald-300',
    error:
      'bg-rose-50 border-rose-200 text-rose-800 dark:bg-rose-950/20 dark:border-rose-800/60 dark:text-rose-300',
  };

  const icons = {
    success: <CheckCircle2 className="h-5 w-5 text-emerald-500 dark:text-emerald-400 shrink-0" />,
    error: <AlertCircle className="h-5 w-5 text-rose-500 dark:text-rose-400 shrink-0" />,
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slideIn">
      <div
        className={`flex items-center gap-3.5 px-4 py-3.5 rounded-2xl border shadow-xl max-w-sm bg-white dark:bg-slate-900 ${bgColors[type]}`}
      >
        {icons[type]}
        <div className="text-sm font-medium pr-3 leading-snug">{message}</div>
        <button
          type="button"
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors shrink-0"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
