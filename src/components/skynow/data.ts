import type { LucideIcon } from "lucide-react";
import cambodiaImage from "@/assets/cambodia.png";
import {
  Award,
  BadgeCheck,
  Briefcase,
  Compass,
  CreditCard,
  Globe2,
  Headphones,
  HeartHandshake,
  Hotel,
  Map,
  PlaneTakeoff,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  UserRoundCheck,
} from "lucide-react";

export type Destination = {
  name: string;
  country: string;
  tag: "International" | "Beach" | "Adventure" | "Luxury" | "Family" | "Honeymoon" | "Group Tours";
  image: string;
  blurb: string;
  duration: string;
  price: string;
  rating: number;
};

// Unsplash direct CDN URLs (royalty-free)
const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const destinations: Destination[] = [
  { name: "Bali", country: "Indonesia", tag: "Honeymoon", image: u("photo-1537996194471-e657df975ab4"), blurb: "Emerald rice terraces, temple sunsets & barefoot luxury villas.", duration: "6N / 7D", price: "₹58,900", rating: 4.9 },
  { name: "Singapore & Malaysia", country: "SG • MY", tag: "Family", image: u("photo-1525625293386-3f8f99389edd"), blurb: "Twin-city skyline escapes with Sentosa, Genting & Petronas.", duration: "7N / 8D", price: "₹74,500", rating: 4.8 },
  { name: "Dubai", country: "UAE", tag: "Luxury", image: u("photo-1512453979798-5ea266f8880c"), blurb: "Desert dunes, Burj Khalifa & yacht sundowners on the Marina.", duration: "5N / 6D", price: "₹69,900", rating: 4.9 },
  { name: "Thailand", country: "Bangkok • Phuket", tag: "Beach", image: u("photo-1552465011-b4e21bf6e79a"), blurb: "Long-tail boats, floating markets & Andaman island hopping.", duration: "6N / 7D", price: "₹49,900", rating: 4.7 },
  { name: "Vietnam", country: "Hanoi • Ha Long", tag: "Adventure", image: u("photo-1528127269322-539801943592"), blurb: "Emerald bays, cave kayaking & the old quarters of Hanoi.", duration: "7N / 8D", price: "₹64,000", rating: 4.8 },
  { name: "Cambodia & Vietnam", country: "Combo", tag: "International", image: cambodiaImage, blurb: "Angkor Wat sunrise paired with Mekong Delta cruises.", duration: "9N / 10D", price: "₹92,000", rating: 4.8 },
  { name: "China", country: "Beijing • Shanghai", tag: "International", image: u("photo-1508804185872-d7badad00f7d"), blurb: "The Great Wall, Forbidden City & The Bund's neon skyline.", duration: "8N / 9D", price: "₹1,05,000", rating: 4.7 },
  { name: "Hong Kong & Macau", country: "HK • MO", tag: "Family", image: u("photo-1536599018102-9f803c140fc1"), blurb: "Sky-high dim sum, Disney magic & the Venetian's grand canals.", duration: "5N / 6D", price: "₹78,500", rating: 4.7 },
  { name: "Nepal", country: "Kathmandu • Pokhara", tag: "Adventure", image: u("photo-1544735716-392fe2489ffa"), blurb: "Himalayan sunrises, prayer flags & lakeside Pokhara.", duration: "5N / 6D", price: "₹42,000", rating: 4.8 },
  { name: "Bhutan", country: "Paro • Thimphu", tag: "Adventure", image: u("photo-1587547742929-e69cae0cf4a5"), blurb: "Tiger's Nest monastery & the kingdom of Gross National Happiness.", duration: "6N / 7D", price: "₹67,000", rating: 4.9 },
  { name: "Sri Lanka", country: "Colombo • Kandy", tag: "Family", image: u("photo-1546708770-599a3ba7de3c"), blurb: "Tea trails, temple of the tooth & southern palm beaches.", duration: "6N / 7D", price: "₹46,500", rating: 4.7 },
  { name: "Bahrain", country: "Manama", tag: "Luxury", image: u("photo-1548013146-72479768bada"), blurb: "Pearl diving heritage, modern skyline & Formula 1 flair.", duration: "4N / 5D", price: "₹56,000", rating: 4.6 },
  { name: "Baku Azerbaijan", country: "Baku", tag: "International", image: u("photo-1547448415-e9f5b28e570d"), blurb: "Flame Towers, Old City walls & Caspian coast promenades.", duration: "5N / 6D", price: "₹61,500", rating: 4.7 },
  { name: "Turkey", country: "Istanbul • Cappadocia", tag: "Honeymoon", image: u("photo-1524231757912-21f4fe3a7200"), blurb: "Hot-air balloons at dawn over fairy chimneys.", duration: "7N / 8D", price: "₹89,000", rating: 4.9 },
  { name: "Mauritius", country: "Indian Ocean", tag: "Honeymoon", image: u("photo-1544551763-46a013bb70d5"), blurb: "Turquoise lagoons, catamaran days & over-water villas.", duration: "6N / 7D", price: "₹95,000", rating: 4.9 },
  { name: "Egypt", country: "Cairo • Luxor", tag: "International", image: u("photo-1539768942893-daf53e448371"), blurb: "Pyramids, Nile cruises & the Valley of the Kings.", duration: "7N / 8D", price: "₹98,500", rating: 4.8 },
  { name: "South Africa", country: "Cape Town", tag: "Adventure", image: u("photo-1580060839134-75a5edca2e99"), blurb: "Table Mountain, Cape winelands & Big Five safaris.", duration: "8N / 9D", price: "₹1,45,000", rating: 4.9 },
  { name: "Kenya", country: "Nairobi • Masai Mara", tag: "Adventure", image: u("photo-1516426122078-c23e76319801"), blurb: "The Great Migration & sundowners on the savannah.", duration: "6N / 7D", price: "₹1,25,000", rating: 4.9 },
  { name: "Almaty Kazakhstan", country: "Almaty", tag: "Adventure", image: u("photo-1518623489648-a173ef7824f3"), blurb: "Alpine lakes, Medeu skating & Charyn Canyon drives.", duration: "5N / 6D", price: "₹58,000", rating: 4.7 },
  { name: "Japan", country: "Tokyo • Kyoto", tag: "Luxury", image: u("photo-1493976040374-85c8e12f0c0e"), blurb: "Cherry blossoms, Shinkansen speed & ancient Kyoto shrines.", duration: "8N / 9D", price: "₹1,65,000", rating: 4.9 },
  { name: "Europe", country: "Paris • Swiss • Italy", tag: "Luxury", image: u("photo-1502602898657-3e91760cbb34"), blurb: "The classic grand tour across three unforgettable capitals.", duration: "10N / 11D", price: "₹1,95,000", rating: 4.9 },
  { name: "Australia & New Zealand", country: "AU • NZ", tag: "Family", image: u("photo-1523482580672-f109ba8cb9be"), blurb: "Sydney Harbour, Great Ocean Road & Milford Sound fjords.", duration: "12N / 13D", price: "₹2,45,000", rating: 4.9 },
  { name: "USA", country: "NY • LA • Vegas", tag: "Group Tours", image: u("photo-1485871981521-5b1fd3805eee"), blurb: "Coast-to-coast icons: Times Square to the Grand Canyon.", duration: "11N / 12D", price: "₹2,15,000", rating: 4.8 },
];

export const galleryImages: string[] = [
  u("photo-1507525428034-b723cf961d3e"),
  u("photo-1476514525535-07fb3b4ae5f1"),
  u("photo-1506744038136-46273834b3fb"),
  u("photo-1469854523086-cc02fe5d8800"),
  u("photo-1533105079780-92b9be482077"),
  u("photo-1513694203232-719a280e022f"),
  u("photo-1502602898657-3e91760cbb34"),
  u("photo-1488646953014-85cb44e25828"),
  u("photo-1501785888041-af3ef285b470"),
  u("photo-1501555088652-021faa106b9b"),
  u("photo-1530789253388-582c481c54b0"),
  u("photo-1527631746610-bca00a040d60"),
];

export type Feature = { icon: LucideIcon; title: string; desc: string };
export const features: Feature[] = [
  { icon: Globe2, title: "International Tour Packages", desc: "22+ curated destinations across five continents." },
  { icon: Compass, title: "Expert Travel Guidance", desc: "Consultations with certified destination specialists." },
  { icon: BadgeCheck, title: "Visa Assistance", desc: "End-to-end documentation & appointment handling." },
  { icon: PlaneTakeoff, title: "Flight Booking", desc: "Best fares across full-service & premium carriers." },
  { icon: Hotel, title: "Hotel Booking", desc: "Hand-picked 4★ / 5★ stays and boutique resorts." },
  { icon: UserRoundCheck, title: "Professional Tour Guides", desc: "Licensed multilingual local guides on every tour." },
  { icon: Sparkles, title: "Custom Holiday Packages", desc: "Every itinerary tailored to your pace and taste." },
  { icon: HeartHandshake, title: "Honeymoon Packages", desc: "Private villas, candlelit dinners, memory-making." },
  { icon: Users, title: "Family & Group Tours", desc: "Kid-friendly plans and dedicated group coordinators." },
  { icon: Briefcase, title: "Corporate Tours", desc: "MICE, incentives and offsite planning at scale." },
  { icon: ShieldCheck, title: "Travel Insurance", desc: "Comprehensive medical & trip protection." },
  { icon: Headphones, title: "24/7 Support", desc: "A real human on WhatsApp, wherever you are." },
  { icon: CreditCard, title: "Affordable Pricing", desc: "Best-price promise with transparent breakups." },
  { icon: Map, title: "Safe Travel Experience", desc: "Vetted operators & round-the-clock trip monitoring." },
  { icon: Award, title: "Award-Winning Service", desc: "Rated 4.9/5 by 10,000+ delighted travellers." },
];

export const testimonials = [
  {
    name: "Aarav & Meera Kapoor",
    trip: "Bali Honeymoon Tour",
    quote: "Our Bali honeymoon was pure poetry. From private Ubud jungle retreats to the sunset Kecak performance and a dinner cruise in Jimbaran, every moment was hand-tailored. SkyNow didn't just book a package — they authored our dream.",
    avatar: u("photo-1544005313-94ddf0286df2", 200),
  },
  {
    name: "The Sharma Family",
    trip: "Singapore & Malaysia Escape",
    quote: "Travelling with three generations is usually a logistical nightmare. SkyNow turned it into a seamless breeze. The pacing through Singapore and Malaysia was relaxed, the stays were top-tier, and our private guide was a absolute delight.",
    avatar: u("photo-1507003211169-0a1dd7228f2d", 200),
  },
  {
    name: "Rhea Nair",
    trip: "Turkey • Cappadocia Explorer",
    quote: "Perfection in planning. Our Turkey explorer tour was outstanding, but what blew us away was their 24/7 WhatsApp host. When our flight from Istanbul was delayed, they re-scheduled all connections and balloon slots instantly.",
    avatar: u("photo-1494790108377-be9c29b29330", 200),
  },
  {
    name: "Kabir Menon",
    trip: "Europe Grand Tour",
    quote: "The classic Grand Tour of Europe was executed with military precision and luxury resort standards. Fast-track tickets, boutique hotel views in Switzerland, and expert guides in Rome. Absolute worth every single rupee.",
    avatar: u("photo-1500648767791-00dcc994a43e", 200),
  },
  {
    name: "Neha Iyer",
    trip: "Dubai Luxury Getaway",
    quote: "Unbelievable Dubai getaway. Watching the fountains from our Address suite, yachting on the Marina at sunset, and dune bashing in a private 4x4. Perfectly paced, exceptionally premium, and completely seamless!",
    avatar: u("photo-1438761681033-6461ffad8d80", 200),
  },
];

export const partnerLogos = [
  "Emirates", "Singapore Airlines", "Qatar Airways", "Marriott",
  "Hyatt", "Radisson", "Taj", "IHG", "Accor", "Turkish Airlines",
];

export const faqs = [
  { q: "How do I book a holiday package with SkyNow?", a: "Share your dates and destination via our contact form or WhatsApp. A specialist will design a personalised itinerary within 24 hours, then we lock it in with a small booking deposit." },
  { q: "Do you handle visas and travel insurance?", a: "Yes. Every international package includes end-to-end visa assistance, and we offer optional comprehensive travel insurance from top-tier providers." },
  { q: "Can I customise an existing package?", a: "Absolutely. Every itinerary is a starting point — extend nights, upgrade hotels, add experiences or combine multiple destinations." },
  { q: "Are flights included in the packages?", a: "Most packages are quoted land-only for flexibility, but our team will book the best fares across full-service carriers on request." },
  { q: "What if I need help while travelling?", a: "Our 24/7 concierge is a WhatsApp message away, in any timezone, for real-time support from booking to homecoming." },
  { q: "Do you organise group and corporate tours?", a: "Yes — from 8-guest family reunions to 500-pax corporate offsites. We handle logistics, MICE, and celebrations end-to-end." },
];

export const stats = [
  { value: 10000, suffix: "+", label: "Happy Travellers" },
  { value: 22, suffix: "+", label: "International Destinations" },
  { value: 15, suffix: "+", label: "Years of Experience" },
  { value: 98, suffix: "%", label: "Customer Satisfaction" },
];

export const trustBadges = [
  { icon: Star, label: "5 Star Rated" },
  { icon: BadgeCheck, label: "Best Price Guarantee" },
  { icon: ShieldCheck, label: "Visa Assistance" },
  { icon: Globe2, label: "International Tours" },
  { icon: Headphones, label: "24/7 Support" },
];