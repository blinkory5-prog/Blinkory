import React, { useState } from 'react';
import {
  User,
  Phone,
  Mail,
  Link2,
  CheckCircle,
  AlertCircle,
  Send,
  Loader2,
  ShieldCheck,
  Check,
  RefreshCw,
} from 'lucide-react';
import {
  ApplicationFormData,
  ValidationErrors,
  validateApplication,
  validateFullName,
  validateEmail,
  validatePhone,
  validatePortfolioUrl,
  validateConsent,
} from '../utils/validation.ts';
import { submitApplication } from '../utils/storage.ts';

export const ApplicationForm: React.FC = () => {
  const [formData, setFormData] = useState<ApplicationFormData>({
    fullName: '',
    phone: '',
    email: '',
    portfolioUrl: '',
    agreedToTerms: false,
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submittedSuccess, setSubmittedSuccess] = useState<{
    applicationId: string;
    submittedAt: string;
    storageMode?: 'server' | 'persistent-local';
  } | null>(null);

  const handleBlur = (field: keyof ApplicationFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    let error: string | null = null;

    if (field === 'fullName') error = validateFullName(formData.fullName);
    if (field === 'email') error = validateEmail(formData.email);
    if (field === 'phone') error = validatePhone(formData.phone);
    if (field === 'portfolioUrl') error = validatePortfolioUrl(formData.portfolioUrl);
    if (field === 'agreedToTerms') error = validateConsent(formData.agreedToTerms);

    setErrors((prev) => ({
      ...prev,
      [field]: error || undefined,
    }));
  };

  const handleChange = (field: keyof ApplicationFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear server error if user types
    if (serverError) setServerError(null);

    // If already touched, validate live
    if (touched[field]) {
      let error: string | null = null;
      if (field === 'fullName') error = validateFullName(value as string);
      if (field === 'email') error = validateEmail(value as string);
      if (field === 'phone') error = validatePhone(value as string);
      if (field === 'portfolioUrl') error = validatePortfolioUrl(value as string);
      if (field === 'agreedToTerms') error = validateConsent(value as boolean);

      setErrors((prev) => ({
        ...prev,
        [field]: error || undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Mark all as touched
    setTouched({
      fullName: true,
      phone: true,
      email: true,
      portfolioUrl: true,
      agreedToTerms: true,
    });

    const validation = validateApplication(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setServerError(null);
    setIsSubmitting(true);

    try {
      const result = await submitApplication({
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        portfolioUrl: formData.portfolioUrl?.trim() || '',
        agreedToTerms: formData.agreedToTerms,
      });

      // Success
      setSubmittedSuccess({
        applicationId: result.applicationId,
        submittedAt: result.submittedAt,
        storageMode: result.storageMode,
      });
    } catch (err: any) {
      console.error('Submission error:', err);
      setServerError(
        err.message || 'Unable to submit your application at this moment. Please check your network and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      portfolioUrl: '',
      agreedToTerms: false,
    });
    setErrors({});
    setTouched({});
    setServerError(null);
    setSubmittedSuccess(null);
  };

  return (
    <section id="apply-form" className="py-20 sm:py-28 relative scroll-mt-12">
      {/* Background ambient glow */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-red-600/5 blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-semibold text-neutral-300 uppercase tracking-widest mb-3">
            <Send className="w-3.5 h-3.5 text-red-500" />
            <span>Direct Submission</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Apply to Join the Team
          </h2>
          <p className="mt-2 text-base text-neutral-400">
            Tell us a little about yourself.
          </p>
        </div>

        {/* Form Container or Success Screen */}
        <div className="rounded-2xl bg-neutral-900/50 border border-neutral-800 shadow-2xl backdrop-blur-sm p-6 sm:p-10">
          
          {submittedSuccess ? (
            /* Success State */
            <div className="py-8 px-4 flex flex-col items-center text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-green-500/10 border-2 border-green-500/40 flex items-center justify-center text-green-400 shadow-lg shadow-green-500/20">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-extrabold text-white">
                  Application Submitted Successfully!
                </h3>
                <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{formData.fullName}</strong>. Your application has been securely recorded and received by the Abhay Create team.
                </p>
              </div>

              {/* Reference Receipt */}
              <div className="w-full max-w-md rounded-xl bg-neutral-950 border border-neutral-800 p-4 text-left font-mono text-xs space-y-2.5">
                <div className="flex justify-between items-center text-neutral-400 pb-2 border-b border-neutral-900">
                  <span>Application ID:</span>
                  <span className="font-bold text-neutral-200">{submittedSuccess.applicationId}</span>
                </div>
                <div className="flex justify-between items-center text-neutral-400">
                  <span>Email:</span>
                  <span className="text-neutral-200">{formData.email}</span>
                </div>
                <div className="flex justify-between items-center text-neutral-400">
                  <span>Phone:</span>
                  <span className="text-neutral-200">{formData.phone}</span>
                </div>
                {formData.portfolioUrl && (
                  <div className="flex justify-between items-center text-neutral-400 truncate">
                    <span>Portfolio:</span>
                    <span className="text-neutral-200 truncate max-w-[200px]">{formData.portfolioUrl}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-neutral-400 pt-1 border-t border-neutral-900">
                  <span>Submitted At:</span>
                  <span className="text-neutral-200">
                    {new Date(submittedSuccess.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>

              {/* What Happens Next Card */}
              <div className="w-full max-w-md p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 text-left text-xs text-neutral-300 space-y-2">
                <div className="flex items-center gap-2 font-semibold text-white">
                  <ShieldCheck className="w-4 h-4 text-red-500" />
                  <span>Next Steps</span>
                </div>
                <p className="text-neutral-400 leading-relaxed">
                  We review portfolios weekly. If your animation pacing and character style align with upcoming YouTube Shorts projects, we will reach out directly to your WhatsApp or phone.
                </p>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold text-xs tracking-wide transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Submit Another Response</span>
              </button>
            </div>
          ) : (
            /* Application Form */
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              
              {/* Server Error Alert */}
              {serverError && (
                <div className="p-4 rounded-xl bg-red-950/70 border border-red-800/80 flex items-start gap-3 text-red-300 text-sm animate-in fade-in">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-red-200">Submission Notice</p>
                    <p className="text-xs text-red-300/90 mt-0.5">{serverError}</p>
                  </div>
                </div>
              )}

              {/* Field 1: Full Name */}
              <div className="space-y-1.5">
                <label
                  htmlFor="full-name"
                  className="block text-xs sm:text-sm font-semibold text-neutral-200"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    id="full-name"
                    name="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    onBlur={() => handleBlur('fullName')}
                    placeholder="e.g. John Doe"
                    disabled={isSubmitting}
                    aria-invalid={Boolean(errors.fullName)}
                    aria-describedby={errors.fullName ? 'full-name-error' : undefined}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-950 border ${
                      errors.fullName
                        ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                        : 'border-neutral-800 focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600'
                    } text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors`}
                  />
                </div>
                {errors.fullName && (
                  <p id="full-name-error" className="text-xs text-red-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              {/* Field 2 & 3: Phone Number & Email in Responsive Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="phone-number"
                    className="block text-xs sm:text-sm font-semibold text-neutral-200"
                  >
                    Phone Number with Country Code <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      id="phone-number"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      onBlur={() => handleBlur('phone')}
                      placeholder="+91 98765 43210"
                      disabled={isSubmitting}
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-950 border ${
                        errors.phone
                          ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                          : 'border-neutral-800 focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600'
                      } text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors`}
                    />
                  </div>
                  {errors.phone ? (
                    <p id="phone-error" className="text-xs text-red-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.phone}</span>
                    </p>
                  ) : (
                    <p className="text-[11px] text-neutral-500">Include country prefix (+1, +91, +44, etc.)</p>
                  )}
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="email-address"
                    className="block text-xs sm:text-sm font-semibold text-neutral-200"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      onBlur={() => handleBlur('email')}
                      placeholder="animator@example.com"
                      disabled={isSubmitting}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-950 border ${
                        errors.email
                          ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                          : 'border-neutral-800 focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600'
                      } text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors`}
                    />
                  </div>
                  {errors.email && (
                    <p id="email-error" className="text-xs text-red-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Field 4: Portfolio / Social Profile URL (Optional) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="portfolio-url"
                    className="block text-xs sm:text-sm font-semibold text-neutral-200"
                  >
                    Portfolio / Instagram / YouTube / LinkedIn Profile URL
                  </label>
                  <span className="text-xs text-neutral-500 font-mono">Optional</span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                    <Link2 className="w-4 h-4" />
                  </div>
                  <input
                    id="portfolio-url"
                    name="portfolioUrl"
                    type="url"
                    value={formData.portfolioUrl}
                    onChange={(e) => handleChange('portfolioUrl', e.target.value)}
                    onBlur={() => handleBlur('portfolioUrl')}
                    placeholder="https://behance.net/yourportfolio or instagram.com/..."
                    disabled={isSubmitting}
                    aria-invalid={Boolean(errors.portfolioUrl)}
                    aria-describedby={errors.portfolioUrl ? 'portfolio-error' : undefined}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-950 border ${
                      errors.portfolioUrl
                        ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                        : 'border-neutral-800 focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600'
                    } text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors`}
                  />
                </div>
                {errors.portfolioUrl ? (
                  <p id="portfolio-error" className="text-xs text-red-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.portfolioUrl}</span>
                  </p>
                ) : (
                  <p className="text-[11px] text-neutral-500">
                    You can provide a Drive folder, YouTube video, Instagram profile, Behance, or ArtStation link.
                  </p>
                )}
              </div>

              {/* Checkbox: Agreement */}
              <div className="pt-2">
                <label
                  htmlFor="agreed-terms"
                  className="flex items-start gap-3 cursor-pointer group select-none"
                >
                  <div className="flex items-center justify-center shrink-0 mt-0.5">
                    <input
                      id="agreed-terms"
                      name="agreedToTerms"
                      type="checkbox"
                      checked={formData.agreedToTerms}
                      onChange={(e) => handleChange('agreedToTerms', e.target.checked)}
                      disabled={isSubmitting}
                      className="w-5 h-5 rounded accent-red-600 bg-neutral-950 border-neutral-700 cursor-pointer text-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-neutral-950"
                    />
                  </div>
                  <span className="text-xs sm:text-sm text-neutral-300 leading-snug">
                    I agree to be contacted by Abhay Create and the team regarding this animation opportunity and potential test projects.
                  </span>
                </label>
                {errors.agreedToTerms && (
                  <p className="text-xs text-red-400 flex items-center gap-1 mt-1.5 ml-8">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.agreedToTerms}</span>
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xl bg-red-600 hover:bg-red-500 active:scale-[0.99] disabled:opacity-60 disabled:pointer-events-none text-white font-bold text-base tracking-wide flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-red-600/30 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Submitting Application...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Application</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Privacy assurance */}
              <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-500 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                <span>Your contact details are stored securely and never shared with third parties.</span>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
