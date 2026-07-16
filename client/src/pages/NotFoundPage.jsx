import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass, Activity } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center items-center p-6 transition-colors duration-300">
      <div className="absolute top-8 left-8 flex items-center gap-2">
        <div className="bg-gradient-to-tr from-violet-600 to-indigo-600 p-2 rounded-xl text-white">
          <Activity className="h-5 w-5" />
        </div>
        <span className="font-bold text-lg font-display tracking-tight text-slate-900 dark:text-white">
          Helloaaye<span className="text-violet-600 dark:text-violet-400 font-semibold">CRM</span>
        </span>
      </div>

      <div className="max-w-md w-full text-center space-y-6">
        {/* Glow illustration */}
        <div className="relative mx-auto w-24 h-24 bg-violet-100 dark:bg-violet-950/40 rounded-full flex items-center justify-center text-violet-600 dark:text-violet-400 mb-2 shadow-inner">
          <Compass className="h-12 w-12 animate-spin" style={{ animationDuration: '6s' }} />
          <div className="absolute inset-0 border border-dashed border-violet-300 dark:border-violet-800 rounded-full animate-ping opacity-25" />
        </div>

        <div className="space-y-2">
          <h1 className="text-7xl font-black font-display bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">
            Page Not Found
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
            The page you are looking for does not exist, has been archived, or moved. Let's get you back on track.
          </p>
        </div>

        <div className="flex justify-center pt-2">
          <Link to="/">
            <Button variant="primary" size="lg" icon={Home}>
              Back to Safety
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
