import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as Sparkles, vt as ArrowRight } from "../_libs/lucide-react.mjs";
import { i as useAppData, t as IconMap } from "./dataStore-DogEXO2o.mjs";
import { o as motion } from "../_libs/framer-motion.mjs";
import { t as CommonHero } from "./CommonHero-C4NUnhFB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/services-DFgaKXtG.js
var import_jsx_runtime = require_jsx_runtime();
function ServicesPage() {
	const { services } = useAppData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background pb-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommonHero, {
				title: "Our Services",
				subtitle: "End-to-end travel solutions built around comfort, premium standards, and absolute reliability.",
				bgImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-7xl px-4 py-20 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center max-w-3xl mx-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-bold uppercase tracking-[0.3em] text-brand",
							children: "What We Offer"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl",
							children: ["Complete travel ecosystem for a ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "italic text-gradient-brand",
								children: "worry-free holiday"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm text-muted-foreground",
							children: "From visa processing in India to luxury catamaran charters in Bali, we manage every layer of your travel itinerary so you can focus on making memories."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
					children: services.map((serv, idx) => {
						const IconComponent = IconMap[serv.icon] || Sparkles;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 30
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: { once: true },
							transition: {
								duration: .5,
								delay: idx * .04
							},
							className: "group flex flex-col rounded-[32px] border border-border bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-luxury",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `grid h-12 w-12 place-items-center rounded-2xl mb-6 font-bold shadow-sm group-hover:scale-110 transition-transform ${serv.color}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconComponent, { className: "h-6 w-6" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-xl font-semibold text-ink",
									children: serv.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm text-muted-foreground leading-relaxed flex-1",
									children: serv.desc
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-5 space-y-2 border-t border-border pt-5",
									children: serv.features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center gap-2 text-xs font-semibold text-ink",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-gold" }), f]
									}, f))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-6",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/contact",
										search: { service: serv.title },
										className: "inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand group-hover:text-gold transition-colors",
										children: ["Enquire Now ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5 transition-transform group-hover:translate-x-1" })]
									})
								})
							]
						}, serv.title);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-secondary py-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-5xl px-4 text-center sm:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-2xl font-semibold text-ink",
							children: "Need a fully customized package?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground max-w-xl mx-auto",
							children: "Our destination experts can combine multiple services (Visas + Stays + Flights) to design a seamless trip based on your timeline and budget."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/contact",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "rounded-full bg-brand px-6 py-3 text-sm font-bold text-white shadow transition hover:brightness-110 cursor-pointer",
									children: "Consult A Specialist"
								})
							})
						})
					]
				})
			})
		]
	});
}
//#endregion
export { ServicesPage as component };
