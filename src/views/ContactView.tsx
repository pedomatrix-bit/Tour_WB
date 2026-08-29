import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  Send, 
  ShieldCheck, 
  CheckCircle2, 
  Smartphone, 
  Clock,
  Sparkles,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface ContactViewProps {
  currentLanguage: Language;
}

export const ContactView: React.FC<ContactViewProps> = ({ currentLanguage }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState('tea');
  const [message, setMessage] = useState('');
  const [step, setStep] = useState<'form' | 'otp' | 'submitted'>('form');
  const [otp, setOtp] = useState('');

  const t = TRANSLATIONS[currentLanguage];

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      alert('Please provide your name, email, and mobile phone number.');
      return;
    }
    setOtp('5821');
    setStep('otp');
  };

  const handleVerifyOtp = () => {
    if (otp.length < 4) {
      alert('Please enter a valid 4-digit code.');
      return;
    }
    setStep('submitted');
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#1E6B62', '#C45C4A'],
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-[#FBF8F3] min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0F1A2F] text-[#D4AF37] text-xs font-mono font-bold uppercase tracking-widest">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>PRIVATE CONCIERGE & APPOINTMENTS</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold font-editorial text-[#0F1A2F]">
            {t.contact.title}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 font-serif">
            {t.contact.subtitle}
          </p>
        </div>

        {/* 2 Column Layout: Form & Office Hubs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Interactive Form with OTP (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#E2DBD0] shadow-md">
            
            {step === 'form' && (
              <form onSubmit={handleSendOtp} className="space-y-5">
                <div>
                  <h3 className="text-2xl font-bold font-editorial text-[#0F1A2F]">
                    Request a Bespoke Consultation
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Verified inquiries receive a direct response within 2 hours and an instant 10% early-bird promo code.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0F1A2F] mb-1">
                      {t.contact.name}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Arthur Conan Doyle or Priya Banerjee"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E2DBD0] text-sm text-[#0F1A2F] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0F1A2F] mb-1">
                        {t.contact.email}
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="explorer@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E2DBD0] text-sm text-[#0F1A2F] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0F1A2F] mb-1">
                        {t.contact.phone}
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98301 23456"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E2DBD0] text-sm text-[#0F1A2F] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0F1A2F] mb-1">
                      Primary Landscape / Terroir of Interest
                    </label>
                    <select
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E2DBD0] text-sm text-[#0F1A2F] focus:outline-none focus:border-[#D4AF37] bg-white"
                    >
                      <option value="tea">Darjeeling & Himalayan Tea Planter Estates</option>
                      <option value="sundarbans">Sundarbans Royal Bengal Tiger Cruise</option>
                      <option value="tagore">Shantiniketan & Bishnupur Terracotta Heritage</option>
                      <option value="ganges">Ganges River Heritage & French Chandannagar</option>
                      <option value="custom">Custom Multi-Terroir Caravan Expedition</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0F1A2F] mb-1">
                      {t.contact.message}
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Share your travel dates, preferred pace, dietary preferences, or private celebrations..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E2DBD0] text-sm text-[#0F1A2F] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C058] to-[#C45C4A] text-[#0F1A2F] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:scale-102 transition-all shimmer-badge cursor-pointer"
                >
                  <Lock className="w-4 h-4 text-[#0F1A2F]" />
                  <span>Verify Mobile & Submit Concierge Inquiry</span>
                </button>
              </form>
            )}

            {step === 'otp' && (
              <div className="space-y-6 py-6 text-center animate-fadeIn">
                <div className="w-14 h-14 rounded-full bg-[#D4AF37]/20 text-[#0F1A2F] flex items-center justify-center mx-auto border border-[#D4AF37]">
                  <Smartphone className="w-7 h-7" />
                </div>

                <div>
                  <h4 className="text-2xl font-bold font-editorial text-[#0F1A2F]">
                    Enter 4-Digit SMS Passcode
                  </h4>
                  <p className="text-xs text-gray-600 max-w-sm mx-auto mt-1">
                    Sent to <strong className="text-[#0F1A2F]">{phone}</strong> for verified concierge prioritization.
                  </p>
                </div>

                <input
                  type="text"
                  maxLength={4}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-40 tracking-[1em] text-center text-2xl font-bold font-mono py-2.5 rounded-xl border-2 border-[#D4AF37] bg-[#FBF8F3] text-[#0F1A2F] focus:outline-none mx-auto block"
                />

                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs border border-emerald-200 inline-block">
                  ✓ Verified Demo: Code <strong>5821</strong>
                </div>

                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => setStep('form')}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100"
                  >
                    Edit Number
                  </button>
                  <button
                    onClick={handleVerifyOtp}
                    className="px-6 py-2.5 rounded-xl bg-[#0F1A2F] text-[#D4AF37] hover:bg-[#C45C4A] hover:text-white font-bold text-xs uppercase tracking-wider"
                  >
                    Confirm & Dispatch
                  </button>
                </div>
              </div>
            )}

            {step === 'submitted' && (
              <div className="space-y-6 py-6 text-center animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border-2 border-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <h4 className="text-2xl sm:text-3xl font-bold font-editorial text-[#0F1A2F]">
                    Concierge Inquiry Dispatched!
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto mt-2 font-serif">
                    Thank you, <strong className="text-[#0F1A2F]">{name}</strong>. Our senior expedition planner has received your request and will connect via WhatsApp and email.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FBF8F3] border border-[#E2DBD0] text-left text-xs space-y-2 max-w-md mx-auto">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Early-Bird Privilege Promo:</span>
                    <span className="font-bold font-mono text-[#C45C4A]">SONAR-BENGAL-10</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Direct WhatsApp Concierge:</span>
                    <span className="font-bold text-emerald-700">+91 98301 44555</span>
                  </div>
                </div>

                <a
                  href={`https://wa.me/919830144555?text=Hello%20The%20Eastern%20Caravan,%20I%20have%20submitted%20an%20inquiry%20for%20${encodeURIComponent(interest)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider shadow"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp Now</span>
                </a>
              </div>
            )}

          </div>

          {/* Right Column: Office Hubs & Quick Contact Info (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Office Hub Card 1: Kolkata */}
            <div className="p-6 rounded-3xl bg-[#0F1A2F] text-white border border-[#D4AF37]/30 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase">
                  HEADQUARTERS
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <h4 className="text-xl font-bold font-editorial text-white">
                Kolkata Heritage Foyer
              </h4>
              <p className="text-xs text-white/80 leading-relaxed font-serif">
                44 Park Street, Suite 3B, Heritage Mansion, Kolkata 700016, West Bengal
              </p>
              <div className="text-xs text-white/70 space-y-1 pt-2 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>+91 33 2287 4000 / +91 98301 44555</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>concierge@theeasterncaravan.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#C45C4A]" />
                  <span>Open Mon - Sat: 9:00 AM – 7:30 PM IST</span>
                </div>
              </div>
            </div>

            {/* Office Hub Card 2: Darjeeling */}
            <div className="p-6 rounded-3xl bg-white border border-[#E2DBD0] shadow-sm space-y-3">
              <span className="text-[10px] font-mono tracking-widest text-[#C45C4A] uppercase font-bold">
                HIMALAYAN BASE CAMP
              </span>
              <h4 className="text-xl font-bold font-editorial text-[#0F1A2F]">
                Darjeeling Planters Desk
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed font-serif">
                Mall Road (Opposite Windamere), Darjeeling 734101, West Bengal
              </p>
              <div className="text-xs text-gray-600 space-y-1 pt-2 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#1E6B62]" />
                  <span>+91 354 225 5400</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#C45C4A]" />
                  <span>Open Daily: 8:00 AM – 8:00 PM IST</span>
                </div>
              </div>
            </div>

            {/* Emergency Naturalist Hotline */}
            <div className="p-5 rounded-2xl bg-[#1E6B62] text-white space-y-2">
              <div className="flex items-center gap-2 font-bold text-xs font-mono uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>24/7 On-Tour Naturalist Hotline</span>
              </div>
              <p className="text-xs text-white/90">
                For active explorers in the Sundarban estuaries or high Singalila ridges: <strong className="text-[#D4AF37]">+91 98301 99888</strong>
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
