import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, X, MessageSquare, Compass } from "lucide-react";
import { destinations, faqs } from "./data";
import { getSlug } from "./packageDetailsData";

type Message = {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
  link?: { to: string; label: string };
};

const SUGGESTIONS = [
  { text: "Tell me about Bali 🏝️", query: "Tell me about Bali" },
  { text: "Do you assist with visas? 🛡️", query: "Do you assist with visas?" },
  { text: "Are flights included? ✈️", query: "Are flights included?" },
  { text: "How do I customize a trip? 🎨", query: "How do I customize a trip?" },
];

function getBotResponse(input: string): { text: string; link?: { to: string; label: string } } {
  const query = input.toLowerCase().trim();

  // 1. Match destinations
  for (const d of destinations) {
    if (query.includes(d.name.toLowerCase())) {
      const slug = getSlug(d.name);
      return {
        text: `✈️ **${d.name} Package** (${d.duration}): ${d.blurb}\n\n• **Starting Price**: ${d.price} per person\n• **Rating**: ⭐ ${d.rating}/5\n\nWe provide handpicked 4★/5★ properties, private airport/sightseeing transfers, customized sightseeing, visa guidance, and 24/7 VIP Concierge support on WhatsApp for your journey!`,
        link: { to: `/packages/${slug}`, label: `View ${d.name} Package Details` },
      };
    }
  }

  // 2. Check operational queries
  if (query.includes("visa") || query.includes("passport") || query.includes("document")) {
    return {
      text: "🛡️ **Visa & Documentation Support**:\n\nYes! Every international package booked with SkyNow Holidays includes end-to-end visa assistance. Our visa specialists guide you through mock check documentation, booking consulate appointments, and filing custom declarations to minimize rejection risks.",
      link: { to: "/services", label: "Explore Our Services" },
    };
  }

  if (
    query.includes("flight") ||
    query.includes("ticket") ||
    query.includes("airline") ||
    query.includes("airfare")
  ) {
    return {
      text: "✈️ **Flight Bookings**:\n\nMost of our listed packages are quoted on a land-only basis to offer you maximum flexibility. However, our flights team will gladly source and book the best carrier options (direct/full-service premium airlines) matching your itinerary at the time of booking confirmation.",
      link: { to: "/contact", label: "Inquire Flight Prices" },
    };
  }

  if (
    query.includes("book") ||
    query.includes("how to") ||
    query.includes("process") ||
    query.includes("reserve") ||
    query.includes("payment") ||
    query.includes("deposit") ||
    query.includes("cancel") ||
    query.includes("refund")
  ) {
    return {
      text: "📅 **Booking Process & Terms**:\n\n1. **Inquire**: Share travel dates & destinations via our form or WhatsApp.\n2. **Customize**: A dedicated travel specialist designs your custom itinerary within 24 hours.\n3. **Deposit**: Lock in your rates with a booking deposit (typically 20% to 30%).\n4. **Milestones**: Pay 50% of the balance 30 days before, and the final 100% at least 15 days before takeoff.\n\n*Cancellation*: Up to 30 days prior, enjoy a 100% refund of the land package cost (minus a small booking fee).",
      link: { to: "/terms-and-conditions", label: "Read Terms & Conditions" },
    };
  }

  if (
    query.includes("custom") ||
    query.includes("tailor") ||
    query.includes("change") ||
    query.includes("modify") ||
    query.includes("extend") ||
    query.includes("personalized")
  ) {
    return {
      text: "🎨 **Custom Tailored Itineraries**:\n\nAbsolutely! Every package on SkyNow Holidays is a flexible starting point. You can easily extend your stay, upgrade to premium private pool villas/suites, combine multiple countries, or add specific activities. Our design specialists will build the perfect itinerary for you.",
      link: { to: "/contact", label: "Request Custom Itinerary" },
    };
  }

  if (
    query.includes("group") ||
    query.includes("corporate") ||
    query.includes("family") ||
    query.includes("mice") ||
    query.includes("company")
  ) {
    return {
      text: "💼 **Group & Corporate Travel**:\n\nWe organize everything from 8-guest family reunions to 500+ pax corporate offsites and MICE trips. We handle all logistics, venue bookings, team activities, flight charters, and event coordinate support.",
      link: { to: "/services", label: "View Corporate Services" },
    };
  }

  if (
    query.includes("contact") ||
    query.includes("phone") ||
    query.includes("email") ||
    query.includes("number") ||
    query.includes("address") ||
    query.includes("support")
  ) {
    return {
      text: "📞 **Contact SkyNow Holidays**:\n\n• **Email**: support@skynowholidays.com\n• **WhatsApp Support**: Available 24/7 during your travels\n• **Form**: Click the button below to fill out our quick inquiry form, and a dedicated expert will reply within 24 hours!",
      link: { to: "/contact", label: "Contact Us Form" },
    };
  }

  if (
    query.includes("rating") ||
    query.includes("satisfaction") ||
    query.includes("review") ||
    query.includes("experience") ||
    query.includes("testimony")
  ) {
    return {
      text: "🌟 **Our Track Record**:\n\nWe are proud to have served over 10,000+ happy travellers with an overall rating of **4.9/5 stars** and a 98% customer satisfaction score. Check out our Testimonials page to read real travel stories from our guests!",
      link: { to: "/testimonials", label: "Read Guest Reviews" },
    };
  }

  if (
    query.includes("faq") ||
    query.includes("question") ||
    query.includes("help") ||
    query.includes("about your company")
  ) {
    return {
      text: "❓ **Frequently Asked Questions**:\n\nI can help you with visa assistance, customized packages, flight arrangements, booking terms, corporate trips, or detail summaries for any of our 22+ international destinations like Bali, Singapore, Dubai, Vietnam, Turkey, Europe, and Japan.",
      link: { to: "/faq", label: "View All FAQs" },
    };
  }

  // 3. Match from FAQs directly
  for (const faq of faqs) {
    if (query.includes(faq.q.toLowerCase().replace(/[^a-z0-9]/g, ""))) {
      return { text: faq.a };
    }
  }

  // 4. Default fallback
  return {
    text: "👋 I'm the SkyNow Travel Assistant! I can help you find tour details, check pricing, and understand booking terms.\n\nTry asking me about:\n• **Destinations**: e.g., 'Tell me about Bali' or 'Dubai package details'\n• **Operations**: e.g., 'Do you assist with visas?' or 'Are flights included?'\n• **Customizing**: e.g., 'Can I customize my trip?'\n\nWhat travel adventure are we planning next?",
  };
}

interface ChatbotProps {
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
}

export default function Chatbot({ isOpen: propIsOpen, setIsOpen: propSetIsOpen }: ChatbotProps) {
  const [localIsOpen, setLocalIsOpen] = useState(false);
  const isOpen = propIsOpen !== undefined ? propIsOpen : localIsOpen;
  const setIsOpen = propSetIsOpen !== undefined ? propSetIsOpen : setLocalIsOpen;
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Hello! 👋 I am your SkyNow Travel Assistant. Ask me anything about our luxury tour packages, visa services, booking process, or custom trip planning!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll on new messages or typing state
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMessage: Message = {
      id: Math.random().toString(),
      sender: "user",
      text: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate bot response after delay
    setTimeout(() => {
      const response = getBotResponse(textToSend);
      const botMessage: Message = {
        id: Math.random().toString(),
        sender: "bot",
        text: response.text,
        timestamp: new Date(),
        link: response.link,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 700); // 700ms typing delay
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-brand text-white shadow-luxury transition-all duration-300 hover:scale-110 hover:shadow-2xl cursor-pointer"
        aria-label="Toggle Chatbot"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative flex items-center justify-center"
            >
              <Bot className="h-6 w-6" />
              <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-gold text-[8px] font-bold text-ink ring-2 ring-brand animate-pulse">
                !
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed bottom-24 right-6 z-50 flex h-[500px] w-[360px] flex-col overflow-hidden rounded-[24px] border border-slate-100 bg-white shadow-luxury max-w-[calc(100vw-32px)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-[#0B1528] px-5 py-4 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/20 border border-brand/30">
                  <Bot className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold tracking-wide animate-pulse-subtle">
                    SkyNow Concierge
                  </h4>
                  <p className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online • Ready to Help
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                aria-label="Close Chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto bg-slate-50/50 p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-[20px] px-4 py-3 text-xs leading-relaxed shadow-sm ${
                      msg.sender === "user"
                        ? "bg-brand text-white rounded-br-none"
                        : "bg-white text-ink border border-slate-100 rounded-bl-none"
                    }`}
                  >
                    <p className="whitespace-pre-line font-medium">{msg.text}</p>
                    {msg.link && (
                      <Link
                        to={msg.link.to}
                        onClick={() => setIsOpen(false)}
                        className={`mt-3 inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px] py-1.5 px-3 rounded-full transition-all ${
                          msg.sender === "user"
                            ? "bg-white/20 text-white hover:bg-white/30"
                            : "bg-brand/10 text-brand hover:bg-brand/20"
                        }`}
                      >
                        <Compass className="h-3 w-3" />
                        {msg.link.label}
                      </Link>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing Animation Bubble */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-[20px] rounded-bl-none bg-white border border-slate-100 px-4 py-3 text-xs leading-relaxed shadow-sm flex items-center gap-1.5">
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Quick Suggestion Chips */}
            {messages.length === 1 && (
              <div className="bg-slate-50/50 px-4 pb-2 pt-1 flex flex-wrap gap-1.5">
                {SUGGESTIONS.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(chip.query)}
                    className="rounded-full bg-white border border-slate-200 px-3 py-1.5 text-[10px] font-semibold text-slate-700 hover:bg-brand/5 hover:border-brand/30 hover:text-brand transition-all cursor-pointer shadow-sm"
                  >
                    {chip.text}
                  </button>
                ))}
              </div>
            )}

            {/* Input Footer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="flex items-center gap-2 border-t border-slate-100 bg-white p-3"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Bali, visa support, custom tours..."
                className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs outline-none focus:border-brand/40 focus:bg-white transition-all text-ink placeholder:text-slate-400"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-white transition-all hover:scale-105 hover:brightness-110 disabled:opacity-40 disabled:hover:scale-100 disabled:hover:brightness-100 cursor-pointer"
                aria-label="Send Message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
