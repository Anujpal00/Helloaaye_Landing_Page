import React, { useState } from 'react';
import { Activity, Twitter, Linkedin, Github, Youtube, Send } from 'lucide-react';
import Button from '../ui/Button';
import Toast from '../ui/Toast';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    
    // Email Validation Regex
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      setToast({
        show: true,
        message: 'Please enter a valid email address.',
        type: 'error',
      });
      return;
    }

    setToast({
      show: true,
      message: 'Thank you for subscribing to our newsletter!',
      type: 'success',
    });
    setEmail('');
  };

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-tr from-violet-600 to-indigo-600 p-2 rounded-xl text-white">
                <Activity className="h-5 w-5" />
              </div>
              <span className="font-bold text-lg font-display text-white tracking-tight">
                Helloaaye<span className="text-violet-400 font-semibold">CRM</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Supercharge your sales cycle, streamline lead management, and generate actionable insights with our premium AI-driven CRM system.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="p-2 bg-slate-800 hover:bg-violet-600 hover:text-white rounded-lg transition-all" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-violet-600 hover:text-white rounded-lg transition-all" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-violet-600 hover:text-white rounded-lg transition-all" aria-label="GitHub">
                <Github className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-violet-600 hover:text-white rounded-lg transition-all" aria-label="YouTube">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-display">
              Product
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ Support</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-display">
              Legal & Docs
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Documentation</a></li>
              <li><a href="/admin" className="hover:text-white transition-colors font-medium text-violet-400">Admin Login</a></li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-display">
              Subscribe to Newsletter
            </h3>
            <p className="text-sm text-slate-400">
              Get the latest SaaS CRM articles, feature logs, and special offers delivered directly.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full bg-slate-800 rounded-lg border border-slate-700 px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
              />
              <button
                type="submit"
                className="bg-violet-600 hover:bg-violet-700 p-2.5 rounded-lg text-white font-medium hover:scale-105 active:scale-95 transition-all shadow-md shadow-violet-500/10 flex items-center justify-center shrink-0"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Helloaaye CRM Inc. All rights reserved.</p>
          <p>Designed and built for peak operations scalability.</p>
        </div>
      </div>

      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </footer>
  );
};

export default Footer;
