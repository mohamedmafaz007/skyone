import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { O as MessageCircle, _ as Search, nt as CircleQuestionMark, st as ChevronDown } from "../_libs/lucide-react.mjs";
import { i as useAppData } from "./dataStore-DogEXO2o.mjs";
import { o as motion, s as AnimatePresence } from "../_libs/framer-motion.mjs";
import { t as CommonHero } from "./CommonHero-C4NUnhFB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/faq-BKK2EoNU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FAQ_CATEGORIES = [
	"All",
	"Booking",
	"Visa & Insurance",
	"Customization",
	"Support",
	"Payments"
];
function FaqPage() {
	const { faqs } = useAppData();
	const [cat, setCat] = (0, import_react.useState)("All");
	const [search, setSearch] = (0, import_react.useState)("");
	const [openIdx, setOpenIdx] = (0, import_react.useState)(0);
	const filteredFaqs = (0, import_react.useMemo)(() => {
		return faqs.filter((item) => {
			const matchesCategory = cat === "All" || item.category === cat;
			const matchesSearch = item.q.toLowerCase().includes(search.toLowerCase()) || item.a.toLowerCase().includes(search.toLowerCase());
			return matchesCategory && matchesSearch;
		});
	}, [
		cat,
		search,
		faqs
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background pb-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommonHero, {
			title: "Frequently Asked Questions",
			subtitle: "Clear answers about booking, visa processing, custom packages, and local support.",
			bgImage: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1600&q=80"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-4xl px-4 py-16 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-6 md:flex-row md:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: search,
							onChange: (e) => {
								setSearch(e.target.value);
								setOpenIdx(null);
							},
							placeholder: "Search questions or answers...",
							className: "w-full rounded-2xl border border-border bg-white py-4 pl-12 pr-4 text-sm text-ink outline-none focus:border-brand shadow-sm"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: FAQ_CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								setCat(c);
								setOpenIdx(null);
							},
							className: `relative rounded-full px-4 py-2.5 text-xs font-semibold border transition cursor-pointer ${cat === c ? "bg-brand text-white border-brand shadow-luxury" : "bg-white text-ink border-border hover:bg-secondary"}`,
							children: c
						}, c))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 flex flex-col gap-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
						mode: "popLayout",
						children: filteredFaqs.length > 0 ? filteredFaqs.map((faq, idx) => {
							const isOpen = openIdx === idx;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
								layout: "position",
								initial: {
									opacity: 0,
									y: 15
								},
								animate: {
									opacity: 1,
									y: 0
								},
								exit: {
									opacity: 0,
									scale: .98
								},
								className: `overflow-hidden rounded-3xl border transition-all duration-300 ${isOpen ? "border-brand/40 bg-white shadow-luxury" : "border-border bg-white"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setOpenIdx(isOpen ? null : idx),
									className: "flex w-full items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer",
									"aria-expanded": isOpen,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-display text-base sm:text-lg font-semibold text-ink flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "h-5 w-5 text-brand shrink-0" }), faq.q]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `grid h-9 w-9 shrink-0 place-items-center rounded-full transition-transform duration-300 ${isOpen ? "bg-brand text-white rotate-180" : "bg-secondary text-ink"}`,
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
										transition: {
											duration: .35,
											ease: [
												.22,
												1,
												.36,
												1
											]
										},
										className: "overflow-hidden",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "px-6 pb-6 pl-14 text-sm sm:text-base leading-relaxed text-muted-foreground",
											children: faq.a
										})
									})
								})]
							}, faq.q);
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center py-12 rounded-3xl border border-dashed border-border bg-white p-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "h-12 w-12 text-muted-foreground mx-auto" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 font-display text-lg font-bold text-ink",
									children: "No FAQ matches found"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground mt-1",
									children: "Try typing another keyword or check another category."
								})
							]
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-16 text-center rounded-[36px] bg-secondary p-8 border border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "h-10 w-10 text-brand mx-auto" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-xl font-bold text-ink mt-4",
							children: "Still have questions?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground mt-2 max-w-md mx-auto",
							children: "Get instant support on customized packages and documents checkups via WhatsApp chat."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex justify-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "https://wa.me/917639277770",
								target: "_blank",
								rel: "noreferrer",
								className: "inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow hover:scale-105 transition",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-5 w-5" }), " Chat On WhatsApp"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/contact",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "rounded-full border border-border bg-white px-5 py-3 text-sm font-bold text-ink transition hover:bg-secondary cursor-pointer",
									children: "Write Email"
								})
							})]
						})
					]
				})
			]
		})]
	});
}
//#endregion
export { FaqPage as component };
