import { useState, useEffect } from "react";
import * as Lucide from "lucide-react";

// Event name for store changes
export const DATA_UPDATE_EVENT = "skynow_data_update";

// Map of icons that can be edited/selected by user
export const IconMap: Record<string, any> = {
  Globe2: Lucide.Globe2,
  BadgeCheck: Lucide.BadgeCheck,
  PlaneTakeoff: Lucide.PlaneTakeoff,
  Hotel: Lucide.Hotel,
  ShieldCheck: Lucide.ShieldCheck,
  Heart: Lucide.Heart,
  Users: Lucide.Users,
  Briefcase: Lucide.Briefcase,
  Ship: Lucide.Ship,
  HeartHandshake: Lucide.HeartHandshake,
  ArrowRight: Lucide.ArrowRight,
  Sparkles: Lucide.Sparkles,
  Headphones: Lucide.Headphones,
  CreditCard: Lucide.CreditCard,
  Map: Lucide.Map,
  Award: Lucide.Award,
  Compass: Lucide.Compass,
  Star: Lucide.Star,
  UserRoundCheck: Lucide.UserRoundCheck,
  Plane: Lucide.Plane,
  X: Lucide.X,
  Plus: Lucide.Plus,
  Trash2: Lucide.Trash2,
  Edit2: Lucide.Edit2,
  Save: Lucide.Save,
  Undo: Lucide.Undo,
  MessageCircle: Lucide.MessageCircle,
  Phone: Lucide.Phone,
  Mail: Lucide.Mail,
  MapPin: Lucide.MapPin,
  Clock: Lucide.Clock,
  Globe: Lucide.Globe,
  Upload: Lucide.Upload,
  Lock: Lucide.Lock,
  Unlock: Lucide.Unlock,
  Eye: Lucide.Eye,
  SlidersHorizontal: Lucide.SlidersHorizontal,
  ChevronDown: Lucide.ChevronDown,
  ChevronLeft: Lucide.ChevronLeft,
  ChevronRight: Lucide.ChevronRight,
  Play: Lucide.Play,
  CheckCircle: Lucide.CheckCircle,
  Inbox: Lucide.Inbox,
  LayoutDashboard: Lucide.LayoutDashboard,
};

// Default image helper
const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

// Static fallback defaults to initialize localStorage
export const STATIC_DEFAULTS = {
  home: {
    hero: {
      title: "Explore the World with SkyNow Holidays.",
      subtitle: "A boutique travel studio crafting personalised, high-touch luxury holidays across 5 continents.",
      bgType: "image" as "image" | "video",
      bgUrl: "", // Revert to local static heroBg image asset
    },
    stats: [
      { value: 10000, suffix: "+", label: "Happy Travellers" },
      { value: 22, suffix: "+", label: "International Destinations" },
      { value: 15, suffix: "+", label: "Years of Experience" },
      { value: 98, suffix: "%", label: "Customer Satisfaction" },
    ],
    trustBadges: [
      { icon: "Star", label: "5 Star Rated" },
      { icon: "BadgeCheck", label: "Best Price Guarantee" },
      { icon: "ShieldCheck", label: "Visa Assistance" },
      { icon: "Globe2", label: "International Tours" },
      { icon: "Headphones", label: "24/7 Support" },
    ],
    partnerLogos: [
      "Emirates", "Singapore Airlines", "Qatar Airways", "Marriott",
      "Hyatt", "Radisson", "Taj", "IHG", "Accor", "Turkish Airlines",
    ],
    trustSection: {
      tagline: "Trusted worldwide",
      title: "Trusted by thousands of happy travellers",
    },
    destinationsSection: {
      tagline: "Popular destinations",
      title: "Handpicked corners of the world, worth every mile.",
      description: "From honeymoons in Bali to safaris in Kenya — 22+ international itineraries designed by specialists who've been there.",
    },
    packagesSection: {
      tagline: "Featured packages",
      title: "Ready-to-go itineraries, infinitely customisable.",
    },
    aboutSection: {
      tagline: "Why SkyNow Holidays",
      title: "A boutique travel studio, obsessed with the details.",
      description: "We're a small team of destination specialists, ex-flight crew, and hospitality veterans. We don't do templates — every itinerary is designed around you, and backed by 24/7 human support.",
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
      sinceYear: "2010",
      badgeLabel: "Best Price",
      badgeVal: "Guaranteed",
    },
    howItWorks: {
      tagline: "How it works",
      title: "Four steps to take-off.",
      steps: [
        { n: "01", t: "Choose Destination", d: "Pick from 22+ curated destinations or tell us your dream." },
        { n: "02", t: "Customise Your Trip", d: "A specialist crafts an itinerary tailored to your pace & budget." },
        { n: "03", t: "Book The Package", d: "Lock it in with a small deposit — flights, stays, visas handled." },
        { n: "04", t: "Enjoy Your Vacation", d: "24/7 concierge on WhatsApp from take-off to homecoming." },
      ]
    },
    faqSection: {
      tagline: "FAQ",
      title: "Questions, answered.",
      description: "Can't find what you're looking for? Our concierge team is a WhatsApp message away.",
    },
    contactSection: {
      tagline: "Get in touch",
      title: "Let's design your next great trip.",
      description: "Share a few details and a destination specialist will call you back within 24 hours with a personalised itinerary.",
    },
    travelDiaries: {
      tagline: "Travel diaries",
      title: "Moments from our travellers' cameras.",
      description: "Real photos from real trips. Every frame here started as an enquiry — could yours be next?",
      images: [] as string[]
    }
  },
  destinations: [
    { name: "Bali", country: "Indonesia", tag: "Honeymoon" as const, image: u("photo-1537996194471-e657df975ab4"), blurb: "Emerald rice terraces, temple sunsets & barefoot luxury villas.", duration: "5N / 6D", price: "₹58,900", rating: 4.9 },
    { name: "Singapore & Malaysia", country: "SG • MY", tag: "Family" as const, image: u("photo-1525625293386-3f8f99389edd"), blurb: "Twin-city skyline escapes with Sentosa, Genting & Petronas.", duration: "6N / 7D", price: "₹74,500", rating: 4.8 },
    { name: "Dubai", country: "UAE", tag: "Luxury" as const, image: u("photo-1512453979798-5ea266f8880c"), blurb: "Desert dunes, Burj Khalifa & yacht sundowners on the Marina.", duration: "5N / 6D", price: "₹69,900", rating: 4.9 },
    { name: "Thailand", country: "Bangkok • Phuket", tag: "Beach" as const, image: u("photo-1552465011-b4e21bf6e79a"), blurb: "Long-tail boats, floating markets & Andaman island hopping.", duration: "6N / 7D", price: "₹49,900", rating: 4.7 },
    { name: "Vietnam", country: "Hanoi • Ha Long", tag: "Adventure" as const, image: u("photo-1528127269322-539801943592"), blurb: "Emerald bays, cave kayaking & the old quarters of Hanoi.", duration: "7N / 8D", price: "₹64,000", rating: 4.8 },
    { name: "Cambodia & Vietnam", country: "Combo", tag: "International" as const, image: "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?auto=format&fit=crop&w=1200&q=80", blurb: "Angkor Wat sunrise paired with Mekong Delta cruises.", duration: "9N / 10D", price: "₹92,000", rating: 4.8 },
    { name: "China", country: "Beijing • Shanghai", tag: "International" as const, image: u("photo-1508804185872-d7badad00f7d"), blurb: "The Great Wall, Forbidden City & The Bund's neon skyline.", duration: "8N / 9D", price: "₹1,05,000", rating: 4.7 },
    { name: "Hong Kong & Macau", country: "HK • MO", tag: "Family" as const, image: u("photo-1536599018102-9f803c140fc1"), blurb: "Sky-high dim sum, Disney magic & the Venetian's grand canals.", duration: "5N / 6D", price: "₹78,500", rating: 4.7 },
    { name: "Nepal", country: "Kathmandu • Pokhara", tag: "Adventure" as const, image: u("photo-1544735716-392fe2489ffa"), blurb: "Himalayan sunrises, prayer flags & lakeside Pokhara.", duration: "5N / 6D", price: "₹42,000", rating: 4.8 },
    { name: "Bhutan", country: "Paro • Thimphu", tag: "Adventure" as const, image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80", blurb: "Tiger's Nest monastery & the kingdom of Gross National Happiness.", duration: "6N / 7D", price: "₹67,000", rating: 4.9 },
    { name: "Sri Lanka", country: "Colombo • Kandy", tag: "Family" as const, image: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1200&q=80", blurb: "Tea trails, temple of the tooth & southern palm beaches.", duration: "6N / 7D", price: "₹46,500", rating: 4.7 },
    { name: "Bahrain", country: "Manama", tag: "Luxury" as const, image: u("photo-1548013146-72479768bada"), blurb: "Pearl diving heritage, modern skyline & Formula 1 flair.", duration: "4N / 5D", price: "₹56,000", rating: 4.6 },
    { name: "Baku Azerbaijan", country: "Baku", tag: "International" as const, image: u("photo-1547448415-e9f5b28e570d"), blurb: "Flame Towers, Old City walls & Caspian coast promenades.", duration: "5N / 6D", price: "₹61,500", rating: 4.7 },
    { name: "Turkey", country: "Istanbul • Cappadocia", tag: "Honeymoon" as const, image: u("photo-1524231757912-21f4fe3a7200"), blurb: "Hot-air balloons at dawn over fairy chimneys.", duration: "7N / 8D", price: "₹89,000", rating: 4.9 },
    { name: "Mauritius", country: "Indian Ocean", tag: "Honeymoon" as const, image: u("photo-1544551763-46a013bb70d5"), blurb: "Turquoise lagoons, catamaran days & over-water villas.", duration: "6N / 7D", price: "₹95,000", rating: 4.9 },
    { name: "Egypt", country: "Cairo • Luxor", tag: "International" as const, image: u("photo-1539768942893-daf53e448371"), blurb: "Pyramids, Nile cruises & the Valley of the Kings.", duration: "7N / 8D", price: "₹98,500", rating: 4.8 },
    { name: "South Africa", country: "Cape Town", tag: "Adventure" as const, image: u("photo-1580060839134-75a5edca2e99"), blurb: "Table Mountain, Cape winelands & Big Five safaris.", duration: "8N / 9D", price: "₹1,45,000", rating: 4.9 },
    { name: "Kenya", country: "Nairobi • Masai Mara", tag: "Adventure" as const, image: u("photo-1516426122078-c23e76319801"), blurb: "The Great Migration & sundowners on the savannah.", duration: "6N / 7D", price: "₹1,25,000", rating: 4.9 },
    { name: "Almaty Kazakhstan", country: "Almaty", tag: "Adventure" as const, image: u("photo-1518623489648-a173ef7824f3"), blurb: "Alpine lakes, Medeu skating & Charyn Canyon drives.", duration: "5N / 6D", price: "₹58,000", rating: 4.7 },
    { name: "Japan", country: "Tokyo • Kyoto", tag: "Luxury" as const, image: u("photo-1493976040374-85c8e12f0c0e"), blurb: "Cherry blossoms, Shinkansen speed & ancient Kyoto shrines.", duration: "8N / 9D", price: "₹1,65,000", rating: 4.9 },
    { name: "Europe", country: "Paris • Swiss • Italy", tag: "Luxury" as const, image: u("photo-1502602898657-3e91760cbb34"), blurb: "The classic grand tour across three unforgettable capitals.", duration: "10N / 11D", price: "₹1,95,000", rating: 4.9 },
    { name: "Australia & New Zealand", country: "AU • NZ", tag: "Family" as const, image: u("photo-1523482580672-f109ba8cb9be"), blurb: "Sydney Harbour, Great Ocean Road & Milford Sound fjords.", duration: "12N / 13D", price: "₹2,45,000", rating: 4.9 },
    { name: "USA", country: "NY • LA • Vegas", tag: "Group Tours" as const, image: u("photo-1485871981521-5b1fd3805eee"), blurb: "Coast-to-coast icons: Times Square to the Grand Canyon.", duration: "11N / 12D", price: "₹2,15,000", rating: 4.8 }
  ],
  destinationDetailsDb: {
    bali: {
      overview: "Experience the ultimate tropical getaway in Bali, the Island of the Gods. Famous for its volcanic mountains, iconic rice paddies, sandy beaches, and vibrant cultural heritage, this tour offers a perfect blend of rejuvenation and exploration.",
      highlights: [
        "Batubulan Barong Dance & Celuk Silver Village tour",
        "Mas Wood Carving Village & Ubud Art Market shopping",
        "Spectacular Tegallalang Rice Terrace & Kintamani Volcano views",
        "Benoa Beach water sports with a complimentary Banana Boat ride",
        "Full-day excursion to Nusa Penida Island including Kelingking Beach",
        "Scenic Ulun Danu Beratan Temple and iconic Handara Gate photo stop"
      ],
      itinerary: [
        { day: "Day 1", title: "Arrival in Bali", desc: "Arrival at Ngurah Rai International Airport. Meet & greet by our local representative, followed by a private transfer to your hotel. Complete your hotel check-in and spend the evening at leisure." },
        { day: "Day 2", title: "Kintamani Volcano Tour", desc: "Watch the Batubulan Barong Dance and visit Celuk Silver Village and Mas Wood Carving Village. Explore Ubud Art Market, Tegallalang Rice Terrace, and the Kintamani Volcano view." },
        { day: "Day 3", title: "Watersports & Uluwatu Temple", desc: "Head to Benoa Beach for water sports including a complimentary Banana Boat ride. Later, visit Padang Padang Beach and Uluwatu Temple." },
        { day: "Day 4", title: "Nusa Penida Island Tour", desc: "Transfer by fast boat to Nusa Penida. Visit the famous Kelingking Beach, Broken Beach, Angel's Billabong, and Crystal Bay. Return to Bali in the afternoon." },
        { day: "Day 5", title: "Handara Gate & Ulun Danu Temple", desc: "Visit the iconic Handara Gate and the floating Ulun Danu Beratan Temple. Explore Wanagiri Hidden Hills." },
        { day: "Day 6", title: "Departure", desc: "Check out of your hotel. Your private driver will transfer you to Bali International Airport for your departure flight." }
      ],
      inclusions: [
        "5 Nights Hotel Accommodation",
        "Daily Breakfast",
        "Private Airport Transfers",
        "Private Sightseeing Tours",
        "English Speaking Driver",
        "Entrance Tickets (As Per Itinerary)",
        "Fast Boat for Nusa Penida",
        "Banana Boat Ride",
        "All Applicable Taxes"
      ],
      exclusions: [
        "Airfare",
        "Visa (If Applicable)",
        "Travel Insurance",
        "Personal Expenses",
        "Optional Activities",
        "Lunch & Dinner (Unless Mentioned)",
        "Tips & Porterage"
      ],
      hotels: [
        { name: "Alaya Resort Ubud / The Haven Seminyak", stars: 5, location: "Ubud & Seminyak, Bali" }
      ],
      transportation: "Hotels are subject to availability; alternatives of similar",
      visaInfo: "Visa on Arrival (VoA) is available for 80+ nationalities (IDR 500,000 / ~USD 35). SkyNow Holiday consultants assist in pre-filling electronic custom declarations.",
      bestTime: "April to October (Dry season with low humidity, clear skies, and gentle breezes).",
      faqs: [
        { q: "Is Bali safe for families and solo female travellers?", a: "Yes, Bali is incredibly welcoming, peaceful, and has very low crime rates. Tourism is highly respected, and locals are warm." },
        { q: "What should I pack for Bali?", a: "Light, breathable summer clothing, swimwear, comfortable sandals/sneakers for walking, reef-safe sunscreen, and modest clothing (saron) for temples." }
      ]
    }
  } as Record<string, any>,
  services: [
    { icon: "Globe2", title: "International Tours", desc: "Curated land & cruise experiences across 22+ countries on 5 continents, planned by destination heads.", features: ["Private local guides", "Seamless airport handling", "Bespoke itineraries"], color: "bg-blue-500/10 text-blue-500" },
    { icon: "BadgeCheck", title: "Visa Assistance", desc: "End-to-end documentation support, visa mock interviews, application filing, and slot booking.", features: ["99.2% success rate", "Express processing support", "Document checklist audit"], color: "bg-emerald-500/10 text-emerald-500" },
    { icon: "PlaneTakeoff", title: "Flight Booking", desc: "Access to consolidated corporate rates and seat locks on full-service premium carriers.", features: ["24/7 re-issuance", "Meal & seat selections", "Group booking discounts"], color: "bg-purple-500/10 text-purple-500" },
    { icon: "Hotel", title: "Hotel Booking", desc: "Handpicked 4-star and 5-star properties, luxury private pool villas, and boutique heritage stays.", features: ["Complimentary upgrades", "Early check-in options", "Vetted safety standards"], color: "bg-amber-500/10 text-amber-500" },
    { icon: "Ship", title: "Cruise Booking", desc: "Booking and routing across major luxury lines, including Royal Caribbean, Resorts World, and Celebrity Cruises.", features: ["Cabin selection experts", "Shore excursion planning", "Onboard credit perks"], color: "bg-cyan-500/10 text-cyan-500" },
    { icon: "Heart", title: "Honeymoon Packages", desc: "Memory-making romantic details: private villas, floating breakfast setups, and beach candlelit dinners.", features: ["Complimentary photoshoot", "Decor & welcome cake", "Leisure-oriented pace"], color: "bg-rose-500/10 text-rose-500" },
    { icon: "Users", title: "Family Packages", desc: "Carefully designed multi-generational travel with kid-friendly activities and comfortable transfers.", features: ["Adjoining room options", "Baby seats on request", "Flexible pacing"], color: "bg-indigo-500/10 text-indigo-500" },
    { icon: "Briefcase", title: "Corporate Tours (MICE)", desc: "Planning scale offsites, reward trips, conferences, and exhibitions with dedicated coordinators.", features: ["GST billing compliance", "Team building activities", "Stage & sound setup"], color: "bg-teal-500/10 text-teal-500" },
    { icon: "HeartHandshake", title: "Group Tours", desc: "Structured milestone group plans for friends, reunions, and seniors with tour managers.", features: ["Guaranteed departures", "Indian meals on request", "Tour lead coordinator"], color: "bg-orange-500/10 text-orange-500" },
    { icon: "ShieldCheck", title: "Travel Insurance", desc: "Comprehensive trip cancellation, baggage delay, and medical emergency protection coverage.", features: ["Cashless claim network", "Covid-19 coverage", "Zero deductible plans"], color: "bg-red-500/10 text-red-500" },
    { icon: "Sparkles", title: "Custom Packages", desc: "Start with a blank canvas. Let us stitch flights, hotels, and activities exactly to your preference.", features: ["Unlimited iterations", "Dedicated planner", "Tailored pacing"], color: "bg-amber-500/20 text-brand" },
  ],
  about: {
    heroTitle: "About Us",
    heroSubtitle: "A boutique travel studio obsessed with crafting unforgettable memories.",
    heroBgImage: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=80",
    storyTitle: "We don't sell packages. We design journeys.",
    storyParagraphs: [
      "SkyNow Holidays was born out of a simple frustration: travel had become transactional. Large portals offered standardized packages, leaving travellers stranded with cookie-cutter plans and computerized chatbots when things went off-track.",
      "We decided to do things differently. We built a boutique travel studio focused on customization, vetted partner properties, and high-touch human service. Every itinerary we design starts with a conversation and ends with a lifetime memory."
    ],
    storyStats: [
      { value: "10k+", label: "Delighted Guests" },
      { value: "4.9★", label: "Google Rating" },
    ],
    timeline: [
      { year: "2010", title: "Foundation", desc: "SkyNow Holidays is founded in Bengaluru as a boutique corporate retreat planner (MICE), starting with a small team of 3 specialists." },
      { year: "2014", title: "Global Expansion", desc: "Launched leisure travel services, curating customized FIT (Free Independent Traveler) tours to Southeast Asia and Europe." },
      { year: "2018", title: "Milestone: 5,000 Travellers", desc: "Recognized as a fast-growing travel studio, assisting over 5,000 travellers and expanding our destination footprint to 15+ countries." },
      { year: "2021", title: "The 24/7 Concierge Revolution", desc: "Introduced our signature round-the-clock WhatsApp support team, ensuring travellers have an expert host in any timezone." },
      { year: "2025", title: "Boutique Agency of the Year", desc: "Winner of the National Luxury Travel Awards. Serving 10,000+ happy holidaymakers with a consistent 4.9/5 star Google rating." },
    ],
    team: [
      { name: "Rohit Sen", role: "Founder & Chief Explorer", bio: "Ex-airline director with 20+ years in premium aviation. Rohit curates our high-end luxury resort connections.", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80" },
      { name: "Shalini Nair", role: "Co-Founder & COO", bio: "Hospitality veteran obsessed with operations. Shalini manages our visa compliance and emergency assistance teams.", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80" },
      { name: "Vikram Malhotra", role: "Head of Europe Planning", bio: "Has personally travelled to 42 countries. Vikram designs all of our Switzerland, Paris, and Italy itineraries.", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80" },
      { name: "Rhea Iyer", role: "Honeymoon & Leisure Specialist", bio: "Bespoke beach holiday expert. Rhea specializes in over-water villas in Mauritius, Maldives, and private Ubud hideaways.", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80" },
    ]
  },
  gallerySection: {
    title: "Gallery",
    subtitle: "Unfiltered frames from our travellers' journeys across five continents.",
    bgImage: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1600&q=80",
    travelDiariesTitle: "Destination Gallery & Travel Diaries",
    travelDiariesSubtitle: "Moments from our travellers' cameras.",
  },
  galleryImages: [
    { url: u("photo-1507525428034-b723cf961d3e"), category: "Beach" },
    { url: u("photo-1476514525535-07fb3b4ae5f1"), category: "Asia" },
    { url: u("photo-1506744038136-46273834b3fb"), category: "Adventure" },
    { url: u("photo-1469854523086-cc02fe5d8800"), category: "Adventure" },
    { url: u("photo-1533105079780-92b9be482077"), category: "Beach" },
    { url: u("photo-1513694203232-719a280e022f"), category: "Luxury" },
    { url: u("photo-1502602898657-3e91760cbb34"), category: "Europe" },
    { url: u("photo-1488646953014-85cb44e25828"), category: "Asia" },
    { url: u("photo-1501785888041-af3ef285b470"), category: "Europe" },
    { url: u("photo-1501555088652-021faa106b9b"), category: "Adventure" },
    { url: u("photo-1530789253388-582c481c54b0"), category: "Asia" },
    { url: u("photo-1527631746610-bca00a040d60"), category: "Asia" }
  ],
  testimonials: {
    reviews: [
      { name: "Aarav & Meera Kapoor", trip: "Bali Honeymoon Tour", quote: "Our Bali honeymoon was pure poetry. From private Ubud jungle retreats to the sunset Kecak performance and a dinner cruise in Jimbaran, every moment was hand-tailored. SkyNow didn't just book a package — they authored our dream.", avatar: u("photo-1544005313-94ddf0286df2", 200), date: "May 2026", rating: 5 },
      { name: "The Sharma Family", trip: "Singapore & Malaysia Escape", quote: "Travelling with three generations is usually a logistical nightmare. SkyNow turned it into a seamless breeze. The pacing through Singapore and Malaysia was relaxed, the stays were top-tier, and our private guide was a absolute delight.", avatar: u("photo-1507003211169-0a1dd7228f2d", 200), date: "April 2026", rating: 5 },
      { name: "Rhea Nair", trip: "Turkey • Cappadocia Explorer", quote: "Perfection in planning. Our Turkey explorer tour was outstanding, but what blew us away was their 24/7 WhatsApp host. When our flight from Istanbul was delayed, they re-scheduled all connections and balloon slots instantly.", avatar: u("photo-1494790108377-be9c29b29330", 200), date: "June 2026", rating: 5 },
      { name: "Kabir Menon", trip: "Europe Grand Tour", quote: "The classic Grand Tour of Europe was executed with military precision and luxury resort standards. Fast-track tickets, boutique hotel views in Switzerland, and expert guides in Rome. Absolute worth every single rupee.", avatar: u("photo-1500648767791-00dcc994a43e", 200), date: "March 2026", rating: 5 },
      { name: "Neha Iyer", trip: "Dubai Luxury Getaway", quote: "Unbelievable Dubai getaway. Watching the fountains from our Address suite, yachting on the Marina at sunset, and dune bashing in a private 4x4. Perfectly paced, exceptionally premium, and completely seamless!", avatar: u("photo-1438761681033-6461ffad8d80", 200), date: "February 2026", rating: 4 },
    ],
    videos: [
      { title: "Kapoor Family in Bali", thumbnail: u("photo-1537996194471-e657df975ab4", 600), src: "https://vjs.zencdn.net/v/oceans.mp4", duration: "0:05" },
      { title: "Turkey Adventures with Rhea", thumbnail: u("photo-1524231757912-21f4fe3a7200", 600), src: "https://vjs.zencdn.net/v/oceans.mp4", duration: "0:05" },
      { title: "Europe Tour Memories", thumbnail: u("photo-1502602898657-3e91760cbb34", 600), src: "https://vjs.zencdn.net/v/oceans.mp4", duration: "0:05" },
    ]
  },
  faqs: [
    { q: "How do I book a holiday package with SkyNow?", a: "Share your dates and destination via our contact form or WhatsApp. A specialist will design a personalised itinerary within 24 hours, then we lock it in with a small booking deposit.", category: "Booking" },
    { q: "Do you handle visas and travel insurance?", a: "Yes. Every international package includes end-to-end visa assistance, and we offer optional comprehensive travel insurance from top-tier providers.", category: "Visa & Insurance" },
    { q: "Can I customise an existing package?", a: "Absolutely. Every itinerary is a starting point — extend nights, upgrade hotels, add experiences or combine multiple destinations.", category: "Customization" },
    { q: "Are flights included in the packages?", a: "Most packages are quoted land-only for flexibility, but our team will book the best fares across full-service carriers on request.", category: "Booking" },
    { q: "What if I need help while travelling?", a: "Our 24/7 concierge is a WhatsApp message away, in any timezone, for real-time support from booking to homecoming.", category: "Support" },
    { q: "Do you organise group and corporate tours?", a: "Yes — from 8-guest family reunions to 500-pax corporate offsites. We handle logistics, MICE, and celebrations end-to-end.", category: "Customization" },
  ],
  contact: {
    address: "25A/1, 2nd Floor, Panagal Road, Shenoy Nagar, MADURAI, Tamil Nadu 625020",
    phone: "+91 76392 77770",
    whatsapp: "https://wa.me/917639277770",
    email: "hello@skynowhollidays.com",
    website: "www.skynowhollidays.com",
    hours: "Mon – Sat · 10:00 - 19:00 IST",
    mapIframe: "https://www.google.com/maps?q=25A%2F1%2C%202nd%20Floor%2C%20Panagal%20Road%2C%20Shenoy%20Nagar%2C%20Madurai%2C%20Tamil%20Nadu%20625020&output=embed",
  },
  messages: [] as any[]
};

export type StoreData = typeof STATIC_DEFAULTS;

// Safe localStorage access
const STORAGE_KEY = "skynow_holiday_app_data";
const CACHE_VERSION = "v4"; // bump this to clear all cached data on next load

export function getStoreData(): StoreData {
  if (typeof window === "undefined") {
    return STATIC_DEFAULTS;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...STATIC_DEFAULTS, _v: CACHE_VERSION }));
      return STATIC_DEFAULTS;
    }
    const parsed = JSON.parse(raw);

    // Version mismatch — clear corrupt cache and return defaults
    if (parsed._v !== CACHE_VERSION) {
      console.warn("[dataStore] Cache version mismatch — clearing stale data.");
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...STATIC_DEFAULTS, _v: CACHE_VERSION }));
      return STATIC_DEFAULTS;
    }
    
    // Self-healing check: automatically reset default to image if populated with the old demo video
    if (parsed.home && parsed.home.hero && parsed.home.hero.bgUrl === "https://vjs.zencdn.net/v/oceans.mp4") {
      parsed.home.hero.bgType = "image";
      parsed.home.hero.bgUrl = "";
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    }

    // Auto-update default title to new requested title
    if (parsed.home && parsed.home.hero && parsed.home.hero.title === "We don't sell packages. We design journeys.") {
      parsed.home.hero.title = "Explore the World with SkyNow Holidays.";
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    }

    // Deep merge defaults to avoid issues when adding new fields in updates
    return {
      home: {
        ...STATIC_DEFAULTS.home,
        ...parsed.home,
        hero: parsed.home?.hero ? { ...STATIC_DEFAULTS.home.hero, ...parsed.home.hero } : STATIC_DEFAULTS.home.hero,
        trustSection: parsed.home?.trustSection ? { ...STATIC_DEFAULTS.home.trustSection, ...parsed.home.trustSection } : STATIC_DEFAULTS.home.trustSection,
        destinationsSection: parsed.home?.destinationsSection ? { ...STATIC_DEFAULTS.home.destinationsSection, ...parsed.home.destinationsSection } : STATIC_DEFAULTS.home.destinationsSection,
        packagesSection: parsed.home?.packagesSection ? { ...STATIC_DEFAULTS.home.packagesSection, ...parsed.home.packagesSection } : STATIC_DEFAULTS.home.packagesSection,
        aboutSection: parsed.home?.aboutSection ? { ...STATIC_DEFAULTS.home.aboutSection, ...parsed.home.aboutSection } : STATIC_DEFAULTS.home.aboutSection,
        howItWorks: parsed.home?.howItWorks ? { ...STATIC_DEFAULTS.home.howItWorks, ...parsed.home.howItWorks } : STATIC_DEFAULTS.home.howItWorks,
        faqSection: parsed.home?.faqSection ? { ...STATIC_DEFAULTS.home.faqSection, ...parsed.home.faqSection } : STATIC_DEFAULTS.home.faqSection,
        contactSection: parsed.home?.contactSection ? { ...STATIC_DEFAULTS.home.contactSection, ...parsed.home.contactSection } : STATIC_DEFAULTS.home.contactSection,
        travelDiaries: parsed.home?.travelDiaries ? { ...STATIC_DEFAULTS.home.travelDiaries, ...parsed.home.travelDiaries } : STATIC_DEFAULTS.home.travelDiaries,
      },
      destinations: parsed.destinations || STATIC_DEFAULTS.destinations,
      destinationDetailsDb: parsed.destinationDetailsDb || STATIC_DEFAULTS.destinationDetailsDb,
      services: parsed.services || STATIC_DEFAULTS.services,
      about: { ...STATIC_DEFAULTS.about, ...parsed.about },
      gallerySection: parsed.gallerySection ? { ...STATIC_DEFAULTS.gallerySection, ...parsed.gallerySection } : STATIC_DEFAULTS.gallerySection,
      galleryImages: parsed.galleryImages || STATIC_DEFAULTS.galleryImages,
      testimonials: { ...STATIC_DEFAULTS.testimonials, ...parsed.testimonials },
      faqs: parsed.faqs || STATIC_DEFAULTS.faqs,
      contact: { ...STATIC_DEFAULTS.contact, ...parsed.contact },
      messages: parsed.messages || STATIC_DEFAULTS.messages,
    };
  } catch (e) {
    console.error("Failed to parse localStorage app data", e);
    return STATIC_DEFAULTS;
  }
}

export function saveStoreData(data: Partial<StoreData>) {
  if (typeof window === "undefined") return;
  try {
    const current = getStoreData();
    const updated = { ...current, ...data };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event(DATA_UPDATE_EVENT));
  } catch (e) {
    console.error("Failed to save app data", e);
  }
}

export function resetStoreData() {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(STATIC_DEFAULTS));
    window.dispatchEvent(new Event(DATA_UPDATE_EVENT));
  } catch (e) {
    console.error("Failed to reset store", e);
  }
}

// Helper to get slug
function getSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/ & /g, "-")
    .replace(/ • /g, "-")
    .replace(/ /g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

// Reactive Hook connected to backend Express API
export function useAppData() {
  const [data, setData] = useState<StoreData>(STATIC_DEFAULTS);
  const [isMounted, setIsMounted] = useState(false);
  const API_URL = (import.meta.env.VITE_API_URL as string) || "http://localhost:5000";

  // Helper to fetch admin JWT token
  const getHeaders = () => {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("skynow_admin_token");
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return headers;
  };

  // Sync state with local storage
  const syncLocal = () => {
    setData(getStoreData());
  };

  useEffect(() => {
    setIsMounted(true);
    
    // 1. Initially load from localStorage for instant display
    const localData = getStoreData();
    setData(localData);

    // 2. Fetch live data from backend PostgreSQL database asynchronously
    const fetchLiveData = async () => {
      try {
        const [contentRes, destRes, msgRes] = await Promise.all([
          fetch(`${API_URL}/api/content`),
          fetch(`${API_URL}/api/destinations`),
          // Fetch messages only if admin is logged in
          (typeof window !== "undefined" && localStorage.getItem("skynow_admin_token"))
            ? fetch(`${API_URL}/api/messages`, { headers: getHeaders() })
            : Promise.resolve(null)
        ]);

        let contents: Record<string, any> = {};
        if (contentRes.ok) {
          contents = await contentRes.ok ? await contentRes.json() : {};
        }

        let dbDests: any[] = [];
        if (destRes.ok) {
          dbDests = await destRes.json();
        }

        let dbMsgs: any[] = [];
        if (msgRes && msgRes.ok) {
          dbMsgs = await msgRes.json();
        }

        setData((current) => {
          // Construct details map from full destination database records
          const detailsDb: Record<string, any> = { ...current.destinationDetailsDb };
          if (dbDests.length > 0) {
            dbDests.forEach((d) => {
              const slug = getSlug(d.name);
              
              // Extract itinerary from packages if present, else fallback to current or generated
              let itinerary: any[] = [];
              if (d.packages && d.packages.length > 0 && d.packages[0].itineraries) {
                itinerary = d.packages[0].itineraries.map((it: any) => ({
                  day: it.day || "",
                  title: it.title || "",
                  desc: it.desc || ""
                }));
              } else if (current.destinationDetailsDb[slug] && current.destinationDetailsDb[slug].itinerary) {
                itinerary = current.destinationDetailsDb[slug].itinerary;
              }

              detailsDb[slug] = {
                overview: d.overview || "",
                highlights: Array.isArray(d.highlights) ? d.highlights : [],
                inclusions: Array.isArray(d.inclusions) ? d.inclusions : [],
                exclusions: Array.isArray(d.exclusions) ? d.exclusions : [],
                hotels: Array.isArray(d.hotels) ? d.hotels : [],
                transportation: d.transportation || "",
                visaInfo: d.visaInfo || "",
                bestTime: d.bestTime || "",
                faqs: Array.isArray(d.faqs) ? d.faqs : [],
                images: Array.isArray(d.images) ? d.images : [],
                itinerary: itinerary
              };
            });
          }

          const merged = {
            home: contents.home || current.home,
            about: contents.about || current.about,
            services: contents.services || current.services,
            gallerySection: contents.gallery ? contents.gallery.section : current.gallerySection,
            galleryImages: contents.gallery ? contents.gallery.images : current.galleryImages,
            testimonials: contents.testimonials || current.testimonials,
            faqs: contents.faqs || current.faqs,
            contact: contents.contact || current.contact,
            destinations: dbDests.length > 0 ? dbDests.map(d => ({
              id: d.id,
              name: d.name,
              country: d.country,
              tag: d.tag,
              image: d.image,
              blurb: d.blurb,
              duration: d.duration,
              price: d.price,
              rating: d.rating
            })) : (current.destinations || []),
            destinationDetailsDb: detailsDb,
            messages: dbMsgs.length > 0 ? dbMsgs : (current.messages || [])
          };

          // Also save in localStorage as cache
          localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
          return merged as any;
        });
      } catch (err) {
        console.warn("Could not sync with live server. Using offline local storage cached data:", err);
      }
    };

    fetchLiveData();
  }, []);

  // Listen to window storage events
  useEffect(() => {
    if (!isMounted) return;
    window.addEventListener(DATA_UPDATE_EVENT, syncLocal);
    return () => {
      window.removeEventListener(DATA_UPDATE_EVENT, syncLocal);
    };
  }, [isMounted]);

  // Update layout page content helper
  const saveContent = async (key: string, content: any) => {
    try {
      await fetch(`${API_URL}/api/content/${key}`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(content)
      });
    } catch (err) {
      console.error(`Failed to save ${key} page content to server:`, err);
    }
  };

  const updateHome = (home: Partial<StoreData["home"]>) => {
    const current = getStoreData();
    const updated = { ...current.home, ...home };
    saveStoreData({ home: updated });
    saveContent("home", updated);
  };

  const updateDestinations = async (destinationsList: StoreData["destinations"]) => {
    saveStoreData({ destinations: destinationsList });
    
    // Sync all destinations with backend
    try {
      const headers = getHeaders();
      for (const dest of destinationsList) {
        const slug = getSlug(dest.name);
        const details = getStoreData().destinationDetailsDb[slug] || {};
        
        const payload = {
          ...dest,
          ...details
        };

        if (dest.id) {
          await fetch(`${API_URL}/api/destinations/${dest.id}`, {
            method: "PUT",
            headers,
            body: JSON.stringify(payload)
          });
        } else {
          const res = await fetch(`${API_URL}/api/destinations`, {
            method: "POST",
            headers,
            body: JSON.stringify(payload)
          });
          if (res.ok) {
            const created = await res.json();
            dest.id = created.id; // Assign actual database ID
          }
        }
      }
    } catch (err) {
      console.error("Failed to sync destinations list to database:", err);
    }
  };

  const updateDestinationDetails = async (detailsDb: StoreData["destinationDetailsDb"]) => {
    saveStoreData({ destinationDetailsDb: detailsDb });
    
    try {
      const headers = getHeaders();
      const currentDests = getStoreData().destinations;
      
      for (const slug of Object.keys(detailsDb)) {
        const details = detailsDb[slug];
        const dest = currentDests.find(d => getSlug(d.name) === slug);
        if (!dest || !dest.id) continue;

        const payload = {
          ...dest,
          ...details
        };

        await fetch(`${API_URL}/api/destinations/${dest.id}`, {
          method: "PUT",
          headers,
          body: JSON.stringify(payload)
        });
      }
    } catch (err) {
      console.error("Failed to sync destination package details to database:", err);
    }
  };

  const updateServices = (services: StoreData["services"]) => {
    saveStoreData({ services });
    saveContent("services", services);
  };

  const updateAbout = (about: Partial<StoreData["about"]>) => {
    const current = getStoreData();
    const updated = { ...current.about, ...about };
    saveStoreData({ about: updated });
    saveContent("about", updated);
  };

  const updateGallery = (galleryImages: StoreData["galleryImages"]) => {
    saveStoreData({ galleryImages });
    const current = getStoreData();
    saveContent("gallery", {
      section: current.gallerySection,
      images: galleryImages
    });
  };

  const updateGallerySection = (gallerySection: Partial<StoreData["gallerySection"]>) => {
    const current = getStoreData();
    const updated = { ...current.gallerySection, ...gallerySection };
    saveStoreData({ gallerySection: updated });
    saveContent("gallery", {
      section: updated,
      images: current.galleryImages
    });
  };

  const updateTestimonials = (testimonials: Partial<StoreData["testimonials"]>) => {
    const current = getStoreData();
    const updated = { ...current.testimonials, ...testimonials };
    saveStoreData({ testimonials: updated });
    saveContent("testimonials", updated);
  };

  const updateFaqs = (faqs: StoreData["faqs"]) => {
    saveStoreData({ faqs });
    saveContent("faqs", faqs);
  };

  const updateContact = (contact: Partial<StoreData["contact"]>) => {
    const current = getStoreData();
    const updated = { ...current.contact, ...contact };
    saveStoreData({ contact: updated });
    saveContent("contact", updated);
  };

  const addMessage = async (message: Omit<StoreData["messages"][number], "id" | "timestamp" | "read">) => {
    const tempId = Math.random().toString(36).substring(2, 9);
    const newMsg = {
      ...message,
      id: tempId,
      timestamp: new Date().toLocaleString(),
      read: false
    };
    
    // Optimistic local state update
    const current = getStoreData();
    saveStoreData({ messages: [newMsg, ...current.messages] });

    try {
      const res = await fetch(`${API_URL}/api/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message)
      });
      if (res.ok) {
        const result = await res.json();
        // Update local state with official database record (with real ID and date)
        const activeData = getStoreData();
        const updatedMsgs = activeData.messages.map(m => m.id === tempId ? result.data : m);
        saveStoreData({ messages: updatedMsgs });
      }
    } catch (err) {
      console.error("Failed to post message to database server:", err);
    }
  };

  const deleteMessage = async (id: string) => {
    const current = getStoreData();
    saveStoreData({ messages: current.messages.filter(m => m.id !== id) });

    try {
      await fetch(`${API_URL}/api/messages/${id}`, {
        method: "DELETE",
        headers: getHeaders()
      });
    } catch (err) {
      console.error(`Failed to delete message ${id} from server:`, err);
    }
  };

  const markMessageRead = async (id: string, read = true) => {
    const current = getStoreData();
    saveStoreData({
      messages: current.messages.map(m => m.id === id ? { ...m, read } : m)
    });

    try {
      await fetch(`${API_URL}/api/messages/${id}/read`, {
        method: "PATCH",
        headers: getHeaders(),
        body: JSON.stringify({ read })
      });
    } catch (err) {
      console.error(`Failed to update message ${id} read status on server:`, err);
    }
  };

  return {
    ...data,
    isMounted,
    updateHome,
    updateDestinations,
    updateDestinationDetails,
    updateServices,
    updateAbout,
    updateGallery,
    updateGallerySection,
    updateTestimonials,
    updateFaqs,
    updateContact,
    addMessage,
    deleteMessage,
    markMessageRead
  };
}
