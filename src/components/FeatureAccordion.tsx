import { useState } from "react";
import { Plus, Activity, Shield, Lock } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type FeatureItem = {
  icon: LucideIcon;
  title: string;
  desc: string;
  preview: React.ReactNode;
};

export const FeatureAccordion = ({ items }: { items: FeatureItem[] }) => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <button
            key={f.title}
            onClick={() => setOpen(isOpen ? null : i)}
            className={`text-left glass rounded-2xl p-6 transition-all duration-300 ${isOpen ? "md:col-span-2 lg:col-span-3 border-primary/40 shadow-elegant" : "hover:border-primary/30 hover:-translate-y-1"}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-11 w-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <f.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold">{f.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
              <Plus className={`h-5 w-5 text-muted-foreground transition-transform duration-300 flex-shrink-0 ${isOpen ? "rotate-45 text-primary" : ""}`} />
            </div>

            <div className={`grid transition-all duration-500 ${isOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0"}`}>
              <div className="overflow-hidden">
                <div className="pt-4 border-t border-border/50">{f.preview}</div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

// Reusable preview snippets
export const DetectionPreview = () => (
  <div className="bg-background/60 rounded-lg p-4 font-mono text-xs space-y-1.5 border border-border/50">
    {[
      { t: "12:58:01", l: "PLAYER_JOIN", n: "xXcheaterXx", c: "text-emerald-400" },
      { t: "12:58:14", l: "DETECTION", n: "Lua Executor #3 — RedEngine", c: "text-orange-400" },
      { t: "12:58:14", l: "BAN_ISSUED", n: "Reason: Aimbot · Permanent", c: "text-red-400" },
      { t: "12:58:15", l: "PLAYER_LEAVE", n: "xXcheaterXx (kicked)", c: "text-slate-400" },
    ].map((r, i) => (
      <div key={i} className="flex gap-3 animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
        <span className="text-muted-foreground">{r.t}</span>
        <span className={`${r.c} font-bold w-28`}>{r.l}</span>
        <span>{r.n}</span>
      </div>
    ))}
  </div>
);

export const PanelPreview = () => (
  <div className="bg-background/60 rounded-lg p-4 grid grid-cols-3 gap-3 border border-border/50">
    {[
      { l: "Online", v: "287", c: "text-emerald-400", i: Activity },
      { l: "Bans 24h", v: "12", c: "text-red-400", i: Shield },
      { l: "Detections", v: "67", c: "text-amber-400", i: Lock },
    ].map((s) => (
      <div key={s.l} className="bg-card/40 rounded-md p-3">
        <s.i className={`h-3.5 w-3.5 ${s.c} mb-1`} />
        <div className="text-[10px] font-mono uppercase text-muted-foreground">{s.l}</div>
        <div className={`font-bold text-xl ${s.c}`}>{s.v}</div>
      </div>
    ))}
  </div>
);

export const HwidPreview = () => (
  <div className="bg-background/60 rounded-lg p-4 font-mono text-xs space-y-2 border border-border/50">
    <div className="flex justify-between"><span className="text-muted-foreground">CPU_HASH</span><span>a7f3...c1d9</span></div>
    <div className="flex justify-between"><span className="text-muted-foreground">DISK_SERIAL</span><span>WD-WMC4N0...</span></div>
    <div className="flex justify-between"><span className="text-muted-foreground">MAC_ADDR</span><span>ee:21:bc:...</span></div>
    <div className="flex justify-between"><span className="text-muted-foreground">VPN_DETECTED</span><span className="text-red-400">TRUE</span></div>
    <div className="pt-2 border-t border-border/50 flex justify-between"><span className="text-muted-foreground">RESULT</span><span className="text-red-400 font-bold">BLOCKED — alt of #BAN-2241</span></div>
  </div>
);

export const AimbotPreview = () => (
  <div className="bg-background/60 rounded-lg p-4 border border-border/50">
    <div className="text-xs font-mono mb-2 flex justify-between"><span>Mouse delta over time</span><span className="text-red-400">SNAP DETECTED</span></div>
    <svg viewBox="0 0 300 80" className="w-full h-20">
      <polyline fill="none" stroke="hsl(195 100% 55%)" strokeWidth="1.5" points="0,40 30,42 60,38 90,41 120,40 150,8 153,68 156,12 180,40 210,41 240,40 270,39 300,40" />
      <circle cx="153" cy="40" r="4" fill="hsl(0 80% 60%)" className="animate-pulse" />
    </svg>
    <div className="text-[10px] text-muted-foreground font-mono">flick=0.003ms · angle=178° · headshot · auto-banned</div>
  </div>
);
