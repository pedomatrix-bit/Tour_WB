import React, { useState } from 'react';
import { 
  Compass, 
  Mail, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Send, 
  CheckCircle, 
  Sparkles,
  Award,
  Heart
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface FooterProps {
  currentLanguage: Language;
  onNavigate: (view: string) => void;
  onOpenBuilder: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLanguage,
  onNavigate,
  onOpenBuilder,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const t = TRANSLATIONS[currentLanguage];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#0F1A2F] text-white border-t border-[#0F1A2F]/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Tagore Quote Banner */}
        <div className="text-center p-10 rounded-3xl bg-[#15233B]/60 border border-white/10 max-w-4xl mx-auto relative overflow-hidden shadow-2xl">
          <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mx-auto mb-4 text-[#D4AF37]">
            <Sparkles className="w-5 h-5" />
          </div>
          <blockquote className="text-xl sm:text-2xl font-serif italic text-[#FBF8F3] leading-relaxed">
            {t.footer.tagoreQuote}
          </blockquote>
          <cite className="block text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-bold mt-4">
            {t.footer.tagoreAuthor}
          </cite>
        </div>

        {/* 4 Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 text-xs text-white/75">
          
          {/* Col 1: Brand & Bio (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3.5">
              <img 
                src="/logo.png" 
                alt="The Eastern Caravan Emblem" 
                className="w-12 h-12 rounded-full object-cover border border-[#D4AF37]/50 shadow-md flex-shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <span className="text-2xl font-bold font-serif uppercase tracking-tight text-white leading-none">
                  {t.brandName}
                </span>
                <p className="text-[10px] text-[#C45C4A] tracking-[0.2em] uppercase font-bold mt-1.5">
                  {t.tagline}
                </p>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-white/70">
              The premier bespoke travel atelier specializing in the cultural renaissance, single-estate tea terroir, and wild delta sanctuaries of Eastern India and the sub-Himalayas.
            </p>

            <div className="flex items-center gap-2 pt-2 text-[#D4AF37]">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[11px] font-semibold">
                Razorpay (INR) & Stripe (Global) 20% Advance Hybrid System
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              Grand Itineraries
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('packages')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Darjeeling Tea Estates
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('packages')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Sundarbans Tiger Cruise
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('packages')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Tagore & Terracotta Trail
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('packages')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Dooars Elephant & Rhino Safaris
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBuilder}
                  className="text-[#C45C4A] hover:underline font-bold uppercase tracking-wider text-[11px]"
                >
                  Launch Caravan Wizard
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Regional Concierge Offices (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              Heritage Concierge Hubs
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C45C4A] flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Kolkata Headquarters:</strong> 44 Park Street, Heritage Suite 3B, Kolkata 700016
                </span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C45C4A] flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Darjeeling Planters Office:</strong> Mall Road (Near Windamere), Darjeeling 734101
                </span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="font-semibold">+91 98301 44555 / +91 33 2287 4000</span>
              </div>
            </div>
          </div>

          {/* Col 4: Newsletter & 10% Loyalty Code (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              {t.footer.newsletterTitle}
            </h4>
            <p className="text-[11px] leading-relaxed text-white/70">
              {t.footer.newsletterDesc}
            </p>

            {subscribed ? (
              <div className="p-3 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <CheckCircle className="w-4 h-4" />
                  <span>Welcome to the Caravan Club!</span>
                </div>
                <p className="text-[10px]">
                  Use promo code <strong className="text-white font-mono">SONAR-BENGAL-10</strong> for 10% discount on advance bookings.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder={t.footer.newsletterPlaceholder}
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-full bg-white/10 border border-white/20 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-full bg-[#C45C4A] hover:bg-[#a34a3b] text-white font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer"
                >
                  {t.footer.newsletterBtn}
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/50">
          <p>{t.footer.rights}</p>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('about')} className="hover:text-white">
              Heritage Philosophy
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('contact')} className="hover:text-white">
              Naturalist Network
            </button>
            <span>•</span>
            <span className="flex items-center gap-1 text-[#D4AF37]">
              <Heart className="w-3 h-3 text-[#C45C4A] fill-[#C45C4A]" />
              <span>Crafted for True Connoisseurs</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
