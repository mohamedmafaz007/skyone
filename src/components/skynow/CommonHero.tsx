import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";

interface CommonHeroProps {
  title: string;
  subtitle?: string;
  bgImage?: string;
  breadcrumb?: string;
}

export default function CommonHero({
  title,
  subtitle,
  bgImage = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80",
  breadcrumb,
}: CommonHeroProps) {
  return (
    <section className="relative h-[48vh] min-h-[360px] w-full overflow-hidden bg-ink text-white">
      {/* Background Image with subtle zoom animation - opacity set to high for clear photo view */}
      <motion.div
        initial={{ scale: 1.05, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 0.85 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img src={bgImage} alt={title} className="h-full w-full object-cover" />
      </motion.div>

      {/* Premium Dark Overlay Gradients - no white fade-out at the bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />

      {/* Content wrapper */}
      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-12 pt-28 sm:px-6 md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          {/* Breadcrumb */}
          <nav className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            {breadcrumb ? (
              <>
                <Link
                  to={breadcrumb.includes("Packages") ? "/packages" : "/destinations"}
                  className="hover:text-white transition-colors"
                >
                  {breadcrumb.includes("Packages") ? "Packages" : "Destinations"}
                </Link>
                <span>/</span>
              </>
            ) : null}
            <span className="text-white/60">{title}</span>
          </nav>

          {/* Heading */}
          <h1 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="mt-4 font-sans text-sm font-medium text-white/90 sm:text-base md:text-lg max-w-xl line-clamp-2">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
