import { useState } from "react";
import { Search, Wifi, Heart, Skull, Shield, Eye, Ban as BanIcon } from "lucide-react";
import { PLAYERS } from "@/lib/demoData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Players = () => {
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<typeof PLAYERS[0] | null>(null);
  const filtered = PLAYERS.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-5 animate-fade-up">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tighter flex items-center gap-3">
            Online Players
            <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-primary/10 border border-primary/30 text-primary">{PLAYERS.length}/320</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Live roster with trust score, ping and detection state</p>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or ID..." className="pl-9" />
        </div>
        <Button variant="outline">Filters</Button>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
        {filtered.map((p, i) => {
          const Icon = p.status === "threat" ? Skull : p.status === "watch" ? Eye : Shield;
          const color = p.status === "threat" ? "text-red-400 border-red-500/30 bg-red-500/5" : p.status === "watch" ? "text-amber-400 border-amber-500/30 bg-amber-500/5" : "text-emerald-400 border-emerald-500/30 bg-emerald-500/5";
          const pingColor = p.ping < 60 ? "text-emerald-400" : p.ping < 100 ? "text-amber-400" : "text-red-400";
          return (
            <button key={p.id} onClick={() => setSelected(p)} className={`text-left glass rounded-xl p-4 border ${color.split(" ").slice(1).join(" ")} hover-lift animate-fade-up`} style={{ animationDelay: `${i * 25}ms` }}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${color.split(" ").slice(1).join(" ")} border`}>
                    <Icon className={`h-4 w-4 ${color.split(" ")[0]}`} />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-muted-foreground">#{p.id}</div>
                    <div className="font-semibold text-sm truncate max-w-[160px]">{p.name}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`flex items-center gap-1 text-xs font-mono ${pingColor}`}><Wifi className="h-3 w-3" />{p.ping}ms</div>
                  <div className="text-xs font-mono text-muted-foreground mt-0.5">{p.trust}/100</div>
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-muted-foreground flex items-center gap-1"><Heart className="h-3 w-3" /> Health</span>
                  <span>{p.health}%</span>
                </div>
                <div className="h-1 rounded-full bg-muted/40 overflow-hidden">
                  <div className={`h-full transition-all ${p.health > 70 ? "bg-emerald-400" : p.health > 30 ? "bg-amber-400" : "bg-red-400"}`} style={{ width: `${p.health}%` }} />
                </div>
              </div>
              <div className="text-[10px] text-muted-foreground mt-3 flex justify-between">
                <span>played {p.playtime}</span>
                <span>{p.joined}</span>
              </div>
            </button>
          );
        })}
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><Eye className="h-4 w-4" /> Player Details — {selected?.name}</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  ["Player ID", `#${selected.id}`],
                  ["Status", selected.status.toUpperCase()],
                  ["Playtime", selected.playtime],
                  ["Trust Score", `${selected.trust}/100`],
                ].map(([k, v]) => (
                  <div key={k} className="bg-muted/30 rounded-lg p-3">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{k}</div>
                    <div className="font-semibold">{v}</div>
                  </div>
                ))}
              </div>
              <div className="space-y-1 text-xs font-mono">
                <div className="px-3 py-2 bg-muted/30 rounded">{selected.license}</div>
                <div className="px-3 py-2 bg-muted/30 rounded">{selected.steam}</div>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Button variant="outline"><Eye className="h-4 w-4 mr-2" /> Spectate</Button>
                <Button variant="destructive"><BanIcon className="h-4 w-4 mr-2" /> Ban Player</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Players;
