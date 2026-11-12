import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Tag } from 'lucide-react';

export default function ProjectLightbox({ project, onClose, onPrev, onNext }) {
  // Keyboard navigation for accessibility
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') onPrev();
      else if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose, onPrev, onNext]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-charcoal-dark/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-8 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full bg-charcoal rounded-2xl overflow-hidden border border-champagne/30 shadow-luxury-dark"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-charcoal/80 text-ivory hover:text-champagne hover:bg-charcoal border border-champagne/30 transition-all"
          aria-label="Close lightbox"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Navigation Arrows */}
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-charcoal/80 text-ivory hover:text-champagne border border-champagne/30 transition-all hidden sm:flex"
          aria-label="Previous project"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-charcoal/80 text-ivory hover:text-champagne border border-champagne/30 transition-all hidden sm:flex"
          aria-label="Next project"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Large Image View */}
        <div className="relative aspect-[16/10] max-h-[65vh] w-full bg-charcoal-dark overflow-hidden">
          <img
            src={project.image}
            alt={project.category}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Details Footer */}
        <div className="p-6 md:p-8 bg-charcoal text-ivory flex flex-col md:flex-row md:items-center justify-between gap-6 border-t border-champagne/20">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-champagne text-charcoal font-bold">
                Project {project.id}
              </span>
              <span className="text-xs uppercase tracking-architectural text-champagne flex items-center gap-1">
                <Tag className="w-3 h-3" />
                {project.category}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-light text-ivory">
              {project.title}
            </h3>
            <p className="text-xs text-ivory/70 mt-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-champagne" />
              <span>City: {project.city}</span>
              <span className="text-champagne/40 mx-2">·</span>
              <span>Project Type: {project.projectType}</span>
            </p>
          </div>

          <div className="max-w-md bg-charcoal-dark/70 p-4 rounded-lg border border-champagne/15 text-xs text-ivory/80 space-y-1">
            <p className="font-semibold text-champagne uppercase tracking-wider text-[10px]">Delivered Scope</p>
            <p className="font-mono text-xs">{project.scope}</p>
            <p className="text-[11px] text-ivory/60 pt-1 border-t border-champagne/10">{project.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

