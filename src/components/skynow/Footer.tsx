import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube, Globe } from "lucide-react";
import logoImage from "@/assets/FINAL-removebg-preview.png";
import { useAppData } from "@/lib/dataStore";

const QUICK_LINKS = [
  { label: "Home", to: "/" },
  { label: "Packages", to: "/packages" },
  { label: "Destinations", to: "/destinations" },
  { label: "Services", to: "/services" },
  { label: "About Us", to: "/about" },
  { label: "Gallery", to: "/gallery" },
  { label: "Testimonials", to: "/testimonials" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact Us", to: "/contact" },
] as const;

const POPULAR_DESTINATIONS = [
  { label: "Bali", to: "/packages/bali" },
  { label: "Singapore & Malaysia", to: "/packages/singapore-malaysia" },
  { label: "Dubai", to: "/packages/dubai" },
  { label: "Thailand", to: "/packages/thailand" },
  { label: "Vietnam", to: "/packages/vietnam" },
  { label: "Turkey", to: "/packages/turkey" },
  { label: "Japan", to: "/packages/japan" },
  { label: "Europe", to: "/packages/europe" },
] as const;

export default function Footer() {
  const { contact } = useAppData();
  return (
    <footer className="relative overflow-hidden bg-[oklch(0.13_0.03_265)] pt-20 text-white">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[800px] -translate-x-1/2 rounded-full bg-brand/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {/* Col 1: About & Social */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="inline-block">
              <img src={logoImage} alt="SkyNow Holidays" className="h-14 w-auto" />
            </Link>
            <p className="max-w-xs text-sm text-white/70">
              A boutique travel studio designing personalised luxury international holidays for discerning travellers. End-to-end planning with 24/7 human support.
            </p>
            <div className="flex gap-2.5 pt-2">
              {[
                { icon: Facebook, href: "https://facebook.com/skynowholidays" },
                { icon: Instagram, href: "https://instagram.com/skynowholidays" },
                { icon: Linkedin, href: "https://linkedin.com/company/skynowholidays" },
                { icon: Youtube, href: "https://youtube.com/skynowholidays" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition duration-300 hover:bg-gold hover:text-ink"
                  aria-label="Social connection"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold tracking-wide text-white">Quick Links</h4>
            <ul className="mt-5 space-y-2.5 text-sm">
              {QUICK_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-white/70 transition-colors duration-300 hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Popular Destinations */}
          <div>
            <h4 className="font-display text-lg font-semibold tracking-wide text-white">
              Featured Holidays
            </h4>
            <ul className="mt-5 space-y-2.5 text-sm">
              {POPULAR_DESTINATIONS.map((dest) => (
                <li key={dest.to}>
                  <Link
                    to={dest.to}
                    className="text-white/70 transition-colors duration-300 hover:text-gold"
                  >
                    {dest.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Newsletter & Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold tracking-wide text-white">Newsletter</h4>
            <p className="mt-2.5 text-sm text-white/70">
              Get travel guides, visa updates and premium itineraries straight to your inbox.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex overflow-hidden rounded-full border border-white/15 bg-white/5 p-1"
            >
              <input
                type="email"
                required
                placeholder="you@email.com"
                className="flex-1 bg-transparent px-4 py-2 text-sm text-white outline-none placeholder:text-white/40"
              />
              <button
                type="submit"
                className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-ink transition-transform duration-300 hover:scale-105 active:scale-95"
              >
                Join
              </button>
            </form>
            <div className="mt-6 space-y-2 text-sm text-white/70">
              <p className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-gold shrink-0" />
                <a href={`tel:${contact.phone}`} className="hover:text-gold">
                  {contact.phone}
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-gold shrink-0" />
                <a href={`mailto:${contact.email}`} className="hover:text-gold">
                  {contact.email}
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Globe className="h-4 w-4 text-gold shrink-0" />
                <a href={contact.website.startsWith("http") ? contact.website : `https://${contact.website}`} target="_blank" rel="noreferrer" className="hover:text-gold">
                  {contact.website}
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-gold shrink-0" />
                <span>{contact.address}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Footer bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} SkyNow Holidays. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy-policy" className="hover:text-gold">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="hover:text-gold">
              Terms & Conditions
            </Link>
          </div>
          <p>Designed with ♥ for SkyNow Holidays.</p>
        </div>
      </div>
    </footer>
  );
}
