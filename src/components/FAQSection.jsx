import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { faqsData } from '../data/faqs';

export default function FAQSection({ onBookClick }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="py-24 md:py-32 bg-ivory text-charcoal relative">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-champagne/40 bg-white text-champagne-dark text-[11px] font-mono uppercase tracking-architectural mb-3 shadow-sm">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>CLARITY &amp; ADVICE</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif font-light tracking-tight text-charcoal leading-tight mb-4">
            Questions people <span className="italic font-normal">ask us.</span>
          </h2>
          <p className="text-base text-charcoal/70 font-light max-w-lg mx-auto">
            Everything you need to know about our design process, pricing approach, and consultations.
          </p>
        </div>

        {/* Clean Accordion */}
        <div className="space-y-4">
          {faqsData.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-white border-champagne shadow-luxury-gold'
                    : 'bg-white/70 border-beige hover:border-champagne/40 hover:bg-white'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full py-5 px-6 sm:px-8 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg sm:text-xl font-serif font-normal text-charcoal leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isOpen ? 'bg-champagne text-charcoal' : 'bg-ivory text-charcoal/60'
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-8 pb-6 pt-2 text-sm sm:text-base text-charcoal/75 font-light leading-relaxed border-t border-beige/60">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support callout */}
        <div className="mt-12 text-center text-xs text-charcoal/60">
          <span>Have a unique site condition or specific query? </span>
          <button
            onClick={onBookClick}
            className="text-champagne-dark font-medium underline underline-offset-4 hover:text-charcoal transition-colors ml-1"
          >
            Speak directly with our architectural team.
          </button>
        </div>
      </div>
    </section>
  );
}

