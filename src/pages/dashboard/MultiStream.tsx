import { Tv, Wifi, Clock } from "lucide-react";
import { PLAYERS } from "@/lib/demoData";

const MultiStream = () => {
  const streams = PLAYERS.filter((p) => p.status !== "clean").slice(0, 4);

  return (
    <div className="space-y-5 animate-fade-up">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tighter flex items-center gap-2"><Tv className="h-6 w-6 text-primary" /> Multi-Stream</h1>
        <p className="text-sm text-muted-foreground mt-1">Watch multiple suspect players simultaneously</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_280px] gap-4">
        <div className="grid md:grid-cols-2 gap-3">
          {streams.map((p, i) => (
            <div key={p.id} className="glass rounded-xl overflow-hidden animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="flex items-center justify-between p-3 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-muted-foreground">#{p.id}</span>
                  <span className="font-semibold text-sm">{p.name}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                  <Wifi className="h-3 w-3" />{p.ping}ms
                </div>
              </div>
              <div className="aspect-video bg-black relative overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-30" />
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-xs font-mono">
                  <span className="animate-pulse">● LIVE STREAM</span>
                </div>
                <div className="absolute top-0 left-0 right-0 h-px bg-primary/50 animate-scan" />
                <div className="absolute bottom-2 left-2 text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/30 border border-red-500/50 text-red-300">REC</div>
                <div className="absolute bottom-2 right-2 text-[10px] font-mono px-2 py-0.5 rounded bg-background/60 backdrop-blur">{p.health}/100 HP</div>
              </div>
              <div className="px-3 py-2 flex items-center justify-between text-xs">
                <span className={`px-2 py-0.5 rounded font-mono text-[10px] ${p.status === "threat" ? "bg-red-500/20 text-red-400" : "bg-amber-500/20 text-amber-400"}`}>{p.status.toUpperCase()}</span>
                <span className="text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />{p.joined}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="glass rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-sm">All Players</span>
            <span className="text-xs font-mono text-muted-foreground">{PLAYERS.length}</span>
          </div>
          <input placeholder="Search..." className="w-full bg-muted/40 border border-border rounded-md px-3 py-2 text-xs mb-3" />
          <div className="space-y-1 max-h-[500px] overflow-y-auto">
            {PLAYERS.map((p) => (
              <button key={p.id} className="w-full text-left px-2 py-2 rounded text-xs hover:bg-muted/40 flex items-center justify-between group">
                <div>
                  <div className="font-medium truncate">{p.name}</div>
                  <div className="text-[10px] text-muted-foreground font-mono">#{p.id} · {p.ping}ms</div>
                </div>
                <span className={`opacity-0 group-hover:opacity-100 text-[10px] font-mono px-2 py-0.5 rounded bg-primary/20 text-primary`}>+ Watch</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStream;
