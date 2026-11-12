import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';

const TOTAL_FRAMES = 61;
const LOGO_SRC = "/Logo/Logo_white_bold.png";
const LIVING_ROOM_FINAL_IMAGE = encodeURI("/Home Initial and Final Images/Living_Room_Final_Image.png");

const getFramePath = (index) => {
  const pad = String(index).padStart(3, '0');
  return encodeURI(`/Home Page Annimation 2/${pad}.png`);
};

// Helper for smooth sequential text entrance, dwell, and departure
function getStageStyle(progress, start, peakStart, peakEnd, end) {
  if (progress < start || progress > end) {
    return { opacity: 0, transform: 'translateY(30px)', pointerEvents: 'none' };
  }
  let opacity = 1;
  let translateY = 0;

  if (progress < peakStart) {
    // Entering from below
    const factor = (progress - start) / (peakStart - start);
    opacity = factor;
    translateY = (1 - factor) * 25;
  } else if (progress > peakEnd) {
    // Exiting upwards
    const factor = (progress - peakEnd) / (end - peakEnd);
    opacity = 1 - factor;
    translateY = -factor * 30;
  }

  return {
    opacity,
    transform: `translateY(${translateY}px)`,
    pointerEvents: opacity > 0.4 ? 'auto' : 'none',
  };
}

export default function HeroSection({ onBookClick, onExploreProjects }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const imagesCacheRef = useRef({});
  const activeFrameRef = useRef(1);

  // High-DPI Crisp Canvas Renderer
  const renderFrame = useCallback((frameNumber) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let img = imagesCacheRef.current[frameNumber];
    
    // Nearest-frame fallback during rapid scrolling to prevent blank screen
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset <= 25; offset++) {
        const prev = imagesCacheRef.current[frameNumber - offset];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          img = prev;
          break;
        }
        const next = imagesCacheRef.current[frameNumber + offset];
        if (next && next.complete && next.naturalWidth > 0) {
          img = next;
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = displayWidth / displayHeight;

    let drawWidth = displayWidth;
    let drawHeight = displayHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawWidth = displayWidth;
      drawHeight = displayWidth / imgRatio;
      offsetY = (displayHeight - drawHeight) / 2;
    } else {
      drawHeight = displayHeight;
      drawWidth = displayHeight * imgRatio;
      offsetX = (displayWidth - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, displayWidth, displayHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    ctx.restore();
  }, []);

  // Preload frames and initial classic image
  useEffect(() => {
    let isCancelled = false;

    // Preload initial and final pristine living room image
    const finalPristineImg = new Image();
    finalPristineImg.src = LIVING_ROOM_FINAL_IMAGE;

    // Load first and last transformation sequence frames
    const firstImg = new Image();
    firstImg.src = getFramePath(1);
    firstImg.onload = () => {
      if (isCancelled) return;
      imagesCacheRef.current[1] = firstImg;
      renderFrame(1);
      setIsReady(true);
    };

    const lastImg = new Image();
    lastImg.src = getFramePath(TOTAL_FRAMES);
    lastImg.onload = () => {
      if (isCancelled) return;
      imagesCacheRef.current[TOTAL_FRAMES] = lastImg;
    };

    const loadRemaining = () => {
      for (let i = 2; i <= TOTAL_FRAMES; i++) {
        if (!imagesCacheRef.current[i]) {
          const img = new Image();
          img.src = getFramePath(i);
          img.onload = () => {
            if (isCancelled) return;
            imagesCacheRef.current[i] = img;
            if (activeFrameRef.current === i) {
              renderFrame(i);
            }
          };
        }
      }
    };

    const timer = setTimeout(loadRemaining, 30);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [renderFrame]);

  // Maintain aspect ratio on resize
  useEffect(() => {
    const handleResize = () => {
      renderFrame(activeFrameRef.current);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [renderFrame]);

  // Pinned scroll-driven synchronization
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const container = containerRef.current;
          if (!container) {
            ticking = false;
            return;
          }

          const rect = container.getBoundingClientRect();
          const totalScrollDistance = container.offsetHeight - window.innerHeight;

          if (totalScrollDistance <= 0) {
            ticking = false;
            return;
          }

          const scrolled = -rect.top;
          const progress = Math.min(Math.max(scrolled / totalScrollDistance, 0), 1);
          const frameIndex = Math.min(
            TOTAL_FRAMES,
            Math.max(1, Math.floor(progress * (TOTAL_FRAMES - 1)) + 1)
          );

          setScrollProgress(progress);
          activeFrameRef.current = frameIndex;
          renderFrame(frameIndex);

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [renderFrame]);

  // 4 Continuous Sequential Stages:
  // Stage 1 (On Page Load): Large Logo (logo_.png) + Tagline in bold white (0.0 to 0.24)
  const stage1Style = getStageStyle(scrollProgress, 0.0, 0.0, 0.16, 0.24);

  // Stage 2: Main Heading (0.25 to 0.50)
  const stage2Style = getStageStyle(scrollProgress, 0.25, 0.29, 0.44, 0.51);

  // Stage 3: Turnkey Services Description (0.52 to 0.75)
  const stage3Style = getStageStyle(scrollProgress, 0.52, 0.56, 0.69, 0.76);

  // Stage 4: CTAs & Location Details on Fully Furnished Room (0.77 to 1.0)
  const stage4Style = getStageStyle(scrollProgress, 0.77, 0.82, 0.96, 1.0);

  // Calculate smooth crossfade opacity for initial photo on page load
  // At scrollProgress = 0, opacity is 1.0 (pristine luxury living room visible)
  // Between scrollProgress 0.02 and 0.09, dissolves smoothly into the transformation canvas!
  const initialImageOpacity = Math.max(0, 1 - scrollProgress * 14);

  // Calculate smooth crossfade opacity for final photo after animation completes
  // Starts fading in at scrollProgress 0.82 and reaches 100% crisp solid lock at scrollProgress >= 0.94
  const finalImageOpacity = Math.min(1, Math.max(0, (scrollProgress - 0.82) / 0.12));

  return (
    <section ref={containerRef} className="relative h-[480vh] bg-charcoal text-ivory">
      {/* Sticky Fullscreen Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* Background Visual Layer */}
        <div className="absolute inset-0 z-0 bg-charcoal">
          {/* Canvas for the 61-frame transformation animation */}
          <canvas
            ref={canvasRef}
            className="w-full h-full block object-cover"
          />

          {/* Initial Pristine Living Room Image on Page Load */}
          <img
            src={LIVING_ROOM_FINAL_IMAGE}
            alt="Trinity Luxury Living Room - Initial"
            style={{
              opacity: initialImageOpacity,
              transition: 'opacity 0.25s ease-out',
              pointerEvents: 'none'
            }}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Final Pristine Living Room Image on Animation Completion */}
          <img
            src={LIVING_ROOM_FINAL_IMAGE}
            alt="Trinity Luxury Living Room - Final"
            style={{
              opacity: finalImageOpacity,
              transition: 'opacity 0.25s ease-out',
              pointerEvents: 'none'
            }}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Minimal soft top scrim for navbar legibility */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-charcoal/60 to-transparent pointer-events-none" />
        </div>

        {/* Top Spacer for Navbar */}
        <div className="relative z-10 pt-20" />

        {/* Center Container: Centered in the middle with bold, large white typography */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 w-full my-auto text-center flex flex-col items-center justify-center">
          
          {/* STAGE 1: ON PAGE LOAD — LOGO + WHITE TAGLINE */}
          <div
            style={stage1Style}
            className="w-full flex flex-col items-center justify-center transition-all duration-300 ease-out"
          >
            {/* Bold Pure White Emblem with Visible Golden Glow */}
            <div className="mb-6 flex justify-center">
              <img
                src={LOGO_SRC}
                alt="Trinity Constructions & Interiors Emblem"
                className="h-32 sm:h-40 md:h-52 w-auto object-contain transition-transform duration-500 hover:scale-105"
                style={{
                  filter: 'drop-shadow(0 0 10px rgba(255, 205, 60, 0.95)) drop-shadow(0 0 25px rgba(235, 168, 36, 0.85)) drop-shadow(0 0 50px rgba(200, 140, 25, 0.6)) drop-shadow(0 0 75px rgba(182, 120, 15, 0.4))'
                }}
              />
            </div>

            {/* Tagline in Initial Font Family (Cormorant Garamond) with Balanced Weight & Pure White */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight tracking-tight mb-6 max-w-4xl drop-shadow-[0_4px_24px_rgba(0,0,0,0.98)] drop-shadow-[0_1px_6px_rgba(0,0,0,1)]">
              “Designed with vision. Crafted with purpose. Defined by Trinity.”
            </h1>

            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-white font-medium drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">
              <ChevronDown className="w-4 h-4 animate-bounce text-white" />
              <span>Scroll down to experience the transformation</span>
            </div>
          </div>

          {/* STAGE 2: MAIN HEADING (Appears next as user scrolls, then scrolls & disappears) */}
          <div
            style={stage2Style}
            className="w-full absolute inset-x-0 flex flex-col items-center justify-center transition-all duration-300 ease-out px-4"
          >
            <div className="inline-flex items-center gap-2 mb-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse shadow-md" />
              <span className="text-xs sm:text-sm uppercase tracking-architectural text-white font-bold font-mono">
                TRINITY CONSTRUCTIONS &amp; INTERIORS
              </span>
            </div>

            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold leading-[1.08] tracking-tight text-white mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.98)] drop-shadow-[0_1px_6px_rgba(0,0,0,1)] max-w-4xl">
              Interiors and construction for homes that suit the{' '}
              <span className="italic font-normal text-white underline decoration-white/40 underline-offset-8">
                way you live.
              </span>
            </h2>

            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-white font-medium drop-shadow-[0_3px_12px_rgba(0,0,0,1)]">
              <ChevronDown className="w-4 h-4 animate-bounce text-white" />
              <span>Keep scrolling for turnkey services</span>
            </div>
          </div>

          {/* STAGE 3: TURNKEY SCOPE (Appears next as user scrolls, then scrolls & disappears) */}
          <div
            style={stage3Style}
            className="w-full absolute inset-x-0 flex flex-col items-center justify-center transition-all duration-300 ease-out px-4"
          >
            <div className="inline-flex items-center gap-2 mb-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
              <span className="text-xs sm:text-sm uppercase tracking-architectural text-white font-bold font-mono">
                TURNKEY RESIDENTIAL SCOPE
              </span>
            </div>

            <p className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-white leading-tight mb-6 max-w-4xl drop-shadow-[0_4px_24px_rgba(0,0,0,0.98)] drop-shadow-[0_1px_6px_rgba(0,0,0,1)]">
              Turnkey interiors, modular kitchens, wardrobes, false ceilings, renovation and residential construction.
            </p>

            <p className="text-base sm:text-xl md:text-2xl text-white font-medium leading-relaxed max-w-3xl drop-shadow-[0_3px_14px_rgba(0,0,0,1)]">
              Share your requirements and book a consultation or site visit with our senior design architects.
            </p>
          </div>

          {/* STAGE 4: ACTION BUTTONS & LOCATION DETAILS (Final Stage on Furnished Handover) */}
          <div
            style={stage4Style}
            className="w-full absolute inset-x-0 flex flex-col items-center justify-center transition-all duration-300 ease-out px-4"
          >
            <div className="inline-flex items-center gap-2 mb-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
              <span className="text-xs sm:text-sm uppercase tracking-architectural text-white font-bold font-mono">
                COMMENCE YOUR PROJECT
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight mb-8 max-w-3xl drop-shadow-[0_4px_24px_rgba(0,0,0,0.98)] drop-shadow-[0_1px_6px_rgba(0,0,0,1)]">
              Ready to shape your <span className="italic font-normal text-white">living space?</span>
            </h2>

            {/* Centered Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              <button
                onClick={onBookClick}
                className="btn-luxury-gold px-8 py-3.5 rounded text-xs sm:text-sm tracking-widest font-bold flex items-center gap-2 group shadow-2xl hover:scale-105 transition-transform"
              >
                <span>Book Consultation</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <button
                onClick={onExploreProjects}
                className="px-7 py-3.5 rounded text-xs sm:text-sm tracking-widest font-bold uppercase border-2 border-white text-white bg-charcoal/60 backdrop-blur-md hover:bg-white hover:text-charcoal transition-all shadow-2xl"
              >
                <span>Explore Our Projects</span>
              </button>
            </div>

            {/* Serving Locations in Pure White */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm tracking-wider text-white font-medium drop-shadow-[0_3px_12px_rgba(0,0,0,1)]">
              <span className="text-white font-bold uppercase text-[11px] tracking-architectural">Serving:</span>
              <span>Hyderabad</span>
              <span className="text-white/60">·</span>
              <span>Bengaluru</span>
              <span className="text-white/60">·</span>
              <span>Tirupati</span>
              <span className="text-white/60">·</span>
              <span>Kurnool</span>
            </div>
          </div>

        </div>

        {/* Minimal Scroll Cue at Bottom */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pb-6 pointer-events-none">
          <div className="flex items-center justify-between text-[11px] font-mono text-white drop-shadow-[0_2px_8px_rgba(0,0,0,1)] font-medium">
            <span className="text-white font-bold">
              {scrollProgress < 0.24 && "01 / 04 · Vision Statement"}
              {scrollProgress >= 0.25 && scrollProgress < 0.51 && "02 / 04 · Living Suitability"}
              {scrollProgress >= 0.52 && scrollProgress < 0.76 && "03 / 04 · Turnkey Scope"}
              {scrollProgress >= 0.77 && "04 / 04 · Consultation & Booking"}
            </span>

            <div className="flex items-center gap-2">
              <span className="uppercase tracking-widest text-[10px] text-white/90">Scroll to transform</span>
              <ChevronDown className="w-3.5 h-3.5 text-white animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
