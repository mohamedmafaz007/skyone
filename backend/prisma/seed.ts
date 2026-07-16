import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { STATIC_DEFAULTS, categoryPools } from "./destinations.js";

const prisma = new PrismaClient();

function getSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/ & /g, "-")
    .replace(/ • /g, "-")
    .replace(/ /g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function generateFallbackDetails(d: any) {
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

async function main() {
  console.log("Starting database seeding...");

  // 1. Clean Database
  console.log("Cleaning database...");
  await prisma.dayItinerary.deleteMany();
  await prisma.package.deleteMany();
  await prisma.destination.deleteMany();
  await prisma.pageContent.deleteMany();
  await prisma.admin.deleteMany();
  await prisma.contactMessage.deleteMany();

  // 2. Create Default Admin
  const adminEmail = process.env.ADMIN_EMAIL || "planetlifeweb@gmail.com";
  const defaultPassword = "adminpassword123";
  const passwordHash = bcrypt.hashSync(defaultPassword, 10);
  
  const admin = await prisma.admin.create({
    data: {
      email: adminEmail,
      passwordHash: passwordHash
    }
  });
  console.log(`Admin created: ${admin.email} / password: ${defaultPassword}`);

  // 3. Seed Page Contents
  console.log("Seeding page contents...");
  const pageContents = [
    { key: "home", content: STATIC_DEFAULTS.home },
    { key: "about", content: STATIC_DEFAULTS.about },
    { key: "services", content: STATIC_DEFAULTS.services },
    { 
      key: "gallery", 
      content: { 
        section: STATIC_DEFAULTS.gallerySection, 
        images: STATIC_DEFAULTS.galleryImages 
      } 
    },
    { key: "testimonials", content: STATIC_DEFAULTS.testimonials },
    { key: "faqs", content: STATIC_DEFAULTS.faqs },
    { key: "contact", content: STATIC_DEFAULTS.contact }
  ];

  for (const pc of pageContents) {
    await prisma.pageContent.create({
      data: {
        key: pc.key,
        content: pc.content
      }
    });
  }
  console.log("Page contents seeded successfully.");

  // 4. Seed Destinations, Packages, and Day Itineraries
  console.log("Seeding destinations & packages...");
  for (const dest of STATIC_DEFAULTS.destinations) {
    const slug = getSlug(dest.name);
    
    // Check if we have specific overrides in our static DB, else use fallback generator
    const details = STATIC_DEFAULTS.destinationDetailsDb[slug] || generateFallbackDetails(dest);

    // Create Destination
    const createdDest = await prisma.destination.create({
      data: {
        name: dest.name,
        country: dest.country,
        tag: dest.tag,
        image: dest.image,
        blurb: dest.blurb,
        duration: dest.duration,
        price: dest.price,
        rating: dest.rating,
        overview: details.overview,
        highlights: details.highlights,
        inclusions: details.inclusions,
        exclusions: details.exclusions,
        hotels: details.hotels,
        transportation: details.transportation,
        visaInfo: details.visaInfo,
        bestTime: details.bestTime,
        faqs: details.faqs,
        images: details.images || []
      }
    });

    // Create a default Package related to this destination
    const createdPackage = await prisma.package.create({
      data: {
        name: `${dest.name} Premium Holiday`,
        price: dest.price,
        duration: dest.duration,
        overview: details.overview,
        highlights: details.highlights,
        inclusions: details.inclusions,
        exclusions: details.exclusions,
        transportation: details.transportation,
        visaInfo: details.visaInfo,
        bestTime: details.bestTime,
        hotels: details.hotels,
        destinationId: createdDest.id
      }
    });

    // Create DayItinerary records linked to the package
    for (const day of details.itinerary) {
      await prisma.dayItinerary.create({
        data: {
          day: day.day,
          title: day.title,
          desc: day.desc,
          packageId: createdPackage.id
        }
      });
    }
  }

  console.log("Destinations, Packages, and Itineraries seeded successfully!");
  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
