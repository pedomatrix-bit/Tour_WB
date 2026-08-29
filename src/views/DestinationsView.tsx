import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  Thermometer, 
  Calendar, 
  Sparkles, 
  ArrowRight, 
  Crown, 
  Footprints, 
  ChevronLeft, 
  ChevronRight,
  Coffee,
  CheckCircle2
} from 'lucide-react';
import { Destination, AudienceTier, Currency, Language, TourPackage } from '../types';
import { DESTINATIONS } from '../data/destinationsData';
import { CURRENCY_RATES } from '../data/translations';

interface DestinationsViewProps {
  currentLanguage: Language;
  audienceTier: AudienceTier;
  currency: Currency;
  onSelectDestinationPackage: (categoryId: string) => void;
  onOpenBuilder: () => void;
}

export const DestinationsView: React.FC<DestinationsViewProps> = ({
  currentLanguage,
  audienceTier,
  currency,
  onSelectDestinationPackage,
  onOpenBuilder,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeMoodIndex, setActiveMoodIndex] = useState<number>(0);
  const [featuredDestIndex, setFeaturedDestIndex] = useState<number>(0);

  const filteredDestinations = selectedCategory === 'all'
    ? DESTINATIONS
    : DESTINATIONS.filter((d) => d.category === selectedCategory);

  const featuredDest = DESTINATIONS[featuredDestIndex];

  return (
    <div className="bg-[#FBF8F3] min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0F1A2F] text-[#D4AF37] text-xs font-mono font-bold uppercase tracking-widest mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>REGIONAL MOOD CAROUSEL & DESTINATION ATLAS</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold font-editorial text-[#0F1A2F]">
            The Geographic Soul of the East
          </h1>
          <p className="text-sm sm:text-base text-[#0F1A2F]/70 mt-3 font-serif">
            Discover the six legendary terroirs where high-altitude Himalayan clouds kiss century-old tea bushes, sacred rivers feed mangrove tiger sanctuaries, and red laterite soil resonates with timeless Tagore melodies.
          </p>
        </div>

        {/* Cinematic Mood Carousel at Top */}
        <div className="bg-[#0F1A2F] text-white rounded-3xl overflow-hidden shadow-2xl border border-[#D4AF37]/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Left: High-Res Mood Slideshow (7 Cols) */}
            <div className="lg:col-span-7 relative h-80 sm:h-96 lg:h-[480px] bg-black">
              <img
                src={featuredDest.moodImages[activeMoodIndex] || featuredDest.heroImage}
                alt={featuredDest.name}
                className="w-full h-full object-cover transition-all duration-700 animate-fadeIn"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A2F]/90 via-transparent to-transparent" />

              {/* Mood Image Dots */}
              <div className="absolute bottom-4 left-6 flex items-center gap-2 z-10">
                {featuredDest.moodImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveMoodIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === activeMoodIndex ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-white/40'
                    }`}
                  />
                ))}
              </div>

              {/* Tag on Image */}
              <div className="absolute top-4 left-6">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#C45C4A] text-white uppercase shadow">
                  Cinematic Mood Showcase
                </span>
              </div>
            </div>

            {/* Right: Destination Spotlight Info (5 Cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between text-xs text-[#D4AF37] font-mono mb-2">
                  <span>DESTINATION 0{featuredDestIndex + 1} OF 0{DESTINATIONS.length}</span>
                  <span className="flex items-center gap-1">
                    <Thermometer className="w-3.5 h-3.5 text-[#C45C4A]" />
                    {featuredDest.temperature.split('(')[0]}
                  </span>
                </div>

                <h2 className="text-3xl font-bold font-editorial text-white">
                  {currentLanguage === 'bn' ? featuredDest.bengaliName : currentLanguage === 'hi' ? featuredDest.hindiName : featuredDest.name}
                </h2>
                <p className="text-xs text-[#D4AF37] font-serif italic mt-1">
                  “{featuredDest.tagline}”
                </p>
                <p className="text-xs text-white/80 mt-3 leading-relaxed">
                  {featuredDest.description}
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-white/10 text-xs">
                <div className="flex items-center gap-2 text-white/90">
                  <Calendar className="w-4 h-4 text-[#D4AF37]" />
                  <span>Best Season: {featuredDest.bestTime}</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <Coffee className="w-4 h-4 text-[#D4AF37]" />
                  <span>Iconic Specialty: {featuredDest.featuredTeaOrCraft}</span>
                </div>
              </div>

              {/* Controls and Explore Link */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setFeaturedDestIndex((prev) => (prev === 0 ? DESTINATIONS.length - 1 : prev - 1));
                      setActiveMoodIndex(0);
                    }}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#D4AF37] hover:text-[#0F1A2F] text-white flex items-center justify-center transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setFeaturedDestIndex((prev) => (prev + 1) % DESTINATIONS.length);
                      setActiveMoodIndex(0);
                    }}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#D4AF37] hover:text-[#0F1A2F] text-white flex items-center justify-center transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => onSelectDestinationPackage(featuredDest.category)}
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C45C4A] text-[#0F1A2F] font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:scale-105 transition-all"
                >
                  <span>View Itineraries</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {[
            { id: 'all', label: 'All Terroirs & Regions' },
            { id: 'tea', label: 'Darjeeling & Tea Estates' },
            { id: 'wildlife', label: 'Sundarbans & Dooars Wildlife' },
            { id: 'heritage', label: 'Tagore & Bishnupur Heritage' },
            { id: 'mountains', label: 'Sikkim & Himalayan Trails' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                selectedCategory === tab.id
                  ? 'bg-[#0F1A2F] text-[#D4AF37] shadow-md scale-105'
                  : 'bg-white text-gray-700 border border-[#E2DBD0] hover:border-gray-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Destinations Deep Dive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((dest) => {
            const price = dest.startingPriceINR[audienceTier];
            return (
              <div
                key={dest.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#E2DBD0] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Card Image */}
                  <div className="relative h-64 overflow-hidden bg-[#0F1A2F]">
                    <img
                      src={dest.heroImage}
                      alt={dest.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A2F]/90 via-transparent to-transparent" />
                    
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-[#0F1A2F]/80 text-[#D4AF37] border border-[#D4AF37]/30 backdrop-blur-md">
                        {dest.category}
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white/90 text-[#0F1A2F] shadow">
                        {dest.bestTime.split('(')[0].trim()}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold font-editorial text-white">
                        {currentLanguage === 'bn' ? dest.bengaliName : currentLanguage === 'hi' ? dest.hindiName : dest.name}
                      </h3>
                      <p className="text-xs text-[#D4AF37] font-serif italic">
                        {dest.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-4">
                    <p className="text-xs text-[#0F1A2F]/80 leading-relaxed line-clamp-3">
                      {dest.description}
                    </p>

                    {/* Curated Highlights for Selected Tier */}
                    <div className="p-3.5 rounded-xl bg-[#FBF8F3] border border-[#E2DBD0] space-y-2 text-xs">
                      <div className="flex items-center gap-1.5 font-bold text-[#0F1A2F]">
                        {audienceTier === 'luxury' ? <Crown className="w-3.5 h-3.5 text-[#D4AF37]" /> : <Footprints className="w-3.5 h-3.5 text-[#1E6B62]" />}
                        <span>{audienceTier === 'luxury' ? 'Luxury Planter Experiences:' : 'Heritage Homestay Highlights:'}</span>
                      </div>
                      <ul className="space-y-1 text-gray-600 text-[11px]">
                        {(audienceTier === 'luxury' ? dest.luxuryHighlights : dest.essentialHighlights)
                          .slice(0, 2)
                          .map((hl, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <CheckCircle2 className="w-3 h-3 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{hl}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Footer Price & Action */}
                <div className="p-6 pt-0 flex items-center justify-between border-t border-[#E2DBD0] mt-4 pt-4">
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider block">
                      {audienceTier === 'luxury' ? 'Luxury Estate Stay' : 'Heritage Homestay'}
                    </span>
                    <span className="text-base font-bold text-[#0F1A2F]">
                      {CURRENCY_RATES[currency].format(price)}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectDestinationPackage(dest.category)}
                    className="px-4 py-2 rounded-full bg-[#0F1A2F] hover:bg-[#C45C4A] text-[#D4AF37] hover:text-white font-bold text-xs uppercase tracking-wider transition-colors"
                  >
                    View Routes
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="text-center p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0F1A2F] via-[#15233B] to-[#0F1A2F] text-white border border-[#D4AF37]/30 shadow-xl space-y-4">
          <h3 className="text-2xl sm:text-3xl font-bold font-editorial text-[#FBF8F3]">
            Want to combine multiple regions into one seamless Caravan?
          </h3>
          <p className="text-xs sm:text-sm text-white/80 max-w-xl mx-auto font-serif">
            Our 4-step interactive builder allows you to link the Darjeeling hills, Sundarban mangroves, and Shantiniketan into a unified multi-terroir expedition.
          </p>
          <button
            onClick={onOpenBuilder}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E5C058] to-[#C45C4A] text-[#0F1A2F] font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all shimmer-badge"
          >
            Launch The Caravan Builder
          </button>
        </div>

      </div>
    </div>
  );
};
