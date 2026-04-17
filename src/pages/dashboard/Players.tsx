import { useState, useMemo } from "react";
import { Search, Wifi, Heart, Skull, Shield, Eye, MapPin } from "lucide-react";
import { PLAYERS, Player } from "@/lib/demoData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { PlayerDialog } from "@/components/dashboard/PlayerDialog";

type Filter = "all" | "new" | "newJoin" | "threats";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "new", label: "New player (<2h playtime)" },
  { id: "newJoin", label: "Newly joined (<30m online)" },
  { id: "threats", label: "Potential threats" },
];

const PAGE_SIZES = [20, 50, 100, "All"] as const;

const Players = () => {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [pageSize, setPageSize] = useState<(typeof PAGE_SIZES)[number]>(20);
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<Player | null>(null);

  const filtered = useMemo(() => {
    let list = PLAYERS.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));
    if (filter === "new") list = list.filter((p) => p.playtimeHours < 2);
    if (filter === "newJoin") list = list.filter((p) => p.joinedMinutesAgo < 30);
    if (filter === "threats") list = list.filter((p) => p.status === "threat");
    return list;
  }, [q, filter]);

  const size = pageSize === "All" ? filtered.length : pageSize;
  const totalPages = Math.max(1, Math.ceil(filtered.length / size));
  const safePage = Math.min(page, totalPages - 1);
  const visible = filtered.slice(safePage * size, safePage * size + size);

  return (
    <div className="space-y-5 animate-fade-up">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tighter flex items-center gap-3">
            Online Players
            <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-primary/10 border border-primary/30 text-primary">{filtered.length}/320</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Live roster · hover a player to see their map position</p>
        </div>
      </div>

      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={q} onChange={(e) => { setQ(e.target.value); setPage(0); }} placeholder="Search by name or ID..." className="pl-9" />
        </div>
        <div className="flex items-center gap-1 text-xs">
          <span className="text-muted-foreground mr-1">Per page:</span>
          {PAGE_SIZES.map((s) => (
            <button key={s} onClick={() => { setPageSize(s); setPage(0); }} className={`px-2.5 py-1.5 rounded-md font-mono ${pageSize === s ? "bg-primary/15 text-primary border border-primary/30" : "text-muted-foreground hover:bg-muted/40"}`}>{s}</button>
          ))}
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {FILTERS.map((f) => (
          <button key={f.id} onClick={() => { setFilter(f.id); setPage(0); }} className={`text-xs px-3 py-1.5 rounded-full border transition ${filter === f.id ? "bg-primary/15 text-primary border-primary/30" : "bg-muted/30 text-muted-foreground border-border hover:bg-muted/50"}`}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
        {visible.map((p, i) => {
          const Icon = p.status === "threat" ? Skull : p.status === "watch" ? Eye : Shield;
          const color = p.status === "threat" ? "text-red-400 border-red-500/30 bg-red-500/5" : p.status === "watch" ? "text-amber-400 border-amber-500/30 bg-amber-500/5" : "text-emerald-400 border-emerald-500/30 bg-emerald-500/5";
          const pingColor = p.ping < 60 ? "text-emerald-400" : p.ping < 100 ? "text-amber-400" : "text-red-400";
          return (
            <HoverCard key={p.id} openDelay={200}>
              <HoverCardTrigger asChild>
                <button onClick={() => setSelected(p)} className={`text-left glass rounded-xl p-4 border ${color.split(" ").slice(1).join(" ")} hover-lift animate-fade-up w-full`} style={{ animationDelay: `${i * 20}ms` }}>
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
              </HoverCardTrigger>
              <HoverCardContent side="right" className="w-64 p-0 overflow-hidden">
                <div className="px-3 py-2 border-b border-border/50 text-xs font-semibold flex items-center gap-1.5">
                  <MapPin className="h-3 w-3 text-primary" /> Map position
                </div>
                <div className="relative h-32" style={{ background: "radial-gradient(circle at 30% 40%, hsl(140 30% 25%) 0%, hsl(140 25% 18%) 30%, hsl(210 50% 25%) 60%, hsl(210 60% 15%) 100%)" }}>
                  <div className="absolute inset-0 grid-bg opacity-40" />
                  <span className="absolute -translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-primary ring-2 ring-background animate-pulse" style={{ left: `${p.x}%`, top: `${p.y}%` }} />
                </div>
                <div className="px-3 py-2 text-[10px] font-mono text-muted-foreground">
                  X: {p.x.toFixed(0)} · Y: {p.y.toFixed(0)} · Los Santos
                </div>
              </HoverCardContent>
            </HoverCard>
          );
        })}
      </div>

      {pageSize !== "All" && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          <Button variant="outline" size="sm" disabled={safePage === 0} onClick={() => setPage(safePage - 1)}>Prev</Button>
          <span className="text-xs font-mono text-muted-foreground">Page {safePage + 1} / {totalPages}</span>
          <Button variant="outline" size="sm" disabled={safePage >= totalPages - 1} onClick={() => setPage(safePage + 1)}>Next</Button>
        </div>
      )}

      <PlayerDialog player={selected} onClose={() => setSelected(null)} variant="full" />
    </div>
  );
};

export default Players;
