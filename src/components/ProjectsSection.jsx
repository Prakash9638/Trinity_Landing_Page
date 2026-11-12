import React, { useState } from 'react';
import { ArrowUpRight, Eye, MapPin, Tag } from 'lucide-react';
import { projectsData } from '../data/projects';
import ProjectLightbox from './ProjectLightbox';

export default function ProjectsSection({ onBookClick }) {
  const [selectedProject, setSelectedProject] = useState(null);

  const openLightbox = (project) => setSelectedProject(project);
  const closeLightbox = () => setSelectedProject(null);

  const handleNext = () => {
    if (!selectedProject) return;
    const currentIndex = projectsData.findIndex(p => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % projectsData.length;
    setSelectedProject(projectsData[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedProject) return;
    const currentIndex = projectsData.findIndex(p => p.id === selectedProject.id);
    const prevIndex = (currentIndex - 1 + projectsData.length) % projectsData.length;
    setSelectedProject(projectsData[prevIndex]);
  };

  return (
    <section id="projects" className="py-24 md:py-32 bg-charcoal text-ivory relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-champagne/20 pb-12">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-architectural text-champagne font-semibold block mb-3">
              PORTFOLIO · COMPLETED RESIDENCES
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light tracking-tight text-ivory leading-tight">
              Spaces that speak <span className="italic font-normal text-champagne">for themselves.</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-sm sm:text-base text-ivory/70 font-light leading-relaxed mb-6">
              Explore our residential interiors and construction work.
            </p>
            <button
              onClick={onBookClick}
              className="btn-luxury-outline px-6 py-2.5 rounded text-xs tracking-widest font-semibold flex items-center gap-2 group hover:bg-champagne/10"
            >
              <span>View All Projects</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Portfolio Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projectsData.map((project, idx) => (
            <div
              key={project.id}
              onClick={() => openLightbox(project)}
              className="group cursor-pointer rounded-xl overflow-hidden bg-charcoal-dark border border-champagne/20 shadow-luxury-dark hover:border-champagne/60 transition-all duration-500 flex flex-col justify-between"
            >
              {/* Image Frame with Zoom */}
              <div className="relative aspect-[16/11] overflow-hidden bg-charcoal">
                <img
                  src={project.image}
                  alt={project.category}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark via-charcoal/20 to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-300" />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-charcoal/90 backdrop-blur-md text-champagne border border-champagne/40">
                    {project.city}
                  </span>
                  <span className="text-[10px] uppercase tracking-architectural font-medium px-2.5 py-1 rounded bg-ivory/95 text-charcoal shadow-sm">
                    {project.category}
                  </span>
                </div>

                {/* Hover Quick View Pill */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="glass-charcoal px-4 py-2 rounded-full text-xs font-medium text-champagne flex items-center gap-2 border border-champagne/40 shadow-luxury">
                    <Eye className="w-4 h-4" />
                    <span>View Gallery</span>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-serif font-light text-ivory mb-2 group-hover:text-champagne transition-colors">
                    {project.title}
                  </h3>

                  <div className="space-y-2 text-xs text-ivory/70 mb-4">
                    <p className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-champagne shrink-0" />
                      <span>City: <strong className="font-mono text-champagne font-semibold text-xs tracking-wide">{project.city}</strong></span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5 text-champagne shrink-0" />
                      <span>Project: <span className="text-ivory/90">{project.projectType}</span></span>
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-champagne/15 text-xs">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-champagne block mb-1">
                    Delivered Scope
                  </span>
                  <p className="text-xs text-ivory/85 font-light leading-relaxed">
                    {project.scope}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <ProjectLightbox
        project={selectedProject}
        onClose={closeLightbox}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
}

