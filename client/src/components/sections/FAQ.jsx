import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Card from '../ui/Card';

const FAQ = () => {
  const [openIdx, setOpenIdx] = useState(null);

  const faqs = [
    {
      q: 'What is Helloaaye CRM and how does it help my sales team?',
      a: 'Helloaaye CRM is an enterprise pipeline and lead tracking workspace. It streamlines customer management by integrating communication channels, automate recurring task triggers (like follow-ups), and providing analytics dashboards so your reps focus on closing deals instead of manual admin work.',
    },
    {
      q: 'How long does the setup and contact import process take?',
      a: 'Getting started takes under 10 minutes. You can import your records directly using standard CSV sheets. Our intelligent columns mapper will align your custom data fields automatically, so your pipeline is immediately operational.',
    },
    {
      q: 'Can we sync our corporate emails and calendars?',
      a: 'Absolutely. We support native, secure OAuth bidirectional syncs for Gmail, Google Workspace, Outlook, and Microsoft Exchange. Sent emails are logged in contact history, and calendar syncs ensure client bookings are added automatically.',
    },
    {
      q: 'Are there limits on contact volumes or deal pipelines?',
      a: 'Limits scale with your pricing subscription. The Starter tier supports 1,500 active contacts. The Growth tier extends this to 10,000. For large enterprises with millions of operations, the Enterprise tier offers unlimited contacts and pipeline structures.',
    },
    {
      q: 'Do you support custom developer integrations?',
      a: 'Yes. Our Enterprise tier opens up developer dashboard tokens, allowing access to complete REST APIs, webhooks triggering on state transitions (such as Deal Closed), and sandbox environments for safe testing.',
    },
    {
      q: 'What customer support guarantees are included in plans?',
      a: 'Starter includes email support with 24-hour turnaround times. Growth adds live chat with average response times under 15 minutes. Enterprise unlocks dedicated accounts specialists, SLA agreements, and 24/7 direct phone support.',
    },
    {
      q: 'Is there a free trial period to test out capabilities?',
      a: 'Yes, we provide a 14-day fully-featured trial for the Growth plan. No credit card details are collected during registration, so you can test the system risk-free.',
    },
  ];

  const handleToggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">
            Frequently Asked Questions
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
            Clear Answers For Your Operations Queries
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Need clarification on databases, plans, or setup? Check out these common inquiries, or reach out to our sales team directly.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <Card
                key={idx}
                className={`border transition-all duration-300 ${
                  isOpen
                    ? 'border-violet-200 dark:border-violet-800/80 shadow-md ring-2 ring-violet-500/5'
                    : 'border-slate-100 dark:border-slate-800/60'
                }`}
              >
                <button
                  type="button"
                  onClick={() => handleToggle(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-semibold text-slate-900 dark:text-white hover:text-violet-600 dark:hover:text-violet-400 transition-colors focus:outline-none"
                >
                  <span className="pr-4 text-sm sm:text-base font-display">{faq.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-slate-400 dark:text-slate-500 transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 text-violet-600 dark:text-violet-400' : ''
                    }`}
                  />
                </button>
                
                {/* Collapsible Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-[300px] border-t border-slate-50 dark:border-slate-800' : 'max-h-0'
                  }`}
                >
                  <p className="p-5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed bg-slate-50/50 dark:bg-slate-900/10">
                    {faq.a}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
