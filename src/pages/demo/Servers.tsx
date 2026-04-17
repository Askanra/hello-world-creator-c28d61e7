import { Link } from "react-router-dom";
import { SERVERS } from "@/lib/demoData";
import { Server, ChevronRight, Plus, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getDemoUser } from "@/lib/demoAuth";
import logo from "@/assets/axyrix-logo.png";
import { toast } from "sonner";

const Servers = () => {
  const nav = useNavigate();
  useEffect(() => {
    if (!getDemoUser()) nav("/login");
  }, [nav]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-xl">
        <div className="container py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={logo} alt="" className="h-8 w-8" />
            <div>
              <div className="font-display font-bold text-sm">AXYRIX</div>
              <div className="text-[10px] text-muted-foreground font-mono">CLIENT PANEL</div>
            </div>
          </Link>
          <div className="text-xs font-mono text-muted-foreground">Dashboard</div>
        </div>
      </header>

      <main className="container py-10 space-y-8 animate-fade-up">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="font-display text-4xl font-bold tracking-tighter">My Servers</h1>
            <p className="text-sm text-muted-foreground mt-1">Pick a server to manage with Axyrix Anti-Cheat</p>
          </div>
          <Button variant="hero" onClick={() => toast.info("Server provisioning opens soon")}>
            <Plus className="h-4 w-4 mr-2" /> Add Server
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVERS.map((s, i) => (
            <Link
              key={s.id}
              to={`/demo/${s.id}`}
              className="group glass rounded-2xl overflow-hidden border border-border/50 hover-lift animate-fade-up flex flex-col"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="relative h-36 overflow-hidden">
                <img src={s.banner} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                <span className={`absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-mono border ${s.status === "online" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : s.status === "maintenance" ? "bg-amber-500/20 text-amber-400 border-amber-500/30" : "bg-muted text-muted-foreground border-border"}`}>
                  {s.status.toUpperCase()}
                </span>
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-mono bg-primary/15 text-primary border border-primary/30">{s.license}</span>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-display text-xl font-bold tracking-tight">{s.name}</h3>
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground mt-1">
                      <Globe className="h-3 w-3" /> {s.ip}
                    </div>
                  </div>
                  <Server className="h-4 w-4 text-primary mt-1" />
                </div>
                <div className="flex items-center justify-between mt-4 text-xs">
                  <div>
                    <div className="text-[10px] font-mono uppercase text-muted-foreground">Players</div>
                    <div className="font-bold">{s.online}/{s.slots}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase text-muted-foreground">Region</div>
                    <div className="font-bold">{s.region}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase text-muted-foreground">Framework</div>
                    <div className="font-bold">{s.framework}</div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border/30 flex items-center justify-between text-xs text-primary font-mono">
                  <span>Open dashboard</span>
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Servers;
