import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { O as MessageCircle, _ as Search, d as Star, dt as Calendar, j as MapPin, st as ChevronDown, w as Phone } from "../_libs/lucide-react.mjs";
import { i as useAppData } from "./dataStore-DogEXO2o.mjs";
import { r as getSlug } from "./packageDetailsData-AeMTizGf.mjs";
import { o as motion, s as AnimatePresence } from "../_libs/framer-motion.mjs";
import { t as CommonHero } from "./CommonHero-C4NUnhFB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/packages-CS2Puh00.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var REGIONS = [
	"All",
	"Southeast Asia",
	"Middle East",
	"Europe & Caucasus",
	"Himalayas & South Asia",
	"Africa & Others"
];
function getRegion(name) {
	const seAsia = [
		"Bali",
		"Singapore & Malaysia",
		"Thailand",
		"Vietnam",
		"Cambodia & Vietnam",
		"Hong Kong & Macau"
	];
	const midEast = [
		"Dubai",
		"Bahrain",
		"Baku Azerbaijan",
		"Turkey"
	];
	const europe = ["Europe"];
	const himalayas = [
		"Nepal",
		"Bhutan",
		"Sri Lanka",
		"China",
		"Japan"
	];
	if (seAsia.includes(name)) return "Southeast Asia";
	if (midEast.includes(name)) return "Middle East";
	if (europe.includes(name)) return "Europe & Caucasus";
	if (himalayas.includes(name)) return "Himalayas & South Asia";
	return "Africa & Others";
}
function AllPackagesPage() {
	const { destinations, addMessage } = useAppData();
	const [selectedRegion, setSelectedRegion] = (0, import_react.useState)("All");
	const [search, setSearch] = (0, import_react.useState)("");
	const [sent, setSent] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		phone: "",
		email: "",
		destination: "",
		guests: "2 Guests",
		message: ""
	});
	const filteredPackages = (0, import_react.useMemo)(() => {
		return destinations.filter((p) => {
			const query = search.toLowerCase().trim();
			if (!(p.name.toLowerCase().includes(query) || p.country.toLowerCase().includes(query) || p.blurb.toLowerCase().includes(query))) return false;
			if (selectedRegion !== "All") {
				if (getRegion(p.name) !== selectedRegion) return false;
			}
			return true;
		});
	}, [
		search,
		selectedRegion,
		destinations
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background pb-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommonHero, {
			title: "International Packages",
			subtitle: "Vetted itineraries across 22+ destinations. Handcrafted and 100% customisable.",
			bgImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-4 py-12 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-6 md:flex-row md:items-center justify-between border-b border-border pb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2 order-2 md:order-1",
					children: REGIONS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setSelectedRegion(r),
						className: `relative rounded-full px-4 py-2.5 text-xs font-semibold border transition cursor-pointer ${selectedRegion === r ? "bg-brand text-white border-brand shadow-luxury" : "bg-white text-ink border-border hover:bg-secondary"}`,
						children: r
					}, r))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative w-full md:w-80 order-1 md:order-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						value: search,
						onChange: (e) => setSearch(e.target.value),
						placeholder: "Search packages...",
						className: "w-full rounded-full border border-border bg-white py-3 pl-11 pr-4 text-xs text-ink outline-none focus:border-brand shadow-sm font-medium"
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-8 lg:grid-cols-[1fr_320px] mt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "min-w-0 space-y-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						className: "grid grid-cols-1 gap-6 sm:grid-cols-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
							mode: "popLayout",
							children: filteredPackages.length > 0 ? filteredPackages.map((p, idx) => {
								const slug = getSlug(p.name);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
									layout: "position",
									initial: {
										opacity: 0,
										y: 30
									},
									animate: {
										opacity: 1,
										y: 0
									},
									exit: {
										opacity: 0,
										scale: .95
									},
									transition: {
										duration: .5,
										delay: idx % 6 * .04
									},
									className: "group flex h-full flex-col overflow-hidden rounded-[30px] border border-border bg-white transition duration-500 hover:-translate-y-1.5 hover:shadow-luxury",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative aspect-[4/3] overflow-hidden bg-secondary",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: p.image,
												alt: p.name,
												loading: "lazy",
												className: "h-full w-full object-cover transition duration-[850ms] group-hover:scale-105"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold text-brand shadow",
												children: p.tag
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "absolute right-4 top-4 flex items-center gap-1 rounded-full bg-black/50 px-3 py-1 text-[10px] font-bold text-white backdrop-blur",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 fill-gold text-gold" }),
													" ",
													p.rating
												]
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-1 flex-col gap-3.5 p-6",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between text-xs text-muted-foreground font-semibold",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "inline-flex items-center gap-1",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3.5 w-3.5 text-brand" }),
														" ",
														p.country
													]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "inline-flex items-center gap-1",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3.5 w-3.5" }),
														" ",
														p.duration
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "font-display text-2xl font-bold text-ink group-hover:text-brand transition-colors",
												children: p.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm leading-relaxed text-muted-foreground flex-1 line-clamp-3",
												children: p.blurb
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-auto flex items-end justify-between pt-5 border-t border-secondary",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[9px] uppercase tracking-widest text-muted-foreground font-bold",
													children: "Starting from"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "font-display text-2xl font-bold text-brand",
													children: [p.price, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-xs font-semibold text-muted-foreground",
														children: "/pp"
													})]
												})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
														to: `/packages/${slug}`,
														className: "rounded-full border border-border px-3.5 py-2 text-xs font-bold text-ink transition hover:bg-secondary text-center cursor-pointer",
														children: "Details"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
														to: `/packages/${slug}`,
														className: "rounded-full bg-brand px-4.5 py-2 text-xs font-bold text-white shadow transition hover:brightness-110 text-center cursor-pointer",
														children: "Book Now"
													})]
												})]
											})
										]
									})]
								}, p.name);
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "col-span-full text-center py-20 rounded-[36px] border border-dashed border-border bg-white p-8",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-xl font-bold text-ink",
									children: "No packages found"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground mt-1",
									children: "Try adjusting filters or typing another keyword."
								})]
							})
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					className: "space-y-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-[32px] border border-border bg-white p-6 shadow-sm space-y-6",
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
									message: form.message || "Plan Your Journey enquiry submitted from packages index page."
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
					})
				})]
			})]
		})]
	});
}
//#endregion
export { AllPackagesPage as component };
