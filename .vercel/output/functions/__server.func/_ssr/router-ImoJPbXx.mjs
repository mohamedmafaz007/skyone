import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { b as useRouter, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, l as useRouterState, m as createFileRoute, p as lazyRouteComponent, s as Scripts } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as PlaneTakeoff, F as Linkedin, K as Globe, M as Mail, O as MessageCircle, R as Instagram, Y as Facebook, _t as ArrowUp, et as Compass, g as Send, j as MapPin, k as Menu, n as X, pt as Bot, t as Youtube, w as Phone } from "../_libs/lucide-react.mjs";
import { n as Route$13 } from "./404-BHmdgnTe.mjs";
import { i as useAppData } from "./dataStore-DogEXO2o.mjs";
import { r as getSlug } from "./packageDetailsData-AeMTizGf.mjs";
import { t as Route$14 } from "../_destination-BgjAFcSR.mjs";
import { o as motion, s as AnimatePresence } from "../_libs/framer-motion.mjs";
import { t as Route$15 } from "./admin-xd0m2JT8.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-ImoJPbXx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-CjgWGqf0.css";
var FINAL_removebg_preview_default$1 = "/assets/FINAL-removebg-preview-Cv1pqCxk.png";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
var FINAL_removebg_preview_default = "/assets/FINAL-removebg-preview-Cv1pqCxk.png";
var NAV_ITEMS = [
	{
		label: "Home",
		to: "/"
	},
	{
		label: "Packages",
		to: "/packages"
	},
	{
		label: "Destinations",
		to: "/destinations"
	},
	{
		label: "Services",
		to: "/services"
	},
	{
		label: "About",
		to: "/about"
	},
	{
		label: "Gallery",
		to: "/gallery"
	},
	{
		label: "Testimonials",
		to: "/testimonials"
	},
	{
		label: "FAQ",
		to: "/faq"
	},
	{
		label: "Contact",
		to: "/contact"
	}
];
function Navbar() {
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 40);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	(0, import_react.useEffect)(() => {
		setOpen(false);
	}, [pathname]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: `fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#0B1528]/85 backdrop-blur-md border-b border-white/10 shadow-lg py-3" : "bg-transparent py-5"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "group flex items-center gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: FINAL_removebg_preview_default,
						alt: "SkyNow Holidays",
						className: "h-10 w-auto transition-transform duration-300 group-hover:scale-105 sm:h-12"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-1 xl:flex",
					children: NAV_ITEMS.map((item) => {
						const active = pathname === item.to;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: `relative px-4 py-2 text-sm font-semibold tracking-wide transition-colors ${active ? "text-gold" : "text-white/80 hover:text-gold"}`,
							children: [item.label, active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
								layoutId: "nav-underline",
								className: "absolute bottom-0 left-4 right-4 h-0.5 bg-gold",
								transition: {
									type: "spring",
									stiffness: 380,
									damping: 30
								}
							})]
						}, item.to);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden items-center gap-6 xl:flex",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/contact",
						className: "rounded-full bg-gold px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-gold-foreground shadow-luxury transition hover:brightness-110 hover:shadow-2xl",
						children: "Get Quote"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setOpen(!open),
					className: "grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white hover:bg-white/10 xl:hidden cursor-pointer transition-colors",
					"aria-label": open ? "Close menu" : "Open menu",
					children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			onClick: () => setOpen(false),
			className: "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm h-screen w-screen"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: { x: "100%" },
			animate: { x: 0 },
			exit: { x: "100%" },
			transition: {
				type: "spring",
				damping: 25,
				stiffness: 200
			},
			className: "fixed bottom-0 right-0 top-0 z-50 flex h-screen w-full max-w-[300px] flex-col bg-[#0B1528] p-6 shadow-2xl text-white border-l border-white/10 overflow-y-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between pb-6 border-b border-white/10 mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/assets/FINAL-removebg-preview-Cv1pqCxk.png",
						alt: "SkyNow Holidays",
						className: "h-9 w-auto object-contain"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setOpen(false),
						className: "grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white hover:bg-white/10 cursor-pointer",
						"aria-label": "Close menu",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex flex-col gap-2",
					children: NAV_ITEMS.map((item, idx) => {
						const active = pathname === item.to;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: {
								opacity: 0,
								x: 20
							},
							animate: {
								opacity: 1,
								x: 0
							},
							transition: { delay: idx * .03 },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: item.to,
								onClick: () => setOpen(false),
								className: `block rounded-xl px-4 py-2.5 text-sm font-semibold tracking-wide transition-all ${active ? "bg-white/10 text-gold" : "text-white/80 hover:bg-white/5 hover:text-white"}`,
								children: item.label
							})
						}, item.to);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto border-t border-white/10 pt-6 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "https://wa.me/917639277770",
						target: "_blank",
						rel: "noreferrer",
						className: "flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-emerald-400",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4 text-emerald-400" }), " WhatsApp Chat"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/contact",
						onClick: () => setOpen(false),
						className: "block w-full rounded-xl bg-brand py-3 text-center text-sm font-bold uppercase tracking-wider text-white shadow hover:brightness-110 animate-pulse-subtle",
						children: "Get Quote"
					})]
				})
			]
		})] }) })]
	});
}
var QUICK_LINKS = [
	{
		label: "Home",
		to: "/"
	},
	{
		label: "Packages",
		to: "/packages"
	},
	{
		label: "Destinations",
		to: "/destinations"
	},
	{
		label: "Services",
		to: "/services"
	},
	{
		label: "About Us",
		to: "/about"
	},
	{
		label: "Gallery",
		to: "/gallery"
	},
	{
		label: "Testimonials",
		to: "/testimonials"
	},
	{
		label: "FAQ",
		to: "/faq"
	},
	{
		label: "Contact Us",
		to: "/contact"
	}
];
var POPULAR_DESTINATIONS = [
	{
		label: "Bali",
		to: "/packages/bali"
	},
	{
		label: "Singapore & Malaysia",
		to: "/packages/singapore-malaysia"
	},
	{
		label: "Dubai",
		to: "/packages/dubai"
	},
	{
		label: "Thailand",
		to: "/packages/thailand"
	},
	{
		label: "Vietnam",
		to: "/packages/vietnam"
	},
	{
		label: "Turkey",
		to: "/packages/turkey"
	},
	{
		label: "Japan",
		to: "/packages/japan"
	},
	{
		label: "Europe",
		to: "/packages/europe"
	}
];
function Footer() {
	const { contact } = useAppData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "relative overflow-hidden bg-[oklch(0.13_0.03_265)] pt-20 text-white",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -top-40 left-1/2 h-96 w-[800px] -translate-x-1/2 rounded-full bg-brand/30 blur-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto max-w-7xl px-4 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "inline-block",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: FINAL_removebg_preview_default,
									alt: "SkyNow Holidays",
									className: "h-14 w-auto"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-xs text-sm text-white/70",
								children: "A boutique travel studio designing personalised luxury international holidays for discerning travellers. End-to-end planning with 24/7 human support."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-2.5 pt-2",
								children: [
									{
										icon: Facebook,
										href: "https://facebook.com/skynowholidays"
									},
									{
										icon: Instagram,
										href: "https://instagram.com/skynowholidays"
									},
									{
										icon: Linkedin,
										href: "https://linkedin.com/company/skynowholidays"
									},
									{
										icon: Youtube,
										href: "https://youtube.com/skynowholidays"
									}
								].map((social, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: social.href,
									target: "_blank",
									rel: "noreferrer",
									className: "grid h-10 w-10 place-items-center rounded-full bg-white/10 transition duration-300 hover:bg-gold hover:text-ink",
									"aria-label": "Social connection",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(social.icon, { className: "h-4 w-4" })
								}, i))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "font-display text-lg font-semibold tracking-wide text-white",
						children: "Quick Links"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-5 space-y-2.5 text-sm",
						children: QUICK_LINKS.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: link.to,
							className: "text-white/70 transition-colors duration-300 hover:text-gold",
							children: link.label
						}) }, link.to))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "font-display text-lg font-semibold tracking-wide text-white",
						children: "Featured Holidays"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-5 space-y-2.5 text-sm",
						children: POPULAR_DESTINATIONS.map((dest) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: dest.to,
							className: "text-white/70 transition-colors duration-300 hover:text-gold",
							children: dest.label
						}) }, dest.to))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "font-display text-lg font-semibold tracking-wide text-white",
							children: "Newsletter"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2.5 text-sm text-white/70",
							children: "Get travel guides, visa updates and premium itineraries straight to your inbox."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: (e) => e.preventDefault(),
							className: "mt-4 flex overflow-hidden rounded-full border border-white/15 bg-white/5 p-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								required: true,
								placeholder: "you@email.com",
								className: "flex-1 bg-transparent px-4 py-2 text-sm text-white outline-none placeholder:text-white/40"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "rounded-full bg-gold px-4 py-2 text-sm font-semibold text-ink transition-transform duration-300 hover:scale-105 active:scale-95",
								children: "Join"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 space-y-2 text-sm text-white/70",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4 text-gold shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: `tel:${contact.phone}`,
										className: "hover:text-gold",
										children: contact.phone
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4 text-gold shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: `mailto:${contact.email}`,
										className: "hover:text-gold",
										children: contact.email
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "h-4 w-4 text-gold shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: contact.website.startsWith("http") ? contact.website : `https://${contact.website}`,
										target: "_blank",
										rel: "noreferrer",
										className: "hover:text-gold",
										children: contact.website
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-gold shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: contact.address })]
								})
							]
						})
					] })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-xs text-white/50 sm:flex-row",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" SkyNow Holidays. All rights reserved."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/privacy-policy",
							className: "hover:text-gold",
							children: "Privacy Policy"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/terms-and-conditions",
							className: "hover:text-gold",
							children: "Terms & Conditions"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Designed with ♥ for SkyNow Holidays." })
				]
			})]
		})]
	});
}
var cambodia_default = "/assets/cambodia-BTLiHgaP.png";
var bhutan_default = "/assets/bhutan-Cn6LF3w_.png";
var srilanka_default = "/assets/srilanka-DcWG1yWK.png";
var u = (id, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
var destinations = [
	{
		name: "Bali",
		country: "Indonesia",
		tag: "Honeymoon",
		image: u("photo-1537996194471-e657df975ab4"),
		blurb: "Emerald rice terraces, temple sunsets & barefoot luxury villas.",
		duration: "5N / 6D",
		price: "₹58,900",
		rating: 4.9
	},
	{
		name: "Singapore & Malaysia",
		country: "SG • MY",
		tag: "Family",
		image: u("photo-1525625293386-3f8f99389edd"),
		blurb: "Twin-city skyline escapes with Sentosa, Genting & Petronas.",
		duration: "6N / 7D",
		price: "₹74,500",
		rating: 4.8
	},
	{
		name: "Dubai",
		country: "UAE",
		tag: "Luxury",
		image: u("photo-1512453979798-5ea266f8880c"),
		blurb: "Desert dunes, Burj Khalifa & yacht sundowners on the Marina.",
		duration: "5N / 6D",
		price: "₹69,900",
		rating: 4.9
	},
	{
		name: "Thailand",
		country: "Bangkok • Phuket",
		tag: "Beach",
		image: u("photo-1552465011-b4e21bf6e79a"),
		blurb: "Long-tail boats, floating markets & Andaman island hopping.",
		duration: "6N / 7D",
		price: "₹49,900",
		rating: 4.7
	},
	{
		name: "Vietnam",
		country: "Hanoi • Ha Long",
		tag: "Adventure",
		image: u("photo-1528127269322-539801943592"),
		blurb: "Emerald bays, cave kayaking & the old quarters of Hanoi.",
		duration: "7N / 8D",
		price: "₹64,000",
		rating: 4.8
	},
	{
		name: "Cambodia & Vietnam",
		country: "Combo",
		tag: "International",
		image: cambodia_default,
		blurb: "Angkor Wat sunrise paired with Mekong Delta cruises.",
		duration: "9N / 10D",
		price: "₹92,000",
		rating: 4.8
	},
	{
		name: "China",
		country: "Beijing • Shanghai",
		tag: "International",
		image: u("photo-1508804185872-d7badad00f7d"),
		blurb: "The Great Wall, Forbidden City & The Bund's neon skyline.",
		duration: "8N / 9D",
		price: "₹1,05,000",
		rating: 4.7
	},
	{
		name: "Hong Kong & Macau",
		country: "HK • MO",
		tag: "Family",
		image: u("photo-1536599018102-9f803c140fc1"),
		blurb: "Sky-high dim sum, Disney magic & the Venetian's grand canals.",
		duration: "5N / 6D",
		price: "₹78,500",
		rating: 4.7
	},
	{
		name: "Nepal",
		country: "Kathmandu • Pokhara",
		tag: "Adventure",
		image: u("photo-1544735716-392fe2489ffa"),
		blurb: "Himalayan sunrises, prayer flags & lakeside Pokhara.",
		duration: "5N / 6D",
		price: "₹42,000",
		rating: 4.8
	},
	{
		name: "Bhutan",
		country: "Paro • Thimphu",
		tag: "Adventure",
		image: bhutan_default,
		blurb: "Tiger's Nest monastery & the kingdom of Gross National Happiness.",
		duration: "6N / 7D",
		price: "₹67,000",
		rating: 4.9
	},
	{
		name: "Sri Lanka",
		country: "Colombo • Kandy",
		tag: "Family",
		image: srilanka_default,
		blurb: "Tea trails, temple of the tooth & southern palm beaches.",
		duration: "6N / 7D",
		price: "₹46,500",
		rating: 4.7
	},
	{
		name: "Bahrain",
		country: "Manama",
		tag: "Luxury",
		image: u("photo-1548013146-72479768bada"),
		blurb: "Pearl diving heritage, modern skyline & Formula 1 flair.",
		duration: "4N / 5D",
		price: "₹56,000",
		rating: 4.6
	},
	{
		name: "Baku Azerbaijan",
		country: "Baku",
		tag: "International",
		image: u("photo-1547448415-e9f5b28e570d"),
		blurb: "Flame Towers, Old City walls & Caspian coast promenades.",
		duration: "5N / 6D",
		price: "₹61,500",
		rating: 4.7
	},
	{
		name: "Turkey",
		country: "Istanbul • Cappadocia",
		tag: "Honeymoon",
		image: u("photo-1524231757912-21f4fe3a7200"),
		blurb: "Hot-air balloons at dawn over fairy chimneys.",
		duration: "7N / 8D",
		price: "₹89,000",
		rating: 4.9
	},
	{
		name: "Mauritius",
		country: "Indian Ocean",
		tag: "Honeymoon",
		image: u("photo-1544551763-46a013bb70d5"),
		blurb: "Turquoise lagoons, catamaran days & over-water villas.",
		duration: "6N / 7D",
		price: "₹95,000",
		rating: 4.9
	},
	{
		name: "Egypt",
		country: "Cairo • Luxor",
		tag: "International",
		image: u("photo-1539768942893-daf53e448371"),
		blurb: "Pyramids, Nile cruises & the Valley of the Kings.",
		duration: "7N / 8D",
		price: "₹98,500",
		rating: 4.8
	},
	{
		name: "South Africa",
		country: "Cape Town",
		tag: "Adventure",
		image: u("photo-1580060839134-75a5edca2e99"),
		blurb: "Table Mountain, Cape winelands & Big Five safaris.",
		duration: "8N / 9D",
		price: "₹1,45,000",
		rating: 4.9
	},
	{
		name: "Kenya",
		country: "Nairobi • Masai Mara",
		tag: "Adventure",
		image: u("photo-1516426122078-c23e76319801"),
		blurb: "The Great Migration & sundowners on the savannah.",
		duration: "6N / 7D",
		price: "₹1,25,000",
		rating: 4.9
	},
	{
		name: "Almaty Kazakhstan",
		country: "Almaty",
		tag: "Adventure",
		image: u("photo-1518623489648-a173ef7824f3"),
		blurb: "Alpine lakes, Medeu skating & Charyn Canyon drives.",
		duration: "5N / 6D",
		price: "₹58,000",
		rating: 4.7
	},
	{
		name: "Japan",
		country: "Tokyo • Kyoto",
		tag: "Luxury",
		image: u("photo-1493976040374-85c8e12f0c0e"),
		blurb: "Cherry blossoms, Shinkansen speed & ancient Kyoto shrines.",
		duration: "8N / 9D",
		price: "₹1,65,000",
		rating: 4.9
	},
	{
		name: "Europe",
		country: "Paris • Swiss • Italy",
		tag: "Luxury",
		image: u("photo-1502602898657-3e91760cbb34"),
		blurb: "The classic grand tour across three unforgettable capitals.",
		duration: "10N / 11D",
		price: "₹1,95,000",
		rating: 4.9
	},
	{
		name: "Australia & New Zealand",
		country: "AU • NZ",
		tag: "Family",
		image: u("photo-1523482580672-f109ba8cb9be"),
		blurb: "Sydney Harbour, Great Ocean Road & Milford Sound fjords.",
		duration: "12N / 13D",
		price: "₹2,45,000",
		rating: 4.9
	},
	{
		name: "USA",
		country: "NY • LA • Vegas",
		tag: "Group Tours",
		image: u("photo-1485871981521-5b1fd3805eee"),
		blurb: "Coast-to-coast icons: Times Square to the Grand Canyon.",
		duration: "11N / 12D",
		price: "₹2,15,000",
		rating: 4.8
	}
];
u("photo-1507525428034-b723cf961d3e"), u("photo-1476514525535-07fb3b4ae5f1"), u("photo-1506744038136-46273834b3fb"), u("photo-1469854523086-cc02fe5d8800"), u("photo-1533105079780-92b9be482077"), u("photo-1513694203232-719a280e022f"), u("photo-1502602898657-3e91760cbb34"), u("photo-1488646953014-85cb44e25828"), u("photo-1501785888041-af3ef285b470"), u("photo-1501555088652-021faa106b9b"), u("photo-1530789253388-582c481c54b0"), u("photo-1527631746610-bca00a040d60");
u("photo-1544005313-94ddf0286df2", 200), u("photo-1507003211169-0a1dd7228f2d", 200), u("photo-1494790108377-be9c29b29330", 200), u("photo-1500648767791-00dcc994a43e", 200), u("photo-1438761681033-6461ffad8d80", 200);
var faqs = [
	{
		q: "How do I book a holiday package with SkyNow?",
		a: "Share your dates and destination via our contact form or WhatsApp. A specialist will design a personalised itinerary within 24 hours, then we lock it in with a small booking deposit."
	},
	{
		q: "Do you handle visas and travel insurance?",
		a: "Yes. Every international package includes end-to-end visa assistance, and we offer optional comprehensive travel insurance from top-tier providers."
	},
	{
		q: "Can I customise an existing package?",
		a: "Absolutely. Every itinerary is a starting point — extend nights, upgrade hotels, add experiences or combine multiple destinations."
	},
	{
		q: "Are flights included in the packages?",
		a: "Most packages are quoted land-only for flexibility, but our team will book the best fares across full-service carriers on request."
	},
	{
		q: "What if I need help while travelling?",
		a: "Our 24/7 concierge is a WhatsApp message away, in any timezone, for real-time support from booking to homecoming."
	},
	{
		q: "Do you organise group and corporate tours?",
		a: "Yes — from 8-guest family reunions to 500-pax corporate offsites. We handle logistics, MICE, and celebrations end-to-end."
	}
];
var SUGGESTIONS = [
	{
		text: "Tell me about Bali 🏝️",
		query: "Tell me about Bali"
	},
	{
		text: "Do you assist with visas? 🛡️",
		query: "Do you assist with visas?"
	},
	{
		text: "Are flights included? ✈️",
		query: "Are flights included?"
	},
	{
		text: "How do I customize a trip? 🎨",
		query: "How do I customize a trip?"
	}
];
function getBotResponse(input) {
	const query = input.toLowerCase().trim();
	for (const d of destinations) if (query.includes(d.name.toLowerCase())) {
		const slug = getSlug(d.name);
		return {
			text: `✈️ **${d.name} Package** (${d.duration}): ${d.blurb}\n\n• **Starting Price**: ${d.price} per person\n• **Rating**: ⭐ ${d.rating}/5\n\nWe provide handpicked 4★/5★ properties, private airport/sightseeing transfers, customized sightseeing, visa guidance, and 24/7 VIP Concierge support on WhatsApp for your journey!`,
			link: {
				to: `/packages/${slug}`,
				label: `View ${d.name} Package Details`
			}
		};
	}
	if (query.includes("visa") || query.includes("passport") || query.includes("document")) return {
		text: "🛡️ **Visa & Documentation Support**:\n\nYes! Every international package booked with SkyNow Holidays includes end-to-end visa assistance. Our visa specialists guide you through mock check documentation, booking consulate appointments, and filing custom declarations to minimize rejection risks.",
		link: {
			to: "/services",
			label: "Explore Our Services"
		}
	};
	if (query.includes("flight") || query.includes("ticket") || query.includes("airline") || query.includes("airfare")) return {
		text: "✈️ **Flight Bookings**:\n\nMost of our listed packages are quoted on a land-only basis to offer you maximum flexibility. However, our flights team will gladly source and book the best carrier options (direct/full-service premium airlines) matching your itinerary at the time of booking confirmation.",
		link: {
			to: "/contact",
			label: "Inquire Flight Prices"
		}
	};
	if (query.includes("book") || query.includes("how to") || query.includes("process") || query.includes("reserve") || query.includes("payment") || query.includes("deposit") || query.includes("cancel") || query.includes("refund")) return {
		text: "📅 **Booking Process & Terms**:\n\n1. **Inquire**: Share travel dates & destinations via our form or WhatsApp.\n2. **Customize**: A dedicated travel specialist designs your custom itinerary within 24 hours.\n3. **Deposit**: Lock in your rates with a booking deposit (typically 20% to 30%).\n4. **Milestones**: Pay 50% of the balance 30 days before, and the final 100% at least 15 days before takeoff.\n\n*Cancellation*: Up to 30 days prior, enjoy a 100% refund of the land package cost (minus a small booking fee).",
		link: {
			to: "/terms-and-conditions",
			label: "Read Terms & Conditions"
		}
	};
	if (query.includes("custom") || query.includes("tailor") || query.includes("change") || query.includes("modify") || query.includes("extend") || query.includes("personalized")) return {
		text: "🎨 **Custom Tailored Itineraries**:\n\nAbsolutely! Every package on SkyNow Holidays is a flexible starting point. You can easily extend your stay, upgrade to premium private pool villas/suites, combine multiple countries, or add specific activities. Our design specialists will build the perfect itinerary for you.",
		link: {
			to: "/contact",
			label: "Request Custom Itinerary"
		}
	};
	if (query.includes("group") || query.includes("corporate") || query.includes("family") || query.includes("mice") || query.includes("company")) return {
		text: "💼 **Group & Corporate Travel**:\n\nWe organize everything from 8-guest family reunions to 500+ pax corporate offsites and MICE trips. We handle all logistics, venue bookings, team activities, flight charters, and event coordinate support.",
		link: {
			to: "/services",
			label: "View Corporate Services"
		}
	};
	if (query.includes("contact") || query.includes("phone") || query.includes("email") || query.includes("number") || query.includes("address") || query.includes("support")) return {
		text: "📞 **Contact SkyNow Holidays**:\n\n• **Email**: support@skynowhollidays.com\n• **WhatsApp Support**: Available 24/7 during your travels\n• **Form**: Click the button below to fill out our quick inquiry form, and a dedicated expert will reply within 24 hours!",
		link: {
			to: "/contact",
			label: "Contact Us Form"
		}
	};
	if (query.includes("rating") || query.includes("satisfaction") || query.includes("review") || query.includes("experience") || query.includes("testimony")) return {
		text: "🌟 **Our Track Record**:\n\nWe are proud to have served over 10,000+ happy travellers with an overall rating of **4.9/5 stars** and a 98% customer satisfaction score. Check out our Testimonials page to read real travel stories from our guests!",
		link: {
			to: "/testimonials",
			label: "Read Guest Reviews"
		}
	};
	if (query.includes("faq") || query.includes("question") || query.includes("help") || query.includes("about your company")) return {
		text: "❓ **Frequently Asked Questions**:\n\nI can help you with visa assistance, customized packages, flight arrangements, booking terms, corporate trips, or detail summaries for any of our 22+ international destinations like Bali, Singapore, Dubai, Vietnam, Turkey, Europe, and Japan.",
		link: {
			to: "/faq",
			label: "View All FAQs"
		}
	};
	for (const faq of faqs) if (query.includes(faq.q.toLowerCase().replace(/[^a-z0-9]/g, ""))) return { text: faq.a };
	return { text: "👋 I'm the SkyNow Travel Assistant! I can help you find tour details, check pricing, and understand booking terms.\n\nTry asking me about:\n• **Destinations**: e.g., 'Tell me about Bali' or 'Dubai package details'\n• **Operations**: e.g., 'Do you assist with visas?' or 'Are flights included?'\n• **Customizing**: e.g., 'Can I customize my trip?'\n\nWhat travel adventure are we planning next?" };
}
function Chatbot({ isOpen: propIsOpen, setIsOpen: propSetIsOpen }) {
	const [localIsOpen, setLocalIsOpen] = (0, import_react.useState)(false);
	const isOpen = propIsOpen !== void 0 ? propIsOpen : localIsOpen;
	const setIsOpen = propSetIsOpen !== void 0 ? propSetIsOpen : setLocalIsOpen;
	const [messages, setMessages] = (0, import_react.useState)([{
		id: "welcome",
		sender: "bot",
		text: "Hello! 👋 I am your SkyNow Travel Assistant. Ask me anything about our luxury tour packages, visa services, booking process, or custom trip planning!",
		timestamp: /* @__PURE__ */ new Date()
	}]);
	const [input, setInput] = (0, import_react.useState)("");
	const [isTyping, setIsTyping] = (0, import_react.useState)(false);
	const chatEndRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages, isTyping]);
	const handleSend = (textToSend) => {
		if (!textToSend.trim()) return;
		const userMessage = {
			id: Math.random().toString(),
			sender: "user",
			text: textToSend,
			timestamp: /* @__PURE__ */ new Date()
		};
		setMessages((prev) => [...prev, userMessage]);
		setInput("");
		setIsTyping(true);
		setTimeout(() => {
			const response = getBotResponse(textToSend);
			const botMessage = {
				id: Math.random().toString(),
				sender: "bot",
				text: response.text,
				timestamp: /* @__PURE__ */ new Date(),
				link: response.link
			};
			setMessages((prev) => [...prev, botMessage]);
			setIsTyping(false);
		}, 700);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		onClick: () => setIsOpen(!isOpen),
		className: "fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-brand text-white shadow-luxury transition-all duration-300 hover:scale-110 hover:shadow-2xl cursor-pointer",
		"aria-label": "Toggle Chatbot",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
			mode: "wait",
			children: isOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					rotate: -90,
					opacity: 0
				},
				animate: {
					rotate: 0,
					opacity: 1
				},
				exit: {
					rotate: 90,
					opacity: 0
				},
				transition: { duration: .2 },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-6 w-6" })
			}, "close") : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					rotate: 90,
					opacity: 0
				},
				animate: {
					rotate: 0,
					opacity: 1
				},
				exit: {
					rotate: -90,
					opacity: 0
				},
				transition: { duration: .2 },
				className: "relative flex items-center justify-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "h-6 w-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-gold text-[8px] font-bold text-ink ring-2 ring-brand animate-pulse",
					children: "!"
				})]
			}, "chat")
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			y: 50,
			scale: .9
		},
		animate: {
			opacity: 1,
			y: 0,
			scale: 1
		},
		exit: {
			opacity: 0,
			y: 50,
			scale: .9
		},
		transition: {
			type: "spring",
			damping: 25,
			stiffness: 220
		},
		className: "fixed bottom-24 right-6 z-50 flex h-[500px] w-[360px] flex-col overflow-hidden rounded-[24px] border border-slate-100 bg-white shadow-luxury max-w-[calc(100vw-32px)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between bg-[#0B1528] px-5 py-4 text-white",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-9 w-9 items-center justify-center rounded-full bg-brand/20 border border-brand/30",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "h-5 w-5 text-gold" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "font-display text-sm font-bold tracking-wide animate-pulse-subtle",
						children: "SkyNow Concierge"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[10px] text-emerald-400 flex items-center gap-1 font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" }), "Online • Ready to Help"]
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setIsOpen(false),
					className: "rounded-full p-1 text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer",
					"aria-label": "Close Chat",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 overflow-y-auto bg-slate-50/50 p-4 space-y-4",
				children: [
					messages.map((msg) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `max-w-[85%] rounded-[20px] px-4 py-3 text-xs leading-relaxed shadow-sm ${msg.sender === "user" ? "bg-brand text-white rounded-br-none" : "bg-white text-ink border border-slate-100 rounded-bl-none"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "whitespace-pre-line font-medium",
								children: msg.text
							}), msg.link && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: msg.link.to,
								onClick: () => setIsOpen(false),
								className: `mt-3 inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px] py-1.5 px-3 rounded-full transition-all ${msg.sender === "user" ? "bg-white/20 text-white hover:bg-white/30" : "bg-brand/10 text-brand hover:bg-brand/20"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "h-3 w-3" }), msg.link.label]
							})]
						})
					}, msg.id)),
					isTyping && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-start",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-w-[80%] rounded-[20px] rounded-bl-none bg-white border border-slate-100 px-4 py-3 text-xs leading-relaxed shadow-sm flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce",
									style: { animationDelay: "0ms" }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce",
									style: { animationDelay: "150ms" }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce",
									style: { animationDelay: "300ms" }
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: chatEndRef })
				]
			}),
			messages.length === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-slate-50/50 px-4 pb-2 pt-1 flex flex-wrap gap-1.5",
				children: SUGGESTIONS.map((chip, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => handleSend(chip.query),
					className: "rounded-full bg-white border border-slate-200 px-3 py-1.5 text-[10px] font-semibold text-slate-700 hover:bg-brand/5 hover:border-brand/30 hover:text-brand transition-all cursor-pointer shadow-sm",
					children: chip.text
				}, idx))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: (e) => {
					e.preventDefault();
					handleSend(input);
				},
				className: "flex items-center gap-2 border-t border-slate-100 bg-white p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "text",
					value: input,
					onChange: (e) => setInput(e.target.value),
					placeholder: "Ask about Bali, visa support, custom tours...",
					className: "flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs outline-none focus:border-brand/40 focus:bg-white transition-all text-ink placeholder:text-slate-400"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					disabled: !input.trim(),
					className: "flex h-9 w-9 items-center justify-center rounded-full bg-brand text-white transition-all hover:scale-105 hover:brightness-110 disabled:opacity-40 disabled:hover:scale-100 disabled:hover:brightness-100 cursor-pointer",
					"aria-label": "Send Message",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" })
				})]
			})
		]
	}) })] });
}
function FloatingActions() {
	const [showScroll, setShowScroll] = (0, import_react.useState)(false);
	const [isChatOpen, setIsChatOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setShowScroll(window.scrollY > 600);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chatbot, {
			isOpen: isChatOpen,
			setIsOpen: setIsChatOpen
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: !isChatOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.a, {
			initial: {
				opacity: 0,
				scale: .7,
				y: 15
			},
			animate: {
				opacity: 1,
				scale: 1,
				y: 0
			},
			exit: {
				opacity: 0,
				scale: .7,
				y: 15
			},
			transition: { duration: .2 },
			href: "https://wa.me/917639277770?text=Hello%20SkyNow%20Holidays%2C%20I%20would%20like%20to%20inquire%20about%20your%20international%20tour%20packages.",
			target: "_blank",
			rel: "noreferrer",
			className: "fixed bottom-24 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-luxury transition-all duration-300 hover:scale-110 hover:shadow-2xl",
			"aria-label": "Chat on WhatsApp",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-7 w-7 fill-white text-[#25D366]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/60" })]
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: showScroll && !isChatOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
			initial: {
				opacity: 0,
				scale: .7
			},
			animate: {
				opacity: 1,
				scale: 1
			},
			exit: {
				opacity: 0,
				scale: .7
			},
			transition: { duration: .2 },
			onClick: scrollToTop,
			className: "fixed bottom-42 right-7.5 z-40 grid h-11 w-11 place-items-center rounded-full bg-brand text-white shadow-luxury transition-transform duration-300 hover:scale-110 cursor-pointer",
			"aria-label": "Back to top",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "h-4 w-4" })
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: showScroll && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
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
				y: 30
			},
			className: "fixed bottom-6 left-6 z-40 sm:block hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/contact",
				className: "inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-ink shadow-luxury transition-all duration-300 hover:scale-105 hover:brightness-110",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaneTakeoff, { className: "h-4 w-4" }), " Custom Plan"]
			})
		}) })
	] });
}
function LoadingScreen({ done }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: !done && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		className: "fixed inset-0 z-[100] grid place-items-center bg-gradient-to-br from-[oklch(0.15_0.05_265)] via-brand to-[oklch(0.35_0.2_255)]",
		initial: { opacity: 1 },
		exit: {
			opacity: 0,
			y: "-100%"
		},
		transition: {
			duration: .8,
			ease: [
				.76,
				0,
				.24,
				1
			]
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-6 text-white",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex h-36 w-36 items-center justify-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							className: "h-24 w-24 z-10 flex items-center justify-center",
							animate: { scale: [
								1,
								1.06,
								1
							] },
							transition: {
								duration: 2.2,
								repeat: Infinity,
								ease: "easeInOut"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/assets/FINAL-removebg-preview-Cv1pqCxk.png",
								alt: "SkyNow Holidays",
								className: "h-full w-full object-contain"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							className: "absolute inset-0 rounded-full border border-white/10 border-t-gold border-r-gold",
							animate: { rotate: 360 },
							transition: {
								duration: 2,
								repeat: Infinity,
								ease: "linear"
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							className: "absolute -inset-2 rounded-full border border-dashed border-white/5 border-b-gold/50",
							animate: { rotate: -360 },
							transition: {
								duration: 4,
								repeat: Infinity,
								ease: "linear"
							}
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
					className: "font-display text-2xl tracking-widest mt-4",
					initial: { opacity: 0 },
					animate: { opacity: 1 },
					transition: { delay: .2 },
					children: "SKYNOW HOLIDAYS"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-[0.4em] text-white/70",
					children: "Preparing your journey…"
				})
			]
		})
	}) });
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-[60vh] items-center justify-center bg-background px-4 pb-20 pt-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-brand",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-2xl font-semibold text-ink",
					children: "Adventure Off-Course"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The destination you're trying to reach doesn't exist or has been relocated to another continent."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-luxury transition-all hover:brightness-110",
						children: "Go back home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-[60vh] items-center justify-center bg-background px-4 pb-20 pt-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-ink",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-brand px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-secondary",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$12 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "SkyNow Holidays — Luxury International Tours & Holiday Packages" },
			{
				name: "description",
				content: "SkyNow Holidays crafts unforgettable luxury travel experiences to 22+ international destinations. Custom holiday packages, honeymoon tours, visa assistance and 24/7 concierge support."
			},
			{
				name: "author",
				content: "SkyNow Holidays"
			},
			{
				property: "og:title",
				content: "SkyNow Holidays — Luxury International Tours"
			},
			{
				property: "og:description",
				content: "Discover premium curated holidays across 22+ destinations with SkyNow Holidays."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:site_name",
				content: "SkyNow Holidays"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: FINAL_removebg_preview_default$1,
				type: "image/png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700;9..144,800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$12.useRouteContext();
	const [loaded, setLoaded] = (0, import_react.useState)(false);
	const isAdmin = useRouterState().location.pathname === "/admin";
	(0, import_react.useEffect)(() => {
		const t = setTimeout(() => setLoaded(true), 1e3);
		return () => clearTimeout(t);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingScreen, { done: loaded }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-screen flex-col bg-background font-sans text-ink",
			children: [
				!isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				}),
				!isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
				!isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingActions, {})
			]
		})]
	});
}
var $$splitComponentImporter$11 = () => import("./testimonials-D-Eknhpb.mjs");
var Route$11 = createFileRoute("/testimonials")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./terms-and-conditions-DF_eByqs.mjs");
var Route$10 = createFileRoute("/terms-and-conditions")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./services-DFgaKXtG.mjs");
var Route$9 = createFileRoute("/services")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./privacy-policy-BcHw9yoY.mjs");
var Route$8 = createFileRoute("/privacy-policy")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./gallery-CcnmBRKx.mjs");
var Route$7 = createFileRoute("/gallery")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./faq-BKK2EoNU.mjs");
var Route$6 = createFileRoute("/faq")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./destinations-L1Zqg0Ss.mjs");
var Route$5 = createFileRoute("/destinations")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./contact-BqIpqkn1.mjs");
var Route$4 = createFileRoute("/contact")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./about-CNEbdiY6.mjs");
var Route$3 = createFileRoute("/about")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("../_-lcLGW-p1.mjs");
var Route$2 = createFileRoute("/$")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./routes-CSsUzCAg.mjs");
var Route$1 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./packages-CS2Puh00.mjs");
var Route = createFileRoute("/packages/")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var TestimonialsRoute = Route$11.update({
	id: "/testimonials",
	path: "/testimonials",
	getParentRoute: () => Route$12
});
var TermsAndConditionsRoute = Route$10.update({
	id: "/terms-and-conditions",
	path: "/terms-and-conditions",
	getParentRoute: () => Route$12
});
var ServicesRoute = Route$9.update({
	id: "/services",
	path: "/services",
	getParentRoute: () => Route$12
});
var PrivacyPolicyRoute = Route$8.update({
	id: "/privacy-policy",
	path: "/privacy-policy",
	getParentRoute: () => Route$12
});
var GalleryRoute = Route$7.update({
	id: "/gallery",
	path: "/gallery",
	getParentRoute: () => Route$12
});
var FaqRoute = Route$6.update({
	id: "/faq",
	path: "/faq",
	getParentRoute: () => Route$12
});
var DestinationsRoute = Route$5.update({
	id: "/destinations",
	path: "/destinations",
	getParentRoute: () => Route$12
});
var ContactRoute = Route$4.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$12
});
var AdminRoute = Route$15.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$12
});
var AboutRoute = Route$3.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$12
});
var R404Route = Route$13.update({
	id: "/404",
	path: "/404",
	getParentRoute: () => Route$12
});
var SplatRoute = Route$2.update({
	id: "/$",
	path: "/$",
	getParentRoute: () => Route$12
});
var IndexRoute = Route$1.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$12
});
var PackagesIndexRoute = Route.update({
	id: "/packages/",
	path: "/packages/",
	getParentRoute: () => Route$12
});
var rootRouteChildren = {
	IndexRoute,
	SplatRoute,
	R404Route,
	AboutRoute,
	AdminRoute,
	ContactRoute,
	DestinationsRoute,
	FaqRoute,
	GalleryRoute,
	PrivacyPolicyRoute,
	ServicesRoute,
	TermsAndConditionsRoute,
	TestimonialsRoute,
	PackagesDestinationRoute: Route$14.update({
		id: "/packages/$destination",
		path: "/packages/$destination",
		getParentRoute: () => Route$12
	}),
	PackagesIndexRoute
};
var routeTree = Route$12._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
