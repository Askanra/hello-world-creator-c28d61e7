import { Download, Package, Terminal, FileCode, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";

const PLATFORMS = [
  { id: "fivem", name: "FiveM", icon: "🎮", desc: "GTA V multiplayer mod (Cfx.re)", current: true },
  { id: "redm", name: "RedM", icon: "🤠", desc: "Red Dead Redemption 2 multiplayer", current: false },
  { id: "altv", name: "alt:V", icon: "⚡", desc: "Alternative GTA V multiplayer", current: false },
  { id: "standalone", name: "Standalone", icon: "🛡️", desc: "Generic Lua / Node SDK", current: false },
];

const RESOURCES = [
  { name: "axyrix-anticheat", version: "v1.0.5", size: "8.4 MB", desc: "Core anti-cheat resource", primary: true },
  { name: "axyrix-companion", version: "v0.9.2", size: "1.2 MB", desc: "Discord webhook bridge & log forwarder" },
  { name: "axyrix-models", version: "v3.1.0", size: "640 KB", desc: "Curated whitelist for vehicles & peds" },
  { name: "axyrix-sdk", version: "v2.0.0", size: "320 KB", desc: "Lua bindings for custom integrations" },
];

const CHANGELOG = [
  { v: "v1.0.5", date: "Apr 15, 2026", notes: ["New: Lua executor sig #6 (RedEngine v4.2)", "Fix: false positives on long-distance shots", "Perf: 22% lower client tick cost"] },
  { v: "v1.0.4", date: "Apr 02, 2026", notes: ["New: Anti-Spectate v2", "Fix: ban table sync on PostgreSQL 16"] },
  { v: "v1.0.3", date: "Mar 19, 2026", notes: ["New: HWID v3 fingerprinting", "Fix: race in entity-create handler"] },
];

const Downloads = () => {
  const [platform, setPlatform] = useState("fivem");

  const download = (name: string, version: string) => {
    toast.success(`${name} ${version} download started`);
  };

  return (
    <div className="space-y-5 animate-fade-up">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tighter flex items-center gap-2">
          <Download className="h-6 w-6 text-primary" /> Downloads
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Latest Axyrix client and server resources for your platform</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {PLATFORMS.map((p) => (
          <button
            key={p.id}
            onClick={() => setPlatform(p.id)}
            className={`text-left glass rounded-xl p-4 border transition hover-lift ${platform === p.id ? "border-primary/50 bg-primary/5" : "border-border/50"}`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{p.icon}</span>
              {p.current && <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">DETECTED</span>}
            </div>
            <div className="font-semibold text-sm">{p.name}</div>
            <div className="text-xs text-muted-foreground">{p.desc}</div>
          </button>
        ))}
      </div>

      <div className="glass rounded-2xl p-6 border border-primary/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />
        <div className="relative flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center">
              <Package className="h-7 w-7 text-primary" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Latest Release</div>
              <div className="font-display text-2xl font-bold">axyrix-anticheat <span className="text-primary">v1.0.5</span></div>
              <div className="text-xs text-muted-foreground mt-1">Released Apr 15, 2026 · 8.4 MB · {PLATFORMS.find((p) => p.id === platform)?.name}</div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => toast.info("Checksum copied")}>
              <FileCode className="h-4 w-4 mr-2" /> Verify SHA256
            </Button>
            <Button variant="hero" onClick={() => download("axyrix-anticheat", "v1.0.5")}>
              <Download className="h-4 w-4 mr-2" /> Download
            </Button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        {RESOURCES.filter((r) => !r.primary).map((r) => (
          <div key={r.name} className="glass rounded-xl p-4 hover-lift">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-sm">{r.name}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted/40 text-muted-foreground">{r.version}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">{r.desc}</div>
                <div className="text-[10px] font-mono text-muted-foreground mt-2">{r.size}</div>
              </div>
              <button onClick={() => download(r.name, r.version)} className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition" aria-label="Download">
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="glass rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Terminal className="h-4 w-4 text-primary" />
          <h3 className="font-semibold text-sm">Quick install</h3>
        </div>
        <pre className="bg-background/60 border border-border/50 rounded-lg p-4 text-xs font-mono overflow-x-auto">
{`cd resources
git clone https://github.com/axyrix/anticheat.git axyrix-anticheat
echo 'ensure axyrix-anticheat' >> ../server.cfg
echo 'set axyrix_license "AXRX-XXXX-XXXX-XXXX"' >> ../server.cfg`}
        </pre>
        <button onClick={() => { navigator.clipboard.writeText("cd resources\ngit clone https://github.com/axyrix/anticheat.git axyrix-anticheat"); toast.success("Snippet copied"); }} className="mt-2 text-xs text-primary hover:underline">
          Copy snippet
        </button>
      </div>

      <div className="glass rounded-xl p-5">
        <h3 className="font-semibold text-sm mb-4">Recent Releases</h3>
        <div className="space-y-4">
          {CHANGELOG.map((c) => (
            <div key={c.v} className="flex gap-4 pb-4 border-b border-border/30 last:border-0 last:pb-0">
              <div className="shrink-0 w-20">
                <div className="font-mono text-sm font-bold text-primary">{c.v}</div>
                <div className="text-[10px] font-mono text-muted-foreground">{c.date}</div>
              </div>
              <div className="flex-1 space-y-1">
                {c.notes.map((n) => (
                  <div key={n} className="flex items-start gap-2 text-xs">
                    <Check className="h-3 w-3 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{n}</span>
                  </div>
                ))}
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground self-center shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Downloads;
