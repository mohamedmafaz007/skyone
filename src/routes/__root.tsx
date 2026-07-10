import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Plane } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import appCss from "../styles.css?url";
import logoUrl from "../assets/FINAL-removebg-preview.png?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import Navbar from "@/components/skynow/Navbar";
import Footer from "@/components/skynow/Footer";
import FloatingActions from "@/components/skynow/FloatingActions";

function LoadingScreen({ done }: { done: boolean }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-gradient-to-br from-[oklch(0.15_0.05_265)] via-brand to-[oklch(0.35_0.2_255)]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex flex-col items-center gap-6 text-white">
            <div className="relative flex h-36 w-36 items-center justify-center">
              {/* Pulsing exact colored logo in the center (no white inversion, logo text stays upright) */}
              <motion.div
                className="h-24 w-24 z-10 flex items-center justify-center"
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <img
                  src={logoUrl}
                  alt="SkyNow Holidays"
                  className="h-full w-full object-contain"
                />
              </motion.div>

              {/* Conical luxury gold rotating rings */}
              <motion.div
                className="absolute inset-0 rounded-full border border-white/10 border-t-gold border-r-gold"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -inset-2 rounded-full border border-dashed border-white/5 border-b-gold/50"
                animate={{ rotate: -360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <motion.p
              className="font-display text-2xl tracking-widest mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              SKYNOW HOLIDAYS
            </motion.p>
            <p className="text-xs uppercase tracking-[0.4em] text-white/70">Preparing your journey…</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4 pb-20 pt-32">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-brand">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-ink">Adventure Off-Course</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The destination you're trying to reach doesn't exist or has been relocated to another continent.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-luxury transition-all hover:brightness-110"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4 pb-20 pt-32">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-ink">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-brand px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand/90"
          >
            Try again
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-secondary"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "SkyNow Holidays — Luxury International Tours & Holiday Packages" },
      { name: "description", content: "SkyNow Holidays crafts unforgettable luxury travel experiences to 22+ international destinations. Custom holiday packages, honeymoon tours, visa assistance and 24/7 concierge support." },
      { name: "author", content: "SkyNow Holidays" },
      { property: "og:title", content: "SkyNow Holidays — Luxury International Tours" },
      { property: "og:description", content: "Discover premium curated holidays across 22+ destinations with SkyNow Holidays." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "SkyNow Holidays" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: logoUrl, type: "image/png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700;9..144,800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LoadingScreen done={loaded} />
      <div className="flex min-h-screen flex-col bg-background font-sans text-ink">
        <Navbar />
        {/* All content renders full-bleed behind the header overlay */}
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer />
        <FloatingActions />
      </div>
    </QueryClientProvider>
  );
}
