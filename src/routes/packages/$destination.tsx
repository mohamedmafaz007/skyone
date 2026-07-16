import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Star,
  Calendar,
  Clock,
  Plane,
  Check,
  X,
  MessageCircle,
  Phone,
  Send,
  Hotel,
  ChevronDown,
  ArrowRight,
  Compass,
} from "lucide-react";
import CommonHero from "@/components/skynow/CommonHero";
import { getPackageDetails, getSlug } from "@/components/skynow/packageDetailsData";
import { useAppData } from "@/lib/dataStore";

export const Route = createFileRoute("/packages/$destination")({
  component: PackageDetailsPage,
});

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "itinerary", label: "Itinerary" },
  { id: "hotels", label: "Stays & Transit" },
  { id: "inclusions", label: "Inclusions" },
  { id: "visa", label: "Visa & Best Time" },
] as const;

function PackageDetailsPage() {
  const { destination } = Route.useParams();
  const { destinations, addMessage } = useAppData();
  const details = getPackageDetails(destination);
  
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]["id"]>("overview");
  const [openDay, setOpenDay] = useState<string | null>("Day 1");
  const [activePhoto, setActivePhoto] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    destination: "",
    guests: "2 Guests",
    message: ""
  });

  useEffect(() => {
    if (details) {
      setForm((prev) => ({ ...prev, destination: details.name }));
    }
  }, [details]);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [destination]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addMessage({
      name: form.name,
      phone: form.phone,
      email: form.email,
      destination: form.destination,
      service: "Standard Holiday Tour",
      travelDate: "Not Specified",
      guests: form.guests,
      message: form.message || `Plan Your Journey inquiry submitted from package details page for ${form.destination}.`
    });
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({
      name: "",
      phone: "",
      email: "",
      destination: details?.name || "",
      guests: "2 Guests",
      message: ""
    });
  };

  if (!details) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-background px-4 text-center py-20">
        <Compass className="h-16 w-16 text-brand animate-spin" />
        <h2 className="mt-6 text-2xl font-bold text-ink">Package Not Found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The requested tour package could not be retrieved.
        </p>
        <Link to="/packages">
          <button className="mt-6 rounded-full bg-brand px-6 py-3 text-sm font-bold text-white shadow">
            Back to All Packages
          </button>
        </Link>
      </div>
    );
  }

  // Load related package card items
  const relatedPackages = details.relatedSlugs
    .map((slug) => {
      const match = destinations.find((d) => getSlug(d.name) === slug);
      return match ? { ...match, slug } : null;
    })
    .filter(Boolean) as (typeof destinations[number] & { slug: string })[];

  const handleTabClick = (id: (typeof TABS)[number]["id"]) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const isDesktop = window.innerWidth >= 1280;
      const yOffset = isDesktop ? -135 : -120;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-background pb-20">
      <CommonHero
        title={details.name}
        subtitle={details.blurb}
        bgImage={details.image}
        breadcrumb="Packages"
      />

      {/* Quick Stats Bar - Fully mobile responsive layout sizes */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 bg-white rounded-[24px] sm:rounded-[32px] p-4 sm:p-6 shadow-luxury border border-border">
          <div className="flex items-center gap-2 sm:gap-3 border-r border-secondary last:border-r-0 pr-2">
            <span className="grid h-8 w-8 sm:h-10 sm:w-10 shrink-0 place-items-center rounded-lg sm:rounded-xl bg-brand/10 text-brand">
              <Calendar className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
            </span>
            <div className="min-w-0">
              <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-muted-foreground font-bold truncate">Duration</p>
              <p className="text-xs sm:text-sm font-bold text-ink mt-0.5 truncate">{details.duration}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 border-r border-secondary last:border-r-0 pr-2">
            <span className="grid h-8 w-8 sm:h-10 sm:w-10 shrink-0 place-items-center rounded-lg sm:rounded-xl bg-brand/10 text-brand">
              <Star className="h-4.5 w-4.5 sm:h-5 sm:w-5 fill-gold text-gold" />
            </span>
            <div className="min-w-0">
              <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-muted-foreground font-bold truncate">Rating</p>
              <p className="text-xs sm:text-sm font-bold text-ink mt-0.5 truncate">{details.rating} / 5.0</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 border-r border-secondary last:border-r-0 pr-2">
            <span className="grid h-8 w-8 sm:h-10 sm:w-10 shrink-0 place-items-center rounded-lg sm:rounded-xl bg-brand/10 text-brand">
              <Clock className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
            </span>
            <div className="min-w-0">
              <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-muted-foreground font-bold truncate">Best Time</p>
              <p className="text-xs font-bold text-ink mt-0.5 truncate max-w-[130px]">{details.bestTimeToVisit.split("(")[0]}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 pr-2">
            <span className="grid h-8 w-8 sm:h-10 sm:w-10 shrink-0 place-items-center rounded-lg sm:rounded-xl bg-brand/10 text-brand">
              <Plane className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
            </span>
            <div className="min-w-0">
              <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-muted-foreground font-bold truncate">Price starts</p>
              <p className="text-xs sm:text-sm font-bold text-brand mt-0.5 truncate">{details.price} /pp</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Enquiry Form Widget (visible only on screens < 1024px) */}
      <section className="block lg:hidden mx-auto max-w-7xl px-4 sm:px-6 mt-6">
        <div className="rounded-[32px] border border-border bg-white p-6 shadow-sm space-y-6">
          <div>
            <h4 className="font-display text-xl font-bold text-ink">Plan Your Journey</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Customise your itinerary with our travel specialists.
            </p>
          </div>

          <form
            onSubmit={handleFormSubmit}
            className="space-y-4"
          >
            <input
              type="text"
              required
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-2xl border border-transparent bg-secondary px-4 py-3.5 text-xs text-ink placeholder-muted-foreground outline-none focus:border-brand focus:bg-white transition"
            />

            <input
              type="tel"
              required
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full rounded-2xl border border-transparent bg-secondary px-4 py-3.5 text-xs text-ink placeholder-muted-foreground outline-none focus:border-brand focus:bg-white transition"
            />

            <input
              type="email"
              required
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-2xl border border-transparent bg-secondary px-4 py-3.5 text-xs text-ink placeholder-muted-foreground outline-none focus:border-brand focus:bg-white transition"
            />

            {/* Destination Dropdown */}
            <div className="relative">
              <select
                value={form.destination}
                onChange={(e) => setForm({ ...form, destination: e.target.value })}
                className="w-full rounded-2xl border border-transparent bg-secondary px-4 py-3.5 text-xs text-ink outline-none focus:border-brand focus:bg-white transition cursor-pointer appearance-none"
              >
                <option value="" disabled>Select Destination</option>
                {destinations.map((d) => (
                  <option key={d.name} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-muted-foreground">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>

            {/* Guests Dropdown */}
            <div className="relative">
              <select
                value={form.guests}
                onChange={(e) => setForm({ ...form, guests: e.target.value })}
                className="w-full rounded-2xl border border-transparent bg-secondary px-4 py-3.5 text-xs text-ink outline-none focus:border-brand focus:bg-white transition cursor-pointer appearance-none"
              >
                <option value="1 Guest">1 Guest</option>
                <option value="2 Guests">2 Guests</option>
                <option value="3 Guests">3 Guests</option>
                <option value="4 Guests">4 Guests</option>
                <option value="5+ Guests">5+ Guests</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-muted-foreground">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>

            <textarea
              rows={4}
              placeholder="Special requests or questions..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full rounded-2xl border border-transparent bg-secondary px-4 py-3.5 text-xs text-ink placeholder-muted-foreground outline-none focus:border-brand focus:bg-white transition resize-none"
            />

            <div className="space-y-3 pt-2">
              <button
                type="submit"
                className="w-full rounded-full bg-[#0066fe] py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#0055dd] cursor-pointer text-center"
              >
                {sent ? "Enquiry Sent!" : "Send Enquiry"}
              </button>

              <a
                href={`https://wa.me/917639277770?text=Hi%20SkyNow%20Holidays%2C%20I'd%20like%20to%20enquire%20about%20booking%20a%20trip%20to%20${encodeURIComponent(form.destination || "our destinations")}.`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-[#00c73c] py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#00b034] cursor-pointer"
              >
                <MessageCircle className="h-5 w-5 fill-white text-transparent" /> Chat on WhatsApp
              </a>

              <a
                href="tel:+917639277770"
                className="flex items-center justify-center gap-2 rounded-full bg-secondary py-3.5 text-sm font-bold text-ink transition hover:bg-secondary/80 cursor-pointer"
              >
                <Phone className="h-4 w-4" /> Call Now
              </a>
            </div>
          </form>
        </div>
      </section>

      {/* Main Grid Content */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          
          {/* Left Column: Details stacked vertically */}
          <main className="min-w-0 space-y-8">
            
            {/* Sticky Navigation Helper - aligned with header height */}
            <div className="sticky top-[64px] xl:top-[72px] z-20 bg-background/80 backdrop-blur-md flex border-b border-border overflow-x-auto scrollbar-none whitespace-nowrap py-1">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`relative px-6 py-3.5 text-xs sm:text-sm font-bold cursor-pointer transition-colors ${
                    activeTab === tab.id ? "text-brand" : "text-muted-foreground hover:text-ink"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.span
                      layoutId="details-tab"
                      className="absolute bottom-0 left-6 right-6 h-0.5 bg-brand"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Overview Section - scroll-mt aligned */}
            <section id="overview" className="bg-white rounded-[32px] p-6 sm:p-10 border border-border shadow-sm scroll-mt-[120px] xl:scroll-mt-[135px] space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-2xl font-bold text-ink">Overview</h3>
                <span className="rounded-full bg-brand/5 px-3.5 py-1 text-xs font-bold text-brand uppercase tracking-wider">
                  {details.tag}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{details.overview}</p>
              
              <div className="border-t border-secondary pt-6">
                <h4 className="font-display text-lg font-bold text-ink mb-4">Tour Highlights</h4>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {details.highlights.map((h, i) => (
                    <li key={i} className="flex gap-2.5 items-start text-sm text-ink leading-relaxed font-semibold">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded bg-brand/10 text-brand mt-0.5">
                        <Check className="h-3 w-3" />
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Itinerary Section - scroll-mt aligned */}
            <section id="itinerary" className="bg-white rounded-[32px] p-6 sm:p-10 border border-border shadow-sm scroll-mt-[120px] xl:scroll-mt-[135px] space-y-6">
              <h3 className="font-display text-2xl font-bold text-ink">Day-by-Day Itinerary</h3>
              <div className="flex flex-col gap-3">
                {details.itinerary.map((day) => {
                  const isOpen = openDay === day.day;
                  return (
                    <div
                      key={day.day}
                      className={`rounded-2xl border transition ${
                        isOpen ? "border-brand/35 bg-secondary/35" : "border-border"
                      }`}
                    >
                      <button
                        onClick={() => setOpenDay(isOpen ? null : day.day)}
                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer"
                      >
                        <span className="font-display text-base font-bold text-ink flex items-center gap-3">
                          <span className="rounded-lg bg-brand px-2.5 py-1 text-xs font-bold text-white uppercase tracking-wider">
                            {day.day}
                          </span>
                          {day.title}
                        </span>
                        <span className={`transition ${isOpen ? "rotate-180" : ""}`}>
                          <ChevronDown className="h-4 w-4" />
                        </span>
                      </button>
                      
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="px-5 pb-5 pl-5 sm:pl-16 text-sm text-muted-foreground leading-relaxed">
                              {day.desc}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Accommodations / Stays Section - scroll-mt aligned */}
            <section id="hotels" className="bg-white rounded-[32px] p-6 sm:p-10 border border-border shadow-sm scroll-mt-[120px] xl:scroll-mt-[135px] space-y-6">
              <h3 className="font-display text-2xl font-bold text-ink">Accommodations & Stays</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We select top-tier partner properties that guarantee safety, cleanliness, and premium services.
              </p>
              
              <div className="grid gap-4 sm:grid-cols-2">
                {details.hotels.map((h, i) => (
                  <div key={i} className="rounded-2xl border border-border p-5 flex items-start gap-4">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand shrink-0">
                      <Hotel className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="font-semibold text-ink text-base leading-tight">{h.name}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{h.location}</p>
                      <div className="mt-2 flex gap-0.5 text-gold">
                        {Array.from({ length: h.stars }).map((_, k) => (
                          <Star key={k} className="h-3.5 w-3.5 fill-gold text-gold" />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-secondary pt-6 space-y-3">
                <h4 className="font-display text-lg font-bold text-ink">Transportation Scope</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">{details.transportation}</p>
              </div>
            </section>

            {/* Inclusions & Exclusions Section - scroll-mt aligned */}
            <section id="inclusions" className="bg-white rounded-[32px] p-6 sm:p-10 border border-border shadow-sm scroll-mt-[120px] xl:scroll-mt-[135px] grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="font-display text-xl font-bold text-ink mb-4 text-emerald-600 flex items-center gap-2">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  Inclusions
                </h3>
                <ul className="space-y-3">
                  {details.inclusions.map((item, i) => (
                    <li key={i} className="flex gap-2.5 items-start text-xs font-semibold text-ink leading-normal">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-display text-xl font-bold text-ink mb-4 text-rose-600 flex items-center gap-2">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-rose-100 text-rose-600">
                    <X className="h-3.5 w-3.5" />
                  </span>
                  Exclusions
                </h3>
                <ul className="space-y-3">
                  {details.exclusions.map((item, i) => (
                    <li key={i} className="flex gap-2.5 items-start text-xs font-semibold text-ink leading-normal">
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Visa & Best Time Guidelines - scroll-mt aligned */}
            <section id="visa" className="bg-white rounded-[32px] p-6 sm:p-10 border border-border shadow-sm scroll-mt-[120px] xl:scroll-mt-[135px] space-y-6">
              <div>
                <h3 className="font-display text-2xl font-bold text-ink">Visa Guidelines</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{details.visaInfo}</p>
              </div>
              
              <div className="border-t border-secondary pt-6">
                <h3 className="font-display text-2xl font-bold text-ink">Best Time to Visit</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{details.bestTimeToVisit}</p>
              </div>
            </section>

            {/* Destination Photo Gallery - sliding marquee */}
            <div className="space-y-4 overflow-hidden py-2">
              <h3 className="font-display text-2xl font-bold text-ink">Destination Gallery</h3>
              <div className="group overflow-hidden py-1">
                <div className="flex w-max animate-marquee gap-4 pr-4 group-hover:[animation-play-state:paused]">
                  {[...details.images, ...details.images, ...details.images].map((img, i) => (
                    <div
                      key={img + "-" + i}
                      onClick={() => setActivePhoto(img)}
                      className="h-44 w-64 sm:h-52 sm:w-80 overflow-hidden rounded-2xl border border-border shadow-md shrink-0 transition duration-500 hover:scale-102 cursor-pointer"
                    >
                      <img
                        src={img}
                        alt="Destination snapshot"
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[800ms] hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Local FAQs */}
            <div className="space-y-4">
              <h3 className="font-display text-2xl font-bold text-ink">FAQs for {details.name}</h3>
              <div className="flex flex-col gap-3">
                {details.faqs.map((faq, i) => (
                  <div key={i} className="rounded-2xl border border-border bg-white p-5">
                    <h4 className="font-semibold text-ink text-sm sm:text-base">Q: {faq.q}</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed pl-4 border-l-2 border-brand">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </main>

          {/* Right Column: Enquiry Form & Fast Booking */}
          <aside className="hidden lg:block space-y-6">
            <div className="rounded-[32px] border border-border bg-white p-6 sm:p-8 shadow-sm space-y-6">
              <div>
                <h4 className="font-display text-xl font-bold text-ink">Plan Your Journey</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Customise your itinerary with our travel specialists.
                </p>
              </div>

              <form
                onSubmit={handleFormSubmit}
                className="space-y-4"
              >
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-2xl border border-transparent bg-secondary px-4 py-3.5 text-xs text-ink placeholder-muted-foreground outline-none focus:border-brand focus:bg-white transition"
                />

                <input
                  type="tel"
                  required
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-2xl border border-transparent bg-secondary px-4 py-3.5 text-xs text-ink placeholder-muted-foreground outline-none focus:border-brand focus:bg-white transition"
                />

                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-2xl border border-transparent bg-secondary px-4 py-3.5 text-xs text-ink placeholder-muted-foreground outline-none focus:border-brand focus:bg-white transition"
                />

                {/* Destination Dropdown */}
                <div className="relative">
                  <select
                    value={form.destination}
                    onChange={(e) => setForm({ ...form, destination: e.target.value })}
                    className="w-full rounded-2xl border border-transparent bg-secondary px-4 py-3.5 text-xs text-ink outline-none focus:border-brand focus:bg-white transition cursor-pointer appearance-none"
                  >
                    <option value="" disabled>Select Destination</option>
                    {destinations.map((d) => (
                      <option key={d.name} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-muted-foreground">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>

                {/* Guests Dropdown */}
                <div className="relative">
                  <select
                    value={form.guests}
                    onChange={(e) => setForm({ ...form, guests: e.target.value })}
                    className="w-full rounded-2xl border border-transparent bg-secondary px-4 py-3.5 text-xs text-ink outline-none focus:border-brand focus:bg-white transition cursor-pointer appearance-none"
                  >
                    <option value="1 Guest">1 Guest</option>
                    <option value="2 Guests">2 Guests</option>
                    <option value="3 Guests">3 Guests</option>
                    <option value="4 Guests">4 Guests</option>
                    <option value="5+ Guests">5+ Guests</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-muted-foreground">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>

                <textarea
                  rows={4}
                  placeholder="Special requests or questions..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-2xl border border-transparent bg-secondary px-4 py-3.5 text-xs text-ink placeholder-muted-foreground outline-none focus:border-brand focus:bg-white transition resize-none"
                />

                <div className="space-y-3 pt-2">
                  <button
                    type="submit"
                    className="w-full rounded-full bg-[#0066fe] py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#0055dd] cursor-pointer text-center"
                  >
                    {sent ? "Enquiry Sent!" : "Send Enquiry"}
                  </button>

                  <a
                    href={`https://wa.me/917639277770?text=Hi%20SkyNow%20Holidays%2C%20I'd%20like%20to%20enquire%20about%20booking%20a%20trip%20to%20${encodeURIComponent(form.destination || "our destinations")}.`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-full bg-[#00c73c] py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#00b034] cursor-pointer"
                  >
                    <MessageCircle className="h-5 w-5 fill-white text-transparent" /> Chat on WhatsApp
                  </a>

                  <a
                    href="tel:+917639277770"
                    className="flex items-center justify-center gap-2 rounded-full bg-secondary py-3.5 text-sm font-bold text-ink transition hover:bg-secondary/80 cursor-pointer"
                  >
                    <Phone className="h-4 w-4" /> Call Now
                  </a>
                </div>
              </form>
            </div>
          </aside>
        </div>
      </section>

      {/* Related Packages section */}
      <section className="border-t border-border bg-secondary/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h3 className="font-display text-2xl font-bold text-ink">Related Packages</h3>
          
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {relatedPackages.map((p) => (
              <div key={p.name} className="group rounded-[30px] border border-border bg-white overflow-hidden shadow-sm hover:shadow-luxury transition-all duration-300">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={p.image} alt={p.name} className="h-full w-full object-cover group-hover:scale-105 transition duration-500" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[9px] font-bold text-brand shadow">
                    {p.tag}
                  </span>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-bold text-muted-foreground">
                    <span>{p.country}</span>
                    <span>{p.duration}</span>
                  </div>
                  <h4 className="font-display text-lg font-bold text-ink truncate">{p.name}</h4>
                  <div className="flex items-center justify-between border-t border-secondary pt-3 mt-4">
                    <p className="font-display font-bold text-brand text-base">{p.price}</p>
                    <Link
                      to={`/packages/${p.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-brand hover:text-gold transition-colors cursor-pointer"
                    >
                      View Details <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm transition-all duration-300 animate-fade-in"
          onClick={() => setActivePhoto(null)}
        >
          <button
            onClick={() => setActivePhoto(null)}
            className="absolute right-6 top-6 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20 transition cursor-pointer"
          >
            <X className="h-6 w-6" />
          </button>
          <div
            className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-2xl shadow-luxury animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activePhoto}
              alt="Full size view"
              className="max-h-[85vh] max-w-[85vw] rounded-xl object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
