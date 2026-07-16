import React from 'react';

const Card = ({ children, className = '', onClick, hover = false }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 ${
        hover
          ? 'hover:-translate-y-1 hover:shadow-lg hover:border-violet-500/25 dark:hover:border-violet-500/20'
          : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
