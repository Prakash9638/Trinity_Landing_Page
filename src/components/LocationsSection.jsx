import React from 'react';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { locationsData } from '../data/locations';

export default function LocationsSection({ onCitySelect }) {
  return (
    <section className="py-24 md:py-32 bg-beige/40 text-charcoal relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <span className="text-[11px] font-mono uppercase tracking-architectural text-champagne-dark font-semibold block mb-3">
            WHERE WE WORK · CITY HUBS
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light tracking-tight text-charcoal leading-tight mb-4">
            Local understanding. <span className="italic font-normal">Thoughtful execution.</span>
          </h2>
          <p className="text-base text-charcoal/75 font-light leading-relaxed">
            We take enquiries from four cities across Telangana, Karnataka, and Andhra Pradesh.
          </p>
        </div>

        {/* 4 Cities Presentation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {locationsData.map((loc) => (
            <div
              key={loc.city}
              className="bg-white rounded-xl overflow-hidden border border-beige shadow-luxury hover:shadow-luxury-gold transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
            >
              <div className="relative h-48 overflow-hidden bg-charcoal">
                <img
                  src={loc.image}
                  alt={loc.city}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded bg-charcoal/80 backdrop-blur-md text-ivory border border-champagne/30">
                    {loc.tagline}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-3xl font-serif font-light text-ivory flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-champagne" />
                    <span>{loc.city}</span>
                  </h3>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="mb-6">
                  <p className="text-[11px] uppercase tracking-architectural text-champagne-dark font-medium mb-1">
                    Locality Coverage
                  </p>
                  <p className="text-xs font-mono text-charcoal/70 bg-ivory p-3 rounded border border-beige/80">
                    {loc.localities}
                  </p>
                </div>

                <button
                  onClick={() => onCitySelect(loc.city)}
                  className="w-full py-2.5 px-4 rounded text-xs uppercase tracking-widest font-semibold border border-charcoal/20 hover:border-champagne hover:bg-champagne hover:text-charcoal transition-all flex items-center justify-center gap-2 group/btn"
                >
                  <span>{loc.cta}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

