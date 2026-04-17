import { ShieldCheck, Crown, Plus } from "lucide-react";
import { ADMINS } from "@/lib/demoData";
import { Button } from "@/components/ui/button";

const roleColor: Record<string, string> = {
  Owner: "text-amber-400 bg-amber-500/10 border-amber-500/30",
  "Head Admin": "text-purple-400 bg-purple-500/10 border-purple-500/30",
  Admin: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
  Moderator: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
  "Trial Mod": "text-muted-foreground bg-muted/40 border-border",
};

const Admins = () => (
  <div className="space-y-5 animate-fade-up">
    <div className="flex items-center justify-between flex-wrap gap-3">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tighter flex items-center gap-2"><ShieldCheck className="h-6 w-6 text-primary" /> Admin Team</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your staff and their permissions</p>
      </div>
      <Button variant="hero"><Plus className="h-4 w-4 mr-2" /> Add Admin</Button>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
      {ADMINS.map((a, i) => (
        <div key={a.name} className="glass rounded-xl p-5 hover-lift animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
          <div className="flex items-start justify-between mb-3">
            <div className="h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center font-bold text-primary-foreground">
              {a.name[0]}
            </div>
            {a.role === "Owner" && <Crown className="h-4 w-4 text-amber-400" />}
          </div>
          <div className="font-semibold">{a.name}</div>
          <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-mono border ${roleColor[a.role]}`}>{a.role}</span>
          <div className="text-[10px] text-muted-foreground font-mono mt-3 truncate">{a.license}</div>
          <div className="text-[10px] text-muted-foreground mt-1">Since {a.joined}</div>
        </div>
      ))}
    </div>
  </div>
);

export default Admins;
