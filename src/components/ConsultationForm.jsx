import React, { useState, useEffect } from 'react';
import { Send, Mail, CheckCircle2, AlertCircle, Phone, MessageSquare, Clock, Calendar } from 'lucide-react';

const CITIES = ["Hyderabad", "Bengaluru", "Tirupati", "Kurnool"];

const PROPERTY_TYPES = [
  "Apartment",
  "Independent House",
  "Villa",
  "New Construction",
  "Other"
];

const SERVICES = [
  "Turnkey Home Interiors",
  "Modular Kitchen",
  "Wardrobes and Storage",
  "False Ceilings and Lighting",
  "Home Renovation",
  "Residential Construction",
  "Multiple Services"
];

const BUDGETS = [
  "Under ₹5 Lakhs",
  "₹5–10 Lakhs",
  "₹10–20 Lakhs",
  "₹20–40 Lakhs",
  "₹40 Lakhs and Above",
  "Not Decided Yet"
];

const CONTACT_TIMES = ["Morning", "Afternoon", "Evening", "Anytime"];

export default function ConsultationForm({ prefilledCity = '', prefilledTheme = '' }) {
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    city: prefilledCity || 'Hyderabad',
    locality: '',
    propertyType: 'Apartment',
    serviceRequired: 'Turnkey Home Interiors',
    budget: '₹10–20 Lakhs',
    possessionDate: '',
    contactTime: 'Anytime',
    message: prefilledTheme ? `Selected Design Theme: ${prefilledTheme}` : '',
    consent: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successStatus, setSuccessStatus] = useState(null);

  useEffect(() => {
    if (prefilledCity) {
      setFormData(prev => ({ ...prev, city: prefilledCity }));
    }
  }, [prefilledCity]);

  useEffect(() => {
    if (prefilledTheme) {
      setFormData(prev => ({
        ...prev,
        message: prev.message.includes('Selected Design Theme')
          ? `Selected Design Theme: ${prefilledTheme}`
          : (prev.message ? `${prev.message}\nSelected Design Theme: ${prefilledTheme}` : `Selected Design Theme: ${prefilledTheme}`)
      }));
    }
  }, [prefilledTheme]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear inline error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) {
      errs.fullName = "Full name is required.";
    }

    const cleanedMobile = formData.mobile.replace(/\D/g, '');
    if (!cleanedMobile) {
      errs.mobile = "Mobile number is required.";
    } else if (!/^[6-9]\d{9}$/.test(cleanedMobile)) {
      errs.mobile = "Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.";
    }

    if (!formData.city) {
      errs.city = "Please select a city.";
    }

    if (!formData.locality.trim()) {
      errs.locality = "Locality or area is required.";
    }

    if (!formData.propertyType) {
      errs.propertyType = "Please select your property type.";
    }

    if (!formData.serviceRequired) {
      errs.serviceRequired = "Please select the service required.";
    }

    if (!formData.consent) {
      errs.consent = "You must agree to be contacted to submit this enquiry.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const formatMessageText = () => {
    return `Hello Trinity Team,
I would like to request a consultation for my home project.

Name: ${formData.fullName.trim()}
Mobile: ${formData.mobile.trim()}
City: ${formData.city}
Locality: ${formData.locality.trim()}
Property Type: ${formData.propertyType}
Service Required: ${formData.serviceRequired}
Approximate Budget: ${formData.budget || 'Not specified'}
Possession Date: ${formData.possessionDate || 'Not specified'}
Preferred Contact Time: ${formData.contactTime}
Additional Requirements: ${formData.message.trim() || 'None provided'}

Please contact me to discuss the project and arrange a consultation or site visit.
Thank you.`;
  };

  // WhatsApp Submission
  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const message = formatMessageText();
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/916309255122?text=${encodedMessage}`;

    // Show instant success feedback
    setSuccessStatus('whatsapp');
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setIsSubmitting(false);
    }, 400);
  };

  // Email Submission
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const message = formatMessageText();
    const subject = encodeURIComponent("New Website Enquiry – Trinity Constructions & Interiors");
    const body = encodeURIComponent(message);
    const mailtoUrl = `mailto:trinitycon.in@gmail.com?subject=${subject}&body=${body}`;

    setSuccessStatus('email');
    setTimeout(() => {
      window.location.href = mailtoUrl;
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <section id="consultation" className="py-24 md:py-32 bg-charcoal text-ivory relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <span className="text-[11px] font-mono uppercase tracking-architectural text-champagne font-semibold block mb-3">
            START YOUR JOURNEY · SITE VISITS &amp; QUOTATIONS
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light tracking-tight text-ivory leading-tight mb-4">
            Let's bring your <span className="italic font-normal text-champagne">vision home.</span>
          </h2>
          <p className="text-base text-ivory/75 font-light leading-relaxed">
            Tell us a little about your project. Our team will get in touch to arrange a consultation or site visit.
          </p>
        </div>

        {/* Two-Column Luxury Form Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-charcoal-dark rounded-2xl border border-champagne/25 p-6 sm:p-10 md:p-12 shadow-luxury-dark">
          {/* Left Column: Direct Contacts & Context */}
          <div className="lg:col-span-4 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-champagne/20 pb-8 lg:pb-0 lg:pr-8">
            <div>
              <h3 className="text-2xl font-serif font-light text-ivory mb-4">
                Trinity Consultation Desk
              </h3>
              <p className="text-xs sm:text-sm text-ivory/70 font-light leading-relaxed mb-8">
                Share your floor plans, plot measurements, or interior vision. We operate across Hyderabad, Bengaluru, Tirupati, and Kurnool with transparent material schedules.
              </p>

              <div className="space-y-5 text-xs text-ivory/80">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded bg-charcoal border border-champagne/30 text-champagne">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-champagne/70 block">Direct Line</span>
                    <a href="tel:+916309255122" className="hover:text-champagne transition-colors font-mono text-sm">
                      +91 6309255122
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded bg-charcoal border border-champagne/30 text-champagne">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-champagne/70 block">Official Enquiries</span>
                    <a href="mailto:trinitycon.in@gmail.com" className="hover:text-champagne transition-colors font-mono">
                      trinitycon.in@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded bg-charcoal border border-champagne/30 text-champagne">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-champagne/70 block">Working Hours</span>
                    <span className="font-mono">9:00 AM – 10:00 PM (Mon – Sun)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Note on Transparency */}
            <div className="mt-8 p-4 rounded-lg bg-charcoal/80 border border-champagne/15 text-[11px] text-ivory/60 leading-relaxed">
              <span className="text-champagne font-medium block mb-1">Direct Delivery Guarantee:</span>
              Clicking "Request Consultation" opens a pre-composed message in WhatsApp directly addressed to our senior architectural team with zero intermediaries.
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <form className="lg:col-span-8 space-y-6" noValidate>
            {/* Row 1: Full Name & Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest font-medium text-ivory/90 mb-2">
                  Full Name <span className="text-champagne">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Aditi Rao"
                  className={`w-full bg-charcoal border rounded px-4 py-3 text-sm text-ivory placeholder-ivory/30 focus:outline-none transition-colors ${
                    errors.fullName ? 'border-champagne-light ring-1 ring-champagne' : 'border-champagne/30 focus:border-champagne'
                  }`}
                  required
                />
                {errors.fullName && (
                  <p className="text-champagne text-[11px] mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest font-medium text-ivory/90 mb-2">
                  Mobile Number <span className="text-champagne">*</span>
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="10-digit Indian mobile (e.g. 9876543210)"
                  maxLength={10}
                  className={`w-full bg-charcoal border rounded px-4 py-3 text-sm text-ivory placeholder-ivory/30 focus:outline-none transition-colors ${
                    errors.mobile ? 'border-champagne-light ring-1 ring-champagne' : 'border-champagne/30 focus:border-champagne'
                  }`}
                  required
                />
                <span className="text-[10px] text-ivory/50 mt-1 block">
                  Used for voice calls or WhatsApp correspondence.
                </span>
                {errors.mobile && (
                  <p className="text-champagne text-[11px] mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.mobile}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Row 2: City & Locality */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest font-medium text-ivory/90 mb-2">
                  City <span className="text-champagne">*</span>
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full bg-charcoal border border-champagne/30 rounded px-4 py-3 text-sm text-ivory focus:outline-none focus:border-champagne transition-colors"
                  required
                >
                  {CITIES.map(c => (
                    <option key={c} value={c} className="bg-charcoal text-ivory">{c}</option>
                  ))}
                </select>
                {errors.city && (
                  <p className="text-champagne text-[11px] mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.city}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest font-medium text-ivory/90 mb-2">
                  Locality or Area <span className="text-champagne">*</span>
                </label>
                <input
                  type="text"
                  name="locality"
                  value={formData.locality}
                  onChange={handleChange}
                  placeholder="e.g. Jubilee Hills, Whitefield, etc."
                  className={`w-full bg-charcoal border rounded px-4 py-3 text-sm text-ivory placeholder-ivory/30 focus:outline-none transition-colors ${
                    errors.locality ? 'border-champagne-light ring-1 ring-champagne' : 'border-champagne/30 focus:border-champagne'
                  }`}
                  required
                />
                {errors.locality && (
                  <p className="text-champagne text-[11px] mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.locality}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Row 3: Property Type & Service Required */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest font-medium text-ivory/90 mb-2">
                  Property Type <span className="text-champagne">*</span>
                </label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full bg-charcoal border border-champagne/30 rounded px-4 py-3 text-sm text-ivory focus:outline-none focus:border-champagne transition-colors"
                  required
                >
                  {PROPERTY_TYPES.map(pt => (
                    <option key={pt} value={pt} className="bg-charcoal text-ivory">{pt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest font-medium text-ivory/90 mb-2">
                  Service Required <span className="text-champagne">*</span>
                </label>
                <select
                  name="serviceRequired"
                  value={formData.serviceRequired}
                  onChange={handleChange}
                  className="w-full bg-charcoal border border-champagne/30 rounded px-4 py-3 text-sm text-ivory focus:outline-none focus:border-champagne transition-colors"
                  required
                >
                  {SERVICES.map(s => (
                    <option key={s} value={s} className="bg-charcoal text-ivory">{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 4: Budget & Possession Date (Optional) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest font-medium text-ivory/90 mb-2">
                  Approximate Budget <span className="text-ivory/40 font-normal">(Optional)</span>
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full bg-charcoal border border-champagne/30 rounded px-4 py-3 text-sm text-ivory focus:outline-none focus:border-champagne transition-colors"
                >
                  {BUDGETS.map(b => (
                    <option key={b} value={b} className="bg-charcoal text-ivory">{b}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest font-medium text-ivory/90 mb-2">
                  Possession / Handover Date <span className="text-ivory/40 font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="possessionDate"
                    value={formData.possessionDate}
                    onChange={handleChange}
                    className="w-full bg-charcoal border border-champagne/30 rounded px-4 py-3 text-sm text-ivory focus:outline-none focus:border-champagne transition-colors [color-scheme:dark]"
                  />
                </div>
              </div>
            </div>

            {/* Row 5: Preferred Contact Time */}
            <div>
              <label className="block text-xs uppercase tracking-widest font-medium text-ivory/90 mb-2">
                Preferred Contact Time
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {CONTACT_TIMES.map(time => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setFormData(p => ({ ...p, contactTime: time }))}
                    className={`py-2 px-3 rounded text-xs font-mono uppercase tracking-wider border transition-all ${
                      formData.contactTime === time
                        ? 'bg-champagne text-charcoal border-champagne font-semibold shadow-sm'
                        : 'bg-charcoal border-champagne/25 text-ivory/70 hover:border-champagne/50'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Row 6: Additional Information */}
            <div>
              <label className="block text-xs uppercase tracking-widest font-medium text-ivory/90 mb-2">
                Anything Else We Should Know? <span className="text-ivory/40 font-normal">(Optional)</span>
              </label>
              <textarea
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleChange}
                placeholder="Number of rooms, design aesthetics preferred, specific project timeline or site conditions..."
                className="w-full bg-charcoal border border-champagne/30 rounded px-4 py-3 text-sm text-ivory placeholder-ivory/30 focus:outline-none focus:border-champagne transition-colors"
              />
            </div>

            {/* Consent Checkbox */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer text-xs text-ivory/80 leading-relaxed select-none">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  className="mt-0.5 w-4 h-4 rounded border-champagne/40 bg-charcoal accent-champagne focus:ring-0"
                  required
                />
                <span>
                  I agree to be contacted by call or WhatsApp about this enquiry. I have read the Privacy Policy. <span className="text-champagne">*</span>
                </span>
              </label>
              {errors.consent && (
                <p className="text-champagne text-[11px] mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.consent}</span>
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleWhatsAppSubmit}
                className="btn-luxury-gold flex-1 py-4 px-6 rounded text-xs tracking-widest font-semibold flex items-center justify-center gap-2 group shadow-luxury"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{isSubmitting ? 'Opening WhatsApp...' : 'Request Consultation'}</span>
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleEmailSubmit}
                className="btn-luxury-outline py-4 px-6 rounded text-xs tracking-widest font-semibold flex items-center justify-center gap-2 hover:bg-champagne/10"
              >
                <Mail className="w-4 h-4" />
                <span>Send Enquiry via Email</span>
              </button>
            </div>

            {/* Success Feedback Banner */}
            {successStatus && (
              <div className="p-4 rounded-lg bg-champagne/15 border border-champagne text-xs text-ivory flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-champagne shrink-0" />
                <p>
                  Enquiry formatted successfully! Opening your {successStatus === 'whatsapp' ? 'WhatsApp application' : 'email draft'} to deliver your project requirements to Trinity at +91 6309255122.
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

