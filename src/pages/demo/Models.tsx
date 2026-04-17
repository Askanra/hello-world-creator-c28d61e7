import { Box, Search, Copy, CheckCircle2, Car, User, Crosshair, Package } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import { toast } from "sonner";

type Model = {
  hash: string;
  name: string;
  category: "Vehicles" | "Peds" | "Weapons" | "Props";
  subcategory: string;
  whitelisted: boolean;
};

const MODELS: Model[] = [
  // Vehicles
  { hash: "0x9F05F101", name: "adder", category: "Vehicles", subcategory: "Super", whitelisted: true },
  { hash: "0x71D85A5C", name: "zentorno", category: "Vehicles", subcategory: "Super", whitelisted: true },
  { hash: "0xC1E908D2", name: "t20", category: "Vehicles", subcategory: "Super", whitelisted: true },
  { hash: "0x39DA2754", name: "osiris", category: "Vehicles", subcategory: "Super", whitelisted: true },
  { hash: "0xA29D6D10", name: "hydra", category: "Vehicles", subcategory: "Military", whitelisted: false },
  { hash: "0xB39B0AE6", name: "rhino", category: "Vehicles", subcategory: "Military", whitelisted: false },
  { hash: "0x4F49CC4C", name: "savage", category: "Vehicles", subcategory: "Helicopter", whitelisted: false },
  { hash: "0x2F03547B", name: "buzzard", category: "Vehicles", subcategory: "Helicopter", whitelisted: true },
  { hash: "0x14E85C4B", name: "lazer", category: "Vehicles", subcategory: "Plane", whitelisted: false },
  { hash: "0x83BCC053", name: "comet2", category: "Vehicles", subcategory: "Sport", whitelisted: true },
  { hash: "0x5ED1C4B0", name: "kuruma", category: "Vehicles", subcategory: "Sport", whitelisted: true },
  { hash: "0x9F6ED5A2", name: "blista", category: "Vehicles", subcategory: "Compact", whitelisted: true },

  // Peds
  { hash: "0x705E61F2", name: "mp_m_freemode_01", category: "Peds", subcategory: "Multiplayer", whitelisted: true },
  { hash: "0x9C9EFFD8", name: "mp_f_freemode_01", category: "Peds", subcategory: "Multiplayer", whitelisted: true },
  { hash: "0x0D7114C9", name: "player_zero", category: "Peds", subcategory: "Story", whitelisted: false },
  { hash: "0x9B22DBAF", name: "player_one", category: "Peds", subcategory: "Story", whitelisted: false },
  { hash: "0x9B810FA2", name: "player_two", category: "Peds", subcategory: "Story", whitelisted: false },
  { hash: "0xCE2CB751", name: "s_m_y_cop_01", category: "Peds", subcategory: "Service", whitelisted: true },
  { hash: "0x9FD0AA38", name: "s_m_y_swat_01", category: "Peds", subcategory: "Service", whitelisted: false },
  { hash: "0x4FF77E37", name: "s_f_y_sheriff_01", category: "Peds", subcategory: "Service", whitelisted: true },

  // Weapons
  { hash: "0x1B06D571", name: "weapon_pistol", category: "Weapons", subcategory: "Sidearm", whitelisted: true },
  { hash: "0xBFEFFF6D", name: "weapon_assaultrifle", category: "Weapons", subcategory: "Rifle", whitelisted: true },
  { hash: "0x83BF0278", name: "weapon_carbinerifle", category: "Weapons", subcategory: "Rifle", whitelisted: true },
  { hash: "0xDBBD7280", name: "weapon_pumpshotgun", category: "Weapons", subcategory: "Shotgun", whitelisted: true },
  { hash: "0x7846A318", name: "weapon_sniperrifle", category: "Weapons", subcategory: "Sniper", whitelisted: true },
  { hash: "0xB1CA77B1", name: "weapon_rpg", category: "Weapons", subcategory: "Heavy", whitelisted: false },
  { hash: "0x42BF8A85", name: "weapon_minigun", category: "Weapons", subcategory: "Heavy", whitelisted: false },
  { hash: "0xA0973D5E", name: "weapon_grenadelauncher", category: "Weapons", subcategory: "Heavy", whitelisted: false },

  // Props
  { hash: "0x12FE40A2", name: "prop_chair_01a", category: "Props", subcategory: "Furniture", whitelisted: true },
  { hash: "0xCB73C68F", name: "prop_table_01", category: "Props", subcategory: "Furniture", whitelisted: true },
  { hash: "0xE2B3F8F8", name: "prop_atm_01", category: "Props", subcategory: "Misc", whitelisted: true },
  { hash: "0x59F5B644", name: "prop_money_bag_01", category: "Props", subcategory: "Misc", whitelisted: true },
];

const CATEGORIES = [
  { id: "All", icon: Package },
  { id: "Vehicles", icon: Car },
  { id: "Peds", icon: User },
  { id: "Weapons", icon: Crosshair },
  { id: "Props", icon: Box },
] as const;

const catColor: Record<string, string> = {
  Vehicles: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
  Peds: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  Weapons: "bg-red-500/15 text-red-400 border-red-500/30",
  Props: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
};

const Models = () => {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<typeof CATEGORIES[number]["id"]>("All");
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return MODELS.filter((m) => {
      if (cat !== "All" && m.category !== cat) return false;
      if (q && !`${m.name} ${m.hash} ${m.subcategory}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [q, cat]);

  const copy = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    toast.success(`${hash} copied`);
    setTimeout(() => setCopiedHash(null), 1200);
  };

  const counts = {
    All: MODELS.length,
    Vehicles: MODELS.filter((m) => m.category === "Vehicles").length,
    Peds: MODELS.filter((m) => m.category === "Peds").length,
    Weapons: MODELS.filter((m) => m.category === "Weapons").length,
    Props: MODELS.filter((m) => m.category === "Props").length,
  };

  return (
    <div className="space-y-5 animate-fade-up">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tighter flex items-center gap-2">
          <Box className="h-6 w-6 text-primary" /> Model Browser
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Search GTA V vehicles, peds, weapons, and props by name or hash</p>
      </div>

      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by model name or hash..." className="pl-9 font-mono" />
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setCat(c.id)}
            className={`text-xs px-3 py-1.5 rounded-full border transition flex items-center gap-1.5 ${cat === c.id ? "bg-primary/15 text-primary border-primary/30" : "bg-muted/30 text-muted-foreground border-border hover:bg-muted/50"}`}
          >
            <c.icon className="h-3 w-3" />
            {c.id}
            <span className="font-mono opacity-60">({counts[c.id as keyof typeof counts]})</span>
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {filtered.map((m, i) => (
          <div key={m.hash} className="glass rounded-xl p-4 hover-lift animate-fade-up" style={{ animationDelay: `${i * 20}ms` }}>
            <div className="flex items-start justify-between mb-2">
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${catColor[m.category]}`}>{m.category}</span>
              {m.whitelisted ? (
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Whitelisted
                </span>
              ) : (
                <span className="text-[10px] font-mono text-red-400">Blocked</span>
              )}
            </div>
            <div className="font-mono text-sm font-semibold truncate" title={m.name}>{m.name}</div>
            <div className="text-[10px] font-mono text-muted-foreground mt-0.5">{m.subcategory}</div>
            <button
              onClick={() => copy(m.hash)}
              className="mt-3 w-full flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-md bg-muted/30 hover:bg-muted/50 transition text-[10px] font-mono group"
            >
              <span className="text-cyan-400 truncate">{m.hash}</span>
              {copiedHash === m.hash ? (
                <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
              ) : (
                <Copy className="h-3 w-3 text-muted-foreground group-hover:text-foreground shrink-0" />
              )}
            </button>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="glass rounded-xl p-12 text-center text-muted-foreground text-sm">
          No models match. Try clearing the search.
        </div>
      )}

      <div className="text-xs text-muted-foreground text-center font-mono">
        Showing {filtered.length} of {MODELS.length} models · demo subset of the full catalog
      </div>
    </div>
  );
};

export default Models;
