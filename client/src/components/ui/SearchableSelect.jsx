import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Check } from 'lucide-react';

const SearchableSelect = ({
  label,
  options = [],
  value,
  onChange,
  error,
  placeholder = 'Select an option',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filter options based on search input
  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className={`relative w-full ${className}`} ref={containerRef}>
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
          {label}
        </label>
      )}
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`flex w-full items-center justify-between rounded-lg border bg-white dark:bg-slate-900 px-3 py-2.5 text-sm text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 ${
            error
              ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20'
              : 'border-slate-200 dark:border-slate-800'
          } ${!value ? 'text-slate-400' : 'text-slate-900 dark:text-slate-100'}`}
        >
          <span className="truncate">{value || placeholder}</span>
          <ChevronDown
            className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1.5 w-full rounded-lg border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-950 animate-fadeIn max-h-60 overflow-hidden flex flex-col">
          <div className="relative border-b border-slate-100 dark:border-slate-800 p-2 flex items-center">
            <Search className="absolute left-5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search country..."
              className="w-full bg-slate-50 dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800 py-1.5 pl-8 pr-3 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-500/10"
              autoFocus
            />
          </div>
          <ul className="overflow-y-auto py-1 max-h-44 text-sm">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={`flex items-center justify-between px-4 py-2 hover:bg-violet-50 dark:hover:bg-slate-900 cursor-pointer transition-colors ${
                    value === option
                      ? 'bg-violet-50 dark:bg-slate-800 text-violet-600 dark:text-violet-400 font-medium'
                      : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span>{option}</span>
                  {value === option && (
                    <Check className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                  )}
                </li>
              ))
            ) : (
              <li className="px-4 py-3 text-xs text-slate-400 text-center">
                No matching countries found
              </li>
            )}
          </ul>
        </div>
      )}
      {error && (
        <p className="mt-1 text-xs text-rose-500 font-medium animate-fadeIn">
          {error}
        </p>
      )}
    </div>
  );
};

export default SearchableSelect;
