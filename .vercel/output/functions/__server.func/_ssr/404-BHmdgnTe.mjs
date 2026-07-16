import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link, m as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Map, V as House, et as Compass } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/404-BHmdgnTe.js
var import_jsx_runtime = require_jsx_runtime();
var Route = createFileRoute("/404")({ component: Custom404Page });
function Custom404Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-[75vh] flex-col items-center justify-center bg-background px-4 pb-20 pt-36 sm:pt-40",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto h-24 w-24",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 animate-ping rounded-full bg-brand/10" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative grid h-24 w-24 place-items-center rounded-full bg-brand/10 text-brand",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "h-12 w-12 animate-spin-slow text-brand" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-7xl font-extrabold tracking-tight text-brand",
							children: "404"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl font-bold text-ink",
							children: "Adventure Off-Course"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground leading-relaxed",
							children: "The path you are looking for has been hidden or relocated. Let us get you back to the main trail."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap justify-center gap-3 pt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-white shadow-luxury hover:brightness-110 transition cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "h-4 w-4" }), " Go back home"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/packages",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "inline-flex items-center gap-2 rounded-full border border-border bg-white px-6 py-3 text-sm font-bold text-ink hover:bg-secondary transition cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Map, { className: "h-4 w-4" }), " Browse Packages"]
						})
					})]
				})
			]
		})
	});
}
//#endregion
export { Route as n, Custom404Page as t };
