import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Compass, 
  Calendar, 
  Users, 
  MapPin, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Crown
} from 'lucide-react';
import { AudienceTier, Currency, Language } from '../types';
import { TRANSLATIONS, CURRENCY_RATES } from '../data/translations';

interface HeroSlide {
  id: string;
  image: string;
  location: string;
  titleEn: string;
  titleBn: string;
  titleHi: string;
  tagEn: string;
  tagBn: string;
  tagHi: string;
  quoteEn: string;
  quoteBn: string;
  quoteHi: string;
  highlightStat: string;
  viewTarget: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'darjeeling',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1920&auto=format&fit=crop',
    location: 'Darjeeling & Eastern Himalayas',
    titleEn: 'Where Morning Mist Pours Champagne Tea',
    titleBn: 'যেখানে কাঞ্চনজঙ্ঘার ভোরে বাজে টয় ট্রেনের বাঁশি',
    titleHi: 'जहां सुबह का कोहरा कंचनजंघा पर स्वर्णिम चाय बिखेरता है',
    tagEn: '150-Year Heritage Planters & Toy Train',
    tagBn: '১৫০ বছরের পুরোনো চা বাগান ও ঐতিহ্যবাহী স্টিম ইঞ্জিন',
    tagHi: '150 वर्ष पुराने टी एस्टेट और यूनेस्को टॉय ट्रेन',
    quoteEn: '“The mountains are calling with the aroma of freshly withered tea leaves.”',
    quoteBn: '“পাহাড়ের ডাক আর সদ্য তোলা ফার্স্ট ফ্লাশ চা পাতার সুবাস।”',
    quoteHi: '“पहाड़ों की पुकार और ताज़ी पहली चाय की मनमोहक खुशबू।”',
    highlightStat: 'Altitude 2,134m • Glenburn & Makaibari Planter Suites',
    viewTarget: 'packages',
  },
  {
    id: 'sundarbans',
    image: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?q=80&w=1920&auto=format&fit=crop',
    location: 'The Sundarbans Mangrove Delta',
    titleEn: 'Kingdom of the Swimming Royal Bengal Tiger',
    titleBn: 'বাদাবনে নিঃশব্দ জলধারা ও রাজকীয় বাঘের পদচিহ্ন',
    titleHi: 'तैरते हुए रॉयल बंगाल टाइगर और मैंग्रोव का मूक साम्राज्य',
    tagEn: 'Silent Electric Safaris & River Cruisers',
    tagBn: 'নদী ক্রুজ ও বর্ষীয়ান শিকারী-প্রকৃতিবিদদের ট্র্যাকিং',
    tagHi: 'शांत नदी क्रूज़ और अनुभवी प्रकृतिविदों के साथ ट्रैकिंग',
    quoteEn: '“In the tidal labyrinths, every rising wave rewrites the forest secrets.”',
    quoteBn: '“জোয়ার-ভাটার খেলায় প্রতিটি ঢেউ উন্মোচন করে নতুন রহস্য।”',
    quoteHi: '“ज्वार-भाटे के इस चक्रव्यूह में हर लहर नए रहस्य बुनती है।”',
    highlightStat: 'World’s Largest Delta • 98% Sighting Record',
    viewTarget: 'packages',
  },
  {
    id: 'shantiniketan',
    image: 'https://images.unsplash.com/photo-1609137144822-2636a0d4a796?q=80&w=1920&auto=format&fit=crop',
    location: 'Shantiniketan & Bishnupur Heritage',
    titleEn: 'Tagore’s Red Earth & Terracotta Dynasties',
    titleBn: 'রবীন্দ্রনাথের লাল মাটির গান ও পোড়ামাটির অপূর্ব স্থাপত্য',
    titleHi: 'टैगोर की लाल माटी, बाउल संगीत और टेराकोटा मंदिर',
    tagEn: 'Literature, Baul Mystics & Baluchari Silk',
    tagBn: 'বিশ্বভারতী, সোনঝুরি হাট ও সপ্তদশ শতকের কারুকার্য',
    tagHi: 'विश्वभारती, सोनाझुरी हाट और 17वीं सदी की कलाकृतियां',
    quoteEn: '“Let the red soil of Birbhum awaken the poet in your soul.”',
    quoteBn: '“শান্তিনিকেতনের উন্মুক্ত বাতাস মনের ভেতরের কবিকে জাগিয়ে তোলে।”',
    quoteHi: '“बीरभूम की लाल मिट्टी आपकी आत्मा के कवि को जगाती है।”',
    highlightStat: 'Nobel Heritage 1913 • Live Baul Acoustic Recitals',
    viewTarget: 'packages',
  },
  {
    id: 'dooars',
    image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?q=80&w=1920&auto=format&fit=crop',
    location: 'Dooars Foothills & Jaldapara',
    titleEn: 'Wild Elephant Corridors & The Armored Rhino',
    titleBn: 'ডুয়ার্সের শালবন ও একশৃঙ্গ গণ্ডারের অভয়ারণ্য',
    titleHi: 'डुआर्स के घने जंगल और एक-सींग वाले दुर्लभ गैंडे',
    tagEn: 'Elephant Safaris & Bhutan Foothills',
    tagBn: 'জলদাপাড়া ও গরুমারা অভয়ারণ্যে উন্মুক্ত জিপ সাফারি',
    tagHi: 'हाथी सफारी और भूटान की तलहटी में रोमांचक रातें',
    quoteEn: '“Dew on the tall elephant grass as giants walk in the dawn silence.”',
    quoteBn: '“ভোরের কুয়াশা চিরে এগিয়ে চলে জলদাপাড়ার বিশালকায় গণ্ডার।”',
    quoteHi: '“सुबह की ओस में विशालकाय गैंडे जब घास के मैदान से गुजरते हैं।”',
    highlightStat: 'Sub-Himalayan Rainforests • 4x4 Gypsy Forest Trails',
    viewTarget: 'packages',
  },
];

interface HeroCarouselProps {
  currentLanguage: Language;
  audienceTier: AudienceTier;
  currency: Currency;
  onOpenBuilder: () => void;
  onExplorePackages: () => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  currentLanguage,
  audienceTier,
  currency,
  onOpenBuilder,
  onExplorePackages,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const t = TRANSLATIONS[currentLanguage];
  const currentSlide = HERO_SLIDES[currentSlideIndex];

  // Auto rotation
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const getSlideTitle = (slide: HeroSlide) => {
    if (currentLanguage === 'bn') return slide.titleBn;
    if (currentLanguage === 'hi') return slide.titleHi;
    return slide.titleEn;
  };

  const getSlideTag = (slide: HeroSlide) => {
    if (currentLanguage === 'bn') return slide.tagBn;
    if (currentLanguage === 'hi') return slide.tagHi;
    return slide.tagEn;
  };

  const getSlideQuote = (slide: HeroSlide) => {
    if (currentLanguage === 'bn') return slide.quoteBn;
    if (currentLanguage === 'hi') return slide.quoteHi;
    return slide.quoteEn;
  };

  return (
    <div className="relative w-full h-[88vh] min-h-[620px] max-h-[850px] overflow-hidden bg-[#0F1A2F]">
      {/* Background Slides with Ken Burns zoom */}
      {HERO_SLIDES.map((slide, idx) => {
        const isActive = idx === currentSlideIndex;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.location}
              className={`w-full h-full object-cover object-center ${
                isActive ? 'animate-kenburns' : ''
              }`}
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F1A2F]/90 via-[#0F1A2F]/50 to-[#0F1A2F]/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A2F] via-transparent to-[#0F1A2F]/30" />
          </div>
        );
      })}

      {/* Foreground Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-between py-10 md:py-16">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-3 animate-fadeIn">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#0F1A2F]/80 border border-[#D4AF37]/50 text-[#F6E6B4] backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{getSlideTag(currentSlide)}</span>
          </span>

          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#1E6B62]/80 text-white backdrop-blur-md border border-white/10">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{currentSlide.highlightStat}</span>
          </span>

          {audienceTier === 'luxury' ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-[#D4AF37] to-[#C45C4A] text-[#0F1A2F] shadow-sm">
              <Crown className="w-3.5 h-3.5" />
              <span>Luxury & Curated Edition</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#1E6B62] text-white shadow-sm">
              <Compass className="w-3.5 h-3.5" />
              <span>Essential & Heritage Edition</span>
            </span>
          )}
        </div>

        {/* Center Main Headline Section */}
        <div className="max-w-4xl space-y-6 my-auto">
          <div>
            <h2 className="text-[11px] sm:text-xs uppercase tracking-[0.4em] font-bold text-[#D4AF37] mb-3 block">
              Curated Heritage Journeys • {currentSlide.location}
            </h2>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif font-black tracking-tight text-[#FBF8F3] leading-[0.92] drop-shadow-md">
              {getSlideTitle(currentSlide)}
            </h1>
          </div>

          <p className="text-base sm:text-lg md:text-xl text-white/90 font-serif max-w-2xl leading-relaxed border-l-2 border-[#D4AF37] pl-4">
            {getSlideQuote(currentSlide)}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            <button
              id="hero-cta-builder"
              onClick={onOpenBuilder}
              className="flex items-center gap-3 px-8 py-4 rounded-full bg-[#C45C4A] hover:bg-[#a34a3b] text-white font-bold text-xs sm:text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-102 active:scale-98 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>{t.hero.ctaPlan}</span>
            </button>

            <button
              id="hero-cta-explore"
              onClick={onExplorePackages}
              className="flex items-center gap-2.5 px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-[#FBF8F3] font-bold text-xs sm:text-sm uppercase tracking-widest backdrop-blur-md border border-white/30 transition-all hover:border-[#D4AF37]"
            >
              <span>{t.hero.ctaExplore}</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </div>

          {/* Bold Metric Strip */}
          <div className="flex items-center gap-2 sm:gap-4 pt-4 border-t border-white/10">
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-white">24+</span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold text-white/60">Destinations</span>
            </div>
            <div className="w-px h-8 bg-white/20 mx-3 sm:mx-4"></div>
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-white">12</span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold text-white/60">Expeditions</span>
            </div>
            <div className="w-px h-8 bg-white/20 mx-3 sm:mx-4"></div>
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-white">4.9/5</span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold text-white/60">Rating</span>
            </div>
          </div>
        </div>

        {/* Bottom Quick Search / Carousel Navigation Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-white/15">
          {/* Slide Indicators */}
          <div className="flex items-center gap-2">
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => {
                  setCurrentSlideIndex(idx);
                  setIsAutoPlaying(false);
                }}
                className={`h-2 rounded-full transition-all duration-500 ${
                  idx === currentSlideIndex
                    ? 'w-10 bg-gradient-to-r from-[#D4AF37] to-[#C45C4A]'
                    : 'w-2.5 bg-white/30 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Quick Stats Banner */}
          <div className="hidden md:flex items-center gap-6 text-xs text-white/80">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>20% Advance Online Booking Lock</span>
            </span>
            <span className="text-white/30">•</span>
            <span>Razorpay (INR) & Stripe (USD/EUR) Ready</span>
          </div>

          {/* Manual Arrow Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setCurrentSlideIndex((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
                setIsAutoPlaying(false);
              }}
              className="w-10 h-10 rounded-full bg-[#0F1A2F]/80 border border-white/20 hover:border-[#D4AF37] flex items-center justify-center text-white hover:text-[#D4AF37] transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
                setIsAutoPlaying(false);
              }}
              className="w-10 h-10 rounded-full bg-[#0F1A2F]/80 border border-white/20 hover:border-[#D4AF37] flex items-center justify-center text-white hover:text-[#D4AF37] transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
