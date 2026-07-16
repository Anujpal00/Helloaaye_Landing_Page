import React from 'react';

const Spinner = ({ size = 'md', color = 'violet', className = '' }) => {
  const sizes = {
    xs: 'h-4 w-4 stroke-[3]',
    sm: 'h-6 w-6 stroke-2',
    md: 'h-10 w-10 stroke-2',
    lg: 'h-16 w-16 stroke-2',
  };

  const colors = {
    violet: 'text-violet-600 dark:text-violet-400',
    white: 'text-white',
    gray: 'text-slate-400 dark:text-slate-600',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        className={`animate-spin ${sizes[size]} ${colors[color]}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
};

export default Spinner;
