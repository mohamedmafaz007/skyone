import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Star, CheckCircle, X, ShieldCheck } from "lucide-react";
import CommonHero from "@/components/skynow/CommonHero";

export const Route = createFileRoute("/testimonials")({
  component: TestimonialsPage,
});

const REVIEWS = [
  {
    name: "Aarav & Meera Kapoor",
    trip: "Bali Honeymoon Tour",
    date: "May 2026",
    rating: 5,
    quote: "From the private pool villa in Ubud to the cliffside Uluwatu Kecak show, every single detail was flawless. The local guides were punctual, professional and extremely kind. SkyNow didn't just sell us a package — they curated a lifetime memory. We highly recommend them!",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
  },
  {
    name: "Devendra Sharma",
    trip: "Singapore & Malaysia Family Holiday",
    date: "April 2026",
    rating: 5,
    quote: "Travelling with three generations (including my parents and small kids) is always stressful. SkyNow made it completely effortless. The pacing of the trip was perfect, the hotels (Marina Bay Sands & EQ KL) were spectacular, and our private drivers were excellent. 5-star service!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
  },
  {
    name: "Rhea Nair",
    trip: "Cappadocia Turkey Explorer",
    date: "June 2026",
    rating: 5,
    quote: "The hot-air balloon sunrise in Cappadocia was absolute magic, but the real highlight was SkyNow's attention to detail. Their 24/7 concierge responded within 2 minutes when our flight was delayed, re-scheduling our transfers instantly. Unmatched peace of mind.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
  },
  {
    name: "Kabir Menon",
    trip: "Europe Grand Tour (Swiss • Paris • Italy)",
    date: "March 2026",
    rating: 5,
    quote: "We spent 12 days touring through Paris, Switzerland, and Venice. Excellent organization throughout! The trains, hotels, and walking tours were booked perfectly. SkyNow's mobile app and document portal kept everything organized.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
  },
  {
    name: "Priyanka Iyer",
    trip: "Dubai Luxury Weekend",
    date: "February 2026",
    rating: 4,
    quote: "Burj Khalifa VIP access, private desert safari, and a luxury yacht charter on the Marina. The itinerary was tightly packed but very enjoyable. The hotel rooms had panoramic skyline views. Excellent support from their team.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
  },
  {
    name: "Arjun Verma",
    trip: "Kenya Wilderness Safari",
    date: "January 2026",
    rating: 5,
    quote: "Unbelievable safari in Masai Mara! We saw the Big Five on day two itself. Our guide was incredibly knowledgeable about the wildlife. The luxury safari camp was comfortable and the food was surprisingly excellent. Worth every rupee.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
  },
];

const VIDEOS = [
  {
    title: "Kapoor Family in Bali",
    thumbnail: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
    duration: "2:15",
  },
  {
    title: "Turkey Adventures with Rhea",
    thumbnail: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=600&q=80",
    duration: "1:45",
  },
  {
    title: "Europe Tour Memories",
    thumbnail: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80",
    duration: "3:02",
  },
];

function TestimonialsPage() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <div className="bg-background pb-20">
      <CommonHero
        title="Testimonials"
        subtitle="The stories of our travellers, verified by their unforgettable moments."
        bgImage="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=1600&q=80"
      />

      {/* Rating Dashboard Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-3 items-center rounded-[36px] bg-secondary p-8 md:p-12 border border-border shadow-sm">
          {/* Main Score */}
          <div className="text-center lg:border-r lg:border-border lg:pr-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Overall Rating
            </p>
            <h3 className="mt-2 font-display text-6xl font-bold text-ink">4.9</h3>
            <div className="mt-3 flex justify-center gap-1 text-gold">
              {Array.from({ length: 5 }).map((_, k) => (
                <Star key={k} className="h-6 w-6 fill-gold" />
              ))}
            </div>
            <p className="mt-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Based on 10,000+ Google & Tripadvisor Reviews
            </p>
          </div>

          {/* Breakdown bars */}
          <div className="lg:col-span-2 lg:pl-4 space-y-3">
            {[
              { rating: 5, pct: 92 },
              { rating: 4, pct: 7 },
              { rating: 3, pct: 1 },
              { rating: 2, pct: 0 },
              { rating: 1, pct: 0 },
            ].map((row) => (
              <div key={row.rating} className="flex items-center gap-4">
                <span className="flex items-center gap-1 text-sm font-bold text-ink w-8">
                  {row.rating} <Star className="h-3.5 w-3.5 fill-gold text-gold" />
                </span>
                <div className="flex-1 h-3 rounded-full bg-border overflow-hidden">
                  <div
                    className="h-full bg-brand rounded-full"
                    style={{ width: `${row.pct}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-muted-foreground w-8 text-right">
                  {row.pct}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand">Vlogs</span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Video travel diaries
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            Watch short video summaries sent to us directly from our travellers on the ground.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VIDEOS.map((vid, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-[30px] aspect-[16/10] border border-border shadow-sm"
            >
              <img
                src={vid.thumbnail}
                alt={vid.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/35 flex flex-col justify-between p-5 text-white">
                <span className="ml-auto rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-bold backdrop-blur">
                  {vid.duration}
                </span>

                <div className="flex items-center justify-between mt-auto">
                  <div className="min-w-0 pr-4">
                    <p className="font-display font-semibold text-base truncate">{vid.title}</p>
                    <p className="text-[10px] text-white/70 uppercase tracking-widest mt-0.5">
                      Verified vlog
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveVideo(vid.title)}
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gold text-ink transition hover:scale-110 cursor-pointer shadow-lg"
                    aria-label="Play video testimonial"
                  >
                    <Play className="h-5 w-5 fill-ink text-ink ml-0.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Review cards */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand">Reviews</span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Google style customer stories
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((rev, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="group flex flex-col rounded-[32px] border border-border bg-white p-8 transition-shadow duration-300 hover:shadow-luxury"
            >
              <div className="flex items-center gap-4">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="h-12 w-12 rounded-full border border-border object-cover"
                />
                <div>
                  <h4 className="font-semibold text-ink leading-tight">{rev.name}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{rev.date}</p>
                </div>
              </div>

              {/* Stars & Verification */}
              <div className="mt-4 flex items-center justify-between border-y border-secondary py-3">
                <div className="flex gap-0.5 text-gold">
                  {Array.from({ length: rev.rating }).map((_, k) => (
                    <Star key={k} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                  <ShieldCheck className="h-3.5 w-3.5 shrink-0" /> Verified Guest
                </span>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-ink italic flex-1">
                "{rev.quote}"
              </p>

              <div className="mt-6 border-t border-secondary pt-4 text-xs font-bold text-brand uppercase tracking-wider">
                {rev.trip}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[95] grid place-items-center bg-black/95 p-4 backdrop-blur-md"
            onClick={() => setActiveVideo(null)}
          >
            <div
              className="relative aspect-video max-w-4xl w-full bg-ink rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white backdrop-blur hover:bg-white/30 cursor-pointer"
                aria-label="Close video"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="text-center p-8">
                <div className="h-16 w-16 mx-auto rounded-full bg-brand/10 border border-brand/30 flex items-center justify-center text-brand animate-pulse">
                  <Play className="h-6 w-6 fill-brand text-brand" />
                </div>
                <h4 className="font-display text-xl font-semibold mt-6">{activeVideo}</h4>
                <p className="text-sm text-white/60 mt-2">
                  This mock vlog compiles travel highlights from our verified group trip.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
