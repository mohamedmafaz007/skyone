import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { et as Compass, h as ShieldCheck } from "../_libs/lucide-react.mjs";
import { i as useAppData } from "./dataStore-DogEXO2o.mjs";
import { o as motion } from "../_libs/framer-motion.mjs";
import { t as CommonHero } from "./CommonHero-C4NUnhFB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-CNEbdiY6.js
var import_jsx_runtime = require_jsx_runtime();
function AboutPage() {
	const { about } = useAppData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background pb-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommonHero, {
				title: "About Us",
				subtitle: "A boutique travel studio obsessed with crafting unforgettable memories.",
				bgImage: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=80"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto max-w-7xl px-4 py-20 sm:px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-12 lg:grid-cols-2 lg:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							x: -30
						},
						whileInView: {
							opacity: 1,
							x: 0
						},
						viewport: { once: true },
						transition: { duration: .8 },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold uppercase tracking-[0.3em] text-brand",
								children: "Our Story"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl leading-tight",
								children: about.storyTitle
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 text-sm leading-relaxed text-muted-foreground sm:text-base whitespace-pre-line",
								children: (about.storyParagraphs || []).join("\n\n")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 grid grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl border border-border bg-white p-5 shadow-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-3xl font-bold text-brand",
										children: "10k+"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-1",
										children: "Delighted Guests"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl border border-border bg-white p-5 shadow-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-3xl font-bold text-gold",
										children: "4.9★"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-1",
										children: "Google Rating"
									})]
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							x: 30
						},
						whileInView: {
							opacity: 1,
							x: 0
						},
						viewport: { once: true },
						transition: { duration: .8 },
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative aspect-[4/3] overflow-hidden rounded-[36px] shadow-luxury",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
								alt: "Travellers exploring",
								className: "h-full w-full object-cover"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute -bottom-6 -left-6 rounded-3xl bg-white p-6 shadow-luxury max-w-xs border border-border hidden sm:block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs italic text-ink font-medium",
								children: "\"Our trip to Turkey was magical. The hot air balloons, the guides, and the round-the-clock support made it completely worry-free.\""
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-bold text-brand mt-3",
								children: "— Kabir M., Bengaluru"
							})]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-secondary py-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-7xl px-4 sm:px-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-8 md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 20
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: { once: true },
							className: "rounded-3xl bg-white p-8 border border-border shadow-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid h-12 w-12 place-items-center rounded-2xl bg-brand/10 text-brand mb-6",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "h-6 w-6" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-2xl font-semibold text-ink",
									children: "Our Mission"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm leading-relaxed text-muted-foreground",
									children: "To simplify international travel by combining expert destination consulting, seamless logistical support, and dedicated 24/7 human hospitality, enabling our guests to travel with absolute confidence."
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 20
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: { once: true },
							transition: { delay: .1 },
							className: "rounded-3xl bg-white p-8 border border-border shadow-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid h-12 w-12 place-items-center rounded-2xl bg-gold/20 text-gold-foreground mb-6",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-6 w-6" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-2xl font-semibold text-ink",
									children: "Our Vision"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm leading-relaxed text-muted-foreground",
									children: "To be recognized globally as the most trusted boutique travel studio, setting new benchmarks in customized holiday architecture, customer satisfaction, and reliable travel guidance."
								})
							]
						})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-7xl px-4 py-20 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-bold uppercase tracking-[0.3em] text-brand",
						children: "History Timeline"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl",
						children: ["Our journey over ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "italic text-gradient-brand",
							children: "the years"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative mt-16 before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-border md:before:left-1/2",
					children: about.timeline.map((item, idx) => {
						const isLeft = idx % 2 === 0;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative mb-12 flex flex-col md:flex-row items-start md:items-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute left-4 -translate-x-1/2 grid h-8 w-8 place-items-center rounded-full bg-brand text-white text-[10px] font-bold border-4 border-white shadow md:left-1/2 z-10",
									children: item.year.slice(-2)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `w-full md:w-1/2 pl-12 md:pl-0 ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12 md:left-1/2 md:absolute md:top-0"}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
										initial: {
											opacity: 0,
											y: 30
										},
										whileInView: {
											opacity: 1,
											y: 0
										},
										viewport: {
											once: true,
											margin: "-60px"
										},
										transition: { duration: .5 },
										className: "rounded-3xl border border-border bg-white p-6 shadow-sm hover:shadow-luxury transition-shadow duration-300",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-display text-sm font-extrabold text-brand tracking-widest block mb-1",
												children: item.year
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
												className: "font-display text-lg font-semibold text-ink",
												children: item.title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2 text-sm text-muted-foreground",
												children: item.desc
											})
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hidden md:block w-1/2 h-12" })
							]
						}, item.year);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-secondary py-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-4 sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold uppercase tracking-[0.3em] text-brand",
								children: "Our Team"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl",
								children: ["Meet our ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "italic text-gradient-brand",
									children: "travel specialists"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mx-auto mt-4 max-w-xl text-sm text-muted-foreground",
								children: "A passionate collective of ex-flight crew, hospitality experts, and destination heads dedicated to planning your perfect holiday."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
						children: about.team.map((member, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
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
								delay: i * .05
							},
							className: "group flex flex-col items-center text-center rounded-[30px] border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-luxury",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "relative h-28 w-28 overflow-hidden rounded-full border-4 border-secondary shadow-inner",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: member.avatar,
										alt: member.name,
										className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-5 font-display text-lg font-semibold text-ink",
									children: member.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-medium text-brand uppercase tracking-wider mt-0.5",
									children: member.role
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-xs text-muted-foreground leading-relaxed",
									children: member.bio
								})
							]
						}, member.name))
					})]
				})
			})
		]
	});
}
//#endregion
export { AboutPage as component };
