import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
  useInView,
} from "framer-motion";
import {
  ArrowRight,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  PlaneTakeoff,
  Search,
  Send,
  Star,
  Users,
  X,
  Youtube,
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import logoImage from "@/assets/FINAL-removebg-preview.png";
import { getSlug } from "./packageDetailsData";
import {
  destinations,
  features,
  galleryImages,
  faqs,
  stats,
  testimonials,
  trustBadges,
  partnerLogos,
  type Destination,
} from "./data";

/* ---------------- Utility hooks ---------------- */
function useCounter(target: number, inView: boolean, duration = 1800) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, inView, duration]);
  return val;
}

/* ---------------- Reveal wrapper ---------------- */
function Reveal({
  children,
  y = 24,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  y?: number;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- Magnetic Button ---------------- */
function MagneticButton({
  children,
  variant = "primary",
  onClick,
  href,
  className = "",
  ariaLabel,
}: {
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "gold" | "outline";
  onClick?: () => void;
  href?: string;
  className?: string;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 15 });
  const sy = useSpring(y, { stiffness: 180, damping: 15 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const relX = e.clientX - (r.left + r.width / 2);
    const relY = e.clientY - (r.top + r.height / 2);
    x.set(relX * 0.25);
    y.set(relY * 0.25);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-shadow will-change-transform overflow-hidden";
  const variants = {
    primary: "bg-brand text-brand-foreground shadow-luxury hover:shadow-2xl",
    gold: "bg-gold text-gold-foreground shadow-luxury hover:shadow-2xl",
    ghost: "text-ink hover:bg-white/60",
    outline: "border border-white/70 text-white hover:bg-white/10 backdrop-blur",
  } as const;

  const inner = (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0 opacity-0 [background:radial-gradient(circle_at_var(--mx)_var(--my),white/40,transparent_60%)]"
      />
    </>
  );

  const cls = `${base} ${variants[variant]} ${className}`;
  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={{ x: sx, y: sy }}
        className={cls}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {inner}
      </motion.a>
    );
  }
  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={cls}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {inner}
    </motion.button>
  );
}

/* ---------------- Hero Section ---------------- */
function Hero() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 240]);

  // Form State
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    destination: "",
    tripType: "",
    name: "",
    whatsapp: "",
    month: ""
  });

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-ink"
    >
      {/* Background Parallax */}
      <motion.div style={{ y }} className="absolute inset-0 h-[110%] w-full">
        <img
          src={heroBg}
          alt="Luxury travel view"
          className="h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/40 to-[oklch(0.12_0.03_265)]" />
      </motion.div>

      {/* Decorative Blur Orbs */}
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-[40vw] w-[40vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/20 blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-[35vw] w-[35vw] translate-x-1/2 translate-y-1/2 rounded-full bg-gold/15 blur-[120px]" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-4 py-32 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_450px] lg:items-center w-full">
          
          {/* Left Column: Headline & Description */}
          <div className="max-w-2xl text-left">
            {/* Heading */}
            <Reveal delay={0.1}>
              <h1 className="mt-6 font-display text-5xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl">
                Explore the World with <br />
                <span className="font-serif italic font-normal text-gradient-gold">
                  SkyNow Holidays.
                </span>
              </h1>
            </Reveal>

            {/* CTAs */}
            <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-4">
              <Link to="/packages">
                <MagneticButton variant="gold">
                  Explore Packages <ArrowRight className="h-4 w-4" />
                </MagneticButton>
              </Link>
              <Link to="/destinations">
                <MagneticButton variant="outline">View Destinations</MagneticButton>
              </Link>
            </Reveal>
          </div>

          {/* Right Column: Glassmorphism Plan Your Trip Form Card */}
          <Reveal delay={0.3} className="w-full">
            <div className="glass-dark border border-white/10 rounded-[32px] p-6 sm:p-8 space-y-6 shadow-2xl relative">
              <div className="text-center">
                <h3 className="font-display text-2xl font-bold text-white tracking-wide">Plan Your Trip</h3>
                <p className="text-xs text-white/70 mt-1">
                  Tell us your preferences & we'll craft your dream journey
                </p>
              </div>

              <form onSubmit={handleHeroSubmit} className="space-y-4">
                {/* Select Destination */}
                <div className="relative">
                  <select
                    value={form.destination}
                    onChange={(e) => setForm({ ...form, destination: e.target.value })}
                    required
                    className="w-full bg-white/10 border border-white/20 text-white rounded-2xl px-4 py-3 text-xs outline-none focus:border-gold cursor-pointer transition appearance-none"
                  >
                    <option value="" disabled className="bg-ink text-white">Select Destination</option>
                    {destinations.map((d) => (
                      <option key={d.name} value={d.name} className="bg-ink text-white">{d.name}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-white/60">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>

                {/* Select Trip Type */}
                <div className="relative">
                  <select
                    value={form.tripType}
                    onChange={(e) => setForm({ ...form, tripType: e.target.value })}
                    required
                    className="w-full bg-white/10 border border-white/20 text-white rounded-2xl px-4 py-3 text-xs outline-none focus:border-gold cursor-pointer transition appearance-none"
                  >
                    <option value="" disabled className="bg-ink text-white">Select Trip Type</option>
                    <option value="Honeymoon" className="bg-ink text-white">Honeymoon</option>
                    <option value="Adventure" className="bg-ink text-white">Adventure</option>
                    <option value="Family" className="bg-ink text-white">Family Holiday</option>
                    <option value="Group Tours" className="bg-ink text-white">Group Tour</option>
                    <option value="Luxury Stay" className="bg-ink text-white">Luxury Stay</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-white/60">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>

                {/* Your Name */}
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-white/60 rounded-2xl px-4 py-3 text-xs outline-none focus:border-gold transition"
                />

                {/* WhatsApp Number */}
                <input
                  type="tel"
                  required
                  placeholder="WhatsApp Number"
                  value={form.whatsapp}
                  onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-white/60 rounded-2xl px-4 py-3 text-xs outline-none focus:border-gold transition"
                />

                {/* Travel Month */}
                <div className="relative">
                  <select
                    value={form.month}
                    onChange={(e) => setForm({ ...form, month: e.target.value })}
                    required
                    className="w-full bg-white/10 border border-white/20 text-white rounded-2xl px-4 py-3 text-xs outline-none focus:border-gold cursor-pointer transition appearance-none"
                  >
                    <option value="" disabled className="bg-ink text-white">Travel Month</option>
                    {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((m) => (
                      <option key={m} value={m} className="bg-ink text-white">{m}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-white/60">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full bg-[#0066fe] hover:bg-[#0055dd] text-white py-3.5 rounded-full font-bold transition shadow text-xs tracking-wider uppercase cursor-pointer text-center"
                >
                  {sent ? "Inquiry Submitted!" : "Submit Inquiry"}
                </button>
              </form>

              {/* Form Footer */}
              <div className="text-center pt-2 border-t border-white/10 flex justify-between text-[10px] text-white/50 tracking-wider font-semibold uppercase">
                <span>Instant Reply</span>
                <span>24/7 Concierge Support</span>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}

function SearchForm() {
  const [destination, setDestination] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close suggestions panel on clicking outside
  useEffect(() => {
    const clickAway = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", clickAway);
    return () => document.removeEventListener("mousedown", clickAway);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (destination.trim()) {
      navigate({
        to: "/destinations",
        search: { q: destination.trim() },
      });
    } else {
      navigate({ to: "/destinations" });
    }
  };

  const SUGGESTIONS = [
    { name: "Bali", desc: "Emerald terraces & barefoot luxury stays" },
    { name: "Singapore & Malaysia", desc: "Sentosa, Petronas towers & city combos" },
    { name: "Dubai", desc: "Burj Khalifa views, desert safaris & yachts" },
    { name: "Thailand", desc: "Long-tail boats & crystal Andaman beaches" },
    { name: "Vietnam", desc: "Emerald bays, caves & old quarters tours" },
  ];

  return (
    <div ref={containerRef} className="relative w-full max-w-3xl mx-auto z-30">
      <motion.form
        onSubmit={handleSearch}
        className="flex flex-col gap-3 rounded-[28px] border border-white/10 bg-white p-3 shadow-[0_20px_50px_rgba(0,0,0,0.18)] md:flex-row md:items-center md:rounded-full md:p-2 w-full"
      >
        <SearchField icon={MapPin} label="Where to go?">
          <input
            type="text"
            value={destination}
            onFocus={() => setOpen(true)}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Search 22+ destinations..."
            className="bg-transparent text-base text-ink outline-none placeholder:text-muted-foreground w-full font-semibold py-0.5"
          />
        </SearchField>

        <button
          type="submit"
          className="group ml-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-brand px-7 py-4 text-sm font-bold text-white shadow-luxury transition hover:brightness-110 md:rounded-full w-full md:w-auto cursor-pointer"
        >
          <Search className="h-4 w-4" />
          Search Tours
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </motion.form>

      {/* Suggestion panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white rounded-3xl border border-border shadow-[0_20px_40px_rgba(0,0,0,0.12)] p-4 text-ink flex flex-col gap-2 max-h-[320px] overflow-y-auto"
          >
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground px-3 mb-2">
              Popular Search Suggestions
            </p>
            {SUGGESTIONS.map((s) => (
              <button
                key={s.name}
                type="button"
                onClick={() => {
                  setDestination(s.name);
                  setOpen(false);
                  navigate({
                    to: "/destinations",
                    search: { q: s.name },
                  });
                }}
                className="flex items-center gap-3 rounded-2xl px-3 py-2 text-left transition hover:bg-secondary w-full group cursor-pointer"
              >
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand/10 text-brand group-hover:bg-brand group-hover:text-white transition-colors">
                  <MapPin className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-bold text-ink">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
                <ArrowRight className="h-3.5 w-3.5 ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition" />
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SearchField({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof MapPin;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-1 items-center gap-3 rounded-2xl px-4 py-3 transition hover:bg-secondary/40 md:border-r md:border-border/30 md:last:border-r-0 cursor-text">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
        <Icon className="h-4 w-4" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-brand">
          {label}
        </span>
        {children}
      </span>
    </label>
  );
}

/* ---------------- Trust Section ---------------- */
function TrustSection() {
  return (
    <section id="trust" className="relative bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="text-center text-xs uppercase tracking-[0.4em] text-brand">
            Trusted worldwide
          </p>
          <h2 className="mx-auto mt-3 max-w-3xl text-center text-3xl font-semibold text-ink sm:text-4xl">
            Trusted by thousands of{" "}
            <span className="text-gradient-brand">happy travellers</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {trustBadges.map((b, i) => (
            <Reveal key={b.label} delay={i * 0.05}>
              <div className="group flex h-full flex-col items-center gap-3 rounded-3xl border border-border bg-white p-6 text-center transition hover:-translate-y-1 hover:border-brand/30 hover:shadow-luxury">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand to-[oklch(0.65_0.22_245)] text-white shadow-md transition group-hover:scale-110">
                  <b.icon className="h-6 w-6" />
                </span>
                <p className="text-sm font-semibold text-ink">{b.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Destinations ---------------- */
const CATEGORIES = [
  "All",
  "International",
  "Beach",
  "Adventure",
  "Luxury",
  "Family",
  "Honeymoon",
  "Group Tours",
] as const;

function DestinationsSection() {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const filtered = useMemo(
    () => (cat === "All" ? destinations.slice(0, 6) : destinations.filter((d) => d.tag === cat).slice(0, 6)),
    [cat]
  );
  return (
    <section id="destinations" className="relative bg-secondary py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.4em] text-brand">
              Popular destinations
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-4xl font-semibold text-ink sm:text-5xl">
              Handpicked corners of the world,
              <br />
              <span className="italic text-gradient-brand">worth every mile.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-muted-foreground">
              From honeymoons in Bali to safaris in Kenya — 22+ international itineraries designed by specialists who've been there.
            </p>
          </Reveal>
        </div>

        {/* Filters */}
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition ${
                  cat === c ? "text-white" : "text-ink hover:bg-white"
                }`}
              >
                {cat === c && (
                  <motion.span
                    layoutId="cat-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-brand shadow-luxury"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div
          layout
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((d, i) => (
              <DestinationCard key={d.name} d={d} i={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More Destinations */}
        <div className="mt-12 text-center">
          <Link to="/destinations">
            <MagneticButton variant="ghost" className="!bg-white">
              View All Destinations <ArrowRight className="h-4 w-4" />
            </MagneticButton>
          </Link>
        </div>
      </div>
    </section>
  );
}

function DestinationCard({ d, i }: { d: Destination; i: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
      className="group relative isolate flex h-[440px] flex-col justify-end overflow-hidden rounded-[30px] shadow-luxury"
    >
      <img
        src={d.image}
        alt={`${d.name} — ${d.country}`}
        loading="lazy"
        className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
      <span className="absolute left-5 top-5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-brand shadow">
        {d.tag}
      </span>
      <span className="absolute right-5 top-5 flex items-center gap-1 rounded-full bg-black/40 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur">
        <Star className="h-3 w-3 fill-gold text-gold" /> {d.rating}
      </span>

      <div className="glass-dark m-4 rounded-2xl p-5 text-white">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-display text-2xl font-semibold leading-tight">
              {d.name}
            </h3>
            <p className="mt-0.5 text-xs uppercase tracking-widest text-white/60">
              {d.country}
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-[10px] uppercase tracking-widest text-white/60">From</p>
            <p className="font-display text-xl font-semibold text-gold">{d.price}</p>
          </div>
        </div>
        <p className="mt-3 line-clamp-2 text-sm text-white/80">{d.blurb}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs font-medium text-white/70">{d.duration}</span>
          <Link
            to={`/packages/${getSlug(d.name)}`}
            className="inline-flex items-center gap-1 rounded-full bg-gold px-4 py-2 text-xs font-semibold text-ink transition hover:brightness-110 cursor-pointer"
          >
            Explore <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

/* ---------------- Packages Section (top 6 featured) ---------------- */
function PackagesSection() {
  const featured = destinations.slice(0, 6);
  return (
    <section id="packages" className="relative overflow-hidden bg-white py-24">
      <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-brand/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-20 h-96 w-96 rounded-full bg-gold/15 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-brand">
                Featured packages
              </p>
              <h2 className="mt-3 max-w-2xl font-display text-4xl font-semibold text-ink sm:text-5xl">
                Ready-to-go itineraries,{" "}
                <span className="italic text-gradient-brand">infinitely customisable.</span>
              </h2>
            </div>
            <Link to="/packages">
              <MagneticButton variant="ghost" className="!bg-secondary">
                View all packages <ArrowRight className="h-4 w-4" />
              </MagneticButton>
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.05}>
              <div className="group flex h-full flex-col overflow-hidden rounded-[30px] border border-border bg-white transition duration-500 hover:-translate-y-2 hover:shadow-luxury">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-[900ms] group-hover:scale-110"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-brand shadow">
                    {p.tag}
                  </span>
                  <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-black/50 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur">
                    <Star className="h-3 w-3 fill-gold text-gold" /> {p.rating}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {p.country}
                    </span>
                    <span>{p.duration}</span>
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-ink">
                    {p.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{p.blurb}</p>
                  <div className="mt-auto flex items-end justify-between pt-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                        Starting from
                      </p>
                      <p className="font-display text-2xl font-semibold text-brand">
                        {p.price}
                        <span className="text-xs text-muted-foreground">/pp</span>
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        to={`/packages/${getSlug(p.name)}`}
                        className="rounded-full border border-border px-3 py-2 text-xs font-semibold text-ink transition hover:bg-secondary text-center cursor-pointer"
                      >
                        Details
                      </Link>
                      <Link
                        to={`/packages/${getSlug(p.name)}`}
                        className="rounded-full bg-brand px-4 py-2 text-xs font-semibold text-white shadow transition hover:brightness-110 text-center cursor-pointer"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- About / Why Choose ---------------- */
function AboutSection() {
  return (
    <section
      id="about"
      className="relative bg-gradient-to-b from-white to-secondary py-24"
    >
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[36px] shadow-luxury">
              <img
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80"
                alt="Traveller looking over the mountains"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-4 hidden w-64 rounded-3xl bg-white p-5 shadow-luxury sm:block">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Trusted since
              </p>
              <p className="font-display text-4xl font-semibold text-brand">2010</p>
              <div className="mt-2 flex -space-x-2">
                {testimonials.slice(0, 4).map((t) => (
                  <img
                    key={t.name}
                    src={t.avatar}
                    alt=""
                    className="h-8 w-8 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">10,000+ travellers · 4.9★</p>
            </div>
            <div className="absolute -left-4 top-6 hidden rounded-2xl bg-gold px-4 py-3 text-ink shadow-luxury animate-float sm:block">
              <p className="text-[10px] uppercase tracking-widest">Best Price</p>
              <p className="font-display text-lg font-semibold">Guaranteed</p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="text-xs uppercase tracking-[0.4em] text-brand">
              Why SkyNow Holidays
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">
              A boutique travel studio,
              <br />
              <span className="italic text-gradient-brand">obsessed with the details.</span>
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              We're a small team of destination specialists, ex-flight crew, and hospitality veterans. We don't do templates — every itinerary is designed around you, and backed by 24/7 human support.
            </p>
          </Reveal>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {features.slice(0, 8).map((f, i) => (
              <Reveal key={f.title} delay={i * 0.04}>
                <div className="group flex gap-3 rounded-2xl border border-border bg-white p-4 transition hover:-translate-y-1 hover:border-brand/40 hover:shadow-md">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand transition group-hover:bg-brand group-hover:text-white">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-ink">{f.title}</p>
                    <p className="text-xs text-muted-foreground">{f.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className="mt-8">
            <Link to="/about">
              <MagneticButton variant="primary">
                Learn More About Us <ArrowRight className="h-4 w-4" />
              </MagneticButton>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}



/* ---------------- Stats ---------------- */
function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const n = useCounter(value, inView);
  return (
    <div
      ref={ref}
      className="rounded-3xl border border-white/15 bg-white/5 p-6 text-center backdrop-blur"
    >
      <p className="font-display text-4xl font-semibold text-white sm:text-5xl">
        {n.toLocaleString()}
        <span className="text-gold">{suffix}</span>
      </p>
      <p className="mt-2 text-sm uppercase tracking-widest text-white/70">{label}</p>
    </div>
  );
}
function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-[oklch(0.15_0.05_265)] py-20 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:32px_32px]" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 sm:px-6 lg:grid-cols-4">
        {stats.map((s) => (
          <Stat key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
}

/* ---------------- Gallery Preview ---------------- */
function Gallery() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  const row1 = galleryImages.slice(0, 6);
  const row2 = galleryImages.slice(6, 12);

  return (
    <section id="gallery" className="bg-white py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-brand">
                Travel diaries
              </p>
              <h2 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">
                Moments from our
                <br />
                <span className="italic text-gradient-brand">travellers' cameras.</span>
              </h2>
            </div>
            <p className="max-w-md text-muted-foreground">
              Real photos from real trips. Every frame here started as an enquiry — could yours be next?
            </p>
          </div>
        </Reveal>
      </div>

      {/* Sliding photo marquees - moves and pauses on hover */}
      <div className="mt-12 space-y-6">
        {/* Row 1: Right to Left */}
        <div className="group overflow-hidden py-2">
          <div className="flex w-max animate-marquee gap-4 pr-4 group-hover:[animation-play-state:paused]">
            {[...row1, ...row1, ...row1].map((src, idx) => (
              <button
                key={src + "-r1-" + idx}
                onClick={() => setLightbox(src)}
                className="relative h-48 w-72 sm:h-56 sm:w-80 overflow-hidden rounded-3xl cursor-pointer shrink-0 shadow-md transition duration-500 hover:scale-102 hover:shadow-lg hover:border hover:border-gold/30"
              >
                <img
                  src={src}
                  alt="Traveller snapshot"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[800ms] hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </button>
            ))}
          </div>
        </div>

        {/* Row 2: Left to Right (Reverse direction marquee) */}
        <div className="group overflow-hidden py-2">
          <div className="flex w-max animate-marquee-reverse gap-4 pr-4 group-hover:[animation-play-state:paused]">
            {[...row2, ...row2, ...row2].map((src, idx) => (
              <button
                key={src + "-r2-" + idx}
                onClick={() => setLightbox(src)}
                className="relative h-48 w-72 sm:h-56 sm:w-80 overflow-hidden rounded-3xl cursor-pointer shrink-0 shadow-md transition duration-500 hover:scale-102 hover:shadow-lg hover:border hover:border-gold/30"
              >
                <img
                  src={src}
                  alt="Traveller snapshot"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[800ms] hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 mt-12 text-center">
        <Link to="/gallery">
          <MagneticButton variant="gold">
            Explore Full Gallery <ArrowRight className="h-4 w-4" />
          </MagneticButton>
        </Link>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[95] grid place-items-center bg-black/85 p-4 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          >
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={lightbox}
              alt=""
              className="max-h-[85vh] max-w-full rounded-3xl object-contain shadow-2xl"
            />
            <button
              onClick={() => setLightbox(null)}
              className="absolute right-6 top-6 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20 cursor-pointer"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------------- Testimonials Preview ---------------- */
function Testimonials() {
  // Repeat testimonials list to ensure a seamless infinite scroll loop
  const loopTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-gradient-to-br from-secondary to-white py-24"
    >
      <div className="pointer-events-none absolute -top-20 left-1/2 h-72 w-[600px] -translate-x-1/2 rounded-full bg-brand/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-brand">
            What travellers say
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">
            10,000 stories.
            <br />
            <span className="italic text-gradient-brand">One promise kept.</span>
          </h2>
        </Reveal>
      </div>

      {/* Infinite scrolling testimonial cards from left to right */}
      <div className="group mt-16 overflow-hidden py-4 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee-reverse gap-6 pr-6 group-hover:[animation-play-state:paused]">
          {loopTestimonials.map((t, idx) => (
            <div
              key={t.name + "-" + idx}
              className="w-[350px] sm:w-[420px] shrink-0 bg-white rounded-[32px] p-6 sm:p-8 border border-border shadow-sm flex flex-col gap-5 transition-transform duration-300 hover:scale-102 hover:shadow-luxury cursor-pointer"
            >
              {/* Star Rating */}
              <div className="flex gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              
              {/* Quote */}
              <p className="font-display text-sm sm:text-base leading-relaxed text-ink italic flex-1 line-clamp-4">
                "{t.quote}"
              </p>

              {/* User profile */}
              <div className="flex items-center gap-3.5 border-t border-secondary pt-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-11 w-11 rounded-full border border-white object-cover shadow"
                />
                <div className="text-left">
                  <p className="text-xs sm:text-sm font-semibold text-ink leading-tight">{t.name}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">{t.trip}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View All Testimonials Button below the loop */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 mt-12 text-center">
        <Link to="/testimonials">
          <MagneticButton variant="gold" className="!bg-white shadow">
            Read Verified Reviews <ArrowRight className="h-4 w-4" />
          </MagneticButton>
        </Link>
      </div>
    </section>
  );
}

/* ---------------- How It Works ---------------- */
function HowItWorks() {
  const steps = [
    {
      n: "01",
      t: "Choose Destination",
      d: "Pick from 22+ curated destinations or tell us your dream.",
    },
    {
      n: "02",
      t: "Customise Your Trip",
      d: "A specialist crafts an itinerary tailored to your pace & budget.",
    },
    {
      n: "03",
      t: "Book The Package",
      d: "Lock it in with a small deposit — flights, stays, visas handled.",
    },
    {
      n: "04",
      t: "Enjoy Your Vacation",
      d: "24/7 concierge on WhatsApp from take-off to homecoming.",
    },
  ];
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-brand">How it works</p>
            <h2 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">
              Four steps to <span className="italic text-gradient-brand">take-off.</span>
            </h2>
          </div>
        </Reveal>
        <div className="relative mt-16 grid gap-6 md:grid-cols-4">
          <div className="pointer-events-none absolute left-8 right-8 top-10 hidden h-px bg-gradient-to-r from-brand/0 via-brand/30 to-brand/0 md:block" />
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <div className="group relative flex h-full flex-col rounded-3xl border border-border bg-white p-6 transition hover:-translate-y-1 hover:shadow-luxury">
                <div className="relative mb-4 flex items-center gap-3">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand to-[oklch(0.65_0.22_245)] font-display text-lg font-semibold text-white shadow-luxury">
                    {s.n}
                  </span>
                  <PlaneTakeoff className="h-5 w-5 text-gold" />
                </div>
                <h3 className="font-display text-xl font-semibold text-ink">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ Preview ---------------- */
function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const previewFaqs = faqs.slice(0, 4);

  return (
    <section id="faq" className="bg-secondary py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-brand">FAQ</p>
            <h2 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">
              Questions,
              <br />
              <span className="italic text-gradient-brand">answered.</span>
            </h2>
            <p className="mt-4 max-w-sm text-muted-foreground">
              Can't find what you're looking for? Our concierge team is a WhatsApp message away.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <Link to="/contact">
                <MagneticButton variant="primary">Talk to a specialist</MagneticButton>
              </Link>
              <Link to="/faq">
                <MagneticButton variant="outline" className="border-brand text-brand hover:bg-brand/10">
                  View All FAQs
                </MagneticButton>
              </Link>
            </div>
          </div>
        </Reveal>
        <div className="flex flex-col gap-3">
          {previewFaqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.05}>
                <div
                  className={`overflow-hidden rounded-3xl border transition ${
                    isOpen
                      ? "border-brand/40 bg-white shadow-luxury"
                      : "border-border bg-white"
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-lg font-medium text-ink">{f.q}</span>
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition ${
                        isOpen ? "bg-brand text-white rotate-180" : "bg-secondary text-ink"
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-sm text-muted-foreground">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Contact ---------------- */
function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="relative overflow-hidden bg-white py-24">
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-brand/10 blur-3xl" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2">
        <Reveal>
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-brand">Get in touch</p>
            <h2 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">
              Let's design your
              <br />
              <span className="italic text-gradient-brand">next great trip.</span>
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              Share a few details and a destination specialist will call you back within 24 hours with a personalised itinerary.
            </p>

            <div className="mt-8 grid gap-3">
              {[
                {
                  icon: MapPin,
                  label: "Office",
                  value: "SkyNow Holidays, MG Road, Bengaluru — 560001",
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: "+91 12345 67890",
                  href: "tel:+911234567890",
                },
                {
                  icon: MessageCircle,
                  label: "WhatsApp",
                  value: "Chat 24/7",
                  href: "https://wa.me/911234567890",
                },
                {
                  icon: Mail,
                  label: "Email",
                  value: "hello@skynowholidays.com",
                  href: "mailto:hello@skynowholidays.com",
                },
                { icon: Calendar, label: "Hours", value: "Mon – Sun · 9 AM – 9 PM IST" },
              ].map((r) => (
                <a
                  key={r.label}
                  href={r.href ?? "#"}
                  target={r.href?.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-white p-4 transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand/10 text-brand transition group-hover:bg-brand group-hover:text-white">
                    <r.icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      {r.label}
                    </p>
                    <p className="truncate text-sm font-medium text-ink">{r.value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-6 overflow-hidden rounded-3xl border border-border shadow-md">
              <iframe
                title="Office map"
                src="https://www.google.com/maps?q=Bengaluru%20MG%20Road&output=embed"
                className="h-64 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              setTimeout(() => setSent(false), 4000);
            }}
            className="glass rounded-[36px] p-6 shadow-luxury sm:p-10"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full Name" name="name" placeholder="Your name" required />
              <Field label="Phone" name="phone" placeholder="+91 …" type="tel" required />
              <Field
                label="Email"
                name="email"
                placeholder="you@email.com"
                type="email"
                required
                className="sm:col-span-2"
              />
              <div className="sm:col-span-2">
                <label className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Destination
                </label>
                <select className="mt-1 w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-ink outline-none focus:border-brand">
                  <option value="">Select a destination</option>
                  {destinations.map((d) => (
                    <option key={d.name}>{d.name}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your dream trip…"
                  className="mt-1 w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-ink outline-none focus:border-brand"
                />
              </div>
            </div>

            <button
              type="submit"
              className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 text-sm font-semibold text-white shadow-luxury transition hover:brightness-110 cursor-pointer"
            >
              {sent ? (
                "Thank you — we'll be in touch!"
              ) : (
                <>
                  Send Enquiry{" "}
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              By submitting, you agree to be contacted by SkyNow Holidays.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
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
        className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground"
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

/* ---------------- Marquee ---------------- */
function DestMarquee() {
  const items = [
    "Bhutan",
    "Sri Lanka",
    "Bahrain",
    "Baku Azerbaijan",
    "Maldives",
    "Bali",
    "Singapore & Malaysia",
    "Dubai",
    "Thailand",
    "Vietnam",
    "Cambodia & Vietnam",
    "Japan",
    "Europe",
    "Turkey",
    "Uzbekistan",
  ];
  return (
    <div className="overflow-hidden border-y border-white/10 bg-[#0B1528] py-8 sm:py-10">
      <div className="flex w-max animate-marquee gap-12 pr-12">
        {[...items, ...items].map((n, i) => (
          <span
            key={i}
            className="flex items-center gap-4 whitespace-nowrap font-display text-2xl sm:text-4xl font-bold uppercase tracking-wider text-white"
          >
            {n} <span className="text-gold font-light animate-pulse">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Main ---------------- */
export default function SkyNowHome() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <TrustSection />
      <DestinationsSection />
      <DestMarquee />
      <AboutSection />
      <StatsSection />
      <Gallery />
      <Testimonials />
      <HowItWorks />
      <FAQ />
      <Contact />
    </main>
  );
}