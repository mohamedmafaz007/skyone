import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.warn("WARNING: GEMINI_API_KEY is not defined in the environment variables.");
}

const ai = new GoogleGenerativeAI(apiKey || "");

/**
 * Regex-based fallback parser in case the Google Gemini API key is missing or invalid.
 */
function fallbackParseItinerary(text: string): any {
  const t = text;
  const result: any = {
    name: "",
    country: "",
    duration: "",
    price: "",
    blurb: "",
    overview: "",
    highlights: [],
    itinerary: [],
    inclusions: [],
    exclusions: [],
    hotels: [],
    transportation: "",
    visaInfo: "",
    bestTime: ""
  };

  // Name
  const nameLabelMatch = t.match(/(?:package\s*name|destination|tour\s*name)[:\s]+(.+)/i);
  const firstLine = t.split('\n').find(l => l.trim().length > 2);
  if (nameLabelMatch) result.name = nameLabelMatch[1].trim();
  else if (firstLine) result.name = firstLine.trim().replace(/[:\-–].*$/, '').trim();

  // Country
  const countryMatch = t.match(/(?:country|location|place)[:\s]+(.+)/i);
  if (countryMatch) result.country = countryMatch[1].split('\n')[0].trim();

  // Duration
  const durMatch = t.match(/(\d+)\s*N\s*[\/\-\s]\s*(\d+)\s*D/i) ||
                   t.match(/(\d+)\s*nights?.*?(\d+)\s*days?/i) ||
                   t.match(/duration[:\s]+([^\n]+)/i);
  if (durMatch) {
    result.duration = durMatch[2] ? `${durMatch[1]}N / ${durMatch[2]}D` : durMatch[1].trim();
  }

  // Price
  const priceMatch = t.match(/(?:price|cost|rate|per\s*person)[:\s]*[₹$£€]?\s*([\d,]+)/i) ||
                     t.match(/[₹]\s*([\d,]+)/i);
  if (priceMatch) {
    result.price = `₹${priceMatch[1].replace(/,/g,'').replace(/(\d)(?=(\d{3})+$)/g,'$1,')}`;
  }

  // Blurb
  const blurbMatch = t.match(/(?:overview|about|highlight|summary)[:\s]+([^\n]{20,})/i);
  if (blurbMatch) result.blurb = blurbMatch[1].trim().substring(0, 120);

  // Overview
  const ovMatch = t.match(/(?:overview|about this tour|description)[:\s]*\n([\s\S]{20,3000})(?=\n(?:day\s*1|itinerary|inclusion|hotel|$))/i);
  if (ovMatch) result.overview = ovMatch[1].trim().substring(0, 800);

  // Highlights
  const hlSection = t.match(/highlights?[:\s]*\n([\s\S]+?)(?=\nday\s*1|\nitinerary|\ninclusion|\n#|\n[A-Z].*:\s*\n|$)/i);
  if (hlSection) {
    result.highlights = hlSection[1]
      .split('\n')
      .map((l: string) => l.replace(/^[-•✓✅*\d.]+\s*/, '').trim())
      .filter((l: string) => l.length > 4)
      .slice(0, 8);
  }

  // Itinerary
  const dayMatches = [...t.matchAll(/day\s*(\d+)\s*[:\-–]+\s*(.+?)\n([\s\S]+?)(?=day\s*\d+\s*[:\-–]|inclusions?\s*:|exclusions?\s*:|hotels?\s*:|$)/gi)];
  if (dayMatches.length > 0) {
    result.itinerary = dayMatches.map((m: any) => ({
      day: `Day ${m[1]}`,
      title: m[2].trim().substring(0, 70),
      desc: m[3].trim().substring(0, 500)
    })).slice(0, 12);
  }

  const parseList = (sectionText: string): string[] => {
    if (!sectionText) return [];
    if (sectionText.includes('\n')) {
      return sectionText
        .split('\n')
        .map((l: string) => l.replace(/^[-•✓✗✅❌*\d.]+\s*/, '').trim())
        .filter((l: string) => l.length > 2);
    }
    return sectionText
      .split(/[,;]/)
      .map((item: string) => item.trim())
      .filter((item: string) => item.length > 2);
  };

  // Inclusions
  const inclSection = t.match(/(?:inclusions?|includes?|what's\s*included|included)[:\s]*\r?\n([\s\S]+?)(?=\r?\n(?:exclusions?|excludes?|what's\s*excluded|excluded|hotels?|stays?|accommodation|transport|visa|best\s*time|#|$))/i);
  if (inclSection) {
    result.inclusions = parseList(inclSection[1]).slice(0, 12);
  }

  // Exclusions
  const exclSection = t.match(/(?:exclusions?|excludes?|what's\s*excluded|excluded)[:\s]*\r?\n([\s\S]+?)(?=\r?\n(?:inclusions?|includes?|what's\s*included|included|hotels?|stays?|accommodation|transport|visa|best\s*time|#|$))/i);
  if (exclSection) {
    result.exclusions = parseList(exclSection[1]).slice(0, 10);
  }

  // Hotels
  const hotelLines = [...t.matchAll(/(?:hotel|stay|accommodation)[:\s]+([^\n]+?)(?:\s+[–-]\s*|\s*[\(|,]\s*)?([1-5])\s*(?:star|\*)/gi)];
  if (hotelLines.length > 0) {
    result.hotels = hotelLines.map((m: any) => ({
      name: m[1].trim(), stars: parseInt(m[2]) || 4, location: ''
    })).slice(0, 5);
  }

  // Transportation
  const transMatch = t.match(/(?:transportation|transfer|transport)[:\s]+([^\n]{5,})/i);
  if (transMatch) result.transportation = transMatch[1].trim();

  // Visa Info
  const visaMatch = t.match(/(?:visa|documentation)[:\s]+([\s\S]{10,100})/i);
  if (visaMatch) result.visaInfo = visaMatch[1].split('\n')[0].trim();

  // Best Time
  const bestTimeMatch = t.match(/(?:best\s*time|ideal\s*season)[:\s]+([^\n]{5,})/i);
  if (bestTimeMatch) result.bestTime = bestTimeMatch[1].trim();

  return result;
}

/**
 * Uses Gemini API to parse raw text from travel itineraries into a structured JSON schema.
 * Automatically falls back to regex-based local parsing on failure.
 */
export async function parseItineraryDocument(rawText: string): Promise<any> {
  // If API key is obviously invalid or not standard, skip direct call to avoid slow timeouts
  const cleanKey = (apiKey || "").trim();
  const isDummyKey = !cleanKey || cleanKey.startsWith("AIzaSy...") || cleanKey.startsWith("AQ.");

  if (isDummyKey) {
    console.warn("[gemini.ts] Missing/placeholder Gemini API key. Running fallback regex-based parser.");
    return fallbackParseItinerary(rawText);
  }

  try {
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are an expert travel consultant and data parser.
Analyze the provided unstructured text content representing a travel package or itinerary and extract all details.
Output a valid JSON object matching the following structure. Do not include markdown code block syntax (like \`\`\`json). Output only raw valid JSON.

Schema:
{
  "name": "Package or destination name",
  "country": "Country or location",
  "duration": "Duration string (e.g. 5N / 6D)",
  "price": "Price string (e.g. ₹58,900 or $1,200)",
  "blurb": "Short 1-sentence tagline describing the vibe of the trip",
  "overview": "Detailed 1-2 paragraph description of the experience",
  "highlights": ["highlight 1", "highlight 2", "highlight 3"],
  "itinerary": [
    { "day": "Day 1", "title": "Day title", "desc": "Detailed description of what happens on this day" }
  ],
  "inclusions": ["inclusion 1", "inclusion 2"],
  "exclusions": ["exclusion 1", "exclusion 2"],
  "hotels": [
    { "name": "Hotel name", "stars": 5, "location": "City/Area" }
  ],
  "transportation": "Transport summary (e.g. Private AC SUV, flights included/excluded)",
  "visaInfo": "Visa requirements or details",
  "bestTime": "Best season or time to visit"
}

Content to analyze:
${rawText}`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();

    // Robustly extract JSON object if markdown blocks are included despite instructions
    let cleaned = responseText;
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      cleaned = jsonMatch[0];
    }

    return JSON.parse(cleaned);
  } catch (err) {
    console.error("[gemini.ts] Gemini API parse error. Falling back to local parser.", err);
    return fallbackParseItinerary(rawText);
  }
}

/**
 * Beautiful fallback template generator for luxury proposal HTML.
 */
function fallbackGenerateLuxuryProposal(packageDetails: any, travellerName: string, specialRequests: string): string {
  const name = packageDetails.name || "Bespoke Journey Proposal";
  const duration = packageDetails.duration || "6N / 7D";
  const country = packageDetails.country || "";
  const price = packageDetails.price || "On Request";
  const overview = packageDetails.overview || "An extraordinary bespoke journey crafted specifically for you.";
  const highlights = Array.isArray(packageDetails.highlights) ? packageDetails.highlights : [];
  const inclusions = Array.isArray(packageDetails.inclusions) ? packageDetails.inclusions : [];
  const exclusions = Array.isArray(packageDetails.exclusions) ? packageDetails.exclusions : [];
  const itinerary = Array.isArray(packageDetails.itinerary) ? packageDetails.itinerary : [];
  const hotels = Array.isArray(packageDetails.hotels) ? packageDetails.hotels : [];
  const transportation = packageDetails.transportation || "Private luxury vehicle transfers throughout.";
  const visaInfo = packageDetails.visaInfo || "Standard tourist guidelines apply.";
  const bestTime = packageDetails.bestTime || "Spring and Autumn months are optimal.";

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Bespoke Proposal - ${name}</title>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=Outfit:wght@300;400;600;700&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Outfit', sans-serif;
      color: #334155;
      background: #f8fafc;
      margin: 0;
      padding: 0;
      line-height: 1.6;
    }
    .container {
      max-width: 900px;
      margin: 40px auto;
      background: #ffffff;
      box-shadow: 0 10px 30px rgba(0,0,0,0.05);
      border-radius: 24px;
      overflow: hidden;
      border: 1px solid #e2e8f0;
    }
    .hero {
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      color: #ffffff;
      padding: 80px 60px;
      text-align: center;
      position: relative;
    }
    .hero h1 {
      font-family: 'Playfair Display', serif;
      font-size: 42px;
      margin: 0 0 10px 0;
      color: #ffffff;
      font-weight: 700;
    }
    .hero p {
      font-size: 16px;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #94a3b8;
      margin: 0;
    }
    .hero .guest-name {
      margin-top: 30px;
      font-size: 20px;
      color: #fbbf24;
      font-weight: 600;
    }
    .content-section {
      padding: 50px 60px;
      border-bottom: 1px solid #f1f5f9;
    }
    .section-title {
      font-family: 'Playfair Display', serif;
      font-size: 26px;
      color: #0f172a;
      margin-top: 0;
      margin-bottom: 20px;
      position: relative;
    }
    .section-title::after {
      content: '';
      display: block;
      width: 40px;
      height: 2px;
      background: #d97706;
      margin-top: 8px;
    }
    .personal-letter {
      font-style: italic;
      color: #475569;
      font-size: 16px;
    }
    .highlight-card {
      background: #fffbeb;
      border-left: 4px solid #d97706;
      padding: 20px;
      border-radius: 0 16px 16px 0;
      margin-bottom: 30px;
    }
    .itinerary-day {
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 1px dashed #e2e8f0;
    }
    .day-num {
      font-weight: 700;
      color: #d97706;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .day-title {
      font-size: 18px;
      font-weight: 600;
      color: #0f172a;
      margin: 4px 0 10px 0;
    }
    .hotel-card {
      background: #f8fafc;
      padding: 20px;
      border-radius: 16px;
      margin-bottom: 15px;
      border: 1px solid #e2e8f0;
    }
    .hotel-stars {
      color: #fbbf24;
      font-size: 16px;
    }
    .footer {
      background: #0f172a;
      color: #94a3b8;
      text-align: center;
      padding: 40px;
      font-size: 14px;
    }
    .footer strong {
      color: #ffffff;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="hero">
      <p>Bespoke Luxury Travel Proposal</p>
      <h1>${name}</h1>
      <p style="margin-top: 5px;">${duration} — ${country}</p>
      <div class="guest-name">Prepared Exclusively For: ${travellerName}</div>
    </div>
    
    <div class="content-section">
      <div class="personal-letter">
        <p>Dear ${travellerName},</p>
        <p>Welcome to your customized itinerary curated by SkyNow Holidays. We believe that travel is an art form, and we have crafted this exclusive journey to give you a seamless blend of relaxation, premium accommodation, and unforgettable local highlights.</p>
        ${specialRequests ? `<p><strong>Note on Special Requests:</strong> We have noted your request for "${specialRequests}" and incorporated it throughout.</p>` : ''}
        <p>Sincerely,<br><strong>Your Private Concierge Team</strong><br>SkyNow Holidays</p>
      </div>
    </div>

    <div class="content-section">
      <h2 class="section-title">The Experience</h2>
      <p>${overview}</p>
      
      <div class="highlight-card">
        <h3 style="margin-top: 0; color: #b45309; font-size: 16px;">Signature Highlights Included:</h3>
        <ul style="margin: 0; padding-left: 20px;">
          ${highlights.map((h: string) => `<li>${h}</li>`).join('')}
        </ul>
      </div>
    </div>

    <div class="content-section">
      <h2 class="section-title">Day-by-Day Journey</h2>
      ${itinerary.map((day: any) => `
        <div class="itinerary-day">
          <div class="day-num">${day.day || "Day"}</div>
          <div class="day-title">${day.title || "Leisure Day"}</div>
          <p style="margin: 0;">${day.desc || "Spend your day at leisure exploring the destination."}</p>
        </div>
      `).join('')}
    </div>

    <div class="content-section">
      <h2 class="section-title">Luxury Accommodation</h2>
      ${hotels.map((h: any) => `
        <div class="hotel-card">
          <div style="font-weight: 600; color: #0f172a; font-size: 16px;">${h.name}</div>
          <div class="hotel-stars">${"★".repeat(h.stars || 5)}</div>
          <div style="font-size: 13px; color: #64748b; margin-top: 4px;">Location: ${h.location || "Central Area"}</div>
        </div>
      `).join('')}
    </div>

    <div class="content-section">
      <h2 class="section-title">Inclusions & Guidelines</h2>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
        <div>
          <h4 style="color: #10b981; margin-top: 0;">What's Included:</h4>
          <ul style="padding-left: 20px; font-size: 14px; margin: 0;">
            ${inclusions.map((i: string) => `<li>${i}</li>`).join('')}
          </ul>
        </div>
        <div>
          <h4 style="color: #ef4444; margin-top: 0;">What's Excluded:</h4>
          <ul style="padding-left: 20px; font-size: 14px; margin: 0;">
            ${exclusions.map((e: string) => `<li>${e}</li>`).join('')}
          </ul>
        </div>
      </div>
    </div>

    <div class="content-section">
      <h2 class="section-title">Essential Information</h2>
      <p><strong>Transit & Transport:</strong> ${transportation}</p>
      <p><strong>Visa Information:</strong> ${visaInfo}</p>
      <p><strong>Best Season to Travel:</strong> ${bestTime}</p>
      <p><strong>Package Pricing:</strong> ${price}</p>
    </div>

    <div class="footer">
      <p>Designed Exclusively by <strong>SkyNow Holidays</strong></p>
      <p style="font-size: 12px; color: #64748b; margin: 0;">All itineraries are subject to confirmation at time of booking. GST and local government taxes apply.</p>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Generates an ultra-premium luxury travel proposal in HTML format based on package information and user preferences.
 * Automatically falls back to high-end local template generation on failure.
 */
export async function generateLuxuryProposalHtml(
  packageDetails: any,
  travellerName: string,
  specialRequests: string = ""
): Promise<string> {
  const cleanKey = (apiKey || "").trim();
  const isDummyKey = !cleanKey || cleanKey.startsWith("AIzaSy...") || cleanKey.startsWith("AQ.");

  if (isDummyKey) {
    console.warn("[gemini.ts] Missing/placeholder Gemini API key. Generating high-end fallback luxury proposal.");
    return fallbackGenerateLuxuryProposal(packageDetails, travellerName, specialRequests);
  }

  try {
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are a private concierge for SkyNow Premier Travel, a boutique ultra-luxury travel agency.
Generate an exquisite, highly styled HTML travel proposal for our guest: "${travellerName}".
The proposal is based on the travel package: "${packageDetails.name}" for "${packageDetails.duration}".
Special Requests / Customizations: "${specialRequests || "None specified"}"

The response MUST be a complete HTML document with embedded CSS. Do not include markdown code block syntax (\`\`\`html). Return only the raw HTML code.
Use the following styling guidelines:
- Modern premium typography: Include Google Fonts (e.g. 'Outfit' and 'Playfair Display' or 'Montserrat').
- Warm and elegant color palette: Deep navy blue (#0f172a), rich gold (#d97706 or #b45309), clean white (#ffffff), charcoal text (#334155), gold-leaf accents, soft shadow borders.
- Structure:
  1. A stunning hero cover page with the Traveller's name, Title ("Bespoke Travel Proposal"), and Destination name.
  2. A warm personalized letter from the founders/concierge welcoming the traveller.
  3. "The Experience Overview" - describing the magic of the vacation.
  4. A beautifully presented timeline of the day-by-day itinerary. Use table or list layout with elegant spacing and iconography.
  5. "Accommodation & Stays" - detailing the luxury properties they will call home.
  6. "Exclusive Inclusions" and "Exclusions".
  7. "Signature Concierge Information" - best time to visit, visa details, and local notes.
- Ensure the layout is designed for printing (use CSS page-break-after/before where appropriate to keep pages tidy when saved as PDF).

Package details to include in the proposal:
- Name: ${packageDetails.name}
- Country: ${packageDetails.country}
- Duration: ${packageDetails.duration}
- Price: ${packageDetails.price}
- Overview: ${packageDetails.overview}
- Highlights: ${JSON.stringify(packageDetails.highlights)}
- Itinerary: ${JSON.stringify(packageDetails.itinerary)}
- Inclusions: ${JSON.stringify(packageDetails.inclusions)}
- Exclusions: ${JSON.stringify(packageDetails.exclusions)}
- Hotels: ${JSON.stringify(packageDetails.hotels)}
- Transportation: ${packageDetails.transportation || "Private Luxury SUV transfers"}
- Visa Info: ${packageDetails.visaInfo || ""}
- Best Time: ${packageDetails.bestTime || ""}`;

    const result = await model.generateContent(prompt);
    const responseHtml = result.response.text().trim();

    let cleaned = responseHtml;
    // Strip any markdown code blocks
    if (cleaned.startsWith("```html")) {
      cleaned = cleaned.replace(/^```html/, "").replace(/```$/, "");
    } else if (cleaned.startsWith("```")) {
      cleaned = cleaned.replace(/^```/, "").replace(/```$/, "");
    }

    return cleaned.trim();
  } catch (err) {
    console.error("[gemini.ts] Gemini API proposal error. Generating fallback template.", err);
    return fallbackGenerateLuxuryProposal(packageDetails, travellerName, specialRequests);
  }
}
