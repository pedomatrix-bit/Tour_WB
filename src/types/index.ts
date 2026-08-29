export type Language = 'en' | 'bn' | 'hi';
export type AudienceTier = 'luxury' | 'essential';
export type Currency = 'INR' | 'USD' | 'EUR';

export interface TranslationSet {
  brandName: string;
  tagline: string;
  subTagline: string;
  nav: {
    home: string;
    destinations: string;
    packages: string;
    builder: string;
    about: string;
    journal: string;
    contact: string;
  };
  tier: {
    luxuryLabel: string;
    luxurySub: string;
    essentialLabel: string;
    essentialSub: string;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaPlan: string;
    ctaExplore: string;
    badgeText: string;
  };
  builder: {
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
    summaryTitle: string;
    downloadPdf: string;
    bookAdvance: string;
    perPerson: string;
  };
  packages: {
    title: string;
    subtitle: string;
    filterAll: string;
    filterMountains: string;
    filterWildlife: string;
    filterHeritage: string;
    filterCruises: string;
    viewItinerary: string;
    advancePayNotice: string;
  };
  booking: {
    modalTitle: string;
    advanceOption: string;
    offlineOption: string;
    payWithRazorpay: string;
    payWithStripe: string;
    confirmBooking: string;
    successTitle: string;
  };
  footer: {
    tagoreQuote: string;
    tagoreAuthor: string;
    newsletterTitle: string;
    newsletterDesc: string;
    newsletterPlaceholder: string;
    newsletterBtn: string;
    rights: string;
  };
}

export interface Destination {
  id: string;
  name: string;
  bengaliName: string;
  hindiName: string;
  category: 'mountains' | 'wildlife' | 'heritage' | 'cruises' | 'tea';
  heroImage: string;
  moodImages: string[];
  tagline: string;
  description: string;
  bestTime: string;
  temperature: string;
  luxuryHighlights: string[];
  essentialHighlights: string[];
  iconicExperiences: string[];
  featuredTeaOrCraft: string;
  startingPriceINR: {
    luxury: number;
    essential: number;
  };
}

export interface DayPlan {
  day: number;
  title: string;
  summary: string;
  highlights: string[];
  stayLuxury: string;
  stayEssential: string;
  meals: string;
}

export interface TourPackage {
  id: string;
  slug: string;
  title: string;
  bengaliTitle: string;
  hindiTitle: string;
  category: 'mountains' | 'wildlife' | 'heritage' | 'cruises';
  tag: string;
  duration: string; // e.g. "5N / 6D"
  nights: number;
  days: number;
  featuredImage: string;
  gallery: string[];
  shortDesc: string;
  overview: string;
  pricingINR: {
    luxury: number;
    essential: number;
  };
  rating: number;
  reviewsCount: number;
  badge?: string;
  departure: string;
  nextDates: string[];
  inclusions: {
    luxury: string[];
    essential: string[];
  };
  exclusions: string[];
  itinerary: DayPlan[];
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  location: string;
  avatar: string;
  quote: string;
  tourTaken: string;
  tier: 'luxury' | 'essential';
  rating: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  author: string;
  content: string[];
  tags: string[];
}

export interface CaravanBuilderState {
  vibe: string;
  duration: string;
  budgetPerPerson: number;
  tier: AudienceTier;
  interests: string[];
  travelers: number;
  travelDate: string;
  customNotes: string;
}

export interface BookingPayload {
  packageId?: string;
  packageName: string;
  tier: AudienceTier;
  currency: Currency;
  totalAmount: number;
  advanceAmount: number;
  paymentMethod: 'razorpay' | 'stripe' | 'pay_at_hotel';
  travelerName: string;
  travelerEmail: string;
  travelerPhone: string;
  travelersCount: number;
  startDate: string;
  specialRequests?: string;
}
