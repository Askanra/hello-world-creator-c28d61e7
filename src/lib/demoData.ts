// Mock data for the Axyrix demo dashboard — fictional server "Phoenix RP"

export const SERVER = {
  name: "Phoenix RP",
  ip: "play.phoenix-rp.gg",
  version: "v1.0.4",
  latestVersion: "v1.0.5",
  status: "online" as const,
  slots: 320,
  online: 287,
  uptime: "47d 12h",
  framework: "QBCore",
  region: "EU-West",
};

export const KPI = {
  connections24h: 1842,
  totalPlayers: 24571,
  totalBans: 142,
  detections24h: 67,
  peakPlayers: 312,
  avgPlayers: 241,
};

export const PLAYERS = Array.from({ length: 32 }).map((_, i) => {
  const names = ["xXShadowKillxX", "ToxicMango", "DriftKing_99", "FedayinGhost", "RagnarLodbrok", "MidnightFox", "ZeroCool", "BlazePhoenix", "VortexHunter", "SilentBlade", "ChaosMonkey", "NeonSamurai", "GhostRider", "ApexPredator", "VoidWalker", "StormBringer", "CrimsonWolf", "IronFist", "NovaBlitz", "DarkSerpent", "FrostByte", "ThunderHawk", "ShadowReaper", "PhoenixRising", "SkyFall_X", "MysticDragon", "RogueAgent", "VenomStrike", "CyberNinja", "SteelTitan", "WildHunter", "MoonShadow"];
  const ping = 18 + Math.floor(Math.random() * 130);
  const trust = Math.floor(Math.random() * 100);
  const health = Math.floor(Math.random() * 100);
  return {
    id: i + 1,
    name: names[i % names.length] + (i > 15 ? `_${i}` : ""),
    ping,
    trust,
    health,
    joined: `${Math.floor(Math.random() * 5)}h ${Math.floor(Math.random() * 60)}m ago`,
    playtime: `${Math.floor(Math.random() * 200)}h`,
    status: trust < 30 ? "threat" : trust < 70 ? "watch" : "clean",
    license: `license:${Math.random().toString(36).slice(2, 14)}`,
    steam: `steam:1100001${Math.floor(Math.random() * 99999999)}`,
  };
});

export const BANS = [
  { id: "#A8X-2241", player: "xXcheaterXx_69", reason: "Aimbot Detected (snap angle 0.003ms)", date: "Apr 16, 2026", playtime: "4h 12m", status: "permanent" },
  { id: "#A8X-2240", player: "MenuLoader_99", reason: "Lua Executor #3 — RedEngine v4.2", date: "Apr 16, 2026", playtime: "0h 23m", status: "permanent" },
  { id: "#A8X-2239", player: "FreeCamGod", reason: "Anti-Spectate triggered repeatedly", date: "Apr 15, 2026", playtime: "12h", status: "expires-7d" },
  { id: "#A8X-2238", player: "SpawnerKid", reason: "Illegal Vehicle Spawn (Hydra)", date: "Apr 15, 2026", playtime: "2h 1m", status: "permanent" },
  { id: "#A8X-2237", player: "GodModeBob", reason: "Anti Damage Immunity", date: "Apr 14, 2026", playtime: "8h 44m", status: "permanent" },
  { id: "#A8X-2236", player: "TPHacker", reason: "Anti Teleport (>2km/s)", date: "Apr 14, 2026", playtime: "0h 8m", status: "permanent" },
  { id: "#A8X-2235", player: "InfStaminaPro", reason: "Anti Infinite Stamina", date: "Apr 13, 2026", playtime: "21h", status: "expires-1d" },
  { id: "#A8X-2234", player: "ResStopper", reason: "Anti Resource Stop attempt", date: "Apr 13, 2026", playtime: "1h 5m", status: "permanent" },
  { id: "#A8X-2233", player: "NoClipKid", reason: "Anti NoClip", date: "Apr 12, 2026", playtime: "6h", status: "expired" },
  { id: "#A8X-2232", player: "WeaponSpawner1", reason: "Illegal Weapon Spawn (RPG)", date: "Apr 12, 2026", playtime: "3h 17m", status: "permanent" },
];

export const EVENT_TYPES = [
  { type: "PLAYER_JOIN", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  { type: "PLAYER_LEAVE", color: "bg-slate-500/20 text-slate-400 border-slate-500/30" },
  { type: "BAN_ISSUED", color: "bg-red-500/20 text-red-400 border-red-500/30" },
  { type: "DETECTION", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
  { type: "ENTITY_CREATE", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  { type: "EXPLOSION", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  { type: "KILL", color: "bg-pink-500/20 text-pink-400 border-pink-500/30" },
  { type: "CHAT", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
];

export const LOGS = Array.from({ length: 40 }).map((_, i) => {
  const t = EVENT_TYPES[i % EVENT_TYPES.length];
  const player = PLAYERS[i % PLAYERS.length];
  return {
    time: `12:${(58 - i).toString().padStart(2, "0")}:${(59 - (i * 3) % 60).toString().padStart(2, "0")}`,
    type: t.type,
    color: t.color,
    player: player.name,
    detail: t.type === "BAN_ISSUED" ? "Reason: AimBot Detected" : t.type === "DETECTION" ? "Anti-Spectate" : t.type === "ENTITY_CREATE" ? "EntityModel: 1923187793" : t.type === "EXPLOSION" ? "ExplosionType: 7" : "—",
  };
});

export const ADMINS = [
  { name: "Marcus_Chen", role: "Owner", license: "license:abc...91f", joined: "Jan 04, 2024" },
  { name: "Sarah_K", role: "Head Admin", license: "license:def...22a", joined: "Feb 12, 2024" },
  { name: "ThunderDan", role: "Admin", license: "license:991...88c", joined: "Mar 03, 2024" },
  { name: "Niklas_W", role: "Moderator", license: "license:771...44b", joined: "May 19, 2024" },
  { name: "RoseQuartz", role: "Moderator", license: "license:332...01d", joined: "Aug 02, 2024" },
  { name: "ViperX", role: "Trial Mod", license: "license:559...77e", joined: "Mar 14, 2026" },
];

export const DETECTION_BREAKDOWN = [
  { name: "Aimbot", value: 23, color: "hsl(195 100% 55%)" },
  { name: "Silent Aim", value: 18, color: "hsl(280 80% 60%)" },
  { name: "Overlay", value: 15, color: "hsl(40 95% 55%)" },
  { name: "Weapon Spawn", value: 12, color: "hsl(140 70% 50%)" },
  { name: "Invincibility", value: 9, color: "hsl(0 80% 60%)" },
  { name: "Vehicle Spawn", value: 7, color: "hsl(220 80% 60%)" },
  { name: "Spoofer", value: 5, color: "hsl(320 70% 55%)" },
];

export const TRAFFIC = Array.from({ length: 24 }).map((_, i) => ({
  hour: `${i.toString().padStart(2, "0")}:00`,
  players: Math.floor(140 + Math.sin(i / 3) * 80 + Math.random() * 30),
  bans: Math.floor(Math.random() * 6),
}));
