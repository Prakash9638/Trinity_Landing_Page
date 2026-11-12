import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { servicesData } from '../data/services';

export default function ServicesSection({ onBookClick }) {
  const [activeTab, setActiveTab] = useState('All');

  const filteredServices = activeTab === 'All'
    ? servicesData
    : servicesData.filter(s => s.category.toLowerCase() === activeTab.toLowerCase());

  return (
    <section id="services" className="py-24 md:py-32 bg-ivory text-charcoal relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-charcoal/10 pb-12">
          <div className="max-w-2xl">
            <span className="text-[11px] font-mono uppercase tracking-architectural text-champagne-dark font-semibold block mb-3">
              WHAT WE DO · CRAFT &amp; DISCIPLINE
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light tracking-tight text-charcoal leading-[1.1]">
              Spaces designed around <span className="italic font-normal">your lifestyle.</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-base text-charcoal/75 font-light leading-relaxed mb-6">
              Interiors, renovation and construction for homes, thoughtfully planned and carefully executed.
            </p>
            {/* Navigation links requested in prompt */}
            <div className="flex flex-wrap gap-4 text-xs tracking-wider uppercase font-medium">
              <button
                onClick={() => setActiveTab('Interiors')}
                className={`pb-1 border-b-2 transition-all ${
                  activeTab === 'Interiors'
                    ? 'border-champagne text-charcoal font-semibold'
                    : 'border-transparent text-charcoal/60 hover:text-charcoal'
                }`}
              >
                Explore Interior Services
              </button>
              <span className="text-charcoal/30">|</span>
              <button
                onClick={() => setActiveTab('Construction')}
                className={`pb-1 border-b-2 transition-all ${
                  activeTab === 'Construction'
                    ? 'border-champagne text-charcoal font-semibold'
                    : 'border-transparent text-charcoal/60 hover:text-charcoal'
                }`}
              >
                Explore Construction Services
              </button>
              <span className="text-charcoal/30">|</span>
              <button
                onClick={() => setActiveTab('All')}
                className={`pb-1 border-b-2 transition-all ${
                  activeTab === 'All'
                    ? 'border-champagne text-charcoal font-semibold'
                    : 'border-transparent text-charcoal/60 hover:text-charcoal'
                }`}
              >
                View All (6)
              </button>
            </div>
          </div>
        </div>

        {/* Uniform, Responsive 3-Column Grid: All Cards Same Size */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group flex flex-col justify-between bg-white rounded-xl overflow-hidden border border-beige shadow-luxury hover:shadow-luxury-gold transition-all duration-500 h-full hover:-translate-y-1.5"
            >
              {/* Image Container with Consistent Equal Dimensions */}
              <div className="relative overflow-hidden bg-charcoal h-64 sm:h-72 w-full">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

                {/* Service Number & Category Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="text-xs font-mono font-medium px-2.5 py-1 rounded bg-charcoal/80 backdrop-blur-md text-ivory border border-champagne/30">
                    {service.id}
                  </span>
                  <span className="text-[10px] uppercase tracking-architectural font-medium px-2.5 py-1 rounded bg-ivory/90 backdrop-blur-md text-charcoal">
                    {service.category}
                  </span>
                </div>
              </div>

              {/* Service Details */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-serif font-normal text-charcoal group-hover:text-champagne-dark transition-colors leading-snug mb-2">
                    {service.title}
                  </h3>

                  <p className="text-xs font-mono uppercase tracking-widest text-champagne-dark mb-3">
                    {service.tagline}
                  </p>

                  <p className="text-sm text-charcoal/75 font-light leading-relaxed mb-6 min-h-[4rem]">
                    {service.description}
                  </p>
                </div>

                {/* Scope Highlights & Action */}
                <div className="pt-4 border-t border-beige/60">
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {service.scope.map((item, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-charcoal/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-champagne shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={onBookClick}
                    className="w-full py-2.5 text-xs uppercase tracking-widest font-medium border border-charcoal/20 rounded hover:border-champagne hover:bg-champagne hover:text-charcoal transition-all"
                  >
                    Enquire for {service.title}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
