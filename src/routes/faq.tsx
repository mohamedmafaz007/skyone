import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, HelpCircle, MessageCircle } from "lucide-react";
import CommonHero from "@/components/skynow/CommonHero";
import { useAppData } from "@/lib/dataStore";

export const Route = createFileRoute("/faq")({
  component: FaqPage,
});

const FAQ_CATEGORIES = ["All", "Booking", "Visa & Insurance", "Customization", "Support", "Payments"] as const;

function FaqPage() {
  const { faqs } = useAppData();
  const [cat, setCat] = useState<(typeof FAQ_CATEGORIES)[number]>("All");
  const [search, setSearch] = useState("");
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  // Dynamic filter
  const filteredFaqs = useMemo(() => {
    return faqs.filter((item: any) => {
      const matchesCategory = cat === "All" || item.category === cat;
      const matchesSearch =
        item.q.toLowerCase().includes(search.toLowerCase()) ||
        item.a.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [cat, search, faqs]);

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
                    layout="position"
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
              href="https://wa.me/917639277770"
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
