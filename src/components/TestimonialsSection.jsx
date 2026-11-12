import React, { useState } from 'react';
import { Quote, ChevronLeft, ChevronRight, MessageSquareQuote, Star } from 'lucide-react';
import { testimonialsData } from '../data/testimonials';

export default function TestimonialsSection({ onBookClick }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const current = testimonialsData[currentIndex];

  return (
    <section className="py-24 md:py-32 bg-ivory text-charcoal relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <span className="text-[11px] font-mono uppercase tracking-architectural text-champagne-dark font-semibold block mb-3">
            CLIENT WORDS · AUTHENTIC FEEDBACK
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light tracking-tight text-charcoal leading-tight">
            Built on trust. <span className="italic font-normal">Remembered for the experience.</span>
          </h2>
        </div>

        {/* Editorial Quote Card Carousel */}
        <div className="relative bg-white rounded-2xl border border-beige p-8 sm:p-12 md:p-16 shadow-luxury overflow-hidden">
          <Quote className="absolute top-8 right-8 w-24 h-24 text-beige/40 pointer-events-none" />

          <div className="max-w-3xl relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-beige/50 text-charcoal text-xs font-mono uppercase tracking-widest border border-beige">
                <MessageSquareQuote className="w-3.5 h-3.5 text-champagne-dark" />
                <span>Verified Homeowner Reflection</span>
              </div>

              {/* 5-Star Client Rating */}
              <div className="flex items-center gap-1">
                {[...Array(current.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-champagne text-champagne" />
                ))}
              </div>
            </div>

            <blockquote className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-charcoal leading-snug italic mb-10">
              "{current.quote}"
            </blockquote>

            <div className="pt-6 border-t border-beige flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="font-mono text-sm sm:text-base font-medium text-charcoal">
                  {current.client}
                </p>
                <p className="text-xs text-charcoal/60 mt-0.5">
                  {current.project} · <span className="text-champagne-dark font-medium">{current.location}</span>
                </p>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-charcoal/50 mr-2">
                  0{currentIndex + 1} / 0{testimonialsData.length}
                </span>
                <button
                  onClick={prevReview}
                  className="w-10 h-10 rounded-full border border-charcoal/20 flex items-center justify-center text-charcoal hover:bg-champagne hover:border-champagne hover:text-charcoal transition-all"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextReview}
                  className="w-10 h-10 rounded-full border border-charcoal/20 flex items-center justify-center text-charcoal hover:bg-champagne hover:border-champagne hover:text-charcoal transition-all"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={onBookClick}
            className="text-xs uppercase tracking-architectural text-charcoal/70 hover:text-champagne-dark transition-colors font-medium pb-1 border-b border-charcoal/30 hover:border-champagne-dark"
          >
            View All Testimonials
          </button>
        </div>
      </div>
    </section>
  );
}

