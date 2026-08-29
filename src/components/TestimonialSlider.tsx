import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Quote, 
  MapPin, 
  CheckCircle,
  Crown,
  Footprints
} from 'lucide-react';
import { Language } from '../types';
import { TESTIMONIALS } from '../data/reviewsData';

interface TestimonialSliderProps {
  currentLanguage: Language;
}

export const TestimonialSlider: React.FC<TestimonialSliderProps> = ({ currentLanguage }) => {
  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex((curr) => (curr === 0 ? TESTIMONIALS.length - 1 : curr - 1));
  };

  const next = () => {
    setIndex((curr) => (curr + 1) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[index];

  return (
    <section className="py-16 md:py-24 bg-[#FBF8F3] relative overflow-hidden border-b border-[#E2DBD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C45C4A] font-mono mb-2">
            <Quote className="w-4 h-4" />
            <span>VOICES OF THE CARAVAN</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-editorial text-[#0F1A2F]">
            Stories from Fellow Explorers
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-2">
            Reflections from international travelers, NRI families, and heritage aficionados who walked the misty paths and sailed the silent waters with us.
          </p>
        </div>

        {/* Carousel Card Stage */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-[#E2DBD0] shadow-xl relative">
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            
            {/* Explorer Avatar & Badge */}
            <div className="flex-shrink-0 text-center space-y-3">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-[#D4AF37] mx-auto shadow-md">
                <img
                  src={current.avatar}
                  alt={current.author}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                  current.tier === 'luxury' ? 'bg-[#D4AF37]/20 text-[#0F1A2F] border border-[#D4AF37]' : 'bg-[#1E6B62]/20 text-[#1E6B62] border border-[#1E6B62]'
                }`}>
                  {current.tier === 'luxury' ? <Crown className="w-3 h-3 text-[#D4AF37]" /> : <Footprints className="w-3 h-3 text-[#1E6B62]" />}
                  <span>{current.tier === 'luxury' ? 'Luxury Planter Guest' : 'Heritage Homestay Guest'}</span>
                </span>
              </div>
            </div>

            {/* Quote and Details */}
            <div className="flex-grow space-y-4 text-center md:text-left">
              
              {/* Stars */}
              <div className="flex items-center justify-center md:justify-start gap-1 text-[#D4AF37]">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
                ))}
              </div>

              {/* Quote text */}
              <p className="text-base sm:text-lg italic font-serif text-[#0F1A2F] leading-relaxed">
                “{current.quote}”
              </p>

              {/* Author & Tour details */}
              <div className="pt-2 border-t border-gray-100">
                <h4 className="font-bold text-sm text-[#0F1A2F]">
                  {current.author}
                </h4>
                <p className="text-xs text-gray-500">
                  {current.role} • <span className="text-[#C45C4A]">{current.location}</span>
                </p>
                <p className="text-xs font-semibold text-[#1E6B62] mt-1 flex items-center justify-center md:justify-start gap-1">
                  <CheckCircle className="w-3 h-3" />
                  <span>Expedition: {current.tourTaken}</span>
                </p>
              </div>

            </div>

          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#E2DBD0]">
            <div className="flex items-center gap-1.5">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-gray-300'
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-gray-300 hover:border-[#D4AF37] hover:bg-[#0F1A2F] hover:text-[#D4AF37] flex items-center justify-center text-gray-700 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-gray-300 hover:border-[#D4AF37] hover:bg-[#0F1A2F] hover:text-[#D4AF37] flex items-center justify-center text-gray-700 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
