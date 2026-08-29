import React, { useState } from 'react';
import { 
  Globe, 
  Sparkles, 
  Compass, 
  Menu, 
  X, 
  ChevronDown, 
  PhoneCall, 
  Crown, 
  Footprints,
  FileText
} from 'lucide-react';
import { AudienceTier, Currency, Language } from '../types';
import { TRANSLATIONS, CURRENCY_RATES } from '../data/translations';

interface HeaderProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
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
  currentLanguage,
  onLanguageChange,
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
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const activeViewKey = activeView || currentView || 'home';
  const handleViewChange = onViewChange || onNavigate || (() => {});

  const t = TRANSLATIONS[currentLanguage];

  const navItems = [
    { key: 'home', label: t.nav.home },
    { key: 'destinations', label: t.nav.destinations },
    { key: 'packages', label: t.nav.packages },
    { key: 'builder', label: t.nav.builder, isBuilder: true },
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
    <header className="sticky top-0 z-40 w-full transition-all duration-300 shadow-sm border-b border-[#0F1A2F]/10 bg-white/70 backdrop-blur-md text-[#0F1A2F]">
      {/* Top Utility Bar */}
      <div className="hidden lg:flex items-center justify-between px-8 py-2 text-xs border-b border-[#0F1A2F]/10 bg-[#F5EFE6]/60">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-[#1E6B62] font-bold uppercase tracking-widest text-[10px]">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>“{t.tagline}”</span>
          </span>
          <span className="text-[#0F1A2F]/20">•</span>
          <span className="text-[#0F1A2F]/60 text-[11px] font-medium tracking-wide">
            Kolkata • Darjeeling • Sundarbans • Shantiniketan • Dooars
          </span>
        </div>

        <div className="flex items-center gap-6">
          {/* Audience Tier Switcher Bar (Bold capsule) */}
          <div className="flex bg-white border border-[#0F1A2F]/20 rounded-full p-0.5 shadow-sm">
            <button
              id="header-tier-luxury"
              onClick={() => onAudienceTierChange('luxury')}
              className={`flex items-center gap-1.5 px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-200 ${
                audienceTier === 'luxury'
                  ? 'bg-[#0F1A2F] text-white shadow-sm'
                  : 'text-[#0F1A2F]/60 hover:text-[#0F1A2F]'
              }`}
            >
              <Crown className="w-3 h-3 text-[#D4AF37]" />
              <span>{t.tier.luxuryLabel}</span>
            </button>
            <button
              id="header-tier-essential"
              onClick={() => onAudienceTierChange('essential')}
              className={`flex items-center gap-1.5 px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-200 ${
                audienceTier === 'essential'
                  ? 'bg-[#1E6B62] text-white shadow-sm'
                  : 'text-[#0F1A2F]/60 hover:text-[#0F1A2F]'
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
              onClick={() => {
                setCurrencyDropdownOpen(!currencyDropdownOpen);
                setLangDropdownOpen(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#0F1A2F]/15 hover:border-[#0F1A2F]/40 text-[#0F1A2F] text-[11px] font-bold uppercase tracking-wider transition-colors shadow-xs"
            >
              <span className="text-[#D4AF37] font-bold">{CURRENCY_RATES[currency].symbol}</span>
              <span>{currency}</span>
              <ChevronDown className="w-3 h-3 text-[#0F1A2F]/50" />
            </button>
            {currencyDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-28 bg-white border border-[#0F1A2F]/15 rounded-xl shadow-xl py-1 z-50 overflow-hidden animate-fadeIn">
                {(['INR', 'USD', 'EUR'] as Currency[]).map((curr) => (
                  <button
                    key={curr}
                    onClick={() => {
                      onCurrencyChange(curr);
                      setCurrencyDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-1.5 text-xs flex items-center justify-between hover:bg-[#F5EFE6] transition-colors ${
                      currency === curr ? 'text-[#C45C4A] font-bold bg-[#F5EFE6]/70' : 'text-[#0F1A2F]'
                    }`}
                  >
                    <span className="font-bold">{curr}</span>
                    <span className="text-[#0F1A2F]/50">{CURRENCY_RATES[curr].symbol}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Trilingual Direct Switcher (Bold Typography) */}
          <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-widest">
            <span
              onClick={() => onLanguageChange('en')}
              className={`cursor-pointer transition-colors pb-0.5 ${
                currentLanguage === 'en'
                  ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]'
                  : 'text-[#0F1A2F]/40 hover:text-[#0F1A2F]'
              }`}
            >
              EN
            </span>
            <span
              onClick={() => onLanguageChange('bn')}
              className={`cursor-pointer transition-colors pb-0.5 ${
                currentLanguage === 'bn'
                  ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]'
                  : 'text-[#0F1A2F]/40 hover:text-[#0F1A2F]'
              }`}
            >
              বাংলা
            </span>
            <span
              onClick={() => onLanguageChange('hi')}
              className={`cursor-pointer transition-colors pb-0.5 ${
                currentLanguage === 'hi'
                  ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]'
                  : 'text-[#0F1A2F]/40 hover:text-[#0F1A2F]'
              }`}
            >
              हिन्दी
            </span>
          </div>

          <a 
            href="tel:+919830144555" 
            className="flex items-center gap-1.5 text-[#0F1A2F]/70 hover:text-[#C45C4A] font-semibold text-xs transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#C45C4A]" />
            <span>+91 98301 44555</span>
          </a>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand Name with Bold Typography */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex flex-col cursor-pointer group select-none"
          >
            <span className="text-xl sm:text-2xl font-bold tracking-tighter uppercase font-serif text-[#0F1A2F] group-hover:text-[#C45C4A] transition-colors leading-none">
              {t.brandName}
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#C45C4A] mt-1">
              {t.tagline}
            </span>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = activeViewKey === item.key;
              return (
                <button
                  key={item.key}
                  id={`nav-link-${item.key}`}
                  onClick={() => handleNavClick(item.key, item.isBuilder)}
                  className={`text-[12px] uppercase tracking-widest font-bold transition-all py-1.5 relative ${
                    isActive
                      ? 'text-[#0F1A2F] border-b-2 border-[#0F1A2F]'
                      : 'text-[#0F1A2F]/60 hover:text-[#C45C4A]'
                  }`}
                >
                  {item.label}
                  {item.isBuilder && (
                    <span className="ml-1.5 px-1.5 py-0.5 text-[9px] uppercase tracking-wider font-bold rounded bg-[#C45C4A] text-white">
                      Wizard
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* CTA Action Button */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              id="header-cta-caravan-builder"
              onClick={onOpenBuilder}
              className="bg-[#C45C4A] hover:bg-[#a34a3b] text-white py-2.5 px-6 rounded-full flex items-center gap-2 uppercase tracking-widest font-bold text-xs shadow-sm hover:shadow transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>{t.hero.ctaPlan}</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 bg-[#0F1A2F] text-white rounded-full hover:bg-[#0F1A2F]/90 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#0F1A2F]/15 px-6 py-6 space-y-5 shadow-2xl animate-fadeIn">
          {/* Tier Switcher for Mobile */}
          <div className="flex bg-[#F5EFE6] border border-[#0F1A2F]/20 rounded-full p-1 shadow-sm">
            <button
              onClick={() => onAudienceTierChange('luxury')}
              className={`flex-1 py-2 text-xs font-bold uppercase rounded-full flex items-center justify-center gap-1.5 ${
                audienceTier === 'luxury'
                  ? 'bg-[#0F1A2F] text-white shadow-sm'
                  : 'text-[#0F1A2F]/60'
              }`}
            >
              <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
              {t.tier.luxuryLabel}
            </button>
            <button
              onClick={() => onAudienceTierChange('essential')}
              className={`flex-1 py-2 text-xs font-bold uppercase rounded-full flex items-center justify-center gap-1.5 ${
                audienceTier === 'essential'
                  ? 'bg-[#1E6B62] text-white shadow-sm'
                  : 'text-[#0F1A2F]/60'
              }`}
            >
              <Footprints className="w-3.5 h-3.5" />
              {t.tier.essentialLabel}
            </button>
          </div>

          {/* Currency & Language Row */}
          <div className="flex items-center justify-between py-2 border-b border-[#0F1A2F]/10 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[#0F1A2F]/60 uppercase tracking-wider font-bold text-[10px]">Currency:</span>
              {(['INR', 'USD', 'EUR'] as Currency[]).map((c) => (
                <button
                  key={c}
                  onClick={() => onCurrencyChange(c)}
                  className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    currency === c ? 'bg-[#0F1A2F] text-white' : 'text-[#0F1A2F]/60 hover:bg-[#0F1A2F]/5'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-wider">
              {(['en', 'bn', 'hi'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => onLanguageChange(l)}
                  className={`pb-0.5 ${
                    currentLanguage === l ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]' : 'text-[#0F1A2F]/40'
                  }`}
                >
                  {l === 'en' ? 'EN' : l === 'bn' ? 'বাংলা' : 'हिन्दी'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 pt-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.key, item.isBuilder)}
                className={`text-left px-4 py-2.5 rounded-xl text-xs uppercase tracking-widest font-bold flex items-center justify-between ${
                  activeViewKey === item.key
                    ? 'bg-[#0F1A2F] text-white'
                    : 'text-[#0F1A2F]/80 hover:bg-[#F5EFE6]'
                }`}
              >
                <span>{item.label}</span>
                {item.isBuilder && (
                  <span className="px-2 py-0.5 text-[9px] bg-[#C45C4A] text-white rounded font-bold">
                    Wizard
                  </span>
                )}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              onOpenBuilder();
              setMobileMenuOpen(false);
            }}
            className="w-full py-3.5 rounded-full bg-[#C45C4A] hover:bg-[#a34a3b] text-white font-bold text-center text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-md transition-colors"
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            {t.hero.ctaPlan}
          </button>
        </div>
      )}
    </header>
  );
};
