import React, { forwardRef, useState, useEffect } from 'react';

const Textarea = forwardRef(({
  label,
  name,
  error,
  placeholder,
  className = '',
  maxLength,
  onChange,
  value,
  defaultValue = '',
  ...props
}, ref) => {
  const [charCount, setCharCount] = useState(defaultValue.length);

  // Sync count if controlled value changes from outside
  useEffect(() => {
    if (value !== undefined) {
      setCharCount(value.length);
    }
  }, [value]);

  const handleTextChange = (e) => {
    setCharCount(e.target.value.length);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-1.5">
        {label && (
          <label
            htmlFor={name}
            className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"
          >
            {label}
          </label>
        )}
        {maxLength && (
          <span className="text-[10px] font-semibold text-slate-400">
            {charCount}/{maxLength}
          </span>
        )}
      </div>
      <div className="relative rounded-lg shadow-sm">
        <textarea
          id={name}
          name={name}
          ref={ref}
          placeholder={placeholder}
          maxLength={maxLength}
          onChange={handleTextChange}
          defaultValue={defaultValue}
          value={value}
          className={`block w-full rounded-lg border transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 px-3 py-2.5 ${
            error
              ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20'
              : 'border-slate-200 dark:border-slate-800'
          }`}
          rows="4"
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

Textarea.displayName = 'Textarea';

export default Textarea;
