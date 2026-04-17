import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import { LayoutDashboard, Users, Map, Tv, Ban, Settings, Search, ScrollText, ShieldCheck, LogOut, Server, ChevronDown, HelpCircle, UserCog, ChevronsUpDown, Check } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { demoLogout, getDemoUser } from "@/lib/demoAuth";
import { useEffect } from "react";
import logo from "@/assets/axyrix-logo.png";
import { SERVERS } from "@/lib/demoData";
import { useServer, useServerBase } from "@/hooks/useServer";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { NotificationsBell } from "./NotificationsBell";

export const DashboardLayout = () => {
  const nav = useNavigate();
  const loc = useLocation();
  const user = getDemoUser();
  const server = useServer();
  const base = useServerBase();

  useEffect(() => {
    if (!user) nav("/login");
  }, [user, nav]);

  const items = [
    { to: `${base}`, icon: LayoutDashboard, label: "Overview", end: true, key: "overview" },
    { to: `${base}/players`, icon: Users, label: "Players", key: "players" },
    { to: `${base}/map`, icon: Map, label: "Live Map", key: "map" },
    { to: `${base}/multistream`, icon: Tv, label: "Multi-Stream", key: "multistream" },
    { to: `${base}/bans`, icon: Ban, label: "Bans", key: "bans" },
    { to: `${base}/config`, icon: Settings, label: "Configuration", key: "config" },
    { to: `${base}/lookup`, icon: Search, label: "Lookup", key: "lookup" },
    { to: `${base}/logs`, icon: ScrollText, label: "Logs", key: "logs" },
    { to: `${base}/admins`, icon: ShieldCheck, label: "Admins", key: "admins" },
  ];

  const logout = () => {
    demoLogout();
    toast.success("Signed out");
    nav("/");
  };

  // Breadcrumb segments
  const segments = loc.pathname.replace(/^\/demo\/?/, "").split("/").filter(Boolean);
  // segments[0] = serverId, segments[1] = section
  const sectionLabel = segments[1] ? items.find((i) => i.key === segments[1])?.label : "Overview";

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="w-64 border-r border-border/50 bg-card/30 backdrop-blur-xl flex flex-col sticky top-0 h-screen">
        <div className="p-5 border-b border-border/50">
          <Link to="/demo" className="flex items-center gap-2.5">
            <img src={logo} alt="" className="h-8 w-8" />
            <div>
              <div className="font-display font-bold text-sm">AXYRIX</div>
              <div className="text-[10px] text-muted-foreground font-mono">CLIENT PANEL</div>
            </div>
          </Link>
        </div>

        {/* Server switcher */}
        <div className="px-3 py-4 border-b border-border/50">
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full px-3 py-2.5 rounded-lg bg-primary/5 border border-primary/20 hover:bg-primary/10 transition text-left">
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-2 min-w-0">
                  <Server className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span className="text-xs font-semibold truncate">{server.name}</span>
                </div>
                <ChevronsUpDown className="h-3 w-3 text-muted-foreground shrink-0" />
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-mono">
                <span className={`h-1.5 w-1.5 rounded-full ${server.status === "online" ? "bg-emerald-400 animate-pulse" : server.status === "maintenance" ? "bg-amber-400" : "bg-muted-foreground"}`} />
                {server.status.toUpperCase()} · {server.online}/{server.slots}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel className="text-[10px] font-mono uppercase tracking-wider">Switch server</DropdownMenuLabel>
              {SERVERS.map((s) => (
                <DropdownMenuItem key={s.id} onClick={() => nav(`/demo/${s.id}`)} className="cursor-pointer">
                  <Server className="h-3.5 w-3.5 mr-2" />
                  <span className="flex-1">{s.name}</span>
                  {s.id === server.id && <Check className="h-3.5 w-3.5 text-primary" />}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => nav("/demo")} className="cursor-pointer text-primary">
                View all servers
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
          <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Server</div>
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
          <div className="px-3 pt-4 pb-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Account</div>
          {[
            { to: "/demo/redeem", label: "Redeem", icon: ShieldCheck },
            { to: "/demo/downloads", label: "Downloads", icon: ScrollText },
            { to: "/demo/configs", label: "Config Library", icon: Settings },
            { to: "/demo/models", label: "Models", icon: Map },
          ].map((i) => (
            <NavLink
              key={i.to}
              to={i.to}
              className="flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg text-muted-foreground hover:bg-primary/5 hover:text-foreground transition-colors"
              activeClassName="!bg-primary/10 !text-primary font-medium border border-primary/20"
            >
              <i.icon className="h-4 w-4" />
              {i.label}
            </NavLink>
          ))}
        </nav>

        {/* User dropdown */}
        <div className="p-3 border-t border-border/50">
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition">
              <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                {user?.name?.[0]?.toUpperCase() || "D"}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="text-xs font-semibold truncate">{user?.name || "Demo User"}</div>
                <div className="text-[10px] text-muted-foreground truncate">{user?.email}</div>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="text-xs font-semibold">{user?.name || "Demo User"}</div>
                <div className="text-[10px] text-muted-foreground font-normal">{user?.email}</div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => toast.info("Help center opens soon")}>
                <HelpCircle className="h-4 w-4 mr-2" /> Get Help
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.info("Account settings opens soon")}>
                <UserCog className="h-4 w-4 mr-2" /> Account Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-red-400 focus:text-red-400">
                <LogOut className="h-4 w-4 mr-2" /> Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-border/50 bg-card/20 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="text-xs font-mono text-muted-foreground flex items-center gap-1.5">
            <Link to="/demo" className="hover:text-foreground transition">Dashboard</Link>
            <span>/</span>
            <Link to={base} className="hover:text-foreground transition">{server.name}</Link>
            {sectionLabel && segments[1] && (
              <>
                <span>/</span>
                <span className="text-foreground">{sectionLabel}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-3">
            <NotificationsBell />
            <div className="text-xs font-mono px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400">
              {server.version} → {server.latestVersion}
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
