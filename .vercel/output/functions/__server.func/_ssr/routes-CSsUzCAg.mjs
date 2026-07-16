import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as PlaneTakeoff, K as Globe, M as Mail, O as MessageCircle, d as Star, dt as Calendar, f as Sparkles, g as Send, j as MapPin, n as X, st as ChevronDown, vt as ArrowRight, w as Phone } from "../_libs/lucide-react.mjs";
import { i as useAppData, t as IconMap } from "./dataStore-DogEXO2o.mjs";
import { r as getSlug } from "./packageDetailsData-AeMTizGf.mjs";
import { a as useScroll, i as useMotionValue, n as useSpring, o as motion, r as useTransform, s as AnimatePresence, t as useInView } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CSsUzCAg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useCounter(target, inView, duration = 1800) {
	const [val, setVal] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (!inView) return;
		const start = performance.now();
		let raf = 0;
		const tick = (t) => {
			const p = Math.min(1, (t - start) / duration);
			const eased = 1 - Math.pow(1 - p, 3);
			setVal(Math.floor(eased * target));
			if (p < 1) raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [
		target,
		inView,
		duration
	]);
	return val;
}
function Reveal({ children, y = 24, delay = 0, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: {
			opacity: 0,
			y
		},
		whileInView: {
			opacity: 1,
			y: 0
		},
		viewport: {
			once: true,
			margin: "-80px"
		},
		transition: {
			duration: .7,
			delay,
			ease: [
				.22,
				1,
				.36,
				1
			]
		},
		className,
		children
	});
}
function MagneticButton({ children, variant = "primary", onClick, href, className = "", ariaLabel }) {
	const ref = (0, import_react.useRef)(null);
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const sx = useSpring(x, {
		stiffness: 180,
		damping: 15
	});
	const sy = useSpring(y, {
		stiffness: 180,
		damping: 15
	});
	const handleMove = (e) => {
		const el = ref.current;
		if (!el) return;
		const r = el.getBoundingClientRect();
		const relX = e.clientX - (r.left + r.width / 2);
		const relY = e.clientY - (r.top + r.height / 2);
		x.set(relX * .25);
		y.set(relY * .25);
	};
	const reset = () => {
		x.set(0);
		y.set(0);
	};
	const base = "relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-shadow will-change-transform overflow-hidden";
	const variants = {
		primary: "bg-brand text-brand-foreground shadow-luxury hover:shadow-2xl",
		gold: "bg-gold text-gold-foreground shadow-luxury hover:shadow-2xl",
		ghost: "text-ink hover:bg-white/60",
		outline: "border border-white/70 text-white hover:bg-white/10 backdrop-blur"
	};
	const inner = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "relative z-10 flex items-center gap-2",
		children
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
		"aria-hidden": true,
		className: "pointer-events-none absolute inset-0 -z-0 opacity-0 [background:radial-gradient(circle_at_var(--mx)_var(--my),white/40,transparent_60%)]"
	})] });
	const cls = `${base} ${variants[variant]} ${className}`;
	if (href) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.a, {
		ref,
		href,
		onMouseMove: handleMove,
		onMouseLeave: reset,
		style: {
			x: sx,
			y: sy
		},
		className: cls,
		"aria-label": ariaLabel,
		onClick,
		children: inner
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
		ref,
		type: "button",
		onMouseMove: handleMove,
		onMouseLeave: reset,
		style: {
			x: sx,
			y: sy
		},
		className: cls,
		"aria-label": ariaLabel,
		onClick,
		children: inner
	});
}
function Hero() {
	const containerRef = (0, import_react.useRef)(null);
	const { scrollY } = useScroll();
	const y = useTransform(scrollY, [0, 800], [0, 240]);
	const { destinations, home, addMessage } = useAppData();
	const [sent, setSent] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		destination: "",
		tripType: "",
		name: "",
		whatsapp: "",
		month: ""
	});
	const handleHeroSubmit = (e) => {
		e.preventDefault();
		addMessage({
			name: form.name,
			phone: form.whatsapp,
			email: "N/A (Form: Plan Your Trip)",
			destination: form.destination,
			service: form.tripType,
			travelDate: form.month,
			guests: "Not Specified",
			message: "Plan Your Trip inquiry submitted from homepage Hero form."
		});
		setSent(true);
		setTimeout(() => setSent(false), 4e3);
		setForm({
			destination: "",
			tripType: "",
			name: "",
			whatsapp: "",
			month: ""
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		ref: containerRef,
		className: "relative min-h-screen w-full overflow-hidden bg-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				style: { y },
				className: "absolute inset-0 h-[110%] w-full",
				children: [home.hero.bgType === "video" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					src: home.hero.bgUrl,
					autoPlay: true,
					loop: true,
					muted: true,
					playsInline: true,
					className: "h-full w-full object-cover opacity-60"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: home.hero.bgUrl || "/assets/hero-bg-DJYmkOX6.jpg",
					alt: "Luxury travel view",
					className: "h-full w-full object-cover opacity-60"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/40 to-[oklch(0.12_0.03_265)]" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute left-1/4 top-1/4 h-[40vw] w-[40vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/20 blur-[120px]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute right-1/4 bottom-1/4 h-[35vw] w-[35vw] translate-x-1/2 translate-y-1/2 rounded-full bg-gold/15 blur-[120px]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative mx-auto flex min-h-screen max-w-7xl items-center px-4 py-32 sm:px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-12 lg:grid-cols-[1fr_450px] lg:items-center w-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-2xl text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
							delay: .1,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-6 font-display text-5xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl leading-tight",
								children: home.hero.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 text-sm sm:text-base text-white/80 leading-relaxed max-w-xl",
								children: home.hero.subtitle
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
							delay: .2,
							className: "mt-10 flex flex-wrap gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/packages",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MagneticButton, {
									variant: "gold",
									children: ["Explore Packages ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/destinations",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MagneticButton, {
									variant: "outline",
									children: "View Destinations"
								})
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: .3,
						className: "w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass-dark border border-white/10 rounded-[32px] p-6 sm:p-8 space-y-6 shadow-2xl relative",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-2xl font-bold text-white tracking-wide",
										children: "Plan Your Trip"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-white/70 mt-1",
										children: "Tell us your preferences & we'll craft your dream journey"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: handleHeroSubmit,
									className: "space-y-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												value: form.destination,
												onChange: (e) => setForm({
													...form,
													destination: e.target.value
												}),
												required: true,
												className: "w-full bg-white/10 border border-white/20 text-white rounded-2xl px-4 py-3 text-xs outline-none focus:border-gold cursor-pointer transition appearance-none",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "",
													disabled: true,
													className: "bg-ink text-white",
													children: "Select Destination"
												}), destinations.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: d.name,
													className: "bg-ink text-white",
													children: d.name
												}, d.name))]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "pointer-events-none absolute inset-y-0 right-4 flex items-center text-white/60",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												value: form.tripType,
												onChange: (e) => setForm({
													...form,
													tripType: e.target.value
												}),
												required: true,
												className: "w-full bg-white/10 border border-white/20 text-white rounded-2xl px-4 py-3 text-xs outline-none focus:border-gold cursor-pointer transition appearance-none",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "",
														disabled: true,
														className: "bg-ink text-white",
														children: "Select Trip Type"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "Honeymoon",
														className: "bg-ink text-white",
														children: "Honeymoon"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "Adventure",
														className: "bg-ink text-white",
														children: "Adventure"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "Family",
														className: "bg-ink text-white",
														children: "Family Holiday"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "Group Tours",
														className: "bg-ink text-white",
														children: "Group Tour"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "Luxury Stay",
														className: "bg-ink text-white",
														children: "Luxury Stay"
													})
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "pointer-events-none absolute inset-y-0 right-4 flex items-center text-white/60",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											required: true,
											placeholder: "Your Name",
											value: form.name,
											onChange: (e) => setForm({
												...form,
												name: e.target.value
											}),
											className: "w-full bg-white/10 border border-white/20 text-white placeholder-white/60 rounded-2xl px-4 py-3 text-xs outline-none focus:border-gold transition"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "tel",
											required: true,
											placeholder: "WhatsApp Number",
											value: form.whatsapp,
											onChange: (e) => setForm({
												...form,
												whatsapp: e.target.value
											}),
											className: "w-full bg-white/10 border border-white/20 text-white placeholder-white/60 rounded-2xl px-4 py-3 text-xs outline-none focus:border-gold transition"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												value: form.month,
												onChange: (e) => setForm({
													...form,
													month: e.target.value
												}),
												required: true,
												className: "w-full bg-white/10 border border-white/20 text-white rounded-2xl px-4 py-3 text-xs outline-none focus:border-gold cursor-pointer transition appearance-none",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "",
													disabled: true,
													className: "bg-ink text-white",
													children: "Travel Month"
												}), [
													"January",
													"February",
													"March",
													"April",
													"May",
													"June",
													"July",
													"August",
													"September",
													"October",
													"November",
													"December"
												].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: m,
													className: "bg-ink text-white",
													children: m
												}, m))]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "pointer-events-none absolute inset-y-0 right-4 flex items-center text-white/60",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "submit",
											className: "w-full bg-[#0066fe] hover:bg-[#0055dd] text-white py-3.5 rounded-full font-bold transition shadow text-xs tracking-wider uppercase cursor-pointer text-center",
											children: sent ? "Inquiry Submitted!" : "Submit Inquiry"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-center pt-2 border-t border-white/10 flex justify-between text-[10px] text-white/50 tracking-wider font-semibold uppercase",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Instant Reply" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "24/7 Concierge Support" })]
								})
							]
						})
					})]
				})
			})
		]
	});
}
function TrustSection() {
	const { home } = useAppData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "trust",
		className: "relative bg-white py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-center text-xs uppercase tracking-[0.4em] text-brand",
				children: home.trustSection?.tagline || "Trusted worldwide"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mx-auto mt-3 max-w-3xl text-center text-3xl font-semibold text-ink sm:text-4xl",
				children: home.trustSection?.title || "Trusted by thousands of happy travellers"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5",
				children: home.trustBadges.map((b, i) => {
					const IconComponent = IconMap[b.icon] || Star;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: i * .05,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "group flex h-full flex-col items-center gap-3 rounded-3xl border border-border bg-white p-6 text-center transition hover:-translate-y-1 hover:border-brand/30 hover:shadow-luxury",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand to-[oklch(0.65_0.22_245)] text-white shadow-md transition group-hover:scale-110",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconComponent, { className: "h-6 w-6" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold text-ink",
								children: b.label
							})]
						})
					}, b.label);
				})
			})]
		})
	});
}
var CATEGORIES = [
	"All",
	"International",
	"Beach",
	"Adventure",
	"Luxury",
	"Family",
	"Honeymoon",
	"Group Tours"
];
function DestinationsSection() {
	const [cat, setCat] = (0, import_react.useState)("All");
	const { destinations, home } = useAppData();
	const filtered = (0, import_react.useMemo)(() => cat === "All" ? destinations.slice(0, 6) : destinations.filter((d) => d.tag === cat).slice(0, 6), [cat, destinations]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "destinations",
		className: "relative bg-secondary py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col justify-between gap-6 md:flex-row md:items-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.4em] text-brand",
						children: home.destinationsSection?.tagline || "Popular destinations"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 max-w-2xl font-display text-4xl font-semibold text-ink sm:text-5xl",
						children: home.destinationsSection?.title || "Handpicked corners of the world, worth every mile."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: .1,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-md text-muted-foreground",
							children: home.destinationsSection?.description || "From honeymoons in Bali to safaris in Kenya — 22+ international itineraries designed by specialists who've been there."
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: .15,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 flex flex-wrap gap-2",
						children: CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setCat(c),
							className: `relative rounded-full px-4 py-2 text-sm font-medium transition ${cat === c ? "text-white" : "text-ink hover:bg-white"}`,
							children: [cat === c && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
								layoutId: "cat-pill",
								className: "absolute inset-0 -z-10 rounded-full bg-brand shadow-luxury",
								transition: {
									type: "spring",
									stiffness: 350,
									damping: 30
								}
							}), c]
						}, c))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					className: "mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
						mode: "popLayout",
						children: filtered.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DestinationCard, {
							d,
							i
						}, d.name))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/destinations",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MagneticButton, {
							variant: "ghost",
							className: "!bg-white",
							children: ["View All Destinations ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
						})
					})
				})
			]
		})
	});
}
function DestinationCard({ d, i }) {
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
			delay: i % 6 * .05
		},
		className: "group relative isolate flex h-[440px] flex-col justify-end overflow-hidden rounded-[30px] shadow-luxury",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: d.image,
				alt: `${d.name} — ${d.country}`,
				loading: "lazy",
				className: "absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/30 to-black/10" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute left-5 top-5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-brand shadow",
				children: d.tag
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "absolute right-5 top-5 flex items-center gap-1 rounded-full bg-black/40 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3 fill-gold text-gold" }),
					" ",
					d.rating
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-dark m-4 rounded-2xl p-5 text-white",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-2xl font-semibold leading-tight",
								children: d.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 text-xs uppercase tracking-widest text-white/60",
								children: d.country
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-right shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] uppercase tracking-widest text-white/60",
								children: "From"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-xl font-semibold text-gold",
								children: d.price
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 line-clamp-2 text-sm text-white/80",
						children: d.blurb
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-medium text-white/70",
							children: d.duration
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: `/packages/${getSlug(d.name)}`,
							className: "inline-flex items-center gap-1 rounded-full bg-gold px-4 py-2 text-xs font-semibold text-ink transition hover:brightness-110 cursor-pointer",
							children: ["Explore ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3 w-3" })]
						})]
					})
				]
			})
		]
	});
}
function AboutSection() {
	const { services, testimonials: testimonialsData, home } = useAppData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "about",
		className: "relative bg-gradient-to-b from-white to-secondary py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative aspect-[4/5] overflow-hidden rounded-[36px] shadow-luxury",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: home.aboutSection?.image || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
							alt: "Traveller looking over the mountains",
							loading: "lazy",
							className: "h-full w-full object-cover"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute -bottom-8 -right-4 hidden w-64 rounded-3xl bg-white p-5 shadow-luxury sm:block",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] uppercase tracking-widest text-muted-foreground",
								children: "Trusted since"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-4xl font-semibold text-brand",
								children: home.aboutSection?.sinceYear || "2010"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 flex -space-x-2",
								children: testimonialsData.reviews.slice(0, 4).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: t.avatar,
									alt: "",
									className: "h-8 w-8 rounded-full border-2 border-white object-cover"
								}, t.name))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs text-muted-foreground",
								children: "10,000+ travellers · 4.9★"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute -left-4 top-6 hidden rounded-2xl bg-gold px-4 py-3 text-ink shadow-luxury animate-float sm:block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] uppercase tracking-widest",
							children: home.aboutSection?.badgeLabel || "Best Price"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg font-semibold",
							children: home.aboutSection?.badgeVal || "Guaranteed"
						})]
					})
				]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.4em] text-brand",
						children: home.aboutSection?.tagline || "Why SkyNow Holidays"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl",
						children: home.aboutSection?.title || "A boutique travel studio, obsessed with the details."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-xl text-muted-foreground",
						children: home.aboutSection?.description || "We're a small team of destination specialists, ex-flight crew, and hospitality veterans. We don't do templates — every itinerary is designed around you, and backed by 24/7 human support."
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2",
					children: services.slice(0, 8).map((f, i) => {
						const IconComponent = IconMap[f.icon] || Sparkles;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							delay: i * .04,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "group flex gap-3 rounded-2xl border border-border bg-white p-4 transition hover:-translate-y-1 hover:border-brand/40 hover:shadow-md",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand transition group-hover:bg-brand group-hover:text-white",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconComponent, { className: "h-5 w-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-semibold text-ink",
										children: f.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: f.desc
									})]
								})]
							})
						}, f.title);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: .2,
					className: "mt-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/about",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MagneticButton, {
							variant: "primary",
							children: ["Learn More About Us ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
						})
					})
				})
			] })]
		})
	});
}
function Stat({ value, suffix, label }) {
	const ref = (0, import_react.useRef)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		className: "rounded-3xl border border-white/15 bg-white/5 p-6 text-center backdrop-blur",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "font-display text-4xl font-semibold text-white sm:text-5xl",
			children: [useCounter(value, useInView(ref, {
				once: true,
				margin: "-80px"
			})).toLocaleString(), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-gold",
				children: suffix
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm uppercase tracking-widest text-white/70",
			children: label
		})]
	});
}
function StatsSection() {
	const { home } = useAppData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden bg-[oklch(0.15_0.05_265)] py-20 text-white",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:32px_32px]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 sm:px-6 lg:grid-cols-4",
			children: home.stats.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, { ...s }, s.label))
		})]
	});
}
function Gallery() {
	const [lightbox, setLightbox] = (0, import_react.useState)(null);
	const { galleryImages: galleryItems, home } = useAppData();
	const travelDiaries = home?.travelDiaries || {};
	const diariesImages = travelDiaries.images && travelDiaries.images.length > 0 ? travelDiaries.images : galleryItems.map((item) => item.url);
	const half = Math.ceil(diariesImages.length / 2);
	const row1 = diariesImages.slice(0, half);
	const row2 = diariesImages.slice(half);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "gallery",
		className: "bg-white py-24 overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-7xl px-4 sm:px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col justify-between gap-6 md:flex-row md:items-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.4em] text-brand font-bold",
						children: travelDiaries.tagline || "Travel diaries"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl leading-tight",
						children: travelDiaries.title || "Moments from our travellers' cameras."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-md text-muted-foreground",
						children: travelDiaries.description || "Real photos from real trips. Every frame here started as an enquiry — could yours be next?"
					})]
				}) })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 space-y-6",
				children: [row1.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "group overflow-hidden py-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex w-max animate-marquee gap-4 pr-4 group-hover:[animation-play-state:paused]",
						children: [
							...row1,
							...row1,
							...row1
						].map((src, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setLightbox(src),
							className: "relative h-48 w-72 sm:h-56 sm:w-80 overflow-hidden rounded-3xl cursor-pointer shrink-0 shadow-md transition duration-500 hover:scale-102 hover:shadow-lg hover:border hover:border-gold/30",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src,
								alt: "Traveller snapshot",
								loading: "lazy",
								className: "h-full w-full object-cover transition-transform duration-[800ms] hover:scale-110"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" })]
						}, src + "-r1-" + idx))
					})
				}), row2.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "group overflow-hidden py-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex w-max animate-marquee-reverse gap-4 pr-4 group-hover:[animation-play-state:paused]",
						children: [
							...row2,
							...row2,
							...row2
						].map((src, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setLightbox(src),
							className: "relative h-48 w-72 sm:h-56 sm:w-80 overflow-hidden rounded-3xl cursor-pointer shrink-0 shadow-md transition duration-500 hover:scale-102 hover:shadow-lg hover:border hover:border-gold/30",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src,
								alt: "Traveller snapshot",
								loading: "lazy",
								className: "h-full w-full object-cover transition-transform duration-[800ms] hover:scale-110"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" })]
						}, src + "-r2-" + idx))
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-7xl px-4 sm:px-6 mt-12 text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/gallery",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MagneticButton, {
						variant: "gold",
						children: ["Explore Full Gallery ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: lightbox && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				className: "fixed inset-0 z-[95] grid place-items-center bg-black/85 p-4 backdrop-blur-sm",
				onClick: () => setLightbox(null),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
					initial: {
						scale: .9,
						opacity: 0
					},
					animate: {
						scale: 1,
						opacity: 1
					},
					exit: {
						scale: .9,
						opacity: 0
					},
					src: lightbox,
					alt: "",
					className: "max-h-[85vh] max-w-full rounded-3xl object-contain shadow-2xl"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setLightbox(null),
					className: "absolute right-6 top-6 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20 cursor-pointer",
					"aria-label": "Close",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
				})]
			}) })
		]
	});
}
function Testimonials() {
	const { testimonials: testimonialsData } = useAppData();
	const reviews = testimonialsData.reviews;
	const loopTestimonials = [
		...reviews,
		...reviews,
		...reviews
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "testimonials",
		className: "relative overflow-hidden bg-gradient-to-br from-secondary to-white py-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -top-20 left-1/2 h-72 w-[600px] -translate-x-1/2 rounded-full bg-brand/10 blur-3xl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative mx-auto max-w-7xl px-4 text-center sm:px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-[0.4em] text-brand",
					children: "What travellers say"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl",
					children: [
						"10,000 stories.",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "italic text-gradient-brand",
							children: "One promise kept."
						})
					]
				})] })
			}),
			loopTestimonials.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "group mt-16 overflow-hidden py-4 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex w-max animate-marquee-reverse gap-6 pr-6 group-hover:[animation-play-state:paused]",
					children: loopTestimonials.map((t, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-[350px] sm:w-[420px] shrink-0 bg-white rounded-[32px] p-6 sm:p-8 border border-border shadow-sm flex flex-col gap-5 transition-transform duration-300 hover:scale-102 hover:shadow-luxury cursor-pointer",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-1 text-gold",
								children: Array.from({ length: t.rating || 5 }).map((_, k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 fill-gold text-gold" }, k))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-display text-sm sm:text-base leading-relaxed text-ink italic flex-1 line-clamp-4",
								children: [
									"\"",
									t.quote,
									"\""
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3.5 border-t border-secondary pt-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: t.avatar,
									alt: t.name,
									className: "h-11 w-11 rounded-full border border-white object-cover shadow"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs sm:text-sm font-semibold text-ink leading-tight",
										children: t.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] sm:text-xs text-muted-foreground mt-0.5",
										children: t.trip
									})]
								})]
							})
						]
					}, t.name + "-" + idx))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-7xl px-4 sm:px-6 mt-12 text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/testimonials",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MagneticButton, {
						variant: "gold",
						className: "!bg-white shadow",
						children: ["Read Verified Reviews ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
					})
				})
			})
		]
	});
}
function HowItWorks() {
	const { home } = useAppData();
	const steps = home.howItWorks?.steps || [
		{
			n: "01",
			t: "Choose Destination",
			d: "Pick from 22+ curated destinations or tell us your dream."
		},
		{
			n: "02",
			t: "Customise Your Trip",
			d: "A specialist crafts an itinerary tailored to your pace & budget."
		},
		{
			n: "03",
			t: "Book The Package",
			d: "Lock it in with a small deposit — flights, stays, visas handled."
		},
		{
			n: "04",
			t: "Enjoy Your Vacation",
			d: "24/7 concierge on WhatsApp from take-off to homecoming."
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-white py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-[0.4em] text-brand",
					children: home.howItWorks?.tagline || "How it works"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl",
					children: home.howItWorks?.title || "Four steps to take-off."
				})]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mt-16 grid gap-6 md:grid-cols-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute left-8 right-8 top-10 hidden h-px bg-gradient-to-r from-brand/0 via-brand/30 to-brand/0 md:block" }), steps.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i * .1,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "group relative flex h-full flex-col rounded-3xl border border-border bg-white p-6 transition hover:-translate-y-1 hover:shadow-luxury",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative mb-4 flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand to-[oklch(0.65_0.22_245)] font-display text-lg font-semibold text-white shadow-luxury",
									children: s.n
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaneTakeoff, { className: "h-5 w-5 text-gold" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-xl font-semibold text-ink",
								children: s.t
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: s.d
							})
						]
					})
				}, s.n))]
			})]
		})
	});
}
function FAQ() {
	const [open, setOpen] = (0, import_react.useState)(0);
	const { faqs, home } = useAppData();
	const previewFaqs = faqs.slice(0, 4);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "faq",
		className: "bg-secondary py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-[0.4em] text-brand",
					children: home.faqSection?.tagline || "FAQ"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl",
					children: home.faqSection?.title || "Questions, answered."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-sm text-muted-foreground",
					children: home.faqSection?.description || "Can't find what you're looking for? Our concierge team is a WhatsApp message away."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/contact",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MagneticButton, {
							variant: "primary",
							children: "Talk to a specialist"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/faq",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MagneticButton, {
							variant: "outline",
							className: "border-brand text-brand hover:bg-brand/10",
							children: "View All FAQs"
						})
					})]
				})
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-3",
				children: previewFaqs.map((f, i) => {
					const isOpen = open === i;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: i * .05,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `overflow-hidden rounded-3xl border transition ${isOpen ? "border-brand/40 bg-white shadow-luxury" : "border-border bg-white"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setOpen(isOpen ? null : i),
								className: "flex w-full items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer",
								"aria-expanded": isOpen,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-lg font-medium text-ink",
									children: f.q
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `grid h-9 w-9 shrink-0 place-items-center rounded-full transition ${isOpen ? "bg-brand text-white rotate-180" : "bg-secondary text-ink"}`,
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
										className: "px-6 pb-6 text-sm text-muted-foreground",
										children: f.a
									})
								})
							})]
						})
					}, f.q);
				})
			})]
		})
	});
}
function Contact() {
	const [sent, setSent] = (0, import_react.useState)(false);
	const { contact, addMessage, destinations, home } = useAppData();
	const handleContactSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const name = formData.get("name");
		const phone = formData.get("phone");
		const email = formData.get("email");
		const selectEl = e.currentTarget.querySelector("select");
		const destination = selectEl ? selectEl.value : "";
		const textareaEl = e.currentTarget.querySelector("textarea");
		const message = textareaEl ? textareaEl.value : "";
		addMessage({
			name,
			phone,
			email,
			destination,
			service: "Standard Holiday Tour",
			travelDate: "Not Specified",
			guests: "Not Specified",
			message: message || "Contact form inquiry submitted from homepage."
		});
		setSent(true);
		setTimeout(() => setSent(false), 4e3);
		e.currentTarget.reset();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "contact",
		className: "relative overflow-hidden bg-white py-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-brand/10 blur-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-[0.4em] text-brand",
					children: home.contactSection?.tagline || "Get in touch"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl",
					children: home.contactSection?.title || "Let's design your next great trip."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-md text-muted-foreground",
					children: home.contactSection?.description || "Share a few details and a destination specialist will call you back within 24 hours with a personalised itinerary."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid gap-3",
					children: [
						{
							icon: MapPin,
							label: "Office",
							value: contact.address
						},
						{
							icon: Phone,
							label: "Phone",
							value: contact.phone,
							href: `tel:${contact.phone}`
						},
						{
							icon: MessageCircle,
							label: "WhatsApp",
							value: "Chat 24/7",
							href: contact.whatsapp
						},
						{
							icon: Mail,
							label: "Email",
							value: contact.email,
							href: `mailto:${contact.email}`
						},
						{
							icon: Globe,
							label: "Website",
							value: contact.website,
							href: contact.website.startsWith("http") ? contact.website : `https://${contact.website}`
						},
						{
							icon: Calendar,
							label: "Hours",
							value: contact.hours
						}
					].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: r.href ?? "#",
						target: r.href?.startsWith("http") ? "_blank" : void 0,
						rel: "noreferrer",
						className: "group flex items-center gap-4 rounded-2xl border border-border bg-white p-4 transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-11 w-11 place-items-center rounded-xl bg-brand/10 text-brand transition group-hover:bg-brand group-hover:text-white",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(r.icon, { className: "h-5 w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] uppercase tracking-widest text-muted-foreground",
								children: r.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm font-medium text-ink",
								children: r.value
							})]
						})]
					}, r.label))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 overflow-hidden rounded-3xl border border-border shadow-md",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
						title: "Office map",
						src: contact.mapIframe,
						className: "h-64 w-full border-0",
						loading: "lazy",
						referrerPolicy: "no-referrer-when-downgrade"
					})
				})
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: .1,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleContactSubmit,
					className: "glass rounded-[36px] p-6 shadow-luxury sm:p-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Full Name",
									name: "name",
									placeholder: "Your name",
									required: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Phone",
									name: "phone",
									placeholder: "+91 …",
									type: "tel",
									required: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Email",
									name: "email",
									placeholder: "you@email.com",
									type: "email",
									required: true,
									className: "sm:col-span-2"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-[10px] font-semibold uppercase tracking-widest text-muted-foreground",
										children: "Destination"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										className: "mt-1 w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-ink outline-none focus:border-brand",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "Select a destination"
										}), destinations.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: d.name,
											children: d.name
										}, d.name))]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-[10px] font-semibold uppercase tracking-widest text-muted-foreground",
										children: "Message"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										rows: 4,
										placeholder: "Tell us about your dream trip…",
										className: "mt-1 w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-ink outline-none focus:border-brand"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 text-sm font-semibold text-white shadow-luxury transition hover:brightness-110 cursor-pointer",
							children: sent ? "Thank you — we'll be in touch!" : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								"Send Enquiry",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-center text-xs text-muted-foreground",
							children: "By submitting, you agree to be contacted by SkyNow Holidays."
						})
					]
				})
			})]
		})]
	});
}
function Field({ label, name, placeholder, type = "text", required, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			htmlFor: name,
			className: "text-[10px] font-semibold uppercase tracking-widest text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			id: name,
			name,
			type,
			required,
			placeholder,
			className: "mt-1 w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-brand"
		})]
	});
}
function DestMarquee() {
	const items = [
		"Bhutan",
		"Sri Lanka",
		"Bahrain",
		"Baku Azerbaijan",
		"Maldives",
		"Bali",
		"Singapore & Malaysia",
		"Dubai",
		"Thailand",
		"Vietnam",
		"Cambodia & Vietnam",
		"Japan",
		"Europe",
		"Turkey",
		"Uzbekistan"
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-hidden border-y border-white/10 bg-[#0B1528] py-8 sm:py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex w-max animate-marquee gap-12 pr-12",
			children: [...items, ...items].map((n, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center gap-4 whitespace-nowrap font-display text-2xl sm:text-4xl font-bold uppercase tracking-wider text-white",
				children: [
					n,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-gold font-light animate-pulse",
						children: "✦"
					})
				]
			}, i))
		})
	});
}
function SkyNowHome() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustSection, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DestinationsSection, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DestMarquee, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AboutSection, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatsSection, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gallery, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Testimonials, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HowItWorks, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FAQ, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Contact, {})
		]
	});
}
var SplitComponent = SkyNowHome;
//#endregion
export { SplitComponent as component };
