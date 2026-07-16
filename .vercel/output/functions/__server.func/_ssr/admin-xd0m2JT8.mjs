import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-CIHAFgYl.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-ByuB42Zy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-xd0m2JT8.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var $$splitComponentImporter = () => import("./admin-CiWjHrT9.mjs");
var Route = createFileRoute("/admin")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var callGeminiServer = createServerFn({ method: "POST" }).validator((d) => d).handler(createSsrRpc("73c009d7d041c3de07336cdf45a35f93846d9780c429908a8bda0f134fca98f2"));
//#endregion
export { callGeminiServer as n, Route as t };
