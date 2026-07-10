import { useState, useMemo, useEffect } from "react";
import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MapPin, Search, ArrowRight, Filter, SlidersHorizontal, ChevronDown, MessageCircle, Phone } from "lucide-react";
import CommonHero from "@/components/skynow/CommonHero";
import { destinations } from "@/components/skynow/data";
import { getSlug } from "@/components/skynow/packageDetailsData";

export const Route = createFileRoute("/destinations")({
  component: DestinationsPage,
});

// Helper to check what continent a destination belongs to
function getContinent(name: string): "Asia" | "Europe" | "Africa" | "Americas" | "Oceania" {
  const asian = [
    "Bali", "Singapore & Malaysia", "Dubai", "Thailand", "Vietnam", "Cambodia & Vietnam",
    "China", "Hong Kong & Macau", "Nepal", "Bhutan", "Sri Lanka", "Bahrain",
    "Baku Azerbaijan", "Turkey", "Almaty Kazakhstan", "Japan"
  ];
  const african = ["Egypt", "South Africa", "Kenya", "Mauritius"];
  const european = ["Europe"];
  const american = ["USA"];
  const oceanian = ["Australia & New Zealand"];

  if (asian.includes(name)) return "Asia";
  if (african.includes(name)) return "Africa";
  if (european.includes(name)) return "Europe";
  if (american.includes(name)) return "Americas";
  return "Oceania";
}

// Helper to parse price string to number
function getNumericPrice(priceStr: string): number {
  return parseInt(priceStr.replace(/[₹,]/g, ""), 10) || 0;
}

// Helper to parse duration string to days count
function getDurationDays(durStr: string): number {
  // e.g. "6N / 7D" -> look for "7D" or grab the second number
  const matches = durStr.match(/(\d+)D/);
  if (matches && matches[1]) {
    return parseInt(matches[1], 10);
  }
  const firstMatch = durStr.match(/(\d+)/);
  return firstMatch ? parseInt(firstMatch[0], 10) : 6;
}

function DestinationsPage() {
  // Read query params from URL search (e.g. ?q=Bali)
  const searchParams: any = useSearch({ from: "/destinations" });
  const [search, setSearch] = useState("");

  // Filters State
  const [selectedContinent, setSelectedContinent] = useState<string>("All");
  const [selectedBudget, setSelectedBudget] = useState<string>("All");
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [selectedDuration, setSelectedDuration] = useState<string>("All");
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    destination: "",
    guests: "2 Guests",
    message: ""
  });

  // Sync initial query parameter
  useEffect(() => {
    if (searchParams.q) {
      setSearch(searchParams.q);
    }
  }, [searchParams]);

  // Tag list extracted from data
  const tags = ["All", "International", "Beach", "Adventure", "Luxury", "Family", "Honeymoon", "Group Tours"] as const;

  // Filter logic
  const filteredDestinations = useMemo(() => {
    return destinations.filter((d) => {
      // 1. Search Query
      const query = search.toLowerCase().trim();
      const matchesSearch =
        d.name.toLowerCase().includes(query) ||
        d.country.toLowerCase().includes(query) ||
        d.blurb.toLowerCase().includes(query);

      if (!matchesSearch) return false;

      // 2. Continent
      if (selectedContinent !== "All") {
        const continent = getContinent(d.name);
        if (continent !== selectedContinent) return false;
      }

      // 3. Budget Bracket
      if (selectedBudget !== "All") {
        const price = getNumericPrice(d.price);
        if (selectedBudget === "Budget" && price >= 60000) return false;
        if (selectedBudget === "Mid-range" && (price < 60000 || price > 100000)) return false;
        if (selectedBudget === "Luxury" && price <= 100000) return false;
      }

      // 4. Tag Category
      if (selectedTag !== "All" && d.tag !== selectedTag) return false;

      // 5. Duration
      if (selectedDuration !== "All") {
        const days = getDurationDays(d.duration);
        if (selectedDuration === "Short" && days > 5) return false;
        if (selectedDuration === "Medium" && (days < 6 || days > 9)) return false;
        if (selectedDuration === "Long" && days < 10) return false;
      }

      return true;
    });
  }, [search, selectedContinent, selectedBudget, selectedTag, selectedDuration]);

  const clearAllFilters = () => {
    setSearch("");
    setSelectedContinent("All");
    setSelectedBudget("All");
    setSelectedTag("All");
    setSelectedDuration("All");
  };

  return (
    <div className="bg-background pb-20">
      <CommonHero
        title="All Destinations"
        subtitle="Explore our vetted collection of 22+ premium international holidays."
        bgImage="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          
          {/* Filters & Enquiry Sidebar (Desktop) */}
          <div className="hidden lg:flex flex-col gap-6">
            <aside className="space-y-6 rounded-[32px] border border-border bg-white p-6 shadow-sm h-fit w-full">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <span className="flex items-center gap-2 font-display text-lg font-bold text-ink">
                  <Filter className="h-4 w-4 text-brand" /> Filters
                </span>
                <button
                  onClick={clearAllFilters}
                  className="text-xs font-semibold text-brand hover:text-gold transition cursor-pointer"
                >
                  Clear All
                </button>
              </div>

              {/* Continent */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Continent</h4>
                <div className="flex flex-col gap-2">
                  {["All", "Asia", "Europe", "Africa", "Americas", "Oceania"].map((cont) => (
                    <button
                      key={cont}
                      onClick={() => setSelectedContinent(cont)}
                      className={`text-left text-sm font-semibold rounded-xl px-3 py-2 transition-all cursor-pointer ${
                        selectedContinent === cont ? "bg-brand/10 text-brand" : "text-ink hover:bg-secondary"
                      }`}
                    >
                      {cont}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div className="border-t border-border pt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Budget Bracket</h4>
                <div className="flex flex-col gap-2">
                  {[
                    { label: "All Budgets", val: "All" },
                    { label: "Budget (Under ₹60k)", val: "Budget" },
                  { label: "Mid-Range (₹60k - ₹1L)", val: "Mid-range" },
                  { label: "Luxury (Over ₹1L)", val: "Luxury" },
                ].map((b) => (
                  <button
                    key={b.val}
                    onClick={() => setSelectedBudget(b.val)}
                    className={`text-left text-sm font-semibold rounded-xl px-3 py-2 transition-all cursor-pointer ${
                      selectedBudget === b.val ? "bg-brand/10 text-brand" : "text-ink hover:bg-secondary"
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="border-t border-border pt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Package Category</h4>
              <div className="flex flex-col gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`text-left text-sm font-semibold rounded-xl px-3 py-2 transition-all cursor-pointer ${
                      selectedTag === tag ? "bg-brand/10 text-brand" : "text-ink hover:bg-secondary"
                    }`}
                  >
                    {tag === "All" ? "All Categories" : tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div className="border-t border-border pt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Duration</h4>
              <div className="flex flex-col gap-2">
                {[
                  { label: "All Durations", val: "All" },
                  { label: "Short (1 - 5 Days)", val: "Short" },
                  { label: "Medium (6 - 9 Days)", val: "Medium" },
                  { label: "Long (10+ Days)", val: "Long" },
                ].map((dur) => (
                  <button
                    key={dur.val}
                    onClick={() => setSelectedDuration(dur.val)}
                    className={`text-left text-sm font-semibold rounded-xl px-3 py-2 transition-all cursor-pointer ${
                      selectedDuration === dur.val ? "bg-brand/10 text-brand" : "text-ink hover:bg-secondary"
                    }`}
                  >
                    {dur.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Unified Enquiry Form Card */}
          <aside className="rounded-[32px] border border-border bg-white p-6 shadow-sm space-y-6 w-full">
            <div>
              <h4 className="font-display text-lg font-bold text-ink">Plan Your Journey</h4>
              <p className="text-xs text-muted-foreground mt-1">
                Customise your itinerary with our specialists.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
                setTimeout(() => setSent(false), 4000);
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
                  href={`https://wa.me/911234567890?text=Hi%20SkyNow%20Holidays%2C%20I'd%20like%20to%20enquire%20about%20booking%20a%20trip%20to%20${encodeURIComponent(form.destination || "our destinations")}.`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full bg-[#00c73c] py-3 text-xs font-bold text-white shadow-sm transition hover:bg-[#00b034] cursor-pointer"
                >
                  <MessageCircle className="h-4 w-4 fill-white text-transparent" /> Chat on WhatsApp
                </a>

                <a
                  href="tel:+911234567890"
                  className="flex items-center justify-center gap-2 rounded-full bg-secondary py-3 text-xs font-bold text-ink transition hover:bg-secondary/80 cursor-pointer"
                >
                  <Phone className="h-3.5 w-3.5" /> Call Now
                </a>
              </div>
            </form>
          </aside>
        </div>

          {/* Grid Content */}
          <main className="min-w-0 space-y-6">
            
            {/* Search Bar & Mobile Filter Trigger */}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search countries, regions or packages..."
                  className="w-full rounded-full border border-border bg-white py-3.5 pl-11 pr-4 text-sm text-ink outline-none focus:border-brand shadow-sm"
                />
              </div>
              
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFiltersMobile(!showFiltersMobile)}
                className="lg:hidden flex items-center justify-center gap-2 rounded-full border border-border bg-white px-5 py-3 text-sm font-bold text-ink shadow-sm cursor-pointer"
              >
                <SlidersHorizontal className="h-4 w-4" /> Filters
              </button>
            </div>

            {/* Active Filters Summary */}
            <div className="flex flex-wrap gap-2 text-xs">
              {selectedContinent !== "All" && (
                <span className="rounded-full bg-secondary border border-border px-3 py-1 font-semibold text-ink">
                  Continent: {selectedContinent}
                </span>
              )}
              {selectedBudget !== "All" && (
                <span className="rounded-full bg-secondary border border-border px-3 py-1 font-semibold text-ink">
                  Budget: {selectedBudget}
                </span>
              )}
              {selectedTag !== "All" && (
                <span className="rounded-full bg-secondary border border-border px-3 py-1 font-semibold text-ink">
                  Category: {selectedTag}
                </span>
              )}
              {selectedDuration !== "All" && (
                <span className="rounded-full bg-secondary border border-border px-3 py-1 font-semibold text-ink">
                  Duration: {selectedDuration}
                </span>
              )}
            </div>

            {/* Destinations Grid */}
            <motion.div
              layout
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {filteredDestinations.length > 0 ? (
                  filteredDestinations.map((d, idx) => (
                    <motion.article
                      key={d.name}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, delay: (idx % 6) * 0.03 }}
                      className="group relative isolate flex h-[380px] flex-col justify-end overflow-hidden rounded-[30px] shadow-sm border border-border"
                    >
                      <img
                        src={d.image}
                        alt={d.name}
                        className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                      
                      <span className="absolute left-5 top-5 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold text-brand shadow">
                        {d.tag}
                      </span>
                      <span className="absolute right-5 top-5 flex items-center gap-1 rounded-full bg-black/40 px-3 py-1 text-[10px] font-bold text-white backdrop-blur">
                        <Star className="h-3 w-3 fill-gold text-gold" /> {d.rating}
                      </span>

                      <div className="glass-dark m-4 rounded-2xl p-4 text-white">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <h3 className="font-display text-xl font-bold leading-tight truncate">{d.name}</h3>
                            <p className="text-[10px] uppercase tracking-widest text-white/60 mt-0.5">{d.country}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-[9px] uppercase tracking-widest text-white/60">From</p>
                            <p className="font-display text-lg font-bold text-gold">{d.price}</p>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-xs text-white/70">{d.duration}</span>
                          <Link
                            to={`/packages/${getSlug(d.name)}`}
                            className="inline-flex items-center gap-1 rounded-full bg-gold px-3.5 py-1.5 text-xs font-bold text-ink transition hover:brightness-110 cursor-pointer"
                          >
                            Explore <ArrowRight className="h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                    </motion.article>
                  ))
                ) : (
                  <div className="col-span-full text-center py-20 rounded-[36px] border border-dashed border-border bg-white p-8">
                    <p className="font-display text-xl font-bold text-ink">No destinations match filters</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Try clearing filters or running a broader search.
                    </p>
                    <button
                      onClick={clearAllFilters}
                      className="mt-6 rounded-full bg-brand px-6 py-2.5 text-xs font-bold text-white shadow transition hover:brightness-110 cursor-pointer"
                    >
                      Clear All Filters
                    </button>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          </main>
        </div>
      </section>

      {/* Mobile Filters Drawer */}
      <AnimatePresence>
        {showFiltersMobile && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFiltersMobile(false)}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed bottom-0 left-0 right-0 z-55 max-h-[85vh] overflow-y-auto rounded-t-[36px] bg-white p-6 shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between border-b border-border pb-4">
                <span className="font-display text-lg font-bold text-ink">Filters</span>
                <button
                  onClick={() => {
                    clearAllFilters();
                    setShowFiltersMobile(false);
                  }}
                  className="text-xs font-semibold text-brand transition cursor-pointer"
                >
                  Clear All
                </button>
              </div>

              {/* Continent */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Continent</h4>
                <div className="flex flex-wrap gap-2">
                  {["All", "Asia", "Europe", "Africa", "Americas", "Oceania"].map((cont) => (
                    <button
                      key={cont}
                      onClick={() => setSelectedContinent(cont)}
                      className={`text-xs font-semibold rounded-full px-4 py-2 border transition-all cursor-pointer ${
                        selectedContinent === cont ? "bg-brand text-white border-brand" : "text-ink bg-white border-border"
                      }`}
                    >
                      {cont}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Budget Bracket</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "All Budgets", val: "All" },
                    { label: "Budget (< ₹60k)", val: "Budget" },
                    { label: "Mid (₹60k - ₹1L)", val: "Mid-range" },
                    { label: "Luxury (&gt; ₹1L)", val: "Luxury" },
                  ].map((b) => (
                    <button
                      key={b.val}
                      onClick={() => setSelectedBudget(b.val)}
                      className={`text-xs font-semibold rounded-full px-4 py-2 border transition-all cursor-pointer ${
                        selectedBudget === b.val ? "bg-brand text-white border-brand" : "text-ink bg-white border-border"
                      }`}
                      dangerouslySetInnerHTML={{ __html: b.label }}
                    />
                  ))}
                </div>
              </div>

              {/* Category */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Category</h4>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`text-xs font-semibold rounded-full px-4 py-2 border transition-all cursor-pointer ${
                        selectedTag === tag ? "bg-brand text-white border-brand" : "text-ink bg-white border-border"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Duration</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "All", val: "All" },
                    { label: "Short (1-5 Days)", val: "Short" },
                    { label: "Medium (6-9 Days)", val: "Medium" },
                    { label: "Long (10+ Days)", val: "Long" },
                  ].map((dur) => (
                    <button
                      key={dur.val}
                      onClick={() => setSelectedDuration(dur.val)}
                      className={`text-xs font-semibold rounded-full px-4 py-2 border transition-all cursor-pointer ${
                        selectedDuration === dur.val ? "bg-brand text-white border-brand" : "text-ink bg-white border-border"
                      }`}
                    >
                      {dur.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setShowFiltersMobile(false)}
                className="w-full rounded-full bg-brand py-3.5 text-center text-sm font-bold text-white shadow"
              >
                Apply Filters
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
