import jsPDF from 'jspdf';
import { AudienceTier, CaravanBuilderState, TourPackage } from '../types';

export function generateCaravanPDF(
  builderState: Partial<CaravanBuilderState>,
  calculatedTitle: string,
  totalCostINR: number,
  calculatedDays: number,
  tier: AudienceTier,
  customItinerary?: Array<{ day: number; title: string; summary: string }>
) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;

  // Header Banner
  doc.setFillColor(15, 26, 47); // Deep Indigo
  doc.rect(0, 0, pageWidth, 42, 'F');

  // Gold accent line
  doc.setFillColor(212, 175, 55); // Tea Gold
  doc.rect(0, 42, pageWidth, 2.5, 'F');

  // Header Typography
  doc.setTextColor(245, 239, 230); // Cream Parchment
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('THE EASTERN CARAVAN', margin, 18);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10.5);
  doc.setTextColor(212, 175, 55); // Gold
  doc.text('Land of Tigers, Tea, and Tagore  |  Official Bespoke Itinerary & Booking Voucher', margin, 27);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(200, 205, 215);
  doc.text(`Reference Token: TEC-${Date.now().toString().slice(-8)}  |  Issue Date: ${new Date().toLocaleDateString('en-GB')}`, margin, 35);

  let yPos = 54;

  // Package Title Section
  doc.setTextColor(15, 26, 47);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text(calculatedTitle, margin, yPos);

  yPos += 7;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(100, 110, 125);
  doc.text(`Experience Tier: ${tier === 'luxury' ? 'Luxury & Curated (Planters & Private Charters)' : 'Essential & Heritage (Authentic Homestays & Treks)'}`, margin, yPos);

  yPos += 8;

  // Key Specifications Box
  doc.setFillColor(248, 245, 238);
  doc.roundedRect(margin, yPos, contentWidth, 24, 2, 2, 'F');
  doc.setDrawColor(220, 215, 205);
  doc.roundedRect(margin, yPos, contentWidth, 24, 2, 2, 'D');

  const colWidth = contentWidth / 4;
  
  // Col 1: Duration
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(196, 92, 74); // Terracotta
  doc.text('DURATION', margin + 6, yPos + 7);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 26, 47);
  doc.text(`${calculatedDays - 1}N / ${calculatedDays}D`, margin + 6, yPos + 16);

  // Col 2: Travelers
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(196, 92, 74);
  doc.text('EXPLORERS', margin + colWidth + 6, yPos + 7);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 26, 47);
  doc.text(`${builderState.travelers || 2} Persons`, margin + colWidth + 6, yPos + 16);

  // Col 3: Estimate
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(196, 92, 74);
  doc.text('TOTAL ESTIMATE', margin + colWidth * 2 + 6, yPos + 7);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 26, 47);
  doc.text(`INR ${totalCostINR.toLocaleString('en-IN')}`, margin + colWidth * 2 + 6, yPos + 16);

  // Col 4: 20% Advance
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(30, 107, 98); // Mangrove Teal
  doc.text('20% ADVANCE', margin + colWidth * 3 + 6, yPos + 7);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(30, 107, 98);
  doc.text(`INR ${Math.round(totalCostINR * 0.2).toLocaleString('en-IN')}`, margin + colWidth * 3 + 6, yPos + 16);

  yPos += 32;

  // Selected Passions & Highlights
  if (builderState.interests && builderState.interests.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(15, 26, 47);
    doc.text('CURATED INTERESTS & BESPOKE INCLUSIONS:', margin, yPos);
    yPos += 6;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(60, 70, 85);
    doc.text(`• ${builderState.interests.join('  •  ')}`, margin, yPos);
    yPos += 9;
  }

  // Itinerary Breakdown
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 26, 47);
  doc.text('DAY-BY-DAY CARAVAN EXPEDITION PLAN', margin, yPos);
  
  // Underline
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.6);
  doc.line(margin, yPos + 2, margin + 85, yPos + 2);
  yPos += 9;

  const itineraryList = customItinerary && customItinerary.length > 0 ? customItinerary : [
    { day: 1, title: 'Arrival & Eastern Warmth Welcome', summary: 'Check into your heritage lodge, afternoon tea ceremony, and evening orientation with our head naturalist.' },
    { day: 2, title: 'Deep Exploration & Artisan Masterclass', summary: 'Private guided excursions through historic trails, estate tastings, and exclusive cultural interaction.' },
    { day: 3, title: 'Wilderness Safaris & Sunset Confluence', summary: 'Dawn expedition with spotting scopes, river cruising, and gourmet regional dinner under the stars.' },
    { day: 4, title: 'Heritage Treasures & Local Handloom', summary: 'Behind-the-scenes access to weaving looms, temple architecture, and poetry recitals.' },
    { day: 5, title: 'Sunrise Reverence & Farewell Journey', summary: 'Final panoramic photography, souvenir gift hamper, and comfortable transfer to your departing hub.' },
  ];

  itineraryList.slice(0, 6).forEach((item) => {
    if (yPos > 255) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFillColor(212, 175, 55);
    doc.circle(margin + 3, yPos - 1.5, 2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(15, 26, 47);
    doc.text(`Day ${item.day}: ${item.title}`, margin + 8, yPos);

    yPos += 4.5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(80, 90, 105);
    const splitSummary = doc.splitTextToSize(item.summary, contentWidth - 10);
    doc.text(splitSummary, margin + 8, yPos);
    yPos += splitSummary.length * 4.2 + 3;
  });

  // Footer / Terms & Payment Notice
  const footerY = 270;
  doc.setFillColor(15, 26, 47);
  doc.rect(0, footerY, pageWidth, 27, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(212, 175, 55);
  doc.text('THE EASTERN CARAVAN CONCIERGE & SUPPORT', margin, footerY + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(230, 235, 245);
  doc.text('Kolkata Headquarters: 44 Park Street, Heritage Wing | Darjeeling: Mall Road Planters House', margin, footerY + 14);
  doc.text('24/7 WhatsApp Concierge: +91 98301 44555 | Email: concierge@easterncaravan.in | Web: www.easterncaravan.in', margin, footerY + 19);

  // Save the PDF
  const safeFilename = calculatedTitle.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 35);
  doc.save(`EasternCaravan-${safeFilename}-${tier}.pdf`);
}

export function generatePackageBrochurePDF(pkg: TourPackage, tier: AudienceTier) {
  const customItin = pkg.itinerary.map(i => ({
    day: i.day,
    title: i.title,
    summary: i.summary + ` (Stay: ${tier === 'luxury' ? i.stayLuxury : i.stayEssential})`,
  }));

  generateCaravanPDF(
    {
      vibe: pkg.category,
      duration: `${pkg.nights}N/${pkg.days}D`,
      tier: tier,
      interests: tier === 'luxury' ? pkg.inclusions.luxury.slice(0, 3) : pkg.inclusions.essential.slice(0, 3),
      travelers: 2,
    },
    pkg.title,
    pkg.pricingINR[tier],
    pkg.days,
    tier,
    customItin
  );
}
