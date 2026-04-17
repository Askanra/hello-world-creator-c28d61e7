import { useState } from "react";
import { Search, Shield, Users, Ban as BanIcon, Clock, Calendar, Hash } from "lucide-react";
import { Input } from "@/components/ui/input";

const Lookup = () => {
  const [q, setQ] = useState("");
  const [showResult, setShowResult] = useState(false);

  const search = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.length > 1) setShowResult(true);
  };

  return (
    <div className="space-y-5 animate-fade-up">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tighter flex items-center gap-2"><Search className="h-6 w-6 text-primary" /> Player Lookup</h1>
        <p className="text-sm text-muted-foreground mt-1">Search and analyze a player's reputation across all Axyrix servers</p>
      </div>

      <form onSubmit={search} className="glass rounded-xl p-6 text-center max-w-3xl mx-auto">
        <h2 className="font-display text-2xl font-bold mb-2">Search the Network</h2>
        <p className="text-sm text-muted-foreground mb-5">Enter player name, license, or any identifier</p>
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="xXShadowKillxX or license:abc123..." className="text-center" />
      </form>

      {!showResult && (
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: Shield, title: "Trust Score", desc: "Every player gets a trust score based on cross-server bans, account age, playtime, and behavior signals." },
            { icon: Users, title: "Alt Accounts", desc: "Find potential alt accounts by matching identifiers across servers. Privacy of other servers is preserved." },
            { icon: BanIcon, title: "Ban History", desc: "View the full network-wide ban history including cross-server bans for assessing player reputation." },
          ].map((c) => (
            <div key={c.title} className="glass rounded-xl p-5">
              <c.icon className="h-5 w-5 text-primary mb-3" />
              <h3 className="font-semibold mb-1">{c.title}</h3>
              <p className="text-xs text-muted-foreground">{c.desc}</p>
            </div>
          ))}
        </div>
      )}

      {showResult && (
        <div className="space-y-4 animate-fade-up">
          <div className="glass rounded-xl p-6 border border-primary/30">
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-display text-2xl font-bold">{q}</div>
                <div className="text-xs font-mono text-muted-foreground">license:demo000abcdef</div>
                <div className="flex gap-2 mt-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-red-500/15 text-red-400 border border-red-500/30">BANNED</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">LOW TRUST (11%)</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
              {[
                { icon: Clock, label: "Playtime", val: "83h 33m" },
                { icon: Calendar, label: "First Seen", val: "Apr 10, 2026" },
                { icon: Calendar, label: "Last Seen", val: "11 min ago" },
                { icon: Hash, label: "Identifiers", val: "3 active" },
              ].map((s) => (
                <div key={s.label} className="bg-muted/30 rounded-lg p-3">
                  <s.icon className="h-3.5 w-3.5 text-muted-foreground mb-1" />
                  <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{s.label}</div>
                  <div className="font-bold text-sm">{s.val}</div>
                </div>
              ))}
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between text-xs mb-1">
                <span>Trust Score</span><span className="text-red-400 font-mono">11/100</span>
              </div>
              <div className="h-2 rounded-full bg-muted/40 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-red-500 to-amber-400" style={{ width: "11%" }} />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-3">
            <div className="glass rounded-xl p-4">
              <div className="text-xs font-semibold mb-2">Alt Accounts</div>
              {["xXShadow_Alt", "ShadowKillBackup"].map((n) => (
                <div key={n} className="text-xs py-1.5 border-b border-border/30 last:border-0">{n}</div>
              ))}
            </div>
            <div className="glass rounded-xl p-4">
              <div className="text-xs font-semibold mb-2">Active Bans</div>
              <div className="text-xs py-1.5">Apr 16, 2026 — Aimbot Detected</div>
            </div>
            <div className="glass rounded-xl p-4">
              <div className="text-xs font-semibold mb-2">Identifiers</div>
              {["license:demo000abcdef", "steam:demo001abc", "fivem:100000001"].map((n) => (
                <div key={n} className="text-[10px] font-mono py-1 truncate text-muted-foreground">{n}</div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lookup;
