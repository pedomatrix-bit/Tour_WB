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
  currentLanguage?: Language;
  audienceTier: AudienceTier;
  currency: Currency;
  onSelectCategory?: (categoryId: string) => void;
  onSelectDestination?: (dest: Destination) => void;
  onViewAllDestinations?: () => void;
}

export const CategoryCarousel: React.FC<CategoryCarouselProps> = ({
  audienceTier,
  currency,
  onSelectCategory,
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

  const handleDestinationClick = (dest: Destination) => {
    if (onSelectDestination) {
      onSelectDestination(dest);
    } else if (onSelectCategory) {
      onSelectCategory(dest.id);
    }
  };

  const handleViewAll = () => {
    if (onViewAllDestinations) {
      onViewAllDestinations();
    } else if (onSelectCategory) {
      onSelectCategory('all');
    }
  };

  return (
    <section className="py-14 sm:py-20 bg-[#FBF8F3] relative overflow-hidden border-b border-[#E2DBD0]">
      {/* Background Decorative watermarks */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#D4AF37]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-[#1E6B62]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C45C4A] mb-2 font-mono">
              <Compass className="w-3.5 h-3.5" />
              <span>THE CARAVAN COMPASS • 8 ICONIC REGIONS</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-[#0F1A2F]">
              Explore the Land of Tigers, Tea & Tagore
            </h2>
            <p className="text-sm md:text-base text-[#0F1A2F]/70 max-w-2xl mt-2 leading-relaxed">
              From high-altitude tea trails overlooking snow summits to mysterious mangrove estuaries and the terracotta poetry of Bengal.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full bg-white border border-[#E2DBD0] hover:border-[#D4AF37] hover:bg-[#0F1A2F] hover:text-[#D4AF37] flex items-center justify-center text-[#0F1A2F] shadow-xs transition-all duration-300 cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full bg-white border border-[#E2DBD0] hover:border-[#D4AF37] hover:bg-[#0F1A2F] hover:text-[#D4AF37] flex items-center justify-center text-[#0F1A2F] shadow-xs transition-all duration-300 cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrolling Card Track */}
        <div
          ref={scrollRef}
          className="flex items-stretch gap-5 sm:gap-6 overflow-x-auto no-scrollbar pb-6 pt-2 snap-x snap-mandatory"
        >
          {DESTINATIONS.map((dest) => {
            const priceINR = dest.startingPriceINR[audienceTier];
            const formattedPrice = CURRENCY_RATES[currency].format(priceINR);

            return (
              <div
                key={dest.id}
                onClick={() => handleDestinationClick(dest)}
                className="flex-shrink-0 w-[290px] sm:w-[330px] md:w-[350px] snap-start group cursor-pointer bg-white rounded-2xl overflow-hidden border border-[#E2DBD0] hover:border-[#D4AF37] shadow-xs hover:shadow-xl transition-all duration-400 flex flex-col justify-between"
              >
                {/* Image Box */}
                <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-[#0F1A2F]">
                  <img
                    src={dest.heroImage}
                    alt={dest.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A2F]/90 via-[#0F1A2F]/25 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#0F1A2F]/80 text-[#D4AF37] backdrop-blur-md border border-[#D4AF37]/30">
                      {dest.category}
                    </span>

                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white/90 text-[#0F1A2F] backdrop-blur-md shadow-xs">
                      <Thermometer className="w-3 h-3 text-[#C45C4A]" />
                      <span>{dest.temperature.split('(')[0].trim()}</span>
                    </span>
                  </div>

                  {/* Bottom Image Title */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="text-xl font-bold font-serif text-white group-hover:text-[#D4AF37] transition-colors flex items-center justify-between">
                      <span>{dest.name}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-[#D4AF37]" />
                    </h3>
                    <p className="text-xs text-[#D4AF37] font-serif italic truncate mt-0.5">
                      {dest.tagline}
                    </p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex flex-col justify-between flex-grow space-y-4">
                  <p className="text-xs text-[#0F1A2F]/80 line-clamp-2 leading-relaxed">
                    {dest.description}
                  </p>

                  <div className="space-y-2 pt-3 border-t border-[#E2DBD0]">
                    <div className="text-[11px] font-medium text-[#1E6B62] flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-[#D4AF37] flex-shrink-0" />
                      <span className="truncate">{dest.featuredTeaOrCraft}</span>
                    </div>

                    <div className="flex items-center justify-between pt-1.5">
                      <div>
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider block">
                          {audienceTier === 'luxury' ? 'Luxury Planter From' : 'Heritage Homestay From'}
                        </span>
                        <span className="text-base font-bold text-[#0F1A2F]">
                          {formattedPrice}
                          <span className="text-xs font-normal text-gray-500"> / guest</span>
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDestinationClick(dest);
                        }}
                        className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#0F1A2F] text-[#D4AF37] group-hover:bg-[#C45C4A] group-hover:text-white transition-colors cursor-pointer"
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
        <div className="text-center mt-8">
          <button
            onClick={handleViewAll}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#0F1A2F] hover:bg-[#0F1A2F] hover:text-[#D4AF37] text-xs uppercase tracking-widest font-bold text-[#0F1A2F] transition-all duration-300 cursor-pointer"
          >
            <span>View All Regional Expeditions & Terroirs</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

