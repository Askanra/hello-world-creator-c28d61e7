import { Tv, Wifi, Maximize2, X, Play } from "lucide-react";
import { PLAYERS, Player } from "@/lib/demoData";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const MultiStream = () => {
  const [q, setQ] = useState("");
  const [active, setActive] = useState<Player | null>(null);
  const [fullscreen, setFullscreen] = useState(false);

  const filtered = PLAYERS.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-5 animate-fade-up">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tighter flex items-center gap-2"><Tv className="h-6 w-6 text-primary" /> Multi-Stream</h1>
        <p className="text-sm text-muted-foreground mt-1">Pick a player from the list to watch their live stream</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_300px] gap-4">
        <div className="glass rounded-xl overflow-hidden">
          {active ? (
            <>
              <div className="flex items-center justify-between p-3 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-muted-foreground">#{active.id}</span>
                  <span className="font-semibold text-sm">{active.name}</span>
                  <span className="flex items-center gap-1 text-xs font-mono text-emerald-400 ml-2"><Wifi className="h-3 w-3" />{active.ping}ms</span>
                </div>
                <button onClick={() => setFullscreen(true)} className="text-xs flex items-center gap-1 px-2.5 py-1 rounded-md hover:bg-muted/40">
                  <Maximize2 className="h-3 w-3" /> Fullscreen
                </button>
              </div>
              <StreamCanvas player={active} />
            </>
          ) : (
            <div className="aspect-video flex flex-col items-center justify-center text-muted-foreground gap-2">
              <Tv className="h-10 w-10" />
              <div className="text-sm">Select a player to start streaming</div>
            </div>
          )}
        </div>

        <div className="glass rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-sm">All Players</span>
            <span className="text-xs font-mono text-muted-foreground">{filtered.length}</span>
          </div>
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search..." className="text-xs mb-3" />
          <div className="space-y-1 max-h-[500px] overflow-y-auto">
            {filtered.map((p) => (
              <button key={p.id} onClick={() => setActive(p)} className={`w-full text-left px-2 py-2 rounded text-xs hover:bg-muted/40 flex items-center justify-between group ${active?.id === p.id ? "bg-primary/10 ring-1 ring-primary/30" : ""}`}>
                <div className="min-w-0">
                  <div className="font-medium truncate">{p.name}</div>
                  <div className="text-[10px] text-muted-foreground font-mono">#{p.id} · {p.ping}ms</div>
                </div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded bg-primary/20 text-primary flex items-center gap-1 ${active?.id === p.id ? "" : "opacity-0 group-hover:opacity-100"}`}>
                  <Play className="h-2.5 w-2.5" /> Watch
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen overlay */}
      {fullscreen && active && (
        <div className="fixed inset-0 z-50 bg-black animate-fade-up">
          <button onClick={() => setFullscreen(false)} className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-background/40 hover:bg-background/60 backdrop-blur" aria-label="Close fullscreen">
            <X className="h-5 w-5" />
          </button>
          <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded bg-background/40 backdrop-blur text-sm font-semibold">
            {active.name} <span className="text-xs font-mono text-muted-foreground ml-2">#{active.id}</span>
          </div>
          <StreamCanvas player={active} fullscreen />
        </div>
      )}
    </div>
  );
};

const StreamCanvas = ({ player, fullscreen = false }: { player: Player; fullscreen?: boolean }) => (
  <div className={`${fullscreen ? "h-screen w-screen" : "aspect-video"} bg-black relative overflow-hidden`}>
    <div className="absolute inset-0 grid-bg opacity-30" />
    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm font-mono">
      <span className="animate-pulse">● LIVE STREAM · {player.name}</span>
    </div>
    <div className="absolute top-0 left-0 right-0 h-px bg-primary/50 animate-scan" />
    <div className="absolute bottom-3 left-3 text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/30 border border-red-500/50 text-red-300">REC</div>
    <div className="absolute bottom-3 right-3 text-[10px] font-mono px-2 py-0.5 rounded bg-background/60 backdrop-blur">{player.health}/100 HP</div>
    {/* Axyrix watermark */}
    <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-background/30 backdrop-blur border border-primary/30 text-[10px] font-mono uppercase tracking-widest text-primary/90">
      <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
      AXYRIX · ANTICHEAT
    </div>
  </div>
);

export default MultiStream;
