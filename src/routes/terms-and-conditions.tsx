import { createFileRoute } from "@tanstack/react-router";
import CommonHero from "@/components/skynow/CommonHero";

export const Route = createFileRoute("/terms-and-conditions")({
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="bg-background pb-20">
      <CommonHero
        title="Terms & Conditions"
        subtitle="Standard booking agreements, cancellation conditions, and payment deadlines."
        bgImage="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <div className="prose max-w-none text-ink/80 space-y-6 text-sm sm:text-base leading-relaxed bg-white rounded-[36px] p-8 sm:p-12 border border-border shadow-sm">
          <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
            Last Updated: July 10, 2026
          </p>

          <h2 className="font-display text-2xl font-bold text-ink">1. Holiday Quotations & Booking Deposit</h2>
          <p>
            All custom itineraries and tour quotations provided by SkyNow Holidays are subject to slot availability. A package booking is confirmed only when the primary booking deposit (typically 20% to 30% of total land cost) is cleared, and voucher slips are generated.
          </p>

          <h2 className="font-display text-2xl font-bold text-ink">2. Payment Milestones</h2>
          <p>
            To maintain guaranteed hotel rooms and tour guide rates:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>50% of the package cost must be settled 30 days prior to the travel date.</li>
            <li>The remaining 100% balance must be settled at least 15 days prior to the departure date.</li>
            <li>For short-notice bookings (within 20 days of takeoff), 100% payment is required upfront.</li>
          </ul>

          <h2 className="font-display text-2xl font-bold text-ink">3. Standard Cancellation Policy</h2>
          <p>
            Unless customized overrides are specified in your invoice details:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Cancellations 30+ days prior to departure: 100% refund of land package cost minus booking fee (~USD 100/pp).</li>
            <li>Cancellations 15 to 29 days prior: 50% cancellation fee.</li>
            <li>Cancellations within 14 days of departure: 100% cancellation fee (non-refundable).</li>
            <li>Flight ticket and cruise cancellations are strictly governed by the airline and liner refund guidelines.</li>
          </ul>

          <h2 className="font-display text-2xl font-bold text-ink">4. Visa Rejections</h2>
          <p>
            While SkyNow Holidays provides expert mock checks and documentation support, visa approval or denial rests solely with the destination country's consulate/embassy. In the event of a visa rejection, standard cancellation fees apply for hotels and flights already booked.
          </p>

          <h2 className="font-display text-2xl font-bold text-ink">5. Travel Insurance Mandate</h2>
          <p>
            We highly recommend securing premium travel insurance covering flight cancellations, medical emergencies, and baggage losses. SkyNow Holidays is not liable for emergency delays, volcanic disruptions, or weather conditions.
          </p>

          <h2 className="font-display text-2xl font-bold text-ink">6. Legal Jurisdiction</h2>
          <p>
            All agreements, invoices, booking terms, and dispute settlements fall under the legal jurisdiction of the courts of Bengaluru, Karnataka, India.
          </p>
        </div>
      </section>
    </div>
  );
}
