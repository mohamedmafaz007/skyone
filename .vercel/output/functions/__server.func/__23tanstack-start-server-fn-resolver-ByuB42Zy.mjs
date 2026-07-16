//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-ByuB42Zy.js
var manifest = { "73c009d7d041c3de07336cdf45a35f93846d9780c429908a8bda0f134fca98f2": {
	functionName: "callGeminiServer_createServerFn_handler",
	importer: () => import("./_ssr/admin-CJ0pHeUl.mjs")
} };
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
