import React from 'react';
import { ArrowUpRight, MessageSquare, Phone } from 'lucide-react';

export default function FinalCTA({ onBookClick }) {
  return (
    <section className="relative py-28 md:py-36 bg-charcoal text-ivory overflow-hidden">
      {/* Background Architectural Image with Luxury Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/Trinity annimation photos for home page/ezgif-frame-179.jpg"
          alt="Trinity Luxury Home Interior"
          className="w-full h-full object-cover opacity-30 scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/85 to-charcoal" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(182,155,114,0.18),_transparent_75%)]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center">
        <span className="text-[11px] font-mono uppercase tracking-architectural text-champagne font-semibold block mb-4">
          YOUR RESIDENCE · OUR CRAFT
        </span>

        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light tracking-tight text-ivory mb-6 leading-tight">
          Planning a <span className="italic font-normal text-champagne">home project?</span>
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-ivory/80 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
          Tell us what you need. We will get in touch to arrange a consultation or site visit.
        </p>

        {/* 3 Buttons from prompt */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onBookClick}
            className="btn-luxury-gold px-8 py-4 rounded text-xs tracking-widest font-semibold flex items-center gap-2 group shadow-luxury"
          >
            <span>Book Consultation</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          <a
            href="https://wa.me/916309255122"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-4 rounded text-xs tracking-widest uppercase font-semibold border border-champagne/40 text-champagne hover:bg-champagne hover:text-charcoal transition-all flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>

          <a
            href="tel:+916309255122"
            className="px-7 py-4 rounded text-xs tracking-widest uppercase font-semibold border border-champagne/20 text-ivory hover:border-champagne/60 hover:text-champagne transition-all flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>Call +91 6309255122</span>
          </a>
        </div>
      </div>
    </section>
  );
}

