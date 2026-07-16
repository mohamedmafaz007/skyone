import { destinations, type Destination } from "./data";

export type PackageDetails = Destination & {
  slug: string;
  overview: string;
  highlights: string[];
  itinerary: { day: string; title: string; desc: string }[];
  inclusions: string[];
  exclusions: string[];
  hotels: { name: string; stars: number; location: string }[];
  transportation: string;
  visaInfo: string;
  bestTimeToVisit: string;
  faqs: { q: string; a: string }[];
  relatedSlugs: string[];
  images: string[];
};

// Generate slug for destination
export function getSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/ & /g, "-")
    .replace(/ • /g, "-")
    .replace(/ /g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

// Specific detailed data for each destination to ensure realistic and premium information
const destinationDetailsDb: Record<
  string,
  {
    overview: string;
    highlights: string[];
    itinerary: { day: string; title: string; desc: string }[];
    inclusions: string[];
    exclusions: string[];
    hotels: { name: string; stars: number; location: string }[];
    transportation: string;
    visaInfo: string;
    bestTime: string;
    faqs: { q: string; a: string }[];
  }
> = {
  bali: {
    overview: "Experience the ultimate tropical getaway in Bali, the Island of the Gods. Famous for its volcanic mountains, iconic rice paddies, sandy beaches, and vibrant cultural heritage, this tour offers a perfect blend of rejuvenation and exploration. Stay in premium beachfront resorts and luxury properties, accompanied by private guided sightseeing.",
    highlights: [
      "Batubulan Barong Dance & Celuk Silver Village tour",
      "Mas Wood Carving Village & Ubud Art Market shopping",
      "Spectacular Tegallalang Rice Terrace & Kintamani Volcano views",
      "Benoa Beach water sports with a complimentary Banana Boat ride",
      "Full-day excursion to Nusa Penida Island including Kelingking Beach",
      "Scenic Ulun Danu Beratan Temple and iconic Handara Gate photo stop"
    ],
    itinerary: [
      { day: "Day 1", title: "Arrival in Bali", desc: "Arrival at Ngurah Rai International Airport. Meet & greet by our local representative, followed by a private transfer to your hotel. Complete your hotel check-in and spend the evening at leisure. Overnight stay in Bali." },
      { day: "Day 2", title: "Kintamani Volcano Tour", desc: "After breakfast at the hotel, watch the Batubulan Barong Dance and visit Celuk Silver Village and Mas Wood Carving Village. Explore Ubud Art Market, Tegallalang Rice Terrace, and the Kintamani Volcano view. Complete the day with a local coffee plantation visit. Overnight stay." },
      { day: "Day 3", title: "Watersports & Uluwatu Temple", desc: "Breakfast at the hotel, then head to Benoa Beach for water sports including a complimentary Banana Boat ride (other water sports optional). Later, visit Padang Padang Beach and Uluwatu Temple, with an optional Kecak Fire Dance show. Overnight stay." },
      { day: "Day 4", title: "Nusa Penida Island Tour", desc: "Enjoy breakfast, then transfer by fast boat to Nusa Penida. Visit the famous Kelingking Beach, Broken Beach, Angel's Billabong, and Crystal Bay. A delicious lunch is included. Return to Bali in the afternoon. Overnight stay." },
      { day: "Day 5", title: "Handara Gate & Ulun Danu Temple", desc: "Enjoy breakfast, then visit the iconic Handara Gate and the floating Ulun Danu Beratan Temple. Explore Wanagiri Hidden Hills and spend the rest of the day local shopping. Overnight stay." },
      { day: "Day 6", title: "Departure", desc: "After breakfast, check out of your hotel. Your private driver will transfer you to Bali International Airport for your departure flight." }
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
    transportation: "Private air-conditioned SUV for land travel, speedboats for Nusa Penida island crossing.",
    visaInfo: "Visa on Arrival (VoA) is available for 80+ nationalities (IDR 500,000 / ~USD 35). SkyNow Holiday consultants assist in pre-filling electronic custom declarations.",
    bestTime: "April to October (Dry season with low humidity, clear skies, and gentle breezes).",
    faqs: [
      { q: "Is Bali safe for families and solo female travellers?", a: "Yes, Bali is incredibly welcoming, peaceful, and has very low crime rates. Tourism is highly respected, and locals are warm." },
      { q: "What should I pack for Bali?", a: "Light, breathable summer clothing, swimwear, comfortable sandals/sneakers for walking, reef-safe sunscreen, and modest clothing (saron) for temples." }
    ]
  },
  "singapore-malaysia": {
    overview: "Explore two of Southeast Asia's most dynamic and modern nations. From Singapore's futuristic Gardens by the Bay and Sentosa Island to Malaysia's historical Kuala Lumpur landmarks and cool Genting Highlands. This twin-nation escape features top-tier luxury hotels, private city transfers, and premium attraction admissions.",
    highlights: [
      "Stay in Genting Highlands, Kuala Lumpur, and Singapore",
      "Full-day pass to Universal Studios Singapore and Sentosa Island Tour",
      "KL Tower Observation Deck tickets and Batu Caves excursion",
      "Scenic Genting Awana Skyway two-way cable car ride",
      "Guided city tours of Kuala Lumpur and Singapore",
      "Spectacular Wings of Time show ticket included"
    ],
    itinerary: [
      { day: "Day 1", title: "Arrival in Kuala Lumpur – Genting Highlands", desc: "Morning arrival at Kuala Lumpur International Airport. Meet and greet by our local representative, then transfer to Genting Highlands. Enjoy a scenic two-way cable car ride. Complete hotel check-in and spend the evening exploring Genting Highlands. Overnight stay in Genting Highlands." },
      { day: "Day 2", title: "Genting Highlands – Kuala Lumpur", desc: "Breakfast at the hotel, followed by a visit to Genting SkyWorlds Theme Park. Transfer to Kuala Lumpur and check into your hotel. Spend the evening at leisure or shopping. Overnight stay in Kuala Lumpur." },
      { day: "Day 3", title: "Kuala Lumpur City Tour", desc: "Breakfast at the hotel, then proceed for a Kuala Lumpur City Tour. Visit Petronas Twin Towers (photo stop), KL Tower Observation Deck, King's Palace (photo stop), National Mosque (drive pass), Independence Square, and the Chocolate Boutique. Visit the famous Batu Caves before returning to the hotel. Overnight stay in Kuala Lumpur." },
      { day: "Day 4", title: "Kuala Lumpur to Singapore", desc: "Enjoy breakfast at the hotel, check out, and transfer to Singapore by coach or flight. Complete hotel check-in in Singapore and enjoy the evening at leisure. Overnight stay in Singapore." },
      { day: "Day 5", title: "Singapore City Tour & Sentosa Island", desc: "Breakfast at the hotel, followed by a Singapore City Tour. Visit Merlion Park, Marina Bay Sands (photo stop), and drive through the Civic District. Visit Chinatown and Little India. In the afternoon, enjoy a Sentosa Island Tour and watch the spectacular Wings of Time show. Overnight stay in Singapore." },
      { day: "Day 6", title: "Universal Studios Singapore", desc: "Enjoy breakfast at the hotel, then spend a full day of excitement at Universal Studios Singapore. Return to the hotel for an overnight stay." },
      { day: "Day 7", title: "Departure", desc: "Breakfast at the hotel, check out, and transfer to Singapore Changi Airport for your departure with sweet memories." }
    ],
    inclusions: [
      "1 Night Accommodation in Genting Highlands",
      "2 Nights Accommodation in Kuala Lumpur",
      "3 Nights Accommodation in Singapore",
      "Daily Breakfast",
      "Airport Transfers",
      "Two-Way Genting Cable Car Ride",
      "Kuala Lumpur City Tour",
      "KL Tower Observation Deck Ticket",
      "Batu Caves Visit",
      "Singapore City Tour",
      "Sentosa Island Tour",
      "Wings of Time Show",
      "Universal Studios Singapore Admission Ticket",
      "English Speaking Driver/Guide",
      "All Applicable Taxes"
    ],
    exclusions: [
      "International Airfare",
      "Visa Charges",
      "Travel Insurance",
      "Lunch & Dinner (Unless Mentioned)",
      "Personal Expenses",
      "Optional Tours & Activities",
      "Tips & Porterage",
      "Early Check-in / Late Check-out (if applicable)"
    ],
    hotels: [
      { name: "Resorts World Genting / Crockfords", stars: 5, location: "Genting Highlands" },
      { name: "EQ Kuala Lumpur / Shangri-La KL", stars: 5, location: "Kuala Lumpur" },
      { name: "Marina Bay Sands / Pan Pacific", stars: 5, location: "Singapore" }
    ],
    transportation: "Private air-conditioned transfers for airports and tours; two-way Genting cable car ride.",
    visaInfo: "Singapore requires SG Arrival Card (completed within 3 days). Malaysia requires MDAC (Malaysia Digital Arrival Card). Visas for both are processed efficiently by SkyNow.",
    bestTime: "November to August (year-round tropical climate, though dry months are highly comfortable).",
    faqs: [
      { q: "Is it possible to customize the itinerary to add Langkawi or Penang?", a: "Absolutely. We can easily extend the Malaysian leg of your trip to include flights to Langkawi beach resorts or Penang's street food hubs." },
      { q: "Are theme park tickets date-flexible?", a: "To ensure fast-track access, theme park tickets are pre-booked for specific days. However, we can adjust these dates at the time of final booking." }
    ]
  },
  dubai: {
    overview: "Indulge in the glitz and glamour of Dubai. This curated luxury itinerary includes VIP access to the world's tallest building, thrilling desert safaris with private BBQ dunes dinners, luxury yacht charters on the Marina, and shopping experiences at the Dubai Mall.",
    highlights: [
      "VIP Fast-track access to Burj Khalifa 124th & 125th Floor",
      "4x4 Private Dune Bashing Safari with premium desert camp & live shows",
      "Private 2-hour luxury yacht tour on the Dubai Marina with soft drinks",
      "Explore the historic Al Fahidi Fort & take an Abra gold souk ride",
      "Day trip to Abu Dhabi: Ferrari World & Sheikh Zayed Grand Mosque",
      "Premium dining in Downtown Dubai facing the dancing fountains"
    ],
    itinerary: [
      { day: "Day 1", title: "Arrival in Dubai & Marina Dhow Cruise", desc: "Welcome to Dubai! Private airport pickup and check-in to your luxury hotel. In the evening, enjoy a 5-star buffet dinner aboard a traditional wooden Dhow cruise in Marina." },
      { day: "Day 2", title: "Dubai Frame, Old Dubai & Burj Khalifa", desc: "Morning visit to the Dubai Frame. Explore the Gold and Spice Souks. In the afternoon, visit the Dubai Mall and ascend the Burj Khalifa for sky-high city views." },
      { day: "Day 3", title: "Modern Dubai, Palm Jumeirah & Desert Safari", desc: "Drive past the Burj Al Arab, explore the Atlantis Palm, and view the Pointe. At 3 PM, jump into a 4x4 Land Cruiser for desert dune bashing, sandboarding, camel rides, and BBQ dinner." },
      { day: "Day 4", title: "Abu Dhabi Luxury Excursion", desc: "Full-day trip to Abu Dhabi. Marvel at the white marble architecture of Sheikh Zayed Grand Mosque, drive along the Corniche, and enjoy thrilling rides at Ferrari World." },
      { day: "Day 5", title: "Museum of the Future & Luxury Yacht Charter", desc: "Visit the architecturally unique Museum of the Future. In the afternoon, board a private yacht from Dubai Marina for views of the skyline and Ain Dubai." },
      { day: "Day 6", title: "Leisure Shopping & Departure", desc: "Enjoy a late breakfast. Spend the day shopping at the Mall of the Emirates or relax at a luxury beach club. Private transfer to Dubai Airport for departure." }
    ],
    inclusions: [
      "05 Nights stay at selected 4★ or 5★ hotels",
      "Daily breakfast & 2 premium dinners (Dhow Cruise & Desert Camp)",
      "All sightseeing and airport transfers in private VIP SUVs",
      "Abu Dhabi day trip with entrance tickets to Grand Mosque & Ferrari World",
      "Burj Khalifa At The Top + Museum of the Future slot tickets",
      "2-hour private yacht cruise",
      "VAT & Tourism Dirham Fees"
    ],
    exclusions: [
      "Air tickets, travel insurance & UAE Visa fees",
      "Lunch and alcoholic beverages",
      "Tips for guides and drivers"
    ],
    hotels: [
      { name: "JW Marriott Marquis / Address Downtown", stars: 5, location: "Dubai" },
      { name: "The Ritz-Carlton Abu Dhabi", stars: 5, location: "Abu Dhabi" }
    ],
    transportation: "Private Mercedes V-Class or GMC Yukon for transfers, private yachts for cruise.",
    visaInfo: "Single-entry tourist visa is required. SkyNow handles documentation and processes visa approvals within 3-4 working days.",
    bestTime: "October to April (cool, breezy winter season perfect for outdoor dining and desert activities).",
    faqs: [
      { q: "What is the dress code for Abu Dhabi Grand Mosque?", a: "Conservative clothing is mandatory. Women must cover their heads, arms, and legs. Men must wear long trousers and shirts covering shoulders. Loose clothing is recommended." }
    ]
  }
};

const categoryPools: Record<string, string[]> = {
  Beach: [
    "photo-1507525428034-b723cf961d3e",
    "photo-1506929562872-bb421503ef21",
    "photo-1439066615861-d1af74d74000",
    "photo-1519046904884-53103b34b206",
    "photo-1473116763269-255ea7604bb6",
    "photo-1520250497591-112f2f40a3f4",
  ],
  Honeymoon: [
    "photo-1520250497591-112f2f40a3f4",
    "photo-1571896349842-33c89424de2d",
    "photo-1540555700478-4be289fbecef",
    "photo-1584132967334-10e028bd69f7",
    "photo-1512917774080-9991f1c4c750",
    "photo-1544161515-4ab6ce6db874",
  ],
  Luxury: [
    "photo-1571896349842-33c89424de2d",
    "photo-1512917774080-9991f1c4c750",
    "photo-1544161515-4ab6ce6db874",
    "photo-1566073771259-6a8506099945",
    "photo-1582719508461-905c673771fd",
    "photo-1520250497591-112f2f40a3f4",
  ],
  Adventure: [
    "photo-1469854523086-cc02fe5d8800",
    "photo-1533240332313-0db49b439ad3",
    "photo-1501555088652-021faa106b9b",
    "photo-1504280390367-361c6d9f38f4",
    "photo-1486916856992-e4db22c8df33",
    "photo-1527631746610-bca00a040d60",
  ],
  Default: [
    "photo-1488646953014-85cb44e25828",
    "photo-1488085061387-422e29b40080",
    "photo-1501785888041-af3ef285b470",
    "photo-1476514525535-07fb3b4ae5f1",
    "photo-1527631746610-bca00a040d60",
    "photo-1498307818610-a3a9202012d6",
  ]
};

// Fallback generator for destinations that do not have specific overrides in the DB
export function generateFallbackDetails(d: Destination): typeof destinationDetailsDb[string] & { images: string[] } {
  const name = d.name;
  const country = d.country;
  const pool = categoryPools[d.tag] || categoryPools.Default;
  const fallbackImages = [
    d.image,
    ...pool.map(id => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`)
  ].slice(0, 6);
  return {
    overview: `Embark on an unforgettable journey to ${name}, ${country}. This custom package has been designed to highlight the very best of ${name}'s culture, landscapes, and luxury amenities. Backed by SkyNow Holidays' signature 24/7 concierge and expert destination planning, you will experience the trip of a lifetime.`,
    highlights: [
      `Luxury accommodation in handpicked boutique 4★/5★ properties in ${name}`,
      `Private chauffeur-driven sightseeing throughout the entire itinerary`,
      `Exclusive curated excursions to top-rated landmarks in ${name}`,
      `Authentic local culinary tasting experiences and cultural highlights`,
      `Dedicated destination-specialist support on standby on WhatsApp 24/7`
    ],
    itinerary: [
      { day: "Day 1", title: `Welcome to ${name}`, desc: `Arrive at the international airport where your private chauffeur awaits. Transfer to your luxury hotel and enjoy a relaxing evening at leisure.` },
      { day: "Day 2", title: "Guided City Highlights", desc: `Embark on a comprehensive guided tour of the key historical landmarks, cultural hotspots, and local markets of ${name}.` },
      { day: "Day 3", title: "Scenic Nature & Hidden Wonders", desc: `Discover the breathtaking natural beauty surrounding ${name}, featuring panoramic lookouts and photography stops.` },
      { day: "Day 4", title: "Local Culture & Culinary Delights", desc: `Immerse yourself in local traditions. Participate in a private cooking masterclass or workshop, followed by a gourmet tasting dinner.` },
      { day: "Day 5", title: "Adventure & Leisure Excursion", desc: `Spend the day exploring off-the-beaten-path trails or taking part in exciting outdoor activities under the guidance of our local partner.` },
      { day: "Day 6", title: "Sunset Farewell Experience", desc: `Enjoy a special farewell sunset cruise or private rooftop dining experience, commemorating your unforgettable holiday.` },
      { day: "Day 7", title: "Departure & Farewell", desc: `After a leisurely breakfast, complete any final shopping. Your private driver will transfer you to the airport in time for your departure flight.` }
    ],
    inclusions: [
      `06 Nights accommodation in standard 4★/5★ boutique stays`,
      "Daily gourmet buffet breakfasts",
      "Private airport transfers and local sightseeing in luxury SUV",
      "All entrance tickets and guided tour fees as per itinerary",
      "24/7 destination concierge support on WhatsApp",
      "Local SIM card with high-speed internet data"
    ],
    exclusions: [
      "International flights and airport departure taxes",
      "Visa fees and processing expenses",
      "Travel insurance protection plan",
      "Personal items, tips, laundry, and minibar drinks"
    ],
    hotels: [
      { name: `The Grand Palace Hotel ${name}`, stars: 5, location: "Central District" },
      { name: `Royal Oasis Resort & Spa`, stars: 5, location: "Coastal Area" }
    ],
    transportation: "Hotels are subject to availability; alternatives of similar",
    visaInfo: "Visa guidelines vary by nationality. Our documentation specialists handle all applications, appointment bookings, and pre-travel checklist updates.",
    bestTime: "Spring and Autumn months are ideal, presenting pleasant temperatures and minimal rainfall.",
    faqs: [
      { q: `What language is spoken in ${name}?`, a: `While the national language is spoken locally, English is widely spoken and understood in hotels, tourist attractions, and key shopping centers.` },
      { q: `Can this itinerary be customized?`, a: `Absolutely! All SkyNow Holidays packages are 100% customizable. You can adjust durations, swap hotels, add activities, or combine this with other destinations.` }
    ],
    images: fallbackImages
  };
}

// Main fetcher function for package details
export function getPackageDetails(slug: string): PackageDetails | null {
  const { getStoreData } = import.meta.glob("@/lib/dataStore", { eager: true })["/src/lib/dataStore.ts"] as any;
  const store = getStoreData();
  
  const match = store.destinations.find((d: any) => getSlug(d.name) === slug);
  if (!match) return null;

  const dbData = store.destinationDetailsDb[slug] || generateFallbackDetails(match);



  const pool = categoryPools[match.tag] || categoryPools.Default;
  const extraImages = dbData.images && dbData.images.length > 0
    ? dbData.images
    : [
        match.image,
        ...pool.map(id => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`)
      ].slice(0, 6);

  // Dynamic recommendation logic: select 3 packages of the same category, or closest in order
  const related = store.destinations
    .filter((d: any) => d.name !== match.name)
    .sort((a: any, b: any) => {
      if (a.tag === match.tag && b.tag !== match.tag) return -1;
      if (a.tag !== match.tag && b.tag === match.tag) return 1;
      return 0;
    })
    .slice(0, 3)
    .map((d: any) => getSlug(d.name));

  return {
    ...match,
    slug,
    overview: dbData.overview,
    highlights: dbData.highlights,
    itinerary: dbData.itinerary,
    inclusions: dbData.inclusions,
    exclusions: dbData.exclusions,
    hotels: dbData.hotels,
    transportation: dbData.transportation,
    visaInfo: dbData.visaInfo,
    bestTimeToVisit: dbData.bestTime,
    faqs: dbData.faqs,
    relatedSlugs: related,
    images: extraImages,
  };
}
