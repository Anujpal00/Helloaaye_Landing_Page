import React, { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  type = 'text',
  name,
  error,
  placeholder,
  className = '',
  icon: Icon,
  ...props
}, ref) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5"
        >
          {label}
        </label>
      )}
      <div className="relative rounded-lg shadow-sm">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-4 w-4 text-slate-400" />
          </div>
        )}
        <input
          id={name}
          name={name}
          type={type}
          ref={ref}
          placeholder={placeholder}
          className={`block w-full rounded-lg border transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 ${
            Icon ? 'pl-9' : 'pl-3'
          } ${
            error
              ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20'
              : 'border-slate-200 dark:border-slate-800'
          } py-2`}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-xs text-rose-500 font-medium animate-fadeIn">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
