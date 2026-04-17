import { Activity, Users, Ban, Server, TrendingUp, AlertCircle } from "lucide-react";
import { KPI, SERVER, TRAFFIC, DETECTION_BREAKDOWN, LOGS } from "@/lib/demoData";
import { Line, ResponsiveContainer, XAxis, YAxis, Tooltip, Area, AreaChart, PieChart, Pie, Cell } from "recharts";

const Overview = () => {
  const kpis = [
    { label: "Connections", value: KPI.connections24h.toLocaleString(), icon: Activity, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
    { label: "Total Players", value: KPI.totalPlayers.toLocaleString(), icon: Users, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
    { label: "Total Bans", value: KPI.totalBans.toString(), icon: Ban, color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20" },
    { label: "Online Now", value: `${SERVER.online}/${SERVER.slots}`, icon: Server, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  ];

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tighter">Server Overview</h1>
          <p className="text-sm text-muted-foreground mt-1">Live data from {SERVER.name} · Region {SERVER.region} · {SERVER.framework}</p>
        </div>
        <div className="flex gap-1.5 text-xs font-mono">
          {["Today", "7 days", "30 days"].map((p, i) => (
            <button key={p} className={`px-3 py-1.5 rounded-md ${i === 0 ? "bg-primary/15 text-primary border border-primary/30" : "text-muted-foreground hover:bg-muted/40"}`}>{p}</button>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k, i) => (
          <div key={k.label} className={`glass rounded-xl p-5 border ${k.border} hover-lift animate-fade-up`} style={{ animationDelay: `${i * 60}ms` }}>
            <div className="flex items-center justify-between mb-3">
              <div className={`h-9 w-9 rounded-lg ${k.bg} ${k.border} border flex items-center justify-center`}>
                <k.icon className={`h-4 w-4 ${k.color}`} />
              </div>
              <TrendingUp className="h-3.5 w-3.5 text-emerald-400/60" />
            </div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">{k.label}</div>
            <div className={`font-display text-3xl font-bold ${k.color}`}>{k.value}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 glass rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">Server Analytics</h3>
              <p className="text-xs text-muted-foreground">last 24h player & ban activity</p>
            </div>
            <div className="flex gap-4 text-xs">
              <div><span className="text-muted-foreground">Peak </span><span className="font-bold">{KPI.peakPlayers}</span></div>
              <div><span className="text-muted-foreground">Avg </span><span className="font-bold">{KPI.avgPlayers}</span></div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={TRAFFIC}>
              <defs>
                <linearGradient id="players" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(195 100% 55%)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="hsl(195 100% 55%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" fontSize={10} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="players" stroke="hsl(195 100% 55%)" fill="url(#players)" strokeWidth={2} />
              <Line type="monotone" dataKey="bans" stroke="hsl(0 80% 60%)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass rounded-xl p-5">
          <h3 className="font-semibold mb-1">Detections (24h)</h3>
          <p className="text-xs text-muted-foreground mb-4">Total: {DETECTION_BREAKDOWN.reduce((a, b) => a + b.value, 0)}</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={DETECTION_BREAKDOWN} dataKey="value" innerRadius={50} outerRadius={75} paddingAngle={3}>
                {DETECTION_BREAKDOWN.map((d) => <Cell key={d.name} fill={d.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {DETECTION_BREAKDOWN.slice(0, 5).map((d) => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: d.color }} /><span>{d.name}</span></div>
                <span className="font-mono font-semibold">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live feed */}
      <div className="glass rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold flex items-center gap-2"><AlertCircle className="h-4 w-4 text-primary" /> Live Event Stream</h3>
            <p className="text-xs text-muted-foreground">Real-time detections and player actions</p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> LIVE
          </div>
        </div>
        <div className="space-y-1.5 max-h-72 overflow-y-auto">
          {LOGS.slice(0, 12).map((l, i) => (
            <div key={i} className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-muted/30 text-xs animate-fade-up" style={{ animationDelay: `${i * 30}ms` }}>
              <span className="font-mono text-muted-foreground w-16">{l.time}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${l.color}`}>{l.type}</span>
              <span className="font-medium">{l.player}</span>
              <span className="text-muted-foreground truncate">{l.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;
