import React, { useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Thermometer, 
  Compass, 
  ArrowUpRight, 
  Sparkles,
  MapPin
} from 'lucide-react';
import { Destination, AudienceTier, Currency, Language } from '../types';
import { DESTINATIONS } from '../data/destinationsData';
import { CURRENCY_RATES } from '../data/translations';

interface CategoryCarouselProps {
  currentLanguage: Language;
  audienceTier: AudienceTier;
  currency: Currency;
  onSelectDestination: (dest: Destination) => void;
  onViewAllDestinations: () => void;
}

export const CategoryCarousel: React.FC<CategoryCarouselProps> = ({
  currentLanguage,
  audienceTier,
  currency,
  onSelectDestination,
  onViewAllDestinations,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const getDestinationName = (dest: Destination) => {
    if (currentLanguage === 'bn') return dest.bengaliName;
    if (currentLanguage === 'hi') return dest.hindiName;
    return dest.name;
  };

  return (
    <section className="py-16 md:py-24 bg-[#FBF8F3] relative overflow-hidden border-b border-[#E2DBD0]">
      {/* Background Decorative watermarks */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#D4AF37]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-[#1E6B62]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C45C4A] mb-2 font-mono">
              <Compass className="w-3.5 h-3.5" />
              <span>THE CARAVAN COMPASS • 8 ICONIC REGIONS</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-editorial text-[#0F1A2F]">
              Explore the Land of Tigers, Tea & Tagore
            </h2>
            <p className="text-sm md:text-base text-[#0F1A2F]/70 max-w-2xl mt-2">
              From high-altitude tea trails overlooking snow summits to mysterious mangrove estuaries and the terracotta poetry of Bengal.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              className="w-11 h-11 rounded-full bg-white border border-[#E2DBD0] hover:border-[#D4AF37] hover:bg-[#0F1A2F] hover:text-[#D4AF37] flex items-center justify-center text-[#0F1A2F] shadow-sm transition-all duration-300 cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-11 h-11 rounded-full bg-white border border-[#E2DBD0] hover:border-[#D4AF37] hover:bg-[#0F1A2F] hover:text-[#D4AF37] flex items-center justify-center text-[#0F1A2F] shadow-sm transition-all duration-300 cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrolling Card Track */}
        <div
          ref={scrollRef}
          className="flex items-stretch gap-6 overflow-x-auto no-scrollbar pb-6 pt-2 snap-x snap-mandatory"
        >
          {DESTINATIONS.map((dest) => {
            const priceINR = dest.startingPriceINR[audienceTier];
            const formattedPrice = CURRENCY_RATES[currency].format(priceINR);

            return (
              <div
                key={dest.id}
                onClick={() => onSelectDestination(dest)}
                className="flex-shrink-0 w-[300px] sm:w-[340px] md:w-[360px] snap-start group cursor-pointer bg-white rounded-2xl overflow-hidden border border-[#E2DBD0] hover:border-[#D4AF37] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
              >
                {/* Image Box */}
                <div className="relative h-60 w-full overflow-hidden bg-[#0F1A2F]">
                  <img
                    src={dest.heroImage}
                    alt={dest.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A2F]/90 via-[#0F1A2F]/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#0F1A2F]/80 text-[#D4AF37] backdrop-blur-md border border-[#D4AF37]/30">
                      {dest.category}
                    </span>

                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white/90 text-[#0F1A2F] backdrop-blur-md shadow">
                      <Thermometer className="w-3 h-3 text-[#C45C4A]" />
                      <span>{dest.temperature.split('(')[0].trim()}</span>
                    </span>
                  </div>

                  {/* Bottom Image Title */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="text-xl font-bold font-editorial text-white group-hover:text-[#D4AF37] transition-colors flex items-center justify-between">
                      <span>{getDestinationName(dest)}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all text-[#D4AF37]" />
                    </h3>
                    <p className="text-xs text-[#D4AF37] font-serif italic truncate">
                      {dest.tagline}
                    </p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex flex-col justify-between flex-grow space-y-4">
                  <p className="text-xs text-[#0F1A2F]/80 line-clamp-2 leading-relaxed">
                    {dest.description}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-[#E2DBD0]">
                    <div className="text-[11px] font-medium text-[#1E6B62] flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span className="truncate">{dest.featuredTeaOrCraft}</span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider block">
                          {audienceTier === 'luxury' ? 'Luxury Stay From' : 'Heritage Stay From'}
                        </span>
                        <span className="text-base font-bold text-[#0F1A2F]">
                          {formattedPrice}
                          <span className="text-xs font-normal text-gray-500"> / guest</span>
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectDestination(dest);
                        }}
                        className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#0F1A2F] text-[#D4AF37] group-hover:bg-[#C45C4A] group-hover:text-white transition-colors"
                      >
                        Explore
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-6">
          <button
            onClick={onViewAllDestinations}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#0F1A2F] hover:bg-[#0F1A2F] hover:text-[#D4AF37] text-xs uppercase tracking-widest font-bold text-[#0F1A2F] transition-all duration-300"
          >
            <span>View All Destinations & Regional Mood Carousels</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
