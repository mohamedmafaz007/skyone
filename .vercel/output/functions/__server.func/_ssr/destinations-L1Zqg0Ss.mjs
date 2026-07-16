import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link, y as useSearch } from "../_libs/@tanstack/react-router+[...].mjs";
import { O as MessageCircle, _ as Search, d as Star, p as SlidersHorizontal, q as Funnel, st as ChevronDown, vt as ArrowRight, w as Phone } from "../_libs/lucide-react.mjs";
import { i as useAppData } from "./dataStore-DogEXO2o.mjs";
import { r as getSlug } from "./packageDetailsData-AeMTizGf.mjs";
import { o as motion, s as AnimatePresence } from "../_libs/framer-motion.mjs";
import { t as CommonHero } from "./CommonHero-C4NUnhFB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/destinations-L1Zqg0Ss.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function getContinent(name) {
	const asian = [
		"Bali",
		"Singapore & Malaysia",
		"Dubai",
		"Thailand",
		"Vietnam",
		"Cambodia & Vietnam",
		"China",
		"Hong Kong & Macau",
		"Nepal",
		"Bhutan",
		"Sri Lanka",
		"Bahrain",
		"Baku Azerbaijan",
		"Turkey",
		"Almaty Kazakhstan",
		"Japan"
	];
	const african = [
		"Egypt",
		"South Africa",
		"Kenya",
		"Mauritius"
	];
	const european = ["Europe"];
	const american = ["USA"];
	if (asian.includes(name)) return "Asia";
	if (african.includes(name)) return "Africa";
	if (european.includes(name)) return "Europe";
	if (american.includes(name)) return "Americas";
	return "Oceania";
}
function getNumericPrice(priceStr) {
	return parseInt(priceStr.replace(/[₹,]/g, ""), 10) || 0;
}
function getDurationDays(durStr) {
	const matches = durStr.match(/(\d+)D/);
	if (matches && matches[1]) return parseInt(matches[1], 10);
	const firstMatch = durStr.match(/(\d+)/);
	return firstMatch ? parseInt(firstMatch[0], 10) : 6;
}
function DestinationsPage() {
	const { destinations, addMessage } = useAppData();
	const searchParams = useSearch({ from: "/destinations" });
	const [search, setSearch] = (0, import_react.useState)("");
	const [selectedContinent, setSelectedContinent] = (0, import_react.useState)("All");
	const [selectedBudget, setSelectedBudget] = (0, import_react.useState)("All");
	const [selectedTag, setSelectedTag] = (0, import_react.useState)("All");
	const [selectedDuration, setSelectedDuration] = (0, import_react.useState)("All");
	const [showFiltersMobile, setShowFiltersMobile] = (0, import_react.useState)(false);
	const [sent, setSent] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		phone: "",
		email: "",
		destination: "",
		guests: "2 Guests",
		message: ""
	});
	(0, import_react.useEffect)(() => {
		if (searchParams.q) setSearch(searchParams.q);
	}, [searchParams]);
	const tags = [
		"All",
		"International",
		"Beach",
		"Adventure",
		"Luxury",
		"Family",
		"Honeymoon",
		"Group Tours"
	];
	const filteredDestinations = (0, import_react.useMemo)(() => {
		return destinations.filter((d) => {
			const query = search.toLowerCase().trim();
			if (!(d.name.toLowerCase().includes(query) || d.country.toLowerCase().includes(query) || d.blurb.toLowerCase().includes(query))) return false;
			if (selectedContinent !== "All") {
				if (getContinent(d.name) !== selectedContinent) return false;
			}
			if (selectedBudget !== "All") {
				const price = getNumericPrice(d.price);
				if (selectedBudget === "Budget" && price >= 6e4) return false;
				if (selectedBudget === "Mid-range" && (price < 6e4 || price > 1e5)) return false;
				if (selectedBudget === "Luxury" && price <= 1e5) return false;
			}
			if (selectedTag !== "All" && d.tag !== selectedTag) return false;
			if (selectedDuration !== "All") {
				const days = getDurationDays(d.duration);
				if (selectedDuration === "Short" && days > 5) return false;
				if (selectedDuration === "Medium" && (days < 6 || days > 9)) return false;
				if (selectedDuration === "Long" && days < 10) return false;
			}
			return true;
		});
	}, [
		search,
		selectedContinent,
		selectedBudget,
		selectedTag,
		selectedDuration,
		destinations
	]);
	const clearAllFilters = () => {
		setSearch("");
		setSelectedContinent("All");
		setSelectedBudget("All");
		setSelectedTag("All");
		setSelectedDuration("All");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background pb-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommonHero, {
				title: "All Destinations",
				subtitle: "Explore our vetted collection of 22+ premium international holidays.",
				bgImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto max-w-7xl px-4 py-12 sm:px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-8 lg:grid-cols-[280px_1fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden lg:flex flex-col gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
							className: "space-y-6 rounded-[32px] border border-border bg-white p-6 shadow-sm h-fit w-full",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between border-b border-border pb-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-2 font-display text-lg font-bold text-ink",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "h-4 w-4 text-brand" }), " Filters"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: clearAllFilters,
										className: "text-xs font-semibold text-brand hover:text-gold transition cursor-pointer",
										children: "Clear All"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3",
									children: "Continent"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-col gap-2",
									children: [
										"All",
										"Asia",
										"Europe",
										"Africa",
										"Americas",
										"Oceania"
									].map((cont) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setSelectedContinent(cont),
										className: `text-left text-sm font-semibold rounded-xl px-3 py-2 transition-all cursor-pointer ${selectedContinent === cont ? "bg-brand/10 text-brand" : "text-ink hover:bg-secondary"}`,
										children: cont
									}, cont))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-t border-border pt-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3",
										children: "Budget Bracket"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-col gap-2",
										children: [
											{
												label: "All Budgets",
												val: "All"
											},
											{
												label: "Budget (Under ₹60k)",
												val: "Budget"
											},
											{
												label: "Mid-Range (₹60k - ₹1L)",
												val: "Mid-range"
											},
											{
												label: "Luxury (Over ₹1L)",
												val: "Luxury"
											}
										].map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setSelectedBudget(b.val),
											className: `text-left text-sm font-semibold rounded-xl px-3 py-2 transition-all cursor-pointer ${selectedBudget === b.val ? "bg-brand/10 text-brand" : "text-ink hover:bg-secondary"}`,
											children: b.label
										}, b.val))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-t border-border pt-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3",
										children: "Package Category"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-col gap-2",
										children: tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setSelectedTag(tag),
											className: `text-left text-sm font-semibold rounded-xl px-3 py-2 transition-all cursor-pointer ${selectedTag === tag ? "bg-brand/10 text-brand" : "text-ink hover:bg-secondary"}`,
											children: tag === "All" ? "All Categories" : tag
										}, tag))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-t border-border pt-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3",
										children: "Duration"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-col gap-2",
										children: [
											{
												label: "All Durations",
												val: "All"
											},
											{
												label: "Short (1 - 5 Days)",
												val: "Short"
											},
											{
												label: "Medium (6 - 9 Days)",
												val: "Medium"
											},
											{
												label: "Long (10+ Days)",
												val: "Long"
											}
										].map((dur) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setSelectedDuration(dur.val),
											className: `text-left text-sm font-semibold rounded-xl px-3 py-2 transition-all cursor-pointer ${selectedDuration === dur.val ? "bg-brand/10 text-brand" : "text-ink hover:bg-secondary"}`,
											children: dur.label
										}, dur.val))
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
							className: "rounded-[32px] border border-border bg-white p-6 shadow-sm space-y-6 w-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "font-display text-lg font-bold text-ink",
								children: "Plan Your Journey"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground mt-1",
								children: "Customise your itinerary with our specialists."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: (e) => {
									e.preventDefault();
									addMessage({
										name: form.name,
										phone: form.phone,
										email: form.email,
										destination: form.destination,
										service: "Standard Holiday Tour",
										travelDate: "Not Specified",
										guests: form.guests,
										message: form.message || "Plan Your Journey enquiry submitted from destinations page."
									});
									setSent(true);
									setTimeout(() => setSent(false), 4e3);
									setForm({
										name: "",
										phone: "",
										email: "",
										destination: "",
										guests: "2 Guests",
										message: ""
									});
								},
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										required: true,
										placeholder: "Your Name",
										value: form.name,
										onChange: (e) => setForm({
											...form,
											name: e.target.value
										}),
										className: "w-full rounded-2xl border border-transparent bg-secondary px-4 py-3 text-xs text-ink placeholder-muted-foreground outline-none focus:border-brand focus:bg-white transition"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "tel",
										required: true,
										placeholder: "Phone Number",
										value: form.phone,
										onChange: (e) => setForm({
											...form,
											phone: e.target.value
										}),
										className: "w-full rounded-2xl border border-transparent bg-secondary px-4 py-3 text-xs text-ink placeholder-muted-foreground outline-none focus:border-brand focus:bg-white transition"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "email",
										required: true,
										placeholder: "Email Address",
										value: form.email,
										onChange: (e) => setForm({
											...form,
											email: e.target.value
										}),
										className: "w-full rounded-2xl border border-transparent bg-secondary px-4 py-3 text-xs text-ink placeholder-muted-foreground outline-none focus:border-brand focus:bg-white transition"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											value: form.destination,
											onChange: (e) => setForm({
												...form,
												destination: e.target.value
											}),
											className: "w-full rounded-2xl border border-transparent bg-secondary px-4 py-3 text-xs text-ink outline-none focus:border-brand focus:bg-white transition cursor-pointer appearance-none",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "",
												children: "Select Destination"
											}), destinations.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: d.name,
												children: d.name
											}, d.name))]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "pointer-events-none absolute inset-y-0 right-4 flex items-center text-muted-foreground",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											value: form.guests,
											onChange: (e) => setForm({
												...form,
												guests: e.target.value
											}),
											className: "w-full rounded-2xl border border-transparent bg-secondary px-4 py-3 text-xs text-ink outline-none focus:border-brand focus:bg-white transition cursor-pointer appearance-none",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "1 Guest",
													children: "1 Guest"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "2 Guests",
													children: "2 Guests"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "3 Guests",
													children: "3 Guests"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "4 Guests",
													children: "4 Guests"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "5+ Guests",
													children: "5+ Guests"
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "pointer-events-none absolute inset-y-0 right-4 flex items-center text-muted-foreground",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										rows: 3,
										placeholder: "Special requests or questions...",
										value: form.message,
										onChange: (e) => setForm({
											...form,
											message: e.target.value
										}),
										className: "w-full rounded-2xl border border-transparent bg-secondary px-4 py-3 text-xs text-ink placeholder-muted-foreground outline-none focus:border-brand focus:bg-white transition resize-none"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-3 pt-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "submit",
												className: "w-full rounded-full bg-[#0066fe] py-3.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#0055dd] cursor-pointer text-center",
												children: sent ? "Enquiry Sent!" : "Send Enquiry"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												href: `https://wa.me/917639277770?text=Hi%20SkyNow%20Holidays%2C%20I'd%20like%20to%20enquire%20about%20booking%20a%20trip%20to%20${encodeURIComponent(form.destination || "our destinations")}.`,
												target: "_blank",
												rel: "noreferrer",
												className: "flex items-center justify-center gap-2 rounded-full bg-[#00c73c] py-3 text-xs font-bold text-white shadow-sm transition hover:bg-[#00b034] cursor-pointer",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4 fill-white text-transparent" }), " Chat on WhatsApp"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												href: "tel:+917639277770",
												className: "flex items-center justify-center gap-2 rounded-full bg-secondary py-3 text-xs font-bold text-ink transition hover:bg-secondary/80 cursor-pointer",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-3.5 w-3.5" }), " Call Now"]
											})
										]
									})
								]
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
						className: "min-w-0 space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: search,
										onChange: (e) => setSearch(e.target.value),
										placeholder: "Search countries, regions or packages...",
										className: "w-full rounded-full border border-border bg-white py-3.5 pl-11 pr-4 text-sm text-ink outline-none focus:border-brand shadow-sm"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setShowFiltersMobile(!showFiltersMobile),
									className: "lg:hidden flex items-center justify-center gap-2 rounded-full border border-border bg-white px-5 py-3 text-sm font-bold text-ink shadow-sm cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "h-4 w-4" }), " Filters"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2 text-xs",
								children: [
									selectedContinent !== "All" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "rounded-full bg-secondary border border-border px-3 py-1 font-semibold text-ink",
										children: ["Continent: ", selectedContinent]
									}),
									selectedBudget !== "All" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "rounded-full bg-secondary border border-border px-3 py-1 font-semibold text-ink",
										children: ["Budget: ", selectedBudget]
									}),
									selectedTag !== "All" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "rounded-full bg-secondary border border-border px-3 py-1 font-semibold text-ink",
										children: ["Category: ", selectedTag]
									}),
									selectedDuration !== "All" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "rounded-full bg-secondary border border-border px-3 py-1 font-semibold text-ink",
										children: ["Duration: ", selectedDuration]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
									mode: "popLayout",
									children: filteredDestinations.length > 0 ? filteredDestinations.map((d, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
										layout: "position",
										initial: {
											opacity: 0,
											scale: .9
										},
										animate: {
											opacity: 1,
											scale: 1
										},
										exit: {
											opacity: 0,
											scale: .95
										},
										transition: {
											duration: .4,
											delay: idx % 6 * .03
										},
										className: "group relative isolate flex h-[380px] flex-col justify-end overflow-hidden rounded-[30px] shadow-sm border border-border",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: d.image,
												alt: d.name,
												className: "absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/20 to-transparent" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "absolute left-5 top-5 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold text-brand shadow",
												children: d.tag
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "absolute right-5 top-5 flex items-center gap-1 rounded-full bg-black/40 px-3 py-1 text-[10px] font-bold text-white backdrop-blur",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3 fill-gold text-gold" }),
													" ",
													d.rating
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "glass-dark m-4 rounded-2xl p-4 text-white",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-start justify-between gap-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "min-w-0",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
															className: "font-display text-xl font-bold leading-tight truncate",
															children: d.name
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "text-[10px] uppercase tracking-widest text-white/60 mt-0.5",
															children: d.country
														})]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "text-right shrink-0",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "text-[9px] uppercase tracking-widest text-white/60",
															children: "From"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "font-display text-lg font-bold text-gold",
															children: d.price
														})]
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mt-3 flex items-center justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-xs text-white/70",
														children: d.duration
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
														to: `/packages/${getSlug(d.name)}`,
														className: "inline-flex items-center gap-1 rounded-full bg-gold px-3.5 py-1.5 text-xs font-bold text-ink transition hover:brightness-110 cursor-pointer",
														children: ["Explore ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3 w-3" })]
													})]
												})]
											})
										]
									}, d.name)) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "col-span-full text-center py-20 rounded-[36px] border border-dashed border-border bg-white p-8",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-display text-xl font-bold text-ink",
												children: "No destinations match filters"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm text-muted-foreground mt-1",
												children: "Try clearing filters or running a broader search."
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: clearAllFilters,
												className: "mt-6 rounded-full bg-brand px-6 py-2.5 text-xs font-bold text-white shadow transition hover:brightness-110 cursor-pointer",
												children: "Clear All Filters"
											})
										]
									})
								})
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: showFiltersMobile && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				onClick: () => setShowFiltersMobile(false),
				className: "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: { y: "100%" },
				animate: { y: 0 },
				exit: { y: "100%" },
				transition: {
					type: "spring",
					damping: 25,
					stiffness: 220
				},
				className: "fixed bottom-0 left-0 right-0 z-55 max-h-[85vh] overflow-y-auto rounded-t-[36px] bg-white p-6 shadow-2xl space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-border pb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-lg font-bold text-ink",
							children: "Filters"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								clearAllFilters();
								setShowFiltersMobile(false);
							},
							className: "text-xs font-semibold text-brand transition cursor-pointer",
							children: "Clear All"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3",
						children: "Continent"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							"All",
							"Asia",
							"Europe",
							"Africa",
							"Americas",
							"Oceania"
						].map((cont) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setSelectedContinent(cont),
							className: `text-xs font-semibold rounded-full px-4 py-2 border transition-all cursor-pointer ${selectedContinent === cont ? "bg-brand text-white border-brand" : "text-ink bg-white border-border"}`,
							children: cont
						}, cont))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3",
						children: "Budget Bracket"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							{
								label: "All Budgets",
								val: "All"
							},
							{
								label: "Budget (< ₹60k)",
								val: "Budget"
							},
							{
								label: "Mid (₹60k - ₹1L)",
								val: "Mid-range"
							},
							{
								label: "Luxury (&gt; ₹1L)",
								val: "Luxury"
							}
						].map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setSelectedBudget(b.val),
							className: `text-xs font-semibold rounded-full px-4 py-2 border transition-all cursor-pointer ${selectedBudget === b.val ? "bg-brand text-white border-brand" : "text-ink bg-white border-border"}`,
							dangerouslySetInnerHTML: { __html: b.label }
						}, b.val))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3",
						children: "Category"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setSelectedTag(tag),
							className: `text-xs font-semibold rounded-full px-4 py-2 border transition-all cursor-pointer ${selectedTag === tag ? "bg-brand text-white border-brand" : "text-ink bg-white border-border"}`,
							children: tag
						}, tag))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3",
						children: "Duration"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							{
								label: "All",
								val: "All"
							},
							{
								label: "Short (1-5 Days)",
								val: "Short"
							},
							{
								label: "Medium (6-9 Days)",
								val: "Medium"
							},
							{
								label: "Long (10+ Days)",
								val: "Long"
							}
						].map((dur) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setSelectedDuration(dur.val),
							className: `text-xs font-semibold rounded-full px-4 py-2 border transition-all cursor-pointer ${selectedDuration === dur.val ? "bg-brand text-white border-brand" : "text-ink bg-white border-border"}`,
							children: dur.label
						}, dur.val))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setShowFiltersMobile(false),
						className: "w-full rounded-full bg-brand py-3.5 text-center text-sm font-bold text-white shadow",
						children: "Apply Filters"
					})
				]
			})] }) })
		]
	});
}
//#endregion
export { DestinationsPage as component };
