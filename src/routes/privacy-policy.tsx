import { createFileRoute } from "@tanstack/react-router";
import CommonHero from "@/components/skynow/CommonHero";

export const Route = createFileRoute("/privacy-policy")({
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <div className="bg-background pb-20">
      <CommonHero
        title="Privacy Policy"
        subtitle="How SkyNow Holidays collects, protects, and uses your personal details."
        bgImage="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <div className="prose max-w-none text-ink/80 space-y-6 text-sm sm:text-base leading-relaxed bg-white rounded-[36px] p-8 sm:p-12 border border-border shadow-sm">
          <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
            Last Updated: July 10, 2026
          </p>

          <h2 className="font-display text-2xl font-bold text-ink">1. Information We Collect</h2>
          <p>
            When you inquire about or book an international holiday with SkyNow Holidays, we collect necessary personal details to secure flights, hotel rooms, and visa appointments. This includes your name, phone number, email address, passport details (for flight bookings), dates of birth, and financial details for payments.
          </p>

          <h2 className="font-display text-2xl font-bold text-ink">2. How We Use Your Information</h2>
          <p>
            Your information is strictly used to finalize your travel reservations. Specifically:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Submitting passenger lists to flight ticket consolidators and airlines.</li>
            <li>Registering guests with hotels, cruise liners, and local ground transfer agents.</li>
            <li>Preparing application documentation for visa assistance queues.</li>
            <li>Sending newsletter updates, exclusive itineraries, and discount alerts (only if you subscribe).</li>
          </ul>

          <h2 className="font-display text-2xl font-bold text-ink">3. Third-Party Disclosures</h2>
          <p>
            We do NOT sell, lease, or distribute your personal details to advertising agencies. Your data is shared exclusively with critical travel suppliers (airlines, hotels, local destination guides, and visa slot centers) to execute your tour package.
          </p>

          <h2 className="font-display text-2xl font-bold text-ink">4. Data Protection & Security</h2>
          <p>
            SkyNow Holidays implements industry-standard SSL encryption and firewalls to secure database logs. Financial details are processed through encrypted, certified gateway managers (Razorpay, Stripe) with zero plain-text storage.
          </p>

          <h2 className="font-display text-2xl font-bold text-ink">5. Cookies</h2>
          <p>
            We use temporary analytical cookies to review web traffic, identify matching destinations, and enhance our loading experience. You can turn off cookie permissions in your browser preferences.
          </p>

          <h2 className="font-display text-2xl font-bold text-ink">6. Contact Our Compliance Team</h2>
          <p>
            For questions regarding personal database registers or request records deletes, please email us directly at <a href="mailto:privacy@skynowhollidays.com" className="text-brand font-bold underline">privacy@skynowhollidays.com</a>.
          </p>
        </div>
      </section>
    </div>
  );
}
