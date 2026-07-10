import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, HelpCircle, MessageCircle } from "lucide-react";
import CommonHero from "@/components/skynow/CommonHero";

export const Route = createFileRoute("/faq")({
  component: FaqPage,
});

const FAQ_CATEGORIES = ["All", "Booking", "Visa & Insurance", "Customization", "Support", "Payments"] as const;

const FAQ_ITEMS = [
  {
    q: "How do I book a holiday package with SkyNow?",
    a: "Share your travel dates and preferred destination via our contact form or WhatsApp. A destination specialist will design a personalized itinerary for you within 24 hours. Once you are satisfied with the details, you can secure the booking with a small deposit.",
    category: "Booking",
  },
  {
    q: "Do you handle visa processing and travel insurance?",
    a: "Yes. Every international package includes end-to-end visa assistance. Our documentation team audits your paperwork, books slots, and preps you for interviews. We also offer comprehensive medical & trip travel insurance through leading global underwriters.",
    category: "Visa & Insurance",
  },
  {
    q: "Can I customize an existing package itinerary?",
    a: "Absolutely! We do not offer fixed group packages unless requested. Every package shown on our website is a starting reference. You can add nights, change hotels, include private activities, or even combine multiple countries.",
    category: "Customization",
  },
  {
    q: "Are international flight tickets included in your quotes?",
    a: "Most of our packages are quoted land-only (transfers, hotels, tours, visas) because airfares fluctuate rapidly and travellers prefer using mileage points. However, on request, our ticketing desk will quote and secure the best available direct flight fares for you.",
    category: "Booking",
  },
  {
    q: "What support is provided during the actual trip?",
    a: "You will have access to our 24/7 dedicated WhatsApp support desk. This is run by real destination managers who can assist with real-time needs (e.g. hotel room upgrades, re-scheduling transfers, recommending local restaurants, or sorting emergency changes).",
    category: "Support",
  },
  {
    q: "What is your package cancellation policy?",
    a: "Our cancellation policy depends on the hotel and airline policies booked. Generally, land packages cancelled 30 days prior to departure qualify for a full refund minus a minimal processing fee. Detailed cancellation rules are provided at the time of quotation.",
    category: "Payments",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept secure credit cards, debit cards, UPI, and bank transfers (NEFT/RTGS/IMPS). We also offer interest-free EMI options with partner banks.",
    category: "Payments",
  },
  {
    q: "Do we travel in a large coach or private vehicles?",
    a: "All of our standard packages are strictly private tours. You will have a dedicated private air-conditioned vehicle (SUV or sedan) and a private driver for all airport transfers and city sightseeing tours.",
    category: "Customization",
  },
];

function FaqPage() {
  const [cat, setCat] = useState<(typeof FAQ_CATEGORIES)[number]>("All");
  const [search, setSearch] = useState("");
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  // Dynamic filter
  const filteredFaqs = useMemo(() => {
    return FAQ_ITEMS.filter((item) => {
      const matchesCategory = cat === "All" || item.category === cat;
      const matchesSearch =
        item.q.toLowerCase().includes(search.toLowerCase()) ||
        item.a.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [cat, search]);

  return (
    <div className="bg-background pb-20">
      <CommonHero
        title="Frequently Asked Questions"
        subtitle="Clear answers about booking, visa processing, custom packages, and local support."
        bgImage="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1600&q=80"
      />

      {/* Search and Category section */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setOpenIdx(null); // Reset accordions on search
              }}
              placeholder="Search questions or answers..."
              className="w-full rounded-2xl border border-border bg-white py-4 pl-12 pr-4 text-sm text-ink outline-none focus:border-brand shadow-sm"
            />
          </div>

          {/* Category Dropdown (Mobile) / Tabs (Desktop) */}
          <div className="flex flex-wrap gap-2">
            {FAQ_CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => {
                  setCat(c);
                  setOpenIdx(null); // Reset accordions on category switch
                }}
                className={`relative rounded-full px-4 py-2.5 text-xs font-semibold border transition cursor-pointer ${
                  cat === c
                    ? "bg-brand text-white border-brand shadow-luxury"
                    : "bg-white text-ink border-border hover:bg-secondary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordions */}
        <div className="mt-12 flex flex-col gap-4">
          <AnimatePresence mode="popLayout">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, idx) => {
                const isOpen = openIdx === idx;
                return (
                  <motion.article
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    key={faq.q}
                    className={`overflow-hidden rounded-3xl border transition-all duration-300 ${
                      isOpen
                        ? "border-brand/40 bg-white shadow-luxury"
                        : "border-border bg-white"
                    }`}
                  >
                    <button
                      onClick={() => setOpenIdx(isOpen ? null : idx)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span className="font-display text-base sm:text-lg font-semibold text-ink flex items-center gap-3">
                        <HelpCircle className="h-5 w-5 text-brand shrink-0" />
                        {faq.q}
                      </span>
                      <span
                        className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-transform duration-300 ${
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
                          <p className="px-6 pb-6 pl-14 text-sm sm:text-base leading-relaxed text-muted-foreground">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.article>
                );
              })
            ) : (
              <div className="text-center py-12 rounded-3xl border border-dashed border-border bg-white p-8">
                <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto" />
                <p className="mt-4 font-display text-lg font-bold text-ink">No FAQ matches found</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Try typing another keyword or check another category.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center rounded-[36px] bg-secondary p-8 border border-border">
          <HelpCircle className="h-10 w-10 text-brand mx-auto" />
          <h3 className="font-display text-xl font-bold text-ink mt-4">Still have questions?</h3>
          <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
            Get instant support on customized packages and documents checkups via WhatsApp chat.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <a
              href="https://wa.me/911234567890"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow hover:scale-105 transition"
            >
              <MessageCircle className="h-5 w-5" /> Chat On WhatsApp
            </a>
            <Link to="/contact">
              <button className="rounded-full border border-border bg-white px-5 py-3 text-sm font-bold text-ink transition hover:bg-secondary cursor-pointer">
                Write Email
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
