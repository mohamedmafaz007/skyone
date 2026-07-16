import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { X as Eye, at as ChevronRight, n as X, ot as ChevronLeft } from "../_libs/lucide-react.mjs";
import { i as useAppData } from "./dataStore-DogEXO2o.mjs";
import { o as motion, s as AnimatePresence } from "../_libs/framer-motion.mjs";
import { t as CommonHero } from "./CommonHero-C4NUnhFB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gallery-CcnmBRKx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CATEGORIES = [
	"All",
	"Asia",
	"Europe",
	"Beach",
	"Adventure",
	"Luxury"
];
function GalleryPage() {
	const { galleryImages: galleryItems, gallerySection } = useAppData();
	const [cat, setCat] = (0, import_react.useState)("All");
	const [lightboxIndex, setLightboxIndex] = (0, import_react.useState)(null);
	const [displayedImages, setDisplayedImages] = (0, import_react.useState)(() => {
		return galleryItems.map((item) => item.url).slice(0, 6);
	});
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [hasMore, setHasMore] = (0, import_react.useState)(() => galleryItems.length > 6);
	const filteredUrls = (0, import_react.useMemo)(() => {
		if (cat === "All") return galleryItems.map((item) => item.url);
		return galleryItems.filter((item) => item.category.toLowerCase() === cat.toLowerCase()).map((item) => item.url);
	}, [cat, galleryItems]);
	(0, import_react.useEffect)(() => {
		setDisplayedImages(filteredUrls.slice(0, 6));
		setHasMore(filteredUrls.length > 6);
	}, [cat, filteredUrls]);
	const handleLoadMore = () => {
		if (loading || !hasMore) return;
		setLoading(true);
		setTimeout(() => {
			const currentLength = displayedImages.length;
			const nextBatch = filteredUrls.slice(currentLength, currentLength + 4);
			setDisplayedImages((prev) => [...prev, ...nextBatch]);
			setLoading(false);
			if (currentLength + nextBatch.length >= filteredUrls.length) setHasMore(false);
		}, 1e3);
	};
	const handlePrev = (e) => {
		e.stopPropagation();
		if (lightboxIndex === null) return;
		setLightboxIndex((prev) => prev === 0 ? displayedImages.length - 1 : (prev ?? 0) - 1);
	};
	const handleNext = (e) => {
		e.stopPropagation();
		if (lightboxIndex === null) return;
		setLightboxIndex((prev) => prev === displayedImages.length - 1 ? 0 : (prev ?? 0) + 1);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background pb-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommonHero, {
				title: gallerySection?.title || "Gallery",
				subtitle: gallerySection?.subtitle || "Unfiltered frames from our travellers' journeys across five continents.",
				bgImage: gallerySection?.bgImage || "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1600&q=80"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-7xl px-4 py-20 sm:px-6",
				children: [
					(gallerySection?.travelDiariesTitle || gallerySection?.travelDiariesSubtitle) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center mb-10",
						children: [gallerySection?.travelDiariesTitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-3xl font-bold text-ink mb-2",
							children: gallerySection.travelDiariesTitle
						}), gallerySection?.travelDiariesSubtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-base text-ink/60",
							children: gallerySection.travelDiariesSubtitle
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap justify-center gap-2 mb-12",
						children: CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setCat(c),
							className: `relative rounded-full px-5 py-2.5 text-sm font-semibold transition-all cursor-pointer ${cat === c ? "text-white" : "text-ink hover:bg-secondary border border-border"}`,
							children: [cat === c && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
								layoutId: "gallery-pill",
								className: "absolute inset-0 -z-10 rounded-full bg-brand shadow-luxury",
								transition: {
									type: "spring",
									stiffness: 350,
									damping: 30
								}
							}), c]
						}, c))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
							mode: "popLayout",
							children: displayedImages.map((src, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
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
								transition: { duration: .4 },
								className: "group relative overflow-hidden rounded-[30px] aspect-[4/3] shadow-sm hover:shadow-luxury cursor-pointer border border-border",
								onClick: () => setLightboxIndex(idx),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src,
									alt: "Travel diary",
									loading: "lazy",
									className: "h-full w-full object-cover transition-transform duration-[800ms] group-hover:scale-110"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid h-12 w-12 place-items-center rounded-full bg-white/20 backdrop-blur text-white transition hover:scale-110",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-5 w-5" })
									})
								})]
							}, src + idx))
						})
					}),
					loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4",
						children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aspect-[4/3] rounded-[30px] bg-secondary animate-pulse" }, i))
					}),
					hasMore && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-12 text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: handleLoadMore,
							className: "rounded-full bg-brand px-6 py-3 text-sm font-bold text-white shadow-luxury hover:brightness-110 transition cursor-pointer",
							children: "Load More Moments"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: lightboxIndex !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				className: "fixed inset-0 z-[95] grid place-items-center bg-black/90 p-4 backdrop-blur-sm",
				onClick: () => setLightboxIndex(null),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex items-center justify-center max-w-5xl w-full",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: handlePrev,
							className: "absolute left-4 z-10 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20 transition cursor-pointer",
							"aria-label": "Previous image",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-6 w-6" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
							initial: {
								scale: .95,
								opacity: 0
							},
							animate: {
								scale: 1,
								opacity: 1
							},
							exit: {
								scale: .95,
								opacity: 0
							},
							src: displayedImages[lightboxIndex],
							alt: "Enlarged view",
							className: "max-h-[80vh] max-w-full rounded-3xl object-contain shadow-2xl"
						}, lightboxIndex),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: handleNext,
							className: "absolute right-4 z-10 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20 transition cursor-pointer",
							"aria-label": "Next image",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-6 w-6" })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setLightboxIndex(null),
					className: "absolute right-6 top-6 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20 transition cursor-pointer",
					"aria-label": "Close lightbox",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
				})]
			}) })
		]
	});
}
//#endregion
export { GalleryPage as component };
