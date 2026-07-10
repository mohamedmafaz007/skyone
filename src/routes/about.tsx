import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Award, Compass, HeartHandshake, ShieldCheck, Star, Users } from "lucide-react";
import CommonHero from "@/components/skynow/CommonHero";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

const TIMELINE = [
  { year: "2010", title: "Foundation", desc: "SkyNow Holidays is founded in Bengaluru as a boutique corporate retreat planner (MICE), starting with a small team of 3 specialists." },
  { year: "2014", title: "Global Expansion", desc: "Launched leisure travel services, curating customized FIT (Free Independent Traveler) tours to Southeast Asia and Europe." },
  { year: "2018", title: "Milestone: 5,000 Travellers", desc: "Recognized as a fast-growing travel studio, assisting over 5,000 travellers and expanding our destination footprint to 15+ countries." },
  { year: "2021", title: "The 24/7 Concierge Revolution", desc: "Introduced our signature round-the-clock WhatsApp support team, ensuring travellers have an expert host in any timezone." },
  { year: "2025", title: "Boutique Agency of the Year", desc: "Winner of the National Luxury Travel Awards. Serving 10,000+ happy holidaymakers with a consistent 4.9/5 star Google rating." },
] as const;

const TEAM = [
  { name: "Rohit Sen", role: "Founder & Chief Explorer", bio: "Ex-airline director with 20+ years in premium aviation. Rohit curates our high-end luxury resort connections.", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80" },
  { name: "Shalini Nair", role: "Co-Founder & COO", bio: "Hospitality veteran obsessed with operations. Shalini manages our visa compliance and emergency assistance teams.", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80" },
  { name: "Vikram Malhotra", role: "Head of Europe Planning", bio: "Has personally travelled to 42 countries. Vikram designs all of our Switzerland, Paris, and Italy itineraries.", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80" },
  { name: "Rhea Iyer", role: "Honeymoon & Leisure Specialist", bio: "Bespoke beach holiday expert. Rhea specializes in over-water villas in Mauritius, Maldives, and private Ubud hideaways.", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80" },
] as const;

function AboutPage() {
  return (
    <div className="bg-background pb-20">
      <CommonHero
        title="About Us"
        subtitle="A boutique travel studio obsessed with crafting unforgettable memories."
        bgImage="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=80"
      />

      {/* Story section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand">Our Story</span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
              We don't sell packages. <br />
              <span className="italic text-gradient-brand">We design journeys.</span>
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
              SkyNow Holidays was born out of a simple frustration: travel had become transactional. Large portals offered standardized packages, leaving travellers stranded with cookie-cutter plans and computerized chatbots when things went off-track.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              We decided to do things differently. We built a boutique travel studio focused on customization, vetted partner properties, and high-touch human service. Every itinerary we design starts with a conversation and ends with a lifetime memory.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
                <p className="font-display text-3xl font-bold text-brand">10k+</p>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-1">Delighted Guests</p>
              </div>
              <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
                <p className="font-display text-3xl font-bold text-gold">4.9★</p>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-1">Google Rating</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[36px] shadow-luxury">
              <img
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80"
                alt="Travellers exploring"
                className="h-full w-full object-cover"
              />
            </div>
            {/* Callout box */}
            <div className="absolute -bottom-6 -left-6 rounded-3xl bg-white p-6 shadow-luxury max-w-xs border border-border hidden sm:block">
              <p className="text-xs italic text-ink font-medium">
                "Our trip to Turkey was magical. The hot air balloons, the guides, and the round-the-clock support made it completely worry-free."
              </p>
              <p className="text-xs font-bold text-brand mt-3">— Kabir M., Bengaluru</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl bg-white p-8 border border-border shadow-sm"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand/10 text-brand mb-6">
                <Compass className="h-6 w-6" />
              </span>
              <h3 className="font-display text-2xl font-semibold text-ink">Our Mission</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                To simplify international travel by combining expert destination consulting, seamless logistical support, and dedicated 24/7 human hospitality, enabling our guests to travel with absolute confidence.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-3xl bg-white p-8 border border-border shadow-sm"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold/20 text-gold-foreground mb-6">
                <ShieldCheck className="h-6 w-6" />
              </span>
              <h3 className="font-display text-2xl font-semibold text-ink">Our Vision</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                To be recognized globally as the most trusted boutique travel studio, setting new benchmarks in customized holiday architecture, customer satisfaction, and reliable travel guidance.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand">History Timeline</span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Our journey over <span className="italic text-gradient-brand">the years</span>
          </h2>
        </div>

        <div className="relative mt-16 before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-border md:before:left-1/2">
          {TIMELINE.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div key={item.year} className="relative mb-12 flex flex-col md:flex-row items-start md:items-center">
                {/* Timeline node */}
                <div className="absolute left-4 -translate-x-1/2 grid h-8 w-8 place-items-center rounded-full bg-brand text-white text-[10px] font-bold border-4 border-white shadow md:left-1/2 z-10">
                  {item.year.slice(-2)}
                </div>

                <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12 md:left-1/2 md:absolute md:top-0"}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5 }}
                    className="rounded-3xl border border-border bg-white p-6 shadow-sm hover:shadow-luxury transition-shadow duration-300"
                  >
                    <span className="font-display text-sm font-extrabold text-brand tracking-widest block mb-1">
                      {item.year}
                    </span>
                    <h4 className="font-display text-lg font-semibold text-ink">{item.title}</h4>
                    <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                  </motion.div>
                </div>
                {/* Spacer to balance absolute offset on desktop layout */}
                <div className="hidden md:block w-1/2 h-12" />
              </div>
            );
          })}
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand">Our Team</span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
              Meet our <span className="italic text-gradient-brand">travel specialists</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
              A passionate collective of ex-flight crew, hospitality experts, and destination heads dedicated to planning your perfect holiday.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group flex flex-col items-center text-center rounded-[30px] border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-luxury"
              >
                <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-secondary shadow-inner">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-ink">{member.name}</h3>
                <p className="text-xs font-medium text-brand uppercase tracking-wider mt-0.5">{member.role}</p>
                <p className="mt-3 text-xs text-muted-foreground leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
