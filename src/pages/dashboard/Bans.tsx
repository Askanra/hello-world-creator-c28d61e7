import { Ban as BanIcon, Download, Search, Eye, Trash2 } from "lucide-react";
import { BANS } from "@/lib/demoData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const statusBadge: Record<string, string> = {
  permanent: "bg-red-500/15 text-red-400 border-red-500/30",
  "expires-7d": "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
  "expires-1d": "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
  expired: "bg-muted/40 text-muted-foreground border-border",
};

const Bans = () => (
  <div className="space-y-5 animate-fade-up">
    <div className="flex items-center justify-between flex-wrap gap-3">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tighter flex items-center gap-2"><BanIcon className="h-6 w-6 text-red-400" /> Ban Management</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage player bans and review history</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline"><Download className="h-4 w-4 mr-2" /> Export All</Button>
        <Button variant="destructive">+ New Ban</Button>
      </div>
    </div>

    <div className="glass rounded-xl p-4">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search by ban ID, reason, or player..." className="pl-9" />
      </div>

      <div className="text-sm font-semibold mb-3 flex items-center justify-between">
        <span>Ban Records</span>
        <span className="text-xs text-muted-foreground font-normal">{BANS.length} bans found</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-left text-muted-foreground border-b border-border/50">
              <th className="pb-2 font-mono uppercase tracking-wider text-[10px]">Player</th>
              <th className="pb-2 font-mono uppercase tracking-wider text-[10px]">Ban ID</th>
              <th className="pb-2 font-mono uppercase tracking-wider text-[10px]">Reason</th>
              <th className="pb-2 font-mono uppercase tracking-wider text-[10px]">Status</th>
              <th className="pb-2 font-mono uppercase tracking-wider text-[10px]">Date</th>
              <th className="pb-2 font-mono uppercase tracking-wider text-[10px] text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {BANS.map((b, i) => (
              <tr key={b.id} className="border-b border-border/30 hover:bg-muted/20 animate-fade-up" style={{ animationDelay: `${i * 30}ms` }}>
                <td className="py-3">
                  <div className="font-semibold">{b.player}</div>
                  <div className="text-[10px] text-muted-foreground">played {b.playtime}</div>
                </td>
                <td className="py-3 font-mono text-cyan-400">{b.id}</td>
                <td className="py-3">{b.reason}</td>
                <td className="py-3"><span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${statusBadge[b.status]}`}>{b.status.replace("-", " ")}</span></td>
                <td className="py-3 text-muted-foreground">{b.date}</td>
                <td className="py-3 text-right">
                  <div className="inline-flex gap-1">
                    <button className="p-1.5 rounded hover:bg-muted/40"><Eye className="h-3.5 w-3.5" /></button>
                    <button className="p-1.5 rounded hover:bg-red-500/20 text-red-400"><Trash2 className="h-3.5 w-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default Bans;
