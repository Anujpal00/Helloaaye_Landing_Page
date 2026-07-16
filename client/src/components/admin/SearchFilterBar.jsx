import React from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';
import { INDUSTRIES, COUNTRIES } from '../../utils/constants';

const SearchFilterBar = ({
  search,
  setSearch,
  industry,
  setIndustry,
  country,
  setCountry,
  onReset,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4 transition-colors duration-300">
      <div className="flex items-center gap-2 border-b border-slate-50 dark:border-slate-800 pb-3 mb-1">
        <Filter className="h-4.5 w-4.5 text-violet-600 dark:text-violet-400" />
        <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 uppercase tracking-wider font-display">
          Filter Inquiries
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
        {/* Search Input */}
        <div className="sm:col-span-6 relative">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
            Search keyword (Name, Company, Email)
          </label>
          <div className="relative rounded-lg shadow-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="e.g. Acme, Sarah..."
              className="block w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 py-2 pl-9 pr-3 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 transition-colors"
            />
          </div>
        </div>

        {/* Industry Filter */}
        <div className="sm:col-span-3">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
            Industry
          </label>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="block w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 transition-colors"
          >
            <option value="All">All Industries</option>
            {INDUSTRIES.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </div>

        {/* Country Filter */}
        <div className="sm:col-span-3">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
            Country
          </label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="block w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 transition-colors"
          >
            <option value="All">All Countries</option>
            {COUNTRIES.map((ctry) => (
              <option key={ctry} value={ctry}>
                {ctry}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Reset Button */}
      {(search || industry !== 'All' || country !== 'All') && (
        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Search Filters</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchFilterBar;
