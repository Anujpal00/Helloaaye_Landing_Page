import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Mail, Phone, Building, User, HelpCircle, Briefcase, Users } from 'lucide-react';

import { inquirySchema } from '../../utils/validationSchemas';
import { createInquiry } from '../../services/api';
import { COUNTRIES, INDUSTRIES, COMPANY_SIZES } from '../../utils/constants';

import Input from '../ui/Input';
import Select from '../ui/Select';
import SearchableSelect from '../ui/SearchableSelect';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import Toast from '../ui/Toast';
import Card from '../ui/Card';

const ContactForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(inquirySchema),
    mode: 'onBlur',
    defaultValues: {
      fullName: '',
      companyName: '',
      email: '',
      phoneNumber: '',
      country: '',
      industry: '',
      companySize: '',
      message: '',
    },
  });

  // Watch message field to pass length for character counter
  const messageVal = watch('message') || '';

  const onSubmit = async (data) => {
    if (submitting) return; // Prevent double submission
    setSubmitting(true);

    try {
      await createInquiry(data);
      setToast({
        show: true,
        message: 'Your inquiry has been submitted! Our sales team will contact you shortly.',
        type: 'success',
      });
      reset();
    } catch (err) {
      console.error(err);
      let errorMsg = 'Failed to submit inquiry. Please check your network and try again.';
      if (err.response && err.response.data && err.response.data.message) {
        errorMsg = err.response.data.message;
      }
      setToast({
        show: true,
        message: errorMsg,
        type: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="inquiry-form" className="py-20 bg-slate-50/50 dark:bg-slate-900/30 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Side Text Info Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">
                Contact Sales
              </h2>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
                Request a Custom Guided Walkthrough
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                Connect with our product specialists to audit your outbound setup, demonstrate features, and review customized enterprise pricing options.
              </p>
            </div>

            {/* Feature Checklists or Quick Channels */}
            <div className="space-y-5">
              <div className="flex gap-4">
                <div className="bg-violet-100/50 dark:bg-violet-950/40 p-3 rounded-xl text-violet-600 dark:text-violet-400 shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                    Email Correspondence
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    sales@helloaayecrm.com (Average reply: &lt; 2 hrs)
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-violet-100/50 dark:bg-violet-950/40 p-3 rounded-xl text-violet-600 dark:text-violet-400 shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                    Direct Corporate Line
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    +1 (800) 555-CRM-TECH (Mon-Fri, 9am - 6pm EST)
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-violet-100/50 dark:bg-violet-950/40 p-3 rounded-xl text-violet-600 dark:text-violet-400 shrink-0">
                  <Building className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                    Global HQ
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    100 Pine Street, Suite 2400, San Francisco, CA 94111
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card Column */}
          <div className="lg:col-span-7">
            <Card className="p-6 sm:p-10 border border-slate-100 dark:border-slate-800">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <Input
                    label="Full Name"
                    name="fullName"
                    placeholder="Jane Doe"
                    icon={User}
                    error={errors.fullName?.message}
                    disabled={submitting}
                    {...register('fullName')}
                  />

                  {/* Company Name */}
                  <Input
                    label="Company Name"
                    name="companyName"
                    placeholder="Acme Corp"
                    icon={Building}
                    error={errors.companyName?.message}
                    disabled={submitting}
                    {...register('companyName')}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Email */}
                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="jane@company.com"
                    icon={Mail}
                    error={errors.email?.message}
                    disabled={submitting}
                    {...register('email')}
                  />

                  {/* Phone Number */}
                  <Input
                    label="Phone Number"
                    name="phoneNumber"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    icon={Phone}
                    error={errors.phoneNumber?.message}
                    disabled={submitting}
                    {...register('phoneNumber')}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {/* Country (Searchable Select via Controller) */}
                  <div className="sm:col-span-1">
                    <Controller
                      name="country"
                      control={control}
                      render={({ field }) => (
                        <SearchableSelect
                          label="Country"
                          options={COUNTRIES}
                          value={field.value}
                          onChange={field.onChange}
                          error={errors.country?.message}
                          disabled={submitting}
                          placeholder="Select..."
                        />
                      )}
                    />
                  </div>

                  {/* Industry */}
                  <div className="sm:col-span-1">
                    <Select
                      label="Industry"
                      name="industry"
                      options={INDUSTRIES}
                      placeholder="Select..."
                      error={errors.industry?.message}
                      disabled={submitting}
                      {...register('industry')}
                    />
                  </div>

                  {/* Company Size */}
                  <div className="sm:col-span-1">
                    <Select
                      label="Company Size"
                      name="companySize"
                      options={COMPANY_SIZES}
                      placeholder="Select..."
                      error={errors.companySize?.message}
                      disabled={submitting}
                      {...register('companySize')}
                    />
                  </div>
                </div>

                {/* Message */}
                <Textarea
                  label="Message / Requirements"
                  name="message"
                  placeholder="Tell us about your team size, current sales pipeline tool, and what you hope to achieve with Helloaaye CRM..."
                  maxLength={500}
                  error={errors.message?.message}
                  disabled={submitting}
                  value={messageVal}
                  {...register('message')}
                />

                {/* Submit Button */}
                <div>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full shadow-lg shadow-violet-500/10 justify-center"
                    loading={submitting}
                    disabled={submitting}
                  >
                    Submit Request
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>

      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </section>
  );
};

export default ContactForm;
