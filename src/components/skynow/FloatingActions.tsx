import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, MessageCircle, PlaneTakeoff } from "lucide-react";
import Chatbot from "./Chatbot";

export default function FloatingActions() {
  const [showScroll, setShowScroll] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Chatbot Interface */}
      <Chatbot isOpen={isChatOpen} setIsOpen={setIsChatOpen} />

      {/* WhatsApp Floating Action */}
      <AnimatePresence>
        {!isChatOpen && (
          <motion.a
            initial={{ opacity: 0, scale: 0.7, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 15 }}
            transition={{ duration: 0.2 }}
            href="https://wa.me/917639277770?text=Hello%20SkyNow%20Holidays%2C%20I%20would%20like%20to%20inquire%20about%20your%20international%20tour%20packages."
            target="_blank"
            rel="noreferrer"
            className="fixed bottom-24 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-luxury transition-all duration-300 hover:scale-110 hover:shadow-2xl"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle className="h-7 w-7 fill-white text-[#25D366]" />
            <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/60" />
          </motion.a>
        )}
      </AnimatePresence>

      {/* Back to Top */}
      <AnimatePresence>
        {showScroll && !isChatOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className="fixed bottom-42 right-7.5 z-40 grid h-11 w-11 place-items-center rounded-full bg-brand text-white shadow-luxury transition-transform duration-300 hover:scale-110 cursor-pointer"
            aria-label="Back to top"
          >
            <ArrowUp className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Quick Booking CTA (Shown on mobile/tablet) */}
      <AnimatePresence>
        {showScroll && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 left-6 z-40 sm:block hidden"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-ink shadow-luxury transition-all duration-300 hover:scale-105 hover:brightness-110"
            >
              <PlaneTakeoff className="h-4 w-4" /> Custom Plan
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
