import React from 'react';
import { MessageSquare, Ruler, FileText, Palette, HardHat, KeyRound } from 'lucide-react';

const steps = [
  {
    step: "01",
    title: "Share Your Requirements",
    desc: "Fill the form, call or message us on WhatsApp with your city, property type and what you need.",
    icon: MessageSquare,
  },
  {
    step: "02",
    title: "Consultation and Site Visit",
    desc: "We discuss your plans and visit the property to take measurements and see the site conditions.",
    icon: Ruler,
  },
  {
    step: "03",
    title: "Design and Quotation",
    desc: "You receive a proposed layout and a written quotation based on your chosen scope and materials.",
    icon: FileText,
  },
  {
    step: "04",
    title: "Finalise Materials and Finishes",
    desc: "You review material options and confirm choices before work begins.",
    icon: Palette,
  },
  {
    step: "05",
    title: "Execution on Site",
    desc: "Work is carried out to the agreed scope and schedule, with updates from your point of contact.",
    icon: HardHat,
  },
  {
    step: "06",
    title: "Handover",
    desc: "We walk through the finished work with you and close out any pending items.",
    icon: KeyRound,
  },
];

export default function ProcessSection() {
  return (
    <section className="py-24 md:py-32 bg-ivory text-charcoal relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-2xl mb-20">
          <span className="text-[11px] font-mono uppercase tracking-architectural text-champagne-dark font-semibold block mb-3">
            HOW A PROJECT WORKS · STEP BY STEP
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light tracking-tight text-charcoal leading-tight mb-4">
            From first conversation to <span className="italic font-normal">final handover.</span>
          </h2>
          <p className="text-base text-charcoal/75 font-light leading-relaxed">
            A clear and considered process, with every stage planned around your home.
          </p>
        </div>

        {/* Process Timeline */}
        <div className="relative">
          {/* Connecting Line on Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[1.5px] bg-gradient-to-r from-champagne/10 via-champagne/40 to-champagne/10 -translate-y-8 z-0 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 relative z-10">
            {steps.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="bg-white p-6 rounded-xl border border-beige shadow-luxury hover:shadow-luxury-gold transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
                >
                  <div>
                    {/* Step Number and Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-2xl font-serif font-light text-champagne-dark group-hover:text-charcoal transition-colors">
                        {item.step}
                      </span>
                      <div className="w-10 h-10 rounded-full bg-ivory border border-champagne/30 flex items-center justify-center text-champagne-dark group-hover:bg-champagne group-hover:text-charcoal transition-all">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="text-lg font-serif font-medium text-charcoal mb-3 leading-snug group-hover:text-champagne-dark transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs text-charcoal/70 font-light leading-relaxed mt-2 pt-3 border-t border-beige/60">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

