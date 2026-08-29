import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Clock, 
  Percent, 
  Calendar, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { AudienceTier, Currency, Language, TourPackage } from '../types';
import { TOUR_PACKAGES } from '../data/packagesData';
import { CURRENCY_RATES } from '../data/translations';

interface FeaturedDealsCarouselProps {
  currentLanguage: Language;
  audienceTier: AudienceTier;
  currency: Currency;
  onSelectPackage: (pkg: TourPackage) => void;
  onBookDirect: (pkg: TourPackage) => void;
}

export const FeaturedDealsCarousel: React.FC<FeaturedDealsCarouselProps> = ({
  currentLanguage,
  audienceTier,
  currency,
  onSelectPackage,
  onBookDirect,
}) => {
  const [dealIndex, setDealIndex] = useState(0);

  // Take top packages for featured seasonal deals
  const deals = TOUR_PACKAGES.slice(0, 4);
  const currentDeal = deals[dealIndex];

  const nextDeal = () => {
    setDealIndex((prev) => (prev + 1) % deals.length);
  };

  const prevDeal = () => {
    setDealIndex((prev) => (prev === 0 ? deals.length - 1 : prev - 1));
  };

  const originalPriceINR = currentDeal.pricingINR[audienceTier];
  const discountedPriceINR = Math.round(originalPriceINR * 0.85); // 15% Seasonal privilege
  const advanceAmountINR = Math.round(discountedPriceINR * 0.2);

  return (
    <section className="py-16 md:py-20 bg-[#0F1A2F] text-white relative overflow-hidden border-b border-[#D4AF37]/20">
      
      {/* Background Glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 rounded-full bg-[#D4AF37]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#C45C4A]/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D4AF37] font-mono mb-2">
              <Percent className="w-3.5 h-3.5" />
              <span>LIMITED-SLOT PRIVILEGE • 15% ADVANCE DISCOUNT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-editorial text-[#FBF8F3]">
              Curated Seasonal Caravans
            </h2>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/60 font-mono">
              0{dealIndex + 1} / 0{deals.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={prevDeal}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#D4AF37] hover:text-[#0F1A2F] text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
                aria-label="Previous deal"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextDeal}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#D4AF37] hover:text-[#0F1A2F] text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
                aria-label="Next deal"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Featured Deal Main Stage Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#15233B] rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#D4AF37]/30 shadow-2xl">
          
          {/* Left Visual Gallery Box (6 Cols) */}
          <div className="lg:col-span-6 space-y-3">
            <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden bg-black shadow-lg">
              <img
                src={currentDeal.featuredImage}
                alt={currentDeal.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A2F]/90 via-transparent to-transparent" />
              
              {/* Badges on Image */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#C45C4A] text-white uppercase shadow-md flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>Limited Autumn Slots</span>
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#D4AF37] text-[#0F1A2F] uppercase shadow-md">
                  15% Off Code
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90 font-serif">
                <span>Next Departure: {currentDeal.nextDates[0]}</span>
                <span>⭐ {currentDeal.rating} ({currentDeal.reviewsCount} reviews)</span>
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="grid grid-cols-3 gap-3">
              {currentDeal.gallery.slice(1, 4).map((img, i) => (
                <div key={i} className="h-20 rounded-xl overflow-hidden border border-white/10 opacity-75 hover:opacity-100 transition-opacity">
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Info and Booking Triggers (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-mono tracking-widest text-[#D4AF37] uppercase block mb-1">
                {currentDeal.tag} • {currentDeal.duration}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-editorial text-white leading-snug">
                {currentDeal.title}
              </h3>
              <p className="text-xs sm:text-sm text-white/80 mt-3 leading-relaxed">
                {currentDeal.shortDesc}
              </p>
            </div>

            {/* Tier Inclusions Checklist Preview */}
            <div className="space-y-2 py-2 border-y border-white/10 text-xs">
              <span className="font-bold text-[#D4AF37] block">
                {audienceTier === 'luxury' ? 'Luxury Planter Inclusions:' : 'Heritage Homestay Inclusions:'}
              </span>
              {(audienceTier === 'luxury' ? currentDeal.inclusions.luxury : currentDeal.inclusions.essential)
                .slice(0, 3)
                .map((inc, i) => (
                  <div key={i} className="flex items-center gap-2 text-white/90">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                    <span className="truncate">{inc}</span>
                  </div>
                ))}
            </div>

            {/* Price Box */}
            <div className="flex flex-wrap items-end justify-between gap-4 p-4 rounded-2xl bg-[#0F1A2F]/80 border border-[#D4AF37]/30">
              <div>
                <span className="text-[11px] text-white/60 line-through block">
                  Original: {CURRENCY_RATES[currency].format(originalPriceINR)}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-bold text-[#D4AF37]">
                    {CURRENCY_RATES[currency].format(discountedPriceINR)}
                  </span>
                  <span className="text-xs text-white/70">/ explorer</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-[#1E6B62] bg-[#1E6B62]/20 px-2 py-1 rounded text-white font-semibold block">
                  Lock with 20%: {CURRENCY_RATES[currency].format(advanceAmountINR)}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => onBookDirect(currentDeal)}
                className="w-full sm:w-auto flex-1 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E5C058] to-[#C45C4A] text-[#0F1A2F] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:scale-102 transition-all shimmer-badge cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Reserve Deal (20% Advance)</span>
              </button>

              <button
                onClick={() => onSelectPackage(currentDeal)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-white/20 transition-all cursor-pointer"
              >
                <span>Full Day-by-Day</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
