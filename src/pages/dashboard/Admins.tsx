import { ShieldCheck, Crown, Plus, Search, Trash2 } from "lucide-react";
import { ADMINS } from "@/lib/demoData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";

const roleColor: Record<string, string> = {
  Owner: "text-amber-400 bg-amber-500/10 border-amber-500/30",
  "Head Admin": "text-purple-400 bg-purple-500/10 border-purple-500/30",
  Admin: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
  Moderator: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
  "Trial Mod": "text-muted-foreground bg-muted/40 border-border",
};

const ROLES = ["Owner", "Head Admin", "Admin", "Moderator", "Trial Mod"];
const PERMS = ["bans", "kicks", "config", "admins"];

type Admin = (typeof ADMINS)[number];

const Admins = () => {
  const [list, setList] = useState<Admin[]>(ADMINS);
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState<Admin | null>(null);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState({ name: "", email: "", role: "Moderator", permissions: ["kicks"] as string[] });

  const filtered = list.filter((a) =>
    [a.name, a.email, a.role].some((v) => v.toLowerCase().includes(q.toLowerCase()))
  );

  const togglePerm = (perms: string[], p: string) =>
    perms.includes(p) ? perms.filter((x) => x !== p) : [...perms, p];

  const submitNew = () => {
    if (!draft.name || !draft.email) {
      toast.error("Name and email are required");
      return;
    }
    const newAdmin: Admin = {
      ...draft,
      license: `license:${Math.random().toString(36).slice(2, 8)}...${Math.random().toString(36).slice(2, 5)}`,
      joined: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
    };
    setList([...list, newAdmin]);
    setAdding(false);
    setDraft({ name: "", email: "", role: "Moderator", permissions: ["kicks"] });
    toast.success(`${newAdmin.name} added as ${newAdmin.role}`);
  };

  const saveEdit = () => {
    if (!editing) return;
    setList((l) => l.map((a) => (a.name === editing.name ? editing : a)));
    setEditing(null);
    toast.success("Admin updated");
  };

  const removeAdmin = (name: string) => {
    setList((l) => l.filter((a) => a.name !== name));
    setEditing(null);
    toast.success(`${name} removed`);
  };

  return (
    <div className="space-y-5 animate-fade-up">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tighter flex items-center gap-2"><ShieldCheck className="h-6 w-6 text-primary" /> Admin Team</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your staff and their permissions</p>
        </div>
        <Button variant="hero" onClick={() => setAdding(true)}><Plus className="h-4 w-4 mr-2" /> Add Admin</Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search admins by name, email, or role..." className="pl-9" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((a, i) => (
          <button key={a.name} onClick={() => setEditing(a)} className="text-left glass rounded-xl p-5 hover-lift animate-fade-up" style={{ animationDelay: `${i * 50}ms` }}>
            <div className="flex items-start justify-between mb-3">
              <div className="h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center font-bold text-primary-foreground">
                {a.name[0]}
              </div>
              {a.role === "Owner" && <Crown className="h-4 w-4 text-amber-400" />}
            </div>
            <div className="font-semibold">{a.name}</div>
            <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-mono border ${roleColor[a.role]}`}>{a.role}</span>
            <div className="text-[10px] text-muted-foreground mt-2">{a.email}</div>
            <div className="text-[10px] text-muted-foreground font-mono mt-2 truncate">{a.license}</div>
            <div className="text-[10px] text-muted-foreground mt-1">Since {a.joined}</div>
          </button>
        ))}
      </div>

      {/* Add admin */}
      <Dialog open={adding} onOpenChange={setAdding}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add Admin</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Field label="Name"><Input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} /></Field>
            <Field label="Email"><Input value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} /></Field>
            <Field label="Role">
              <select value={draft.role} onChange={(e) => setDraft({ ...draft, role: e.target.value })} className="w-full bg-muted/40 border border-border rounded-md px-3 py-2 text-sm">
                {ROLES.map((r) => <option key={r}>{r}</option>)}
              </select>
            </Field>
            <Field label="Permissions">
              <div className="flex flex-wrap gap-2">
                {PERMS.map((p) => (
                  <label key={p} className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-md bg-muted/40 cursor-pointer">
                    <input type="checkbox" checked={draft.permissions.includes(p)} onChange={() => setDraft({ ...draft, permissions: togglePerm(draft.permissions, p) })} />
                    {p}
                  </label>
                ))}
              </div>
            </Field>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAdding(false)}>Cancel</Button>
            <Button variant="hero" onClick={submitNew}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit admin */}
      <Dialog open={!!editing} onOpenChange={() => setEditing(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit {editing?.name}</DialogTitle></DialogHeader>
          {editing && (
            <div className="space-y-3">
              <Field label="Email"><Input value={editing.email} onChange={(e) => setEditing({ ...editing, email: e.target.value })} /></Field>
              <Field label="Role">
                <select value={editing.role} onChange={(e) => setEditing({ ...editing, role: e.target.value })} className="w-full bg-muted/40 border border-border rounded-md px-3 py-2 text-sm">
                  {ROLES.map((r) => <option key={r}>{r}</option>)}
                </select>
              </Field>
              <Field label="Permissions">
                <div className="flex flex-wrap gap-2">
                  {PERMS.map((p) => (
                    <label key={p} className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-md bg-muted/40 cursor-pointer">
                      <input type="checkbox" checked={editing.permissions.includes(p)} onChange={() => setEditing({ ...editing, permissions: togglePerm(editing.permissions, p) })} />
                      {p}
                    </label>
                  ))}
                </div>
              </Field>
              <DialogFooter className="gap-2 sm:gap-2">
                <Button variant="outline" onClick={() => removeAdmin(editing.name)} className="text-red-400 hover:text-red-400"><Trash2 className="h-4 w-4 mr-2" /> Remove</Button>
                <Button variant="hero" onClick={saveEdit}>Save</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <Label className="text-xs">{label}</Label>
    <div className="mt-1">{children}</div>
  </div>
);

export default Admins;
