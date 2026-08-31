import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  CheckCircle2, 
  Smartphone, 
  Mail, 
  User, 
  Calendar, 
  Lock, 
  Crown, 
  Footprints, 
  Download, 
  MessageSquare, 
  Sparkles,
  Receipt
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AudienceTier, Currency, Language } from '../types';
import { TRANSLATIONS, CURRENCY_RATES } from '../data/translations';
import { generateCaravanPDF } from '../utils/pdfGenerator';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: {
    packageName: string;
    tier: AudienceTier;
    totalAmount: number;
    advanceAmount: number;
    travelers: number;
    startDate: string;
  } | null;
  currency: Currency;
  currentLanguage: Language;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  bookingData,
  currency,
  currentLanguage,
}) => {
  const [paymentOption, setPaymentOption] = useState<'advance' | 'pay_at_hotel'>('advance');
  const [paymentGateway, setPaymentGateway] = useState<'razorpay' | 'stripe'>(
    currency === 'INR' ? 'razorpay' : 'stripe'
  );
  const [step, setStep] = useState<'details' | 'otp' | 'payment_processing' | 'confirmed'>('details');

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [mockOtpSent, setMockOtpSent] = useState(false);
  const [bookingToken, setBookingToken] = useState('');

  if (!isOpen || !bookingData) return null;

  const t = TRANSLATIONS[currentLanguage];

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      alert('Please fill in your name, email, and mobile phone number.');
      return;
    }
    setMockOtpSent(true);
    setStep('otp');
    // Pre-fill mock OTP for quick seamless tester experience
    setOtpCode('7492');
  };

  const handleVerifyOTPAndPay = () => {
    if (otpCode.length < 4) {
      alert('Please enter a valid 4-digit verification code.');
      return;
    }

    setStep('payment_processing');

    setTimeout(() => {
      const generatedToken = 'TEC-' + Math.floor(100000 + Math.random() * 900000);
      setBookingToken(generatedToken);
      setStep('confirmed');

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#C45C4A', '#1E6B62', '#FBF8F3'],
        });
      } catch (e) {
        console.error(e);
      }
    }, 1800);
  };

  const handleDownloadVoucherPDF = () => {
    generateCaravanPDF(
      {
        duration: 'Custom Caravan Expedition',
        tier: bookingData.tier,
        travelers: bookingData.travelers,
        travelDate: bookingData.startDate,
      },
      bookingData.packageName,
      bookingData.totalAmount,
      6,
      bookingData.tier
    );
  };

  const amountToCharge = paymentOption === 'advance' ? bookingData.advanceAmount : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0F1A2F]/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#E2DBD0] overflow-hidden animate-scaleUp">
        
        {/* Modal Header */}
        <div className="bg-[#0F1A2F] text-white px-6 py-5 flex items-center justify-between border-b border-[#D4AF37]/30">
          <div className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="w-9 h-9 rounded-full object-cover border border-[#D4AF37]/60 shadow-xs flex-shrink-0"
              referrerPolicy="no-referrer"
            />
            <div>
              <h3 className="text-lg font-bold font-editorial text-white">
                {step === 'confirmed' ? t.booking.successTitle : t.booking.modalTitle}
              </h3>
              <p className="text-[11px] text-[#D4AF37] font-mono tracking-wider uppercase">
                Official Hybrid Payment Portal • Razorpay & Stripe Secured
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* STEP 1: Traveler Details & Payment Selection */}
          {step === 'details' && (
            <form onSubmit={handleSendOTP} className="space-y-6">
              
              {/* Trip Brief Banner */}
              <div className="p-4 rounded-2xl bg-[#FBF8F3] border border-[#E2DBD0] flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm font-editorial text-[#0F1A2F]">
                    {bookingData.packageName}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-gray-600 mt-0.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#C45C4A]" />
                      <span>{bookingData.startDate}</span>
                    </span>
                    <span>•</span>
                    <span>{bookingData.travelers} Explorers</span>
                    <span>•</span>
                    <span className="font-semibold text-[#1E6B62]">
                      {bookingData.tier === 'luxury' ? 'Luxury Planter' : 'Essential Heritage'}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-gray-500 block uppercase tracking-wider">
                    Total Expedition
                  </span>
                  <span className="text-base font-bold text-[#0F1A2F]">
                    {CURRENCY_RATES[currency].format(bookingData.totalAmount)}
                  </span>
                </div>
              </div>

              {/* Payment Mode Selection: 20% Advance vs Pay at Hotel */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#0F1A2F] uppercase tracking-wider">
                  Select Booking & Payment Method
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setPaymentOption('advance')}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentOption === 'advance'
                        ? 'border-[#D4AF37] bg-[#0F1A2F] text-white shadow-md'
                        : 'border-[#E2DBD0] bg-white text-[#0F1A2F]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold font-editorial">
                        20% Advance Lock
                      </span>
                      <span className={`text-xs font-bold ${paymentOption === 'advance' ? 'text-[#D4AF37]' : 'text-[#C45C4A]'}`}>
                        {CURRENCY_RATES[currency].format(bookingData.advanceAmount)}
                      </span>
                    </div>
                    <p className={`text-[11px] ${paymentOption === 'advance' ? 'text-white/80' : 'text-gray-600'}`}>
                      Guaranteed slot confirmation, priority suite allocation & complimentary high tea.
                    </p>
                  </div>

                  <div
                    onClick={() => setPaymentOption('pay_at_hotel')}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentOption === 'pay_at_hotel'
                        ? 'border-[#1E6B62] bg-[#1E6B62] text-white shadow-md'
                        : 'border-[#E2DBD0] bg-white text-[#0F1A2F]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold font-editorial">
                        Pay at Hotel / Office
                      </span>
                      <span className="text-xs font-bold text-white">
                        ₹0 Now
                      </span>
                    </div>
                    <p className={`text-[11px] ${paymentOption === 'pay_at_hotel' ? 'text-white/90' : 'text-gray-600'}`}>
                      Provisional hold. Settle full balance upon arrival in Kolkata or Darjeeling.
                    </p>
                  </div>
                </div>
              </div>

              {/* Gateway Switcher if Advance is chosen */}
              {paymentOption === 'advance' && (
                <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#D4AF37]" />
                    <span className="text-xs font-semibold text-[#0F1A2F]">Payment Gateway:</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentGateway('razorpay')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        paymentGateway === 'razorpay'
                          ? 'bg-[#0F1A2F] text-[#D4AF37] border border-[#D4AF37]'
                          : 'bg-white text-gray-600 border border-gray-300'
                      }`}
                    >
                      Razorpay (INR / UPI / Cards)
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentGateway('stripe')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        paymentGateway === 'stripe'
                          ? 'bg-[#635BFF] text-white shadow-sm'
                          : 'bg-white text-gray-600 border border-gray-300'
                      }`}
                    >
                      Stripe (USD / EUR / Global)
                    </button>
                  </div>
                </div>
              )}

              {/* Explorer Contact Form Fields */}
              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-[#0F1A2F] uppercase tracking-wider mb-1">
                    Primary Explorer Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Arthur Conan Doyle or Priya Banerjee"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E2DBD0] text-sm text-[#0F1A2F] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0F1A2F] uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                      <input
                        type="email"
                        required
                        placeholder="explorer@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E2DBD0] text-sm text-[#0F1A2F] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0F1A2F] uppercase tracking-wider mb-1">
                      Mobile Number (With Country Code)
                    </label>
                    <div className="relative">
                      <Smartphone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                      <input
                        type="tel"
                        required
                        placeholder="+91 98301 23456"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E2DBD0] text-sm text-[#0F1A2F] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C058] to-[#C45C4A] text-[#0F1A2F] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:scale-102 active:scale-98 transition-all shimmer-badge cursor-pointer"
              >
                <Lock className="w-4 h-4 text-[#0F1A2F]" />
                <span>Verify Mobile OTP & Proceed to {paymentOption === 'advance' ? 'Payment' : 'Reservation'}</span>
              </button>
            </form>
          )}

          {/* STEP 2: SMS OTP Verification Simulation */}
          {step === 'otp' && (
            <div className="space-y-6 py-4 text-center animate-fadeIn">
              <div className="w-14 h-14 rounded-full bg-[#D4AF37]/20 text-[#0F1A2F] flex items-center justify-center mx-auto border border-[#D4AF37]">
                <Smartphone className="w-7 h-7 text-[#0F1A2F]" />
              </div>

              <div>
                <h4 className="text-xl font-bold font-editorial text-[#0F1A2F]">
                  Enter 4-Digit Mobile OTP
                </h4>
                <p className="text-xs text-gray-600 max-w-sm mx-auto mt-1">
                  We have dispatched an authentication code to <strong className="text-[#0F1A2F]">{phone}</strong> for genuine traveler lead verification.
                </p>
              </div>

              <div className="flex justify-center gap-3">
                <input
                  type="text"
                  maxLength={4}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-40 tracking-[1em] text-center text-2xl font-bold font-mono py-2.5 rounded-xl border-2 border-[#D4AF37] bg-[#FBF8F3] text-[#0F1A2F] focus:outline-none"
                />
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs border border-emerald-200 inline-block">
                ✓ Demo Mode: Pre-filled with valid code <strong>7492</strong>
              </div>

              <div className="flex items-center justify-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleVerifyOTPAndPay}
                  className="px-8 py-3 rounded-xl bg-[#0F1A2F] hover:bg-[#C45C4A] text-[#D4AF37] hover:text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
                >
                  {paymentOption === 'advance' ? `Authorize ${CURRENCY_RATES[currency].format(amountToCharge)}` : 'Confirm Reservation'}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Payment Processing Animation */}
          {step === 'payment_processing' && (
            <div className="py-12 text-center space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full border-4 border-[#D4AF37] border-t-transparent animate-spin mx-auto" />
              <h4 className="text-xl font-bold font-editorial text-[#0F1A2F]">
                Connecting with {paymentGateway === 'razorpay' ? 'Razorpay Secure Netbanking' : 'Stripe Global Network'}...
              </h4>
              <p className="text-xs text-gray-500">
                Authorizing 256-bit bank encrypted transaction for The Eastern Caravan.
              </p>
            </div>
          )}

          {/* STEP 4: Confirmation & Instant Voucher */}
          {step === 'confirmed' && (
            <div className="space-y-6 text-center animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border-2 border-emerald-400 shadow-lg">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#D4AF37]/20 text-[#0F1A2F] border border-[#D4AF37]">
                  BOOKING TOKEN: {bookingToken}
                </span>
                <h4 className="text-2xl sm:text-3xl font-bold font-editorial text-[#0F1A2F] mt-3">
                  Subho Jatra! Your Caravan is Locked
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto mt-1 font-serif">
                  A warm welcome to the Land of Tigers, Tea, and Tagore. We have dispatched your digital travel voucher and 10% next-trip loyalty code.
                </p>
              </div>

              {/* Confirmation Details Card */}
              <div className="p-5 rounded-2xl bg-[#FBF8F3] border border-[#E2DBD0] text-left text-xs space-y-2">
                <div className="flex justify-between py-1 border-b border-gray-200">
                  <span className="text-gray-500">Lead Explorer:</span>
                  <span className="font-bold text-[#0F1A2F]">{name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-200">
                  <span className="text-gray-500">Expedition Route:</span>
                  <span className="font-bold text-[#0F1A2F]">{bookingData.packageName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-200">
                  <span className="text-gray-500">Payment Status:</span>
                  <span className="font-bold text-emerald-700">
                    {paymentOption === 'advance' ? `20% Advance Paid (${CURRENCY_RATES[currency].format(bookingData.advanceAmount)})` : 'Pay on Arrival Mode'}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500">Exclusive Promo Code:</span>
                  <span className="font-bold font-mono text-[#C45C4A]">SONAR-BENGAL-10</span>
                </div>
              </div>

              {/* Interactive Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleDownloadVoucherPDF}
                  className="py-3 px-4 rounded-xl bg-[#0F1A2F] hover:bg-[#C45C4A] text-[#D4AF37] hover:text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF Voucher</span>
                </button>

                <a
                  href={`https://wa.me/919830144555?text=Hello%20The%20Eastern%20Caravan,%20I%20have%20confirmed%20my%20booking%20${bookingToken}%20for%20${encodeURIComponent(bookingData.packageName)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Concierge</span>
                </a>
              </div>

              <button
                onClick={onClose}
                className="text-xs font-semibold text-gray-500 hover:text-[#0F1A2F] underline"
              >
                Return to Grand Foyer
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
