import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sun, Moon, Menu, X, Activity, LayoutDashboard, ArrowRight } from 'lucide-react';
import { useDarkMode } from '../../hooks/useDarkMode';
import Button from '../ui/Button';

const Navbar = () => {
  const { darkMode, toggleTheme } = useDarkMode();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isLinkActive = (hash) => location.hash === hash;
  const isAdminPage = location.pathname === '/admin';

  const handleNavClick = (e, targetHash) => {
    setMobileMenuOpen(false);
    if (isAdminPage) {
      e.preventDefault();
      navigate(`/${targetHash}`);
    }
  };

  const navLinks = [
    { label: 'Features', hash: '#features' },
    { label: 'Pricing', hash: '#pricing' },
    { label: 'Testimonials', hash: '#testimonials' },
    { label: 'FAQ', hash: '#faq' },
    { label: 'Contact', hash: '#inquiry-form' },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-tr from-violet-600 to-indigo-600 p-2 rounded-xl text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Activity className="h-5 w-5" />
            </div>
            <span className="font-bold text-lg font-display tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
              Helloaaye<span className="text-violet-600 dark:text-violet-400 font-semibold">CRM</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          {!isAdminPage ? (
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.hash}
                  href={link.hash}
                  onClick={(e) => handleNavClick(e, link.hash)}
                  className={`text-sm font-medium transition-colors hover:text-violet-600 dark:hover:text-violet-400 ${
                    isLinkActive(link.hash)
                      ? 'text-violet-600 dark:text-violet-400'
                      : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          ) : (
            <div className="hidden md:flex items-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Administration Portal
              </span>
            </div>
          )}

          {/* Desktop Controls & CTA */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Dashboard Toggle Link */}
            {isAdminPage ? (
              <Link to="/">
                <Button variant="secondary">Back to Landing</Button>
              </Link>
            ) : (
              <>
                <Link to="/admin" className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all" title="Admin Dashboard">
                  <LayoutDashboard className="h-5 w-5" />
                </Link>
                <a href="#inquiry-form">
                  <Button variant="primary" icon={ArrowRight}>Book a Demo</Button>
                </a>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-950 px-4 pt-2 pb-4 space-y-2.5 animate-fadeIn transition-colors duration-300">
          {!isAdminPage ? (
            navLinks.map((link) => (
              <a
                key={link.hash}
                href={link.hash}
                onClick={(e) => handleNavClick(e, link.hash)}
                className="block px-3 py-2 text-base font-medium rounded-lg text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900 transition-colors"
              >
                {link.label}
              </a>
            ))
          ) : (
            <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Admin Portal
            </div>
          )}

          <div className="border-t border-slate-100 dark:border-slate-800 pt-3 flex flex-col gap-2">
            {isAdminPage ? (
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="secondary" className="w-full">Back to Landing</Button>
              </Link>
            ) : (
              <>
                <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="w-full">
                  <Button variant="secondary" className="w-full" icon={LayoutDashboard}>Admin Portal</Button>
                </Link>
                <a href="#inquiry-form" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" className="w-full" icon={ArrowRight}>Book a Demo</Button>
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
