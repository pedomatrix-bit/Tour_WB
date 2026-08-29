import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  SlidersHorizontal, 
  Clock, 
  Calendar, 
  Star, 
  ShieldCheck, 
  ArrowRight, 
  Crown, 
  Footprints,
  Download,
  CheckCircle2
} from 'lucide-react';
import { AudienceTier, Currency, Language, TourPackage } from '../types';
import { TOUR_PACKAGES } from '../data/packagesData';
import { TRANSLATIONS, CURRENCY_RATES } from '../data/translations';
import { generatePackageBrochurePDF } from '../utils/pdfGenerator';

interface PackagesViewProps {
  currentLanguage: Language;
  audienceTier: AudienceTier;
  onAudienceTierChange: (tier: AudienceTier) => void;
  currency: Currency;
  onSelectPackage: (pkg: TourPackage) => void;
  onBookPackage: (pkg: TourPackage) => void;
}

export const PackagesView: React.FC<PackagesViewProps> = ({
  currentLanguage,
  audienceTier,
  onAudienceTierChange,
  currency,
  onSelectPackage,
  onBookPackage,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [maxPriceINR, setMaxPriceINR] = useState<number>(100000);
  const [selectedDuration, setSelectedDuration] = useState<string>('all');

  const t = TRANSLATIONS[currentLanguage];

  // Filtering Logic
  const filteredPackages = TOUR_PACKAGES.filter((pkg) => {
    const matchesCategory = selectedCategory === 'all' || pkg.category === selectedCategory;
    const matchesSearch = pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pkg.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pkg.tag.toLowerCase().includes(searchQuery.toLowerCase());
    const price = pkg.pricingINR[audienceTier];
    const matchesPrice = price <= maxPriceINR;
    const matchesDuration = selectedDuration === 'all' 
      ? true 
      : selectedDuration === 'short' 
      ? pkg.nights <= 4 
      : pkg.nights >= 5;

    return matchesCategory && matchesSearch && matchesPrice && matchesDuration;
  });

  return (
    <div className="bg-[#FBF8F3] min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0F1A2F] text-[#D4AF37] text-xs font-mono font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EXPERTLY CURATED FIXED EXPEDITIONS</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold font-editorial text-[#0F1A2F]">
            {t.packages.title}
          </h1>
          <p className="text-sm sm:text-base text-[#0F1A2F]/70 mt-3 font-serif">
            {t.packages.subtitle}
          </p>
        </div>

        {/* Filters and Search Control Panel */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2DBD0] shadow-sm space-y-6">
          
          {/* Top Row: Search Bar & Audience Tier Switch */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full lg:w-96">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search by tea estate, tigers, Tagore, cruise..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E2DBD0] text-xs sm:text-sm text-[#0F1A2F] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            {/* Audience Tier Switcher in Filter Header */}
            <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider hidden sm:inline">
                Expedition Style:
              </span>
              <div className="flex items-center bg-[#FBF8F3] p-1 rounded-full border border-[#E2DBD0]">
                <button
                  onClick={() => onAudienceTierChange('luxury')}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    audienceTier === 'luxury'
                      ? 'bg-[#0F1A2F] text-[#D4AF37] shadow-sm'
                      : 'text-gray-600 hover:text-[#0F1A2F]'
                  }`}
                >
                  <Crown className="w-3.5 h-3.5" />
                  <span>Luxury & Curated</span>
                </button>
                <button
                  onClick={() => onAudienceTierChange('essential')}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    audienceTier === 'essential'
                      ? 'bg-[#1E6B62] text-white shadow-sm'
                      : 'text-gray-600 hover:text-[#0F1A2F]'
                  }`}
                >
                  <Footprints className="w-3.5 h-3.5" />
                  <span>Essential & Heritage</span>
                </button>
              </div>
            </div>

          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#E2DBD0]">
            {[
              { id: 'all', label: t.packages.filterAll },
              { id: 'mountains', label: t.packages.filterMountains },
              { id: 'wildlife', label: t.packages.filterWildlife },
              { id: 'heritage', label: t.packages.filterHeritage },
              { id: 'cruises', label: t.packages.filterCruises },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#0F1A2F] text-[#D4AF37]'
                    : 'bg-[#FBF8F3] text-gray-700 hover:bg-gray-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Secondary Controls: Price Slider and Duration Filter */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#E2DBD0] text-xs">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-[#0F1A2F]">Max Budget per Guest:</span>
                <span className="font-bold text-[#C45C4A]">
                  {CURRENCY_RATES[currency].format(maxPriceINR)}
                </span>
              </div>
              <input
                type="range"
                min="20000"
                max="100000"
                step="5000"
                value={maxPriceINR}
                onChange={(e) => setMaxPriceINR(Number(e.target.value))}
                className="w-full accent-[#D4AF37]"
              />
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3">
              <span className="font-bold text-[#0F1A2F]">Duration Filter:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedDuration('all')}
                  className={`px-3 py-1.5 rounded-lg border ${selectedDuration === 'all' ? 'bg-[#0F1A2F] text-[#D4AF37] border-[#0F1A2F]' : 'border-gray-300'}`}
                >
                  All Days
                </button>
                <button
                  onClick={() => setSelectedDuration('short')}
                  className={`px-3 py-1.5 rounded-lg border ${selectedDuration === 'short' ? 'bg-[#0F1A2F] text-[#D4AF37] border-[#0F1A2F]' : 'border-gray-300'}`}
                >
                  3-4 Days
                </button>
                <button
                  onClick={() => setSelectedDuration('long')}
                  className={`px-3 py-1.5 rounded-lg border ${selectedDuration === 'long' ? 'bg-[#0F1A2F] text-[#D4AF37] border-[#0F1A2F]' : 'border-gray-300'}`}
                >
                  5+ Days
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Package Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => {
            const price = pkg.pricingINR[audienceTier];
            const advance = Math.round(price * 0.2);

            return (
              <div
                key={pkg.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#E2DBD0] shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden bg-[#0F1A2F]">
                    <img
                      src={pkg.featuredImage}
                      alt={pkg.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A2F]/90 via-[#0F1A2F]/20 to-transparent" />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-[#0F1A2F]/80 text-[#D4AF37] border border-[#D4AF37]/30 backdrop-blur-md">
                        {pkg.duration}
                      </span>
                      {pkg.badge && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#C45C4A] text-white shadow">
                          {pkg.badge}
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90 font-serif">
                      <span>Departs: {pkg.departure.split('(')[0]}</span>
                      <span>⭐ {pkg.rating} ({pkg.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <span className="text-[11px] font-mono font-semibold text-[#1E6B62] uppercase tracking-wider block">
                        {pkg.tag}
                      </span>
                      <h3 className="text-2xl font-bold font-editorial text-[#0F1A2F] mt-1 group-hover:text-[#C45C4A] transition-colors leading-snug">
                        {currentLanguage === 'bn' ? pkg.bengaliTitle : currentLanguage === 'hi' ? pkg.hindiTitle : pkg.title}
                      </h3>
                    </div>

                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                      {pkg.shortDesc}
                    </p>

                    {/* Inclusion Highlights */}
                    <div className="space-y-1.5 pt-2 border-t border-[#E2DBD0] text-xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                        {audienceTier === 'luxury' ? 'Luxury Planter Inclusions:' : 'Heritage Homestay Inclusions:'}
                      </span>
                      {(audienceTier === 'luxury' ? pkg.inclusions.luxury : pkg.inclusions.essential)
                        .slice(0, 2)
                        .map((inc, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-gray-700 text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                            <span className="truncate">{inc}</span>
                          </div>
                        ))}
                    </div>

                  </div>
                </div>

                {/* Price & Booking Footer */}
                <div className="p-6 pt-0 space-y-3">
                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FBF8F3] border border-[#E2DBD0]">
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase tracking-wider block">
                        {audienceTier === 'luxury' ? 'Luxury Planter Rate' : 'Heritage Homestay Rate'}
                      </span>
                      <span className="text-lg font-bold text-[#0F1A2F]">
                        {CURRENCY_RATES[currency].format(price)}
                        <span className="text-xs font-normal text-gray-500"> / guest</span>
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-[#1E6B62] font-bold block">
                        20% Advance:
                      </span>
                      <span className="text-xs font-bold text-[#D4AF37] bg-[#0F1A2F] px-2 py-0.5 rounded">
                        {CURRENCY_RATES[currency].format(advance)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onSelectPackage(pkg)}
                      className="py-2.5 px-3 rounded-xl bg-white border border-[#0F1A2F] text-[#0F1A2F] hover:bg-[#0F1A2F] hover:text-[#D4AF37] text-xs font-bold uppercase tracking-wider transition-colors text-center"
                    >
                      Day-by-Day
                    </button>
                    <button
                      onClick={() => onBookPackage(pkg)}
                      className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C45C4A] text-[#0F1A2F] font-bold text-xs uppercase tracking-wider transition-all shadow hover:scale-102 text-center"
                    >
                      Book 20%
                    </button>
                  </div>

                  <button
                    onClick={() => generatePackageBrochurePDF(pkg, audienceTier)}
                    className="w-full text-center text-[11px] font-semibold text-gray-500 hover:text-[#0F1A2F] flex items-center justify-center gap-1.5 pt-1"
                  >
                    <Download className="w-3 h-3 text-[#D4AF37]" />
                    <span>Download Detailed PDF Itinerary</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {filteredPackages.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#E2DBD0] space-y-3">
            <h3 className="text-xl font-bold font-editorial text-[#0F1A2F]">
              No expeditions matched your exact filter parameters.
            </h3>
            <p className="text-xs text-gray-500">
              Try adjusting the price slider or resetting your category selection.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setMaxPriceINR(100000);
                setSelectedDuration('all');
              }}
              className="px-6 py-2.5 rounded-full bg-[#0F1A2F] text-[#D4AF37] text-xs font-bold uppercase"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
