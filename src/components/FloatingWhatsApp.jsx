import React, { useState } from 'react';
import { Phone, X } from 'lucide-react';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <aside
      aria-label="Contact Trinity Quick Actions"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-center sm:items-end gap-3 pointer-events-auto select-none"
    >
      {/* 1. Dismissible Quick Consultation Pill */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2.5 bg-charcoal/95 text-ivory text-xs px-3.5 py-2 rounded-full border border-champagne/35 shadow-luxury-dark backdrop-blur-md animate-fadeIn mr-1">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
          <span className="font-light tracking-wide">
            Direct Line: <strong className="font-medium text-champagne">6309255122</strong>
          </span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-ivory/50 hover:text-champagne ml-1 p-0.5 transition-colors"
            aria-label="Dismiss quick action pill"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 2. Direct Phone Call Button (Launches Native Phone Dialer) */}
      <div className="relative group flex items-center justify-center">
        {/* Soft Gold / Champagne Base Halo Disc */}
        <div className="absolute w-[68px] h-[68px] rounded-full bg-champagne/15 border border-champagne/25 pointer-events-none" />

        {/* Animated Sonar Ripple Waves */}
        <span className="absolute w-[68px] h-[68px] rounded-full bg-champagne/30 animate-widget-ripple-1 pointer-events-none" />
        <span className="absolute w-[68px] h-[68px] rounded-full bg-champagne/20 animate-widget-ripple-2 pointer-events-none" />

        {/* Desktop Hover Tooltip */}
        <span className="hidden sm:block absolute right-16 px-2.5 py-1 bg-charcoal text-ivory text-[11px] font-mono rounded border border-champagne/30 shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
          Call 6309255122
        </span>

        {/* Action Anchor */}
        <a
          href="tel:6309255122"
          aria-label="Direct Phone Call to Trinity Constructions at 6309255122"
          className="relative w-12 h-12 rounded-full bg-charcoal text-champagne border-2 border-champagne shadow-[0_4px_18px_rgba(0,0,0,0.35)] hover:bg-champagne hover:text-charcoal hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-champagne focus:ring-offset-2"
        >
          <Phone className="w-5 h-5 transition-transform" />
        </a>
      </div>

      {/* 3. WhatsApp Button (EXACT REPLICA OF USER REFERENCE IMAGE) */}
      <div className="relative group flex items-center justify-center">
        {/* Soft Mint Green Outer Halo Disc (matches user's screenshot background disc) */}
        <div className="absolute w-[80px] h-[80px] sm:w-[86px] sm:h-[86px] rounded-full bg-[#25D366]/18 border border-[#25D366]/20 pointer-events-none" />

        {/* Continuous Radar / Sonar Ripple Waves */}
        <span className="absolute w-[80px] h-[80px] sm:w-[86px] sm:h-[86px] rounded-full bg-[#25D366]/30 animate-widget-ripple-1 pointer-events-none" />
        <span className="absolute w-[80px] h-[80px] sm:w-[86px] sm:h-[86px] rounded-full bg-[#25D366]/20 animate-widget-ripple-2 pointer-events-none" />

        {/* Desktop Hover Tooltip */}
        <span className="hidden sm:block absolute right-20 px-2.5 py-1 bg-charcoal text-ivory text-[11px] font-mono rounded border border-champagne/30 shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
          WhatsApp 6309255122
        </span>

        {/* Main WhatsApp Button */}
        <a
          href="https://wa.me/916309255122?text=Hello%20Trinity%20Team%2C%20I%20would%20like%20to%20discuss%20a%20home%20interior%20or%20construction%20project."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp with Trinity (+91 6309255122)"
          className="relative w-14 h-14 sm:w-[58px] sm:h-[58px] rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.48)] hover:shadow-[0_10px_32px_rgba(37,211,102,0.7)] hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 animate-subtle-bob"
        >
          {/* Exact Speech Bubble Circular Ring Glyph from User Reference */}
          <svg
            viewBox="0 0 48 48"
            className="w-7 h-7 sm:w-8 sm:h-8 fill-white"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M24 9.5C32.008 9.5 38.5 15.992 38.5 24C38.5 32.008 32.008 38.5 24 38.5C21.68 38.5 19.49 37.95 17.55 36.98L11 39L13.08 32.72C11.16 30.28 10 27.28 10 24C10 15.992 16.492 9.5 24 9.5ZM24 16.8C20.024 16.8 16.8 20.024 16.8 24C16.8 27.976 20.024 31.2 24 31.2C27.976 31.2 31.2 27.976 31.2 24C31.2 20.024 27.976 16.8 24 16.8Z"
            />
          </svg>
        </a>
      </div>
    </aside>
  );
}

