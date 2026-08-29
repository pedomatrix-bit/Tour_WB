import React, { useState } from 'react';
import { 
  Sparkles, 
  Mountain, 
  Trees, 
  BookOpen, 
  Ship, 
  Calendar, 
  Users, 
  Download, 
  CreditCard, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Crown, 
  Footprints,
  Coffee,
  Camera,
  Music,
  Utensils,
  Eye
} from 'lucide-react';
import { AudienceTier, CaravanBuilderState, Currency, Language } from '../types';
import { TRANSLATIONS, CURRENCY_RATES } from '../data/translations';
import { generateCaravanPDF } from '../utils/pdfGenerator';

interface CaravanBuilderProps {
  currentLanguage: Language;
  audienceTier: AudienceTier;
  onAudienceTierChange: (tier: AudienceTier) => void;
  currency: Currency;
  onProceedToBooking: (bookingData: {
    packageName: string;
    tier: AudienceTier;
    totalAmount: number;
    advanceAmount: number;
    travelers: number;
    startDate: string;
  }) => void;
}

const VIBE_OPTIONS = [
  {
    id: 'mountains',
    title: 'Himalayan Mist & Tea Hills',
    desc: 'Planter bungalows, vintage steam train whistles & Kanchenjunga dawn panoramas',
    icon: Mountain,
    badge: 'Darjeeling • Kurseong • Kalimpong',
    basePrice: 32000,
    luxuryMultiplier: 2.7,
  },
  {
    id: 'wildlife',
    title: 'Tigers & Mangrove Estuaries',
    desc: 'Silent river cruises, tiger tracking, salt-water crocodiles & bioluminescent plankton',
    icon: Trees,
    badge: 'Sundarbans • Dooars • Jaldapara',
    basePrice: 28000,
    luxuryMultiplier: 2.8,
  },
  {
    id: 'heritage',
    title: 'Tagore’s Red Earth & Terracotta',
    desc: 'Open-air poetry classrooms, Sal tree groves, mystic Baul singers & ancient brick shrines',
    icon: BookOpen,
    badge: 'Shantiniketan • Bishnupur • Bolpur',
    basePrice: 22000,
    luxuryMultiplier: 2.5,
  },
  {
    id: 'cruises',
    title: 'Ganges Palaces & Riverine Voyage',
    desc: 'Colonial river trading posts, 19th-century zamindari mansions & clay idol ateliers',
    icon: Ship,
    badge: 'Kolkata • Chandannagar • Kalna',
    basePrice: 26000,
    luxuryMultiplier: 2.6,
  },
];

const DURATION_OPTIONS = [
  { id: '3N4D', label: '3 Nights / 4 Days', sub: 'The Quick Respite Escape', days: 4, multiplier: 0.8 },
  { id: '5N6D', label: '5 Nights / 6 Days', sub: 'The Signature Eastern Caravan', days: 6, multiplier: 1.0, popular: true },
  { id: '7N8D', label: '7 Nights / 8 Days', sub: 'The Grand Exploration Circuit', days: 8, multiplier: 1.35 },
  { id: '10N11D', label: '10 Nights / 11 Days', sub: 'The Royal Masterpiece Odyssey', days: 11, multiplier: 1.8 },
];

const INTEREST_OPTIONS = [
  { id: 'tea', label: 'Single-Estate Tea Cupping & Masterclasses', icon: Coffee },
  { id: 'wildlife', label: 'Wildlife Photography & Naturalist Spotting', icon: Camera },
  { id: 'music', label: 'Private Baul Music & Rabindra Sangeet Recitals', icon: Music },
  { id: 'crafts', label: 'Baluchari Silk Looms & Dokra Metal Casting', icon: Eye },
  { id: 'culinary', label: 'Colonial Planter Meals & Bengali Royal Banquets', icon: Utensils },
  { id: 'train', label: 'UNESCO Steam Toy Train Batasia Joyrides', icon: Mountain },
];

export const CaravanBuilder: React.FC<CaravanBuilderProps> = ({
  currentLanguage,
  audienceTier,
  onAudienceTierChange,
  currency,
  onProceedToBooking,
}) => {
  const t = TRANSLATIONS[currentLanguage];

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedVibe, setSelectedVibe] = useState<string>('mountains');
  const [selectedDuration, setSelectedDuration] = useState<string>('5N6D');
  const [travelersCount, setTravelersCount] = useState<number>(2);
  const [budgetSliderINR, setBudgetSliderINR] = useState<number>(audienceTier === 'luxury' ? 85000 : 32000);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'tea',
    'culinary',
  ]);
  const [travelDate, setTravelDate] = useState<string>('2026-11-15');

  // Handle interest toggling
  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Dynamic calculation
  const vibeObj = VIBE_OPTIONS.find((v) => v.id === selectedVibe) || VIBE_OPTIONS[0];
  const durObj = DURATION_OPTIONS.find((d) => d.id === selectedDuration) || DURATION_OPTIONS[1];

  // Base per-person price
  const tierMultiplier = audienceTier === 'luxury' ? vibeObj.luxuryMultiplier : 1.0;
  const calculatedPerPersonINR = Math.round(vibeObj.basePrice * durObj.multiplier * tierMultiplier);
  const totalTripCostINR = calculatedPerPersonINR * travelersCount;
  const advanceAmountINR = Math.round(totalTripCostINR * 0.2);

  // Generate dynamic evocative title
  const generateDynamicTitle = () => {
    const vibeNames: Record<string, string> = {
      mountains: 'The Grand Kanchenjunga & Tea Estate Caravan',
      wildlife: 'The Royal Bengal Tiger & Delta Safari Caravan',
      heritage: 'The Tagore Red-Earth & Terracotta Caravan',
      cruises: 'The Ganges Renaissance & Palaces Caravan',
    };
    return vibeNames[selectedVibe] || 'The Bespoke Eastern Caravan';
  };

  const calculatedPackageTitle = generateDynamicTitle();

  const handleDownloadPDF = () => {
    const customDays = Array.from({ length: durObj.days }, (_, i) => ({
      day: i + 1,
      title: i === 0 
        ? 'Arrival & Colonial Tea Welcome' 
        : i === durObj.days - 1 
        ? 'Dawn Reverence & Farewell Journey' 
        : `Day ${i + 1}: ${vibeObj.title} Guided Exploration & Curations`,
      summary: `Private curated experiences focusing on ${selectedInterests.join(', ')}. Accommodation in ${
        audienceTier === 'luxury' ? 'Boutique Heritage Suite / Estate Planter Villa' : 'Curated Colonial Homestay'
      }.`,
    }));

    generateCaravanPDF(
      {
        vibe: selectedVibe,
        duration: durObj.label,
        budgetPerPerson: calculatedPerPersonINR,
        tier: audienceTier,
        interests: selectedInterests.map(
          (id) => INTEREST_OPTIONS.find((opt) => opt.id === id)?.label || id
        ),
        travelers: travelersCount,
        travelDate: travelDate,
      },
      calculatedPackageTitle,
      totalTripCostINR,
      durObj.days,
      audienceTier,
      customDays
    );
  };

  const handleBookAdvance = () => {
    onProceedToBooking({
      packageName: calculatedPackageTitle,
      tier: audienceTier,
      totalAmount: totalTripCostINR,
      advanceAmount: advanceAmountINR,
      travelers: travelersCount,
      startDate: travelDate,
    });
  };

  return (
    <div className="py-12 md:py-20 bg-[#F5EFE6] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Wizard Header Banner */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-1 w-8 bg-[#C45C4A]"></span>
            <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#1E6B62]">
              The Caravan Builder
            </span>
            <span className="h-1 w-8 bg-[#C45C4A]"></span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-black tracking-tight text-[#0F1A2F]">
            Architect Your Masterpiece
          </h1>
          <p className="text-base text-[#0F1A2F]/75 mt-3 font-sans max-w-2xl mx-auto">
            Design your bespoke private expedition across Bengal & the Eastern Himalayas. Download instant printable PDF brochures and secure your dates with a 20% advance.
          </p>
        </div>

        {/* Step Progress Tracker Bar */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
            {[
              { num: 1, label: '01. Landscape' },
              { num: 2, label: '02. Duration' },
              { num: 3, label: '03. Budget' },
              { num: 4, label: '04. Passions' },
            ].map((step) => {
              const isActive = currentStep === step.num;
              const isPast = currentStep > step.num;
              return (
                <button
                  key={step.num}
                  onClick={() => setCurrentStep(step.num)}
                  className={`p-3.5 rounded-2xl border text-xs font-bold uppercase tracking-wider transition-all duration-300 flex flex-col items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#0F1A2F] text-[#D4AF37] border-[#0F1A2F] shadow-lg scale-105'
                      : isPast
                      ? 'bg-[#1E6B62] text-white border-[#1E6B62]'
                      : 'bg-white text-[#0F1A2F]/50 border-[#0F1A2F]/10 hover:border-[#0F1A2F]/30'
                  }`}
                >
                  <span className="flex items-center justify-center w-5 h-5 rounded-full text-[10px] bg-white/20">
                    {isPast ? <Check className="w-3 h-3" /> : step.num}
                  </span>
                  <span className="hidden sm:inline truncate">{step.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Grid: Steps on Left, Live Summary Card on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Active Step Interactive Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#0F1A2F]/10 shadow-sm">
            
            {/* STEP 1: Landscape / Vibe */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-[#0F1A2F]/40 block mb-1">
                    Step 01: The Vibe
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F1A2F]">
                    {t.builder.step1Title}
                  </h3>
                  <p className="text-xs text-[#0F1A2F]/60 mt-1">
                    {t.builder.step1Desc}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {VIBE_OPTIONS.map((vibe) => {
                    const Icon = vibe.icon;
                    const isSelected = selectedVibe === vibe.id;
                    return (
                      <div
                        key={vibe.id}
                        onClick={() => setSelectedVibe(vibe.id)}
                        className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                          isSelected
                            ? 'border-[#0F1A2F] bg-[#0F1A2F] text-white shadow-lg'
                            : 'border-[#0F1A2F]/10 bg-[#F5EFE6]/50 hover:border-[#0F1A2F]/30 text-[#0F1A2F]'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-[#D4AF37] text-[#0F1A2F]' : 'bg-white text-[#C45C4A] shadow-sm'}`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            {isSelected && <Check className="w-4 h-4 text-[#D4AF37]" />}
                          </div>

                          <h4 className={`text-base font-bold font-serif ${isSelected ? 'text-[#D4AF37]' : 'text-[#0F1A2F]'}`}>
                            {vibe.title}
                          </h4>
                          <p className={`text-xs mt-1.5 leading-relaxed ${isSelected ? 'text-white/80' : 'text-[#0F1A2F]/70'}`}>
                            {vibe.desc}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-white/10 text-[11px] font-bold tracking-wider uppercase text-gray-400">
                          {vibe.badge}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 2: Duration */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-[#0F1A2F]/40 block mb-1">
                    Step 02: Pacing & Dates
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F1A2F]">
                    {t.builder.step2Title}
                  </h3>
                  <p className="text-xs text-[#0F1A2F]/60 mt-1">
                    {t.builder.step2Desc}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {DURATION_OPTIONS.map((dur) => {
                    const isSelected = selectedDuration === dur.id;
                    return (
                      <div
                        key={dur.id}
                        onClick={() => setSelectedDuration(dur.id)}
                        className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 relative ${
                          isSelected
                            ? 'border-[#0F1A2F] bg-[#0F1A2F] text-white shadow-lg'
                            : 'border-[#0F1A2F]/10 bg-[#F5EFE6]/50 hover:border-[#0F1A2F]/30 text-[#0F1A2F]'
                        }`}
                      >
                        {dur.popular && (
                          <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#C45C4A] text-white uppercase tracking-wider">
                            Signature
                          </span>
                        )}

                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className={`w-4 h-4 ${isSelected ? 'text-[#D4AF37]' : 'text-[#C45C4A]'}`} />
                          <h4 className={`text-base font-bold font-serif ${isSelected ? 'text-[#D4AF37]' : 'text-[#0F1A2F]'}`}>
                            {dur.label}
                          </h4>
                        </div>
                        <p className={`text-xs ${isSelected ? 'text-white/80' : 'text-[#0F1A2F]/70'}`}>
                          {dur.sub}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Date & Explorers count inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#0F1A2F]/10">
                  <div>
                    <label className="block text-xs font-bold text-[#0F1A2F] uppercase tracking-wider mb-2">
                      Tentative Start Date
                    </label>
                    <input
                      type="date"
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E2DBD0] text-sm bg-white text-[#0F1A2F] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0F1A2F] uppercase tracking-wider mb-2">
                      Number of Explorers
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setTravelersCount(Math.max(1, travelersCount - 1))}
                        className="w-10 h-10 rounded-xl bg-gray-100 border border-gray-300 font-bold text-lg flex items-center justify-center hover:bg-gray-200 text-[#0F1A2F]"
                      >
                        -
                      </button>
                      <span className="text-base font-bold text-[#0F1A2F] min-w-[2rem] text-center">
                        {travelersCount}
                      </span>
                      <button
                        onClick={() => setTravelersCount(travelersCount + 1)}
                        className="w-10 h-10 rounded-xl bg-gray-100 border border-gray-300 font-bold text-lg flex items-center justify-center hover:bg-gray-200 text-[#0F1A2F]"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Budget & Experience Tier */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h3 className="text-2xl font-bold font-editorial text-[#0F1A2F]">
                    {t.builder.step3Title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {t.builder.step3Desc}
                  </p>
                </div>

                {/* Audience Tier Switch */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    onClick={() => onAudienceTierChange('luxury')}
                    className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                      audienceTier === 'luxury'
                        ? 'border-[#D4AF37] bg-[#0F1A2F] text-white shadow-md'
                        : 'border-[#E2DBD0] bg-white text-[#0F1A2F]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Crown className="w-4 h-4 text-[#D4AF37]" />
                        <span className="font-bold font-editorial text-lg text-[#D4AF37]">
                          Luxury & Curated
                        </span>
                      </div>
                      {audienceTier === 'luxury' && <Check className="w-4 h-4 text-[#D4AF37]" />}
                    </div>
                    <p className={`text-xs ${audienceTier === 'luxury' ? 'text-white/80' : 'text-gray-600'}`}>
                      Colonial tea estate planter suites (Glenburn/Makaibari), private river cruises, dedicated historian and master naturalist guides.
                    </p>
                  </div>

                  <div
                    onClick={() => onAudienceTierChange('essential')}
                    className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                      audienceTier === 'essential'
                        ? 'border-[#1E6B62] bg-[#1E6B62] text-white shadow-md'
                        : 'border-[#E2DBD0] bg-white text-[#0F1A2F]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Footprints className="w-4 h-4 text-white" />
                        <span className="font-bold font-editorial text-lg text-white">
                          Essential & Heritage
                        </span>
                      </div>
                      {audienceTier === 'essential' && <Check className="w-4 h-4 text-white" />}
                    </div>
                    <p className={`text-xs ${audienceTier === 'essential' ? 'text-white/90' : 'text-gray-600'}`}>
                      Colonial hill homestays, WBFDC forest cottages, regular Joyrides on the Toy Train, authentic village walking tours and community craft workshops.
                    </p>
                  </div>
                </div>

                {/* Budget Slider */}
                <div className="p-6 rounded-2xl bg-[#F5EFE6]/60 border border-[#0F1A2F]/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0F1A2F]">
                      Target Budget (Per Explorer)
                    </span>
                    <span className="text-xl font-bold font-serif text-[#C45C4A]">
                      {CURRENCY_RATES[currency].format(budgetSliderINR)}
                    </span>
                  </div>

                  <input
                    type="range"
                    min="18000"
                    max="220000"
                    step="5000"
                    value={budgetSliderINR}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setBudgetSliderINR(val);
                      if (val > 55000 && audienceTier !== 'luxury') {
                        onAudienceTierChange('luxury');
                      } else if (val <= 55000 && audienceTier !== 'essential') {
                        onAudienceTierChange('essential');
                      }
                    }}
                    className="w-full accent-[#C45C4A] cursor-pointer"
                  />

                  <div className="flex justify-between text-[11px] text-[#0F1A2F]/60 font-semibold">
                    <span>₹18,000 (Essential Heritage)</span>
                    <span>₹2,20,000 (Royal Bespoke)</span>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Interests & Special Curations */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-[#0F1A2F]/40 block mb-1">
                    Step 04: Curated Passions
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F1A2F]">
                    {t.builder.step4Title}
                  </h3>
                  <p className="text-xs text-[#0F1A2F]/60 mt-1">
                    {t.builder.step4Desc}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {INTEREST_OPTIONS.map((interest) => {
                    const isChecked = selectedInterests.includes(interest.id);
                    const Icon = interest.icon;
                    return (
                      <div
                        key={interest.id}
                        onClick={() => toggleInterest(interest.id)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                          isChecked
                            ? 'border-[#0F1A2F] bg-[#0F1A2F] text-white shadow-sm'
                            : 'border-[#0F1A2F]/10 bg-[#F5EFE6]/50 hover:border-[#0F1A2F]/30 text-[#0F1A2F]'
                        }`}
                      >
                        <div className={`p-2 rounded-xl ${isChecked ? 'bg-[#D4AF37] text-[#0F1A2F]' : 'bg-white text-gray-700 shadow-xs'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider flex-grow">
                          {interest.label}
                        </span>
                        <div className={`w-5 h-5 rounded-lg border flex items-center justify-center ${isChecked ? 'bg-[#D4AF37] border-[#D4AF37] text-[#0F1A2F]' : 'border-gray-300'}`}>
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Wizard Navigation Buttons */}
            <div className="flex items-center justify-between pt-8 border-t border-[#0F1A2F]/10 mt-6">
              {currentStep > 1 ? (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="flex items-center gap-2 px-6 py-3 rounded-full border border-[#0F1A2F]/20 hover:bg-[#F5EFE6] text-xs font-bold uppercase tracking-widest text-[#0F1A2F] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
              ) : (
                <div />
              )}

              {currentStep < 4 ? (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="flex items-center gap-2 px-7 py-3 rounded-full bg-[#0F1A2F] hover:bg-[#C45C4A] text-white text-xs font-bold uppercase tracking-widest transition-colors shadow-md cursor-pointer"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleBookAdvance}
                  className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#C45C4A] hover:bg-[#a34a3b] text-white text-xs font-bold uppercase tracking-widest transition-all shadow-md hover:scale-102 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>Finalize & Reserve</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Live Dynamic Caravan Summary Card (5 Cols) */}
          <div className="lg:col-span-5 sticky top-24 space-y-6">
            <div className="bg-[#0F1A2F] text-white rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden">
              
              {/* Decorative Circle stroke */}
              <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
                <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="48" stroke="white" strokeDasharray="4 4" />
                </svg>
              </div>
              
              <div className="flex items-center justify-between pb-4 border-b border-white/15 relative z-10">
                <div className="flex items-center gap-2">
                  <span className="h-1 w-6 bg-[#C45C4A]"></span>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#D4AF37]">
                    Live Estimate
                  </span>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  audienceTier === 'luxury' ? 'bg-[#D4AF37] text-[#0F1A2F]' : 'bg-[#1E6B62] text-white'
                }`}>
                  {audienceTier === 'luxury' ? 'Luxury Planter' : 'Heritage Homestay'}
                </span>
              </div>

              <div className="py-5 space-y-5 relative z-10">
                <h4 className="text-2xl sm:text-3xl font-bold font-serif text-[#FBF8F3] leading-tight">
                  {calculatedPackageTitle}
                </h4>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-gray-400 block text-[10px] uppercase tracking-wider font-bold">Duration</span>
                    <span className="font-bold font-serif text-sm text-[#D4AF37]">{durObj.label}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-gray-400 block text-[10px] uppercase tracking-wider font-bold">Explorers</span>
                    <span className="font-bold font-serif text-sm text-white">{travelersCount} Persons</span>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="p-5 rounded-2xl bg-white/5 border border-[#D4AF37]/20 space-y-3">
                  <div className="flex items-center justify-between text-xs text-white/80">
                    <span className="uppercase tracking-wider font-semibold text-[10px]">Per Person:</span>
                    <span className="font-bold font-serif text-sm text-[#D4AF37]">
                      {CURRENCY_RATES[currency].format(calculatedPerPersonINR)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                    <span className="uppercase tracking-widest text-[11px]">Total Caravan:</span>
                    <span className="text-2xl font-serif font-black text-white">
                      {CURRENCY_RATES[currency].format(totalTripCostINR)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#1E6B62] bg-[#1E6B62]/20 p-3 rounded-xl mt-2 font-medium border border-[#1E6B62]/40">
                    <span className="flex items-center gap-1.5 text-white text-xs font-bold">
                      <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                      20% Advance Lock:
                    </span>
                    <span className="font-bold font-serif text-sm text-[#D4AF37]">
                      {CURRENCY_RATES[currency].format(advanceAmountINR)}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-2">
                  <button
                    id="builder-btn-download-pdf"
                    onClick={handleDownloadPDF}
                    className="w-full py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 border border-white/20 transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-[#D4AF37]" />
                    <span>{t.builder.downloadPdf}</span>
                  </button>

                  <button
                    id="builder-btn-book-advance"
                    onClick={handleBookAdvance}
                    className="w-full py-4 rounded-2xl bg-[#C45C4A] hover:bg-[#a34a3b] text-white font-bold text-xs uppercase tracking-widest flex items-center justify-between px-6 shadow-xl hover:scale-102 active:scale-98 transition-all cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#D4AF37]" />
                      {t.builder.bookAdvance}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-[10px] text-white/50 pt-1">
                  <span>*Instant PDF generation based on 450+ data points. Razorpay & Stripe Ready.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
