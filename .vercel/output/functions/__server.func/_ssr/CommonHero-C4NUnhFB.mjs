import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as motion } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/CommonHero-C4NUnhFB.js
var import_jsx_runtime = require_jsx_runtime();
function CommonHero({ title, subtitle, bgImage = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80", breadcrumb }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative h-[48vh] min-h-[360px] w-full overflow-hidden bg-ink text-white",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					scale: 1.05,
					opacity: .5
				},
				animate: {
					scale: 1,
					opacity: .85
				},
				transition: {
					duration: 1.2,
					ease: "easeOut"
				},
				className: "absolute inset-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: bgImage,
					alt: title,
					className: "h-full w-full object-cover"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-12 pt-28 sm:px-6 md:pb-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 30
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						duration: .8,
						delay: .1,
						ease: [
							.22,
							1,
							.36,
							1
						]
					},
					className: "max-w-3xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/",
									className: "hover:text-white transition-colors",
									children: "Home"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "/" }),
								breadcrumb ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: breadcrumb.includes("Packages") ? "/packages" : "/destinations",
									className: "hover:text-white transition-colors",
									children: breadcrumb.includes("Packages") ? "Packages" : "Destinations"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "/" })] }) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-white/60",
									children: title
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl",
							children: title
						}),
						subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 font-sans text-sm font-medium text-white/90 sm:text-base md:text-lg max-w-xl line-clamp-2",
							children: subtitle
						})
					]
				})
			})
		]
	});
}
//#endregion
export { CommonHero as t };
