import React, { useState, useEffect } from 'react';
import { AudienceTier, Currency, Language, TourPackage } from './types';
import { TRANSLATIONS } from './data/translations';
import { TOUR_PACKAGES } from './data/packagesData';

// Component Imports
import { Header } from './components/Header';
import { HeroCarousel } from './components/HeroCarousel';
import { CategoryCarousel } from './components/CategoryCarousel';
import { FeaturedDealsCarousel } from './components/FeaturedDealsCarousel';
import { CaravanBuilder } from './components/CaravanBuilder';
import { TestimonialSlider } from './components/TestimonialSlider';
import { PartnerAccoladeSlider } from './components/PartnerAccoladeSlider';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';

// View Imports
import { DestinationsView } from './views/DestinationsView';
import { PackagesView } from './views/PackagesView';
import { ItineraryDetailView } from './views/ItineraryDetailView';
import { AboutView } from './views/AboutView';
import { BlogView } from './views/BlogView';
import { ContactView } from './views/ContactView';

export default function App() {
  // Global Application States
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [audienceTier, setAudienceTier] = useState<AudienceTier>('luxury');
  const [currency, setCurrency] = useState<Currency>('INR');
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedPackage, setSelectedPackage] = useState<TourPackage | null>(null);

  // Booking Modal State
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [activeBookingData, setActiveBookingData] = useState<{
    packageName: string;
    tier: AudienceTier;
    totalAmount: number;
    advanceAmount: number;
    travelers: number;
    startDate: string;
  } | null>(null);

  // Scroll to top on view switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedPackage]);

  // Handlers
  const handleOpenItineraryDetail = (pkg: TourPackage) => {
    setSelectedPackage(pkg);
    setCurrentView('detail');
  };

  const handleOpenBookingModal = (bookingData: {
    packageName: string;
    tier: AudienceTier;
    totalAmount: number;
    advanceAmount: number;
    travelers: number;
    startDate: string;
  }) => {
    setActiveBookingData(bookingData);
    setIsBookingModalOpen(true);
  };

  const handleBookFromPackage = (pkg: TourPackage, travelers: number = 2, tier: AudienceTier = audienceTier) => {
    const price = pkg.pricingINR[tier];
    const total = price * travelers;
    const advance = Math.round(total * 0.2);

    handleOpenBookingModal({
      packageName: pkg.title,
      tier: tier,
      totalAmount: total,
      advanceAmount: advance,
      travelers: travelers,
      startDate: pkg.nextDates[0] || '2026-11-15',
    });
  };

  const handleDestinationCategorySelect = (categoryId: string) => {
    setCurrentView('packages');
  };

  return (
    <div className="min-h-screen bg-[#F5EFE6] text-[#0F1A2F] flex flex-col font-sans selection:bg-[#D4AF37] selection:text-white">
      
      {/* Sticky Header Navigation */}
      <Header
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        audienceTier={audienceTier}
        onAudienceTierChange={setAudienceTier}
        currency={currency}
        onCurrencyChange={setCurrency}
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          if (view !== 'detail') setSelectedPackage(null);
        }}
        onOpenBuilder={() => setCurrentView('builder')}
      />

      {/* Main Content Routing */}
      <main className="flex-grow">
        
        {/* VIEW: HOME (The Grand Foyer) */}
        {currentView === 'home' && (
          <div className="space-y-0">
            {/* Cinematic Hero */}
            <HeroCarousel
              currentLanguage={currentLanguage}
              audienceTier={audienceTier}
              currency={currency}
              onOpenBuilder={() => setCurrentView('builder')}
              onExplorePackages={() => setCurrentView('packages')}
            />

            {/* Regional Landscapes & Terroirs Horizontal Showcase */}
            <CategoryCarousel
              currentLanguage={currentLanguage}
              audienceTier={audienceTier}
              currency={currency}
              onSelectCategory={(categoryId) => {
                setCurrentView('destinations');
              }}
            />

            {/* Limited-Slot Seasonal Privilege Deals */}
            <FeaturedDealsCarousel
              currentLanguage={currentLanguage}
              audienceTier={audienceTier}
              currency={currency}
              onSelectPackage={handleOpenItineraryDetail}
              onBookDirect={(pkg) => handleBookFromPackage(pkg, 2, audienceTier)}
            />

            {/* Interactive Caravan Builder In Situ */}
            <div id="caravan-builder-section">
              <CaravanBuilder
                currentLanguage={currentLanguage}
                audienceTier={audienceTier}
                onAudienceTierChange={setAudienceTier}
                currency={currency}
                onProceedToBooking={handleOpenBookingModal}
              />
            </div>

            {/* Voices of the Caravan (Testimonials) */}
            <TestimonialSlider currentLanguage={currentLanguage} />

            {/* Infinite Partner & Accolades Marquee */}
            <PartnerAccoladeSlider />
          </div>
        )}

        {/* VIEW: DESTINATIONS */}
        {currentView === 'destinations' && (
          <DestinationsView
            currentLanguage={currentLanguage}
            audienceTier={audienceTier}
            currency={currency}
            onSelectDestinationPackage={handleDestinationCategorySelect}
            onOpenBuilder={() => setCurrentView('builder')}
          />
        )}

        {/* VIEW: PACKAGES */}
        {currentView === 'packages' && (
          <PackagesView
            currentLanguage={currentLanguage}
            audienceTier={audienceTier}
            onAudienceTierChange={setAudienceTier}
            currency={currency}
            onSelectPackage={handleOpenItineraryDetail}
            onBookPackage={(pkg) => handleBookFromPackage(pkg, 2, audienceTier)}
          />
        )}

        {/* VIEW: DEDICATED CARAVAN BUILDER WIZARD */}
        {currentView === 'builder' && (
          <CaravanBuilder
            currentLanguage={currentLanguage}
            audienceTier={audienceTier}
            onAudienceTierChange={setAudienceTier}
            currency={currency}
            onProceedToBooking={handleOpenBookingModal}
          />
        )}

        {/* VIEW: ITINERARY DETAIL */}
        {currentView === 'detail' && selectedPackage && (
          <ItineraryDetailView
            pkg={selectedPackage}
            currentLanguage={currentLanguage}
            audienceTier={audienceTier}
            onAudienceTierChange={setAudienceTier}
            currency={currency}
            onBack={() => setCurrentView('packages')}
            onBookAdvance={handleBookFromPackage}
          />
        )}

        {/* VIEW: ABOUT (PHILOSOPHY & CONSERVATION) */}
        {currentView === 'about' && (
          <AboutView
            currentLanguage={currentLanguage}
            onOpenBuilder={() => setCurrentView('builder')}
          />
        )}

        {/* VIEW: CARAVAN GAZETTE (BLOG & STORIES) */}
        {currentView === 'gazette' && (
          <BlogView currentLanguage={currentLanguage} />
        )}

        {/* VIEW: CONTACT & APPOINTMENTS */}
        {currentView === 'contact' && (
          <ContactView currentLanguage={currentLanguage} />
        )}

      </main>

      {/* Global Hybrid Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        bookingData={activeBookingData}
        currency={currency}
        currentLanguage={currentLanguage}
      />

      {/* Grand Footer */}
      <Footer
        currentLanguage={currentLanguage}
        onNavigate={(view) => {
          setCurrentView(view);
          if (view !== 'detail') setSelectedPackage(null);
        }}
        onOpenBuilder={() => setCurrentView('builder')}
      />

    </div>
  );
}
