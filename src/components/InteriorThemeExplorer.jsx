import React, { useState } from 'react';
import { ArrowUpRight, Palette, Sparkles } from 'lucide-react';
import { themesData } from '../data/themes';

export default function InteriorThemeExplorer({ onBookClick }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(null);

  const activeIndex = hoverIndex !== null ? hoverIndex : selectedIndex;
  const currentTheme = themesData[activeIndex];

  return (
    <section id="themes" className="py-16 md:py-20 bg-charcoal text-ivory relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-champagne/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-champagne/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        {/* Compact Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-champagne/20 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-champagne/30 bg-charcoal-light/60 text-champagne text-[10px] font-mono uppercase tracking-architectural mb-2">
              <Palette className="w-3 h-3" />
              <span>Interactive Style Studio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-light tracking-tight text-ivory">
              Discover your style. <span className="italic font-normal text-champagne">Imagine your space.</span>
            </h2>
          </div>
          <p className="text-xs text-ivory/70 font-light max-w-sm sm:text-right">
            Hover to preview · Click to lock theme
          </p>
        </div>

        {/* Compact Main Image Stage: 100% CLEAN - ZERO TEXT OVERLAY */}
        <div className="relative rounded-xl overflow-hidden border border-champagne/30 shadow-luxury-dark bg-charcoal-dark mb-6">
          {/* Constrained compact height (max-h-[420px]) so buttons & image fit on screen together */}
          <div className="relative aspect-[16/9] max-h-[420px] w-full overflow-hidden bg-charcoal">
            {themesData.map((theme, idx) => (
              <img
                key={theme.id}
                src={theme.image}
                alt={theme.name}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
                  idx === activeIndex ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-102 z-0'
                }`}
                loading={idx === 0 ? "eager" : "lazy"}
              />
            ))}
          </div>
        </div>

        {/* Five Compact Theme Selector Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-6">
          {themesData.map((theme, idx) => {
            const isActive = idx === selectedIndex;
            const isCurrent = idx === activeIndex;

            return (
              <button
                key={theme.id}
                onClick={() => setSelectedIndex(idx)}
                onMouseEnter={() => setHoverIndex(idx)}
                onMouseLeave={() => setHoverIndex(null)}
                className={`relative text-left p-3 rounded-lg border transition-all duration-200 flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-charcoal-light border-champagne shadow-sm ring-1 ring-champagne/50'
                    : 'bg-charcoal-dark/70 border-champagne/15 hover:border-champagne/40 hover:bg-charcoal-light/40'
                }`}
                aria-pressed={isActive}
              >
                <div className="flex items-center justify-between mb-1.5 w-full">
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                    isCurrent ? 'bg-champagne text-charcoal' : 'text-ivory/50 bg-charcoal'
                  }`}>
                    {theme.id}
                  </span>
                  {isActive && (
                    <span className="text-[9px] uppercase font-mono tracking-wider text-champagne flex items-center gap-0.5 font-semibold">
                      <Sparkles className="w-2.5 h-2.5" />
                      Active
                    </span>
                  )}
                </div>

                <h4 className={`text-xs font-serif font-medium truncate transition-colors ${
                  isCurrent ? 'text-champagne-light font-semibold' : 'text-ivory'
                }`}>
                  {theme.name}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Clean Theme Information Bar (Positioned outside & underneath the image) */}
        <div className="bg-charcoal-dark p-5 rounded-xl border border-champagne/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-champagne font-bold">{currentTheme.id} / 05</span>
              <span className="text-champagne/40">·</span>
              <span className="text-xs uppercase tracking-architectural text-champagne font-medium">{currentTheme.subtitle}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-light text-ivory mb-2">
              {currentTheme.name}
            </h3>
            <p className="text-xs sm:text-sm text-ivory/80 font-light leading-relaxed mb-3">
              {currentTheme.description}
            </p>

            {/* Highlights */}
            <div className="flex flex-wrap gap-1.5">
              {currentTheme.highlights.map((h, i) => (
                <span
                  key={i}
                  className="text-[10px] px-2 py-0.5 rounded bg-charcoal text-ivory/80 border border-champagne/20"
                >
                  {h}
                </span>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => onBookClick(currentTheme.name)}
            className="btn-luxury-gold px-5 py-2.5 rounded text-xs tracking-wider font-semibold flex items-center gap-1.5 self-start md:self-auto shrink-0 shadow-sm"
          >
            <span>Design In This Style</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
