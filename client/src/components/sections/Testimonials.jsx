import React from 'react';
import { Quote } from 'lucide-react';
import Card from '../ui/Card';

const Testimonials = () => {
  const reviews = [
    {
      name: 'Sarah Jenkins',
      role: 'Head of Sales',
      company: 'CloudScale Inc.',
      quote: 'Helloaaye CRM completely revolutionized our outbound workflows. Our average lead response times fell by 70% in the first week alone.',
      avatarInitials: 'SJ',
      avatarColor: 'from-violet-500 to-indigo-500',
    },
    {
      name: 'Marcus Chen',
      role: 'VP of Operations',
      company: 'FinTech Flow',
      quote: 'The pipeline automation is pure magic. We no longer drop deals due to missing follow-up reminders. It paid for itself in less than a month.',
      avatarInitials: 'MC',
      avatarColor: 'from-pink-500 to-rose-500',
    },
    {
      name: 'Elena Rostova',
      role: 'Founder & CEO',
      company: 'TechHQ',
      quote: 'Transitioning from our legacy spreadsheet structure took under 3 hours. The UI is highly intuitive, and our agents actually enjoy working inside it.',
      avatarInitials: 'ER',
      avatarColor: 'from-amber-500 to-orange-500',
    },
    {
      name: 'David Kovic',
      role: 'Director of Revenue',
      company: 'GrowthCo',
      quote: 'The analytics dashboards are invaluable for our team alignment syncs. The ability to filter lead conversions by country and industry is a game-changer.',
      avatarInitials: 'DK',
      avatarColor: 'from-emerald-500 to-teal-500',
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-slate-50/50 dark:bg-slate-900/30 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">
            Success Stories
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
            Endorsed By Peak Performing Outfits
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            See how teams around the world utilize our CRM platform to coordinate communications, maximize conversions, and maintain customer relationships.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((rev, idx) => (
            <Card key={idx} className="p-8 flex flex-col justify-between relative hover:shadow-md transition-shadow">
              {/* Quote Mark Icon */}
              <Quote className="absolute top-6 right-8 h-8 w-8 text-slate-100 dark:text-slate-800 pointer-events-none" />

              <div className="space-y-6">
                {/* Quote Content */}
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed italic relative z-10">
                  "{rev.quote}"
                </p>

                {/* User Details */}
                <div className="flex items-center gap-3.5 pt-2">
                  {/* Initials Avatar */}
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-extrabold text-white bg-gradient-to-tr shadow-sm shrink-0 ${rev.avatarColor}`}
                  >
                    {rev.avatarInitials}
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                      {rev.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {rev.role} at <span className="font-semibold text-slate-700 dark:text-slate-300">{rev.company}</span>
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
