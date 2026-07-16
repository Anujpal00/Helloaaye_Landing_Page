import React from 'react';
import { Target, Cpu, BarChart3, Mail, Users2, Key, ArrowRight } from 'lucide-react';
import Card from '../ui/Card';

const Features = () => {
  const features = [
    {
      icon: Target,
      title: 'Lead Management',
      description: 'Capture, score, and qualify prospects from multiple channels automatically in a clean workspace.',
      color: 'text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40',
    },
    {
      icon: Cpu,
      title: 'Pipeline Automation',
      description: 'Create custom triggers to advance deals, send internal notifications, and allocate resources instantly.',
      color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40',
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Inspect closed revenue forecasts, agent benchmarks, and lead acquisition trends with interactive reports.',
      color: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40',
    },
    {
      icon: Mail,
      title: 'Email Integration',
      description: 'Sync your corporate accounts seamlessly. Log interactions, follow up, and schedule templates natively.',
      color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40',
    },
    {
      icon: Users2,
      title: 'Team Collaboration',
      description: 'Assign tasks, assign joint leads, leave internal notes, and tag team members under unified thread history.',
      color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40',
    },
    {
      icon: Key,
      title: 'Developer API Access',
      description: 'Integrate external databases, configure secure webhooks, and trigger custom workflows using REST endpoints.',
      color: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40',
    },
  ];

  return (
    <section id="features" className="py-20 bg-slate-50/50 dark:bg-slate-900/30 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">
            System Capabilities
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
            Built to Propel Hyper-Efficient Sales Outfits
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Discover a comprehensive suite of CRM features engineered to eliminate manual overhead, improve outreach response rates, and close pipelines.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Card key={idx} hover className="p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  {/* Icon Block */}
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shrink-0 ${feature.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  
                  {/* Heading */}
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2.5 font-display">
                    {feature.title}
                  </h4>
                  
                  {/* Description */}
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                    {feature.description}
                  </p>
                </div>

                {/* Micro Action Link */}
                <a
                  href="#inquiry-form"
                  className="inline-flex items-center text-xs font-bold text-violet-600 dark:text-violet-400 hover:gap-1.5 transition-all gap-1 group"
                >
                  <span>Learn more</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
