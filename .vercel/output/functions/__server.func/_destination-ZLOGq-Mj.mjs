import { o as __toESM } from "./_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "./_libs/react+tanstack__react-query.mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { H as Hotel, O as MessageCircle, S as Plane, ct as Check, d as Star, dt as Calendar, et as Compass, n as X, st as ChevronDown, tt as Clock, vt as ArrowRight, w as Phone } from "./_libs/lucide-react.mjs";
import { i as useAppData } from "./_ssr/dataStore-DogEXO2o.mjs";
import { n as getPackageDetails, r as getSlug } from "./_ssr/packageDetailsData-AeMTizGf.mjs";
import { t as Route } from "./_destination-BgjAFcSR.mjs";
import { o as motion, s as AnimatePresence } from "./_libs/framer-motion.mjs";
import { t as CommonHero } from "./_ssr/CommonHero-C4NUnhFB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_destination-ZLOGq-Mj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TABS = [
	{
		id: "overview",
		label: "Overview"
	},
	{
		id: "itinerary",
		label: "Itinerary"
	},
	{
		id: "hotels",
		label: "Stays & Transit"
	},
	{
		id: "inclusions",
		label: "Inclusions"
	},
	{
		id: "visa",
		label: "Visa & Best Time"
	}
];
function PackageDetailsPage() {
	const { destination } = Route.useParams();
	const { destinations, addMessage } = useAppData();
	const details = getPackageDetails(destination);
	const [activeTab, setActiveTab] = (0, import_react.useState)("overview");
	const [openDay, setOpenDay] = (0, import_react.useState)("Day 1");
	const [activePhoto, setActivePhoto] = (0, import_react.useState)(null);
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
		if (details) setForm((prev) => ({
			...prev,
			destination: details.name
		}));
	}, [details]);
	(0, import_react.useEffect)(() => {
		window.scrollTo({
			top: 0,
			behavior: "instant"
		});
	}, [destination]);
	const handleFormSubmit = (e) => {
		e.preventDefault();
		addMessage({
			name: form.name,
			phone: form.phone,
			email: form.email,
			destination: form.destination,
			service: "Standard Holiday Tour",
			travelDate: "Not Specified",
			guests: form.guests,
			message: form.message || `Plan Your Journey inquiry submitted from package details page for ${form.destination}.`
		});
		setSent(true);
		setTimeout(() => setSent(false), 4e3);
		setForm({
			name: "",
			phone: "",
			email: "",
			destination: details?.name || "",
			guests: "2 Guests",
			message: ""
		});
	};
	if (!details) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-[60vh] flex-col items-center justify-center bg-background px-4 text-center py-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "h-16 w-16 text-brand animate-spin" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-6 text-2xl font-bold text-ink",
				children: "Package Not Found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "The requested tour package could not be retrieved."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/packages",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "mt-6 rounded-full bg-brand px-6 py-3 text-sm font-bold text-white shadow",
					children: "Back to All Packages"
				})
			})
		]
	});
	const relatedPackages = details.relatedSlugs.map((slug) => {
		const match = destinations.find((d) => getSlug(d.name) === slug);
		return match ? {
			...match,
			slug
		} : null;
	}).filter(Boolean);
	const handleTabClick = (id) => {
		setActiveTab(id);
		const element = document.getElementById(id);
		if (element) {
			const yOffset = window.innerWidth >= 1280 ? -135 : -120;
			const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
			window.scrollTo({
				top: y,
				behavior: "smooth"
			});
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background pb-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommonHero, {
				title: details.name,
				subtitle: details.blurb,
				bgImage: details.image,
				breadcrumb: "Packages"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto max-w-7xl px-4 sm:px-6 -mt-8 relative z-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 bg-white rounded-[24px] sm:rounded-[32px] p-4 sm:p-6 shadow-luxury border border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 sm:gap-3 border-r border-secondary last:border-r-0 pr-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid h-8 w-8 sm:h-10 sm:w-10 shrink-0 place-items-center rounded-lg sm:rounded-xl bg-brand/10 text-brand",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-4.5 w-4.5 sm:h-5 sm:w-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[9px] sm:text-[10px] uppercase tracking-wider text-muted-foreground font-bold truncate",
									children: "Duration"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs sm:text-sm font-bold text-ink mt-0.5 truncate",
									children: details.duration
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 sm:gap-3 border-r border-secondary last:border-r-0 pr-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid h-8 w-8 sm:h-10 sm:w-10 shrink-0 place-items-center rounded-lg sm:rounded-xl bg-brand/10 text-brand",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4.5 w-4.5 sm:h-5 sm:w-5 fill-gold text-gold" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[9px] sm:text-[10px] uppercase tracking-wider text-muted-foreground font-bold truncate",
									children: "Rating"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs sm:text-sm font-bold text-ink mt-0.5 truncate",
									children: [details.rating, " / 5.0"]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 sm:gap-3 border-r border-secondary last:border-r-0 pr-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid h-8 w-8 sm:h-10 sm:w-10 shrink-0 place-items-center rounded-lg sm:rounded-xl bg-brand/10 text-brand",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4.5 w-4.5 sm:h-5 sm:w-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[9px] sm:text-[10px] uppercase tracking-wider text-muted-foreground font-bold truncate",
									children: "Best Time"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-bold text-ink mt-0.5 truncate max-w-[130px]",
									children: details.bestTimeToVisit.split("(")[0]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 sm:gap-3 pr-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid h-8 w-8 sm:h-10 sm:w-10 shrink-0 place-items-center rounded-lg sm:rounded-xl bg-brand/10 text-brand",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plane, { className: "h-4.5 w-4.5 sm:h-5 sm:w-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[9px] sm:text-[10px] uppercase tracking-wider text-muted-foreground font-bold truncate",
									children: "Price starts"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs sm:text-sm font-bold text-brand mt-0.5 truncate",
									children: [details.price, " /pp"]
								})]
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "block lg:hidden mx-auto max-w-7xl px-4 sm:px-6 mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[32px] border border-border bg-white p-6 shadow-sm space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "font-display text-xl font-bold text-ink",
						children: "Plan Your Journey"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground mt-1",
						children: "Customise your itinerary with our travel specialists."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleFormSubmit,
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
								className: "w-full rounded-2xl border border-transparent bg-secondary px-4 py-3.5 text-xs text-ink placeholder-muted-foreground outline-none focus:border-brand focus:bg-white transition"
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
								className: "w-full rounded-2xl border border-transparent bg-secondary px-4 py-3.5 text-xs text-ink placeholder-muted-foreground outline-none focus:border-brand focus:bg-white transition"
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
								className: "w-full rounded-2xl border border-transparent bg-secondary px-4 py-3.5 text-xs text-ink placeholder-muted-foreground outline-none focus:border-brand focus:bg-white transition"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: form.destination,
									onChange: (e) => setForm({
										...form,
										destination: e.target.value
									}),
									className: "w-full rounded-2xl border border-transparent bg-secondary px-4 py-3.5 text-xs text-ink outline-none focus:border-brand focus:bg-white transition cursor-pointer appearance-none",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										disabled: true,
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
									className: "w-full rounded-2xl border border-transparent bg-secondary px-4 py-3.5 text-xs text-ink outline-none focus:border-brand focus:bg-white transition cursor-pointer appearance-none",
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
								rows: 4,
								placeholder: "Special requests or questions...",
								value: form.message,
								onChange: (e) => setForm({
									...form,
									message: e.target.value
								}),
								className: "w-full rounded-2xl border border-transparent bg-secondary px-4 py-3.5 text-xs text-ink placeholder-muted-foreground outline-none focus:border-brand focus:bg-white transition resize-none"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3 pt-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "submit",
										className: "w-full rounded-full bg-[#0066fe] py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#0055dd] cursor-pointer text-center",
										children: sent ? "Enquiry Sent!" : "Send Enquiry"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: `https://wa.me/917639277770?text=Hi%20SkyNow%20Holidays%2C%20I'd%20like%20to%20enquire%20about%20booking%20a%20trip%20to%20${encodeURIComponent(form.destination || "our destinations")}.`,
										target: "_blank",
										rel: "noreferrer",
										className: "flex items-center justify-center gap-2 rounded-full bg-[#00c73c] py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#00b034] cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-5 w-5 fill-white text-transparent" }), " Chat on WhatsApp"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: "tel:+917639277770",
										className: "flex items-center justify-center gap-2 rounded-full bg-secondary py-3.5 text-sm font-bold text-ink transition hover:bg-secondary/80 cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4" }), " Call Now"]
									})
								]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto max-w-7xl px-4 py-12 sm:px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-8 lg:grid-cols-[1fr_360px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
						className: "min-w-0 space-y-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "sticky top-[64px] xl:top-[72px] z-20 bg-background/80 backdrop-blur-md flex border-b border-border overflow-x-auto scrollbar-none whitespace-nowrap py-1",
								children: TABS.map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => handleTabClick(tab.id),
									className: `relative px-6 py-3.5 text-xs sm:text-sm font-bold cursor-pointer transition-colors ${activeTab === tab.id ? "text-brand" : "text-muted-foreground hover:text-ink"}`,
									children: [tab.label, activeTab === tab.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
										layoutId: "details-tab",
										className: "absolute bottom-0 left-6 right-6 h-0.5 bg-brand"
									})]
								}, tab.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								id: "overview",
								className: "bg-white rounded-[32px] p-6 sm:p-10 border border-border shadow-sm scroll-mt-[120px] xl:scroll-mt-[135px] space-y-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-display text-2xl font-bold text-ink",
											children: "Overview"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-full bg-brand/5 px-3.5 py-1 text-xs font-bold text-brand uppercase tracking-wider",
											children: details.tag
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm leading-relaxed text-muted-foreground",
										children: details.overview
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "border-t border-secondary pt-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "font-display text-lg font-bold text-ink mb-4",
											children: "Tour Highlights"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
											className: "grid gap-3 sm:grid-cols-2",
											children: details.highlights.map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "flex gap-2.5 items-start text-sm text-ink leading-relaxed font-semibold",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "grid h-5 w-5 shrink-0 place-items-center rounded bg-brand/10 text-brand mt-0.5",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3" })
												}), h]
											}, i))
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								id: "itinerary",
								className: "bg-white rounded-[32px] p-6 sm:p-10 border border-border shadow-sm scroll-mt-[120px] xl:scroll-mt-[135px] space-y-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-2xl font-bold text-ink",
									children: "Day-by-Day Itinerary"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-col gap-3",
									children: details.itinerary.map((day) => {
										const isOpen = openDay === day.day;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: `rounded-2xl border transition ${isOpen ? "border-brand/35 bg-secondary/35" : "border-border"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: () => setOpenDay(isOpen ? null : day.day),
												className: "flex w-full items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "font-display text-base font-bold text-ink flex items-center gap-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "rounded-lg bg-brand px-2.5 py-1 text-xs font-bold text-white uppercase tracking-wider",
														children: day.day
													}), day.title]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: `transition ${isOpen ? "rotate-180" : ""}`,
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
												initial: false,
												children: isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
													initial: {
														height: 0,
														opacity: 0
													},
													animate: {
														height: "auto",
														opacity: 1
													},
													exit: {
														height: 0,
														opacity: 0
													},
													className: "overflow-hidden",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "px-5 pb-5 pl-5 sm:pl-16 text-sm text-muted-foreground leading-relaxed",
														children: day.desc
													})
												})
											})]
										}, day.day);
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								id: "hotels",
								className: "bg-white rounded-[32px] p-6 sm:p-10 border border-border shadow-sm scroll-mt-[120px] xl:scroll-mt-[135px] space-y-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-2xl font-bold text-ink",
										children: "Accommodations & Stays"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground leading-relaxed",
										children: "We select top-tier partner properties that guarantee safety, cleanliness, and premium services."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid gap-4 sm:grid-cols-2",
										children: details.hotels.map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-2xl border border-border p-5 flex items-start gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand shrink-0",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hotel, { className: "h-5 w-5" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
													className: "font-semibold text-ink text-base leading-tight",
													children: h.name
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-muted-foreground mt-0.5",
													children: h.location
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "mt-2 flex gap-0.5 text-gold",
													children: Array.from({ length: h.stars }).map((_, k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 fill-gold text-gold" }, k))
												})
											] })]
										}, i))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "border-t border-secondary pt-6 space-y-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "font-display text-lg font-bold text-ink",
											children: "Transportation Scope"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm leading-relaxed text-muted-foreground",
											children: details.transportation
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								id: "inclusions",
								className: "bg-white rounded-[32px] p-6 sm:p-10 border border-border shadow-sm scroll-mt-[120px] xl:scroll-mt-[135px] grid gap-8 md:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "font-display text-xl font-bold text-ink mb-4 text-emerald-600 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid h-6 w-6 place-items-center rounded-full bg-emerald-100 text-emerald-600",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" })
									}), "Inclusions"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "space-y-3",
									children: details.inclusions.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex gap-2.5 items-start text-xs font-semibold text-ink leading-normal",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" }), item]
									}, i))
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "font-display text-xl font-bold text-ink mb-4 text-rose-600 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid h-6 w-6 place-items-center rounded-full bg-rose-100 text-rose-600",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
									}), "Exclusions"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "space-y-3",
									children: details.exclusions.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex gap-2.5 items-start text-xs font-semibold text-ink leading-normal",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" }), item]
									}, i))
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								id: "visa",
								className: "bg-white rounded-[32px] p-6 sm:p-10 border border-border shadow-sm scroll-mt-[120px] xl:scroll-mt-[135px] space-y-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-2xl font-bold text-ink",
									children: "Visa Guidelines"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm leading-relaxed text-muted-foreground",
									children: details.visaInfo
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-t border-secondary pt-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-2xl font-bold text-ink",
										children: "Best Time to Visit"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 text-sm leading-relaxed text-muted-foreground",
										children: details.bestTimeToVisit
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4 overflow-hidden py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-2xl font-bold text-ink",
									children: "Destination Gallery"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "group overflow-hidden py-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex w-max animate-marquee gap-4 pr-4 group-hover:[animation-play-state:paused]",
										children: [
											...details.images,
											...details.images,
											...details.images
										].map((img, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											onClick: () => setActivePhoto(img),
											className: "h-44 w-64 sm:h-52 sm:w-80 overflow-hidden rounded-2xl border border-border shadow-md shrink-0 transition duration-500 hover:scale-102 cursor-pointer",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: img,
												alt: "Destination snapshot",
												loading: "lazy",
												className: "h-full w-full object-cover transition-transform duration-[800ms] hover:scale-110"
											})
										}, img + "-" + i))
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "font-display text-2xl font-bold text-ink",
									children: ["FAQs for ", details.name]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-col gap-3",
									children: details.faqs.map((faq, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl border border-border bg-white p-5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
											className: "font-semibold text-ink text-sm sm:text-base",
											children: ["Q: ", faq.q]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed pl-4 border-l-2 border-brand",
											children: faq.a
										})]
									}, i))
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
						className: "hidden lg:block space-y-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-[32px] border border-border bg-white p-6 sm:p-8 shadow-sm space-y-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "font-display text-xl font-bold text-ink",
								children: "Plan Your Journey"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground mt-1",
								children: "Customise your itinerary with our travel specialists."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: handleFormSubmit,
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
										className: "w-full rounded-2xl border border-transparent bg-secondary px-4 py-3.5 text-xs text-ink placeholder-muted-foreground outline-none focus:border-brand focus:bg-white transition"
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
										className: "w-full rounded-2xl border border-transparent bg-secondary px-4 py-3.5 text-xs text-ink placeholder-muted-foreground outline-none focus:border-brand focus:bg-white transition"
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
										className: "w-full rounded-2xl border border-transparent bg-secondary px-4 py-3.5 text-xs text-ink placeholder-muted-foreground outline-none focus:border-brand focus:bg-white transition"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											value: form.destination,
											onChange: (e) => setForm({
												...form,
												destination: e.target.value
											}),
											className: "w-full rounded-2xl border border-transparent bg-secondary px-4 py-3.5 text-xs text-ink outline-none focus:border-brand focus:bg-white transition cursor-pointer appearance-none",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "",
												disabled: true,
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
											className: "w-full rounded-2xl border border-transparent bg-secondary px-4 py-3.5 text-xs text-ink outline-none focus:border-brand focus:bg-white transition cursor-pointer appearance-none",
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
										rows: 4,
										placeholder: "Special requests or questions...",
										value: form.message,
										onChange: (e) => setForm({
											...form,
											message: e.target.value
										}),
										className: "w-full rounded-2xl border border-transparent bg-secondary px-4 py-3.5 text-xs text-ink placeholder-muted-foreground outline-none focus:border-brand focus:bg-white transition resize-none"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-3 pt-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "submit",
												className: "w-full rounded-full bg-[#0066fe] py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#0055dd] cursor-pointer text-center",
												children: sent ? "Enquiry Sent!" : "Send Enquiry"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												href: `https://wa.me/917639277770?text=Hi%20SkyNow%20Holidays%2C%20I'd%20like%20to%20enquire%20about%20booking%20a%20trip%20to%20${encodeURIComponent(form.destination || "our destinations")}.`,
												target: "_blank",
												rel: "noreferrer",
												className: "flex items-center justify-center gap-2 rounded-full bg-[#00c73c] py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#00b034] cursor-pointer",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-5 w-5 fill-white text-transparent" }), " Chat on WhatsApp"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												href: "tel:+917639277770",
												className: "flex items-center justify-center gap-2 rounded-full bg-secondary py-3.5 text-sm font-bold text-ink transition hover:bg-secondary/80 cursor-pointer",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4" }), " Call Now"]
											})
										]
									})
								]
							})]
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-t border-border bg-secondary/50 py-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-4 sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-2xl font-bold text-ink",
						children: "Related Packages"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 grid gap-6 sm:grid-cols-3",
						children: relatedPackages.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "group rounded-[30px] border border-border bg-white overflow-hidden shadow-sm hover:shadow-luxury transition-all duration-300",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative aspect-[4/3] overflow-hidden",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: p.image,
									alt: p.name,
									className: "h-full w-full object-cover group-hover:scale-105 transition duration-500"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[9px] font-bold text-brand shadow",
									children: p.tag
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-5 space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-[11px] font-bold text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p.country }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p.duration })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "font-display text-lg font-bold text-ink truncate",
										children: p.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between border-t border-secondary pt-3 mt-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-display font-bold text-brand text-base",
											children: p.price
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: `/packages/${p.slug}`,
											className: "inline-flex items-center gap-1 text-xs font-bold text-brand hover:text-gold transition-colors cursor-pointer",
											children: ["View Details ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
										})]
									})
								]
							})]
						}, p.name))
					})]
				})
			}),
			activePhoto && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm transition-all duration-300 animate-fade-in",
				onClick: () => setActivePhoto(null),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setActivePhoto(null),
					className: "absolute right-6 top-6 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20 transition cursor-pointer",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-6 w-6" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-2xl shadow-luxury animate-scale-in",
					onClick: (e) => e.stopPropagation(),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: activePhoto,
						alt: "Full size view",
						className: "max-h-[85vh] max-w-[85vw] rounded-xl object-contain"
					})
				})]
			})
		]
	});
}
//#endregion
export { PackageDetailsPage as component };
