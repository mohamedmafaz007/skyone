import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.warn("WARNING: GEMINI_API_KEY is not defined in the environment variables.");
}

const ai = new GoogleGenerativeAI(apiKey || "");

/**
 * Uses Gemini API to parse raw text from travel itineraries into a structured JSON schema.
 */
export async function parseItineraryDocument(rawText: string): Promise<any> {
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

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("Failed to parse Gemini output as JSON. Output was:", responseText);
    throw new Error("Gemini returned invalid JSON structure: " + err);
  }
}

/**
 * Generates an ultra-premium luxury travel proposal in HTML format based on package information and user preferences.
 */
export async function generateLuxuryProposalHtml(
  packageDetails: any,
  travellerName: string,
  specialRequests: string = ""
): Promise<string> {
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
}
