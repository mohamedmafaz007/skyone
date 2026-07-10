import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Globe2,
  BadgeCheck,
  PlaneTakeoff,
  Hotel,
  ShieldCheck,
  Heart,
  Users,
  Briefcase,
  Sparkles,
  Ship,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";
import CommonHero from "@/components/skynow/CommonHero";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
});

const SERVICES = [
  {
    icon: Globe2,
    title: "International Tours",
    desc: "Curated land & cruise experiences across 22+ countries on 5 continents, planned by destination heads.",
    features: ["Private local guides", "Seamless airport handling", "Bespoke itineraries"],
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    icon: BadgeCheck,
    title: "Visa Assistance",
    desc: "End-to-end documentation support, visa mock interviews, application filing, and slot booking.",
    features: ["99.2% success rate", "Express processing support", "Document checklist audit"],
    color: "bg-emerald-500/10 text-emerald-500",
  },
  {
    icon: PlaneTakeoff,
    title: "Flight Booking",
    desc: "Access to consolidated corporate rates and seat locks on full-service premium carriers.",
    features: ["24/7 re-issuance", "Meal & seat selections", "Group booking discounts"],
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    icon: Hotel,
    title: "Hotel Booking",
    desc: "Handpicked 4-star and 5-star properties, luxury private pool villas, and boutique heritage stays.",
    features: ["Complimentary upgrades", "Early check-in options", "Vetted safety standards"],
    color: "bg-amber-500/10 text-amber-500",
  },
  {
    icon: Ship,
    title: "Cruise Booking",
    desc: "Booking and routing across major luxury lines, including Royal Caribbean, Resorts World, and Celebrity Cruises.",
    features: ["Cabin selection experts", "Shore excursion planning", "Onboard credit perks"],
    color: "bg-cyan-500/10 text-cyan-500",
  },
  {
    icon: Heart,
    title: "Honeymoon Packages",
    desc: "Memory-making romantic details: private villas, floating breakfast setups, and beach candlelit dinners.",
    features: ["Complimentary photoshoot", "Decor & welcome cake", "Leisure-oriented pace"],
    color: "bg-rose-500/10 text-rose-500",
  },
  {
    icon: Users,
    title: "Family Packages",
    desc: "Carefully designed multi-generational travel with kid-friendly activities and comfortable transfers.",
    features: ["Adjoining room options", "Baby seats on request", "Flexible pacing"],
    color: "bg-indigo-500/10 text-indigo-500",
  },
  {
    icon: Briefcase,
    title: "Corporate Tours (MICE)",
    desc: "Planning scale offsites, reward trips, conferences, and exhibitions with dedicated coordinators.",
    features: ["GST billing compliance", "Team building activities", "Stage & sound setup"],
    color: "bg-teal-500/10 text-teal-500",
  },
  {
    icon: HeartHandshake,
    title: "Group Tours",
    desc: "Structured milestone group plans for friends, reunions, and seniors with tour managers.",
    features: ["Guaranteed departures", "Indian meals on request", "Tour lead coordinator"],
    color: "bg-orange-500/10 text-orange-500",
  },
  {
    icon: ShieldCheck,
    title: "Travel Insurance",
    desc: "Comprehensive trip cancellation, baggage delay, and medical emergency protection coverage.",
    features: ["Cashless claim network", "Covid-19 coverage", "Zero deductible plans"],
    color: "bg-red-500/10 text-red-500",
  },
  {
    icon: Sparkles,
    title: "Custom Packages",
    desc: "Start with a blank canvas. Let us stitch flights, hotels, and activities exactly to your preference.",
    features: ["Unlimited iterations", "Dedicated planner", "Tailored pacing"],
    color: "bg-gold/20 text-gold-foreground",
  },
] as const;

function ServicesPage() {
  return (
    <div className="bg-background pb-20">
      <CommonHero
        title="Our Services"
        subtitle="End-to-end travel solutions built around comfort, premium standards, and absolute reliability."
        bgImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand">What We Offer</span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Complete travel ecosystem for a <span className="italic text-gradient-brand">worry-free holiday</span>
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            From visa processing in India to luxury catamaran charters in Bali, we manage every layer of your travel itinerary so you can focus on making memories.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((serv, idx) => (
            <motion.div
              key={serv.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.04 }}
              className="group flex flex-col rounded-[32px] border border-border bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-luxury"
            >
              <span className={`grid h-12 w-12 place-items-center rounded-2xl mb-6 font-bold shadow-sm group-hover:scale-110 transition-transform ${serv.color}`}>
                <serv.icon className="h-6 w-6" />
              </span>

              <h3 className="font-display text-xl font-semibold text-ink">{serv.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">
                {serv.desc}
              </p>

              {/* Checklist */}
              <ul className="mt-5 space-y-2 border-t border-border pt-5">
                {serv.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs font-semibold text-ink">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-6">
                <Link
                  to="/contact"
                  search={{ service: serv.title }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand group-hover:text-gold transition-colors"
                >
                  Enquire Now <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust banner */}
      <section className="bg-secondary py-16">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          <h3 className="font-display text-2xl font-semibold text-ink">Need a fully customized package?</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-xl mx-auto">
            Our destination experts can combine multiple services (Visas + Stays + Flights) to design a seamless trip based on your timeline and budget.
          </p>
          <div className="mt-6">
            <Link to="/contact">
              <button className="rounded-full bg-brand px-6 py-3 text-sm font-bold text-white shadow transition hover:brightness-110 cursor-pointer">
                Consult A Specialist
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
