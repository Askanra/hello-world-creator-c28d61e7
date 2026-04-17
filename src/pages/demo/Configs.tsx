import { Library, Search, Download, Star, Eye, Filter, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useState, useMemo } from "react";
import { toast } from "sonner";

type Config = {
  id: string;
  name: string;
  author: string;
  category: "Strict" | "Balanced" | "Roleplay" | "PvP" | "Casual";
  framework: "QBCore" | "ESX" | "QBox" | "Standalone";
  downloads: number;
  rating: number;
  updated: string;
  desc: string;
  modules: number;
  enabled: number;
};

const CONFIGS: Config[] = [
  { id: "c1", name: "Phoenix Strict v3", author: "Marcus_Chen", category: "Strict", framework: "QBCore", downloads: 12_482, rating: 4.9, updated: "2d ago", desc: "Zero-tolerance config used on Phoenix RP. All executor sigs on, anti-spectate aggressive.", modules: 28, enabled: 27 },
  { id: "c2", name: "Roleplay Friendly", author: "Sarah_K", category: "Roleplay", framework: "ESX", downloads: 8_211, rating: 4.7, updated: "5d ago", desc: "Tuned for serious RP servers — disables ragdoll/freecam checks that conflict with cinematic mods.", modules: 28, enabled: 22 },
  { id: "c3", name: "PvP Tournament", author: "ThunderDan", category: "PvP", framework: "Standalone", downloads: 5_904, rating: 4.6, updated: "1w ago", desc: "Optimized for competitive deathmatch — ultra-low aim-snap thresholds, network desync checks.", modules: 28, enabled: 25 },
  { id: "c4", name: "Balanced Default", author: "Axyrix Team", category: "Balanced", framework: "QBox", downloads: 24_771, rating: 4.8, updated: "3w ago", desc: "The recommended starting point for new servers. Safe defaults, low false-positive rate.", modules: 28, enabled: 24 },
  { id: "c5", name: "Casual Free-Roam", author: "Niklas_W", category: "Casual", framework: "ESX", downloads: 3_188, rating: 4.4, updated: "1mo ago", desc: "Relaxed config for community free-roam servers — fewer kicks, more warnings.", modules: 28, enabled: 18 },
  { id: "c6", name: "Night City Hardened", author: "RoseQuartz", category: "Strict", framework: "QBCore", downloads: 6_902, rating: 4.7, updated: "4d ago", desc: "Production config for cyberpunk-themed servers, includes custom model whitelist.", modules: 28, enabled: 26 },
  { id: "c7", name: "Tournament Grade", author: "ViperX", category: "PvP", framework: "Standalone", downloads: 2_419, rating: 4.5, updated: "2w ago", desc: "LAN-tournament approved baseline. Strict bullet timing, server-authoritative health.", modules: 28, enabled: 28 },
  { id: "c8", name: "Quick Start", author: "Axyrix Team", category: "Balanced", framework: "Standalone", downloads: 18_430, rating: 4.8, updated: "5d ago", desc: "One-click sane defaults. Great for testing Axyrix on a fresh server.", modules: 28, enabled: 20 },
];

const CATEGORIES = ["All", "Strict", "Balanced", "Roleplay", "PvP", "Casual"] as const;

const catColor: Record<string, string> = {
  Strict: "bg-red-500/15 text-red-400 border-red-500/30",
  Balanced: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
  Roleplay: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  PvP: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  Casual: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
};

const Configs = () => {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const [preview, setPreview] = useState<Config | null>(null);

  const filtered = useMemo(() => {
    return CONFIGS.filter((c) => {
      if (cat !== "All" && c.category !== cat) return false;
      if (q && !`${c.name} ${c.author} ${c.desc}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [q, cat]);

  return (
    <div className="space-y-5 animate-fade-up">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tighter flex items-center gap-2">
          <Library className="h-6 w-6 text-primary" /> Config Library
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Browse community-tuned configurations and apply them to your servers</p>
      </div>

      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search configs by name, author, or keyword..." className="pl-9" />
        </div>
        <Button variant="outline"><Filter className="h-4 w-4 mr-2" /> Filters</Button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {CATEGORIES.map((c) => (
          <button key={c} onClick={() => setCat(c)} className={`text-xs px-3 py-1.5 rounded-full border transition ${cat === c ? "bg-primary/15 text-primary border-primary/30" : "bg-muted/30 text-muted-foreground border-border hover:bg-muted/50"}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((c, i) => (
          <div key={c.id} className="glass rounded-xl p-5 hover-lift animate-fade-up flex flex-col" style={{ animationDelay: `${i * 40}ms` }}>
            <div className="flex items-start justify-between mb-2">
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${catColor[c.category]}`}>{c.category}</span>
              <div className="flex items-center gap-1 text-xs">
                <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                <span className="font-mono">{c.rating}</span>
              </div>
            </div>
            <h3 className="font-display font-bold text-lg leading-tight">{c.name}</h3>
            <div className="text-[10px] font-mono text-muted-foreground mt-0.5">by {c.author} · {c.framework}</div>
            <p className="text-xs text-muted-foreground mt-3 flex-1">{c.desc}</p>

            <div className="mt-4 pt-3 border-t border-border/30 space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-muted-foreground">Modules enabled</span>
                <span>{c.enabled}/{c.modules}</span>
              </div>
              <div className="h-1 rounded-full bg-muted/40 overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${(c.enabled / c.modules) * 100}%` }} />
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                <span>{c.downloads.toLocaleString()} downloads</span>
                <span>{c.updated}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-3">
              <Button variant="outline" size="sm" onClick={() => setPreview(c)}>
                <Eye className="h-3.5 w-3.5 mr-1.5" /> Preview
              </Button>
              <Button variant="hero" size="sm" onClick={() => toast.success(`${c.name} applied`)}>
                <Download className="h-3.5 w-3.5 mr-1.5" /> Apply
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="glass rounded-xl p-12 text-center text-muted-foreground text-sm">No configs match your search.</div>
      )}

      <Dialog open={!!preview} onOpenChange={() => setPreview(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              {preview?.name}
            </DialogTitle>
          </DialogHeader>
          {preview && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs">
                <span className={`px-2 py-0.5 rounded font-mono border ${catColor[preview.category]}`}>{preview.category}</span>
                <span className="font-mono text-muted-foreground">by {preview.author}</span>
                <span className="font-mono text-muted-foreground">· {preview.framework}</span>
              </div>
              <p className="text-sm">{preview.desc}</p>
              <pre className="bg-background/60 border border-border/50 rounded-lg p-4 text-xs font-mono overflow-x-auto max-h-72">
{`{
  "name": "${preview.name}",
  "version": "${preview.updated}",
  "modules": {
    "executors": { "enabled": [1, 2, 3, 4, 5], "disabled": [6] },
    "client":    { "antiTeleport": true, "antiNoClip": true, "antiSpectate": ${preview.category === "Strict"} },
    "health":    { "antiRegen": true, "antiInvincibility": true },
    "misc":      { "antiResStop": true, "antiSpoofer": true }
  },
  "thresholds": {
    "aimSnapMs": ${preview.category === "PvP" ? 0.002 : 0.005},
    "speedKmh":  ${preview.category === "Strict" ? 220 : 320},
    "kickAfterWarnings": ${preview.category === "Casual" ? 5 : 2}
  }
}`}
              </pre>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setPreview(null)}>Close</Button>
            <Button variant="hero" onClick={() => { toast.success(`${preview?.name} applied`); setPreview(null); }}>
              <Download className="h-4 w-4 mr-2" /> Apply to server
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Configs;
