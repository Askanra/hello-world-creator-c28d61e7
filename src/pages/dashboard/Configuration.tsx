import { Settings, Save, RotateCcw } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const groups = [
  {
    title: "Executor Detections",
    desc: "Detect and block cheat executors and exploits",
    items: ["Executor Detection #1", "Executor Detection #2", "Executor Detection #3", "Executor Detection #4", "Executor Detection #5", "Executor Detection #6 (Not Recommended)"],
    defaults: [true, true, true, true, true, false],
  },
  {
    title: "Client Detections",
    desc: "Prevent client-side cheats and exploits",
    items: ["Anti LUA Menu", "Anti Teleport", "Anti NoClip", "Anti FreeCam", "Anti Speed Hack", "Anti No-Ragdoll", "Anti Spectate", "Anti Invisibility", "Anti Super Jump", "Anti Infinite Stamina", "Anti Model Change", "Anti Night Vision", "Anti AFK Bypass", "Anti LUA Input"],
    defaults: [true, true, true, true, true, false, true, false, true, true, true, true, true, true],
  },
  {
    title: "Health Detections",
    desc: "Block health and damage manipulation",
    items: ["Anti Health Regeneration", "Anti Health Stat Modification", "Anti Invincibility", "Anti Damage Immunity"],
    defaults: [true, true, true, true],
  },
  {
    title: "Misc Detections",
    desc: "Additional protective measures",
    items: ["Anti Resource Stop", "Anti Resource Injection", "Anti Clear Tasks", "Anti Dev Tools", "Anti Spoofer", "Anti Voice Exploits"],
    defaults: [true, true, true, true, true, true],
  },
];

const Configuration = () => {
  const [state, setState] = useState(() => groups.map((g) => [...g.defaults]));
  const toggle = (gi: number, ii: number) => {
    setState((s) => s.map((arr, i) => i === gi ? arr.map((v, j) => j === ii ? !v : v) : arr));
  };

  return (
    <div className="space-y-5 animate-fade-up">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tighter flex items-center gap-2"><Settings className="h-6 w-6 text-primary" /> Configuration</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage detection thresholds and protection modules</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><RotateCcw className="h-4 w-4 mr-2" /> Reset</Button>
          <Button variant="hero" size="sm" onClick={() => toast.success("Configuration saved")}><Save className="h-4 w-4 mr-2" /> Save Changes</Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {groups.map((g, gi) => (
          <div key={g.title} className="glass rounded-xl p-5 animate-fade-up" style={{ animationDelay: `${gi * 80}ms` }}>
            <h3 className="font-semibold text-sm">{g.title}</h3>
            <p className="text-xs text-muted-foreground mb-4">{g.desc}</p>
            <div className="space-y-1">
              {g.items.map((label, ii) => {
                const on = state[gi][ii];
                return (
                  <button key={label} onClick={() => toggle(gi, ii)} className="w-full flex items-center justify-between py-2 px-2 rounded hover:bg-muted/30 text-sm">
                    <span className={on ? "text-foreground" : "text-muted-foreground"}>{label}</span>
                    <span className={`h-5 w-9 rounded-full transition-colors relative ${on ? "bg-primary" : "bg-muted"}`}>
                      <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-background transition-all ${on ? "left-[18px]" : "left-0.5"}`} />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Configuration;
