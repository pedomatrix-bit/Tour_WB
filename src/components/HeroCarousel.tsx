import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Compass, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Crown 
} from 'lucide-react';
import { AudienceTier, Currency, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface HeroSlide {
  id: string;
  image: string;
  location: string;
  title: string;
  tag: string;
  quote: string;
  highlightStat: string;
  viewTarget: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'darjeeling',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1920&auto=format&fit=crop',
    location: 'Darjeeling & Eastern Himalayas',
    title: 'Where Morning Mist Pours Champagne Tea',
    tag: '150-Year Heritage Planters & Toy Train',
    quote: '“The mountains are calling with the aroma of freshly withered tea leaves.”',
    highlightStat: 'Altitude 2,134m • Glenburn & Makaibari Planter Suites',
    viewTarget: 'packages',
  },
  {
    id: 'sundarbans',
    image: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?q=80&w=1920&auto=format&fit=crop',
    location: 'The Sundarbans Mangrove Delta',
    title: 'Kingdom of the Swimming Royal Bengal Tiger',
    tag: 'Silent Electric Safaris & River Cruisers',
    quote: '“In the tidal labyrinths, every rising wave rewrites the forest secrets.”',
    highlightStat: 'World’s Largest Delta • 98% Sighting Record',
    viewTarget: 'packages',
  },
  {
    id: 'shantiniketan',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=1920&auto=format&fit=crop',
    location: 'Shantiniketan & Bishnupur Heritage',
    title: 'Tagore’s Red Earth & Terracotta Dynasties',
    tag: 'Literature, Baul Mystics & Baluchari Silk',
    quote: '“Let the red soil of Birbhum awaken the poet in your soul.”',
    highlightStat: 'Nobel Heritage 1913 • Live Baul Acoustic Recitals',
    viewTarget: 'packages',
  },
  {
    id: 'dooars',
    image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?q=80&w=1920&auto=format&fit=crop',
    location: 'Dooars Foothills & Jaldapara',
    title: 'Wild Elephant Corridors & The Armored Rhino',
    tag: 'Elephant Safaris & Bhutan Foothills',
    quote: '“Dew on the tall elephant grass as giants walk in the dawn silence.”',
    highlightStat: 'Sub-Himalayan Rainforests • 4x4 Gypsy Forest Trails',
    viewTarget: 'packages',
  },
];

interface HeroCarouselProps {
  currentLanguage?: Language;
  audienceTier: AudienceTier;
  currency: Currency;
  onOpenBuilder: () => void;
  onExplorePackages: () => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  audienceTier,
  onOpenBuilder,
  onExplorePackages,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const t = TRANSLATIONS['en'];
  const currentSlide = HERO_SLIDES[currentSlideIndex];

  // Auto rotation
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <div className="relative w-full min-h-[580px] lg:h-[84vh] max-h-[800px] overflow-hidden bg-[#0F1A2F]">
      {/* Background Slides with Ken Burns zoom */}
      {HERO_SLIDES.map((slide, idx) => {
        const isActive = idx === currentSlideIndex;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.location}
              className={`w-full h-full object-cover object-center ${
                isActive ? 'animate-kenburns' : ''
              }`}
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F1A2F]/95 via-[#0F1A2F]/65 to-[#0F1A2F]/35" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A2F] via-transparent to-[#0F1A2F]/40" />
          </div>
        );
      })}

      {/* Foreground Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-between py-8 sm:py-10 lg:py-14">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 animate-fadeIn">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#0F1A2F]/80 border border-[#D4AF37]/50 text-[#F6E6B4] backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{currentSlide.tag}</span>
          </span>

          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#1E6B62]/80 text-white backdrop-blur-md border border-white/10">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{currentSlide.highlightStat}</span>
          </span>

          {audienceTier === 'luxury' ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#D4AF37] text-[#0F1A2F] shadow-xs">
              <Crown className="w-3.5 h-3.5" />
              <span>Luxury Planter Edition</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#1E6B62] text-white shadow-xs">
              <Compass className="w-3.5 h-3.5" />
              <span>Heritage Homestay Edition</span>
            </span>
          )}
        </div>

        {/* Center Main Headline Section */}
        <div className="max-w-3xl lg:max-w-4xl space-y-4 sm:space-y-6 my-auto py-4">
          <div>
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="h-0.5 w-6 bg-[#C45C4A]"></span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-bold text-[#D4AF37]">
                Curated Expeditions • {currentSlide.location}
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-black tracking-tight text-[#FBF8F3] leading-[1.02] drop-shadow-md">
              {currentSlide.title}
            </h1>
          </div>

          <p className="text-sm sm:text-base md:text-lg text-white/90 font-serif max-w-2xl leading-relaxed border-l-2 border-[#D4AF37] pl-4 py-0.5">
            {currentSlide.quote}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-2">
            <button
              id="hero-cta-builder"
              onClick={onOpenBuilder}
              className="flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#C45C4A] hover:bg-[#a34a3b] text-white font-bold text-xs sm:text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-102 active:scale-98 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>{t.hero.ctaPlan}</span>
            </button>

            <button
              id="hero-cta-explore"
              onClick={onExplorePackages}
              className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-[#FBF8F3] font-bold text-xs sm:text-sm uppercase tracking-widest backdrop-blur-md border border-white/25 transition-all hover:border-[#D4AF37] cursor-pointer"
            >
              <span>{t.hero.ctaExplore}</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </div>

          {/* Bold Metric Strip */}
          <div className="flex items-center gap-2 sm:gap-4 pt-3 border-t border-white/10">
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-serif font-bold text-white leading-none">24+</span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold text-white/60 mt-1">Destinations</span>
            </div>
            <div className="w-px h-6 bg-white/20 mx-2 sm:mx-4"></div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-serif font-bold text-white leading-none">12</span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold text-white/60 mt-1">Expeditions</span>
            </div>
            <div className="w-px h-6 bg-white/20 mx-2 sm:mx-4"></div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-serif font-bold text-white leading-none">4.9/5</span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold text-white/60 mt-1">Rating</span>
            </div>
          </div>
        </div>

        {/* Bottom Carousel Navigation Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 sm:pt-4 border-t border-white/15">
          {/* Slide Indicators */}
          <div className="flex items-center gap-2">
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => {
                  setCurrentSlideIndex(idx);
                  setIsAutoPlaying(false);
                }}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-500 cursor-pointer ${
                  idx === currentSlideIndex
                    ? 'w-8 sm:w-10 bg-gradient-to-r from-[#D4AF37] to-[#C45C4A]'
                    : 'w-2 sm:w-2.5 bg-white/30 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Quick Stats Banner */}
          <div className="hidden md:flex items-center gap-4 text-[11px] text-white/80">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>20% Advance Online Lock</span>
            </span>
            <span className="text-white/30">•</span>
            <span>Razorpay & Stripe Ready</span>
          </div>

          {/* Manual Arrow Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setCurrentSlideIndex((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
                setIsAutoPlaying(false);
              }}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0F1A2F]/80 border border-white/20 hover:border-[#D4AF37] flex items-center justify-center text-white hover:text-[#D4AF37] transition-colors cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
                setIsAutoPlaying(false);
              }}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0F1A2F]/80 border border-white/20 hover:border-[#D4AF37] flex items-center justify-center text-white hover:text-[#D4AF37] transition-colors cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

