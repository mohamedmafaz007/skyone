import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-CIHAFgYl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-CJ0pHeUl.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var callGeminiServer_createServerFn_handler = createServerRpc({
	id: "73c009d7d041c3de07336cdf45a35f93846d9780c429908a8bda0f134fca98f2",
	name: "callGeminiServer",
	filename: "src/routes/admin.tsx"
}, (opts) => callGeminiServer.__executeServer(opts));
var callGeminiServer = createServerFn({ method: "POST" }).validator((d) => d).handler(callGeminiServer_createServerFn_handler, async ({ data }) => {
	let apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || "";
	if (!apiKey) try {
		const fs = await import("fs");
		const envPath = (await import("path")).resolve(process.cwd(), ".env");
		if (fs.existsSync(envPath)) {
			const envContent = fs.readFileSync(envPath, "utf-8");
			const matches = envContent.match(/^\s*GEMINI_API_KEY\s*=\s*(.*)$/m);
			if (matches && matches[1]) apiKey = matches[1].split("#")[0].trim().replace(/^['"]|['"]$/g, "");
			if (!apiKey) {
				const viteMatches = envContent.match(/^\s*VITE_GEMINI_API_KEY\s*=\s*(.*)$/m);
				if (viteMatches && viteMatches[1]) apiKey = viteMatches[1].split("#")[0].trim().replace(/^['"]|['"]$/g, "");
			}
		}
	} catch (e) {
		console.error("Failed to read .env file manually on server:", e);
	}
	const maskedKey = apiKey ? apiKey.startsWith("AIzaSy") && !apiKey.includes("...") ? `${apiKey.slice(0, 6)}...${apiKey.slice(-4)}` : apiKey : "not configured";
	console.log(`[callGeminiServer] Key lookup: ${maskedKey}`);
	if (!apiKey || apiKey === "AIzaSy..." || apiKey.includes("your_")) throw new Error("GEMINI_API_KEY is not configured. Please open the '.env' file in your project root, paste your actual Gemini API key, and restart the dev server.");
	const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
	const parts = [];
	const promptText = `You are a professional travel agency data extraction tool. Analyze the provided content and extract all travel package details. Format the output STRICTLY as a valid JSON object matching this schema. Do not include markdown code block syntax (such as \`\`\`json). Return only raw valid JSON.

Schema:
{
  "name": "Package or destination name",
  "country": "Country or location",
  "duration": "Duration string like: 5N / 6D",
  "price": "Price string like: ₹58,900 or $1,200",
  "blurb": "Short 1-sentence tagline",
  "overview": "Detailed 1-2 paragraph description",
  "highlights": ["highlight 1", "highlight 2", "highlight 3"],
  "itinerary": [
    { "day": "Day 1", "title": "Day title", "desc": "Day description" }
  ],
  "inclusions": ["inclusion 1", "inclusion 2"],
  "exclusions": ["exclusion 1", "exclusion 2"],
  "hotels": [
    { "name": "Hotel name", "stars": 5, "location": "City" }
  ],
  "transportation": "Transport summary",
  "visaInfo": "Visa requirements",
  "bestTime": "Best season to visit"
}`;
	if (data.base64Pdf) {
		parts.push({ inlineData: {
			mimeType: "application/pdf",
			data: data.base64Pdf
		} });
		parts.push({ text: promptText });
	} else parts.push({ text: `${promptText}\n\nContent to analyze:\n${data.text}` });
	const res = await fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			contents: [{ parts }],
			generationConfig: {
				temperature: .1,
				maxOutputTokens: 8192
			}
		})
	});
	if (!res.ok) {
		const errText = await res.text().catch(() => res.statusText);
		let friendly = `Gemini API Error ${res.status}`;
		try {
			friendly = JSON.parse(errText)?.error?.message || friendly;
		} catch {}
		throw new Error(friendly);
	}
	const rawText = (await res.json())?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
	if (!rawText.trim()) throw new Error("Gemini returned an empty response.");
	let cleaned = rawText.trim();
	const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
	if (jsonMatch) cleaned = jsonMatch[0];
	return JSON.parse(cleaned);
});
//#endregion
export { callGeminiServer_createServerFn_handler };
