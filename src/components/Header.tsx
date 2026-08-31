import React, { useState } from 'react';
import { 
  Sparkles, 
  Menu, 
  X, 
  ChevronDown, 
  PhoneCall, 
  Crown, 
  Footprints
} from 'lucide-react';
import { AudienceTier, Currency, Language } from '../types';
import { TRANSLATIONS, CURRENCY_RATES } from '../data/translations';

interface HeaderProps {
  currentLanguage?: Language;
  onLanguageChange?: (lang: Language) => void;
  audienceTier: AudienceTier;
  onAudienceTierChange: (tier: AudienceTier) => void;
  currency: Currency;
  onCurrencyChange: (curr: Currency) => void;
  activeView?: string;
  currentView?: string;
  onViewChange?: (view: string) => void;
  onNavigate?: (view: string) => void;
  onOpenBuilder: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLanguage = 'en',
  audienceTier,
  onAudienceTierChange,
  currency,
  onCurrencyChange,
  activeView,
  currentView,
  onViewChange,
  onNavigate,
  onOpenBuilder,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const activeViewKey = activeView || currentView || 'home';
  const handleViewChange = onViewChange || onNavigate || (() => {});

  const t = TRANSLATIONS['en'];

  const navItems = [
    { key: 'home', label: t.nav.home },
    { key: 'destinations', label: t.nav.destinations },
    { key: 'packages', label: t.nav.packages },
    { key: 'about', label: t.nav.about },
    { key: 'gazette', label: t.nav.journal },
    { key: 'contact', label: t.nav.contact },
  ];

  const handleNavClick = (key: string, isBuilder?: boolean) => {
    if (isBuilder) {
      onOpenBuilder();
    } else {
      handleViewChange(key);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300 shadow-xs border-b border-[#0F1A2F]/10 bg-[#F5EFE6]/95 backdrop-blur-md text-[#0F1A2F]">
      {/* Top Utility Bar */}
      <div className="hidden lg:block border-b border-[#0F1A2F]/10 bg-[#0F1A2F] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[#D4AF37] font-bold uppercase tracking-widest text-[10px]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.tagline}</span>
            </span>
            <span className="text-white/25">•</span>
            <span className="text-white/70 text-[11px] font-medium tracking-wide">
              Kolkata • Darjeeling • Sundarbans • Shantiniketan • Dooars
            </span>
          </div>

          <div className="flex items-center gap-5">
            {/* Audience Tier Switcher Bar */}
            <div className="flex bg-white/10 border border-white/15 rounded-full p-0.5">
              <button
                id="header-tier-luxury"
                onClick={() => onAudienceTierChange('luxury')}
                className={`flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  audienceTier === 'luxury'
                    ? 'bg-[#D4AF37] text-[#0F1A2F] shadow-xs'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                <Crown className="w-3 h-3" />
                <span>{t.tier.luxuryLabel}</span>
              </button>
              <button
                id="header-tier-essential"
                onClick={() => onAudienceTierChange('essential')}
                className={`flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  audienceTier === 'essential'
                    ? 'bg-[#1E6B62] text-white shadow-xs'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                <Footprints className="w-3 h-3" />
                <span>{t.tier.essentialLabel}</span>
              </button>
            </div>

            {/* Currency Switcher */}
            <div className="relative">
              <button
                id="header-currency-toggle"
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 hover:border-[#D4AF37]/60 text-white text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <span className="text-[#D4AF37] font-bold">{CURRENCY_RATES[currency].symbol}</span>
                <span>{currency}</span>
                <ChevronDown className="w-3 h-3 text-white/50" />
              </button>
              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-28 bg-[#0F1A2F] border border-white/20 rounded-xl shadow-xl py-1 z-50 overflow-hidden animate-fadeIn">
                  {(['INR', 'USD', 'EUR'] as Currency[]).map((curr) => (
                    <button
                      key={curr}
                      onClick={() => {
                        onCurrencyChange(curr);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer ${
                        currency === curr ? 'text-[#D4AF37] font-bold bg-white/15' : 'text-white'
                      }`}
                    >
                      <span className="font-bold">{curr}</span>
                      <span className="text-white/50">{CURRENCY_RATES[curr].symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="w-px h-3.5 bg-white/20"></div>

            {/* Direct Telephone Concierge */}
            <a 
              href="tel:+919830144555" 
              className="flex items-center gap-1.5 text-white/80 hover:text-[#D4AF37] font-semibold text-[11px] transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-[#D4AF37]" />
              <span>+91 98301 44555</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          
          {/* Logo / Brand Name */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none py-1"
          >
            <img 
              src="/logo.png" 
              alt="The Eastern Caravan Logo" 
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border border-[#D4AF37]/50 shadow-xs group-hover:scale-105 group-hover:border-[#C45C4A] transition-all duration-300 flex-shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight uppercase font-serif text-[#0F1A2F] group-hover:text-[#C45C4A] transition-colors leading-none">
                {t.brandName}
              </span>
              <span className="text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.22em] uppercase font-bold text-[#C45C4A] mt-1.5 font-sans">
                {t.tagline}
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            {navItems.map((item) => {
              const isActive = activeViewKey === item.key;
              return (
                <button
                  key={item.key}
                  id={`nav-link-${item.key}`}
                  onClick={() => handleNavClick(item.key)}
                  className={`text-[11px] xl:text-[12px] uppercase tracking-[0.14em] font-bold transition-all py-1.5 px-1 relative cursor-pointer ${
                    isActive
                      ? 'text-[#C45C4A] border-b-2 border-[#C45C4A]'
                      : 'text-[#0F1A2F]/70 hover:text-[#C45C4A]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* CTA Action Button */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              id="header-cta-caravan-builder"
              onClick={onOpenBuilder}
              className="bg-[#C45C4A] hover:bg-[#a34a3b] text-white py-2.5 px-5 rounded-full flex items-center gap-2 uppercase tracking-widest font-bold text-xs shadow-sm hover:shadow transition-all cursor-pointer hover:scale-102 active:scale-98"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{t.hero.ctaPlan}</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 bg-[#0F1A2F] text-white rounded-full hover:bg-[#0F1A2F]/90 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#0F1A2F]/15 px-6 py-5 space-y-4 shadow-2xl animate-fadeIn">
          {/* Tier Switcher for Mobile */}
          <div className="flex bg-[#F5EFE6] border border-[#0F1A2F]/15 rounded-full p-1 shadow-xs">
            <button
              onClick={() => onAudienceTierChange('luxury')}
              className={`flex-1 py-2 text-xs font-bold uppercase rounded-full flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                audienceTier === 'luxury'
                  ? 'bg-[#0F1A2F] text-white shadow-xs'
                  : 'text-[#0F1A2F]/60'
              }`}
            >
              <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
              {t.tier.luxuryLabel}
            </button>
            <button
              onClick={() => onAudienceTierChange('essential')}
              className={`flex-1 py-2 text-xs font-bold uppercase rounded-full flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                audienceTier === 'essential'
                  ? 'bg-[#1E6B62] text-white shadow-xs'
                  : 'text-[#0F1A2F]/60'
              }`}
            >
              <Footprints className="w-3.5 h-3.5" />
              {t.tier.essentialLabel}
            </button>
          </div>

          {/* Currency Switcher for Mobile */}
          <div className="flex items-center justify-between py-2 border-b border-[#0F1A2F]/10 text-xs">
            <span className="text-[#0F1A2F]/60 uppercase tracking-wider font-bold text-[10px]">Currency:</span>
            <div className="flex items-center gap-1.5">
              {(['INR', 'USD', 'EUR'] as Currency[]).map((c) => (
                <button
                  key={c}
                  onClick={() => onCurrencyChange(c)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                    currency === c ? 'bg-[#0F1A2F] text-white' : 'text-[#0F1A2F]/60 hover:bg-[#0F1A2F]/5'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Nav Items list */}
          <div className="grid grid-cols-1 gap-1.5 pt-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.key)}
                className={`text-left px-4 py-2.5 rounded-xl text-xs uppercase tracking-widest font-bold flex items-center justify-between transition-colors cursor-pointer ${
                  activeViewKey === item.key
                    ? 'bg-[#0F1A2F] text-white'
                    : 'text-[#0F1A2F]/80 hover:bg-[#F5EFE6]'
                }`}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Direct Phone & CTA */}
          <div className="pt-2 space-y-2.5">
            <a 
              href="tel:+919830144555" 
              className="w-full py-2.5 px-4 rounded-xl border border-[#0F1A2F]/20 text-[#0F1A2F] text-xs font-bold flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#C45C4A]" />
              <span>Direct Concierge: +91 98301 44555</span>
            </a>

            <button
              onClick={() => {
                onOpenBuilder();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3.5 rounded-full bg-[#C45C4A] hover:bg-[#a34a3b] text-white font-bold text-center text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              {t.hero.ctaPlan}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

