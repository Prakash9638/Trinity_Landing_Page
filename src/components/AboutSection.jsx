import React from 'react';
import { Compass, ShieldCheck, Award, Layers } from 'lucide-react';

const LOGO_SRC = "/Logo/%E2%80%9CDesigned%20with%20vision.%20Crafted%20with%20purpose.%20Defined%20by%20Trinity.%E2%80%9D.png";

export default function AboutSection({ onBookClick }) {
  return (
    <section id="about" className="py-24 md:py-32 bg-charcoal text-ivory relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Main Grid: Editorial Architecture Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          {/* Left Column: Image & Logo Lockup */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-champagne/30 shadow-luxury-dark bg-charcoal-dark">
              <img
                src="/Living room styles/Royal Terracotta & Ochre.jpg"
                alt="Trinity Architectural Craftsmanship"
                className="w-full aspect-[4/5] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />

              {/* Logo Lockup Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-charcoal border border-champagne/30 flex items-center gap-4">
                <div className="bg-ivory p-2 rounded-sm shrink-0">
                  <img
                    src={LOGO_SRC}
                    alt="Trinity Logo Emblem"
                    className="h-12 w-auto object-contain"
                  />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-champagne">
                    Trinity Signature Standard
                  </p>
                  <p className="text-xs font-serif italic text-ivory/90 leading-tight mt-0.5">
                    "Designed with vision. Crafted with purpose. Defined by Trinity."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative */}
          <div className="lg:col-span-7">
            <span className="text-[11px] font-mono uppercase tracking-architectural text-champagne font-semibold block mb-4">
              ABOUT TRINITY CONSTRUCTIONS &amp; INTERIORS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light tracking-tight text-ivory leading-tight mb-8">
              Designed with vision. Crafted with purpose.{' '}
              <span className="italic font-normal text-champagne">Defined by Trinity.</span>
            </h2>

            <div className="space-y-6 text-sm sm:text-base text-ivory/80 font-light leading-relaxed mb-10">
              <p>
                Trinity Constructions and Interiors is a residential architectural and turnkey interior studio serving homeowners across Hyderabad, Bengaluru, Tirupati, and Kurnool. We believe that a true home is not just an assembly of decorative objects, but a tailored environment built around the rituals, rhythms, and habits of the people who dwell inside it.
              </p>
              <p>
                Our philosophy bridges intentional architectural layout planning with uncompromising on-site craftsmanship. From initial spatial planning and 3D architectural visualisation to modular joinery, false ceiling acoustics, lighting design, and civil construction on private plots—every single dimension is considered inch by inch.
              </p>
              <p>
                We collaborate directly with homeowners who value honesty in materials, durability in hardware, and structured transparency in timelines and quotations.
              </p>
            </div>

            {/* Core Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-champagne/20">
              <div className="p-4 rounded-lg bg-charcoal-light/50 border border-champagne/15">
                <div className="flex items-center gap-2.5 text-champagne font-serif text-lg mb-1">
                  <Compass className="w-4 h-4" />
                  <h4>Holistic Spatial Vision</h4>
                </div>
                <p className="text-xs text-ivory/70 font-light leading-relaxed">
                  Every joinery unit, ceiling beam, and lighting circuit is planned cohesively as one unified architectural composition.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-charcoal-light/50 border border-champagne/15">
                <div className="flex items-center gap-2.5 text-champagne font-serif text-lg mb-1">
                  <Layers className="w-4 h-4" />
                  <h4>Material Honesty</h4>
                </div>
                <p className="text-xs text-ivory/70 font-light leading-relaxed">
                  Authentic commercial ply, certified hardware, precision edge-banding, and calibrated stonework that withstands daily living.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators (Verified Credentials & Governance) */}
        <div className="pt-12 border-t border-champagne/20">
          <p className="text-[11px] font-mono uppercase tracking-architectural text-champagne/80 text-center mb-8">
            VERIFIED CREDENTIALS &amp; GOVERNANCE
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl bg-charcoal-dark border border-champagne/20 text-center hover:border-champagne/50 transition-all duration-300 group">
              <ShieldCheck className="w-6 h-6 text-champagne mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-xs uppercase tracking-widest text-ivory/60 mb-1.5 font-mono">Experience</p>
              <p className="font-serif text-xl sm:text-2xl text-champagne font-semibold mb-1">5 Years</p>
              <p className="text-[11px] text-ivory/60 font-light">Dedicated Turnkey Practice</p>
            </div>

            <div className="p-6 rounded-xl bg-charcoal-dark border border-champagne/20 text-center hover:border-champagne/50 transition-all duration-300 group">
              <Award className="w-6 h-6 text-champagne mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-xs uppercase tracking-widest text-ivory/60 mb-1.5 font-mono">Delivered Residences</p>
              <p className="font-serif text-xl sm:text-2xl text-champagne font-semibold mb-1">150+ Projects</p>
              <p className="text-[11px] text-ivory/60 font-light">Completed Across 4 Cities</p>
            </div>

            <div className="p-6 rounded-xl bg-charcoal-dark border border-champagne/20 text-center hover:border-champagne/50 transition-all duration-300 group">
              <ShieldCheck className="w-6 h-6 text-champagne mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-xs uppercase tracking-widest text-ivory/60 mb-1.5 font-mono">Accreditations</p>
              <p className="font-serif text-xl sm:text-2xl text-champagne font-semibold mb-1">Licensed &amp; Certified</p>
              <p className="text-[11px] text-ivory/60 font-light">COA Registered &amp; ISO Standards</p>
            </div>

            <div className="p-6 rounded-xl bg-charcoal-dark border border-champagne/20 text-center hover:border-champagne/50 transition-all duration-300 group">
              <Award className="w-6 h-6 text-champagne mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-xs uppercase tracking-widest text-ivory/60 mb-1.5 font-mono">Quality Assurance</p>
              <p className="font-serif text-xl sm:text-2xl text-champagne font-semibold mb-1">Up to 10-Year Warranty</p>
              <p className="text-[11px] text-ivory/60 font-light">BWP Marine Ply &amp; Hardware</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

