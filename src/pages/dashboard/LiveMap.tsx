import { Map as MapIcon, Filter } from "lucide-react";
import { PLAYERS, Player } from "@/lib/demoData";
import { useState } from "react";
import { PlayerDialog } from "@/components/dashboard/PlayerDialog";

const LiveMap = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<Player | null>(null);
  const points = PLAYERS.slice(0, 24);

  return (
    <div className="space-y-5 animate-fade-up">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tighter flex items-center gap-2"><MapIcon className="h-6 w-6 text-primary" /> Live Map</h1>
        <p className="text-sm text-muted-foreground mt-1">Real-time player positions · click any pin for details</p>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr_240px] gap-4">
        <div className="glass rounded-xl p-4 space-y-4">
          <div className="flex items-center gap-2 font-semibold text-sm"><Filter className="h-4 w-4" /> Map Controls</div>
          <div>
            <div className="text-[10px] font-mono uppercase text-muted-foreground mb-1">Map Style</div>
            <select className="w-full bg-muted/40 border border-border rounded-md px-3 py-2 text-sm">
              <option>Atlas</option><option>Satellite</option><option>Terrain</option>
            </select>
          </div>
          <label className="flex items-center justify-between text-sm cursor-pointer">
            <span>Player Heatmap</span>
            <span className="h-5 w-9 rounded-full bg-muted relative"><span className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-foreground/40" /></span>
          </label>
          <div className="space-y-2">
            <div className="text-[10px] font-mono uppercase text-muted-foreground">Filters</div>
            {["Recently joined", "Low playtime", "Potential threats", "Show admins"].map((f, i) => (
              <label key={f} className="flex items-center justify-between text-xs cursor-pointer">
                <span>{f}</span>
                <span className={`h-4 w-7 rounded-full ${i < 3 ? "bg-primary" : "bg-muted"} relative`}>
                  <span className={`absolute top-0.5 ${i < 3 ? "right-0.5" : "left-0.5"} h-3 w-3 rounded-full bg-background`} />
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="glass rounded-xl overflow-hidden relative aspect-[16/10]" style={{
          background: "radial-gradient(circle at 30% 40%, hsl(140 30% 25%) 0%, hsl(140 25% 18%) 30%, hsl(210 50% 25%) 60%, hsl(210 60% 15%) 100%)"
        }}>
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="absolute top-3 left-3 text-[10px] font-mono px-2 py-1 rounded bg-background/60 backdrop-blur">LOS SANTOS · ATLAS</div>
          {points.map((p) => (
            <button
              key={p.id}
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setSelected(p)}
              className="absolute -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              <span className={`block h-3 w-3 rounded-full ring-2 ring-background ${p.status === "threat" ? "bg-red-500" : p.status === "watch" ? "bg-amber-400" : "bg-emerald-400"} animate-pulse hover:scale-150 transition`} />
              {hovered === p.id && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-background border border-border text-xs whitespace-nowrap font-mono shadow-card z-10">{p.name}</div>
              )}
            </button>
          ))}
        </div>

        <div className="glass rounded-xl p-3">
          <div className="flex items-center justify-between mb-3 px-2">
            <span className="font-semibold text-sm">Players</span>
            <span className="text-xs font-mono text-muted-foreground">{points.length}/{PLAYERS.length}</span>
          </div>
          <div className="space-y-1 max-h-[480px] overflow-y-auto">
            {points.map((p) => (
              <button key={p.id} onClick={() => setSelected(p)} className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-muted/40 text-xs cursor-pointer text-left">
                <span className="font-mono text-muted-foreground">#{p.id}</span>
                <span className="truncate flex-1">{p.name}</span>
                <span className={`h-1.5 w-1.5 rounded-full ${p.status === "threat" ? "bg-red-500" : p.status === "watch" ? "bg-amber-400" : "bg-emerald-400"}`} />
              </button>
            ))}
          </div>
        </div>
      </div>

      <PlayerDialog player={selected} onClose={() => setSelected(null)} variant="compact" />
    </div>
  );
};

export default LiveMap;
