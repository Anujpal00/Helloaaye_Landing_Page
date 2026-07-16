import React from 'react';
import { ArrowRight, Play, CheckCircle, Sparkles, TrendingUp, Users, Zap } from 'lucide-react';
import Button from '../ui/Button';

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24 transition-colors duration-300">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl -z-10 dark:bg-violet-500/5 animate-pulse" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl -z-10 dark:bg-indigo-500/5" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-50 border border-violet-100 text-violet-600 dark:bg-violet-950/30 dark:border-violet-900/50 dark:text-violet-400 text-xs font-semibold tracking-wide animate-bounce">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Introducing Automated CRM pipelines</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display leading-[1.1]">
              Close Deals{' '}
              <span className="bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Faster
              </span>{' '}
              With Automated Pipelines
            </h1>
            
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Empower your sales organization with lead intelligence, custom dashboards, automated follow-ups, and native integrations. Helloaaye CRM gets teams aligned instantly.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a href="#inquiry-form" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto" icon={ArrowRight}>
                  Book a Free Demo
                </Button>
              </a>
              <a href="#features" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto" icon={Play}>
                  Explore Features
                </Button>
              </a>
            </div>

            {/* Micro value props list */}
            <div className="pt-4 grid grid-cols-3 gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5 justify-center lg:justify-start">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span>No Credit Card</span>
              </div>
              <div className="flex items-center gap-1.5 justify-center lg:justify-start">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span>14-Day Trial</span>
              </div>
              <div className="flex items-center gap-1.5 justify-center lg:justify-start">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span>1-Click Import</span>
              </div>
            </div>
          </div>

          {/* Interactive CSS Mockup */}
          <div className="lg:col-span-6 animate-fadeIn">
            <div className="relative mx-auto max-w-[540px] lg:max-w-none">
              {/* Outer decorative card */}
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-3xl transform rotate-2 blur-xl opacity-30 -z-10" />

              {/* CRM App Frame Mockup */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
                {/* Window top bar */}
                <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono tracking-widest bg-slate-900 px-3 py-1 rounded-md">
                    helloaayecrm.com/dashboard
                  </div>
                  <div className="w-8" />
                </div>

                {/* Dashboard mock content */}
                <div className="p-4 sm:p-6 space-y-5 text-slate-300">
                  {/* Mock Stats grid */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/30">
                      <div className="flex items-center justify-between text-slate-500 text-[10px] uppercase font-bold tracking-wider">
                        <span>Revenue</span>
                        <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                      </div>
                      <div className="text-base sm:text-lg font-bold text-white mt-1">$48,250</div>
                      <span className="text-[9px] text-emerald-400 font-semibold">+18.2%</span>
                    </div>

                    <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/30">
                      <div className="flex items-center justify-between text-slate-500 text-[10px] uppercase font-bold tracking-wider">
                        <span>Leads</span>
                        <Users className="h-3.5 w-3.5 text-violet-400" />
                      </div>
                      <div className="text-base sm:text-lg font-bold text-white mt-1">1,248</div>
                      <span className="text-[9px] text-violet-400 font-semibold">+8.4%</span>
                    </div>

                    <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/30">
                      <div className="flex items-center justify-between text-slate-500 text-[10px] uppercase font-bold tracking-wider">
                        <span>Conversion</span>
                        <Zap className="h-3.5 w-3.5 text-amber-400" />
                      </div>
                      <div className="text-base sm:text-lg font-bold text-white mt-1">4.2%</div>
                      <span className="text-[9px] text-emerald-400 font-semibold">+1.5%</span>
                    </div>
                  </div>

                  {/* Deals Pipeline representation */}
                  <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-800">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                      Deal Stage Distribution
                    </h4>
                    <div className="space-y-2.5">
                      <div>
                        <div className="flex justify-between text-[11px] font-medium text-slate-400 mb-1">
                          <span>Qualified Prospect</span>
                          <span className="text-white">$12,400 (45%)</span>
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div className="bg-violet-500 h-full rounded-full" style={{ width: '45%' }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[11px] font-medium text-slate-400 mb-1">
                          <span>Proposal Shared</span>
                          <span className="text-white">$24,900 (75%)</span>
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div className="bg-indigo-500 h-full rounded-full" style={{ width: '75%' }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[11px] font-medium text-slate-400 mb-1">
                          <span>Negotiation</span>
                          <span className="text-white">$8,500 (30%)</span>
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full rounded-full" style={{ width: '30%' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 md:mt-24 border-t border-slate-100 dark:border-slate-900 pt-8 transition-colors">
          <p className="text-center text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-6">
            Trusted by over 500+ hyper-growth enterprises worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-55 dark:opacity-40">
            <span className="text-lg font-extrabold font-display tracking-wider text-slate-600 dark:text-slate-300">STRIPE</span>
            <span className="text-lg font-extrabold font-display tracking-wider text-slate-600 dark:text-slate-300">SLACK</span>
            <span className="text-lg font-extrabold font-display tracking-wider text-slate-600 dark:text-slate-300">VERCEL</span>
            <span className="text-lg font-extrabold font-display tracking-wider text-slate-600 dark:text-slate-300">FIGMA</span>
            <span className="text-lg font-extrabold font-display tracking-wider text-slate-600 dark:text-slate-300">ZOOM</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
