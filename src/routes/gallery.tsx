import { useState, useEffect, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Eye, X } from "lucide-react";
import CommonHero from "@/components/skynow/CommonHero";
import { galleryImages } from "@/components/skynow/data";

export const Route = createFileRoute("/gallery")({
  component: GalleryPage,
});

const CATEGORIES = ["All", "Asia", "Europe", "Beach", "Adventure", "Luxury"] as const;

// Categorized image index maps (to simulate a real sorted image gallery)
const CATEGORY_MAP: Record<string, string[]> = {
  All: galleryImages,
  Asia: [
    galleryImages[0], // Bali
    galleryImages[7], // Vietnam
    galleryImages[11], // Nepal/Bhutan
    galleryImages[1], // Singapore
    galleryImages[10], // Dubai
  ],
  Europe: [
    galleryImages[2], // Swiss
    galleryImages[3], // Paris
    galleryImages[8], // Turkey
  ],
  Beach: [
    galleryImages[0], // Bali
    galleryImages[4], // Beach
    galleryImages[9], // Maldives style
  ],
  Adventure: [
    galleryImages[5], // Camp
    galleryImages[6], // Mountains
    galleryImages[11], // Nepal
  ],
  Luxury: [
    galleryImages[9], // Pool villa
    galleryImages[10], // Yacht
    galleryImages[2], // Luxury stay
  ],
};

function GalleryPage() {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [displayedImages, setDisplayedImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Initialize gallery
  useEffect(() => {
    setDisplayedImages(CATEGORY_MAP[cat].slice(0, 6));
    setHasMore(CATEGORY_MAP[cat].length > 6);
  }, [cat]);

  // Infinite scroll simulator
  const handleLoadMore = () => {
    if (loading || !hasMore) return;
    setLoading(true);

    setTimeout(() => {
      const currentLength = displayedImages.length;
      const fullList = CATEGORY_MAP[cat];
      const nextBatch = fullList.slice(currentLength, currentLength + 4);

      setDisplayedImages((prev) => [...prev, ...nextBatch]);
      setLoading(false);
      if (currentLength + nextBatch.length >= fullList.length) {
        setHasMore(false);
      }
    }, 1000);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === 0 ? displayedImages.length - 1 : (prev ?? 0) - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === displayedImages.length - 1 ? 0 : (prev ?? 0) + 1));
  };

  return (
    <div className="bg-background pb-20">
      <CommonHero
        title="Gallery"
        subtitle="Unfiltered frames from our travellers' journeys across five continents."
        bgImage="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-all cursor-pointer ${
                cat === c ? "text-white" : "text-ink hover:bg-secondary border border-border"
              }`}
            >
              {cat === c && (
                <motion.span
                  layoutId="gallery-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-brand shadow-luxury"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              {c}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {displayedImages.map((src, idx) => (
              <motion.article
                key={src + idx}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group relative overflow-hidden rounded-[30px] aspect-[4/3] shadow-sm hover:shadow-luxury cursor-pointer border border-border"
                onClick={() => setLightboxIndex(idx)}
              >
                <img
                  src={src}
                  alt="Travel diary"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[800ms] group-hover:scale-110"
                />
                {/* Overlay details */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-white/20 backdrop-blur text-white transition hover:scale-110">
                    <Eye className="h-5 w-5" />
                  </span>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Loading skeletons for infinite scroll */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[4/3] rounded-[30px] bg-secondary animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {hasMore && !loading && (
          <div className="mt-12 text-center">
            <button
              onClick={handleLoadMore}
              className="rounded-full bg-brand px-6 py-3 text-sm font-bold text-white shadow-luxury hover:brightness-110 transition cursor-pointer"
            >
              Load More Moments
            </button>
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[95] grid place-items-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={() => setLightboxIndex(null)}
          >
            <div className="relative flex items-center justify-center max-w-5xl w-full">
              {/* Prev button */}
              <button
                onClick={handlePrev}
                className="absolute left-4 z-10 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20 transition cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <motion.img
                key={lightboxIndex}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                src={displayedImages[lightboxIndex]}
                alt="Enlarged view"
                className="max-h-[80vh] max-w-full rounded-3xl object-contain shadow-2xl"
              />

              {/* Next button */}
              <button
                onClick={handleNext}
                className="absolute right-4 z-10 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20 transition cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute right-6 top-6 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20 transition cursor-pointer"
              aria-label="Close lightbox"
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
