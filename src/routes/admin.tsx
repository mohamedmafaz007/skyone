import { useState, useEffect, useRef } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  LayoutDashboard,
  Home,
  MapPin,
  Briefcase,
  Users,
  Image as ImageIcon,
  MessageSquare,
  HelpCircle,
  Phone,
  Trash2,
  Plus,
  Edit2,
  Save,
  Lock,
  Unlock,
  Upload,
  X,
  Eye,
  Inbox,
  Compass,
  Star,
  Activity,
  Search,
  Bell,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Menu,
  Package,
  Filter,
  SortAsc,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Globe,
  Camera,
  Video,
  FileText,
  Settings,
  BarChart2,
  Download,
  Copy,
  Layers,
  PanelLeft
} from "lucide-react";
import { useAppData, IconMap, STATIC_DEFAULTS } from "@/lib/dataStore";
import { getSlug, generateFallbackDetails } from "@/components/skynow/packageDetailsData";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

/* =========================================================================
   SHARED DESIGN TOKENS
   ========================================================================= */
const S = {
  card: "bg-white rounded-2xl border border-slate-100 shadow-sm",
  cardHeader: "flex items-center justify-between px-6 py-4 border-b border-slate-100",
  cardBody: "p-6",
  label: "block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5",
  input: "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition placeholder-slate-400",
  textarea: "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition resize-none placeholder-slate-400",
  select: "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition",
  btnPrimary: "flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all cursor-pointer",
  btnSecondary: "flex items-center gap-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 active:scale-95 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all cursor-pointer",
  btnDanger: "flex items-center gap-2 rounded-xl bg-red-50 hover:bg-red-100 active:scale-95 px-4 py-2.5 text-sm font-semibold text-red-600 transition-all cursor-pointer",
  btnSuccess: "flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all cursor-pointer",
  sectionTitle: "text-sm font-bold text-slate-800 uppercase tracking-wide",
  badge: "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold",
};

/* =========================================================================
   CONFIRM MODAL (replaces window.confirm)
   ========================================================================= */
function ConfirmModal({ title, description, confirmLabel = "Delete", confirmClass = "bg-red-600 hover:bg-red-700 text-white", onConfirm, onCancel }: {
  title: string; description: string; confirmLabel?: string; confirmClass?: string; onConfirm: () => void; onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onCancel} />
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="relative z-10 w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 mb-4">
          <AlertTriangle className="h-6 w-6 text-red-500" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        <p className="mt-1.5 text-sm text-slate-500">{description}</p>
        <div className="mt-6 flex gap-3">
          <button onClick={onCancel} className={S.btnSecondary + " flex-1 justify-center"}>Cancel</button>
          <button onClick={onConfirm} className={`flex-1 justify-center flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold shadow-sm transition-all cursor-pointer active:scale-95 ${confirmClass}`}>
            {confirmLabel}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/* =========================================================================
   FILE UPLOADER (redesigned)
   ========================================================================= */
function FileUploader({ label, value, onChange, required }: { label: string; value: string; onChange: (val: string) => void; required?: boolean }) {
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    if (file.size > 1.5 * 1024 * 1024) {
      toast.error("File too large! Max 1.5MB.");
      return;
    }
    setLoading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) { onChange(e.target.result as string); toast.success("Uploaded!"); }
      setLoading(false);
    };
    reader.onerror = () => { toast.error("Failed to read file."); setLoading(false); };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  return (
    <div className="space-y-2">
      <label className={S.label}>{label}{required && <span className="text-red-500 ml-1">*</span>}</label>
      <input
        type="text" value={value} onChange={(e) => onChange(e.target.value)}
        placeholder="Paste URL or drag & drop / click to upload"
        className={S.input}
      />
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`flex items-center justify-center gap-3 rounded-xl border-2 border-dashed py-4 cursor-pointer transition-all ${dragOver ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-blue-400 hover:bg-slate-50"}`}
      >
        <input ref={inputRef} type="file" accept="image/*,video/*" className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) processFile(f); }} />
        {loading ? <Activity className="h-5 w-5 animate-spin text-blue-500" /> : <Upload className="h-5 w-5 text-slate-400" />}
        <span className="text-xs text-slate-500">{loading ? "Uploading..." : "Drop file here or click to browse"}</span>
      </div>
      {value && (
        <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3">
          {value.startsWith("data:image") || value.startsWith("http") ? (
            <img src={value} alt="Preview" className="h-12 w-12 rounded-lg object-cover border border-slate-200" />
          ) : (
            <div className="h-12 w-12 rounded-lg bg-slate-200 flex items-center justify-center">
              <Video className="h-5 w-5 text-slate-500" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-slate-700 truncate">{value.startsWith("data:") ? "Uploaded file (base64)" : value}</p>
            {value.startsWith("data:") && <p className="text-[10px] text-amber-600 mt-0.5">⚠ Base64 uses localStorage space</p>}
          </div>
          <button onClick={() => onChange("")} className="shrink-0 p-1 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   ADMIN FIELD (consistent label + input wrapper)
   ========================================================================= */
function FormField({ label, required, children, className = "" }: { label: string; required?: boolean; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label className={S.label}>{label}{required && <span className="text-red-500 ml-1">*</span>}</label>
      {children}
    </div>
  );
}

/* =========================================================================
   ADMIN CARD SECTION
   ========================================================================= */
function AdminSection({ title, icon: Icon, children, action }: { title: string; icon?: any; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className={S.card}>
      <div className={S.cardHeader}>
        <div className="flex items-center gap-2.5">
          {Icon && <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50"><Icon className="h-4 w-4 text-blue-600" /></div>}
          <h3 className="text-sm font-bold text-slate-800">{title}</h3>
        </div>
        {action}
      </div>
      <div className={S.cardBody}>{children}</div>
    </div>
  );
}

/* =========================================================================
   STORAGE GAUGE
   ========================================================================= */
function StorageGauge() {
  const [size, setSize] = useState("0.00");
  const [percent, setPercent] = useState(0);
  useEffect(() => {
    if (typeof window !== "undefined") {
      let total = 0;
      for (const x in localStorage) { if (localStorage.hasOwnProperty(x)) total += ((localStorage[x].length + x.length) * 2); }
      const mb = total / 1024 / 1024;
      setSize(mb.toFixed(2)); setPercent(Math.min(100, (mb / 5.0) * 100));
    }
  }, []);
  return (
    <div className={S.card + " p-5"}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <BarChart2 className="h-4 w-4 text-slate-500" />
          <span className="text-sm font-semibold text-slate-700">LocalStorage Usage</span>
        </div>
        <span className={`text-xs font-bold font-mono ${percent > 85 ? "text-red-600" : percent > 60 ? "text-amber-600" : "text-blue-600"}`}>
          {size} / 5.00 MB ({percent.toFixed(0)}%)
        </span>
      </div>
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-500 ${percent > 85 ? "bg-red-500" : percent > 60 ? "bg-amber-500" : "bg-blue-500"}`} style={{ width: `${percent}%` }} />
      </div>
      <p className="mt-2.5 text-[11px] text-slate-500 leading-relaxed">
        ⚠️ Max 5MB. For large media use external URLs instead of direct file uploads.
      </p>
    </div>
  );
}

/* =========================================================================
   STAT CARD
   ========================================================================= */
function StatCard({ label, value, icon: Icon, color, subtitle }: { label: string; value: string | number; icon: any; color: string; subtitle?: string }) {
  const colorMap: Record<string, { bg: string; text: string; icon: string }> = {
    blue:    { bg: "bg-blue-50",    text: "text-blue-700",    icon: "text-blue-500" },
    gold:    { bg: "bg-amber-50",   text: "text-amber-700",   icon: "text-amber-500" },
    green:   { bg: "bg-emerald-50", text: "text-emerald-700", icon: "text-emerald-500" },
    purple:  { bg: "bg-violet-50",  text: "text-violet-700",  icon: "text-violet-500" },
    red:     { bg: "bg-red-50",     text: "text-red-700",     icon: "text-red-500" },
    slate:   { bg: "bg-slate-100",  text: "text-slate-700",   icon: "text-slate-500" },
  };
  const c = colorMap[color] || colorMap.blue;
  return (
    <div className={S.card + " p-5 flex items-start gap-4"}>
      <div className={`shrink-0 flex h-11 w-11 items-center justify-center rounded-xl ${c.bg}`}>
        <Icon className={`h-5 w-5 ${c.icon}`} />
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</p>
        <p className={`mt-0.5 text-2xl font-bold font-mono ${c.text}`}>{value}</p>
        {subtitle && <p className="text-[11px] text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

/* =========================================================================
   MINI BAR CHART (CSS only)
   ========================================================================= */
function MiniBarChart({ data, label }: { data: { label: string; value: number }[]; label: string }) {
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <div>
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">{label}</p>
      <div className="flex items-end gap-2 h-28">
        {data.map((d, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full rounded-t-md bg-blue-500 transition-all duration-700" style={{ height: `${(d.value / max) * 100}%`, minHeight: 4 }} />
            <span className="text-[9px] text-slate-400 font-medium">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   ADMIN PAGE ROOT
   ========================================================================= */
function AdminPage() {
  const navigate = useNavigate();
  const appData = useAppData();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = sessionStorage.getItem("skynow_admin_auth");
      if (auth === "true") setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const API_URL = (import.meta.env.VITE_API_URL as string) || "http://localhost:5000";
    
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username, password })
      });
      
      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || "Invalid email or password.");
      }
      
      const { token, admin } = await res.json();
      
      if (typeof window !== "undefined") {
        sessionStorage.setItem("skynow_admin_auth", "true");
        localStorage.setItem("skynow_admin_token", token);
        localStorage.setItem("skynow_admin_email", admin.email);
      }
      
      setIsAuthenticated(true);
      toast.success("Welcome back, Administrator!");
    } catch (err: any) {
      toast.error(err.message || "Login failed.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("skynow_admin_auth");
      localStorage.removeItem("skynow_admin_token");
      localStorage.removeItem("skynow_admin_email");
    }
    toast.info("Logged out successfully.");
  };

  if (!appData.isMounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex items-center gap-3 text-slate-600">
          <Compass className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-base font-medium">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full max-w-md"
        >
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/30">
                <Lock className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
              <p className="mt-2 text-sm text-blue-200/70">SkyNow Holidays — CMS Access</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-blue-200/60 block mb-1.5">Email Address</label>
                <input type="email" required value={username} onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin@skynowholidays.com"
                  className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-blue-400 focus:bg-white/15 transition" />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-blue-200/60 block mb-1.5">Password</label>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-blue-400 focus:bg-white/15 transition" />
              </div>
              <button type="submit" className="w-full mt-2 rounded-xl bg-blue-600 hover:bg-blue-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition-all active:scale-98">
                Sign In to Dashboard
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  // MAIN DASHBOARD LAYOUT
  const NAV_SECTIONS = [
    {
      label: "Main",
      items: [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, badge: (appData.messages || []).filter((m: any) => !m.read).length || null },
      ]
    },
    {
      label: "Content",
      items: [
        { id: "home", label: "Home Page", icon: Home },
        { id: "packages", label: "Packages & Places", icon: MapPin },
        { id: "services", label: "Services", icon: Briefcase },
        { id: "about", label: "About Us", icon: Users },
        { id: "gallery", label: "Gallery", icon: ImageIcon },
        { id: "testimonials", label: "Testimonials", icon: MessageSquare },
        { id: "faqs", label: "FAQ", icon: HelpCircle },
      ]
    },
    {
      label: "Settings",
      items: [
        { id: "contact", label: "Contact Info", icon: Phone },
      ]
    }
  ];

  const PAGE_TITLES: Record<string, { title: string; breadcrumb: string }> = {
    dashboard:    { title: "Dashboard",           breadcrumb: "Overview" },
    home:         { title: "Home Page Editor",    breadcrumb: "Content / Home" },
    packages:     { title: "Packages & Places",   breadcrumb: "Content / Packages" },
    services:     { title: "Services Manager",    breadcrumb: "Content / Services" },
    about:        { title: "About Us Editor",     breadcrumb: "Content / About" },
    gallery:      { title: "Gallery Manager",     breadcrumb: "Content / Gallery" },
    testimonials: { title: "Testimonials",        breadcrumb: "Content / Testimonials" },
    faqs:         { title: "FAQ Manager",         breadcrumb: "Content / FAQ" },
    contact:      { title: "Contact Info",        breadcrumb: "Settings / Contact" },
  };

  const current = PAGE_TITLES[activeTab] || PAGE_TITLES.dashboard;

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* SIDEBAR OVERLAY (mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* SIDEBAR */}
      <aside className={`fixed top-0 left-0 h-full w-64 z-50 bg-slate-900 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <Globe className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-none">SkyNow</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Admin Panel</p>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 rounded-lg hover:bg-white/5 text-slate-400">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Status indicator */}
        <div className="px-5 py-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-emerald-400">Live System Online</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
          {NAV_SECTIONS.map((section) => (
            <div key={section.label}>
              <p className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-500">{section.label}</p>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const active = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                      className={`group flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                        active ? "bg-blue-600 text-white shadow-md shadow-blue-600/20" : "text-slate-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-4 w-4 shrink-0" />
                        {item.label}
                      </div>
                      {('badge' in item) && item.badge ? (
                        <span className="rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white min-w-[18px] text-center">
                          {item.badge}
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User footer */}
        <div className="px-3 py-4 border-t border-white/5">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5 mb-2">
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-white">A</span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">Administrator</p>
              <p className="text-[10px] text-slate-400 truncate">admin@skynow.in</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition"
          >
            <Unlock className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* TOP HEADER */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-slate-200 bg-white px-4 sm:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-50 transition"
          >
            <Menu className="h-5 w-5 text-slate-600" />
          </button>

          <div className="flex-1 min-w-0">
            <h1 className="text-base font-bold text-slate-900 truncate">{current.title}</h1>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5">
              <span>Admin</span>
              <ChevronRight className="h-3 w-3" />
              <span>{current.breadcrumb}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Notifications */}
            <button className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-50 transition">
              <Bell className="h-4 w-4 text-slate-600" />
              {appData.messages.filter((m: any) => !m.read).length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center">
                  {appData.messages.filter((m: any) => !m.read).length}
                </span>
              )}
            </button>
            {/* Admin avatar */}
            <button onClick={() => navigate({ to: "/" })} className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-50 transition">
              <Eye className="h-4 w-4 text-slate-600" />
            </button>
            <div className="hidden sm:flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 cursor-pointer">
              <span className="text-xs font-bold text-white">A</span>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-4 sm:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {activeTab === "dashboard"    && <DashboardTab appData={appData} />}
              {activeTab === "home"         && <HomeTab appData={appData} />}
              {activeTab === "packages"     && <PackagesTab appData={appData} />}
              {activeTab === "services"     && <ServicesTab appData={appData} />}
              {activeTab === "about"        && <AboutTab appData={appData} />}
              {activeTab === "gallery"      && <GalleryTab appData={appData} />}
              {activeTab === "testimonials" && <TestimonialsTab appData={appData} />}
              {activeTab === "faqs"         && <FaqsTab appData={appData} />}
              {activeTab === "contact"      && <ContactTab appData={appData} />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

/* =========================================================================
   DASHBOARD TAB
   ========================================================================= */
function DashboardTab({ appData }: { appData: any }) {
  const totalPkgs = appData.destinations.length;
  const totalReviews = appData.testimonials.reviews.length + appData.testimonials.videos.length;
  const totalFAQs = appData.faqs.length;
  const totalGallery = appData.galleryImages.length;
  const unread = appData.messages.filter((m: any) => !m.read).length;
  const totalMsg = appData.messages.length;
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const barData = [
    { label: "Mon", value: 12 }, { label: "Tue", value: 19 }, { label: "Wed", value: 7 },
    { label: "Thu", value: 25 }, { label: "Fri", value: 32 }, { label: "Sat", value: 45 }, { label: "Sun", value: 28 }
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Welcome back, Administrator 👋</h2>
        <p className="text-sm text-slate-500 mt-1">Here's what's happening with SkyNow Holidays today.</p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Packages" value={totalPkgs} icon={MapPin} color="blue" subtitle="Active destinations" />
        <StatCard label="Reviews" value={totalReviews} icon={Star} color="gold" subtitle="Customer testimonials" />
        <StatCard label="FAQ Topics" value={totalFAQs} icon={HelpCircle} color="purple" subtitle="Help articles" />
        <StatCard label="Gallery" value={totalGallery} icon={ImageIcon} color="green" subtitle="Media items" />
        <StatCard label="Messages" value={totalMsg} icon={Inbox} color="slate" subtitle={`${unread} unread`} />
        <StatCard label="Unread" value={unread} icon={Bell} color={unread > 0 ? "red" : "green"} subtitle={unread > 0 ? "Action needed" : "All caught up!"} />
      </div>

      {/* Charts row */}
      <div className="grid gap-4 lg:grid-cols-2">
        <AdminSection title="Weekly Enquiry Activity" icon={TrendingUp}>
          <MiniBarChart data={barData} label="Enquiries by day (sample data)" />
        </AdminSection>
        <AdminSection title="Content Summary" icon={Layers}>
          <div className="space-y-3">
            {[
              { label: "Tour Packages", val: totalPkgs, max: 50, color: "bg-blue-500" },
              { label: "Gallery Images", val: totalGallery, max: 100, color: "bg-violet-500" },
              { label: "Client Reviews", val: totalReviews, max: 30, color: "bg-amber-500" },
              { label: "FAQ Entries", val: totalFAQs, max: 30, color: "bg-emerald-500" },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-medium text-slate-600">{item.label}</span>
                  <span className="font-bold text-slate-800">{item.val}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full">
                  <div className={`h-full rounded-full ${item.color}`} style={{ width: `${Math.min(100, (item.val / item.max) * 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </AdminSection>
      </div>

      <StorageGauge />

      {/* Inbox */}
      <AdminSection title={`Visitor Enquiries Inbox (${totalMsg})`} icon={Inbox}
        action={
          <span className={`${S.badge} ${unread > 0 ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"}`}>
            {unread > 0 ? `${unread} unread` : "All read"}
          </span>
        }
      >
        {appData.messages.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center">
            <Inbox className="h-12 w-12 text-slate-200 mb-3" />
            <p className="text-sm font-medium text-slate-400">No enquiries yet</p>
            <p className="text-xs text-slate-300 mt-1">Submit a contact form on the website to test.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {appData.messages.map((msg: any) => (
              <div key={msg.id} className={`rounded-xl border p-4 transition-all ${msg.read ? "border-slate-100 bg-white" : "border-blue-200 bg-blue-50"}`}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${msg.read ? "bg-slate-100 text-slate-500" : "bg-blue-100 text-blue-700"}`}>
                      {msg.name?.charAt(0) || "?"}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                        {msg.name}
                        {!msg.read && <span className="h-2 w-2 rounded-full bg-blue-500" />}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5 font-mono">{msg.email} · {msg.phone}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => appData.markMessageRead(msg.id, !msg.read)}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition">
                      {msg.read ? "Mark Unread" : "Mark Read"}
                    </button>
                    <button onClick={() => setConfirmDeleteId(msg.id)} className="rounded-lg bg-red-50 p-1.5 text-red-500 hover:bg-red-100 transition">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-slate-100 pt-3">
                  {[
                    { l: "Destination", v: msg.destination || "—" },
                    { l: "Service", v: msg.service || "General" },
                    { l: "Travel Date", v: msg.travelDate || "—" },
                    { l: "Guests", v: msg.guests || "1" },
                  ].map((f) => (
                    <div key={f.l}>
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{f.l}</p>
                      <p className="text-xs font-semibold text-slate-700 mt-0.5">{f.v}</p>
                    </div>
                  ))}
                </div>
                {msg.message && (
                  <div className="mt-3 rounded-lg bg-slate-50 border border-slate-100 p-3 text-xs text-slate-600 leading-relaxed">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400 mb-1">Message</p>
                    {msg.message}
                  </div>
                )}
                <p className="mt-2 text-[10px] text-slate-400">{msg.timestamp}</p>
              </div>
            ))}
          </div>
        )}
      </AdminSection>

      <AnimatePresence>
        {confirmDeleteId && (
          <ConfirmModal
            title="Delete enquiry?"
            description="This message will be permanently removed."
            confirmLabel="Delete"
            onConfirm={() => { appData.deleteMessage(confirmDeleteId); toast.info("Message deleted."); setConfirmDeleteId(null); }}
            onCancel={() => setConfirmDeleteId(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* =========================================================================
   HOME PAGE EDITOR TAB
   ========================================================================= */
function HomeTab({ appData }: { appData: any }) {
  const [heroTitle, setHeroTitle] = useState(appData.home.hero.title);
  const [heroSubtitle, setHeroSubtitle] = useState(appData.home.hero.subtitle);
  const [heroBgType, setHeroBgType] = useState(appData.home.hero.bgType);
  const [heroBgUrl, setHeroBgUrl] = useState(appData.home.hero.bgUrl);
  const [stats, setStats] = useState(appData.home.stats);
  const [trustBadges, setTrustBadges] = useState(appData.home.trustBadges);
  const [partnerLogos, setPartnerLogos] = useState(appData.home.partnerLogos);
  const [newLogo, setNewLogo] = useState("");

  const [trustTagline, setTrustTagline] = useState(appData.home.trustSection?.tagline || "Trusted worldwide");
  const [trustTitle, setTrustTitle] = useState(appData.home.trustSection?.title || "Trusted by thousands of happy travellers");
  const [destTagline, setDestTagline] = useState(appData.home.destinationsSection?.tagline || "Popular destinations");
  const [destTitle, setDestTitle] = useState(appData.home.destinationsSection?.title || "Handpicked corners of the world");
  const [destDescription, setDestDescription] = useState(appData.home.destinationsSection?.description || "");
  const [packTagline, setPackTagline] = useState(appData.home.packagesSection?.tagline || "Featured packages");
  const [packTitle, setPackTitle] = useState(appData.home.packagesSection?.title || "Ready-to-go itineraries, infinitely customisable.");
  const [aboutTagline, setAboutTagline] = useState(appData.home.aboutSection?.tagline || "Why SkyNow Holidays");
  const [aboutTitle, setAboutTitle] = useState(appData.home.aboutSection?.title || "A boutique travel studio.");
  const [aboutDescription, setAboutDescription] = useState(appData.home.aboutSection?.description || "");
  const [aboutImage, setAboutImage] = useState(appData.home.aboutSection?.image || "");
  const [aboutSinceYear, setAboutSinceYear] = useState(appData.home.aboutSection?.sinceYear || "2010");
  const [aboutBadgeLabel, setAboutBadgeLabel] = useState(appData.home.aboutSection?.badgeLabel || "Best Price");
  const [aboutBadgeVal, setAboutBadgeVal] = useState(appData.home.aboutSection?.badgeVal || "Guaranteed");
  const [howTagline, setHowTagline] = useState(appData.home.howItWorks?.tagline || "How it works");
  const [howTitle, setHowTitle] = useState(appData.home.howItWorks?.title || "Four steps to take-off.");
  const [howSteps, setHowSteps] = useState(appData.home.howItWorks?.steps || []);
  const [faqTagline, setFaqTagline] = useState(appData.home.faqSection?.tagline || "FAQ");
  const [faqTitle, setFaqTitle] = useState(appData.home.faqSection?.title || "Questions, answered.");
  const [faqDescription, setFaqDescription] = useState(appData.home.faqSection?.description || "");
  const [contactTagline, setContactTagline] = useState(appData.home.contactSection?.tagline || "Get in touch");
  const [contactTitle, setContactTitle] = useState(appData.home.contactSection?.title || "Let's design your next great trip.");
  const [contactDescription, setContactDescription] = useState(appData.home.contactSection?.description || "");

  const [tdTagline, setTdTagline] = useState(appData.home.travelDiaries?.tagline || "Travel diaries");
  const [tdTitle, setTdTitle] = useState(appData.home.travelDiaries?.title || "Moments from our travellers' cameras.");
  const [tdDescription, setTdDescription] = useState(appData.home.travelDiaries?.description || "Real photos from real trips. Every frame here started as an enquiry — could yours be next?");
  const [tdImages, setTdImages] = useState<string[]>(
    appData.home.travelDiaries?.images && appData.home.travelDiaries.images.length > 0
      ? appData.home.travelDiaries.images
      : appData.galleryImages.map((g: any) => g.url)
  );

  const handleSaveHero = () => {
    handleSaveAllChanges();
  };
  const handleSaveStats = () => {
    handleSaveAllChanges();
  };
  const handleSaveBadges = () => {
    handleSaveAllChanges();
  };
  const handleAddLogo = () => {
    if (!newLogo.trim()) return;
    const updated = [...partnerLogos, newLogo.trim()]; setPartnerLogos(updated);
    setNewLogo(""); toast.success("Logo added locally! Click Save Changes to save.");
  };
  const handleDeleteLogo = (i: number) => {
    const updated = partnerLogos.filter((_: any, j: number) => j !== i); setPartnerLogos(updated);
    toast.info("Logo removed locally. Click Save Changes to save.");
  };
  const handleSaveAllSections = () => {
    handleSaveAllChanges();
  };

  const handleSaveAllChanges = () => {
    appData.updateHome({
      hero: { title: heroTitle, subtitle: heroSubtitle, bgType: heroBgType, bgUrl: heroBgUrl },
      stats,
      trustBadges,
      partnerLogos,
      trustSection: { tagline: trustTagline, title: trustTitle },
      destinationsSection: { tagline: destTagline, title: destTitle, description: destDescription },
      packagesSection: { tagline: packTagline, title: packTitle },
      aboutSection: { tagline: aboutTagline, title: aboutTitle, description: aboutDescription, image: aboutImage, sinceYear: aboutSinceYear, badgeLabel: aboutBadgeLabel, badgeVal: aboutBadgeVal },
      howItWorks: { tagline: howTagline, title: howTitle, steps: howSteps },
      faqSection: { tagline: faqTagline, title: faqTitle, description: faqDescription },
      contactSection: { tagline: contactTagline, title: contactTitle, description: contactDescription },
      travelDiaries: { tagline: tdTagline, title: tdTitle, description: tdDescription, images: tdImages }
    });
    toast.success("Home page changes saved successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Home Page Editor</h2>
          <p className="text-sm text-slate-500 mt-1">Update hero content, counters, partner logos, trust badges, and section headings.</p>
        </div>
        <button onClick={handleSaveAllChanges} className={S.btnSuccess}><Save className="h-4 w-4" /> Save Changes</button>
      </div>

      {/* Hero */}
      <AdminSection title="Hero Section" icon={Home}>
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Hero Title" className="sm:col-span-2">
            <input type="text" value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} className={S.input} />
          </FormField>
          <FormField label="Hero Subtitle" className="sm:col-span-2">
            <textarea rows={2} value={heroSubtitle} onChange={(e) => setHeroSubtitle(e.target.value)} className={S.textarea} />
          </FormField>
          <FormField label="Background Media Type">
            <select value={heroBgType} onChange={(e: any) => setHeroBgType(e.target.value)} className={S.select}>
              <option value="image">Still Image</option>
              <option value="video">Background Video</option>
            </select>
          </FormField>
          <div>
            <FileUploader label="Hero Background Media" value={heroBgUrl} onChange={(v) => setHeroBgUrl(v)} />
          </div>
        </div>
        <div className="mt-5 flex gap-3">
          <button onClick={handleSaveHero} className={S.btnPrimary}><Save className="h-4 w-4" /> Save Hero</button>
        </div>
      </AdminSection>

      {/* Stats */}
      <AdminSection title="Statistics & Counters" icon={BarChart2}>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {stats.map((stat: any, idx: number) => (
            <div key={idx} className="rounded-xl border border-slate-100 bg-slate-50 p-4 space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase">Counter {idx + 1}</span>
              <FormField label="Value"><input type="number" value={stat.value} onChange={(e) => { const u = [...stats]; u[idx].value = parseInt(e.target.value) || 0; setStats(u); }} className={S.input} /></FormField>
              <FormField label="Suffix"><input type="text" value={stat.suffix} onChange={(e) => { const u = [...stats]; u[idx].suffix = e.target.value; setStats(u); }} className={S.input} /></FormField>
              <FormField label="Label"><input type="text" value={stat.label} onChange={(e) => { const u = [...stats]; u[idx].label = e.target.value; setStats(u); }} className={S.input} /></FormField>
            </div>
          ))}
        </div>
        <div className="mt-5">
          <button onClick={handleSaveStats} className={S.btnPrimary}><Save className="h-4 w-4" /> Save Stats</button>
        </div>
      </AdminSection>

      {/* Trust Badges */}
      <AdminSection title="Trust Badges" icon={CheckCircle2}>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-5">
          {trustBadges.map((badge: any, idx: number) => (
            <div key={idx} className="rounded-xl border border-slate-100 bg-slate-50 p-4 space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase">Badge {idx + 1}</span>
              <FormField label="Icon">
                <select value={badge.icon} onChange={(e) => { const u = [...trustBadges]; u[idx].icon = e.target.value; setTrustBadges(u); }} className={S.select}>
                  {Object.keys(IconMap).map((k) => <option key={k} value={k}>{k}</option>)}
                </select>
              </FormField>
              <FormField label="Label"><input type="text" value={badge.label} onChange={(e) => { const u = [...trustBadges]; u[idx].label = e.target.value; setTrustBadges(u); }} className={S.input} /></FormField>
            </div>
          ))}
        </div>
        <div className="mt-5">
          <button onClick={handleSaveBadges} className={S.btnPrimary}><Save className="h-4 w-4" /> Save Badges</button>
        </div>
      </AdminSection>

      {/* Partner Logos */}
      <AdminSection title="Partner Brand Logos" icon={Globe}>
        <div className="flex gap-3 mb-4">
          <input type="text" value={newLogo} onChange={(e) => setNewLogo(e.target.value)} placeholder="Partner name (e.g. Qantas)" className={S.input + " max-w-xs"} />
          <button onClick={handleAddLogo} className={S.btnPrimary}><Plus className="h-4 w-4" /> Add</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {partnerLogos.map((logo: string, idx: number) => (
            <span key={idx} className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-700">
              {logo}
              <button onClick={() => handleDeleteLogo(idx)} className="hover:text-red-500 transition">
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      </AdminSection>

      {/* Section Headings */}
      <AdminSection title="Section Headers & Descriptions" icon={FileText}>
        <div className="space-y-8">
          {/* Trust */}
          <div>
            <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-4">1. Trust Section</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Tagline"><input type="text" value={trustTagline} onChange={(e) => setTrustTagline(e.target.value)} className={S.input} /></FormField>
              <FormField label="Title"><input type="text" value={trustTitle} onChange={(e) => setTrustTitle(e.target.value)} className={S.input} /></FormField>
            </div>
          </div>
          <hr className="border-slate-100" />
          {/* Destinations */}
          <div>
            <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-4">2. Destinations Section</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Tagline"><input type="text" value={destTagline} onChange={(e) => setDestTagline(e.target.value)} className={S.input} /></FormField>
              <FormField label="Title"><input type="text" value={destTitle} onChange={(e) => setDestTitle(e.target.value)} className={S.input} /></FormField>
              <FormField label="Description" className="sm:col-span-2"><textarea rows={2} value={destDescription} onChange={(e) => setDestDescription(e.target.value)} className={S.textarea} /></FormField>
            </div>
          </div>
          <hr className="border-slate-100" />
          {/* Packages */}
          <div>
            <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-4">3. Packages Section</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Tagline"><input type="text" value={packTagline} onChange={(e) => setPackTagline(e.target.value)} className={S.input} /></FormField>
              <FormField label="Title"><input type="text" value={packTitle} onChange={(e) => setPackTitle(e.target.value)} className={S.input} /></FormField>
            </div>
          </div>
          <hr className="border-slate-100" />
          {/* About */}
          <div>
            <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-4">4. About Section</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Tagline"><input type="text" value={aboutTagline} onChange={(e) => setAboutTagline(e.target.value)} className={S.input} /></FormField>
              <FormField label="Title"><input type="text" value={aboutTitle} onChange={(e) => setAboutTitle(e.target.value)} className={S.input} /></FormField>
              <FormField label="Description" className="sm:col-span-2"><textarea rows={3} value={aboutDescription} onChange={(e) => setAboutDescription(e.target.value)} className={S.textarea} /></FormField>
              <div><FileUploader label="Representative Image" value={aboutImage} onChange={(v) => setAboutImage(v)} /></div>
              <div className="space-y-4">
                <FormField label="Since Year"><input type="text" value={aboutSinceYear} onChange={(e) => setAboutSinceYear(e.target.value)} className={S.input} /></FormField>
                <FormField label="Badge Label"><input type="text" value={aboutBadgeLabel} onChange={(e) => setAboutBadgeLabel(e.target.value)} className={S.input} /></FormField>
                <FormField label="Badge Value"><input type="text" value={aboutBadgeVal} onChange={(e) => setAboutBadgeVal(e.target.value)} className={S.input} /></FormField>
              </div>
            </div>
          </div>
          <hr className="border-slate-100" />
          {/* How It Works */}
          <div>
            <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-4">5. How It Works</p>
            <div className="grid gap-4 sm:grid-cols-2 mb-4">
              <FormField label="Tagline"><input type="text" value={howTagline} onChange={(e) => setHowTagline(e.target.value)} className={S.input} /></FormField>
              <FormField label="Title"><input type="text" value={howTitle} onChange={(e) => setHowTitle(e.target.value)} className={S.input} /></FormField>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {howSteps.map((step: any, i: number) => (
                <div key={i} className="rounded-xl border border-slate-100 bg-slate-50 p-4 space-y-3">
                  <span className="text-xs font-bold text-amber-600 uppercase">Step {step.n}</span>
                  <FormField label="Title"><input type="text" value={step.t} onChange={(e) => { const u = [...howSteps]; u[i].t = e.target.value; setHowSteps(u); }} className={S.input} /></FormField>
                  <FormField label="Description"><input type="text" value={step.d} onChange={(e) => { const u = [...howSteps]; u[i].d = e.target.value; setHowSteps(u); }} className={S.input} /></FormField>
                </div>
              ))}
            </div>
          </div>
          <hr className="border-slate-100" />
          {/* FAQ section */}
          <div>
            <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-4">6. FAQ Section</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Tagline"><input type="text" value={faqTagline} onChange={(e) => setFaqTagline(e.target.value)} className={S.input} /></FormField>
              <FormField label="Title"><input type="text" value={faqTitle} onChange={(e) => setFaqTitle(e.target.value)} className={S.input} /></FormField>
              <FormField label="Description" className="sm:col-span-2"><input type="text" value={faqDescription} onChange={(e) => setFaqDescription(e.target.value)} className={S.input} /></FormField>
            </div>
          </div>
          <hr className="border-slate-100" />
          {/* Contact section */}
          <div>
            <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-4">7. Contact Section</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Tagline"><input type="text" value={contactTagline} onChange={(e) => setContactTagline(e.target.value)} className={S.input} /></FormField>
              <FormField label="Title"><input type="text" value={contactTitle} onChange={(e) => setContactTitle(e.target.value)} className={S.input} /></FormField>
              <FormField label="Description" className="sm:col-span-2"><input type="text" value={contactDescription} onChange={(e) => setContactDescription(e.target.value)} className={S.input} /></FormField>
            </div>
          </div>
          <hr className="border-slate-100" />
          {/* Travel Diaries section */}
          <div>
            <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-4">8. Travel Diaries Section (Home Page)</p>
            <div className="grid gap-4 sm:grid-cols-2 mb-4">
              <FormField label="Tagline"><input type="text" value={tdTagline} onChange={(e) => setTdTagline(e.target.value)} className={S.input} /></FormField>
              <FormField label="Title"><input type="text" value={tdTitle} onChange={(e) => setTdTitle(e.target.value)} className={S.input} /></FormField>
              <FormField label="Description" className="sm:col-span-2"><textarea rows={2} value={tdDescription} onChange={(e) => setTdDescription(e.target.value)} className={S.textarea} /></FormField>
            </div>

            <FormField label="Diary Images">
              {tdImages.length > 0 && (
                <div className="grid gap-3 grid-cols-2 sm:grid-cols-4 md:grid-cols-6 mb-3">
                  {tdImages.map((imgUrl, imgIdx) => (
                    <div key={imgIdx} className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 group bg-slate-100">
                      <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                      <button
                        onClick={() => setTdImages(tdImages.filter((_, i) => i !== imgIdx))}
                        className="absolute top-1.5 right-1.5 p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition shadow"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <FileUploader label="Upload / Add Image to Home Travel Diaries" value=""
                onChange={(val) => {
                  if (val) setTdImages([...tdImages, val]);
                }}
              />
            </FormField>
          </div>
        </div>
        <div className="mt-6 pt-5 border-t border-slate-100">
          <button onClick={handleSaveAllSections} className={S.btnPrimary}><Save className="h-4 w-4" /> Save All Section Texts</button>
        </div>
      </AdminSection>
    </div>
  );
}

/* =========================================================================
   AI PACKAGE TEXT PARSER (client-side, no backend needed)
   ========================================================================= */
function parsePackageText(text: string): { dest: any; details: any } {
  const t = text;

  // ── Destination-level fields ──────────────────────────────────────────────
  const dest: any = {};

  // Name: first non-empty line or "Package Name:" label
  const nameLabelMatch = t.match(/(?:package\s*name|destination|tour\s*name)[:\s]+(.+)/i);
  const firstLine = t.split('\n').find(l => l.trim().length > 2);
  if (nameLabelMatch) dest.name = nameLabelMatch[1].trim();
  else if (firstLine) dest.name = firstLine.trim().replace(/[:\-–].*$/, '').trim();

  // Country
  const countryMatch = t.match(/(?:country|location|place)[:\s]+(.+)/i);
  if (countryMatch) dest.country = countryMatch[1].split('\n')[0].trim();

  // Duration  e.g. 5N/6D, 5 Nights 6 Days
  const durMatch = t.match(/(\d+)\s*N\s*[\/\-\s]\s*(\d+)\s*D/i) ||
                   t.match(/(\d+)\s*nights?.*?(\d+)\s*days?/i) ||
                   t.match(/duration[:\s]+([^\n]+)/i);
  if (durMatch) {
    dest.duration = durMatch[2]
      ? `${durMatch[1]}N / ${durMatch[2]}D`
      : durMatch[1].trim();
  }

  // Price
  const priceMatch = t.match(/(?:price|cost|rate|per\s*person)[:\s]*[₹$£€]?\s*([\d,]+)/i) ||
                     t.match(/[₹]\s*([\d,]+)/i);
  if (priceMatch) dest.price = `₹${priceMatch[1].replace(/,/g,'').replace(/(\d)(?=(\d{3})+$)/g,'$1,')}`;

  // Blurb – first paragraph-ish block of sentences
  const blurbMatch = t.match(/(?:overview|about|highlight|summary)[:\s]+([^\n]{20,})/i);
  if (blurbMatch) dest.blurb = blurbMatch[1].trim().substring(0, 120);

  // ── Details-level fields ─────────────────────────────────────────────────
  const details: any = {};

  // Overview – first big paragraph
  const ovMatch = t.match(/(?:overview|about this tour|description)[:\s]*\n([\s\S]{20,?})(?=\n(?:day\s*1|itinerary|inclusion|hotel|$))/i);
  if (ovMatch) details.overview = ovMatch[1].trim().substring(0, 800);

  // Highlights – bullet list under "Highlights" header
  const hlSection = t.match(/highlights?[:\s]*\n([\s\S]+?)(?=\nday\s*1|\nitinerary|\ninclusion|\n#|\n[A-Z].*:\s*\n|$)/i);
  if (hlSection) {
    details.highlights = hlSection[1]
      .split('\n')
      .map((l: string) => l.replace(/^[-•✓✅*\d.]+\s*/, '').trim())
      .filter((l: string) => l.length > 4)
      .slice(0, 8);
  }

  // Itinerary – "Day 1: Title\nDesc"
  const dayMatches = [...t.matchAll(/day\s*(\d+)\s*[:\-–]+\s*(.+?)\n([\s\S]+?)(?=day\s*\d+\s*[:\-–]|inclusions?\s*:|exclusions?\s*:|hotels?\s*:|$)/gi)];
  if (dayMatches.length > 0) {
    details.itinerary = dayMatches.map((m: RegExpMatchArray) => ({
      day: `Day ${m[1]}`,
      title: m[2].trim().substring(0, 70),
      desc: m[3].trim().substring(0, 500)
    })).slice(0, 12);
  }

  const parseList = (sectionText: string): string[] => {
    if (!sectionText) return [];
    if (sectionText.includes('\n')) {
      return sectionText
        .split('\n')
        .map((l: string) => l.replace(/^[-•✓✗✅❌*\d.]+\s*/, '').trim())
        .filter((l: string) => l.length > 2);
    }
    return sectionText
      .split(/[,;]/)
      .map((item: string) => item.trim())
      .filter((item: string) => item.length > 2);
  };

  // Inclusions
  const inclSection = t.match(/(?:inclusions?|includes?|what's\s*included|included)[:\s]*\r?\n([\s\S]+?)(?=\r?\n(?:exclusions?|excludes?|what's\s*excluded|excluded|hotels?|stays?|accommodation|transport|visa|best\s*time|#|$))/i);
  if (inclSection) {
    details.inclusions = parseList(inclSection[1]).slice(0, 12);
  }

  // Exclusions
  const exclSection = t.match(/(?:exclusions?|excludes?|what's\s*excluded|excluded)[:\s]*\r?\n([\s\S]+?)(?=\r?\n(?:inclusions?|includes?|what's\s*included|included|hotels?|stays?|accommodation|transport|visa|best\s*time|#|$))/i);
  if (exclSection) {
    details.exclusions = parseList(exclSection[1]).slice(0, 10);
  }

  // Hotels
  const hotelLines = [...t.matchAll(/(?:hotel|stay|accommodation)[:\s]+([^\n]+?)(?:\s+[–-]\s*|\s*[\(|,]\s*)?([1-5])\s*(?:star|\*)/gi)];
  if (hotelLines.length > 0) {
    details.hotels = hotelLines.map((m: RegExpMatchArray) => ({
      name: m[1].trim(), stars: parseInt(m[2]) || 4, location: ''
    })).slice(0, 5);
  }

  // Transportation
  const transMatch = t.match(/(?:transportation|transfer|transport)[:\s]+([^\n]{5,})/i);
  if (transMatch) details.transportation = transMatch[1].trim();

  // Visa Info
  const visaMatch = t.match(/(?:visa|documentation)[:\s]+([\s\S]{10,100})/i);
  if (visaMatch) details.visaInfo = visaMatch[1].split('\n')[0].trim();

  // Best Time
  const bestTimeMatch = t.match(/(?:best\s*time|ideal\s*season)[:\s]+([^\n]{5,})/i);
  if (bestTimeMatch) details.bestTime = bestTimeMatch[1].trim();

  return { dest, details };
}


export const callGeminiServer = createServerFn({ method: "POST" })
  .validator((d: { text?: string; base64Pdf?: string; token?: string }) => d)
  .handler(async ({ data }) => {
    const API_URL = process.env.VITE_API_URL || "http://localhost:5000";
    
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (data.token) {
      headers["Authorization"] = `Bearer ${data.token}`;
    }

    const res = await fetch(`${API_URL}/api/ai/parse-package-document`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        text: data.text,
        base64Pdf: data.base64Pdf
      })
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "Unknown backend parsing error.");
      let msg = `Backend parsing error ${res.status}`;
      try {
        const json = JSON.parse(errText);
        msg = json.error || msg;
      } catch {}
      throw new Error(msg);
    }

    return res.json();
  });

/* =========================================================================
   PACKAGES TAB
   ========================================================================= */
function PackagesTab({ appData }: { appData: any }) {
  const [destinations, setDestinations] = useState<any[]>(appData.destinations || []);
  const [db, setDb] = useState<Record<string, any>>(appData.destinationDetailsDb || {});
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [searchQ, setSearchQ] = useState("");
  const [filterTag, setFilterTag] = useState("All");
  const [confirmDelete, setConfirmDelete] = useState<{ slug: string; name: string } | null>(null);

  // Keep local state in sync when appData updates from backend fetch
  useEffect(() => {
    if (Array.isArray(appData.destinations) && appData.destinations.length > 0) {
      setDestinations(appData.destinations);
    }
    if (appData.destinationDetailsDb && Object.keys(appData.destinationDetailsDb).length > 0) {
      setDb(appData.destinationDetailsDb);
    }
  }, [appData.destinations, appData.destinationDetailsDb]);

  const [aiPastedText, setAiPastedText] = useState("");
  const [aiFileName, setAiFileName] = useState("");
  const [aiFile, setAiFile] = useState<File | null>(null);
  const [aiParsing, setAiParsing] = useState(false);
  const [aiApplied, setAiApplied] = useState(false);
  const aiFileRef = useRef<HTMLInputElement>(null);

  const emptyDetails = {
    overview: "", highlights: [""], itinerary: [{ day: "Day 1", title: "", desc: "" }],
    inclusions: [""], exclusions: [""], hotels: [{ name: "", stars: 5, location: "" }],
    transportation: "Hotels are subject to availability; alternatives of similar", visaInfo: "", bestTime: "", faqs: [{ q: "Question", a: "Answer" }], images: []
  };

  // Convert File to base64 for Gemini PDF Upload
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = (reader.result as string).split(",")[1];
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  // Read plain text file
  const readTxtText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string || "");
      reader.onerror = () => reject(new Error("Failed to read text file"));
      reader.readAsText(file, "utf-8");
    });
  };

  // Dynamically load Mammoth for DOCX files
  const loadMammoth = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      if ((window as any).mammoth) {
        resolve((window as any).mammoth);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js";
      script.onload = () => resolve((window as any).mammoth);
      script.onerror = () => reject(new Error("Failed to load mammoth library"));
      document.head.appendChild(script);
    });
  };

  const readDocxText = async (file: File): Promise<string> => {
    const mammoth = await loadMammoth();
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value || "";
  };

  const applyGeminiResult = (res: any) => {
    if (!activeSlug) return;
    
    // Construct destination fields
    const destFields: any = {};
    if (res.name) destFields.name = res.name;
    if (res.country) destFields.country = res.country;
    if (res.duration) destFields.duration = res.duration;
    if (res.price) destFields.price = res.price;
    if (res.blurb) destFields.blurb = res.blurb;
    
    // Construct details fields
    const detailsFields: any = {
      overview: res.overview || "",
      highlights: Array.isArray(res.highlights) ? res.highlights : [""],
      itinerary: Array.isArray(res.itinerary) ? res.itinerary.map((it: any) => ({
        day: it.day || "Day 1",
        title: it.title || "",
        desc: it.desc || ""
      })) : [{ day: "Day 1", title: "", desc: "" }],
      inclusions: Array.isArray(res.inclusions) ? res.inclusions : [""],
      exclusions: Array.isArray(res.exclusions) ? res.exclusions : [""],
      hotels: Array.isArray(res.hotels) ? res.hotels.map((h: any) => ({
        name: h.name || "",
        stars: parseInt(h.stars) || 5,
        location: h.location || ""
      })) : [{ name: "", stars: 5, location: "" }],
      transportation: res.transportation || "",
      visaInfo: res.visaInfo || "",
      bestTime: res.bestTime || ""
    };

    // Determine the next slug
    const nextSlug = destFields.name ? getSlug(destFields.name) : activeSlug;
    
    // 1. Update destinations list
    const newDests = (Array.isArray(destinations) ? destinations : []).map((d: any) => {
      if (getSlug(d.name) === activeSlug) {
        return { ...d, ...destFields };
      }
      return d;
    });

    // 2. Update DB details
    const targetDest = (Array.isArray(destinations) ? destinations : []).find((d: any) => getSlug(d.name) === activeSlug);
    const baseDetails = db[activeSlug] || (targetDest ? generateFallbackDetails(targetDest) : emptyDetails);
    const updatedDetails = { ...baseDetails, ...detailsFields };

    const newDb = { ...db };
    if (nextSlug !== activeSlug) {
      newDb[nextSlug] = updatedDetails;
      delete newDb[activeSlug];
      setActiveSlug(nextSlug);
    } else {
      newDb[activeSlug] = updatedDetails;
    }

    setDestinations(newDests);
    setDb(newDb);
    setAiApplied(true);
  };

  // AI: handle file upload
  const handleAiFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAiFile(file);
    setAiFileName(file.name);
    setAiApplied(false);
    
    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    if (isPdf) {
      setAiPastedText("[PDF File Loaded - click Analyze to process document with Gemini]");
      toast.info(`PDF file "${file.name}" loaded successfully.`);
    } else if (file.name.endsWith(".docx") || file.name.endsWith(".doc")) {
      setAiParsing(true);
      try {
        const text = await readDocxText(file);
        setAiPastedText(text);
        toast.success(`Word document "${file.name}" text extracted successfully.`);
      } catch (err) {
        console.error(err);
        toast.error("Failed to parse Word document. Please try copying and pasting text.");
      } finally {
        setAiParsing(false);
      }
    } else {
      // Plain text or text files
      setAiParsing(true);
      try {
        const text = await readTxtText(file);
        setAiPastedText(text);
        toast.success(`Text file "${file.name}" loaded successfully.`);
      } catch (err) {
        console.error(err);
        toast.error("Failed to read text file.");
      } finally {
        setAiParsing(false);
      }
    }
    
    if (aiFileRef.current) aiFileRef.current.value = "";
  };

  // AI: handle analyze
  const handleAiAnalyze = async () => {
    if (!activeSlug) {
      toast.error("Select or create a package first.");
      return;
    }

    setAiParsing(true);
    setAiApplied(false);

    try {
      let resultData: any = null;
      const isPdf = aiFile && (aiFile.type === "application/pdf" || aiFile.name.toLowerCase().endsWith(".pdf"));
      const token = (typeof window !== "undefined" ? localStorage.getItem("skynow_admin_token") : "") || "";
      const textToAnalyze = aiPastedText.trim();

      try {
        if (isPdf) {
          // Send PDF as base64 directly to Gemini server-side function
          const base64 = await fileToBase64(aiFile);
          resultData = await callGeminiServer({ data: { base64Pdf: base64, token } });
        } else {
          // Analyze pasted / extracted text on the server
          if (!textToAnalyze) {
            throw new Error("No text to analyze. Paste text or upload a file first.");
          }
          resultData = await callGeminiServer({ data: { text: textToAnalyze, token } });
        }
        
        // Apply the result data to local state
        applyGeminiResult(resultData);
        toast.success("✅ Package details auto-filled! Review the fields below and click Save Changes.");
      } catch (serverErr: any) {
        console.warn("Backend Gemini parsing failed, using high-accuracy local fallback parser:", serverErr);
        if (textToAnalyze) {
          const localParsed = parsePackageText(textToAnalyze);
          // Merge local parsed dest and details fields to match expected flat res schema
          const mergedResult = { ...localParsed.dest, ...localParsed.details };
          applyGeminiResult(mergedResult);
          toast.success("⚠️ Backend API unavailable. Local parser used to auto-fill details.");
        } else {
          throw serverErr;
        }
      }
    } catch (err: any) {
      console.error("Gemini analysis error:", err);
      toast.error(err.message || "Analysis failed. Make sure text is pasted or a document is uploaded.");
    } finally {
      setAiParsing(false);
    }
  };

  // AI: convert to PDF print view
  const handleConvertToPdf = () => {
    if (!activeSlug || !activeDest) { toast.error("Select a package first."); return; }
    const win = window.open("", "_blank");
    if (!win) return;
    const d = activeDetails;
    win.document.write(`<html><head><title>${activeDest.name}</title>
      <style>body{font-family:sans-serif;padding:40px;color:#111} h1{font-size:24px} h2{font-size:18px;margin-top:24px;border-bottom:1px solid #ccc;padding-bottom:4px} p,li{font-size:14px;line-height:1.6} ul{margin:8px 0;padding-left:20px}</style>
      </head><body>
      <h1>${activeDest.name}</h1>
      <p><strong>Country:</strong> ${activeDest.country || '—'} | <strong>Duration:</strong> ${activeDest.duration || '—'} | <strong>Price:</strong> ${activeDest.price || '—'} | <strong>Rating:</strong> ${activeDest.rating}/5</p>
      <h2>Overview</h2><p>${d?.overview || '—'}</p>
      <h2>Highlights</h2><ul>${(d?.highlights||[]).map((h: string)=>`<li>${h}</li>`).join('')}</ul>
      <h2>Itinerary</h2>${(d?.itinerary||[]).map((i: any)=>`<p><strong>${i.day}: ${i.title}</strong><br/>${i.desc}</p>`).join('')}
      <h2>Inclusions</h2><ul>${(d?.inclusions||[]).map((i: string)=>`<li>✓ ${i}</li>`).join('')}</ul>
      <h2>Exclusions</h2><ul>${(d?.exclusions||[]).map((i: string)=>`<li>✗ ${i}</li>`).join('')}</ul>
      <h2>Hotels</h2><ul>${(d?.hotels||[]).map((h: any)=>`<li>${h.name} (${h.stars}★) — ${h.location}</li>`).join('')}</ul>
      <h2>Visa Info</h2><p>${d?.visaInfo || '—'}</p>
      <h2>Best Time to Visit</h2><p>${d?.bestTime || '—'}</p>
      </body></html>`);
    win.document.close();
    setTimeout(() => win.print(), 300);
  };

  const handleCreatePackage = () => {
    const defaultName = `Draft Package #${Date.now().toString().slice(-4)}`;
    const defaultSlug = getSlug(defaultName);
    const newDest = { name: defaultName, country: "", tag: "International" as const, image: "", blurb: "", duration: "", price: "", rating: 5.0 };
    const newDests = [newDest, ...(Array.isArray(destinations) ? destinations : [])];
    const newDb = { ...db, [defaultSlug]: emptyDetails };
    setDestinations(newDests); setDb(newDb);
    setActiveSlug(defaultSlug);
    toast.success(`Package "${defaultName}" created in draft! Click Save Changes to save.`);
  };

  const handleDeletePackage = (slug: string) => {
    const newDests = (Array.isArray(destinations) ? destinations : []).filter((d: any) => getSlug(d.name) !== slug);
    const newDb = { ...db }; delete newDb[slug];
    setDestinations(newDests); setDb(newDb);
    if (activeSlug === slug) setActiveSlug(null);
    setConfirmDelete(null);
    toast.info("Package deleted from draft. Click Save Changes to save.");
  };

  const handleUpdateDestItem = (slug: string, fields: any) => {
    const newDests = (Array.isArray(destinations) ? destinations : []).map((d: any) => {
      if (getSlug(d.name) === slug) {
        const updated = { ...d, ...fields };
        if (fields.name && fields.name !== d.name) {
          const nextSlug = getSlug(fields.name);
          const oldDetails = db[slug] || emptyDetails;
          db[nextSlug] = oldDetails; delete db[slug];
          setActiveSlug(nextSlug);
        }
        return updated;
      }
      return d;
    });
    setDestinations(newDests); setDb({ ...db });
  };

  const handleUpdateDetails = (slug: string, details: any) => {
    const targetDest = (Array.isArray(destinations) ? destinations : []).find((d: any) => getSlug(d.name) === slug);
    const baseDetails = db[slug] || (targetDest ? generateFallbackDetails(targetDest) : emptyDetails);
    const updatedDetails = { ...baseDetails, ...details };
    const newDb = { ...db, [slug]: updatedDetails };
    setDb(newDb);
  };

  const handleSaveAllChanges = () => {
    appData.updateDestinations(destinations);
    appData.updateDestinationDetails(db);
    toast.success("All package changes saved!");
  };

  const safeDests = Array.isArray(destinations) ? destinations : [];
  const activeDest = safeDests.find((d: any) => getSlug(d.name) === activeSlug);
  const activeDetails = activeSlug ? db[activeSlug] || (activeDest ? generateFallbackDetails(activeDest) : emptyDetails) : null;
  const tags = ["All", "International", "Beach", "Adventure", "Luxury", "Family", "Honeymoon", "Group Tours"];
  const filtered = safeDests.filter((d: any) => {
    const matchQ = d.name.toLowerCase().includes(searchQ.toLowerCase()) || d.country.toLowerCase().includes(searchQ.toLowerCase());
    const matchTag = filterTag === "All" || d.tag === filterTag;
    return matchQ && matchTag;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Packages & Destinations</h2>
          <p className="text-sm text-slate-500 mt-1">Manage tour packages, itineraries, pricing, and destination galleries.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleSaveAllChanges} className={S.btnSuccess}><Save className="h-4 w-4" /> Save Changes</button>
          <button onClick={handleCreatePackage} className={S.btnPrimary}><Plus className="h-4 w-4" /> New Package</button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-12">
        {/* LEFT: Package List */}
        <div className="xl:col-span-4">
          <div className={S.card}>
            <div className={S.cardHeader}>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-800">All Packages ({filtered.length})</h3>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input type="text" value={searchQ} onChange={(e) => setSearchQ(e.target.value)} placeholder="Search packages..." className={S.input + " pl-9"} />
              </div>
              {/* Filter */}
              <select value={filterTag} onChange={(e) => setFilterTag(e.target.value)} className={S.select}>
                {tags.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              {/* List */}
              <div className="space-y-1.5 max-h-[560px] overflow-y-auto pr-1">
                {filtered.map((d: any) => {
                  const slug = getSlug(d.name);
                  const active = activeSlug === slug;
                  return (
                    <div key={slug} onClick={() => setActiveSlug(slug)}
                      className={`group flex items-center gap-3 rounded-xl border p-3 cursor-pointer transition-all ${active ? "border-blue-300 bg-blue-50" : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"}`}
                    >
                      <div className="h-10 w-10 shrink-0 rounded-lg overflow-hidden bg-slate-100">
                        {d.image ? <img src={d.image} alt={d.name} className="h-full w-full object-cover" /> : <MapPin className="h-5 w-5 m-2.5 text-slate-400" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-semibold truncate ${active ? "text-blue-700" : "text-slate-800"}`}>{d.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] text-slate-500 truncate">{d.country || "—"}</span>
                          <span className={`${S.badge} bg-slate-100 text-slate-500 text-[10px]`}>{d.tag}</span>
                        </div>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); setConfirmDelete({ slug, name: d.name }); }}
                        className="shrink-0 rounded-lg p-1.5 text-slate-300 hover:bg-red-50 hover:text-red-500 opacity-0 group-hover:opacity-100 transition">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  );
                })}
                {filtered.length === 0 && (
                  <div className="py-10 text-center text-sm text-slate-400">No packages match your search.</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Edit Form */}
        <div className="xl:col-span-8">
          {activeSlug && activeDest && activeDetails ? (
            <div className="space-y-5">

              {/* ── AI Package Import Card ───────────────────────────── */}
              <div className="rounded-2xl border-2 border-dashed border-rose-200 bg-rose-50/60 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-100">
                    <FileText className="h-4 w-4 text-rose-600" />
                  </span>
                  <h3 className="text-sm font-bold text-rose-700">AI-Powered Package Import</h3>
                </div>
                <p className="text-xs text-rose-600 mb-4">
                  Upload a Word document (.docx), PDF (.pdf), or Text file (.txt) containing your package details (itinerary, inclusions, price, etc.) to automatically populate this form using the Gemini API.
                </p>
                {/* File Upload */}
                <div className="mb-3">
                  <input
                    ref={aiFileRef}
                    type="file"
                    accept=".txt,.pdf,.docx,.doc"
                    className="hidden"
                    onChange={handleAiFileUpload}
                    id="ai-pkg-file"
                  />
                  <label htmlFor="ai-pkg-file" className="inline-flex items-center gap-2 rounded-xl border border-rose-300 bg-white px-4 py-2.5 text-sm font-semibold text-rose-700 cursor-pointer hover:bg-rose-50 transition shadow-sm">
                    <Upload className="h-4 w-4" />
                    {aiFileName ? `📄 ${aiFileName}` : "Upload Package Document"}
                  </label>
                  {aiFileName && (
                    <span className="ml-3 text-xs text-rose-500">File loaded — click Analyze to process</span>
                  )}
                </div>

                {/* Paste text */}
                <p className="text-xs font-semibold text-slate-600 mb-1.5">Or Paste Text Directly:</p>
                <textarea
                  rows={5}
                  value={aiPastedText}
                  onChange={(e) => setAiPastedText(e.target.value)}
                  placeholder="Paste itinerary details here..."
                  className="w-full rounded-xl border border-rose-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-400/10 resize-none placeholder-slate-400 mb-3"
                />

                {/* Action buttons */}
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleAiAnalyze}
                    disabled={aiParsing || (!aiPastedText.trim() && !aiFile)}
                    className="flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-all active:scale-95 cursor-pointer"
                  >
                    {aiParsing ? (
                      <><RefreshCw className="h-4 w-4 animate-spin" /> Analyzing with Gemini...</>
                    ) : (
                      <><Layers className="h-4 w-4" /> Analyze {aiFileName ? "Uploaded Document" : "Pasted Text"}</>
                    )}
                  </button>
                  <button
                    onClick={handleConvertToPdf}
                    className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all active:scale-95 cursor-pointer"
                  >
                    <Download className="h-4 w-4" /> Convert to PDF
                  </button>
                  {aiApplied && (
                    <span className="flex items-center gap-1 text-xs text-emerald-700 font-semibold">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Fields auto-filled — review below
                    </span>
                  )}
                </div>
              </div>

              {/* Section 1: General Info */}
              <AdminSection title="1. General Information" icon={Package}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField label="Package Name" required><input type="text" value={activeDest.name} onChange={(e) => handleUpdateDestItem(activeSlug, { name: e.target.value })} className={S.input} /></FormField>
                  <FormField label="Country / Location"><input type="text" value={activeDest.country} onChange={(e) => handleUpdateDestItem(activeSlug, { country: e.target.value })} className={S.input} /></FormField>
                  <FormField label="Category Tag">
                    <select value={activeDest.tag} onChange={(e: any) => handleUpdateDestItem(activeSlug, { tag: e.target.value })} className={S.select}>
                      <option>International</option><option>Beach</option><option>Adventure</option><option>Luxury</option><option>Family</option><option>Honeymoon</option><option>Group Tours</option>
                    </select>
                  </FormField>
                  <FormField label="Price (e.g. ₹58,900)"><input type="text" value={activeDest.price} onChange={(e) => handleUpdateDestItem(activeSlug, { price: e.target.value })} className={S.input} /></FormField>
                  <FormField label="Duration (e.g. 5N / 6D)"><input type="text" value={activeDest.duration} onChange={(e) => handleUpdateDestItem(activeSlug, { duration: e.target.value })} className={S.input} /></FormField>
                  <FormField label="Rating (1.0 – 5.0)"><input type="number" step={0.1} min={1} max={5} value={activeDest.rating} onChange={(e) => handleUpdateDestItem(activeSlug, { rating: parseFloat(e.target.value) || 5 })} className={S.input} /></FormField>
                  <FormField label="Short Blurb" className="sm:col-span-2"><textarea rows={2} value={activeDest.blurb} onChange={(e) => handleUpdateDestItem(activeSlug, { blurb: e.target.value })} className={S.textarea} /></FormField>
                </div>
              </AdminSection>

              {/* Section 2: Cover Image */}
              <AdminSection title="2. Cover Image" icon={Camera}>
                <FileUploader label="Hero Cover Image" value={activeDest.image} onChange={(v) => handleUpdateDestItem(activeSlug, { image: v })} />
              </AdminSection>

              {/* Section 3: Overview & Highlights */}
              <AdminSection title="3. Overview & Highlights" icon={FileText}>
                <div className="space-y-5">
                  <FormField label="Overview Description">
                    <textarea rows={5} value={activeDetails.overview} onChange={(e) => handleUpdateDetails(activeSlug, { overview: e.target.value })} className={S.textarea} />
                  </FormField>
                  <div>
                    <label className={S.label}>Highlights List</label>
                    <div className="space-y-2">
                      {(activeDetails.highlights || []).map((h: string, idx: number) => (
                        <div key={idx} className="flex gap-2">
                          <input type="text" value={h} onChange={(e) => { const u = [...(activeDetails.highlights || [])]; u[idx] = e.target.value; handleUpdateDetails(activeSlug, { highlights: u }); }} className={S.input} placeholder={`Highlight ${idx + 1}`} />
                          <button onClick={() => { const u = (activeDetails.highlights || []).filter((_: any, i: number) => i !== idx); handleUpdateDetails(activeSlug, { highlights: u }); }} className="shrink-0 p-2 rounded-xl border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-200 transition"><X className="h-4 w-4" /></button>
                        </div>
                      ))}
                      <button onClick={() => handleUpdateDetails(activeSlug, { highlights: [...(activeDetails.highlights || []), ""] })} className={S.btnSecondary + " mt-1"}><Plus className="h-4 w-4" /> Add Highlight</button>
                    </div>
                  </div>
                </div>
              </AdminSection>

              {/* Section 4: Itinerary */}
              <AdminSection title="4. Day-by-Day Itinerary" icon={Layers}>
                <div className="space-y-3">
                  {(activeDetails.itinerary || []).map((it: any, idx: number) => (
                    <div key={idx} className="rounded-xl border border-slate-100 bg-slate-50 p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-600 uppercase">Day {idx + 1}</span>
                        <button onClick={() => { const u = (activeDetails.itinerary || []).filter((_: any, i: number) => i !== idx); handleUpdateDetails(activeSlug, { itinerary: u }); }} className="p-1 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition"><X className="h-3.5 w-3.5" /></button>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-3">
                        <FormField label="Day Label"><input type="text" value={it.day} onChange={(e) => { const u = [...(activeDetails.itinerary || [])]; u[idx].day = e.target.value; handleUpdateDetails(activeSlug, { itinerary: u }); }} className={S.input} /></FormField>
                        <FormField label="Title" className="sm:col-span-2"><input type="text" value={it.title} onChange={(e) => { const u = [...(activeDetails.itinerary || [])]; u[idx].title = e.target.value; handleUpdateDetails(activeSlug, { itinerary: u }); }} className={S.input} /></FormField>
                        <FormField label="Description" className="sm:col-span-3"><textarea rows={2} value={it.desc} onChange={(e) => { const u = [...(activeDetails.itinerary || [])]; u[idx].desc = e.target.value; handleUpdateDetails(activeSlug, { itinerary: u }); }} className={S.textarea} /></FormField>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => handleUpdateDetails(activeSlug, { itinerary: [...(activeDetails.itinerary || []), { day: `Day ${(activeDetails.itinerary || []).length + 1}`, title: "", desc: "" }] })} className={S.btnSecondary}><Plus className="h-4 w-4" /> Add Day</button>
                </div>
              </AdminSection>

              {/* Section 5: Inclusions & Exclusions */}
              <AdminSection title="5. Inclusions & Exclusions" icon={CheckCircle2}>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className={S.label}>✅ Inclusions</label>
                    <div className="space-y-2">
                      {(activeDetails.inclusions || []).map((inc: string, idx: number) => (
                        <div key={idx} className="flex gap-2">
                          <input type="text" value={inc} onChange={(e) => { const u = [...(activeDetails.inclusions || [])]; u[idx] = e.target.value; handleUpdateDetails(activeSlug, { inclusions: u }); }} className={S.input} placeholder="Included item" />
                          <button onClick={() => { const u = (activeDetails.inclusions || []).filter((_: any, i: number) => i !== idx); handleUpdateDetails(activeSlug, { inclusions: u }); }} className="shrink-0 p-2 rounded-xl border border-slate-200 text-slate-400 hover:text-red-500 transition"><X className="h-4 w-4" /></button>
                        </div>
                      ))}
                      <button onClick={() => handleUpdateDetails(activeSlug, { inclusions: [...(activeDetails.inclusions || []), ""] })} className={S.btnSecondary}><Plus className="h-4 w-4" /> Add</button>
                    </div>
                  </div>
                  <div>
                    <label className={S.label}>❌ Exclusions</label>
                    <div className="space-y-2">
                      {(activeDetails.exclusions || []).map((exc: string, idx: number) => (
                        <div key={idx} className="flex gap-2">
                          <input type="text" value={exc} onChange={(e) => { const u = [...(activeDetails.exclusions || [])]; u[idx] = e.target.value; handleUpdateDetails(activeSlug, { exclusions: u }); }} className={S.input} placeholder="Excluded item" />
                          <button onClick={() => { const u = (activeDetails.exclusions || []).filter((_: any, i: number) => i !== idx); handleUpdateDetails(activeSlug, { exclusions: u }); }} className="shrink-0 p-2 rounded-xl border border-slate-200 text-slate-400 hover:text-red-500 transition"><X className="h-4 w-4" /></button>
                        </div>
                      ))}
                      <button onClick={() => handleUpdateDetails(activeSlug, { exclusions: [...(activeDetails.exclusions || []), ""] })} className={S.btnSecondary}><Plus className="h-4 w-4" /> Add</button>
                    </div>
                  </div>
                </div>
              </AdminSection>

              {/* Section 6: Hotels */}
              <AdminSection title="6. Accommodation / Hotels" icon={Briefcase}>
                <div className="space-y-3">
                  {(activeDetails.hotels || []).map((hotel: any, idx: number) => (
                    <div key={idx} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-blue-600 uppercase">Hotel {idx + 1}</span>
                        <button onClick={() => { const u = (activeDetails.hotels || []).filter((_: any, i: number) => i !== idx); handleUpdateDetails(activeSlug, { hotels: u }); }} className="p-1 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition"><X className="h-3.5 w-3.5" /></button>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-3">
                        <FormField label="Hotel Name" className="sm:col-span-2"><input type="text" value={hotel.name} onChange={(e) => { const u = [...(activeDetails.hotels || [])]; u[idx].name = e.target.value; handleUpdateDetails(activeSlug, { hotels: u }); }} className={S.input} /></FormField>
                        <FormField label="Stars"><input type="number" min={1} max={5} value={hotel.stars} onChange={(e) => { const u = [...(activeDetails.hotels || [])]; u[idx].stars = parseInt(e.target.value) || 5; handleUpdateDetails(activeSlug, { hotels: u }); }} className={S.input} /></FormField>
                        <FormField label="Location" className="sm:col-span-3"><input type="text" value={hotel.location} onChange={(e) => { const u = [...(activeDetails.hotels || [])]; u[idx].location = e.target.value; handleUpdateDetails(activeSlug, { hotels: u }); }} className={S.input} /></FormField>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => handleUpdateDetails(activeSlug, { hotels: [...(activeDetails.hotels || []), { name: "", stars: 5, location: "" }] })} className={S.btnSecondary}><Plus className="h-4 w-4" /> Add Hotel</button>
                </div>
              </AdminSection>

              {/* Section 7: Travel Info */}
              <AdminSection title="7. Travel Information" icon={Globe}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField label="Transportation" className="sm:col-span-2"><textarea rows={2} value={activeDetails.transportation} onChange={(e) => handleUpdateDetails(activeSlug, { transportation: e.target.value })} className={S.textarea} /></FormField>
                  <FormField label="Visa Information" className="sm:col-span-2"><textarea rows={3} value={activeDetails.visaInfo} onChange={(e) => handleUpdateDetails(activeSlug, { visaInfo: e.target.value })} className={S.textarea} /></FormField>
                  <FormField label="Best Time to Visit" className="sm:col-span-2"><textarea rows={2} value={activeDetails.bestTime} onChange={(e) => handleUpdateDetails(activeSlug, { bestTime: e.target.value })} className={S.textarea} /></FormField>
                </div>
              </AdminSection>

              {/* Section 8: FAQs */}
              <AdminSection title="8. Package FAQs" icon={HelpCircle}>
                <div className="space-y-3">
                  {(activeDetails.faqs || []).map((faq: any, idx: number) => (
                    <div key={idx} className="rounded-xl border border-slate-100 bg-slate-50 p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-600 uppercase">FAQ {idx + 1}</span>
                        <button onClick={() => { const u = (activeDetails.faqs || []).filter((_: any, i: number) => i !== idx); handleUpdateDetails(activeSlug, { faqs: u }); }} className="p-1 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition"><X className="h-3.5 w-3.5" /></button>
                      </div>
                      <FormField label="Question"><input type="text" value={faq.q} onChange={(e) => { const u = [...(activeDetails.faqs || [])]; u[idx].q = e.target.value; handleUpdateDetails(activeSlug, { faqs: u }); }} className={S.input} /></FormField>
                      <FormField label="Answer"><textarea rows={2} value={faq.a} onChange={(e) => { const u = [...(activeDetails.faqs || [])]; u[idx].a = e.target.value; handleUpdateDetails(activeSlug, { faqs: u }); }} className={S.textarea} /></FormField>
                    </div>
                  ))}
                  <button onClick={() => handleUpdateDetails(activeSlug, { faqs: [...(activeDetails.faqs || []), { q: "", a: "" }] })} className={S.btnSecondary}><Plus className="h-4 w-4" /> Add FAQ</button>
                </div>
              </AdminSection>

              {/* Section 9: Gallery */}
              <AdminSection title="9. Destination Gallery Images" icon={ImageIcon}>
                {(() => {
                  const detailsImages = (activeDetails.images && activeDetails.images.length > 0)
                    ? activeDetails.images
                    : (generateFallbackDetails(activeDest).images || []);
                  return (
                    <>
                      {detailsImages.length > 0 && (
                        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mb-5">
                          {detailsImages.map((imgUrl: string, imgIdx: number) => (
                            <div key={imgIdx} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 group bg-slate-100">
                              <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                              <button
                                onClick={() => { 
                                  const u = detailsImages.filter((_: any, i: number) => i !== imgIdx); 
                                  handleUpdateDetails(activeSlug, { images: u }); 
                                }}
                                className="absolute top-2 right-2 p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition shadow"
                              ><X className="h-3 w-3" /></button>
                            </div>
                          ))}
                        </div>
                      )}
                      <FileUploader label="Upload / Add Gallery Image" value=""
                        onChange={(val) => {
                          if (!val) return;
                          const updated = [...detailsImages, val];
                          handleUpdateDetails(activeSlug, { images: updated });
                        }}
                      />
                    </>
                  );
                })()}
              </AdminSection>

              {/* Save footer */}
              <div className={S.card + " p-5 flex items-center justify-between gap-4"}>
                <p className="text-sm text-slate-500">Changes are saved in memory. Click "Save Changes" to persist.</p>
                <button onClick={handleSaveAllChanges} className={S.btnSuccess}><Save className="h-4 w-4" /> Save Package Changes</button>
              </div>
            </div>
          ) : (
            <div className={S.card + " flex flex-col items-center justify-center py-24 text-center"}>
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 mb-4">
                <MapPin className="h-8 w-8 text-slate-300" />
              </div>
              <p className="text-base font-semibold text-slate-400">Select a package to edit</p>
              <p className="text-sm text-slate-300 mt-1">Choose from the list or create a new package.</p>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {confirmDelete && (
          <ConfirmModal
            title={`Delete "${confirmDelete.name}"?`}
            description="This package will be permanently removed from the system."
            confirmLabel="Delete Package"
            onConfirm={() => handleDeletePackage(confirmDelete.slug)}
            onCancel={() => setConfirmDelete(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* =========================================================================
   SERVICES TAB
   ========================================================================= */
function ServicesTab({ appData }: { appData: any }) {
  const [services, setServices] = useState(appData.services);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [icon, setIcon] = useState("Globe2");
  const [features, setFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState("");
  const [color, setColor] = useState("bg-blue-500/10 text-blue-500");
  const [confirmDelete, setConfirmDelete] = useState<{ idx: number; name: string } | null>(null);

  const startEdit = (idx: number) => {
    const s = services[idx];
    setEditingIdx(idx); setTitle(s.title); setDesc(s.desc); setIcon(s.icon); setFeatures(s.features || []); setColor(s.color || "bg-blue-500/10 text-blue-500");
  };

  const handleSave = () => {
    if (editingIdx === null) return;
    const updated = [...services]; updated[editingIdx] = { icon, title, desc, features, color };
    setServices(updated); setEditingIdx(null); toast.success("Service changes updated locally! Click Save Changes to save.");
  };

  const handleSaveAllChanges = () => {
    let updated = [...services];
    if (editingIdx !== null) {
      updated[editingIdx] = { icon, title, desc, features, color };
      setServices(updated);
      setEditingIdx(null);
    }
    appData.updateServices(updated);
    toast.success("All service changes saved successfully!");
  };

  const handleCreate = () => {
    const newService = { icon: "Sparkles", title: "New Service", desc: "Description here.", features: ["Feature 1"], color: "bg-amber-500/15 text-brand" };
    const updated = [...services, newService]; setServices(updated); startEdit(updated.length - 1);
    toast.success("New service added locally! Click Save Changes to save.");
  };

  const handleDelete = (idx: number) => {
    const updated = services.filter((_: any, i: number) => i !== idx); setServices(updated);
    if (editingIdx === idx) setEditingIdx(null); setConfirmDelete(null); toast.info("Service removed locally. Click Save Changes to save.");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Services Manager</h2>
          <p className="text-sm text-slate-500 mt-1">Configure service cards, icons, and feature lists.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleSaveAllChanges} className={S.btnSuccess}><Save className="h-4 w-4" /> Save Changes</button>
          <button onClick={handleCreate} className={S.btnPrimary}><Plus className="h-4 w-4" /> Add Service</button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-12">
        {/* List */}
        <div className="xl:col-span-4">
          <div className={S.card}>
            <div className={S.cardHeader}>
              <div className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-blue-600" /><h3 className="text-sm font-bold text-slate-800">Services ({services.length})</h3></div>
            </div>
            <div className="p-3 space-y-1.5 max-h-[500px] overflow-y-auto">
              {services.map((ser: any, idx: number) => (
                <div key={idx} onClick={() => startEdit(idx)}
                  className={`group flex items-center justify-between rounded-xl border p-3 cursor-pointer transition-all ${editingIdx === idx ? "border-blue-300 bg-blue-50" : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"}`}
                >
                  <div className="min-w-0">
                    <p className={`text-sm font-semibold truncate ${editingIdx === idx ? "text-blue-700" : "text-slate-800"}`}>{ser.title}</p>
                    <p className="text-xs text-slate-400 truncate mt-0.5">{ser.desc}</p>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); setConfirmDelete({ idx, name: ser.title }); }} className="shrink-0 ml-2 p-1.5 rounded-lg text-slate-300 hover:bg-red-50 hover:text-red-500 opacity-0 group-hover:opacity-100 transition">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Editor */}
        <div className="xl:col-span-8">
          {editingIdx !== null ? (
            <AdminSection title={`Editing: ${title}`} icon={Edit2}>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Service Heading" required><input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={S.input} /></FormField>
                <FormField label="Icon">
                  <select value={icon} onChange={(e) => setIcon(e.target.value)} className={S.select}>
                    {Object.keys(IconMap).map((k) => <option key={k} value={k}>{k}</option>)}
                  </select>
                </FormField>
                <FormField label="Description" className="sm:col-span-2"><textarea rows={3} value={desc} onChange={(e) => setDesc(e.target.value)} className={S.textarea} /></FormField>
                <FormField label="Color CSS Classes" className="sm:col-span-2">
                  <input type="text" value={color} placeholder="e.g. bg-blue-500/10 text-blue-500" onChange={(e) => setColor(e.target.value)} className={S.input} />
                </FormField>
                <div className="sm:col-span-2">
                  <label className={S.label}>Feature Bullet List</label>
                  <div className="flex gap-2 mb-3">
                    <input type="text" value={newFeature} placeholder="Add bullet item" onChange={(e) => setNewFeature(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { setFeatures([...features, newFeature.trim()]); setNewFeature(""); } }} className={S.input} />
                    <button onClick={() => { if (newFeature.trim()) { setFeatures([...features, newFeature.trim()]); setNewFeature(""); } }} className={S.btnPrimary + " shrink-0"}>Add</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {features.map((f, i) => (
                      <span key={i} className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700">
                        {f} <button onClick={() => setFeatures(features.filter((_, j) => j !== i))}><X className="h-3 w-3 text-slate-400 hover:text-red-500" /></button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-5 flex gap-3 pt-4 border-t border-slate-100">
                <button onClick={handleSave} className={S.btnPrimary}><Save className="h-4 w-4" /> Save Service</button>
                <button onClick={() => setEditingIdx(null)} className={S.btnSecondary}>Cancel</button>
              </div>
            </AdminSection>
          ) : (
            <div className={S.card + " flex flex-col items-center justify-center py-24 text-center"}>
              <Briefcase className="h-12 w-12 text-slate-200 mb-3" />
              <p className="text-sm font-medium text-slate-400">Select a service to edit</p>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {confirmDelete && (
          <ConfirmModal title={`Delete "${confirmDelete.name}"?`} description="This service will be removed permanently."
            confirmLabel="Delete" onConfirm={() => handleDelete(confirmDelete.idx)} onCancel={() => setConfirmDelete(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

/* =========================================================================
   ABOUT TAB
   ========================================================================= */
function AboutTab({ appData }: { appData: any }) {
  const [heroTitle, setHeroTitle] = useState(appData.about.heroTitle);
  const [heroSubtitle, setHeroSubtitle] = useState(appData.about.heroSubtitle);
  const [heroBgImage, setHeroBgImage] = useState(appData.about.heroBgImage);
  const [storyTitle, setStoryTitle] = useState(appData.about.storyTitle);
  const [storyPara1, setStoryPara1] = useState(appData.about.storyParagraphs[0] || "");
  const [storyPara2, setStoryPara2] = useState(appData.about.storyParagraphs[1] || "");
  const [storyStat1Val, setStoryStat1Val] = useState(appData.about.storyStats[0]?.value || "10k+");
  const [storyStat1Lbl, setStoryStat1Lbl] = useState(appData.about.storyStats[0]?.label || "Delighted Guests");
  const [storyStat2Val, setStoryStat2Val] = useState(appData.about.storyStats[1]?.value || "4.9★");
  const [storyStat2Lbl, setStoryStat2Lbl] = useState(appData.about.storyStats[1]?.label || "Google Rating");
  const [timeline, setTimeline] = useState(appData.about.timeline);
  const [team, setTeam] = useState(appData.about.team);
  const [activeTimelineIdx, setActiveTimelineIdx] = useState<number | null>(null);
  const [timeYear, setTimeYear] = useState(""); const [timeTitle, setTimeTitle] = useState(""); const [timeDesc, setTimeDesc] = useState("");
  const [activeTeamIdx, setActiveTeamIdx] = useState<number | null>(null);
  const [teamName, setTeamName] = useState(""); const [teamRole, setTeamRole] = useState(""); const [teamBio, setTeamBio] = useState(""); const [teamAvatar, setTeamAvatar] = useState("");
  const [confirmDeleteTimeline, setConfirmDeleteTimeline] = useState<number | null>(null);
  const [confirmDeleteTeam, setConfirmDeleteTeam] = useState<number | null>(null);

  const handleSaveHero = () => {
    handleSaveAllChanges();
  };
  const handleSaveTimeline = () => {
    if (activeTimelineIdx === null) return;
    const updated = [...timeline]; updated[activeTimelineIdx] = { year: timeYear, title: timeTitle, desc: timeDesc };
    setTimeline(updated); setActiveTimelineIdx(null); toast.success("Milestone updated locally! Click Save Changes to save.");
  };
  const handleSaveTeam = () => {
    if (activeTeamIdx === null) return;
    const updated = [...team]; updated[activeTeamIdx] = { name: teamName, role: teamRole, bio: teamBio, avatar: teamAvatar };
    setTeam(updated); setActiveTeamIdx(null); toast.success("Team member updated locally! Click Save Changes to save.");
  };

  const handleSaveAllChanges = () => {
    let updatedTimeline = [...timeline];
    if (activeTimelineIdx !== null) {
      updatedTimeline[activeTimelineIdx] = { year: timeYear, title: timeTitle, desc: timeDesc };
      setTimeline(updatedTimeline);
      setActiveTimelineIdx(null);
    }

    let updatedTeam = [...team];
    if (activeTeamIdx !== null) {
      updatedTeam[activeTeamIdx] = { name: teamName, role: teamRole, bio: teamBio, avatar: teamAvatar };
      setTeam(updatedTeam);
      setActiveTeamIdx(null);
    }

    appData.updateAbout({
      heroTitle,
      heroSubtitle,
      heroBgImage,
      storyTitle,
      storyParagraphs: [storyPara1, storyPara2].filter(Boolean),
      storyStats: [
        { value: storyStat1Val, label: storyStat1Lbl },
        { value: storyStat2Val, label: storyStat2Lbl }
      ],
      timeline: updatedTimeline,
      team: updatedTeam
    });

    toast.success("About Us page changes saved successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">About Us Editor</h2>
          <p className="text-sm text-slate-500 mt-1">Configure company story, team, and milestone timeline.</p>
        </div>
        <button onClick={handleSaveAllChanges} className={S.btnSuccess}><Save className="h-4 w-4" /> Save Changes</button>
      </div>

      <AdminSection title="Hero & Story Section" icon={Users}>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Hero Title"><input type="text" value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} className={S.input} /></FormField>
          <FormField label="Hero Subtitle"><input type="text" value={heroSubtitle} onChange={(e) => setHeroSubtitle(e.target.value)} className={S.input} /></FormField>
          <div className="sm:col-span-2"><FileUploader label="Hero Background Image" value={heroBgImage} onChange={(v) => setHeroBgImage(v)} /></div>
          <FormField label="Story Section Title" className="sm:col-span-2"><input type="text" value={storyTitle} onChange={(e) => setStoryTitle(e.target.value)} className={S.input} /></FormField>
          <FormField label="Story Paragraph 1" className="sm:col-span-2"><textarea rows={3} value={storyPara1} onChange={(e) => setStoryPara1(e.target.value)} className={S.textarea} /></FormField>
          <FormField label="Story Paragraph 2" className="sm:col-span-2"><textarea rows={3} value={storyPara2} onChange={(e) => setStoryPara2(e.target.value)} className={S.textarea} /></FormField>
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 space-y-3">
            <p className="text-xs font-bold text-blue-600 uppercase">Story Stat 1</p>
            <FormField label="Value"><input type="text" value={storyStat1Val} onChange={(e) => setStoryStat1Val(e.target.value)} className={S.input} /></FormField>
            <FormField label="Label"><input type="text" value={storyStat1Lbl} onChange={(e) => setStoryStat1Lbl(e.target.value)} className={S.input} /></FormField>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 space-y-3">
            <p className="text-xs font-bold text-blue-600 uppercase">Story Stat 2</p>
            <FormField label="Value"><input type="text" value={storyStat2Val} onChange={(e) => setStoryStat2Val(e.target.value)} className={S.input} /></FormField>
            <FormField label="Label"><input type="text" value={storyStat2Lbl} onChange={(e) => setStoryStat2Lbl(e.target.value)} className={S.input} /></FormField>
          </div>
        </div>
        <div className="mt-5 pt-4 border-t border-slate-100">
          <button onClick={handleSaveHero} className={S.btnPrimary}><Save className="h-4 w-4" /> Save Hero & Story</button>
        </div>
      </AdminSection>

      {/* Timeline */}
      <AdminSection title="Company Milestone Timeline" icon={Activity}
        action={<button onClick={() => { const u = [...timeline, { year: "2026", title: "New Milestone", desc: "" }]; setTimeline(u); toast.success("Milestone added locally! Click Save Changes to save."); }} className={S.btnPrimary + " text-xs py-2"}><Plus className="h-3.5 w-3.5" /> Add</button>}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-4">
          {timeline.map((item: any, idx: number) => (
            <div key={idx} className={`group relative rounded-xl border p-4 cursor-pointer transition-all ${activeTimelineIdx === idx ? "border-blue-300 bg-blue-50" : "border-slate-100 hover:border-slate-200"}`}
              onClick={() => { setActiveTimelineIdx(idx); setTimeYear(item.year); setTimeTitle(item.title); setTimeDesc(item.desc); }}
            >
              <span className="text-xs font-bold text-amber-600 font-mono">{item.year}</span>
              <p className="text-sm font-semibold text-slate-800 mt-1 leading-snug">{item.title}</p>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">{item.desc}</p>
              <button onClick={(e) => { e.stopPropagation(); setConfirmDeleteTimeline(idx); }} className="absolute top-3 right-3 p-1 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
        {activeTimelineIdx !== null && (
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 space-y-4">
            <h4 className="text-xs font-bold text-blue-700 uppercase tracking-wider">Edit: {timeTitle}</h4>
            <div className="grid gap-4 sm:grid-cols-3">
              <FormField label="Year"><input type="text" value={timeYear} onChange={(e) => setTimeYear(e.target.value)} className={S.input} /></FormField>
              <FormField label="Heading" className="sm:col-span-2"><input type="text" value={timeTitle} onChange={(e) => setTimeTitle(e.target.value)} className={S.input} /></FormField>
              <FormField label="Description" className="sm:col-span-3"><textarea rows={2} value={timeDesc} onChange={(e) => setTimeDesc(e.target.value)} className={S.textarea} /></FormField>
            </div>
            <div className="flex gap-3">
              <button onClick={handleSaveTimeline} className={S.btnPrimary}><Save className="h-4 w-4" /> Save</button>
              <button onClick={() => setActiveTimelineIdx(null)} className={S.btnSecondary}>Cancel</button>
            </div>
          </div>
        )}
      </AdminSection>

      {/* Team */}
      <AdminSection title="Executive & Planning Team" icon={Users}
        action={<button onClick={() => { const u = [...team, { name: "New Executive", role: "Specialist", bio: "Bio here.", avatar: STATIC_DEFAULTS.about.team[0].avatar }]; setTeam(u); toast.success("Team member added locally! Click Save Changes to save."); }} className={S.btnPrimary + " text-xs py-2"}><Plus className="h-3.5 w-3.5" /> Add</button>}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-4">
          {team.map((member: any, idx: number) => (
            <div key={idx} className={`group relative rounded-xl border p-4 cursor-pointer transition-all ${activeTeamIdx === idx ? "border-blue-300 bg-blue-50" : "border-slate-100 hover:border-slate-200"}`}
              onClick={() => { setActiveTeamIdx(idx); setTeamName(member.name); setTeamRole(member.role); setTeamBio(member.bio); setTeamAvatar(member.avatar); }}
            >
              <div className="h-12 w-12 rounded-full overflow-hidden bg-slate-100 mb-3">
                {member.avatar && <img src={member.avatar} alt={member.name} className="h-full w-full object-cover" />}
              </div>
              <p className="text-sm font-bold text-slate-800 truncate">{member.name}</p>
              <p className="text-xs text-amber-600 font-medium truncate">{member.role}</p>
              <button onClick={(e) => { e.stopPropagation(); setConfirmDeleteTeam(idx); }} className="absolute top-3 right-3 p-1 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
        {activeTeamIdx !== null && (
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 space-y-4">
            <h4 className="text-xs font-bold text-blue-700 uppercase tracking-wider">Edit: {teamName}</h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Full Name"><input type="text" value={teamName} onChange={(e) => setTeamName(e.target.value)} className={S.input} /></FormField>
              <FormField label="Role / Title"><input type="text" value={teamRole} onChange={(e) => setTeamRole(e.target.value)} className={S.input} /></FormField>
              <div className="sm:col-span-2"><FileUploader label="Avatar Photo" value={teamAvatar} onChange={(v) => setTeamAvatar(v)} /></div>
              <FormField label="Bio Statement" className="sm:col-span-2"><textarea rows={2} value={teamBio} onChange={(e) => setTeamBio(e.target.value)} className={S.textarea} /></FormField>
            </div>
            <div className="flex gap-3">
              <button onClick={handleSaveTeam} className={S.btnPrimary}><Save className="h-4 w-4" /> Save</button>
              <button onClick={() => setActiveTeamIdx(null)} className={S.btnSecondary}>Cancel</button>
            </div>
          </div>
        )}
      </AdminSection>

      <AnimatePresence>
        {confirmDeleteTimeline !== null && (
          <ConfirmModal title="Delete milestone?" description="This timeline entry will be removed."
            confirmLabel="Delete" onConfirm={() => { const u = timeline.filter((_: any, i: number) => i !== confirmDeleteTimeline); setTimeline(u); setConfirmDeleteTimeline(null); toast.info("Milestone removed locally. Click Save Changes to save."); }}
            onCancel={() => setConfirmDeleteTimeline(null)} />
        )}
        {confirmDeleteTeam !== null && (
          <ConfirmModal title="Remove team member?" description="This person will be removed from the team."
            confirmLabel="Remove" onConfirm={() => { const u = team.filter((_: any, i: number) => i !== confirmDeleteTeam); setTeam(u); setConfirmDeleteTeam(null); toast.info("Team member removed locally. Click Save Changes to save."); }}
            onCancel={() => setConfirmDeleteTeam(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

/* =========================================================================
   GALLERY TAB
   ========================================================================= */
function GalleryTab({ appData }: { appData: any }) {
  const [gallery, setGallery] = useState(appData.galleryImages);
  const [newUrl, setNewUrl] = useState("");
  const [newCat, setNewCat] = useState<"Asia" | "Europe" | "Beach" | "Adventure" | "Luxury">("Asia");
  const [filterCat, setFilterCat] = useState("All");
  const [confirmDeleteIdx, setConfirmDeleteIdx] = useState<number | null>(null);
  const [selected, setSelected] = useState<Set<number>>(new Set());

  // Gallery page header state
  const gs = appData.gallerySection || {};
  const [pgTitle, setPgTitle] = useState(gs.title || "Gallery");
  const [pgSubtitle, setPgSubtitle] = useState(gs.subtitle || "Unfiltered frames from our travellers' journeys across five continents.");
  const [pgBgImage, setPgBgImage] = useState(gs.bgImage || "");
  const [tdTitle, setTdTitle] = useState(gs.travelDiariesTitle || "Destination Gallery & Travel Diaries");
  const [tdSubtitle, setTdSubtitle] = useState(gs.travelDiariesSubtitle || "Moments from our travellers' cameras.");

  const handleSavePageHeader = () => {
    handleSaveAllChanges();
  };

  const handleSaveAllChanges = () => {
    appData.updateGallerySection({
      title: pgTitle,
      subtitle: pgSubtitle,
      bgImage: pgBgImage,
      travelDiariesTitle: tdTitle,
      travelDiariesSubtitle: tdSubtitle,
    });
    appData.updateGallery(gallery);
    toast.success("Gallery changes saved successfully!");
  };

  const handleAdd = () => {
    if (!newUrl.trim()) return;
    const updated = [{ url: newUrl.trim(), category: newCat }, ...gallery];
    setGallery(updated); setNewUrl(""); toast.success("Image added locally! Click Save Changes to save.");
  };

  const handleDelete = (idx: number) => {
    const updated = gallery.filter((_: any, i: number) => i !== idx);
    setGallery(updated); setConfirmDeleteIdx(null); toast.info("Image removed locally. Click Save Changes to save.");
  };

  const handleBulkDelete = () => {
    const updated = gallery.filter((_: any, i: number) => !selected.has(i));
    setGallery(updated); setSelected(new Set()); toast.info(`Deleted ${selected.size} images locally. Click Save Changes to save.`);
  };

  const cats = ["All", "Asia", "Europe", "Beach", "Adventure", "Luxury"];
  const filtered = filterCat === "All" ? gallery : gallery.filter((g: any) => g.category === filterCat);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Gallery Manager</h2>
          <p className="text-sm text-slate-500 mt-1">{gallery.length} images · Add, categorize, or remove media.</p>
        </div>
        <div className="flex items-center gap-3">
          {selected.size > 0 && (
            <button onClick={handleBulkDelete} className={S.btnDanger}><Trash2 className="h-4 w-4" /> Delete Selected ({selected.size})</button>
          )}
          <button onClick={handleSaveAllChanges} className={S.btnSuccess}><Save className="h-4 w-4" /> Save Changes</button>
        </div>
      </div>

      {/* Gallery Page Header Editor */}
      <AdminSection title="Gallery Page Header" icon={ImageIcon}>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Hero Title">
            <input type="text" value={pgTitle} onChange={(e) => setPgTitle(e.target.value)} className={S.input} placeholder="e.g. Gallery" />
          </FormField>
          <FormField label="Hero Subtitle">
            <input type="text" value={pgSubtitle} onChange={(e) => setPgSubtitle(e.target.value)} className={S.input} placeholder="Subtitle shown under the title in the hero" />
          </FormField>
          <div className="sm:col-span-2">
            <FileUploader label="Hero Background Image" value={pgBgImage} onChange={(v) => setPgBgImage(v)} />
          </div>
        </div>

        <hr className="my-5 border-slate-100" />

        <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-4">Travel Diaries Section Heading</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Section Title">
            <input type="text" value={tdTitle} onChange={(e) => setTdTitle(e.target.value)} className={S.input} placeholder="e.g. Destination Gallery & Travel Diaries" />
          </FormField>
          <FormField label="Section Subtitle">
            <input type="text" value={tdSubtitle} onChange={(e) => setTdSubtitle(e.target.value)} className={S.input} placeholder="e.g. Moments from our travellers' cameras." />
          </FormField>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-100">
          <button onClick={handleSavePageHeader} className={S.btnPrimary}><Save className="h-4 w-4" /> Save Gallery Page Header</button>
        </div>
      </AdminSection>

      {/* Add new image */}
      <AdminSection title="Add New Image" icon={Camera}>
        <div className="grid gap-4 sm:grid-cols-12 items-end">
          <div className="sm:col-span-7"><FileUploader label="Image URL or Upload" value={newUrl} onChange={(v) => setNewUrl(v)} /></div>
          <div className="sm:col-span-3">
            <FormField label="Category">
              <select value={newCat} onChange={(e: any) => setNewCat(e.target.value)} className={S.select}>
                <option>Asia</option><option>Europe</option><option>Beach</option><option>Adventure</option><option>Luxury</option>
              </select>
            </FormField>
          </div>
          <div className="sm:col-span-2">
            <button onClick={handleAdd} className={S.btnPrimary + " w-full justify-center"}><Plus className="h-4 w-4" /> Add Image</button>
          </div>
        </div>
      </AdminSection>

      {/* Filter + grid */}
      <div className={S.card}>
        <div className={S.cardHeader}>
          <div className="flex items-center gap-2"><ImageIcon className="h-4 w-4 text-blue-600" /><h3 className="text-sm font-bold text-slate-800">Gallery Grid ({filtered.length})</h3></div>
          <div className="flex gap-2">
            {cats.map(c => (
              <button key={c} onClick={() => setFilterCat(c)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${filterCat === c ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className={S.cardBody}>
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center py-16 text-center"><Camera className="h-12 w-12 text-slate-200 mb-3" /><p className="text-sm text-slate-400">No images yet.</p></div>
          ) : (
            <div className="grid gap-3 grid-cols-2 sm:grid-cols-4 md:grid-cols-6">
              {filtered.map((img: any, idx: number) => {
                const realIdx = gallery.findIndex((g: any) => g === img);
                const isSelected = selected.has(realIdx);
                return (
                  <div key={idx} className={`group relative aspect-square overflow-hidden rounded-xl border-2 transition cursor-pointer ${isSelected ? "border-blue-500 shadow-md" : "border-transparent hover:border-slate-200"}`}
                    onClick={() => { const ns = new Set(selected); isSelected ? ns.delete(realIdx) : ns.add(realIdx); setSelected(ns); }}
                  >
                    <img src={img.url} alt="" className="h-full w-full object-cover transition group-hover:scale-105 duration-300" />
                    <span className="absolute top-1.5 left-1.5 rounded-md bg-black/60 px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-white">{img.category}</span>
                    {isSelected && <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center"><CheckCircle2 className="h-6 w-6 text-blue-600" /></div>}
                    <button onClick={(e) => { e.stopPropagation(); setConfirmDeleteIdx(realIdx); }} className="absolute right-1.5 top-1.5 rounded-lg bg-red-500 p-1 text-white opacity-0 group-hover:opacity-100 transition shadow">
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {confirmDeleteIdx !== null && (
          <ConfirmModal title="Delete image?" description="This image will be removed from the gallery."
            confirmLabel="Delete" onConfirm={() => handleDelete(confirmDeleteIdx!)} onCancel={() => setConfirmDeleteIdx(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

/* =========================================================================
   TESTIMONIALS TAB
   ========================================================================= */
function TestimonialsTab({ appData }: { appData: any }) {
  const [reviews, setReviews] = useState(appData.testimonials.reviews);
  const [videos, setVideos] = useState(appData.testimonials.videos);
  const [editingRevIdx, setEditingRevIdx] = useState<number | null>(null);
  const [revName, setRevName] = useState(""); const [revTrip, setRevTrip] = useState(""); const [revQuote, setRevQuote] = useState("");
  const [revAvatar, setRevAvatar] = useState(""); const [revDate, setRevDate] = useState(""); const [revRating, setRevRating] = useState(5);
  const [editingVidIdx, setEditingVidIdx] = useState<number | null>(null);
  const [vidTitle, setVidTitle] = useState(""); const [vidThumb, setVidThumb] = useState(""); const [vidSrc, setVidSrc] = useState(""); const [vidDur, setVidDur] = useState("0:05");
  const [confirmDeleteRev, setConfirmDeleteRev] = useState<number | null>(null);
  const [confirmDeleteVid, setConfirmDeleteVid] = useState<number | null>(null);

  const handleSaveReview = () => {
    if (editingRevIdx === null) return;
    const updated = [...reviews]; updated[editingRevIdx] = { name: revName, trip: revTrip, quote: revQuote, avatar: revAvatar, date: revDate, rating: revRating };
    setReviews(updated); setEditingRevIdx(null); toast.success("Review changes updated locally! Click Save Changes to save.");
  };

  const handleSaveVideo = () => {
    if (editingVidIdx === null) return;
    const updated = [...videos]; updated[editingVidIdx] = { title: vidTitle, thumbnail: vidThumb, src: vidSrc, duration: vidDur };
    setVideos(updated); setEditingVidIdx(null); toast.success("Video changes updated locally! Click Save Changes to save.");
  };

  const handleSaveAllChanges = () => {
    let updatedReviews = [...reviews];
    if (editingRevIdx !== null) {
      updatedReviews[editingRevIdx] = { name: revName, trip: revTrip, quote: revQuote, avatar: revAvatar, date: revDate, rating: revRating };
      setReviews(updatedReviews);
      setEditingRevIdx(null);
    }

    let updatedVideos = [...videos];
    if (editingVidIdx !== null) {
      updatedVideos[editingVidIdx] = { title: vidTitle, thumbnail: vidThumb, src: vidSrc, duration: vidDur };
      setVideos(updatedVideos);
      setEditingVidIdx(null);
    }

    appData.updateTestimonials({ reviews: updatedReviews, videos: updatedVideos });
    toast.success("Testimonials changes saved successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Testimonials Manager</h2>
          <p className="text-sm text-slate-500 mt-1">Manage client reviews and travel video vlogs.</p>
        </div>
        <button onClick={handleSaveAllChanges} className={S.btnSuccess}><Save className="h-4 w-4" /> Save Changes</button>
      </div>

      {/* Text Reviews */}
      <AdminSection title={`Customer Reviews (${reviews.length})`} icon={Star}
        action={<button onClick={() => { const u = [{ name: "New Client", trip: "Custom Tour", quote: "Wonderful experience.", avatar: STATIC_DEFAULTS.testimonials.reviews[0].avatar, date: "June 2026", rating: 5 }, ...reviews]; setReviews(u); toast.success("Review added locally! Click Save Changes to save."); }} className={S.btnPrimary + " text-xs py-2"}><Plus className="h-3.5 w-3.5" /> Add</button>}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-4">
          {reviews.map((rev: any, idx: number) => (
            <div key={idx} className={`group relative rounded-xl border p-4 cursor-pointer transition-all ${editingRevIdx === idx ? "border-blue-300 bg-blue-50" : "border-slate-100 hover:border-slate-200"}`}
              onClick={() => { setEditingRevIdx(idx); setRevName(rev.name); setRevTrip(rev.trip); setRevQuote(rev.quote); setRevAvatar(rev.avatar); setRevDate(rev.date || ""); setRevRating(rev.rating || 5); }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-full overflow-hidden bg-slate-100 shrink-0">
                  {rev.avatar && <img src={rev.avatar} alt={rev.name} className="h-full w-full object-cover" />}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-800 truncate">{rev.name}</p>
                  <p className="text-[10px] text-slate-500 truncate">{rev.trip}</p>
                </div>
              </div>
              <div className="flex mb-2">
                {Array.from({ length: rev.rating || 5 }).map((_, i) => <Star key={i} className="h-3 w-3 text-amber-400 fill-amber-400" />)}
              </div>
              <p className="text-xs text-slate-600 italic line-clamp-3">"{rev.quote}"</p>
              <button onClick={(e) => { e.stopPropagation(); setConfirmDeleteRev(idx); }} className="absolute top-3 right-3 p-1 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
        {editingRevIdx !== null && (
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 space-y-4">
            <h4 className="text-xs font-bold text-blue-700 uppercase tracking-wider">Edit Review: {revName}</h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Client Name"><input type="text" value={revName} onChange={(e) => setRevName(e.target.value)} className={S.input} /></FormField>
              <FormField label="Trip Name"><input type="text" value={revTrip} onChange={(e) => setRevTrip(e.target.value)} className={S.input} /></FormField>
              <FormField label="Travel Date"><input type="text" value={revDate} onChange={(e) => setRevDate(e.target.value)} className={S.input} /></FormField>
              <FormField label="Rating (1-5)"><input type="number" min={1} max={5} value={revRating} onChange={(e) => setRevRating(parseInt(e.target.value) || 5)} className={S.input} /></FormField>
              <div className="sm:col-span-2"><FileUploader label="Client Avatar" value={revAvatar} onChange={(v) => setRevAvatar(v)} /></div>
              <FormField label="Review Quote" className="sm:col-span-2"><textarea rows={3} value={revQuote} onChange={(e) => setRevQuote(e.target.value)} className={S.textarea} /></FormField>
            </div>
            <div className="flex gap-3"><button onClick={handleSaveReview} className={S.btnPrimary}><Save className="h-4 w-4" /> Save</button><button onClick={() => setEditingRevIdx(null)} className={S.btnSecondary}>Cancel</button></div>
          </div>
        )}
      </AdminSection>

      {/* Video Vlogs */}
      <AdminSection title={`Travel Video Vlogs (${videos.length})`} icon={Video}
        action={<button onClick={() => { const u = [...videos, { title: "New Vlog", thumbnail: STATIC_DEFAULTS.testimonials.videos[0].thumbnail, src: STATIC_DEFAULTS.testimonials.videos[0].src, duration: "0:05" }]; setVideos(u); toast.success("Vlog added locally! Click Save Changes to save."); }} className={S.btnPrimary + " text-xs py-2"}><Plus className="h-3.5 w-3.5" /> Add</button>}
      >
        <div className="grid gap-4 sm:grid-cols-3 mb-4">
          {videos.map((vid: any, idx: number) => (
            <div key={idx} className={`group relative rounded-xl border cursor-pointer transition-all overflow-hidden ${editingVidIdx === idx ? "border-blue-300 ring-2 ring-blue-200" : "border-slate-100 hover:border-slate-200"}`}
              onClick={() => { setEditingVidIdx(idx); setVidTitle(vid.title); setVidThumb(vid.thumbnail); setVidSrc(vid.src); setVidDur(vid.duration || "0:05"); }}
            >
              <div className="aspect-video relative overflow-hidden bg-slate-100">
                <img src={vid.thumbnail} alt={vid.title} className="h-full w-full object-cover" />
                <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-bold px-1.5 py-0.5 rounded font-mono">{vid.duration}</span>
              </div>
              <div className="p-3">
                <p className="text-xs font-bold text-slate-800 truncate">{vid.title}</p>
                <p className="text-[10px] text-slate-400 truncate mt-0.5">{vid.src}</p>
              </div>
              <button onClick={(e) => { e.stopPropagation(); setConfirmDeleteVid(idx); }} className="absolute top-2 right-2 p-1 rounded-lg bg-red-500 text-white opacity-0 group-hover:opacity-100 transition shadow">
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
        {editingVidIdx !== null && (
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 space-y-4">
            <h4 className="text-xs font-bold text-blue-700 uppercase tracking-wider">Edit Vlog: {vidTitle}</h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Title"><input type="text" value={vidTitle} onChange={(e) => setVidTitle(e.target.value)} className={S.input} /></FormField>
              <FormField label="Duration (e.g. 0:05)"><input type="text" value={vidDur} onChange={(e) => setVidDur(e.target.value)} className={S.input} /></FormField>
              <div className="sm:col-span-2"><FileUploader label="Thumbnail Image" value={vidThumb} onChange={(v) => setVidThumb(v)} /></div>
              <div className="sm:col-span-2"><FileUploader label="Video Source URL (.mp4)" value={vidSrc} onChange={(v) => setVidSrc(v)} /></div>
            </div>
            <div className="flex gap-3"><button onClick={handleSaveVideo} className={S.btnPrimary}><Save className="h-4 w-4" /> Save</button><button onClick={() => setEditingVidIdx(null)} className={S.btnSecondary}>Cancel</button></div>
          </div>
        )}
      </AdminSection>

      <AnimatePresence>
        {confirmDeleteRev !== null && (
          <ConfirmModal title="Delete review?" description="This client review will be removed."
            confirmLabel="Delete" onConfirm={() => { const u = reviews.filter((_: any, i: number) => i !== confirmDeleteRev); setReviews(u); setConfirmDeleteRev(null); toast.info("Review removed locally. Click Save Changes to save."); }}
            onCancel={() => setConfirmDeleteRev(null)} />
        )}
        {confirmDeleteVid !== null && (
          <ConfirmModal title="Delete vlog?" description="This video vlog will be removed."
            confirmLabel="Delete" onConfirm={() => { const u = videos.filter((_: any, i: number) => i !== confirmDeleteVid); setVideos(u); setConfirmDeleteVid(null); toast.info("Vlog removed locally. Click Save Changes to save."); }}
            onCancel={() => setConfirmDeleteVid(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

/* =========================================================================
   FAQ TAB
   ========================================================================= */
function FaqsTab({ appData }: { appData: any }) {
  const [faqs, setFaqs] = useState(appData.faqs);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [q, setQ] = useState(""); const [a, setA] = useState(""); const [category, setCategory] = useState<"Booking" | "Visa & Insurance" | "Customization" | "Support" | "Payments">("Booking");
  const [searchQ, setSearchQ] = useState("");
  const [confirmDeleteIdx, setConfirmDeleteIdx] = useState<number | null>(null);

  const startEdit = (idx: number) => { const item = faqs[idx]; setEditingIdx(idx); setQ(item.q); setA(item.a); setCategory(item.category || "Booking"); };

  const handleSave = () => {
    if (editingIdx === null) return;
    const updated = [...faqs]; updated[editingIdx] = { q, a, category };
    setFaqs(updated); setEditingIdx(null); toast.success("FAQ changes updated locally! Click Save Changes to save.");
  };

  const handleSaveAllChanges = () => {
    let updated = [...faqs];
    if (editingIdx !== null) {
      updated[editingIdx] = { q, a, category };
      setFaqs(updated);
      setEditingIdx(null);
    }
    appData.updateFaqs(updated);
    toast.success("All FAQ changes saved successfully!");
  };

  const handleCreate = () => {
    const updated = [{ q: "New Question?", a: "Detailed answer here.", category: "Booking" as const }, ...faqs];
    setFaqs(updated); startEdit(0); toast.success("FAQ added locally! Click Save Changes to save.");
  };

  const handleDelete = (idx: number) => {
    const updated = faqs.filter((_: any, i: number) => i !== idx); setFaqs(updated);
    if (editingIdx === idx) setEditingIdx(null); setConfirmDeleteIdx(null); toast.info("FAQ deleted locally. Click Save Changes to save.");
  };

  const catColors: Record<string, string> = {
    Booking: "bg-blue-50 text-blue-600", "Visa & Insurance": "bg-amber-50 text-amber-600",
    Customization: "bg-violet-50 text-violet-600", Support: "bg-emerald-50 text-emerald-600", Payments: "bg-rose-50 text-rose-600"
  };

  const filteredFaqs = faqs.filter((f: any) => f.q.toLowerCase().includes(searchQ.toLowerCase()) || f.a.toLowerCase().includes(searchQ.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">FAQ Manager</h2>
          <p className="text-sm text-slate-500 mt-1">{faqs.length} entries · Add, edit, or remove FAQ topics.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleSaveAllChanges} className={S.btnSuccess}><Save className="h-4 w-4" /> Save Changes</button>
          <button onClick={handleCreate} className={S.btnPrimary}><Plus className="h-4 w-4" /> Add FAQ</button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-12">
        {/* List */}
        <div className="xl:col-span-5">
          <div className={S.card}>
            <div className={S.cardHeader}>
              <div className="flex items-center gap-2"><HelpCircle className="h-4 w-4 text-blue-600" /><h3 className="text-sm font-bold text-slate-800">FAQ Topics ({filteredFaqs.length})</h3></div>
            </div>
            <div className="p-4 space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input type="text" value={searchQ} onChange={(e) => setSearchQ(e.target.value)} placeholder="Search FAQs..." className={S.input + " pl-9"} />
              </div>
              <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1">
                {filteredFaqs.map((faq: any, idx: number) => {
                  const realIdx = faqs.indexOf(faq);
                  return (
                    <div key={realIdx} onClick={() => startEdit(realIdx)}
                      className={`group flex items-start justify-between rounded-xl border p-3 cursor-pointer transition-all ${editingIdx === realIdx ? "border-blue-300 bg-blue-50" : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"}`}
                    >
                      <div className="min-w-0 flex-1 mr-2">
                        <p className={`text-xs font-semibold truncate ${editingIdx === realIdx ? "text-blue-700" : "text-slate-800"}`}>{faq.q}</p>
                        <span className={`mt-1 inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full ${catColors[faq.category] || catColors.Booking}`}>{faq.category || "Booking"}</span>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); setConfirmDeleteIdx(realIdx); }} className="shrink-0 p-1 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  );
                })}
                {filteredFaqs.length === 0 && <div className="py-8 text-center text-sm text-slate-400">No FAQs match your search.</div>}
              </div>
            </div>
          </div>
        </div>

        {/* Editor */}
        <div className="xl:col-span-7">
          {editingIdx !== null ? (
            <AdminSection title="Edit FAQ" icon={Edit2}>
              <div className="space-y-4">
                <FormField label="Question" required><input type="text" value={q} onChange={(e) => setQ(e.target.value)} className={S.input} /></FormField>
                <FormField label="Category">
                  <select value={category} onChange={(e: any) => setCategory(e.target.value)} className={S.select}>
                    <option>Booking</option><option>Visa &amp; Insurance</option><option>Customization</option><option>Support</option><option>Payments</option>
                  </select>
                </FormField>
                <FormField label="Answer" required><textarea rows={6} value={a} onChange={(e) => setA(e.target.value)} className={S.textarea} /></FormField>
              </div>
              <div className="mt-5 flex gap-3 pt-4 border-t border-slate-100">
                <button onClick={handleSave} className={S.btnPrimary}><Save className="h-4 w-4" /> Save FAQ</button>
                <button onClick={() => setEditingIdx(null)} className={S.btnSecondary}>Cancel</button>
              </div>
            </AdminSection>
          ) : (
            <div className={S.card + " flex flex-col items-center justify-center py-24 text-center"}>
              <HelpCircle className="h-12 w-12 text-slate-200 mb-3" />
              <p className="text-sm font-medium text-slate-400">Select a question to edit</p>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {confirmDeleteIdx !== null && (
          <ConfirmModal title="Delete FAQ?" description="This FAQ entry will be permanently removed."
            confirmLabel="Delete" onConfirm={() => handleDelete(confirmDeleteIdx!)} onCancel={() => setConfirmDeleteIdx(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

/* =========================================================================
   CONTACT TAB
   ========================================================================= */
function ContactTab({ appData }: { appData: any }) {
  const [address, setAddress] = useState(appData.contact.address);
  const [phone, setPhone] = useState(appData.contact.phone);
  const [whatsapp, setWhatsapp] = useState(appData.contact.whatsapp);
  const [email, setEmail] = useState(appData.contact.email);
  const [website, setWebsite] = useState(appData.contact.website);
  const [hours, setHours] = useState(appData.contact.hours);
  const [mapIframe, setMapIframe] = useState(appData.contact.mapIframe);

  const handleSave = () => {
    appData.updateContact({ address, phone, whatsapp, email, website, hours, mapIframe });
    toast.success("Contact information saved!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Contact Information</h2>
          <p className="text-sm text-slate-500 mt-1">Manage office address, phone, email, hours, and map widget.</p>
        </div>
        <button onClick={handleSave} className={S.btnSuccess}><Save className="h-4 w-4" /> Save Changes</button>
      </div>

      <AdminSection title="Office & Contact Details" icon={Phone}>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Office Address" className="sm:col-span-2"><input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className={S.input} /></FormField>
          <FormField label="Phone Number"><input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className={S.input} /></FormField>
          <FormField label="WhatsApp Link"><input type="text" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className={S.input} /></FormField>
          <FormField label="Email Address"><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={S.input} /></FormField>
          <FormField label="Website URL"><input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} className={S.input} /></FormField>
          <FormField label="Business Hours" className="sm:col-span-2"><input type="text" value={hours} onChange={(e) => setHours(e.target.value)} className={S.input} /></FormField>
          <FormField label="Google Maps Embed URL" className="sm:col-span-2">
            <input type="text" value={mapIframe} onChange={(e) => setMapIframe(e.target.value)} placeholder="Google Maps iframe src attribute" className={S.input} />
          </FormField>
        </div>
        <div className="mt-5 pt-4 border-t border-slate-100">
          <button onClick={handleSave} className={S.btnPrimary}><Save className="h-4 w-4" /> Save Contact Info</button>
        </div>
      </AdminSection>

      {mapIframe && (
        <AdminSection title="Map Preview" icon={Globe}>
          <div className="rounded-xl overflow-hidden border border-slate-100 aspect-video">
            <iframe src={mapIframe} className="w-full h-full" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </AdminSection>
      )}
    </div>
  );
}
