import { useState, useMemo, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Star, Calendar, Search, MessageCircle, Phone, ChevronDown } from "lucide-react";
import CommonHero from "@/components/skynow/CommonHero";
import { useAppData } from "@/lib/dataStore";
import { getSlug } from "@/components/skynow/packageDetailsData";

export const Route = createFileRoute("/packages/")({
  component: AllPackagesPage,
});

const REGIONS = ["All", "Southeast Asia", "Middle East", "Europe & Caucasus", "Himalayas & South Asia", "Africa & Others"] as const;

// Helper mapping destinations to regional filters
function getRegion(name: string): (typeof REGIONS)[number] {
  const seAsia = ["Bali", "Singapore & Malaysia", "Thailand", "Vietnam", "Cambodia & Vietnam", "Hong Kong & Macau"];
  const midEast = ["Dubai", "Bahrain", "Baku Azerbaijan", "Turkey"];
  const europe = ["Europe"];
  const himalayas = ["Nepal", "Bhutan", "Sri Lanka", "China", "Japan"];
  
  if (seAsia.includes(name)) return "Southeast Asia";
  if (midEast.includes(name)) return "Middle East";
  if (europe.includes(name)) return "Europe & Caucasus";
  if (himalayas.includes(name)) return "Himalayas & South Asia";
  return "Africa & Others"; // Egypt, Mauritius, Kenya, South Africa, USA, Australia, Almaty
}

function AllPackagesPage() {
  const { destinations, addMessage } = useAppData();
  const [selectedRegion, setSelectedRegion] = useState<(typeof REGIONS)[number]>("All");
  const [search, setSearch] = useState("");
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    destination: "",
    guests: "2 Guests",
    message: ""
  });

  const filteredPackages = useMemo(() => {
    return destinations.filter((p) => {
      // Search match
      const query = search.toLowerCase().trim();
      const matchesSearch =
        p.name.toLowerCase().includes(query) ||
        p.country.toLowerCase().includes(query) ||
        p.blurb.toLowerCase().includes(query);

      if (!matchesSearch) return false;

      // Region match
      if (selectedRegion !== "All") {
        const region = getRegion(p.name);
        if (region !== selectedRegion) return false;
      }

      return true;
    });
  }, [search, selectedRegion, destinations]);

  return (
    <div className="bg-background pb-20">
      <CommonHero
        title="International Packages"
        subtitle="Vetted itineraries across 22+ destinations. Handcrafted and 100% customisable."
        bgImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80"
      />

      {/* Filter and Search Section */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center justify-between border-b border-border pb-8">
          {/* Region Pills */}
          <div className="flex flex-wrap gap-2 order-2 md:order-1">
            {REGIONS.map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRegion(r)}
                className={`relative rounded-full px-4 py-2.5 text-xs font-semibold border transition cursor-pointer ${
                  selectedRegion === r
                    ? "bg-brand text-white border-brand shadow-luxury"
                    : "bg-white text-ink border-border hover:bg-secondary"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80 order-1 md:order-2">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search packages..."
              className="w-full rounded-full border border-border bg-white py-3 pl-11 pr-4 text-xs text-ink outline-none focus:border-brand shadow-sm font-medium"
            />
          </div>
        </div>

        {/* Responsive Grid with Sidebar Layout */}
        <div className="grid gap-8 lg:grid-cols-[1fr_320px] mt-12">
          {/* Left Column: Packages grid */}
          <main className="min-w-0 space-y-6">
            <motion.div
              className="grid grid-cols-1 gap-6 sm:grid-cols-2"
            >
              <AnimatePresence mode="popLayout">
                {filteredPackages.length > 0 ? (
                  filteredPackages.map((p, idx) => {
                    const slug = getSlug(p.name);
                    return (
                      <motion.article
                        key={p.name}
                        layout="position"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5, delay: (idx % 6) * 0.04 }}
                        className="group flex h-full flex-col overflow-hidden rounded-[30px] border border-border bg-white transition duration-500 hover:-translate-y-1.5 hover:shadow-luxury"
                      >
                        {/* Card Image */}
                        <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                          <img
                            src={p.image}
                            alt={p.name}
                            loading="lazy"
                            className="h-full w-full object-cover transition duration-[850ms] group-hover:scale-105"
                          />
                          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold text-brand shadow">
                            {p.tag}
                          </span>
                          <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-black/50 px-3 py-1 text-[10px] font-bold text-white backdrop-blur">
                            <Star className="h-3.5 w-3.5 fill-gold text-gold" /> {p.rating}
                          </span>
                        </div>

                        {/* Card Content */}
                        <div className="flex flex-1 flex-col gap-3.5 p-6">
                          <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold">
                            <span className="inline-flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5 text-brand" /> {p.country}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" /> {p.duration}
                            </span>
                          </div>
                          
                          <h3 className="font-display text-2xl font-bold text-ink group-hover:text-brand transition-colors">
                            {p.name}
                          </h3>
                          
                          <p className="text-sm leading-relaxed text-muted-foreground flex-1 line-clamp-3">
                            {p.blurb}
                          </p>
                          
                          <div className="mt-auto flex items-end justify-between pt-5 border-t border-secondary">
                            <div>
                              <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold">
                                Starting from
                              </p>
                              <p className="font-display text-2xl font-bold text-brand">
                                {p.price}
                                <span className="text-xs font-semibold text-muted-foreground">/pp</span>
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Link
                                to={`/packages/${slug}`}
                                className="rounded-full border border-border px-3.5 py-2 text-xs font-bold text-ink transition hover:bg-secondary text-center cursor-pointer"
                              >
                                Details
                              </Link>
                              <Link
                                to={`/packages/${slug}`}
                                className="rounded-full bg-brand px-4.5 py-2 text-xs font-bold text-white shadow transition hover:brightness-110 text-center cursor-pointer"
                              >
                                Book Now
                              </Link>
                            </div>
                          </div>
                        </div>
                      </motion.article>
                    );
                  })
                ) : (
                  <div className="col-span-full text-center py-20 rounded-[36px] border border-dashed border-border bg-white p-8">
                    <p className="font-display text-xl font-bold text-ink">No packages found</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Try adjusting filters or typing another keyword.
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          </main>

          {/* Right Column: Enquiry Form Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-[32px] border border-border bg-white p-6 shadow-sm space-y-6">
              <div>
                <h4 className="font-display text-lg font-bold text-ink">Plan Your Journey</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Customise your itinerary with our specialists.
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addMessage({
                    name: form.name,
                    phone: form.phone,
                    email: form.email,
                    destination: form.destination,
                    service: "Standard Holiday Tour",
                    travelDate: "Not Specified",
                    guests: form.guests,
                    message: form.message || "Plan Your Journey enquiry submitted from packages index page."
                  });
                  setSent(true);
                  setTimeout(() => setSent(false), 4000);
                  setForm({
                    name: "",
                    phone: "",
                    email: "",
                    destination: "",
                    guests: "2 Guests",
                    message: ""
                  });
                }}
                className="space-y-4"
              >
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-2xl border border-transparent bg-secondary px-4 py-3 text-xs text-ink placeholder-muted-foreground outline-none focus:border-brand focus:bg-white transition"
                />

                <input
                  type="tel"
                  required
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-2xl border border-transparent bg-secondary px-4 py-3 text-xs text-ink placeholder-muted-foreground outline-none focus:border-brand focus:bg-white transition"
                />

                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-2xl border border-transparent bg-secondary px-4 py-3 text-xs text-ink placeholder-muted-foreground outline-none focus:border-brand focus:bg-white transition"
                />

                {/* Destination Dropdown */}
                <div className="relative">
                  <select
                    value={form.destination}
                    onChange={(e) => setForm({ ...form, destination: e.target.value })}
                    className="w-full rounded-2xl border border-transparent bg-secondary px-4 py-3 text-xs text-ink outline-none focus:border-brand focus:bg-white transition cursor-pointer appearance-none"
                  >
                    <option value="">Select Destination</option>
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
                    className="w-full rounded-2xl border border-transparent bg-secondary px-4 py-3 text-xs text-ink outline-none focus:border-brand focus:bg-white transition cursor-pointer appearance-none"
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
                  rows={3}
                  placeholder="Special requests or questions..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-2xl border border-transparent bg-secondary px-4 py-3 text-xs text-ink placeholder-muted-foreground outline-none focus:border-brand focus:bg-white transition resize-none"
                />

                <div className="space-y-3 pt-2">
                  <button
                    type="submit"
                    className="w-full rounded-full bg-[#0066fe] py-3.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#0055dd] cursor-pointer text-center"
                  >
                    {sent ? "Enquiry Sent!" : "Send Enquiry"}
                  </button>

                  <a
                    href={`https://wa.me/917639277770?text=Hi%20SkyNow%20Holidays%2C%20I'd%20like%20to%20enquire%20about%20booking%20a%20trip%20to%20${encodeURIComponent(form.destination || "our destinations")}.`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-full bg-[#00c73c] py-3 text-xs font-bold text-white shadow-sm transition hover:bg-[#00b034] cursor-pointer"
                  >
                    <MessageCircle className="h-4 w-4 fill-white text-transparent" /> Chat on WhatsApp
                  </a>

                  <a
                    href="tel:+917639277770"
                    className="flex items-center justify-center gap-2 rounded-full bg-secondary py-3 text-xs font-bold text-ink transition hover:bg-secondary/80 cursor-pointer"
                  >
                    <Phone className="h-3.5 w-3.5" /> Call Now
                  </a>
                </div>
              </form>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
