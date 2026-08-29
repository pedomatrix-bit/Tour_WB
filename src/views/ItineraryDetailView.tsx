import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Star, 
  Clock, 
  ShieldCheck, 
  Download, 
  Check, 
  X as CloseIcon, 
  ChevronLeft, 
  ChevronRight, 
  Crown, 
  Footprints, 
  Sparkles,
  Utensils,
  BedDouble,
  ArrowLeft
} from 'lucide-react';
import { AudienceTier, Currency, Language, TourPackage } from '../types';
import { CURRENCY_RATES, TRANSLATIONS } from '../data/translations';
import { generatePackageBrochurePDF } from '../utils/pdfGenerator';

interface ItineraryDetailViewProps {
  pkg: TourPackage;
  currentLanguage: Language;
  audienceTier: AudienceTier;
  onAudienceTierChange: (tier: AudienceTier) => void;
  currency: Currency;
  onBack: () => void;
  onBookAdvance: (pkg: TourPackage, travelers: number, tier: AudienceTier) => void;
}

export const ItineraryDetailView: React.FC<ItineraryDetailViewProps> = ({
  pkg,
  currentLanguage,
  audienceTier,
  onAudienceTierChange,
  currency,
  onBack,
  onBookAdvance,
}) => {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);
  const [travelersCount, setTravelersCount] = useState<number>(2);

  const pricePerPersonINR = pkg.pricingINR[audienceTier];
  const totalPriceINR = pricePerPersonINR * travelersCount;
  const advanceAmountINR = Math.round(totalPriceINR * 0.2);

  const t = TRANSLATIONS[currentLanguage];

  return (
    <div className="bg-[#FBF8F3] min-h-screen pb-20">
      
      {/* Top Breadcrumb Navigation */}
      <div className="bg-[#0F1A2F] text-white py-4 border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37] hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Expeditions</span>
          </button>

          {/* Tier Switcher in detail header */}
          <div className="flex items-center bg-[#15233B] p-1 rounded-full border border-white/10 text-xs">
            <button
              onClick={() => onAudienceTierChange('luxury')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-bold transition-all ${
                audienceTier === 'luxury'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#C45C4A] text-[#0F1A2F]'
                  : 'text-white/70'
              }`}
            >
              <Crown className="w-3 h-3" />
              <span>Luxury Planter Edition</span>
            </button>
            <button
              onClick={() => onAudienceTierChange('essential')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-bold transition-all ${
                audienceTier === 'essential'
                  ? 'bg-[#1E6B62] text-white'
                  : 'text-white/70'
              }`}
            >
              <Footprints className="w-3 h-3" />
              <span>Essential Heritage Edition</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        
        {/* Main Title and Badges */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0F1A2F] text-[#D4AF37]">
              {pkg.tag}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#C45C4A] text-white">
              {pkg.duration}
            </span>
            <span className="text-xs text-gray-500 font-serif">
              Departing from: <strong className="text-[#0F1A2F]">{pkg.departure}</strong>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-editorial text-[#0F1A2F] leading-tight">
            {currentLanguage === 'bn' ? pkg.bengaliTitle : currentLanguage === 'hi' ? pkg.hindiTitle : pkg.title}
          </h1>

          <p className="text-base text-gray-700 font-serif italic max-w-3xl leading-relaxed">
            {pkg.overview}
          </p>
        </div>

        {/* Gallery Lightbox Carousel with Thumbnail Strip */}
        <div className="space-y-4">
          <div className="relative h-[360px] sm:h-[480px] md:h-[540px] rounded-3xl overflow-hidden bg-black shadow-2xl">
            <img
              src={pkg.gallery[activePhotoIndex] || pkg.featuredImage}
              alt="Gallery Preview"
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A2F]/80 via-transparent to-transparent" />

            {/* Arrows */}
            <div className="absolute inset-0 flex items-center justify-between px-4">
              <button
                onClick={() => setActivePhotoIndex((prev) => (prev === 0 ? pkg.gallery.length - 1 : prev - 1))}
                className="w-11 h-11 rounded-full bg-[#0F1A2F]/80 hover:bg-[#D4AF37] hover:text-[#0F1A2F] text-white flex items-center justify-center transition-colors border border-white/20"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => setActivePhotoIndex((prev) => (prev + 1) % pkg.gallery.length)}
                className="w-11 h-11 rounded-full bg-[#0F1A2F]/80 hover:bg-[#D4AF37] hover:text-[#0F1A2F] text-white flex items-center justify-center transition-colors border border-white/20"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs text-white/90 font-mono">
              <span>PHOTO 0{activePhotoIndex + 1} OF 0{pkg.gallery.length}</span>
              <span>⭐ {pkg.rating} Rating ({pkg.reviewsCount} verified reviews)</span>
            </div>
          </div>

          {/* Thumbnail row */}
          <div className="grid grid-cols-4 gap-3">
            {pkg.gallery.map((img, i) => (
              <div
                key={i}
                onClick={() => setActivePhotoIndex(i)}
                className={`h-20 sm:h-24 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ${
                  activePhotoIndex === i ? 'border-[#D4AF37] shadow-lg scale-102' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="Thumb" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Two-Column Stage: Day-by-Day Timeline on Left, Booking Calculator on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Day-by-Day Itinerary & Inclusions (7 Cols) */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Itinerary Timeline */}
            <div className="space-y-6">
              <div className="border-b border-[#E2DBD0] pb-3 flex items-center justify-between">
                <h3 className="text-2xl font-bold font-editorial text-[#0F1A2F]">
                  Day-by-Day Expedition Schedule
                </h3>
                <span className="text-xs font-mono font-bold text-[#C45C4A]">
                  {pkg.nights} Nights / {pkg.days} Days
                </span>
              </div>

              <div className="space-y-6 relative border-l-2 border-[#D4AF37] ml-4 pl-6">
                {pkg.itinerary.map((day) => (
                  <div key={day.day} className="relative space-y-2 group">
                    {/* Circle Node */}
                    <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-[#D4AF37] border-4 border-[#FBF8F3] group-hover:scale-125 transition-transform" />

                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#0F1A2F] text-[#D4AF37]">
                        Day 0{day.day}
                      </span>
                      <h4 className="text-lg font-bold font-editorial text-[#0F1A2F]">
                        {day.title}
                      </h4>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                      {day.summary}
                    </p>

                    {/* Highlights bullets */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {day.highlights.map((h, hi) => (
                        <span key={hi} className="px-2.5 py-1 rounded-md text-[11px] bg-white border border-[#E2DBD0] text-gray-700">
                          • {h}
                        </span>
                      ))}
                    </div>

                    {/* Accommodation pill */}
                    <div className="p-3 rounded-xl bg-white border border-[#E2DBD0] flex items-center justify-between text-xs mt-2">
                      <div className="flex items-center gap-2">
                        <BedDouble className="w-4 h-4 text-[#D4AF37]" />
                        <span className="text-gray-600">
                          {audienceTier === 'luxury' ? 'Luxury Planter Stay:' : 'Heritage Homestay:'}
                        </span>
                        <strong className="text-[#0F1A2F]">
                          {audienceTier === 'luxury' ? day.stayLuxury : day.stayEssential}
                        </strong>
                      </div>

                      <div className="flex items-center gap-1 text-gray-500 text-[11px]">
                        <Utensils className="w-3 h-3 text-[#C45C4A]" />
                        <span>{day.meals}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions & Exclusions Comparison Box */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2DBD0] space-y-6">
              <h3 className="text-2xl font-bold font-editorial text-[#0F1A2F]">
                Expedition Inclusions & Amenities
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                    <Check className="w-4 h-4" />
                    <span>Included in Your Booking</span>
                  </span>
                  <ul className="space-y-2 text-xs text-gray-700">
                    {(audienceTier === 'luxury' ? pkg.inclusions.luxury : pkg.inclusions.essential).map((inc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                    <CloseIcon className="w-4 h-4" />
                    <span>Not Included / Exclusions</span>
                  </span>
                  <ul className="space-y-2 text-xs text-gray-500">
                    {pkg.exclusions.map((exc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 flex-shrink-0" />
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Live Booking Price Card (5 Cols) */}
          <div className="lg:col-span-5 sticky top-24 space-y-6">
            <div className="bg-[#0F1A2F] text-white rounded-3xl p-6 sm:p-8 border border-[#D4AF37]/30 shadow-2xl space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <span className="text-[10px] font-mono tracking-wider uppercase text-[#D4AF37] block">
                    CURRENT EXPEDITION RATE
                  </span>
                  <span className="text-2xl font-bold text-white">
                    {CURRENCY_RATES[currency].format(pricePerPersonINR)}
                    <span className="text-xs font-normal text-gray-400"> / guest</span>
                  </span>
                </div>

                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                  audienceTier === 'luxury' ? 'bg-[#D4AF37] text-[#0F1A2F]' : 'bg-[#1E6B62] text-white'
                }`}>
                  {audienceTier === 'luxury' ? 'Luxury Planter' : 'Heritage Homestay'}
                </span>
              </div>

              {/* Travelers Counter */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300">
                  Number of Explorers
                </label>
                <div className="flex items-center justify-between p-3 rounded-2xl bg-white/10 border border-white/20">
                  <span className="text-sm font-semibold text-white">
                    {travelersCount} Adults
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setTravelersCount(Math.max(1, travelersCount - 1))}
                      className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 text-white font-bold flex items-center justify-center cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-bold text-base min-w-[1.5rem] text-center">
                      {travelersCount}
                    </span>
                    <button
                      onClick={() => setTravelersCount(travelersCount + 1)}
                      className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 text-white font-bold flex items-center justify-center cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Upcoming Fixed Departure Dates */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300">
                  Select Guaranteed Departure Slot
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {pkg.nextDates.map((date, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-center hover:border-[#D4AF37] cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#D4AF37] mx-auto mb-1" />
                      <span className="font-semibold text-white/90">{date}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Calculation Summary */}
              <div className="p-4 rounded-2xl bg-white/5 border border-[#D4AF37]/30 space-y-2 text-xs">
                <div className="flex justify-between text-white/80">
                  <span>Total Caravan Expedition:</span>
                  <span className="font-bold text-base text-white">
                    {CURRENCY_RATES[currency].format(totalPriceINR)}
                  </span>
                </div>

                <div className="flex justify-between text-[#1E6B62] bg-[#1E6B62]/20 p-2 rounded-xl mt-1 font-semibold border border-[#1E6B62]/40">
                  <span className="text-white flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                    20% Advance Online Lock:
                  </span>
                  <span className="text-[#D4AF37] font-bold">
                    {CURRENCY_RATES[currency].format(advanceAmountINR)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={() => onBookAdvance(pkg, travelersCount, audienceTier)}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C058] to-[#C45C4A] text-[#0F1A2F] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:scale-102 active:scale-98 transition-all shimmer-badge cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-[#0F1A2F]" />
                  <span>Lock Slots with 20% Advance</span>
                </button>

                <button
                  onClick={() => generatePackageBrochurePDF(pkg, audienceTier)}
                  className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-white/20 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#D4AF37]" />
                  <span>Download Detailed PDF Itinerary</span>
                </button>
              </div>

              <div className="text-center text-[10px] text-gray-400">
                Hybrid Gateway: Pay online via Razorpay/Stripe or choose Pay on Arrival.
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
