import { useState, useEffect } from "react";
import { createFileRoute, useSearch } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Calendar, Mail, MapPin, Phone, Send, MessageCircle, Clock, Users, DollarSign, Globe } from "lucide-react";
import CommonHero from "@/components/skynow/CommonHero";
import { useAppData } from "@/lib/dataStore";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  const { contact, addMessage, destinations } = useAppData();
  // Read search params to pre-fill destination or service
  const search: any = useSearch({ from: "/contact" });
  const [selectedDest, setSelectedDest] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (search.package) {
      // Find matching destination name
      const matched = destinations.find(
        (d) => d.name.toLowerCase().replace(/[^a-z]/g, "") === search.package.replace(/[^a-z]/g, "")
      );
      if (matched) setSelectedDest(matched.name);
    }
    if (search.service) {
      setSelectedService(search.service);
    }
  }, [search, destinations]);

  return (
    <div className="bg-background min-h-screen pb-20">
      <CommonHero
        title="Contact Our Specialists"
        subtitle="We design customized, high-end itineraries matching your specific style. Speak with us today."
        bgImage="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1600&q=80"
      />

      <div className="mx-auto mt-20 max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Col 1: High-end Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-between gap-8 rounded-[40px] border border-border bg-muted/30 p-8 sm:p-12"
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand">Connect</span>
              <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
                Let's plan your <br />
                <span className="italic text-gradient-brand">next great escape.</span>
              </h2>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                Have questions about visas, itineraries, or pricing? Drop us a line. Our destination specialists are available 7 days a week.
              </p>
            </div>

            <div className="grid gap-3">
              {[
                { icon: MapPin, label: "Office Address", value: contact.address },
                { icon: Phone, label: "Direct Phone", value: contact.phone, href: `tel:${contact.phone}` },
                { icon: MessageCircle, label: "WhatsApp Support", value: "Chat with a Specialist 24/7", href: contact.whatsapp },
                { icon: Mail, label: "Email Queries", value: contact.email, href: `mailto:${contact.email}` },
                { icon: Globe, label: "Website", value: contact.website, href: contact.website.startsWith("http") ? contact.website : `https://${contact.website}` },
                { icon: Clock, label: "Business Hours", value: contact.hours },
              ].map((info, idx) => (
                <a
                  key={idx}
                  href={info.href ?? "#"}
                  target={info.href?.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group flex items-center gap-4 rounded-3xl border border-border bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                    <info.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{info.label}</p>
                    <p className="text-sm font-semibold text-ink mt-0.5">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Interactive Map */}
            <div className="overflow-hidden rounded-[30px] border border-border shadow-sm">
              <iframe
                title="Office map"
                src={contact.mapIframe}
                className="h-64 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          {/* Col 2: High-end Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const name = formData.get("name") as string;
                const phone = formData.get("phone") as string;
                const email = formData.get("email") as string;

                const dateInput = e.currentTarget.querySelector("input[type='date']") as HTMLInputElement;
                const date = dateInput ? dateInput.value : "Not Specified";

                const guestsInput = e.currentTarget.querySelector("input[type='number']") as HTMLInputElement;
                const guests = guestsInput && guestsInput.value ? `${guestsInput.value} Guests` : "Not Specified";

                const textareaEl = e.currentTarget.querySelector("textarea") as HTMLTextAreaElement;
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
                setTimeout(() => setSent(false), 4000);
                e.currentTarget.reset();
                setSelectedDest("");
                setSelectedService("");
              }}
              className="glass rounded-[36px] p-6 sm:p-10 shadow-luxury border border-border bg-white"
            >
              <h3 className="font-display text-2xl font-bold text-ink">Trip Planner Form</h3>
              <p className="text-xs text-muted-foreground mt-1 mb-8">
                Fill in details to receive a customized sample itinerary within 24 hours.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full Name" name="name" placeholder="E.g. Rohan Sharma" required />
                <Field label="Phone Number" name="phone" placeholder="E.g. +91 98765 43210" type="tel" required />
                <Field label="Email Address" name="email" placeholder="you@email.com" type="email" required className="sm:col-span-2" />

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Destination</label>
                  <select
                    value={selectedDest}
                    onChange={(e) => setSelectedDest(e.target.value)}
                    className="mt-1 w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-ink outline-none focus:border-brand"
                  >
                    <option value="">Select a holiday spot</option>
                    {destinations.map((d) => (
                      <option key={d.name} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Inquired Service</label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="mt-1 w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-ink outline-none focus:border-brand"
                  >
                    <option value="">Standard Holiday Tour</option>
                    <option value="Visa Assistance">Visa Assistance</option>
                    <option value="Flight Booking">Flight Booking</option>
                    <option value="Hotel Booking">Hotel Booking</option>
                    <option value="Honeymoon Package">Honeymoon Package</option>
                    <option value="Corporate MICE">Corporate MICE</option>
                    <option value="Custom Itinerary">Custom Itinerary</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Travel Date</label>
                  <div className="relative mt-1">
                    <input
                      type="date"
                      className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-ink outline-none focus:border-brand"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">No. of Travellers</label>
                  <div className="relative mt-1">
                    <input
                      type="number"
                      min={1}
                      placeholder="E.g. 2"
                      className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-ink outline-none focus:border-brand"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Additional Requests / Messages</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about special requests, dietary needs, flight preferences..."
                    className="mt-1 w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-ink outline-none focus:border-brand"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 text-sm font-bold text-white shadow-luxury hover:brightness-110 transition cursor-pointer"
              >
                {sent ? (
                  "Thank you — Inquiry Received!"
                ) : (
                  <>
                    Send Inquiry <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Our specialists will analyze your inputs and call you back in 24 hours.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
  required,
  className = "",
}: {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-1 w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-brand"
      />
    </div>
  );
}
