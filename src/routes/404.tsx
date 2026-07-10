import { createFileRoute, Link } from "@tanstack/react-router";
import { Compass, Home, Map } from "lucide-react";

export const Route = createFileRoute("/404")({
  component: Custom404Page,
});

export default function Custom404Page() {
  return (
    <div className="flex min-h-[75vh] flex-col items-center justify-center bg-background px-4 pb-20 pt-36 sm:pt-40">
      <div className="max-w-md text-center space-y-6">
        
        {/* Animated Icon */}
        <div className="relative mx-auto h-24 w-24">
          <div className="absolute inset-0 animate-ping rounded-full bg-brand/10" />
          <div className="relative grid h-24 w-24 place-items-center rounded-full bg-brand/10 text-brand">
            <Compass className="h-12 w-12 animate-spin-slow text-brand" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="font-display text-7xl font-extrabold tracking-tight text-brand">404</h1>
          <h2 className="font-display text-2xl font-bold text-ink">Adventure Off-Course</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The path you are looking for has been hidden or relocated. Let us get you back to the main trail.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 pt-4">
          <Link to="/">
            <button className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-white shadow-luxury hover:brightness-110 transition cursor-pointer">
              <Home className="h-4 w-4" /> Go back home
            </button>
          </Link>
          <Link to="/packages">
            <button className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-6 py-3 text-sm font-bold text-ink hover:bg-secondary transition cursor-pointer">
              <Map className="h-4 w-4" /> Browse Packages
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
