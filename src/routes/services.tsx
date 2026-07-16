import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import CommonHero from "@/components/skynow/CommonHero";
import { useAppData, IconMap } from "@/lib/dataStore";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
});

function ServicesPage() {
  const { services } = useAppData();
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
          {services.map((serv: any, idx: number) => {
            const IconComponent = IconMap[serv.icon] || Sparkles;
            return (
              <motion.div
                key={serv.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
                className="group flex flex-col rounded-[32px] border border-border bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-luxury"
              >
                <span className={`grid h-12 w-12 place-items-center rounded-2xl mb-6 font-bold shadow-sm group-hover:scale-110 transition-transform ${serv.color}`}>
                  <IconComponent className="h-6 w-6" />
                </span>

                <h3 className="font-display text-xl font-semibold text-ink">{serv.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">
                  {serv.desc}
                </p>

                {/* Checklist */}
                <ul className="mt-5 space-y-2 border-t border-border pt-5">
                  {serv.features.map((f: string) => (
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
            );
          })}
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
