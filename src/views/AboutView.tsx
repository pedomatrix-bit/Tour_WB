import React from 'react';
import { 
  Compass, 
  Sparkles, 
  Trees, 
  Coffee, 
  BookOpen, 
  ShieldCheck, 
  Award, 
  Heart,
  Users,
  Building2,
  Train,
  CheckCircle2
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface AboutViewProps {
  currentLanguage: Language;
  onOpenBuilder: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ currentLanguage, onOpenBuilder }) => {
  const t = TRANSLATIONS[currentLanguage];

  return (
    <div className="bg-[#FBF8F3] min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0F1A2F] text-[#D4AF37] text-xs font-mono font-bold uppercase tracking-widest">
            <Compass className="w-3.5 h-3.5" />
            <span>EST. 1998 • THE HERITAGE ATELIER</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-editorial text-[#0F1A2F]">
            The Land of Tigers, Tea, and Tagore
          </h1>
          <p className="text-base sm:text-lg text-gray-700 font-serif italic leading-relaxed">
            “We do not merely organize itineraries; we unlock the living corridors of Eastern India where misty mountain ridges, mysterious delta estuaries, and timeless poetic traditions weave an unforgettable journey.”
          </p>
        </div>

        {/* 3 Pillars of The Eastern Caravan */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Pillar 1: Tigers */}
          <div className="bg-white rounded-3xl p-8 border border-[#E2DBD0] shadow-sm space-y-4 relative overflow-hidden group hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-[#0F1A2F] text-[#D4AF37] flex items-center justify-center">
              <Trees className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold font-editorial text-[#0F1A2F]">
              Tigers & Mangrove Sanctuaries
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Pioneering respectful, zero-carbon boat safaris across the UNESCO Sundarbans biosphere and Dooars elephant corridors. Guided by veteran honey-collector naturalists and tiger trackers.
            </p>
            <div className="text-xs font-bold text-[#1E6B62] pt-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>WWF-Aligned Eco-Code of Conduct</span>
            </div>
          </div>

          {/* Pillar 2: Tea */}
          <div className="bg-white rounded-3xl p-8 border border-[#E2DBD0] shadow-sm space-y-4 relative overflow-hidden group hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-[#0F1A2F] text-[#D4AF37] flex items-center justify-center">
              <Coffee className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold font-editorial text-[#0F1A2F]">
              Tea & Himalayan Planters Terroir
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Direct, exclusive access to century-old colonial planter bungalows in Makaibari, Glenburn, and Castleton. Rare first flush master tastings paired with views of the Kanchenjunga dawn.
            </p>
            <div className="text-xs font-bold text-[#D4AF37] pt-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Single-Estate Tea Cupping Guild</span>
            </div>
          </div>

          {/* Pillar 3: Tagore */}
          <div className="bg-white rounded-3xl p-8 border border-[#E2DBD0] shadow-sm space-y-4 relative overflow-hidden group hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-[#0F1A2F] text-[#D4AF37] flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold font-editorial text-[#0F1A2F]">
              Tagore & Terracotta Renaissance
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Immerse in Nobel Laureate Rabindranath Tagore's open-air sanctuary at Visva-Bharati, live Baul song sessions beneath Chhatimtala trees, and 17th-century Malla terracotta shrines in Bishnupur.
            </p>
            <div className="text-xs font-bold text-[#C45C4A] pt-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Preserving Indigenous Bengali Lore</span>
            </div>
          </div>

        </div>

        {/* Narrative Section with Image */}
        <div className="bg-[#0F1A2F] text-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-[#D4AF37]/30 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono tracking-widest text-[#D4AF37] uppercase">
                THE CARAVAN ODYSSEY
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-editorial text-white leading-snug">
                Bridging Grand Heritage with Sustainable Conservation
              </h2>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-serif">
                Born out of a deep reverence for Bengal's intellectual, botanical, and natural richness, The Eastern Caravan was founded to provide travelers with an authentic, unhurried, and deeply scholarly gateway to Eastern India.
              </p>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-serif">
                Whether staying in a 150-year-old teakwood planter villa overlooking emerald tea terraces or navigating the silent tidal channels of the Sundarbans aboard our bespoke river cruisers, every detail is tuned for genuine connoisseurs.
              </p>

              <div className="pt-4 border-t border-white/10 flex flex-wrap gap-4">
                <button
                  onClick={onOpenBuilder}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C45C4A] text-[#0F1A2F] font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all"
                >
                  Architect Your Caravan
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/40 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80"
                  alt="Darjeeling Heritage"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#0F1A2F] p-4 text-xs font-mono text-[#D4AF37] text-center">
                  Darjeeling Himalayan Railway UNESCO Steam Line & Kanchenjunga
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
