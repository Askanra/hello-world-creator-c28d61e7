import { useState } from "react";
import { Gift, Check, Server, Sparkles, Copy } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SERVERS } from "@/lib/demoData";
import { toast } from "sonner";

const HISTORY = [
  { code: "AXRX-PHNX-9912-MMXR", server: "Phoenix RP", tier: "Enterprise", date: "Mar 14, 2026", status: "active" },
  { code: "AXRX-NGCT-2271-LLPP", server: "Night City RP", tier: "Pro", date: "Feb 02, 2026", status: "active" },
  { code: "AXRX-NRPL-0090-XKAA", server: "North Pole RP", tier: "Trial", date: "Jan 19, 2026", status: "expired" },
  { code: "AXRX-DEMO-7711-VVQQ", server: "—", tier: "Pro", date: "Dec 04, 2025", status: "revoked" },
];

const statusColor: Record<string, string> = {
  active: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  expired: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  revoked: "bg-red-500/15 text-red-400 border-red-500/30",
};

const Redeem = () => {
  const [code, setCode] = useState("");
  const [server, setServer] = useState(SERVERS[0].id);
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.replace(/-/g, "").length < 12) {
      toast.error("Enter a valid Axyrix license key");
      return;
    }
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      setSuccess(code.toUpperCase());
      toast.success(`License redeemed for ${SERVERS.find((s) => s.id === server)?.name}`);
      setCode("");
    }, 900);
  };

  return (
    <div className="space-y-5 animate-fade-up max-w-5xl">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tighter flex items-center gap-2">
          <Gift className="h-6 w-6 text-primary" /> Redeem License
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Activate an Axyrix license key on one of your servers</p>
      </div>

      {success && (
        <div className="glass rounded-xl p-4 border border-emerald-500/30 bg-emerald-500/5 flex items-center gap-3 animate-fade-up">
          <div className="h-9 w-9 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <Check className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold">License activated</div>
            <div className="text-xs font-mono text-muted-foreground truncate">{success}</div>
          </div>
          <button onClick={() => setSuccess(null)} className="text-xs text-muted-foreground hover:text-foreground">Dismiss</button>
        </div>
      )}

      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-4">
        <form onSubmit={submit} className="glass rounded-xl p-6 space-y-4">
          <div>
            <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">License Key</label>
            <Input
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="AXRX-XXXX-XXXX-XXXX"
              className="mt-1.5 font-mono tracking-wider"
              autoFocus
            />
            <div className="text-[10px] text-muted-foreground mt-1">Format: 4 blocks of 4 characters separated by dashes</div>
          </div>

          <div>
            <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Apply to server</label>
            <div className="grid sm:grid-cols-3 gap-2 mt-1.5">
              {SERVERS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setServer(s.id)}
                  className={`text-left p-3 rounded-lg border transition ${server === s.id ? "border-primary/50 bg-primary/10" : "border-border bg-muted/20 hover:bg-muted/40"}`}
                >
                  <Server className={`h-3.5 w-3.5 ${server === s.id ? "text-primary" : "text-muted-foreground"} mb-1.5`} />
                  <div className="text-xs font-semibold truncate">{s.name}</div>
                  <div className="text-[10px] font-mono text-muted-foreground">{s.license}</div>
                </button>
              ))}
            </div>
          </div>

          <Button type="submit" variant="hero" disabled={busy} className="w-full">
            {busy ? "Activating..." : <><Sparkles className="h-4 w-4 mr-2" /> Redeem License</>}
          </Button>
        </form>

        <div className="glass rounded-xl p-6 space-y-3">
          <h3 className="font-semibold text-sm flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /> What you get</h3>
          {[
            { t: "Instant activation", d: "License binds to your server in under 5 seconds" },
            { t: "Cross-server protection", d: "Bans propagate across the Axyrix network" },
            { t: "Unlimited identifiers", d: "License, Steam, Discord, IP, HWID, XBL coverage" },
            { t: "24/7 support", d: "Priority Discord support included on Pro and above" },
          ].map((b) => (
            <div key={b.t} className="flex gap-3">
              <Check className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
              <div>
                <div className="text-sm font-medium">{b.t}</div>
                <div className="text-xs text-muted-foreground">{b.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-sm">Redemption History</h3>
          <span className="text-xs text-muted-foreground font-mono">{HISTORY.length} keys</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-muted-foreground border-b border-border/50">
                <th className="pb-2 font-mono uppercase tracking-wider text-[10px]">Code</th>
                <th className="pb-2 font-mono uppercase tracking-wider text-[10px]">Server</th>
                <th className="pb-2 font-mono uppercase tracking-wider text-[10px]">Tier</th>
                <th className="pb-2 font-mono uppercase tracking-wider text-[10px]">Date</th>
                <th className="pb-2 font-mono uppercase tracking-wider text-[10px]">Status</th>
                <th className="pb-2"></th>
              </tr>
            </thead>
            <tbody>
              {HISTORY.map((h, i) => (
                <tr key={h.code} className="border-b border-border/30 hover:bg-muted/20 animate-fade-up" style={{ animationDelay: `${i * 30}ms` }}>
                  <td className="py-3 font-mono text-cyan-400">{h.code}</td>
                  <td className="py-3">{h.server}</td>
                  <td className="py-3">{h.tier}</td>
                  <td className="py-3 text-muted-foreground">{h.date}</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${statusColor[h.status]}`}>{h.status}</span>
                  </td>
                  <td className="py-3 text-right">
                    <button onClick={() => { navigator.clipboard.writeText(h.code); toast.success("Code copied"); }} className="p-1.5 rounded hover:bg-muted/40" aria-label="Copy">
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Redeem;
