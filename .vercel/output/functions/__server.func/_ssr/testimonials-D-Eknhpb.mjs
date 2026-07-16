import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { d as Star, h as ShieldCheck, n as X, x as Play } from "../_libs/lucide-react.mjs";
import { i as useAppData } from "./dataStore-DogEXO2o.mjs";
import { o as motion, s as AnimatePresence } from "../_libs/framer-motion.mjs";
import { t as CommonHero } from "./CommonHero-C4NUnhFB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/testimonials-D-Eknhpb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TestimonialsPage() {
	const { testimonials: testimonialsData } = useAppData();
	const REVIEWS = testimonialsData.reviews;
	const VIDEOS = testimonialsData.videos;
	const [activeVideo, setActiveVideo] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background pb-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommonHero, {
				title: "Testimonials",
				subtitle: "The stories of our travellers, verified by their unforgettable moments.",
				bgImage: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=1600&q=80"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto max-w-7xl px-4 py-20 sm:px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-8 lg:grid-cols-3 items-center rounded-[36px] bg-secondary p-8 md:p-12 border border-border shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center lg:border-r lg:border-border lg:pr-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold uppercase tracking-widest text-muted-foreground",
								children: "Overall Rating"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-2 font-display text-6xl font-bold text-ink",
								children: "4.9"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 flex justify-center gap-1 text-gold",
								children: Array.from({ length: 5 }).map((_, k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-6 w-6 fill-gold" }, k))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider",
								children: "Based on 10,000+ Google & Tripadvisor Reviews"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:col-span-2 lg:pl-4 space-y-3",
						children: [
							{
								rating: 5,
								pct: 92
							},
							{
								rating: 4,
								pct: 7
							},
							{
								rating: 3,
								pct: 1
							},
							{
								rating: 2,
								pct: 0
							},
							{
								rating: 1,
								pct: 0
							}
						].map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1 text-sm font-bold text-ink w-8",
									children: [
										row.rating,
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 fill-gold text-gold" })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex-1 h-3 rounded-full bg-border overflow-hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full bg-brand rounded-full",
										style: { width: `${row.pct}%` }
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs font-bold text-muted-foreground w-8 text-right",
									children: [row.pct, "%"]
								})
							]
						}, row.rating))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-7xl px-4 pb-20 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center mb-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-bold uppercase tracking-[0.3em] text-brand",
							children: "Vlogs"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl",
							children: "Video travel diaries"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-3 max-w-xl text-sm text-muted-foreground",
							children: "Watch short video summaries sent to us directly from our travellers on the ground."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
					children: VIDEOS.map((vid, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "group relative overflow-hidden rounded-[30px] aspect-[16/10] border border-border shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: vid.thumbnail,
							alt: vid.title,
							className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute inset-0 bg-black/35 flex flex-col justify-between p-5 text-white",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-auto rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-bold backdrop-blur",
								children: vid.duration
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between mt-auto",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 pr-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display font-semibold text-base truncate",
										children: vid.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-white/70 uppercase tracking-widest mt-0.5",
										children: "Verified vlog"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setActiveVideo(vid),
									className: "grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gold text-ink transition hover:scale-110 cursor-pointer shadow-lg",
									"aria-label": "Play video testimonial",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-5 w-5 fill-ink text-ink ml-0.5" })
								})]
							})]
						})]
					}, idx))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-7xl px-4 pb-20 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center mb-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-bold uppercase tracking-[0.3em] text-brand",
						children: "Reviews"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl",
						children: "Google style customer stories"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
					children: REVIEWS.map((rev, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
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
							delay: idx * .05
						},
						className: "group flex flex-col rounded-[32px] border border-border bg-white p-8 transition-shadow duration-300 hover:shadow-luxury",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: rev.avatar,
									alt: rev.name,
									className: "h-12 w-12 rounded-full border border-border object-cover"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-semibold text-ink leading-tight",
									children: rev.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground mt-0.5",
									children: rev.date
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex items-center justify-between border-y border-secondary py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex gap-0.5 text-gold",
									children: Array.from({ length: rev.rating }).map((_, k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 fill-gold text-gold" }, k))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5 shrink-0" }), " Verified Guest"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-5 text-sm leading-relaxed text-ink italic flex-1",
								children: [
									"\"",
									rev.quote,
									"\""
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 border-t border-secondary pt-4 text-xs font-bold text-brand uppercase tracking-wider",
								children: rev.trip
							})
						]
					}, idx))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: activeVideo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				className: "fixed inset-0 z-[95] grid place-items-center bg-black/90 p-4 backdrop-blur-sm",
				onClick: () => setActiveVideo(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative aspect-video max-w-4xl w-full bg-black rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center text-white",
					onClick: (e) => e.stopPropagation(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setActiveVideo(null),
						className: "absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full bg-black/60 text-white backdrop-blur hover:bg-black/80 cursor-pointer border border-white/10",
						"aria-label": "Close video",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
						src: activeVideo.src,
						poster: activeVideo.thumbnail,
						controls: true,
						autoPlay: true,
						className: "w-full h-full object-cover"
					})]
				})
			}) })
		]
	});
}
//#endregion
export { TestimonialsPage as component };
