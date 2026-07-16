import React, { useState } from 'react';
import { Check } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState('monthly'); // 'monthly' or 'yearly'

  const plans = [
    {
      name: 'Starter',
      price: billingPeriod === 'monthly' ? 29 : 24,
      description: 'Ideal for small startups and solopreneurs looking to organize their sales pipeline.',
      features: [
        'Up to 3 team members',
        '1,500 active contacts',
        'Single deal pipeline',
        'Basic reporting dashboard',
        'Email customer support',
      ],
      popular: false,
      cta: 'Start with Starter',
    },
    {
      name: 'Growth',
      price: billingPeriod === 'monthly' ? 79 : 64,
      description: 'Designed for scaling operations needing deep automations and multi-team collaboration.',
      features: [
        'Up to 15 team members',
        '10,000 active contacts',
        'Unlimited deal pipelines',
        'Advanced workflow automation',
        'Shared group inboxes',
        'Priority live chat support',
      ],
      popular: true,
      cta: 'Go with Growth',
    },
    {
      name: 'Enterprise',
      price: billingPeriod === 'monthly' ? 149 : 119,
      description: 'Tailored for large divisions demanding absolute security, custom integrations, and priority channels.',
      features: [
        'Unlimited team members',
        'Unlimited active contacts',
        'Custom fields & CRM tracking',
        'Dedicated account manager',
        'Full REST API and webhooks',
        '24/7 phone & SLA support',
      ],
      popular: false,
      cta: 'Contact Sales',
    },
  ];

  return (
    <section id="pricing" className="py-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">
            Subscription Tiers
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
            Transparent Pricing Plans For Any Scale
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Choose a plan that matches your pipeline complexity. Switch billing frequencies or cancel anytime without hassle.
          </p>
        </div>

        {/* Monthly / Yearly Toggle */}
        <div className="flex justify-center items-center gap-3.5 mb-16">
          <span
            className={`text-sm font-semibold transition-colors ${
              billingPeriod === 'monthly' ? 'text-slate-900 dark:text-white' : 'text-slate-400'
            }`}
          >
            Billed Monthly
          </span>
          <button
            onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
            className="w-14 h-8 bg-slate-200 dark:bg-slate-800 rounded-full relative p-1 focus:outline-none transition-colors"
            aria-label="Toggle billing frequency"
          >
            <div
              className={`w-6 h-6 bg-white dark:bg-slate-950 rounded-full shadow-md transform transition-transform duration-200 ${
                billingPeriod === 'yearly' ? 'translate-x-6 bg-violet-600 dark:bg-violet-400' : ''
              }`}
            />
          </button>
          <div className="flex items-center gap-1.5">
            <span
              className={`text-sm font-semibold transition-colors ${
                billingPeriod === 'yearly' ? 'text-slate-900 dark:text-white' : 'text-slate-400'
              }`}
            >
              Billed Annually
            </span>
            <span className="bg-emerald-150 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Save 20%
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <Card
              key={idx}
              className={`p-8 flex flex-col justify-between relative ${
                plan.popular
                  ? 'border-2 border-violet-600 dark:border-violet-500 ring-4 ring-violet-500/10'
                  : 'border border-slate-100 dark:border-slate-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  Most Popular
                </div>
              )}

              <div>
                {/* Plan Header */}
                <h4 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                  {plan.name}
                </h4>
                <p className="mt-2.5 text-xs text-slate-400 leading-relaxed min-h-[40px]">
                  {plan.description}
                </p>

                {/* Price Display */}
                <div className="mt-6 flex items-baseline gap-1 text-slate-900 dark:text-white">
                  <span className="text-5xl font-black tracking-tight font-display">
                    ${plan.price}
                  </span>
                  <span className="text-sm font-semibold text-slate-400">/mo</span>
                </div>
                {billingPeriod === 'yearly' && (
                  <span className="block text-[10px] text-emerald-600 dark:text-emerald-400 font-bold mt-1">
                    Billed annually (${plan.price * 12}/yr)
                  </span>
                )}

                <hr className="my-6 border-slate-100 dark:border-slate-800" />

                {/* Features Checklist */}
                <ul className="space-y-3.5">
                  {plan.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                      <div className="bg-emerald-50 dark:bg-emerald-950/20 p-0.5 rounded-full shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5">
                        <Check className="h-3.5 w-3.5" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action CTA Button */}
              <div className="mt-8">
                <a href="#inquiry-form">
                  <Button
                    variant={plan.popular ? 'primary' : 'secondary'}
                    className="w-full justify-center"
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
