import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { y as useSearch } from "../_libs/@tanstack/react-router+[...].mjs";
import { K as Globe, M as Mail, O as MessageCircle, g as Send, j as MapPin, tt as Clock, w as Phone } from "../_libs/lucide-react.mjs";
import { i as useAppData } from "./dataStore-DogEXO2o.mjs";
import { o as motion } from "../_libs/framer-motion.mjs";
import { t as CommonHero } from "./CommonHero-C4NUnhFB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-BqIpqkn1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ContactPage() {
	const { contact, addMessage, destinations } = useAppData();
	const search = useSearch({ from: "/contact" });
	const [selectedDest, setSelectedDest] = (0, import_react.useState)("");
	const [selectedService, setSelectedService] = (0, import_react.useState)("");
	const [sent, setSent] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (search.package) {
			const matched = destinations.find((d) => d.name.toLowerCase().replace(/[^a-z]/g, "") === search.package.replace(/[^a-z]/g, ""));
			if (matched) setSelectedDest(matched.name);
		}
		if (search.service) setSelectedService(search.service);
	}, [search, destinations]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background min-h-screen pb-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommonHero, {
			title: "Contact Our Specialists",
			subtitle: "We design customized, high-end itineraries matching your specific style. Speak with us today.",
			bgImage: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1600&q=80"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto mt-20 max-w-7xl px-4 sm:px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-12 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						x: -30
					},
					animate: {
						opacity: 1,
						x: 0
					},
					className: "flex flex-col justify-between gap-8 rounded-[40px] border border-border bg-muted/30 p-8 sm:p-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold uppercase tracking-[0.3em] text-brand",
								children: "Connect"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl",
								children: [
									"Let's plan your ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "italic text-gradient-brand",
										children: "next great escape."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-sm text-muted-foreground leading-relaxed",
								children: "Have questions about visas, itineraries, or pricing? Drop us a line. Our destination specialists are available 7 days a week."
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-3",
							children: [
								{
									icon: MapPin,
									label: "Office Address",
									value: contact.address
								},
								{
									icon: Phone,
									label: "Direct Phone",
									value: contact.phone,
									href: `tel:${contact.phone}`
								},
								{
									icon: MessageCircle,
									label: "WhatsApp Support",
									value: "Chat with a Specialist 24/7",
									href: contact.whatsapp
								},
								{
									icon: Mail,
									label: "Email Queries",
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
									icon: Clock,
									label: "Business Hours",
									value: contact.hours
								}
							].map((info, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: info.href ?? "#",
								target: info.href?.startsWith("http") ? "_blank" : void 0,
								rel: "noreferrer",
								className: "group flex items-center gap-4 rounded-3xl border border-border bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid h-11 w-11 place-items-center rounded-2xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(info.icon, { className: "h-5 w-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] uppercase tracking-widest text-muted-foreground",
									children: info.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold text-ink mt-0.5",
									children: info.value
								})] })]
							}, idx))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-hidden rounded-[30px] border border-border shadow-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
								title: "Office map",
								src: contact.mapIframe,
								className: "h-64 w-full border-0",
								loading: "lazy",
								referrerPolicy: "no-referrer-when-downgrade"
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
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
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (e) => {
							e.preventDefault();
							const formData = new FormData(e.currentTarget);
							const name = formData.get("name");
							const phone = formData.get("phone");
							const email = formData.get("email");
							const dateInput = e.currentTarget.querySelector("input[type='date']");
							const date = dateInput ? dateInput.value : "Not Specified";
							const guestsInput = e.currentTarget.querySelector("input[type='number']");
							const guests = guestsInput && guestsInput.value ? `${guestsInput.value} Guests` : "Not Specified";
							const textareaEl = e.currentTarget.querySelector("textarea");
							const message = textareaEl ? textareaEl.value : "";
							addMessage({
								name,
								phone,
								email,
								destination: selectedDest || "General Inquiry",
								service: selectedService || "Standard Holiday Tour",
								travelDate: date || "Not Specified",
								guests: guests || "Not Specified",
								message: message || "Trip Planner form inquiry submitted from contact page."
							});
							setSent(true);
							setTimeout(() => setSent(false), 4e3);
							e.currentTarget.reset();
							setSelectedDest("");
							setSelectedService("");
						},
						className: "glass rounded-[36px] p-6 sm:p-10 shadow-luxury border border-border bg-white",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-2xl font-bold text-ink",
								children: "Trip Planner Form"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground mt-1 mb-8",
								children: "Fill in details to receive a customized sample itinerary within 24 hours."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Full Name",
										name: "name",
										placeholder: "E.g. Rohan Sharma",
										required: true
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Phone Number",
										name: "phone",
										placeholder: "E.g. +91 98765 43210",
										type: "tel",
										required: true
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Email Address",
										name: "email",
										placeholder: "you@email.com",
										type: "email",
										required: true,
										className: "sm:col-span-2"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground",
										children: "Destination"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: selectedDest,
										onChange: (e) => setSelectedDest(e.target.value),
										className: "mt-1 w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-ink outline-none focus:border-brand",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "Select a holiday spot"
										}), destinations.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: d.name,
											children: d.name
										}, d.name))]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground",
										children: "Inquired Service"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: selectedService,
										onChange: (e) => setSelectedService(e.target.value),
										className: "mt-1 w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-ink outline-none focus:border-brand",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "",
												children: "Standard Holiday Tour"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Visa Assistance",
												children: "Visa Assistance"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Flight Booking",
												children: "Flight Booking"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Hotel Booking",
												children: "Hotel Booking"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Honeymoon Package",
												children: "Honeymoon Package"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Corporate MICE",
												children: "Corporate MICE"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Custom Itinerary",
												children: "Custom Itinerary"
											})
										]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground",
										children: "Travel Date"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "relative mt-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "date",
											className: "w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-ink outline-none focus:border-brand"
										})
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground",
										children: "No. of Travellers"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "relative mt-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "number",
											min: 1,
											placeholder: "E.g. 2",
											className: "w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-ink outline-none focus:border-brand"
										})
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "sm:col-span-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground",
											children: "Additional Requests / Messages"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											rows: 4,
											placeholder: "Tell us about special requests, dietary needs, flight preferences...",
											className: "mt-1 w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-ink outline-none focus:border-brand"
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 text-sm font-bold text-white shadow-luxury hover:brightness-110 transition cursor-pointer",
								children: sent ? "Thank you — Inquiry Received!" : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Send Inquiry ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })] })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-center text-xs text-muted-foreground",
								children: "Our specialists will analyze your inputs and call you back in 24 hours."
							})
						]
					})
				})]
			})
		})]
	});
}
function Field({ label, name, placeholder, type = "text", required, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			htmlFor: name,
			className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground",
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
//#endregion
export { ContactPage as component };
