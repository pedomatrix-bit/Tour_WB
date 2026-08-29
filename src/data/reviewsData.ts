import { Testimonial } from '../types';

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    author: 'Lady Eleanor Vance-Montgomery',
    role: 'Historian & Botanical Author',
    location: 'Edinburgh, United Kingdom',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    quote: 'The Eastern Caravan delivered an experience unmatched by any bespoke agency. Waking up in a 19th-century planter suite in Darjeeling with a silver teapot and Kanchenjunga outside my window felt like stepping into an archival dream.',
    tourTaken: 'The Grand Darjeeling Tea Caravan',
    tier: 'luxury',
    rating: 5,
  },
  {
    id: 't2',
    author: 'Debabrata & Sharmila Mukherjee',
    role: 'NRI Tech Executive & Cultural Philanthropist',
    location: 'San Jose, California',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    quote: 'We brought our children back to their roots in Bengal. The Baul musical evening under the Sal trees in Shantiniketan and the Baluchari master weaver interactions were deeply moving. The hybrid payment and smooth coordination made it effortless.',
    tourTaken: 'Tagore’s Shantiniketan & Bishnupur Trail',
    tier: 'luxury',
    rating: 5,
  },
  {
    id: 't3',
    author: 'Vikramjit Roy & Friends',
    role: 'Wildlife Photographer',
    location: 'Bengaluru, India',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    quote: 'Our naturalist in the Sundarbans deciphered fresh tiger pugmarks at Sudhanyakhali, and we witnessed a majestic male tiger swimming across the creek! The Essential Heritage homestay package was authentic, clean, and delicious.',
    tourTaken: 'The Royal Bengal Tiger River Cruise',
    tier: 'essential',
    rating: 5,
  },
  {
    id: 't4',
    author: 'Dr. Antoine Leclerc',
    role: 'Architectural Conservator',
    location: 'Lyon, France',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop',
    quote: 'The terracotta temples of Bishnupur and the river cruise past Chandannagar offered a sublime glimpse of Bengal’s multi-layered history. The 20% advance booking gave us total peace of mind.',
    tourTaken: 'The Bengal Renaissance & Ganges Heritage Voyage',
    tier: 'luxury',
    rating: 5,
  },
];

export const PARTNERS = [
  { name: 'West Bengal Tourism Development', role: 'Official Partner', icon: 'Landmark' },
  { name: 'Darjeeling Himalayan Railway (UNESCO)', role: 'Heritage Operator', icon: 'Train' },
  { name: 'INTACH Heritage Bengal', role: 'Conservation Advisory', icon: 'ShieldCheck' },
  { name: 'Indian Hotels Company (IHCL / Taj Heritage)', role: 'Hospitality Partner', icon: 'Building2' },
  { name: 'Sundarban Wilderness & Tiger Conservation Trust', role: 'Eco-Charter Member', icon: 'Trees' },
  { name: 'Tea Board of India', role: 'Estate Validation', icon: 'Coffee' },
];
