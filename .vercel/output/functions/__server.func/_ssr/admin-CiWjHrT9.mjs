import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as Image, D as MessageSquare, E as Package, I as LayoutDashboard, J as FileText, K as Globe, L as Layers, N as Lock, P as LockOpen, Q as Download, T as Pen, V as House, X as Eye, _ as Search, at as ChevronRight, b as Plus, c as TriangleAlert, d as Star, et as Compass, ft as Briefcase, i as Users, j as MapPin, k as Menu, l as TrendingUp, lt as ChartNoAxesColumn, mt as Bell, n as X, nt as CircleQuestionMark, o as Upload, r as Video, rt as CircleCheck, u as Trash2, ut as Camera, v as Save, w as Phone, y as RefreshCw, yt as Activity, z as Inbox } from "../_libs/lucide-react.mjs";
import { i as useAppData, n as STATIC_DEFAULTS, t as IconMap } from "./dataStore-DogEXO2o.mjs";
import { r as getSlug, t as generateFallbackDetails } from "./packageDetailsData-AeMTizGf.mjs";
import { o as motion, s as AnimatePresence } from "../_libs/framer-motion.mjs";
import { n as callGeminiServer } from "./admin-xd0m2JT8.mjs";
import { t as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-CiWjHrT9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var S = {
	card: "bg-white rounded-2xl border border-slate-100 shadow-sm",
	cardHeader: "flex items-center justify-between px-6 py-4 border-b border-slate-100",
	cardBody: "p-6",
	label: "block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5",
	input: "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition placeholder-slate-400",
	textarea: "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition resize-none placeholder-slate-400",
	select: "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition",
	btnPrimary: "flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all cursor-pointer",
	btnSecondary: "flex items-center gap-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 active:scale-95 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all cursor-pointer",
	btnDanger: "flex items-center gap-2 rounded-xl bg-red-50 hover:bg-red-100 active:scale-95 px-4 py-2.5 text-sm font-semibold text-red-600 transition-all cursor-pointer",
	btnSuccess: "flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all cursor-pointer",
	sectionTitle: "text-sm font-bold text-slate-800 uppercase tracking-wide",
	badge: "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold"
};
function ConfirmModal({ title, description, confirmLabel = "Delete", confirmClass = "bg-red-600 hover:bg-red-700 text-white", onConfirm, onCancel }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-[200] flex items-center justify-center p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 bg-slate-900/50 backdrop-blur-sm",
			onClick: onCancel
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				scale: .96
			},
			animate: {
				opacity: 1,
				scale: 1
			},
			exit: {
				opacity: 0,
				scale: .96
			},
			className: "relative z-10 w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-12 w-12 items-center justify-center rounded-full bg-red-50 mb-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-6 w-6 text-red-500" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-lg font-bold text-slate-900",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1.5 text-sm text-slate-500",
					children: description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onCancel,
						className: S.btnSecondary + " flex-1 justify-center",
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onConfirm,
						className: `flex-1 justify-center flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold shadow-sm transition-all cursor-pointer active:scale-95 ${confirmClass}`,
						children: confirmLabel
					})]
				})
			]
		})]
	});
}
function FileUploader({ label, value, onChange, required }) {
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [dragOver, setDragOver] = (0, import_react.useState)(false);
	const inputRef = (0, import_react.useRef)(null);
	const processFile = (file) => {
		if (file.size > 1.5 * 1024 * 1024) {
			toast.error("File too large! Max 1.5MB.");
			return;
		}
		setLoading(true);
		const reader = new FileReader();
		reader.onload = (e) => {
			if (e.target?.result) {
				onChange(e.target.result);
				toast.success("Uploaded!");
			}
			setLoading(false);
		};
		reader.onerror = () => {
			toast.error("Failed to read file.");
			setLoading(false);
		};
		reader.readAsDataURL(file);
	};
	const handleDrop = (e) => {
		e.preventDefault();
		setDragOver(false);
		const file = e.dataTransfer.files?.[0];
		if (file) processFile(file);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: S.label,
				children: [label, required && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-red-500 ml-1",
					children: "*"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "text",
				value,
				onChange: (e) => onChange(e.target.value),
				placeholder: "Paste URL or drag & drop / click to upload",
				className: S.input
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				onDragOver: (e) => {
					e.preventDefault();
					setDragOver(true);
				},
				onDragLeave: () => setDragOver(false),
				onDrop: handleDrop,
				onClick: () => inputRef.current?.click(),
				className: `flex items-center justify-center gap-3 rounded-xl border-2 border-dashed py-4 cursor-pointer transition-all ${dragOver ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-blue-400 hover:bg-slate-50"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: inputRef,
						type: "file",
						accept: "image/*,video/*",
						className: "hidden",
						onChange: (e) => {
							const f = e.target.files?.[0];
							if (f) processFile(f);
						}
					}),
					loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-5 w-5 animate-spin text-blue-500" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-5 w-5 text-slate-400" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-slate-500",
						children: loading ? "Uploading..." : "Drop file here or click to browse"
					})
				]
			}),
			value && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3",
				children: [
					value.startsWith("data:image") || value.startsWith("http") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: value,
						alt: "Preview",
						className: "h-12 w-12 rounded-lg object-cover border border-slate-200"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-12 w-12 rounded-lg bg-slate-200 flex items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "h-5 w-5 text-slate-500" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium text-slate-700 truncate",
							children: value.startsWith("data:") ? "Uploaded file (base64)" : value
						}), value.startsWith("data:") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] text-amber-600 mt-0.5",
							children: "⚠ Base64 uses localStorage space"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => onChange(""),
						className: "shrink-0 p-1 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
					})
				]
			})
		]
	});
}
function FormField({ label, required, children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: S.label,
			children: [label, required && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500 ml-1",
				children: "*"
			})]
		}), children]
	});
}
function AdminSection({ title, icon: Icon, children, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: S.card,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: S.cardHeader,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2.5",
				children: [Icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 text-blue-600" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-bold text-slate-800",
					children: title
				})]
			}), action]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: S.cardBody,
			children
		})]
	});
}
function StorageGauge() {
	const [size, setSize] = (0, import_react.useState)("0.00");
	const [percent, setPercent] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (typeof window !== "undefined") {
			let total = 0;
			for (const x in localStorage) if (localStorage.hasOwnProperty(x)) total += (localStorage[x].length + x.length) * 2;
			const mb = total / 1024 / 1024;
			setSize(mb.toFixed(2));
			setPercent(Math.min(100, mb / 5 * 100));
		}
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: S.card + " p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between mb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartNoAxesColumn, { className: "h-4 w-4 text-slate-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-semibold text-slate-700",
						children: "LocalStorage Usage"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: `text-xs font-bold font-mono ${percent > 85 ? "text-red-600" : percent > 60 ? "text-amber-600" : "text-blue-600"}`,
					children: [
						size,
						" / 5.00 MB (",
						percent.toFixed(0),
						"%)"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-2 w-full bg-slate-100 rounded-full overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `h-full rounded-full transition-all duration-500 ${percent > 85 ? "bg-red-500" : percent > 60 ? "bg-amber-500" : "bg-blue-500"}`,
					style: { width: `${percent}%` }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2.5 text-[11px] text-slate-500 leading-relaxed",
				children: "⚠️ Max 5MB. For large media use external URLs instead of direct file uploads."
			})
		]
	});
}
function StatCard({ label, value, icon: Icon, color, subtitle }) {
	const colorMap = {
		blue: {
			bg: "bg-blue-50",
			text: "text-blue-700",
			icon: "text-blue-500"
		},
		gold: {
			bg: "bg-amber-50",
			text: "text-amber-700",
			icon: "text-amber-500"
		},
		green: {
			bg: "bg-emerald-50",
			text: "text-emerald-700",
			icon: "text-emerald-500"
		},
		purple: {
			bg: "bg-violet-50",
			text: "text-violet-700",
			icon: "text-violet-500"
		},
		red: {
			bg: "bg-red-50",
			text: "text-red-700",
			icon: "text-red-500"
		},
		slate: {
			bg: "bg-slate-100",
			text: "text-slate-700",
			icon: "text-slate-500"
		}
	};
	const c = colorMap[color] || colorMap.blue;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: S.card + " p-5 flex items-start gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `shrink-0 flex h-11 w-11 items-center justify-center rounded-xl ${c.bg}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `h-5 w-5 ${c.icon}` })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold text-slate-500 uppercase tracking-wide",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: `mt-0.5 text-2xl font-bold font-mono ${c.text}`,
				children: value
			}),
			subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] text-slate-400 mt-0.5",
				children: subtitle
			})
		] })]
	});
}
function MiniBarChart({ data, label }) {
	const max = Math.max(...data.map((d) => d.value), 1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-end gap-2 h-28",
		children: data.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 flex flex-col items-center gap-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-full rounded-t-md bg-blue-500 transition-all duration-700",
				style: {
					height: `${d.value / max * 100}%`,
					minHeight: 4
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[9px] text-slate-400 font-medium",
				children: d.label
			})]
		}, i))
	})] });
}
function AdminPage() {
	const navigate = useNavigate();
	const appData = useAppData();
	const [isAuthenticated, setIsAuthenticated] = (0, import_react.useState)(false);
	const [username, setUsername] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [activeTab, setActiveTab] = (0, import_react.useState)("dashboard");
	const [sidebarOpen, setSidebarOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (typeof window !== "undefined") {
			if (sessionStorage.getItem("skynow_admin_auth") === "true") setIsAuthenticated(true);
		}
	}, []);
	const handleLogin = (e) => {
		e.preventDefault();
		if (username === "admin" && password === "admin123") {
			setIsAuthenticated(true);
			if (typeof window !== "undefined") sessionStorage.setItem("skynow_admin_auth", "true");
			toast.success("Welcome back, Administrator!");
		} else toast.error("Invalid credentials. Use: admin / admin123");
	};
	const handleLogout = () => {
		setIsAuthenticated(false);
		if (typeof window !== "undefined") sessionStorage.removeItem("skynow_admin_auth");
		toast.info("Logged out successfully.");
	};
	if (!appData.isMounted) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-slate-50",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3 text-slate-600",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "h-8 w-8 animate-spin text-blue-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-base font-medium",
				children: "Loading admin panel..."
			})]
		})
	});
	if (!isAuthenticated) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 px-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute inset-0 overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: {
				opacity: 0,
				y: 24
			},
			animate: {
				opacity: 1,
				y: 0
			},
			className: "relative z-10 w-full max-w-md",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-8 shadow-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center mb-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/30",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-7 w-7 text-white" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-3xl font-bold text-white",
							children: "Admin Panel"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-blue-200/70",
							children: "SkyNow Holidays — CMS Access"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleLogin,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs font-semibold uppercase tracking-wide text-blue-200/60 block mb-1.5",
							children: "Username"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							required: true,
							value: username,
							onChange: (e) => setUsername(e.target.value),
							placeholder: "admin",
							className: "w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-blue-400 focus:bg-white/15 transition"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs font-semibold uppercase tracking-wide text-blue-200/60 block mb-1.5",
							children: "Password"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "password",
							required: true,
							value: password,
							onChange: (e) => setPassword(e.target.value),
							placeholder: "••••••••",
							className: "w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-blue-400 focus:bg-white/15 transition"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "w-full mt-2 rounded-xl bg-blue-600 hover:bg-blue-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition-all active:scale-98",
							children: "Sign In to Dashboard"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-center text-[11px] text-blue-200/40 mt-2",
							children: [
								"Demo: ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-blue-300",
									children: "admin"
								}),
								" / ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-blue-300",
									children: "admin123"
								})
							]
						})
					]
				})]
			})
		})]
	});
	const NAV_SECTIONS = [
		{
			label: "Main",
			items: [{
				id: "dashboard",
				label: "Dashboard",
				icon: LayoutDashboard,
				badge: appData.messages.filter((m) => !m.read).length || null
			}]
		},
		{
			label: "Content",
			items: [
				{
					id: "home",
					label: "Home Page",
					icon: House
				},
				{
					id: "packages",
					label: "Packages & Places",
					icon: MapPin
				},
				{
					id: "services",
					label: "Services",
					icon: Briefcase
				},
				{
					id: "about",
					label: "About Us",
					icon: Users
				},
				{
					id: "gallery",
					label: "Gallery",
					icon: Image
				},
				{
					id: "testimonials",
					label: "Testimonials",
					icon: MessageSquare
				},
				{
					id: "faqs",
					label: "FAQ",
					icon: CircleQuestionMark
				}
			]
		},
		{
			label: "Settings",
			items: [{
				id: "contact",
				label: "Contact Info",
				icon: Phone
			}]
		}
	];
	const PAGE_TITLES = {
		dashboard: {
			title: "Dashboard",
			breadcrumb: "Overview"
		},
		home: {
			title: "Home Page Editor",
			breadcrumb: "Content / Home"
		},
		packages: {
			title: "Packages & Places",
			breadcrumb: "Content / Packages"
		},
		services: {
			title: "Services Manager",
			breadcrumb: "Content / Services"
		},
		about: {
			title: "About Us Editor",
			breadcrumb: "Content / About"
		},
		gallery: {
			title: "Gallery Manager",
			breadcrumb: "Content / Gallery"
		},
		testimonials: {
			title: "Testimonials",
			breadcrumb: "Content / Testimonials"
		},
		faqs: {
			title: "FAQ Manager",
			breadcrumb: "Content / FAQ"
		},
		contact: {
			title: "Contact Info",
			breadcrumb: "Settings / Contact"
		}
	};
	const current = PAGE_TITLES[activeTab] || PAGE_TITLES.dashboard;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen bg-slate-50 font-sans",
		children: [
			sidebarOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-40 bg-slate-900/50 lg:hidden",
				onClick: () => setSidebarOpen(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: `fixed top-0 left-0 h-full w-64 z-50 bg-slate-900 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between px-5 py-5 border-b border-white/5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "h-4 w-4 text-white" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-bold text-white leading-none",
								children: "SkyNow"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-slate-400 mt-0.5",
								children: "Admin Panel"
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setSidebarOpen(false),
							className: "lg:hidden p-1 rounded-lg hover:bg-white/5 text-slate-400",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-5 py-3 border-b border-white/5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-semibold uppercase tracking-widest text-emerald-400",
								children: "Live System Online"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex-1 overflow-y-auto py-4 px-3 space-y-5",
						children: NAV_SECTIONS.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "px-3 mb-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-500",
							children: section.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-0.5",
							children: section.items.map((item) => {
								const Icon = item.icon;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => {
										setActiveTab(item.id);
										setSidebarOpen(false);
									},
									className: `group flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${activeTab === item.id ? "bg-blue-600 text-white shadow-md shadow-blue-600/20" : "text-slate-400 hover:bg-white/5 hover:text-white"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 shrink-0" }), item.label]
									}), "badge" in item && item.badge ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white min-w-[18px] text-center",
										children: item.badge
									}) : null]
								}, item.id);
							})
						})] }, section.label))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-3 py-4 border-t border-white/5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5 mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold text-white",
									children: "A"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold text-white truncate",
									children: "Administrator"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-slate-400 truncate",
									children: "admin@skynow.in"
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: handleLogout,
							className: "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockOpen, { className: "h-4 w-4" }), "Sign Out"]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 lg:ml-64 flex flex-col min-h-screen",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-slate-200 bg-white px-4 sm:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setSidebarOpen(true),
							className: "lg:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-50 transition",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5 text-slate-600" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-base font-bold text-slate-900 truncate",
								children: current.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Admin" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3 w-3" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: current.breadcrumb })
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-50 transition",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-4 w-4 text-slate-600" }), appData.messages.filter((m) => !m.read).length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center",
										children: appData.messages.filter((m) => !m.read).length
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => navigate({ to: "/" }),
									className: "flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-50 transition",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4 text-slate-600" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "hidden sm:flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 cursor-pointer",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-bold text-white",
										children: "A"
									})
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex-1 p-4 sm:p-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
						mode: "wait",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 8
							},
							animate: {
								opacity: 1,
								y: 0
							},
							exit: {
								opacity: 0,
								y: -8
							},
							transition: { duration: .2 },
							className: "space-y-6",
							children: [
								activeTab === "dashboard" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardTab, { appData }),
								activeTab === "home" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeTab, { appData }),
								activeTab === "packages" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackagesTab, { appData }),
								activeTab === "services" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServicesTab, { appData }),
								activeTab === "about" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AboutTab, { appData }),
								activeTab === "gallery" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GalleryTab, { appData }),
								activeTab === "testimonials" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TestimonialsTab, { appData }),
								activeTab === "faqs" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaqsTab, { appData }),
								activeTab === "contact" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactTab, { appData })
							]
						}, activeTab)
					})
				})]
			})
		]
	});
}
function DashboardTab({ appData }) {
	const totalPkgs = appData.destinations.length;
	const totalReviews = appData.testimonials.reviews.length + appData.testimonials.videos.length;
	const totalFAQs = appData.faqs.length;
	const totalGallery = appData.galleryImages.length;
	const unread = appData.messages.filter((m) => !m.read).length;
	const totalMsg = appData.messages.length;
	const [confirmDeleteId, setConfirmDeleteId] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-2xl font-bold text-slate-900",
				children: "Welcome back, Administrator 👋"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-slate-500 mt-1",
				children: "Here's what's happening with SkyNow Holidays today."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Packages",
						value: totalPkgs,
						icon: MapPin,
						color: "blue",
						subtitle: "Active destinations"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Reviews",
						value: totalReviews,
						icon: Star,
						color: "gold",
						subtitle: "Customer testimonials"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "FAQ Topics",
						value: totalFAQs,
						icon: CircleQuestionMark,
						color: "purple",
						subtitle: "Help articles"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Gallery",
						value: totalGallery,
						icon: Image,
						color: "green",
						subtitle: "Media items"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Messages",
						value: totalMsg,
						icon: Inbox,
						color: "slate",
						subtitle: `${unread} unread`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Unread",
						value: unread,
						icon: Bell,
						color: unread > 0 ? "red" : "green",
						subtitle: unread > 0 ? "Action needed" : "All caught up!"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSection, {
					title: "Weekly Enquiry Activity",
					icon: TrendingUp,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniBarChart, {
						data: [
							{
								label: "Mon",
								value: 12
							},
							{
								label: "Tue",
								value: 19
							},
							{
								label: "Wed",
								value: 7
							},
							{
								label: "Thu",
								value: 25
							},
							{
								label: "Fri",
								value: 32
							},
							{
								label: "Sat",
								value: 45
							},
							{
								label: "Sun",
								value: 28
							}
						],
						label: "Enquiries by day (sample data)"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSection, {
					title: "Content Summary",
					icon: Layers,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: [
							{
								label: "Tour Packages",
								val: totalPkgs,
								max: 50,
								color: "bg-blue-500"
							},
							{
								label: "Gallery Images",
								val: totalGallery,
								max: 100,
								color: "bg-violet-500"
							},
							{
								label: "Client Reviews",
								val: totalReviews,
								max: 30,
								color: "bg-amber-500"
							},
							{
								label: "FAQ Entries",
								val: totalFAQs,
								max: 30,
								color: "bg-emerald-500"
							}
						].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-xs mb-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-slate-600",
								children: item.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold text-slate-800",
								children: item.val
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-1.5 w-full bg-slate-100 rounded-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `h-full rounded-full ${item.color}`,
								style: { width: `${Math.min(100, item.val / item.max * 100)}%` }
							})
						})] }, item.label))
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StorageGauge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSection, {
				title: `Visitor Enquiries Inbox (${totalMsg})`,
				icon: Inbox,
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `${S.badge} ${unread > 0 ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"}`,
					children: unread > 0 ? `${unread} unread` : "All read"
				}),
				children: appData.messages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center py-16 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inbox, { className: "h-12 w-12 text-slate-200 mb-3" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-slate-400",
							children: "No enquiries yet"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-slate-300 mt-1",
							children: "Submit a contact form on the website to test."
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: appData.messages.map((msg) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `rounded-xl border p-4 transition-all ${msg.read ? "border-slate-100 bg-white" : "border-blue-200 bg-blue-50"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${msg.read ? "bg-slate-100 text-slate-500" : "bg-blue-100 text-blue-700"}`,
										children: msg.name?.charAt(0) || "?"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm font-semibold text-slate-900 flex items-center gap-2",
										children: [msg.name, !msg.read && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-blue-500" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-slate-500 mt-0.5 font-mono",
										children: [
											msg.email,
											" · ",
											msg.phone
										]
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2 shrink-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => appData.markMessageRead(msg.id, !msg.read),
										className: "rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition",
										children: msg.read ? "Mark Unread" : "Mark Read"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setConfirmDeleteId(msg.id),
										className: "rounded-lg bg-red-50 p-1.5 text-red-500 hover:bg-red-100 transition",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-slate-100 pt-3",
								children: [
									{
										l: "Destination",
										v: msg.destination || "—"
									},
									{
										l: "Service",
										v: msg.service || "General"
									},
									{
										l: "Travel Date",
										v: msg.travelDate || "—"
									},
									{
										l: "Guests",
										v: msg.guests || "1"
									}
								].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] font-semibold uppercase tracking-wide text-slate-400",
									children: f.l
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold text-slate-700 mt-0.5",
									children: f.v
								})] }, f.l))
							}),
							msg.message && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 rounded-lg bg-slate-50 border border-slate-100 p-3 text-xs text-slate-600 leading-relaxed",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] font-bold uppercase tracking-wide text-slate-400 mb-1",
									children: "Message"
								}), msg.message]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-[10px] text-slate-400",
								children: msg.timestamp
							})
						]
					}, msg.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: confirmDeleteId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmModal, {
				title: "Delete enquiry?",
				description: "This message will be permanently removed.",
				confirmLabel: "Delete",
				onConfirm: () => {
					appData.deleteMessage(confirmDeleteId);
					toast.info("Message deleted.");
					setConfirmDeleteId(null);
				},
				onCancel: () => setConfirmDeleteId(null)
			}) })
		]
	});
}
function HomeTab({ appData }) {
	const [heroTitle, setHeroTitle] = (0, import_react.useState)(appData.home.hero.title);
	const [heroSubtitle, setHeroSubtitle] = (0, import_react.useState)(appData.home.hero.subtitle);
	const [heroBgType, setHeroBgType] = (0, import_react.useState)(appData.home.hero.bgType);
	const [heroBgUrl, setHeroBgUrl] = (0, import_react.useState)(appData.home.hero.bgUrl);
	const [stats, setStats] = (0, import_react.useState)(appData.home.stats);
	const [trustBadges, setTrustBadges] = (0, import_react.useState)(appData.home.trustBadges);
	const [partnerLogos, setPartnerLogos] = (0, import_react.useState)(appData.home.partnerLogos);
	const [newLogo, setNewLogo] = (0, import_react.useState)("");
	const [trustTagline, setTrustTagline] = (0, import_react.useState)(appData.home.trustSection?.tagline || "Trusted worldwide");
	const [trustTitle, setTrustTitle] = (0, import_react.useState)(appData.home.trustSection?.title || "Trusted by thousands of happy travellers");
	const [destTagline, setDestTagline] = (0, import_react.useState)(appData.home.destinationsSection?.tagline || "Popular destinations");
	const [destTitle, setDestTitle] = (0, import_react.useState)(appData.home.destinationsSection?.title || "Handpicked corners of the world");
	const [destDescription, setDestDescription] = (0, import_react.useState)(appData.home.destinationsSection?.description || "");
	const [packTagline, setPackTagline] = (0, import_react.useState)(appData.home.packagesSection?.tagline || "Featured packages");
	const [packTitle, setPackTitle] = (0, import_react.useState)(appData.home.packagesSection?.title || "Ready-to-go itineraries, infinitely customisable.");
	const [aboutTagline, setAboutTagline] = (0, import_react.useState)(appData.home.aboutSection?.tagline || "Why SkyNow Holidays");
	const [aboutTitle, setAboutTitle] = (0, import_react.useState)(appData.home.aboutSection?.title || "A boutique travel studio.");
	const [aboutDescription, setAboutDescription] = (0, import_react.useState)(appData.home.aboutSection?.description || "");
	const [aboutImage, setAboutImage] = (0, import_react.useState)(appData.home.aboutSection?.image || "");
	const [aboutSinceYear, setAboutSinceYear] = (0, import_react.useState)(appData.home.aboutSection?.sinceYear || "2010");
	const [aboutBadgeLabel, setAboutBadgeLabel] = (0, import_react.useState)(appData.home.aboutSection?.badgeLabel || "Best Price");
	const [aboutBadgeVal, setAboutBadgeVal] = (0, import_react.useState)(appData.home.aboutSection?.badgeVal || "Guaranteed");
	const [howTagline, setHowTagline] = (0, import_react.useState)(appData.home.howItWorks?.tagline || "How it works");
	const [howTitle, setHowTitle] = (0, import_react.useState)(appData.home.howItWorks?.title || "Four steps to take-off.");
	const [howSteps, setHowSteps] = (0, import_react.useState)(appData.home.howItWorks?.steps || []);
	const [faqTagline, setFaqTagline] = (0, import_react.useState)(appData.home.faqSection?.tagline || "FAQ");
	const [faqTitle, setFaqTitle] = (0, import_react.useState)(appData.home.faqSection?.title || "Questions, answered.");
	const [faqDescription, setFaqDescription] = (0, import_react.useState)(appData.home.faqSection?.description || "");
	const [contactTagline, setContactTagline] = (0, import_react.useState)(appData.home.contactSection?.tagline || "Get in touch");
	const [contactTitle, setContactTitle] = (0, import_react.useState)(appData.home.contactSection?.title || "Let's design your next great trip.");
	const [contactDescription, setContactDescription] = (0, import_react.useState)(appData.home.contactSection?.description || "");
	const [tdTagline, setTdTagline] = (0, import_react.useState)(appData.home.travelDiaries?.tagline || "Travel diaries");
	const [tdTitle, setTdTitle] = (0, import_react.useState)(appData.home.travelDiaries?.title || "Moments from our travellers' cameras.");
	const [tdDescription, setTdDescription] = (0, import_react.useState)(appData.home.travelDiaries?.description || "Real photos from real trips. Every frame here started as an enquiry — could yours be next?");
	const [tdImages, setTdImages] = (0, import_react.useState)(appData.home.travelDiaries?.images && appData.home.travelDiaries.images.length > 0 ? appData.home.travelDiaries.images : appData.galleryImages.map((g) => g.url));
	const handleSaveHero = () => {
		handleSaveAllChanges();
	};
	const handleSaveStats = () => {
		handleSaveAllChanges();
	};
	const handleSaveBadges = () => {
		handleSaveAllChanges();
	};
	const handleAddLogo = () => {
		if (!newLogo.trim()) return;
		const updated = [...partnerLogos, newLogo.trim()];
		setPartnerLogos(updated);
		setNewLogo("");
		toast.success("Logo added locally! Click Save Changes to save.");
	};
	const handleDeleteLogo = (i) => {
		const updated = partnerLogos.filter((_, j) => j !== i);
		setPartnerLogos(updated);
		toast.info("Logo removed locally. Click Save Changes to save.");
	};
	const handleSaveAllSections = () => {
		handleSaveAllChanges();
	};
	const handleSaveAllChanges = () => {
		appData.updateHome({
			hero: {
				title: heroTitle,
				subtitle: heroSubtitle,
				bgType: heroBgType,
				bgUrl: heroBgUrl
			},
			stats,
			trustBadges,
			partnerLogos,
			trustSection: {
				tagline: trustTagline,
				title: trustTitle
			},
			destinationsSection: {
				tagline: destTagline,
				title: destTitle,
				description: destDescription
			},
			packagesSection: {
				tagline: packTagline,
				title: packTitle
			},
			aboutSection: {
				tagline: aboutTagline,
				title: aboutTitle,
				description: aboutDescription,
				image: aboutImage,
				sinceYear: aboutSinceYear,
				badgeLabel: aboutBadgeLabel,
				badgeVal: aboutBadgeVal
			},
			howItWorks: {
				tagline: howTagline,
				title: howTitle,
				steps: howSteps
			},
			faqSection: {
				tagline: faqTagline,
				title: faqTitle,
				description: faqDescription
			},
			contactSection: {
				tagline: contactTagline,
				title: contactTitle,
				description: contactDescription
			},
			travelDiaries: {
				tagline: tdTagline,
				title: tdTitle,
				description: tdDescription,
				images: tdImages
			}
		});
		toast.success("Home page changes saved successfully!");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-bold text-slate-900",
					children: "Home Page Editor"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-slate-500 mt-1",
					children: "Update hero content, counters, partner logos, trust badges, and section headings."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: handleSaveAllChanges,
					className: S.btnSuccess,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), " Save Changes"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminSection, {
				title: "Hero Section",
				icon: House,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-5 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							label: "Hero Title",
							className: "sm:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: heroTitle,
								onChange: (e) => setHeroTitle(e.target.value),
								className: S.input
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							label: "Hero Subtitle",
							className: "sm:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								rows: 2,
								value: heroSubtitle,
								onChange: (e) => setHeroSubtitle(e.target.value),
								className: S.textarea
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							label: "Background Media Type",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: heroBgType,
								onChange: (e) => setHeroBgType(e.target.value),
								className: S.select,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "image",
									children: "Still Image"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "video",
									children: "Background Video"
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUploader, {
							label: "Hero Background Media",
							value: heroBgUrl,
							onChange: (v) => setHeroBgUrl(v)
						}) })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 flex gap-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleSaveHero,
						className: S.btnPrimary,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), " Save Hero"]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminSection, {
				title: "Statistics & Counters",
				icon: ChartNoAxesColumn,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2 md:grid-cols-4",
					children: stats.map((stat, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-slate-100 bg-slate-50 p-4 space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs font-bold text-slate-400 uppercase",
								children: ["Counter ", idx + 1]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								label: "Value",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									value: stat.value,
									onChange: (e) => {
										const u = [...stats];
										u[idx].value = parseInt(e.target.value) || 0;
										setStats(u);
									},
									className: S.input
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								label: "Suffix",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: stat.suffix,
									onChange: (e) => {
										const u = [...stats];
										u[idx].suffix = e.target.value;
										setStats(u);
									},
									className: S.input
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								label: "Label",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: stat.label,
									onChange: (e) => {
										const u = [...stats];
										u[idx].label = e.target.value;
										setStats(u);
									},
									className: S.input
								})
							})
						]
					}, idx))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleSaveStats,
						className: S.btnPrimary,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), " Save Stats"]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminSection, {
				title: "Trust Badges",
				icon: CircleCheck,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2 md:grid-cols-5",
					children: trustBadges.map((badge, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-slate-100 bg-slate-50 p-4 space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs font-bold text-slate-400 uppercase",
								children: ["Badge ", idx + 1]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								label: "Icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: badge.icon,
									onChange: (e) => {
										const u = [...trustBadges];
										u[idx].icon = e.target.value;
										setTrustBadges(u);
									},
									className: S.select,
									children: Object.keys(IconMap).map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: k,
										children: k
									}, k))
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								label: "Label",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: badge.label,
									onChange: (e) => {
										const u = [...trustBadges];
										u[idx].label = e.target.value;
										setTrustBadges(u);
									},
									className: S.input
								})
							})
						]
					}, idx))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleSaveBadges,
						className: S.btnPrimary,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), " Save Badges"]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminSection, {
				title: "Partner Brand Logos",
				icon: Globe,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-3 mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						value: newLogo,
						onChange: (e) => setNewLogo(e.target.value),
						placeholder: "Partner name (e.g. Qantas)",
						className: S.input + " max-w-xs"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleAddLogo,
						className: S.btnPrimary,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Add"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: partnerLogos.map((logo, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-700",
						children: [logo, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => handleDeleteLogo(idx),
							className: "hover:text-red-500 transition",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" })
						})]
					}, idx))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminSection, {
				title: "Section Headers & Descriptions",
				icon: FileText,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold text-blue-600 uppercase tracking-wider mb-4",
							children: "1. Trust Section"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								label: "Tagline",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: trustTagline,
									onChange: (e) => setTrustTagline(e.target.value),
									className: S.input
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								label: "Title",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: trustTitle,
									onChange: (e) => setTrustTitle(e.target.value),
									className: S.input
								})
							})]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "border-slate-100" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold text-blue-600 uppercase tracking-wider mb-4",
							children: "2. Destinations Section"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									label: "Tagline",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: destTagline,
										onChange: (e) => setDestTagline(e.target.value),
										className: S.input
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									label: "Title",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: destTitle,
										onChange: (e) => setDestTitle(e.target.value),
										className: S.input
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									label: "Description",
									className: "sm:col-span-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										rows: 2,
										value: destDescription,
										onChange: (e) => setDestDescription(e.target.value),
										className: S.textarea
									})
								})
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "border-slate-100" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold text-blue-600 uppercase tracking-wider mb-4",
							children: "3. Packages Section"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								label: "Tagline",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: packTagline,
									onChange: (e) => setPackTagline(e.target.value),
									className: S.input
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								label: "Title",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: packTitle,
									onChange: (e) => setPackTitle(e.target.value),
									className: S.input
								})
							})]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "border-slate-100" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold text-blue-600 uppercase tracking-wider mb-4",
							children: "4. About Section"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									label: "Tagline",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: aboutTagline,
										onChange: (e) => setAboutTagline(e.target.value),
										className: S.input
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									label: "Title",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: aboutTitle,
										onChange: (e) => setAboutTitle(e.target.value),
										className: S.input
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									label: "Description",
									className: "sm:col-span-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										rows: 3,
										value: aboutDescription,
										onChange: (e) => setAboutDescription(e.target.value),
										className: S.textarea
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUploader, {
									label: "Representative Image",
									value: aboutImage,
									onChange: (v) => setAboutImage(v)
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
											label: "Since Year",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: aboutSinceYear,
												onChange: (e) => setAboutSinceYear(e.target.value),
												className: S.input
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
											label: "Badge Label",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: aboutBadgeLabel,
												onChange: (e) => setAboutBadgeLabel(e.target.value),
												className: S.input
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
											label: "Badge Value",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: aboutBadgeVal,
												onChange: (e) => setAboutBadgeVal(e.target.value),
												className: S.input
											})
										})
									]
								})
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "border-slate-100" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-bold text-blue-600 uppercase tracking-wider mb-4",
								children: "5. How It Works"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2 mb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									label: "Tagline",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: howTagline,
										onChange: (e) => setHowTagline(e.target.value),
										className: S.input
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									label: "Title",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: howTitle,
										onChange: (e) => setHowTitle(e.target.value),
										className: S.input
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-3 sm:grid-cols-2",
								children: howSteps.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-slate-100 bg-slate-50 p-4 space-y-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs font-bold text-amber-600 uppercase",
											children: ["Step ", step.n]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
											label: "Title",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: step.t,
												onChange: (e) => {
													const u = [...howSteps];
													u[i].t = e.target.value;
													setHowSteps(u);
												},
												className: S.input
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
											label: "Description",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: step.d,
												onChange: (e) => {
													const u = [...howSteps];
													u[i].d = e.target.value;
													setHowSteps(u);
												},
												className: S.input
											})
										})
									]
								}, i))
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "border-slate-100" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold text-blue-600 uppercase tracking-wider mb-4",
							children: "6. FAQ Section"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									label: "Tagline",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: faqTagline,
										onChange: (e) => setFaqTagline(e.target.value),
										className: S.input
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									label: "Title",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: faqTitle,
										onChange: (e) => setFaqTitle(e.target.value),
										className: S.input
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									label: "Description",
									className: "sm:col-span-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: faqDescription,
										onChange: (e) => setFaqDescription(e.target.value),
										className: S.input
									})
								})
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "border-slate-100" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold text-blue-600 uppercase tracking-wider mb-4",
							children: "7. Contact Section"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									label: "Tagline",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: contactTagline,
										onChange: (e) => setContactTagline(e.target.value),
										className: S.input
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									label: "Title",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: contactTitle,
										onChange: (e) => setContactTitle(e.target.value),
										className: S.input
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									label: "Description",
									className: "sm:col-span-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: contactDescription,
										onChange: (e) => setContactDescription(e.target.value),
										className: S.input
									})
								})
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "border-slate-100" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-bold text-blue-600 uppercase tracking-wider mb-4",
								children: "8. Travel Diaries Section (Home Page)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2 mb-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										label: "Tagline",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											value: tdTagline,
											onChange: (e) => setTdTagline(e.target.value),
											className: S.input
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										label: "Title",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											value: tdTitle,
											onChange: (e) => setTdTitle(e.target.value),
											className: S.input
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										label: "Description",
										className: "sm:col-span-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											rows: 2,
											value: tdDescription,
											onChange: (e) => setTdDescription(e.target.value),
											className: S.textarea
										})
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormField, {
								label: "Diary Images",
								children: [tdImages.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid gap-3 grid-cols-2 sm:grid-cols-4 md:grid-cols-6 mb-3",
									children: tdImages.map((imgUrl, imgIdx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative aspect-square rounded-xl overflow-hidden border border-slate-200 group bg-slate-100",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: imgUrl,
											alt: "",
											className: "w-full h-full object-cover"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setTdImages(tdImages.filter((_, i) => i !== imgIdx)),
											className: "absolute top-1.5 right-1.5 p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition shadow",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" })
										})]
									}, imgIdx))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUploader, {
									label: "Upload / Add Image to Home Travel Diaries",
									value: "",
									onChange: (val) => {
										if (val) setTdImages([...tdImages, val]);
									}
								})]
							})
						] })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 pt-5 border-t border-slate-100",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleSaveAllSections,
						className: S.btnPrimary,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), " Save All Section Texts"]
					})
				})]
			})
		]
	});
}
function PackagesTab({ appData }) {
	const [destinations, setDestinations] = (0, import_react.useState)(appData.destinations);
	const [db, setDb] = (0, import_react.useState)(appData.destinationDetailsDb);
	const [activeSlug, setActiveSlug] = (0, import_react.useState)(null);
	const [searchQ, setSearchQ] = (0, import_react.useState)("");
	const [filterTag, setFilterTag] = (0, import_react.useState)("All");
	const [confirmDelete, setConfirmDelete] = (0, import_react.useState)(null);
	const [aiPastedText, setAiPastedText] = (0, import_react.useState)("");
	const [aiFileName, setAiFileName] = (0, import_react.useState)("");
	const [aiFile, setAiFile] = (0, import_react.useState)(null);
	const [aiParsing, setAiParsing] = (0, import_react.useState)(false);
	const [aiApplied, setAiApplied] = (0, import_react.useState)(false);
	const aiFileRef = (0, import_react.useRef)(null);
	const emptyDetails = {
		overview: "",
		highlights: [""],
		itinerary: [{
			day: "Day 1",
			title: "",
			desc: ""
		}],
		inclusions: [""],
		exclusions: [""],
		hotels: [{
			name: "",
			stars: 5,
			location: ""
		}],
		transportation: "",
		visaInfo: "",
		bestTime: "",
		faqs: [{
			q: "",
			a: ""
		}],
		images: []
	};
	const fileToBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				const base64String = reader.result.split(",")[1];
				resolve(base64String);
			};
			reader.onerror = (error) => reject(error);
		});
	};
	const readTxtText = (file) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = (e) => resolve(e.target?.result || "");
			reader.onerror = () => reject(/* @__PURE__ */ new Error("Failed to read text file"));
			reader.readAsText(file, "utf-8");
		});
	};
	const loadMammoth = () => {
		return new Promise((resolve, reject) => {
			if (window.mammoth) {
				resolve(window.mammoth);
				return;
			}
			const script = document.createElement("script");
			script.src = "https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js";
			script.onload = () => resolve(window.mammoth);
			script.onerror = () => reject(/* @__PURE__ */ new Error("Failed to load mammoth library"));
			document.head.appendChild(script);
		});
	};
	const readDocxText = async (file) => {
		const mammoth = await loadMammoth();
		const arrayBuffer = await file.arrayBuffer();
		return (await mammoth.extractRawText({ arrayBuffer })).value || "";
	};
	const applyGeminiResult = (res) => {
		if (!activeSlug) return;
		const destFields = {};
		if (res.name) destFields.name = res.name;
		if (res.country) destFields.country = res.country;
		if (res.duration) destFields.duration = res.duration;
		if (res.price) destFields.price = res.price;
		if (res.blurb) destFields.blurb = res.blurb;
		const detailsFields = {
			overview: res.overview || "",
			highlights: Array.isArray(res.highlights) ? res.highlights : [""],
			itinerary: Array.isArray(res.itinerary) ? res.itinerary.map((it) => ({
				day: it.day || "Day 1",
				title: it.title || "",
				desc: it.desc || ""
			})) : [{
				day: "Day 1",
				title: "",
				desc: ""
			}],
			inclusions: Array.isArray(res.inclusions) ? res.inclusions : [""],
			exclusions: Array.isArray(res.exclusions) ? res.exclusions : [""],
			hotels: Array.isArray(res.hotels) ? res.hotels.map((h) => ({
				name: h.name || "",
				stars: parseInt(h.stars) || 5,
				location: h.location || ""
			})) : [{
				name: "",
				stars: 5,
				location: ""
			}],
			transportation: res.transportation || "",
			visaInfo: res.visaInfo || "",
			bestTime: res.bestTime || ""
		};
		const nextSlug = destFields.name ? getSlug(destFields.name) : activeSlug;
		const newDests = destinations.map((d) => {
			if (getSlug(d.name) === activeSlug) return {
				...d,
				...destFields
			};
			return d;
		});
		const targetDest = destinations.find((d) => getSlug(d.name) === activeSlug);
		const updatedDetails = {
			...db[activeSlug] || (targetDest ? generateFallbackDetails(targetDest) : emptyDetails),
			...detailsFields
		};
		const newDb = { ...db };
		if (nextSlug !== activeSlug) {
			newDb[nextSlug] = updatedDetails;
			delete newDb[activeSlug];
			setActiveSlug(nextSlug);
		} else newDb[activeSlug] = updatedDetails;
		setDestinations(newDests);
		setDb(newDb);
		setAiApplied(true);
	};
	const handleAiFileUpload = async (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		setAiFile(file);
		setAiFileName(file.name);
		setAiApplied(false);
		if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) {
			setAiPastedText("[PDF File Loaded - click Analyze to process document with Gemini]");
			toast.info(`PDF file "${file.name}" loaded successfully.`);
		} else if (file.name.endsWith(".docx") || file.name.endsWith(".doc")) {
			setAiParsing(true);
			try {
				const text = await readDocxText(file);
				setAiPastedText(text);
				toast.success(`Word document "${file.name}" text extracted successfully.`);
			} catch (err) {
				console.error(err);
				toast.error("Failed to parse Word document. Please try copying and pasting text.");
			} finally {
				setAiParsing(false);
			}
		} else {
			setAiParsing(true);
			try {
				const text = await readTxtText(file);
				setAiPastedText(text);
				toast.success(`Text file "${file.name}" loaded successfully.`);
			} catch (err) {
				console.error(err);
				toast.error("Failed to read text file.");
			} finally {
				setAiParsing(false);
			}
		}
		if (aiFileRef.current) aiFileRef.current.value = "";
	};
	const handleAiAnalyze = async () => {
		if (!activeSlug) {
			toast.error("Select or create a package first.");
			return;
		}
		setAiParsing(true);
		setAiApplied(false);
		try {
			let resultData = null;
			if (aiFile && (aiFile.type === "application/pdf" || aiFile.name.toLowerCase().endsWith(".pdf"))) resultData = await callGeminiServer({ data: { base64Pdf: await fileToBase64(aiFile) } });
			else {
				const textToAnalyze = aiPastedText.trim();
				if (!textToAnalyze) throw new Error("No text to analyze. Paste text or upload a file first.");
				resultData = await callGeminiServer({ data: { text: textToAnalyze } });
			}
			applyGeminiResult(resultData);
			toast.success("✅ Package details auto-filled! Review the fields below and click Save Changes.");
		} catch (err) {
			console.error("Gemini analysis error:", err);
			toast.error(err.message || "Analysis failed. Make sure GEMINI_API_KEY is configured in your .env file.");
		} finally {
			setAiParsing(false);
		}
	};
	const handleConvertToPdf = () => {
		if (!activeSlug || !activeDest) {
			toast.error("Select a package first.");
			return;
		}
		const win = window.open("", "_blank");
		if (!win) return;
		const d = activeDetails;
		win.document.write(`<html><head><title>${activeDest.name}</title>
      <style>body{font-family:sans-serif;padding:40px;color:#111} h1{font-size:24px} h2{font-size:18px;margin-top:24px;border-bottom:1px solid #ccc;padding-bottom:4px} p,li{font-size:14px;line-height:1.6} ul{margin:8px 0;padding-left:20px}</style>
      </head><body>
      <h1>${activeDest.name}</h1>
      <p><strong>Country:</strong> ${activeDest.country || "—"} | <strong>Duration:</strong> ${activeDest.duration || "—"} | <strong>Price:</strong> ${activeDest.price || "—"} | <strong>Rating:</strong> ${activeDest.rating}/5</p>
      <h2>Overview</h2><p>${d?.overview || "—"}</p>
      <h2>Highlights</h2><ul>${(d?.highlights || []).map((h) => `<li>${h}</li>`).join("")}</ul>
      <h2>Itinerary</h2>${(d?.itinerary || []).map((i) => `<p><strong>${i.day}: ${i.title}</strong><br/>${i.desc}</p>`).join("")}
      <h2>Inclusions</h2><ul>${(d?.inclusions || []).map((i) => `<li>✓ ${i}</li>`).join("")}</ul>
      <h2>Exclusions</h2><ul>${(d?.exclusions || []).map((i) => `<li>✗ ${i}</li>`).join("")}</ul>
      <h2>Hotels</h2><ul>${(d?.hotels || []).map((h) => `<li>${h.name} (${h.stars}★) — ${h.location}</li>`).join("")}</ul>
      <h2>Visa Info</h2><p>${d?.visaInfo || "—"}</p>
      <h2>Best Time to Visit</h2><p>${d?.bestTime || "—"}</p>
      </body></html>`);
		win.document.close();
		setTimeout(() => win.print(), 300);
	};
	const handleCreatePackage = () => {
		const defaultName = `Draft Package #${Date.now().toString().slice(-4)}`;
		const defaultSlug = getSlug(defaultName);
		const newDests = [{
			name: defaultName,
			country: "",
			tag: "International",
			image: "",
			blurb: "",
			duration: "",
			price: "",
			rating: 5
		}, ...destinations];
		const newDb = {
			...db,
			[defaultSlug]: emptyDetails
		};
		setDestinations(newDests);
		setDb(newDb);
		setActiveSlug(defaultSlug);
		toast.success(`Package "${defaultName}" created in draft! Click Save Changes to save.`);
	};
	const handleDeletePackage = (slug) => {
		const newDests = destinations.filter((d) => getSlug(d.name) !== slug);
		const newDb = { ...db };
		delete newDb[slug];
		setDestinations(newDests);
		setDb(newDb);
		if (activeSlug === slug) setActiveSlug(null);
		setConfirmDelete(null);
		toast.info("Package deleted from draft. Click Save Changes to save.");
	};
	const handleUpdateDestItem = (slug, fields) => {
		const newDests = destinations.map((d) => {
			if (getSlug(d.name) === slug) {
				const updated = {
					...d,
					...fields
				};
				if (fields.name && fields.name !== d.name) {
					const nextSlug = getSlug(fields.name);
					const oldDetails = db[slug] || emptyDetails;
					db[nextSlug] = oldDetails;
					delete db[slug];
					setActiveSlug(nextSlug);
				}
				return updated;
			}
			return d;
		});
		setDestinations(newDests);
		setDb({ ...db });
	};
	const handleUpdateDetails = (slug, details) => {
		const targetDest = destinations.find((d) => getSlug(d.name) === slug);
		const updatedDetails = {
			...db[slug] || (targetDest ? generateFallbackDetails(targetDest) : emptyDetails),
			...details
		};
		const newDb = {
			...db,
			[slug]: updatedDetails
		};
		setDb(newDb);
	};
	const handleSaveAllChanges = () => {
		appData.updateDestinations(destinations);
		appData.updateDestinationDetails(db);
		toast.success("All package changes saved!");
	};
	const activeDest = destinations.find((d) => getSlug(d.name) === activeSlug);
	const activeDetails = activeSlug ? db[activeSlug] || (activeDest ? generateFallbackDetails(activeDest) : emptyDetails) : null;
	const tags = [
		"All",
		"International",
		"Beach",
		"Adventure",
		"Luxury",
		"Family",
		"Honeymoon",
		"Group Tours"
	];
	const filtered = destinations.filter((d) => {
		const matchQ = d.name.toLowerCase().includes(searchQ.toLowerCase()) || d.country.toLowerCase().includes(searchQ.toLowerCase());
		const matchTag = filterTag === "All" || d.tag === filterTag;
		return matchQ && matchTag;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-bold text-slate-900",
					children: "Packages & Destinations"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-slate-500 mt-1",
					children: "Manage tour packages, itineraries, pricing, and destination galleries."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleSaveAllChanges,
						className: S.btnSuccess,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), " Save Changes"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleCreatePackage,
						className: S.btnPrimary,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " New Package"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 xl:grid-cols-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "xl:col-span-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: S.card,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: S.cardHeader,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-blue-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "text-sm font-bold text-slate-800",
									children: [
										"All Packages (",
										filtered.length,
										")"
									]
								})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4 space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: searchQ,
										onChange: (e) => setSearchQ(e.target.value),
										placeholder: "Search packages...",
										className: S.input + " pl-9"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: filterTag,
									onChange: (e) => setFilterTag(e.target.value),
									className: S.select,
									children: tags.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: t,
										children: t
									}, t))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5 max-h-[560px] overflow-y-auto pr-1",
									children: [filtered.map((d) => {
										const slug = getSlug(d.name);
										const active = activeSlug === slug;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											onClick: () => setActiveSlug(slug),
											className: `group flex items-center gap-3 rounded-xl border p-3 cursor-pointer transition-all ${active ? "border-blue-300 bg-blue-50" : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"}`,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "h-10 w-10 shrink-0 rounded-lg overflow-hidden bg-slate-100",
													children: d.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
														src: d.image,
														alt: d.name,
														className: "h-full w-full object-cover"
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-5 w-5 m-2.5 text-slate-400" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex-1 min-w-0",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: `text-sm font-semibold truncate ${active ? "text-blue-700" : "text-slate-800"}`,
														children: d.name
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-2 mt-0.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[10px] text-slate-500 truncate",
															children: d.country || "—"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: `${S.badge} bg-slate-100 text-slate-500 text-[10px]`,
															children: d.tag
														})]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: (e) => {
														e.stopPropagation();
														setConfirmDelete({
															slug,
															name: d.name
														});
													},
													className: "shrink-0 rounded-lg p-1.5 text-slate-300 hover:bg-red-50 hover:text-red-500 opacity-0 group-hover:opacity-100 transition",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
												})
											]
										}, slug);
									}), filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "py-10 text-center text-sm text-slate-400",
										children: "No packages match your search."
									})]
								})
							]
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "xl:col-span-8",
					children: activeSlug && activeDest && activeDetails ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border-2 border-dashed border-rose-200 bg-rose-50/60 p-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 mb-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex h-7 w-7 items-center justify-center rounded-lg bg-rose-100",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4 text-rose-600" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-sm font-bold text-rose-700",
											children: "AI-Powered Package Import"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-rose-600 mb-4",
										children: "Upload a Word document (.docx), PDF (.pdf), or Text file (.txt) containing your package details (itinerary, inclusions, price, etc.) to automatically populate this form using the Gemini API."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												ref: aiFileRef,
												type: "file",
												accept: ".txt,.pdf,.docx,.doc",
												className: "hidden",
												onChange: handleAiFileUpload,
												id: "ai-pkg-file"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
												htmlFor: "ai-pkg-file",
												className: "inline-flex items-center gap-2 rounded-xl border border-rose-300 bg-white px-4 py-2.5 text-sm font-semibold text-rose-700 cursor-pointer hover:bg-rose-50 transition shadow-sm",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-4 w-4" }), aiFileName ? `📄 ${aiFileName}` : "Upload Package Document"]
											}),
											aiFileName && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "ml-3 text-xs text-rose-500",
												children: "File loaded — click Analyze to process"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-semibold text-slate-600 mb-1.5",
										children: "Or Paste Text Directly:"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										rows: 5,
										value: aiPastedText,
										onChange: (e) => setAiPastedText(e.target.value),
										placeholder: "Paste itinerary details here...",
										className: "w-full rounded-xl border border-rose-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-400/10 resize-none placeholder-slate-400 mb-3"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: handleAiAnalyze,
												disabled: aiParsing || !aiPastedText.trim() && !aiFile,
												className: "flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-all active:scale-95 cursor-pointer",
												children: aiParsing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-4 w-4 animate-spin" }), " Analyzing with Gemini..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "h-4 w-4" }),
													" Analyze ",
													aiFileName ? "Uploaded Document" : "Pasted Text"
												] })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: handleConvertToPdf,
												className: "flex items-center gap-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all active:scale-95 cursor-pointer",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), " Convert to PDF"]
											}),
											aiApplied && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center gap-1 text-xs text-emerald-700 font-semibold",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5" }), " Fields auto-filled — review below"]
											})
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSection, {
								title: "1. General Information",
								icon: Package,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-4 sm:grid-cols-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
											label: "Package Name",
											required: true,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: activeDest.name,
												onChange: (e) => handleUpdateDestItem(activeSlug, { name: e.target.value }),
												className: S.input
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
											label: "Country / Location",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: activeDest.country,
												onChange: (e) => handleUpdateDestItem(activeSlug, { country: e.target.value }),
												className: S.input
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
											label: "Category Tag",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												value: activeDest.tag,
												onChange: (e) => handleUpdateDestItem(activeSlug, { tag: e.target.value }),
												className: S.select,
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "International" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Beach" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Adventure" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Luxury" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Family" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Honeymoon" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Group Tours" })
												]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
											label: "Price (e.g. ₹58,900)",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: activeDest.price,
												onChange: (e) => handleUpdateDestItem(activeSlug, { price: e.target.value }),
												className: S.input
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
											label: "Duration (e.g. 5N / 6D)",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: activeDest.duration,
												onChange: (e) => handleUpdateDestItem(activeSlug, { duration: e.target.value }),
												className: S.input
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
											label: "Rating (1.0 – 5.0)",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												step: .1,
												min: 1,
												max: 5,
												value: activeDest.rating,
												onChange: (e) => handleUpdateDestItem(activeSlug, { rating: parseFloat(e.target.value) || 5 }),
												className: S.input
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
											label: "Short Blurb",
											className: "sm:col-span-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
												rows: 2,
												value: activeDest.blurb,
												onChange: (e) => handleUpdateDestItem(activeSlug, { blurb: e.target.value }),
												className: S.textarea
											})
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSection, {
								title: "2. Cover Image",
								icon: Camera,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUploader, {
									label: "Hero Cover Image",
									value: activeDest.image,
									onChange: (v) => handleUpdateDestItem(activeSlug, { image: v })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSection, {
								title: "3. Overview & Highlights",
								icon: FileText,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										label: "Overview Description",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											rows: 5,
											value: activeDetails.overview,
											onChange: (e) => handleUpdateDetails(activeSlug, { overview: e.target.value }),
											className: S.textarea
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: S.label,
										children: "Highlights List"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [activeDetails.highlights.map((h, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: h,
												onChange: (e) => {
													const u = [...activeDetails.highlights];
													u[idx] = e.target.value;
													handleUpdateDetails(activeSlug, { highlights: u });
												},
												className: S.input,
												placeholder: `Highlight ${idx + 1}`
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => {
													const u = activeDetails.highlights.filter((_, i) => i !== idx);
													handleUpdateDetails(activeSlug, { highlights: u });
												},
												className: "shrink-0 p-2 rounded-xl border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-200 transition",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
											})]
										}, idx)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => handleUpdateDetails(activeSlug, { highlights: [...activeDetails.highlights, ""] }),
											className: S.btnSecondary + " mt-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Add Highlight"]
										})]
									})] })]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSection, {
								title: "4. Day-by-Day Itinerary",
								icon: Layers,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3",
									children: [activeDetails.itinerary.map((it, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-slate-100 bg-slate-50 p-4 space-y-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-xs font-bold text-blue-600 uppercase",
												children: ["Day ", idx + 1]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => {
													const u = activeDetails.itinerary.filter((_, i) => i !== idx);
													handleUpdateDetails(activeSlug, { itinerary: u });
												},
												className: "p-1 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-3 sm:grid-cols-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
													label: "Day Label",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "text",
														value: it.day,
														onChange: (e) => {
															const u = [...activeDetails.itinerary];
															u[idx].day = e.target.value;
															handleUpdateDetails(activeSlug, { itinerary: u });
														},
														className: S.input
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
													label: "Title",
													className: "sm:col-span-2",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "text",
														value: it.title,
														onChange: (e) => {
															const u = [...activeDetails.itinerary];
															u[idx].title = e.target.value;
															handleUpdateDetails(activeSlug, { itinerary: u });
														},
														className: S.input
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
													label: "Description",
													className: "sm:col-span-3",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
														rows: 2,
														value: it.desc,
														onChange: (e) => {
															const u = [...activeDetails.itinerary];
															u[idx].desc = e.target.value;
															handleUpdateDetails(activeSlug, { itinerary: u });
														},
														className: S.textarea
													})
												})
											]
										})]
									}, idx)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => handleUpdateDetails(activeSlug, { itinerary: [...activeDetails.itinerary, {
											day: `Day ${activeDetails.itinerary.length + 1}`,
											title: "",
											desc: ""
										}] }),
										className: S.btnSecondary,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Add Day"]
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSection, {
								title: "5. Inclusions & Exclusions",
								icon: CircleCheck,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-6 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: S.label,
										children: "✅ Inclusions"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [activeDetails.inclusions.map((inc, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: inc,
												onChange: (e) => {
													const u = [...activeDetails.inclusions];
													u[idx] = e.target.value;
													handleUpdateDetails(activeSlug, { inclusions: u });
												},
												className: S.input,
												placeholder: "Included item"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => {
													const u = activeDetails.inclusions.filter((_, i) => i !== idx);
													handleUpdateDetails(activeSlug, { inclusions: u });
												},
												className: "shrink-0 p-2 rounded-xl border border-slate-200 text-slate-400 hover:text-red-500 transition",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
											})]
										}, idx)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => handleUpdateDetails(activeSlug, { inclusions: [...activeDetails.inclusions, ""] }),
											className: S.btnSecondary,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Add"]
										})]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: S.label,
										children: "❌ Exclusions"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [activeDetails.exclusions.map((exc, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: exc,
												onChange: (e) => {
													const u = [...activeDetails.exclusions];
													u[idx] = e.target.value;
													handleUpdateDetails(activeSlug, { exclusions: u });
												},
												className: S.input,
												placeholder: "Excluded item"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => {
													const u = activeDetails.exclusions.filter((_, i) => i !== idx);
													handleUpdateDetails(activeSlug, { exclusions: u });
												},
												className: "shrink-0 p-2 rounded-xl border border-slate-200 text-slate-400 hover:text-red-500 transition",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
											})]
										}, idx)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => handleUpdateDetails(activeSlug, { exclusions: [...activeDetails.exclusions, ""] }),
											className: S.btnSecondary,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Add"]
										})]
									})] })]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSection, {
								title: "6. Accommodation / Hotels",
								icon: Briefcase,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3",
									children: [activeDetails.hotels.map((hotel, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-slate-100 bg-slate-50 p-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between mb-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-xs font-bold text-blue-600 uppercase",
												children: ["Hotel ", idx + 1]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => {
													const u = activeDetails.hotels.filter((_, i) => i !== idx);
													handleUpdateDetails(activeSlug, { hotels: u });
												},
												className: "p-1 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-3 sm:grid-cols-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
													label: "Hotel Name",
													className: "sm:col-span-2",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "text",
														value: hotel.name,
														onChange: (e) => {
															const u = [...activeDetails.hotels];
															u[idx].name = e.target.value;
															handleUpdateDetails(activeSlug, { hotels: u });
														},
														className: S.input
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
													label: "Stars",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "number",
														min: 1,
														max: 5,
														value: hotel.stars,
														onChange: (e) => {
															const u = [...activeDetails.hotels];
															u[idx].stars = parseInt(e.target.value) || 5;
															handleUpdateDetails(activeSlug, { hotels: u });
														},
														className: S.input
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
													label: "Location",
													className: "sm:col-span-3",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "text",
														value: hotel.location,
														onChange: (e) => {
															const u = [...activeDetails.hotels];
															u[idx].location = e.target.value;
															handleUpdateDetails(activeSlug, { hotels: u });
														},
														className: S.input
													})
												})
											]
										})]
									}, idx)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => handleUpdateDetails(activeSlug, { hotels: [...activeDetails.hotels, {
											name: "",
											stars: 5,
											location: ""
										}] }),
										className: S.btnSecondary,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Add Hotel"]
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSection, {
								title: "7. Travel Information",
								icon: Globe,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-4 sm:grid-cols-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
											label: "Transportation",
											className: "sm:col-span-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
												rows: 2,
												value: activeDetails.transportation,
												onChange: (e) => handleUpdateDetails(activeSlug, { transportation: e.target.value }),
												className: S.textarea
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
											label: "Visa Information",
											className: "sm:col-span-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
												rows: 3,
												value: activeDetails.visaInfo,
												onChange: (e) => handleUpdateDetails(activeSlug, { visaInfo: e.target.value }),
												className: S.textarea
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
											label: "Best Time to Visit",
											className: "sm:col-span-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
												rows: 2,
												value: activeDetails.bestTime,
												onChange: (e) => handleUpdateDetails(activeSlug, { bestTime: e.target.value }),
												className: S.textarea
											})
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSection, {
								title: "8. Package FAQs",
								icon: CircleQuestionMark,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3",
									children: [activeDetails.faqs.map((faq, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-slate-100 bg-slate-50 p-4 space-y-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-xs font-bold text-blue-600 uppercase",
													children: ["FAQ ", idx + 1]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => {
														const u = activeDetails.faqs.filter((_, i) => i !== idx);
														handleUpdateDetails(activeSlug, { faqs: u });
													},
													className: "p-1 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
												label: "Question",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "text",
													value: faq.q,
													onChange: (e) => {
														const u = [...activeDetails.faqs];
														u[idx].q = e.target.value;
														handleUpdateDetails(activeSlug, { faqs: u });
													},
													className: S.input
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
												label: "Answer",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
													rows: 2,
													value: faq.a,
													onChange: (e) => {
														const u = [...activeDetails.faqs];
														u[idx].a = e.target.value;
														handleUpdateDetails(activeSlug, { faqs: u });
													},
													className: S.textarea
												})
											})
										]
									}, idx)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => handleUpdateDetails(activeSlug, { faqs: [...activeDetails.faqs, {
											q: "",
											a: ""
										}] }),
										className: S.btnSecondary,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Add FAQ"]
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSection, {
								title: "9. Destination Gallery Images",
								icon: Image,
								children: (() => {
									const detailsImages = activeDetails.images && activeDetails.images.length > 0 ? activeDetails.images : generateFallbackDetails(activeDest).images || [];
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [detailsImages.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mb-5",
										children: detailsImages.map((imgUrl, imgIdx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 group bg-slate-100",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: imgUrl,
												alt: "",
												className: "w-full h-full object-cover"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => {
													const u = detailsImages.filter((_, i) => i !== imgIdx);
													handleUpdateDetails(activeSlug, { images: u });
												},
												className: "absolute top-2 right-2 p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition shadow",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" })
											})]
										}, imgIdx))
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUploader, {
										label: "Upload / Add Gallery Image",
										value: "",
										onChange: (val) => {
											if (!val) return;
											const updated = [...detailsImages, val];
											handleUpdateDetails(activeSlug, { images: updated });
										}
									})] });
								})()
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: S.card + " p-5 flex items-center justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-slate-500",
									children: "Changes are saved in memory. Click \"Save Changes\" to persist."
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: handleSaveAllChanges,
									className: S.btnSuccess,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), " Save Package Changes"]
								})]
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: S.card + " flex flex-col items-center justify-center py-24 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 mb-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-8 w-8 text-slate-300" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-base font-semibold text-slate-400",
								children: "Select a package to edit"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-slate-300 mt-1",
								children: "Choose from the list or create a new package."
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: confirmDelete && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmModal, {
				title: `Delete "${confirmDelete.name}"?`,
				description: "This package will be permanently removed from the system.",
				confirmLabel: "Delete Package",
				onConfirm: () => handleDeletePackage(confirmDelete.slug),
				onCancel: () => setConfirmDelete(null)
			}) })
		]
	});
}
function ServicesTab({ appData }) {
	const [services, setServices] = (0, import_react.useState)(appData.services);
	const [editingIdx, setEditingIdx] = (0, import_react.useState)(null);
	const [title, setTitle] = (0, import_react.useState)("");
	const [desc, setDesc] = (0, import_react.useState)("");
	const [icon, setIcon] = (0, import_react.useState)("Globe2");
	const [features, setFeatures] = (0, import_react.useState)([]);
	const [newFeature, setNewFeature] = (0, import_react.useState)("");
	const [color, setColor] = (0, import_react.useState)("bg-blue-500/10 text-blue-500");
	const [confirmDelete, setConfirmDelete] = (0, import_react.useState)(null);
	const startEdit = (idx) => {
		const s = services[idx];
		setEditingIdx(idx);
		setTitle(s.title);
		setDesc(s.desc);
		setIcon(s.icon);
		setFeatures(s.features || []);
		setColor(s.color || "bg-blue-500/10 text-blue-500");
	};
	const handleSave = () => {
		if (editingIdx === null) return;
		const updated = [...services];
		updated[editingIdx] = {
			icon,
			title,
			desc,
			features,
			color
		};
		setServices(updated);
		setEditingIdx(null);
		toast.success("Service changes updated locally! Click Save Changes to save.");
	};
	const handleSaveAllChanges = () => {
		let updated = [...services];
		if (editingIdx !== null) {
			updated[editingIdx] = {
				icon,
				title,
				desc,
				features,
				color
			};
			setServices(updated);
			setEditingIdx(null);
		}
		appData.updateServices(updated);
		toast.success("All service changes saved successfully!");
	};
	const handleCreate = () => {
		const newService = {
			icon: "Sparkles",
			title: "New Service",
			desc: "Description here.",
			features: ["Feature 1"],
			color: "bg-amber-500/15 text-brand"
		};
		const updated = [...services, newService];
		setServices(updated);
		startEdit(updated.length - 1);
		toast.success("New service added locally! Click Save Changes to save.");
	};
	const handleDelete = (idx) => {
		const updated = services.filter((_, i) => i !== idx);
		setServices(updated);
		if (editingIdx === idx) setEditingIdx(null);
		setConfirmDelete(null);
		toast.info("Service removed locally. Click Save Changes to save.");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-bold text-slate-900",
					children: "Services Manager"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-slate-500 mt-1",
					children: "Configure service cards, icons, and feature lists."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleSaveAllChanges,
						className: S.btnSuccess,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), " Save Changes"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleCreate,
						className: S.btnPrimary,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Add Service"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 xl:grid-cols-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "xl:col-span-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: S.card,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: S.cardHeader,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "h-4 w-4 text-blue-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "text-sm font-bold text-slate-800",
									children: [
										"Services (",
										services.length,
										")"
									]
								})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-3 space-y-1.5 max-h-[500px] overflow-y-auto",
							children: services.map((ser, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								onClick: () => startEdit(idx),
								className: `group flex items-center justify-between rounded-xl border p-3 cursor-pointer transition-all ${editingIdx === idx ? "border-blue-300 bg-blue-50" : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: `text-sm font-semibold truncate ${editingIdx === idx ? "text-blue-700" : "text-slate-800"}`,
										children: ser.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-slate-400 truncate mt-0.5",
										children: ser.desc
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: (e) => {
										e.stopPropagation();
										setConfirmDelete({
											idx,
											name: ser.title
										});
									},
									className: "shrink-0 ml-2 p-1.5 rounded-lg text-slate-300 hover:bg-red-50 hover:text-red-500 opacity-0 group-hover:opacity-100 transition",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
								})]
							}, idx))
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "xl:col-span-8",
					children: editingIdx !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminSection, {
						title: `Editing: ${title}`,
						icon: Pen,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									label: "Service Heading",
									required: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: title,
										onChange: (e) => setTitle(e.target.value),
										className: S.input
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									label: "Icon",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										value: icon,
										onChange: (e) => setIcon(e.target.value),
										className: S.select,
										children: Object.keys(IconMap).map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: k,
											children: k
										}, k))
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									label: "Description",
									className: "sm:col-span-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										rows: 3,
										value: desc,
										onChange: (e) => setDesc(e.target.value),
										className: S.textarea
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									label: "Color CSS Classes",
									className: "sm:col-span-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: color,
										placeholder: "e.g. bg-blue-500/10 text-blue-500",
										onChange: (e) => setColor(e.target.value),
										className: S.input
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "sm:col-span-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: S.label,
											children: "Feature Bullet List"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-2 mb-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: newFeature,
												placeholder: "Add bullet item",
												onChange: (e) => setNewFeature(e.target.value),
												onKeyDown: (e) => {
													if (e.key === "Enter") {
														setFeatures([...features, newFeature.trim()]);
														setNewFeature("");
													}
												},
												className: S.input
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => {
													if (newFeature.trim()) {
														setFeatures([...features, newFeature.trim()]);
														setNewFeature("");
													}
												},
												className: S.btnPrimary + " shrink-0",
												children: "Add"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex flex-wrap gap-2",
											children: features.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700",
												children: [
													f,
													" ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														onClick: () => setFeatures(features.filter((_, j) => j !== i)),
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3 text-slate-400 hover:text-red-500" })
													})
												]
											}, i))
										})
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex gap-3 pt-4 border-t border-slate-100",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: handleSave,
								className: S.btnPrimary,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), " Save Service"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setEditingIdx(null),
								className: S.btnSecondary,
								children: "Cancel"
							})]
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: S.card + " flex flex-col items-center justify-center py-24 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "h-12 w-12 text-slate-200 mb-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-slate-400",
							children: "Select a service to edit"
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: confirmDelete && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmModal, {
				title: `Delete "${confirmDelete.name}"?`,
				description: "This service will be removed permanently.",
				confirmLabel: "Delete",
				onConfirm: () => handleDelete(confirmDelete.idx),
				onCancel: () => setConfirmDelete(null)
			}) })
		]
	});
}
function AboutTab({ appData }) {
	const [heroTitle, setHeroTitle] = (0, import_react.useState)(appData.about.heroTitle);
	const [heroSubtitle, setHeroSubtitle] = (0, import_react.useState)(appData.about.heroSubtitle);
	const [heroBgImage, setHeroBgImage] = (0, import_react.useState)(appData.about.heroBgImage);
	const [storyTitle, setStoryTitle] = (0, import_react.useState)(appData.about.storyTitle);
	const [storyPara1, setStoryPara1] = (0, import_react.useState)(appData.about.storyParagraphs[0] || "");
	const [storyPara2, setStoryPara2] = (0, import_react.useState)(appData.about.storyParagraphs[1] || "");
	const [storyStat1Val, setStoryStat1Val] = (0, import_react.useState)(appData.about.storyStats[0]?.value || "10k+");
	const [storyStat1Lbl, setStoryStat1Lbl] = (0, import_react.useState)(appData.about.storyStats[0]?.label || "Delighted Guests");
	const [storyStat2Val, setStoryStat2Val] = (0, import_react.useState)(appData.about.storyStats[1]?.value || "4.9★");
	const [storyStat2Lbl, setStoryStat2Lbl] = (0, import_react.useState)(appData.about.storyStats[1]?.label || "Google Rating");
	const [timeline, setTimeline] = (0, import_react.useState)(appData.about.timeline);
	const [team, setTeam] = (0, import_react.useState)(appData.about.team);
	const [activeTimelineIdx, setActiveTimelineIdx] = (0, import_react.useState)(null);
	const [timeYear, setTimeYear] = (0, import_react.useState)("");
	const [timeTitle, setTimeTitle] = (0, import_react.useState)("");
	const [timeDesc, setTimeDesc] = (0, import_react.useState)("");
	const [activeTeamIdx, setActiveTeamIdx] = (0, import_react.useState)(null);
	const [teamName, setTeamName] = (0, import_react.useState)("");
	const [teamRole, setTeamRole] = (0, import_react.useState)("");
	const [teamBio, setTeamBio] = (0, import_react.useState)("");
	const [teamAvatar, setTeamAvatar] = (0, import_react.useState)("");
	const [confirmDeleteTimeline, setConfirmDeleteTimeline] = (0, import_react.useState)(null);
	const [confirmDeleteTeam, setConfirmDeleteTeam] = (0, import_react.useState)(null);
	const handleSaveHero = () => {
		handleSaveAllChanges();
	};
	const handleSaveTimeline = () => {
		if (activeTimelineIdx === null) return;
		const updated = [...timeline];
		updated[activeTimelineIdx] = {
			year: timeYear,
			title: timeTitle,
			desc: timeDesc
		};
		setTimeline(updated);
		setActiveTimelineIdx(null);
		toast.success("Milestone updated locally! Click Save Changes to save.");
	};
	const handleSaveTeam = () => {
		if (activeTeamIdx === null) return;
		const updated = [...team];
		updated[activeTeamIdx] = {
			name: teamName,
			role: teamRole,
			bio: teamBio,
			avatar: teamAvatar
		};
		setTeam(updated);
		setActiveTeamIdx(null);
		toast.success("Team member updated locally! Click Save Changes to save.");
	};
	const handleSaveAllChanges = () => {
		let updatedTimeline = [...timeline];
		if (activeTimelineIdx !== null) {
			updatedTimeline[activeTimelineIdx] = {
				year: timeYear,
				title: timeTitle,
				desc: timeDesc
			};
			setTimeline(updatedTimeline);
			setActiveTimelineIdx(null);
		}
		let updatedTeam = [...team];
		if (activeTeamIdx !== null) {
			updatedTeam[activeTeamIdx] = {
				name: teamName,
				role: teamRole,
				bio: teamBio,
				avatar: teamAvatar
			};
			setTeam(updatedTeam);
			setActiveTeamIdx(null);
		}
		appData.updateAbout({
			heroTitle,
			heroSubtitle,
			heroBgImage,
			storyTitle,
			storyParagraphs: [storyPara1, storyPara2].filter(Boolean),
			storyStats: [{
				value: storyStat1Val,
				label: storyStat1Lbl
			}, {
				value: storyStat2Val,
				label: storyStat2Lbl
			}],
			timeline: updatedTimeline,
			team: updatedTeam
		});
		toast.success("About Us page changes saved successfully!");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-bold text-slate-900",
					children: "About Us Editor"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-slate-500 mt-1",
					children: "Configure company story, team, and milestone timeline."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: handleSaveAllChanges,
					className: S.btnSuccess,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), " Save Changes"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminSection, {
				title: "Hero & Story Section",
				icon: Users,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							label: "Hero Title",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: heroTitle,
								onChange: (e) => setHeroTitle(e.target.value),
								className: S.input
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							label: "Hero Subtitle",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: heroSubtitle,
								onChange: (e) => setHeroSubtitle(e.target.value),
								className: S.input
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "sm:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUploader, {
								label: "Hero Background Image",
								value: heroBgImage,
								onChange: (v) => setHeroBgImage(v)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							label: "Story Section Title",
							className: "sm:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: storyTitle,
								onChange: (e) => setStoryTitle(e.target.value),
								className: S.input
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							label: "Story Paragraph 1",
							className: "sm:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								rows: 3,
								value: storyPara1,
								onChange: (e) => setStoryPara1(e.target.value),
								className: S.textarea
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							label: "Story Paragraph 2",
							className: "sm:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								rows: 3,
								value: storyPara2,
								onChange: (e) => setStoryPara2(e.target.value),
								className: S.textarea
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-slate-100 bg-slate-50 p-4 space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-bold text-blue-600 uppercase",
									children: "Story Stat 1"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									label: "Value",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: storyStat1Val,
										onChange: (e) => setStoryStat1Val(e.target.value),
										className: S.input
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									label: "Label",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: storyStat1Lbl,
										onChange: (e) => setStoryStat1Lbl(e.target.value),
										className: S.input
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-slate-100 bg-slate-50 p-4 space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-bold text-blue-600 uppercase",
									children: "Story Stat 2"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									label: "Value",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: storyStat2Val,
										onChange: (e) => setStoryStat2Val(e.target.value),
										className: S.input
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									label: "Label",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: storyStat2Lbl,
										onChange: (e) => setStoryStat2Lbl(e.target.value),
										className: S.input
									})
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 pt-4 border-t border-slate-100",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleSaveHero,
						className: S.btnPrimary,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), " Save Hero & Story"]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminSection, {
				title: "Company Milestone Timeline",
				icon: Activity,
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => {
						const u = [...timeline, {
							year: "2026",
							title: "New Milestone",
							desc: ""
						}];
						setTimeline(u);
						toast.success("Milestone added locally! Click Save Changes to save.");
					},
					className: S.btnPrimary + " text-xs py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), " Add"]
				}),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-4",
					children: timeline.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `group relative rounded-xl border p-4 cursor-pointer transition-all ${activeTimelineIdx === idx ? "border-blue-300 bg-blue-50" : "border-slate-100 hover:border-slate-200"}`,
						onClick: () => {
							setActiveTimelineIdx(idx);
							setTimeYear(item.year);
							setTimeTitle(item.title);
							setTimeDesc(item.desc);
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold text-amber-600 font-mono",
								children: item.year
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold text-slate-800 mt-1 leading-snug",
								children: item.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-slate-500 mt-1 line-clamp-2",
								children: item.desc
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: (e) => {
									e.stopPropagation();
									setConfirmDeleteTimeline(idx);
								},
								className: "absolute top-3 right-3 p-1 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
							})
						]
					}, idx))
				}), activeTimelineIdx !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-blue-200 bg-blue-50 p-5 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
							className: "text-xs font-bold text-blue-700 uppercase tracking-wider",
							children: ["Edit: ", timeTitle]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									label: "Year",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: timeYear,
										onChange: (e) => setTimeYear(e.target.value),
										className: S.input
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									label: "Heading",
									className: "sm:col-span-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: timeTitle,
										onChange: (e) => setTimeTitle(e.target.value),
										className: S.input
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									label: "Description",
									className: "sm:col-span-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										rows: 2,
										value: timeDesc,
										onChange: (e) => setTimeDesc(e.target.value),
										className: S.textarea
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: handleSaveTimeline,
								className: S.btnPrimary,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), " Save"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setActiveTimelineIdx(null),
								className: S.btnSecondary,
								children: "Cancel"
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminSection, {
				title: "Executive & Planning Team",
				icon: Users,
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => {
						const u = [...team, {
							name: "New Executive",
							role: "Specialist",
							bio: "Bio here.",
							avatar: STATIC_DEFAULTS.about.team[0].avatar
						}];
						setTeam(u);
						toast.success("Team member added locally! Click Save Changes to save.");
					},
					className: S.btnPrimary + " text-xs py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), " Add"]
				}),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-4",
					children: team.map((member, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `group relative rounded-xl border p-4 cursor-pointer transition-all ${activeTeamIdx === idx ? "border-blue-300 bg-blue-50" : "border-slate-100 hover:border-slate-200"}`,
						onClick: () => {
							setActiveTeamIdx(idx);
							setTeamName(member.name);
							setTeamRole(member.role);
							setTeamBio(member.bio);
							setTeamAvatar(member.avatar);
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-12 w-12 rounded-full overflow-hidden bg-slate-100 mb-3",
								children: member.avatar && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: member.avatar,
									alt: member.name,
									className: "h-full w-full object-cover"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-bold text-slate-800 truncate",
								children: member.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-amber-600 font-medium truncate",
								children: member.role
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: (e) => {
									e.stopPropagation();
									setConfirmDeleteTeam(idx);
								},
								className: "absolute top-3 right-3 p-1 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
							})
						]
					}, idx))
				}), activeTeamIdx !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-blue-200 bg-blue-50 p-5 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
							className: "text-xs font-bold text-blue-700 uppercase tracking-wider",
							children: ["Edit: ", teamName]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									label: "Full Name",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: teamName,
										onChange: (e) => setTeamName(e.target.value),
										className: S.input
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									label: "Role / Title",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: teamRole,
										onChange: (e) => setTeamRole(e.target.value),
										className: S.input
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "sm:col-span-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUploader, {
										label: "Avatar Photo",
										value: teamAvatar,
										onChange: (v) => setTeamAvatar(v)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									label: "Bio Statement",
									className: "sm:col-span-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										rows: 2,
										value: teamBio,
										onChange: (e) => setTeamBio(e.target.value),
										className: S.textarea
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: handleSaveTeam,
								className: S.btnPrimary,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), " Save"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setActiveTeamIdx(null),
								className: S.btnSecondary,
								children: "Cancel"
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AnimatePresence, { children: [confirmDeleteTimeline !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmModal, {
				title: "Delete milestone?",
				description: "This timeline entry will be removed.",
				confirmLabel: "Delete",
				onConfirm: () => {
					const u = timeline.filter((_, i) => i !== confirmDeleteTimeline);
					setTimeline(u);
					setConfirmDeleteTimeline(null);
					toast.info("Milestone removed locally. Click Save Changes to save.");
				},
				onCancel: () => setConfirmDeleteTimeline(null)
			}), confirmDeleteTeam !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmModal, {
				title: "Remove team member?",
				description: "This person will be removed from the team.",
				confirmLabel: "Remove",
				onConfirm: () => {
					const u = team.filter((_, i) => i !== confirmDeleteTeam);
					setTeam(u);
					setConfirmDeleteTeam(null);
					toast.info("Team member removed locally. Click Save Changes to save.");
				},
				onCancel: () => setConfirmDeleteTeam(null)
			})] })
		]
	});
}
function GalleryTab({ appData }) {
	const [gallery, setGallery] = (0, import_react.useState)(appData.galleryImages);
	const [newUrl, setNewUrl] = (0, import_react.useState)("");
	const [newCat, setNewCat] = (0, import_react.useState)("Asia");
	const [filterCat, setFilterCat] = (0, import_react.useState)("All");
	const [confirmDeleteIdx, setConfirmDeleteIdx] = (0, import_react.useState)(null);
	const [selected, setSelected] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const gs = appData.gallerySection || {};
	const [pgTitle, setPgTitle] = (0, import_react.useState)(gs.title || "Gallery");
	const [pgSubtitle, setPgSubtitle] = (0, import_react.useState)(gs.subtitle || "Unfiltered frames from our travellers' journeys across five continents.");
	const [pgBgImage, setPgBgImage] = (0, import_react.useState)(gs.bgImage || "");
	const [tdTitle, setTdTitle] = (0, import_react.useState)(gs.travelDiariesTitle || "Destination Gallery & Travel Diaries");
	const [tdSubtitle, setTdSubtitle] = (0, import_react.useState)(gs.travelDiariesSubtitle || "Moments from our travellers' cameras.");
	const handleSavePageHeader = () => {
		handleSaveAllChanges();
	};
	const handleSaveAllChanges = () => {
		appData.updateGallerySection({
			title: pgTitle,
			subtitle: pgSubtitle,
			bgImage: pgBgImage,
			travelDiariesTitle: tdTitle,
			travelDiariesSubtitle: tdSubtitle
		});
		appData.updateGallery(gallery);
		toast.success("Gallery changes saved successfully!");
	};
	const handleAdd = () => {
		if (!newUrl.trim()) return;
		const updated = [{
			url: newUrl.trim(),
			category: newCat
		}, ...gallery];
		setGallery(updated);
		setNewUrl("");
		toast.success("Image added locally! Click Save Changes to save.");
	};
	const handleDelete = (idx) => {
		const updated = gallery.filter((_, i) => i !== idx);
		setGallery(updated);
		setConfirmDeleteIdx(null);
		toast.info("Image removed locally. Click Save Changes to save.");
	};
	const handleBulkDelete = () => {
		const updated = gallery.filter((_, i) => !selected.has(i));
		setGallery(updated);
		setSelected(/* @__PURE__ */ new Set());
		toast.info(`Deleted ${selected.size} images locally. Click Save Changes to save.`);
	};
	const cats = [
		"All",
		"Asia",
		"Europe",
		"Beach",
		"Adventure",
		"Luxury"
	];
	const filtered = filterCat === "All" ? gallery : gallery.filter((g) => g.category === filterCat);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-bold text-slate-900",
					children: "Gallery Manager"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-slate-500 mt-1",
					children: [gallery.length, " images · Add, categorize, or remove media."]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [selected.size > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleBulkDelete,
						className: S.btnDanger,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" }),
							" Delete Selected (",
							selected.size,
							")"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleSaveAllChanges,
						className: S.btnSuccess,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), " Save Changes"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminSection, {
				title: "Gallery Page Header",
				icon: Image,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								label: "Hero Title",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: pgTitle,
									onChange: (e) => setPgTitle(e.target.value),
									className: S.input,
									placeholder: "e.g. Gallery"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								label: "Hero Subtitle",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: pgSubtitle,
									onChange: (e) => setPgSubtitle(e.target.value),
									className: S.input,
									placeholder: "Subtitle shown under the title in the hero"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "sm:col-span-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUploader, {
									label: "Hero Background Image",
									value: pgBgImage,
									onChange: (v) => setPgBgImage(v)
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "my-5 border-slate-100" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold text-blue-600 uppercase tracking-wider mb-4",
						children: "Travel Diaries Section Heading"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							label: "Section Title",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: tdTitle,
								onChange: (e) => setTdTitle(e.target.value),
								className: S.input,
								placeholder: "e.g. Destination Gallery & Travel Diaries"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							label: "Section Subtitle",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: tdSubtitle,
								onChange: (e) => setTdSubtitle(e.target.value),
								className: S.input,
								placeholder: "e.g. Moments from our travellers' cameras."
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 pt-4 border-t border-slate-100",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: handleSavePageHeader,
							className: S.btnPrimary,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), " Save Gallery Page Header"]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSection, {
				title: "Add New Image",
				icon: Camera,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-12 items-end",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "sm:col-span-7",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUploader, {
								label: "Image URL or Upload",
								value: newUrl,
								onChange: (v) => setNewUrl(v)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "sm:col-span-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								label: "Category",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: newCat,
									onChange: (e) => setNewCat(e.target.value),
									className: S.select,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Asia" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Europe" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Beach" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Adventure" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Luxury" })
									]
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "sm:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: handleAdd,
								className: S.btnPrimary + " w-full justify-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Add Image"]
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: S.card,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: S.cardHeader,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "h-4 w-4 text-blue-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "text-sm font-bold text-slate-800",
							children: [
								"Gallery Grid (",
								filtered.length,
								")"
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-2",
						children: cats.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setFilterCat(c),
							className: `rounded-full px-3 py-1 text-xs font-semibold transition ${filterCat === c ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`,
							children: c
						}, c))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: S.cardBody,
					children: filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center py-16 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "h-12 w-12 text-slate-200 mb-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-slate-400",
							children: "No images yet."
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-3 grid-cols-2 sm:grid-cols-4 md:grid-cols-6",
						children: filtered.map((img, idx) => {
							const realIdx = gallery.findIndex((g) => g === img);
							const isSelected = selected.has(realIdx);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `group relative aspect-square overflow-hidden rounded-xl border-2 transition cursor-pointer ${isSelected ? "border-blue-500 shadow-md" : "border-transparent hover:border-slate-200"}`,
								onClick: () => {
									const ns = new Set(selected);
									isSelected ? ns.delete(realIdx) : ns.add(realIdx);
									setSelected(ns);
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: img.url,
										alt: "",
										className: "h-full w-full object-cover transition group-hover:scale-105 duration-300"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute top-1.5 left-1.5 rounded-md bg-black/60 px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-white",
										children: img.category
									}),
									isSelected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute inset-0 bg-blue-500/20 flex items-center justify-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-6 w-6 text-blue-600" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: (e) => {
											e.stopPropagation();
											setConfirmDeleteIdx(realIdx);
										},
										className: "absolute right-1.5 top-1.5 rounded-lg bg-red-500 p-1 text-white opacity-0 group-hover:opacity-100 transition shadow",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3 w-3" })
									})
								]
							}, idx);
						})
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: confirmDeleteIdx !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmModal, {
				title: "Delete image?",
				description: "This image will be removed from the gallery.",
				confirmLabel: "Delete",
				onConfirm: () => handleDelete(confirmDeleteIdx),
				onCancel: () => setConfirmDeleteIdx(null)
			}) })
		]
	});
}
function TestimonialsTab({ appData }) {
	const [reviews, setReviews] = (0, import_react.useState)(appData.testimonials.reviews);
	const [videos, setVideos] = (0, import_react.useState)(appData.testimonials.videos);
	const [editingRevIdx, setEditingRevIdx] = (0, import_react.useState)(null);
	const [revName, setRevName] = (0, import_react.useState)("");
	const [revTrip, setRevTrip] = (0, import_react.useState)("");
	const [revQuote, setRevQuote] = (0, import_react.useState)("");
	const [revAvatar, setRevAvatar] = (0, import_react.useState)("");
	const [revDate, setRevDate] = (0, import_react.useState)("");
	const [revRating, setRevRating] = (0, import_react.useState)(5);
	const [editingVidIdx, setEditingVidIdx] = (0, import_react.useState)(null);
	const [vidTitle, setVidTitle] = (0, import_react.useState)("");
	const [vidThumb, setVidThumb] = (0, import_react.useState)("");
	const [vidSrc, setVidSrc] = (0, import_react.useState)("");
	const [vidDur, setVidDur] = (0, import_react.useState)("0:05");
	const [confirmDeleteRev, setConfirmDeleteRev] = (0, import_react.useState)(null);
	const [confirmDeleteVid, setConfirmDeleteVid] = (0, import_react.useState)(null);
	const handleSaveReview = () => {
		if (editingRevIdx === null) return;
		const updated = [...reviews];
		updated[editingRevIdx] = {
			name: revName,
			trip: revTrip,
			quote: revQuote,
			avatar: revAvatar,
			date: revDate,
			rating: revRating
		};
		setReviews(updated);
		setEditingRevIdx(null);
		toast.success("Review changes updated locally! Click Save Changes to save.");
	};
	const handleSaveVideo = () => {
		if (editingVidIdx === null) return;
		const updated = [...videos];
		updated[editingVidIdx] = {
			title: vidTitle,
			thumbnail: vidThumb,
			src: vidSrc,
			duration: vidDur
		};
		setVideos(updated);
		setEditingVidIdx(null);
		toast.success("Video changes updated locally! Click Save Changes to save.");
	};
	const handleSaveAllChanges = () => {
		let updatedReviews = [...reviews];
		if (editingRevIdx !== null) {
			updatedReviews[editingRevIdx] = {
				name: revName,
				trip: revTrip,
				quote: revQuote,
				avatar: revAvatar,
				date: revDate,
				rating: revRating
			};
			setReviews(updatedReviews);
			setEditingRevIdx(null);
		}
		let updatedVideos = [...videos];
		if (editingVidIdx !== null) {
			updatedVideos[editingVidIdx] = {
				title: vidTitle,
				thumbnail: vidThumb,
				src: vidSrc,
				duration: vidDur
			};
			setVideos(updatedVideos);
			setEditingVidIdx(null);
		}
		appData.updateTestimonials({
			reviews: updatedReviews,
			videos: updatedVideos
		});
		toast.success("Testimonials changes saved successfully!");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-bold text-slate-900",
					children: "Testimonials Manager"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-slate-500 mt-1",
					children: "Manage client reviews and travel video vlogs."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: handleSaveAllChanges,
					className: S.btnSuccess,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), " Save Changes"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminSection, {
				title: `Customer Reviews (${reviews.length})`,
				icon: Star,
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => {
						const u = [{
							name: "New Client",
							trip: "Custom Tour",
							quote: "Wonderful experience.",
							avatar: STATIC_DEFAULTS.testimonials.reviews[0].avatar,
							date: "June 2026",
							rating: 5
						}, ...reviews];
						setReviews(u);
						toast.success("Review added locally! Click Save Changes to save.");
					},
					className: S.btnPrimary + " text-xs py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), " Add"]
				}),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-4",
					children: reviews.map((rev, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `group relative rounded-xl border p-4 cursor-pointer transition-all ${editingRevIdx === idx ? "border-blue-300 bg-blue-50" : "border-slate-100 hover:border-slate-200"}`,
						onClick: () => {
							setEditingRevIdx(idx);
							setRevName(rev.name);
							setRevTrip(rev.trip);
							setRevQuote(rev.quote);
							setRevAvatar(rev.avatar);
							setRevDate(rev.date || "");
							setRevRating(rev.rating || 5);
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 mb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-10 w-10 rounded-full overflow-hidden bg-slate-100 shrink-0",
									children: rev.avatar && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: rev.avatar,
										alt: rev.name,
										className: "h-full w-full object-cover"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-bold text-slate-800 truncate",
										children: rev.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-slate-500 truncate",
										children: rev.trip
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex mb-2",
								children: Array.from({ length: rev.rating || 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3 text-amber-400 fill-amber-400" }, i))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-slate-600 italic line-clamp-3",
								children: [
									"\"",
									rev.quote,
									"\""
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: (e) => {
									e.stopPropagation();
									setConfirmDeleteRev(idx);
								},
								className: "absolute top-3 right-3 p-1 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
							})
						]
					}, idx))
				}), editingRevIdx !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-blue-200 bg-blue-50 p-5 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
							className: "text-xs font-bold text-blue-700 uppercase tracking-wider",
							children: ["Edit Review: ", revName]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									label: "Client Name",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: revName,
										onChange: (e) => setRevName(e.target.value),
										className: S.input
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									label: "Trip Name",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: revTrip,
										onChange: (e) => setRevTrip(e.target.value),
										className: S.input
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									label: "Travel Date",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: revDate,
										onChange: (e) => setRevDate(e.target.value),
										className: S.input
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									label: "Rating (1-5)",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										min: 1,
										max: 5,
										value: revRating,
										onChange: (e) => setRevRating(parseInt(e.target.value) || 5),
										className: S.input
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "sm:col-span-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUploader, {
										label: "Client Avatar",
										value: revAvatar,
										onChange: (v) => setRevAvatar(v)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									label: "Review Quote",
									className: "sm:col-span-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										rows: 3,
										value: revQuote,
										onChange: (e) => setRevQuote(e.target.value),
										className: S.textarea
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: handleSaveReview,
								className: S.btnPrimary,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), " Save"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setEditingRevIdx(null),
								className: S.btnSecondary,
								children: "Cancel"
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminSection, {
				title: `Travel Video Vlogs (${videos.length})`,
				icon: Video,
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => {
						const u = [...videos, {
							title: "New Vlog",
							thumbnail: STATIC_DEFAULTS.testimonials.videos[0].thumbnail,
							src: STATIC_DEFAULTS.testimonials.videos[0].src,
							duration: "0:05"
						}];
						setVideos(u);
						toast.success("Vlog added locally! Click Save Changes to save.");
					},
					className: S.btnPrimary + " text-xs py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), " Add"]
				}),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-3 mb-4",
					children: videos.map((vid, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `group relative rounded-xl border cursor-pointer transition-all overflow-hidden ${editingVidIdx === idx ? "border-blue-300 ring-2 ring-blue-200" : "border-slate-100 hover:border-slate-200"}`,
						onClick: () => {
							setEditingVidIdx(idx);
							setVidTitle(vid.title);
							setVidThumb(vid.thumbnail);
							setVidSrc(vid.src);
							setVidDur(vid.duration || "0:05");
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "aspect-video relative overflow-hidden bg-slate-100",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: vid.thumbnail,
									alt: vid.title,
									className: "h-full w-full object-cover"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-bold px-1.5 py-0.5 rounded font-mono",
									children: vid.duration
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-bold text-slate-800 truncate",
									children: vid.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-slate-400 truncate mt-0.5",
									children: vid.src
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: (e) => {
									e.stopPropagation();
									setConfirmDeleteVid(idx);
								},
								className: "absolute top-2 right-2 p-1 rounded-lg bg-red-500 text-white opacity-0 group-hover:opacity-100 transition shadow",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3 w-3" })
							})
						]
					}, idx))
				}), editingVidIdx !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-blue-200 bg-blue-50 p-5 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
							className: "text-xs font-bold text-blue-700 uppercase tracking-wider",
							children: ["Edit Vlog: ", vidTitle]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									label: "Title",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: vidTitle,
										onChange: (e) => setVidTitle(e.target.value),
										className: S.input
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									label: "Duration (e.g. 0:05)",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: vidDur,
										onChange: (e) => setVidDur(e.target.value),
										className: S.input
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "sm:col-span-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUploader, {
										label: "Thumbnail Image",
										value: vidThumb,
										onChange: (v) => setVidThumb(v)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "sm:col-span-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUploader, {
										label: "Video Source URL (.mp4)",
										value: vidSrc,
										onChange: (v) => setVidSrc(v)
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: handleSaveVideo,
								className: S.btnPrimary,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), " Save"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setEditingVidIdx(null),
								className: S.btnSecondary,
								children: "Cancel"
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AnimatePresence, { children: [confirmDeleteRev !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmModal, {
				title: "Delete review?",
				description: "This client review will be removed.",
				confirmLabel: "Delete",
				onConfirm: () => {
					const u = reviews.filter((_, i) => i !== confirmDeleteRev);
					setReviews(u);
					setConfirmDeleteRev(null);
					toast.info("Review removed locally. Click Save Changes to save.");
				},
				onCancel: () => setConfirmDeleteRev(null)
			}), confirmDeleteVid !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmModal, {
				title: "Delete vlog?",
				description: "This video vlog will be removed.",
				confirmLabel: "Delete",
				onConfirm: () => {
					const u = videos.filter((_, i) => i !== confirmDeleteVid);
					setVideos(u);
					setConfirmDeleteVid(null);
					toast.info("Vlog removed locally. Click Save Changes to save.");
				},
				onCancel: () => setConfirmDeleteVid(null)
			})] })
		]
	});
}
function FaqsTab({ appData }) {
	const [faqs, setFaqs] = (0, import_react.useState)(appData.faqs);
	const [editingIdx, setEditingIdx] = (0, import_react.useState)(null);
	const [q, setQ] = (0, import_react.useState)("");
	const [a, setA] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("Booking");
	const [searchQ, setSearchQ] = (0, import_react.useState)("");
	const [confirmDeleteIdx, setConfirmDeleteIdx] = (0, import_react.useState)(null);
	const startEdit = (idx) => {
		const item = faqs[idx];
		setEditingIdx(idx);
		setQ(item.q);
		setA(item.a);
		setCategory(item.category || "Booking");
	};
	const handleSave = () => {
		if (editingIdx === null) return;
		const updated = [...faqs];
		updated[editingIdx] = {
			q,
			a,
			category
		};
		setFaqs(updated);
		setEditingIdx(null);
		toast.success("FAQ changes updated locally! Click Save Changes to save.");
	};
	const handleSaveAllChanges = () => {
		let updated = [...faqs];
		if (editingIdx !== null) {
			updated[editingIdx] = {
				q,
				a,
				category
			};
			setFaqs(updated);
			setEditingIdx(null);
		}
		appData.updateFaqs(updated);
		toast.success("All FAQ changes saved successfully!");
	};
	const handleCreate = () => {
		const updated = [{
			q: "New Question?",
			a: "Detailed answer here.",
			category: "Booking"
		}, ...faqs];
		setFaqs(updated);
		startEdit(0);
		toast.success("FAQ added locally! Click Save Changes to save.");
	};
	const handleDelete = (idx) => {
		const updated = faqs.filter((_, i) => i !== idx);
		setFaqs(updated);
		if (editingIdx === idx) setEditingIdx(null);
		setConfirmDeleteIdx(null);
		toast.info("FAQ deleted locally. Click Save Changes to save.");
	};
	const catColors = {
		Booking: "bg-blue-50 text-blue-600",
		"Visa & Insurance": "bg-amber-50 text-amber-600",
		Customization: "bg-violet-50 text-violet-600",
		Support: "bg-emerald-50 text-emerald-600",
		Payments: "bg-rose-50 text-rose-600"
	};
	const filteredFaqs = faqs.filter((f) => f.q.toLowerCase().includes(searchQ.toLowerCase()) || f.a.toLowerCase().includes(searchQ.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-bold text-slate-900",
					children: "FAQ Manager"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-slate-500 mt-1",
					children: [faqs.length, " entries · Add, edit, or remove FAQ topics."]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleSaveAllChanges,
						className: S.btnSuccess,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), " Save Changes"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleCreate,
						className: S.btnPrimary,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Add FAQ"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 xl:grid-cols-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "xl:col-span-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: S.card,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: S.cardHeader,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "h-4 w-4 text-blue-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "text-sm font-bold text-slate-800",
									children: [
										"FAQ Topics (",
										filteredFaqs.length,
										")"
									]
								})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4 space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: searchQ,
									onChange: (e) => setSearchQ(e.target.value),
									placeholder: "Search FAQs...",
									className: S.input + " pl-9"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5 max-h-[500px] overflow-y-auto pr-1",
								children: [filteredFaqs.map((faq, idx) => {
									const realIdx = faqs.indexOf(faq);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										onClick: () => startEdit(realIdx),
										className: `group flex items-start justify-between rounded-xl border p-3 cursor-pointer transition-all ${editingIdx === realIdx ? "border-blue-300 bg-blue-50" : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0 flex-1 mr-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: `text-xs font-semibold truncate ${editingIdx === realIdx ? "text-blue-700" : "text-slate-800"}`,
												children: faq.q
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `mt-1 inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full ${catColors[faq.category] || catColors.Booking}`,
												children: faq.category || "Booking"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: (e) => {
												e.stopPropagation();
												setConfirmDeleteIdx(realIdx);
											},
											className: "shrink-0 p-1 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
										})]
									}, realIdx);
								}), filteredFaqs.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "py-8 text-center text-sm text-slate-400",
									children: "No FAQs match your search."
								})]
							})]
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "xl:col-span-7",
					children: editingIdx !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminSection, {
						title: "Edit FAQ",
						icon: Pen,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									label: "Question",
									required: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: q,
										onChange: (e) => setQ(e.target.value),
										className: S.input
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									label: "Category",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: category,
										onChange: (e) => setCategory(e.target.value),
										className: S.select,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Booking" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Visa & Insurance" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Customization" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Support" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Payments" })
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									label: "Answer",
									required: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										rows: 6,
										value: a,
										onChange: (e) => setA(e.target.value),
										className: S.textarea
									})
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex gap-3 pt-4 border-t border-slate-100",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: handleSave,
								className: S.btnPrimary,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), " Save FAQ"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setEditingIdx(null),
								className: S.btnSecondary,
								children: "Cancel"
							})]
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: S.card + " flex flex-col items-center justify-center py-24 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "h-12 w-12 text-slate-200 mb-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-slate-400",
							children: "Select a question to edit"
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: confirmDeleteIdx !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmModal, {
				title: "Delete FAQ?",
				description: "This FAQ entry will be permanently removed.",
				confirmLabel: "Delete",
				onConfirm: () => handleDelete(confirmDeleteIdx),
				onCancel: () => setConfirmDeleteIdx(null)
			}) })
		]
	});
}
function ContactTab({ appData }) {
	const [address, setAddress] = (0, import_react.useState)(appData.contact.address);
	const [phone, setPhone] = (0, import_react.useState)(appData.contact.phone);
	const [whatsapp, setWhatsapp] = (0, import_react.useState)(appData.contact.whatsapp);
	const [email, setEmail] = (0, import_react.useState)(appData.contact.email);
	const [website, setWebsite] = (0, import_react.useState)(appData.contact.website);
	const [hours, setHours] = (0, import_react.useState)(appData.contact.hours);
	const [mapIframe, setMapIframe] = (0, import_react.useState)(appData.contact.mapIframe);
	const handleSave = () => {
		appData.updateContact({
			address,
			phone,
			whatsapp,
			email,
			website,
			hours,
			mapIframe
		});
		toast.success("Contact information saved!");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-bold text-slate-900",
					children: "Contact Information"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-slate-500 mt-1",
					children: "Manage office address, phone, email, hours, and map widget."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: handleSave,
					className: S.btnSuccess,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), " Save Changes"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminSection, {
				title: "Office & Contact Details",
				icon: Phone,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							label: "Office Address",
							className: "sm:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: address,
								onChange: (e) => setAddress(e.target.value),
								className: S.input
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							label: "Phone Number",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: phone,
								onChange: (e) => setPhone(e.target.value),
								className: S.input
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							label: "WhatsApp Link",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: whatsapp,
								onChange: (e) => setWhatsapp(e.target.value),
								className: S.input
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							label: "Email Address",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								value: email,
								onChange: (e) => setEmail(e.target.value),
								className: S.input
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							label: "Website URL",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: website,
								onChange: (e) => setWebsite(e.target.value),
								className: S.input
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							label: "Business Hours",
							className: "sm:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: hours,
								onChange: (e) => setHours(e.target.value),
								className: S.input
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							label: "Google Maps Embed URL",
							className: "sm:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: mapIframe,
								onChange: (e) => setMapIframe(e.target.value),
								placeholder: "Google Maps iframe src attribute",
								className: S.input
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 pt-4 border-t border-slate-100",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleSave,
						className: S.btnPrimary,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), " Save Contact Info"]
					})
				})]
			}),
			mapIframe && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSection, {
				title: "Map Preview",
				icon: Globe,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-xl overflow-hidden border border-slate-100 aspect-video",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
						src: mapIframe,
						className: "w-full h-full",
						allowFullScreen: true,
						loading: "lazy",
						referrerPolicy: "no-referrer-when-downgrade"
					})
				})
			})
		]
	});
}
//#endregion
export { AdminPage as component };
