import { r as dataStore_exports } from "./dataStore-DogEXO2o.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/packageDetailsData-AeMTizGf.js
function getSlug(name) {
	return name.toLowerCase().replace(/ & /g, "-").replace(/ • /g, "-").replace(/ /g, "-").replace(/[^a-z0-9-]/g, "");
}
var categoryPools = {
	Beach: [
		"photo-1507525428034-b723cf961d3e",
		"photo-1506929562872-bb421503ef21",
		"photo-1439066615861-d1af74d74000",
		"photo-1519046904884-53103b34b206",
		"photo-1473116763269-255ea7604bb6",
		"photo-1520250497591-112f2f40a3f4"
	],
	Honeymoon: [
		"photo-1520250497591-112f2f40a3f4",
		"photo-1571896349842-33c89424de2d",
		"photo-1540555700478-4be289fbecef",
		"photo-1584132967334-10e028bd69f7",
		"photo-1512917774080-9991f1c4c750",
		"photo-1544161515-4ab6ce6db874"
	],
	Luxury: [
		"photo-1571896349842-33c89424de2d",
		"photo-1512917774080-9991f1c4c750",
		"photo-1544161515-4ab6ce6db874",
		"photo-1566073771259-6a8506099945",
		"photo-1582719508461-905c673771fd",
		"photo-1520250497591-112f2f40a3f4"
	],
	Adventure: [
		"photo-1469854523086-cc02fe5d8800",
		"photo-1533240332313-0db49b439ad3",
		"photo-1501555088652-021faa106b9b",
		"photo-1504280390367-361c6d9f38f4",
		"photo-1486916856992-e4db22c8df33",
		"photo-1527631746610-bca00a040d60"
	],
	Default: [
		"photo-1488646953014-85cb44e25828",
		"photo-1488085061387-422e29b40080",
		"photo-1501785888041-af3ef285b470",
		"photo-1476514525535-07fb3b4ae5f1",
		"photo-1527631746610-bca00a040d60",
		"photo-1498307818610-a3a9202012d6"
	]
};
function generateFallbackDetails(d) {
	const name = d.name;
	const country = d.country;
	const pool = categoryPools[d.tag] || categoryPools.Default;
	const fallbackImages = [d.image, ...pool.map((id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`)].slice(0, 6);
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
			{
				day: "Day 1",
				title: `Welcome to ${name}`,
				desc: `Arrive at the international airport where your private chauffeur awaits. Transfer to your luxury hotel and enjoy a relaxing evening at leisure.`
			},
			{
				day: "Day 2",
				title: "Guided City Highlights",
				desc: `Embark on a comprehensive guided tour of the key historical landmarks, cultural hotspots, and local markets of ${name}.`
			},
			{
				day: "Day 3",
				title: "Scenic Nature & Hidden Wonders",
				desc: `Discover the breathtaking natural beauty surrounding ${name}, featuring panoramic lookouts and photography stops.`
			},
			{
				day: "Day 4",
				title: "Local Culture & Culinary Delights",
				desc: `Immerse yourself in local traditions. Participate in a private cooking masterclass or workshop, followed by a gourmet tasting dinner.`
			},
			{
				day: "Day 5",
				title: "Adventure & Leisure Excursion",
				desc: `Spend the day exploring off-the-beaten-path trails or taking part in exciting outdoor activities under the guidance of our local partner.`
			},
			{
				day: "Day 6",
				title: "Sunset Farewell Experience",
				desc: `Enjoy a special farewell sunset cruise or private rooftop dining experience, commemorating your unforgettable holiday.`
			},
			{
				day: "Day 7",
				title: "Departure & Farewell",
				desc: `After a leisurely breakfast, complete any final shopping. Your private driver will transfer you to the airport in time for your departure flight.`
			}
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
		hotels: [{
			name: `The Grand Palace Hotel ${name}`,
			stars: 5,
			location: "Central District"
		}, {
			name: `Royal Oasis Resort & Spa`,
			stars: 5,
			location: "Coastal Area"
		}],
		transportation: "Private air-conditioned luxury sedan, VIP SUV, or business van.",
		visaInfo: "Visa guidelines vary by nationality. Our documentation specialists handle all applications, appointment bookings, and pre-travel checklist updates.",
		bestTime: "Spring and Autumn months are ideal, presenting pleasant temperatures and minimal rainfall.",
		faqs: [{
			q: `What language is spoken in ${name}?`,
			a: `While the national language is spoken locally, English is widely spoken and understood in hotels, tourist attractions, and key shopping centers.`
		}, {
			q: `Can this itinerary be customized?`,
			a: `Absolutely! All SkyNow Holidays packages are 100% customizable. You can adjust durations, swap hotels, add activities, or combine this with other destinations.`
		}],
		images: fallbackImages
	};
}
function getPackageDetails(slug) {
	const { getStoreData } = (/* #__PURE__ */ Object.assign({ "/src/lib/dataStore.ts": dataStore_exports }))["/src/lib/dataStore.ts"];
	const store = getStoreData();
	const match = store.destinations.find((d) => getSlug(d.name) === slug);
	if (!match) return null;
	const dbData = store.destinationDetailsDb[slug] || generateFallbackDetails(match);
	const pool = categoryPools[match.tag] || categoryPools.Default;
	const extraImages = dbData.images && dbData.images.length > 0 ? dbData.images : [match.image, ...pool.map((id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`)].slice(0, 6);
	const related = store.destinations.filter((d) => d.name !== match.name).sort((a, b) => {
		if (a.tag === match.tag && b.tag !== match.tag) return -1;
		if (a.tag !== match.tag && b.tag === match.tag) return 1;
		return 0;
	}).slice(0, 3).map((d) => getSlug(d.name));
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
		images: extraImages
	};
}
//#endregion
export { getPackageDetails as n, getSlug as r, generateFallbackDetails as t };
