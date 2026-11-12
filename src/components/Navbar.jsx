import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, MessageSquare } from 'lucide-react';

const LOGO_SRC = "/Logo/logo_.png";

export default function Navbar({ onBookClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Interiors', href: '#services' },
    { name: 'Construction', href: '#services' },
    { name: 'Themes', href: '#themes' },
    { name: 'Projects', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#consultation' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const top = target.getBoundingClientRect().top + window.pageYOffset - 60;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-charcoal/95 backdrop-blur-md py-1.5 md:py-2 border-b border-champagne/20 shadow-luxury-dark'
            : 'bg-charcoal/80 backdrop-blur-sm py-2 md:py-2.5 border-b border-champagne/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo Lockup: Clean Transparent Emblem + Architectural Typography */}
          <a
            href="#"
            className="flex items-center gap-2.5 group focus:outline-none"
            aria-label="Trinity Constructions & Interiors"
          >
            <div className="flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <img
                src={LOGO_SRC}
                alt="Trinity Constructions & Interiors Logo Emblem"
                className="h-7 md:h-8 w-auto object-contain"
                style={{
                  filter: 'invert(1) drop-shadow(0 2px 8px rgba(0,0,0,0.8))'
                }}
                loading="eager"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-serif tracking-widest text-xs md:text-sm text-ivory font-semibold group-hover:text-champagne transition-colors leading-none">
                TRINITY
              </span>
              <span className="text-[7.5px] md:text-[8.5px] uppercase tracking-architectural text-champagne font-mono mt-0.5">
                CONSTRUCTIONS &amp; INTERIORS
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative text-[11px] uppercase tracking-architectural font-medium text-ivory/90 hover:text-champagne transition-colors py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-champagne transition-all duration-300 ease-out group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              href="https://wa.me/916309255122"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ivory/80 hover:text-champagne text-[11px] uppercase tracking-wider flex items-center gap-1.5 py-1.5 px-2.5 border border-champagne/20 rounded hover:border-champagne/50 transition-all"
            >
              <MessageSquare className="w-3 h-3 text-champagne" />
              <span>WhatsApp</span>
            </a>
            <button
              onClick={onBookClick}
              className="btn-luxury-gold px-4 py-1.5 rounded text-[11px] flex items-center gap-1.5 group"
            >
              <span>Book Consultation</span>
              <ArrowUpRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center md:hidden gap-2">
            <button
              onClick={onBookClick}
              className="btn-luxury-gold px-2.5 py-1 rounded text-[10px] font-medium"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-ivory hover:text-champagne p-1.5 focus:outline-none"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-charcoal-dark/95 backdrop-blur-xl transition-all duration-300 md:hidden flex flex-col justify-between p-6 pt-20 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto translate-x-0' : 'opacity-0 pointer-events-none translate-x-full'
        }`}
      >
        <div className="flex flex-col space-y-4">
          <p className="text-[10px] uppercase tracking-architectural text-champagne/70 font-semibold border-b border-champagne/15 pb-2">
            Navigation Menu
          </p>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-xl font-serif tracking-wide text-ivory hover:text-champagne transition-colors flex items-center justify-between group"
            >
              <span>{link.name}</span>
              <ArrowUpRight className="w-4 h-4 text-champagne/50 group-hover:text-champagne" />
            </a>
          ))}
        </div>

        <div className="space-y-3 pt-4 border-t border-champagne/20">
          <p className="text-[11px] text-ivory/60 tracking-wider">
            Hyderabad · Bengaluru · Tirupati · Kurnool
          </p>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onBookClick();
            }}
            className="btn-luxury-gold w-full py-2.5 rounded text-center text-xs tracking-widest uppercase font-medium"
          >
            Book Consultation
          </button>
        </div>
      </div>
    </>
  );
}
