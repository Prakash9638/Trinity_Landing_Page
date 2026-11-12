import React from 'react';
import { Phone, Mail, Clock, MapPin, ArrowUpRight } from 'lucide-react';

const LOGO_SRC = "/Logo/%E2%80%9CDesigned%20with%20vision.%20Crafted%20with%20purpose.%20Defined%20by%20Trinity.%E2%80%9D.png";

export default function Footer({ onCitySelect, onBookClick }) {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-charcoal text-ivory pt-20 pb-12 border-t border-champagne/20 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-champagne/15">
          {/* Column 1: Brand & Tagline (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-ivory/95 inline-block p-2 rounded-sm border border-champagne/30 shadow-sm">
              <img
                src={LOGO_SRC}
                alt="Trinity Constructions & Interiors"
                className="h-14 w-auto object-contain"
                loading="lazy"
              />
            </div>

            <div>
              <p className="font-serif italic text-base text-champagne leading-snug">
                "Designed with vision. Crafted with purpose. Defined by Trinity."
              </p>
              <p className="text-xs text-ivory/70 font-light mt-2 max-w-sm leading-relaxed">
                Interiors and residential construction in Hyderabad, Bengaluru, Tirupati and Kurnool.
              </p>
            </div>

            {/* Quick Action */}
            <div className="pt-2">
              <button
                onClick={onBookClick}
                className="btn-luxury-gold px-6 py-2.5 rounded text-[11px] font-semibold flex items-center gap-2 group"
              >
                <span>Book Consultation</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>

          {/* Column 2: Pages (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-architectural text-champagne font-semibold border-b border-champagne/20 pb-2">
              Pages &amp; Portfolio
            </h4>
            <ul className="space-y-2 text-xs text-ivory/80 font-light">
              <li>
                <button onClick={() => scrollTo('#services')} className="hover:text-champagne transition-colors">
                  Interiors
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#services')} className="hover:text-champagne transition-colors">
                  Construction
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#themes')} className="hover:text-champagne transition-colors">
                  Living Room Themes
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#projects')} className="hover:text-champagne transition-colors">
                  Projects Gallery
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#about')} className="hover:text-champagne transition-colors">
                  About Trinity
                </button>
              </li>
              <li>
                <button onClick={() => onCitySelect('Hyderabad')} className="hover:text-champagne transition-colors">
                  Hyderabad Interiors
                </button>
              </li>
              <li>
                <button onClick={() => onCitySelect('Kurnool')} className="hover:text-champagne transition-colors">
                  Kurnool Interiors
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#consultation')} className="hover:text-champagne transition-colors">
                  Contact &amp; Site Visits
                </button>
              </li>
              <li>
                <span className="text-ivory/40">Privacy Policy (Terms of Service)</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Service Locations (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-architectural text-champagne font-semibold border-b border-champagne/20 pb-2">
              Service Locations
            </h4>
            <ul className="space-y-2.5 text-xs text-ivory/80">
              {["Hyderabad", "Bengaluru", "Tirupati", "Kurnool"].map(city => (
                <li key={city}>
                  <button
                    onClick={() => onCitySelect(city)}
                    className="hover:text-champagne transition-colors flex items-center gap-1.5 group"
                  >
                    <MapPin className="w-3.5 h-3.5 text-champagne/60 group-hover:text-champagne" />
                    <span>{city}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Office (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-architectural text-champagne font-semibold border-b border-champagne/20 pb-2">
              Contact Desk
            </h4>
            <div className="space-y-3 text-xs text-ivory/80">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-champagne shrink-0" />
                <a href="tel:+916309255122" className="hover:text-champagne font-mono">
                  +91 6309255122
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-champagne shrink-0" />
                <a href="mailto:trinitycon.in@gmail.com" className="hover:text-champagne font-mono truncate">
                  trinitycon.in@gmail.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-champagne shrink-0" />
                <span>9 AM – 10 PM</span>
              </p>

              {/* Editable Placeholders from requirements */}
              <div className="pt-2 text-[11px] text-ivory/50 space-y-1">
                <p>Kurnool - 518004 Andhra Pradesh</p>
                {/* <p>[ADD: GSTIN or registration details, if the client wants them displayed]</p> */}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-ivory/60 gap-4">
          <p>© 2026 Trinity Constructions &amp; Interiors. All rights reserved.</p>
          <p className="font-serif italic text-champagne/80">
            Inch by inch · Vision to execution
          </p>
        </div>
      </div>
    </footer>
  );
}

