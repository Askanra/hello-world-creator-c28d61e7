import { Ban as BanIcon, Download, Search, Eye, Trash2, RotateCcw, Plus, ExternalLink } from "lucide-react";
import { BANS, PLAYERS } from "@/lib/demoData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

const statusBadge: Record<string, string> = {
  permanent: "bg-red-500/15 text-red-400 border-red-500/30",
  "expires-7d": "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
  "expires-1d": "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
  expired: "bg-muted/40 text-muted-foreground border-border",
};

type Ban = (typeof BANS)[number];

const Bans = () => {
  const [list, setList] = useState<Ban[]>(BANS);
  const [q, setQ] = useState("");
  const [view, setView] = useState<Ban | null>(null);
  const [newBanOpen, setNewBanOpen] = useState(false);
  const [form, setForm] = useState({ playerId: "", identifier: "", reason: "", proof: "" });

  const filtered = list.filter((b) =>
    [b.id, b.player, b.reason].some((v) => v.toLowerCase().includes(q.toLowerCase()))
  );

  const unban = (id: string) => {
    setList((l) => l.map((b) => (b.id === id ? { ...b, status: "expired" } : b)));
    toast.success(`Unbanned ${id}`);
    setView(null);
  };
  const remove = (id: string) => {
    setList((l) => l.filter((b) => b.id !== id));
    toast.success(`Ban ${id} deleted`);
  };

  const submitBan = () => {
    const player = PLAYERS.find((p) => String(p.id) === form.playerId);
    if (!player || !form.reason) {
      toast.error("Player and reason are required");
      return;
    }
    const newBan: Ban = {
      id: `#A8X-${2242 + list.length}`,
      player: player.name,
      playerId: player.id,
      reason: form.reason,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      playtime: player.playtime,
      status: "permanent",
      proof: form.proof,
      admin: "Demo User",
    };
    setList([newBan, ...list]);
    setNewBanOpen(false);
    setForm({ playerId: "", identifier: "", reason: "", proof: "" });
    toast.success(`Ban issued for ${player.name}`);
  };

  const exportAll = () => {
    const blob = new Blob([JSON.stringify(list, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "axyrix-bans.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Bans exported");
  };

  return (
    <div className="space-y-5 animate-fade-up">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tighter flex items-center gap-2"><BanIcon className="h-6 w-6 text-red-400" /> Ban Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage player bans and review history</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportAll}><Download className="h-4 w-4 mr-2" /> Export All</Button>
          <Button variant="destructive" onClick={() => setNewBanOpen(true)}><Plus className="h-4 w-4 mr-2" /> New Ban</Button>
        </div>
      </div>

      <div className="glass rounded-xl p-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by ban ID, reason, or player..." className="pl-9" />
        </div>

        <div className="text-sm font-semibold mb-3 flex items-center justify-between">
          <span>Ban Records</span>
          <span className="text-xs text-muted-foreground font-normal">{filtered.length} bans found</span>
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
              {filtered.map((b, i) => (
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
                      <button onClick={() => setView(b)} className="p-1.5 rounded hover:bg-muted/40" aria-label="View"><Eye className="h-3.5 w-3.5" /></button>
                      {b.status !== "expired" && (
                        <button onClick={() => unban(b.id)} className="p-1.5 rounded hover:bg-emerald-500/20 text-emerald-400" aria-label="Unban"><RotateCcw className="h-3.5 w-3.5" /></button>
                      )}
                      <button onClick={() => remove(b.id)} className="p-1.5 rounded hover:bg-red-500/20 text-red-400" aria-label="Delete"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View dialog */}
      <Dialog open={!!view} onOpenChange={() => setView(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Ban {view?.id}</DialogTitle>
          </DialogHeader>
          {view && (
            <div className="space-y-3 text-sm">
              <Row k="Player" v={view.player} />
              <Row k="Reason" v={view.reason} />
              <Row k="Status" v={view.status} />
              <Row k="Date" v={view.date} />
              <Row k="Issued by" v={view.admin} />
              {view.proof && (
                <Row k="Proof" v={
                  <a href={view.proof} target="_blank" rel="noreferrer" className="text-primary hover:underline flex items-center gap-1">
                    {view.proof} <ExternalLink className="h-3 w-3" />
                  </a>
                } />
              )}
              <DialogFooter className="gap-2 sm:gap-2 pt-2">
                {view.status !== "expired" && (
                  <Button variant="outline" onClick={() => unban(view.id)}><RotateCcw className="h-4 w-4 mr-2" /> Unban</Button>
                )}
                <Button variant="destructive" onClick={() => { remove(view.id); setView(null); }}><Trash2 className="h-4 w-4 mr-2" /> Delete</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* New ban dialog */}
      <Dialog open={newBanOpen} onOpenChange={setNewBanOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Issue New Ban</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label className="text-xs">Player</Label>
              <select value={form.playerId} onChange={(e) => setForm({ ...form, playerId: e.target.value })} className="w-full bg-muted/40 border border-border rounded-md px-3 py-2 text-sm mt-1">
                <option value="">— Select a player —</option>
                {PLAYERS.map((p) => (
                  <option key={p.id} value={p.id}>#{p.id} · {p.name}</option>
                ))}
              </select>
            </div>
            <div>
              <Label className="text-xs">Override identifier (optional)</Label>
              <Input value={form.identifier} onChange={(e) => setForm({ ...form, identifier: e.target.value })} placeholder="license:... or steam:..." className="mt-1" />
            </div>
            <div>
              <Label className="text-xs">Reason *</Label>
              <Textarea value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} placeholder="Aimbot detected, snap angle 0.003ms..." className="mt-1" rows={3} />
            </div>
            <div>
              <Label className="text-xs">Proof URL (optional)</Label>
              <Input value={form.proof} onChange={(e) => setForm({ ...form, proof: e.target.value })} placeholder="https://..." className="mt-1" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewBanOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={submitBan}>Issue Ban</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const Row = ({ k, v }: { k: string; v: React.ReactNode }) => (
  <div className="grid grid-cols-[100px_1fr] gap-2 py-1.5 border-b border-border/30 last:border-0">
    <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground self-center">{k}</span>
    <span className="text-sm">{v}</span>
  </div>
);

export default Bans;
