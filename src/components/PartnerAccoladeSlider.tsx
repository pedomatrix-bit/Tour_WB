import React from 'react';
import { Landmark, Train, ShieldCheck, Building2, Trees, Coffee } from 'lucide-react';
import { PARTNERS } from '../data/reviewsData';

export const PartnerAccoladeSlider: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Landmark': return <Landmark className="w-5 h-5 text-[#D4AF37]" />;
      case 'Train': return <Train className="w-5 h-5 text-[#D4AF37]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />;
      case 'Building2': return <Building2 className="w-5 h-5 text-[#D4AF37]" />;
      case 'Trees': return <Trees className="w-5 h-5 text-[#D4AF37]" />;
      case 'Coffee': return <Coffee className="w-5 h-5 text-[#D4AF37]" />;
      default: return <Landmark className="w-5 h-5 text-[#D4AF37]" />;
    }
  };

  return (
    <div className="py-10 bg-[#0A1220] border-y border-white/10 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <span className="text-[11px] font-mono tracking-widest uppercase text-[#D4AF37]">
          ESTATE ALLIANCES, CONSERVATION CHARTERS & HERITAGE PATRONS
        </span>
      </div>

      {/* Ticker marquee */}
      <div className="flex space-x-8 animate-marquee whitespace-nowrap overflow-x-auto no-scrollbar py-2">
        {PARTNERS.concat(PARTNERS).map((partner, idx) => (
          <div
            key={idx}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 flex-shrink-0 hover:border-[#D4AF37]/50 transition-colors"
          >
            <div className="p-2 rounded-lg bg-[#0F1A2F]">
              {getIcon(partner.icon)}
            </div>
            <div className="text-left">
              <span className="text-xs font-bold text-white block">
                {partner.name}
              </span>
              <span className="text-[10px] text-gray-400 font-mono">
                {partner.role}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
