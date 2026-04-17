import { Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, Map, Tv, Ban, Settings, Search, ScrollText, ShieldCheck, LogOut, Bell, Server } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { demoLogout, getDemoUser } from "@/lib/demoAuth";
import { useEffect } from "react";
import logo from "@/assets/axyrix-logo.png";
import { SERVER } from "@/lib/demoData";
import { toast } from "sonner";

const items = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Overview", end: true },
  { to: "/dashboard/players", icon: Users, label: "Players" },
  { to: "/dashboard/map", icon: Map, label: "Live Map" },
  { to: "/dashboard/multistream", icon: Tv, label: "Multi-Stream" },
  { to: "/dashboard/bans", icon: Ban, label: "Bans" },
  { to: "/dashboard/config", icon: Settings, label: "Configuration" },
  { to: "/dashboard/lookup", icon: Search, label: "Lookup" },
  { to: "/dashboard/logs", icon: ScrollText, label: "Logs" },
  { to: "/dashboard/admins", icon: ShieldCheck, label: "Admins" },
];

export const DashboardLayout = () => {
  const nav = useNavigate();
  const user = getDemoUser();

  useEffect(() => {
    if (!user) nav("/login");
  }, [user, nav]);

  const logout = () => {
    demoLogout();
    toast.success("Signed out");
    nav("/");
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border/50 bg-card/30 backdrop-blur-xl flex flex-col sticky top-0 h-screen">
        <div className="p-5 border-b border-border/50">
          <div className="flex items-center gap-2.5">
            <img src={logo} alt="" className="h-8 w-8" />
            <div>
              <div className="font-display font-bold text-sm">AXYRIX</div>
              <div className="text-[10px] text-muted-foreground font-mono">CLIENT PANEL</div>
            </div>
          </div>
        </div>

        <div className="px-3 py-4 border-b border-border/50">
          <div className="px-3 py-2.5 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-2 mb-1">
              <Server className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold">{SERVER.name}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              ONLINE · {SERVER.online}/{SERVER.slots}
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
          <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">My Server</div>
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className="flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg text-muted-foreground hover:bg-primary/5 hover:text-foreground transition-colors"
              activeClassName="!bg-primary/10 !text-primary font-medium border border-primary/20"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-border/50">
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-muted/30 mb-2">
            <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
              {user?.name?.[0]?.toUpperCase() || "D"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold truncate">{user?.name || "Demo User"}</div>
              <div className="text-[10px] text-muted-foreground truncate">{user?.email}</div>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="w-full justify-start" onClick={logout}>
            <LogOut className="h-4 w-4 mr-2" /> Sign out
          </Button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-border/50 bg-card/20 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="text-xs font-mono text-muted-foreground">Dashboard / <span className="text-foreground">{SERVER.name}</span></div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-muted/50 transition">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            </button>
            <div className="text-xs font-mono px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400">
              {SERVER.version} → {SERVER.latestVersion}
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
