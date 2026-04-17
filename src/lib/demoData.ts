// Mock data for the Axyrix demo dashboard — multi-server
import phoenixBanner from "@/assets/server-phoenix.jpg";
import nightcityBanner from "@/assets/server-nightcity.jpg";
import northpoleBanner from "@/assets/server-northpole.jpg";

export type ServerStatus = "online" | "offline" | "maintenance";

export type Server = {
  id: string;
  name: string;
  ip: string;
  banner: string;
  version: string;
  latestVersion: string;
  status: ServerStatus;
  slots: number;
  online: number;
  uptime: string;
  framework: string;
  region: string;
  license: "Pro" | "Enterprise" | "Trial";
};

export const SERVERS: Server[] = [
  { id: "phoenix-rp", name: "Phoenix RP", ip: "play.phoenix-rp.gg", banner: phoenixBanner, version: "v1.0.4", latestVersion: "v1.0.5", status: "online", slots: 320, online: 287, uptime: "47d 12h", framework: "QBCore", region: "EU-West", license: "Enterprise" },
  { id: "night-city-rp", name: "Night City RP", ip: "connect.nightcity.gg", banner: nightcityBanner, version: "v1.0.5", latestVersion: "v1.0.5", status: "online", slots: 200, online: 142, uptime: "12d 03h", framework: "ESX", region: "NA-East", license: "Pro" },
  { id: "north-pole", name: "North Pole RP", ip: "north.axyrix.gg", banner: northpoleBanner, version: "v1.0.3", latestVersion: "v1.0.5", status: "maintenance", slots: 128, online: 0, uptime: "—", framework: "QBox", region: "EU-North", license: "Trial" },
];

// Default fallback (kept for legacy imports)
export const SERVER = SERVERS[0];

export const KPI = {
  connections24h: 1842,
  totalPlayers: 24571,
  totalBans: 142,
  detections24h: 67,
  peakPlayers: 312,
  avgPlayers: 241,
};

const NAMES = ["xXShadowKillxX", "ToxicMango", "DriftKing_99", "FedayinGhost", "RagnarLodbrok", "MidnightFox", "ZeroCool", "BlazePhoenix", "VortexHunter", "SilentBlade", "ChaosMonkey", "NeonSamurai", "GhostRider", "ApexPredator", "VoidWalker", "StormBringer", "CrimsonWolf", "IronFist", "NovaBlitz", "DarkSerpent", "FrostByte", "ThunderHawk", "ShadowReaper", "PhoenixRising", "SkyFall_X", "MysticDragon", "RogueAgent", "VenomStrike", "CyberNinja", "SteelTitan", "WildHunter", "MoonShadow"];

export type Player = {
  id: number;
  name: string;
  ping: number;
  trust: number;
  health: number;
  joinedMinutesAgo: number;
  joined: string;
  playtimeHours: number;
  playtime: string;
  status: "threat" | "watch" | "clean";
  license: string;
  steam: string;
  discord: string;
  fivem: string;
  ip: string;
  hwid: string;
  xbl: string;
  x: number; // map percent
  y: number;
};

const seeded = (i: number, salt: number) => Math.abs(Math.sin(i * 9301 + salt * 49297)) % 1;

export const PLAYERS: Player[] = Array.from({ length: 32 }).map((_, i) => {
  const ping = 18 + Math.floor(seeded(i, 1) * 130);
  const trust = Math.floor(seeded(i, 2) * 100);
  const health = Math.floor(seeded(i, 3) * 100);
  const joinedMinutesAgo = Math.floor(seeded(i, 4) * 480);
  const playtimeHours = Math.floor(seeded(i, 5) * 200);
  const status: Player["status"] = trust < 30 ? "threat" : trust < 70 ? "watch" : "clean";
  return {
    id: i + 1,
    name: NAMES[i % NAMES.length] + (i > 15 ? `_${i}` : ""),
    ping,
    trust,
    health,
    joinedMinutesAgo,
    joined: joinedMinutesAgo < 60 ? `${joinedMinutesAgo}m ago` : `${Math.floor(joinedMinutesAgo / 60)}h ${joinedMinutesAgo % 60}m ago`,
    playtimeHours,
    playtime: `${playtimeHours}h`,
    status,
    license: `license:${(i * 7919).toString(36).padStart(12, "a")}`,
    steam: `steam:1100001${(i * 31337).toString().padStart(8, "0").slice(-8)}`,
    discord: `discord:${(i * 1234567 + 100000000000000000).toString().slice(0, 18)}`,
    fivem: `fivem:${100000 + i * 137}`,
    ip: `ip:185.${20 + i}.${100 + i * 3 % 155}.${(i * 17) % 255}`,
    hwid: `hwid:${(i * 99991).toString(16).padStart(10, "0")}-${(i * 7).toString(16).padStart(4, "0")}`,
    xbl: `xbl:${2535400000000000 + i * 9991}`,
    x: 8 + ((i * 137) % 84),
    y: 6 + ((i * 211) % 86),
  };
});

export const BANS = [
  { id: "#A8X-2241", player: "xXcheaterXx_69", playerId: 1, reason: "Aimbot Detected (snap angle 0.003ms)", date: "Apr 16, 2026", playtime: "4h 12m", status: "permanent", proof: "https://axyrix.gg/proof/2241", admin: "Marcus_Chen" },
  { id: "#A8X-2240", player: "MenuLoader_99", playerId: 2, reason: "Lua Executor #3 — RedEngine v4.2", date: "Apr 16, 2026", playtime: "0h 23m", status: "permanent", proof: "https://axyrix.gg/proof/2240", admin: "Sarah_K" },
  { id: "#A8X-2239", player: "FreeCamGod", playerId: 3, reason: "Anti-Spectate triggered repeatedly", date: "Apr 15, 2026", playtime: "12h", status: "expires-7d", proof: "", admin: "ThunderDan" },
  { id: "#A8X-2238", player: "SpawnerKid", playerId: 4, reason: "Illegal Vehicle Spawn (Hydra)", date: "Apr 15, 2026", playtime: "2h 1m", status: "permanent", proof: "https://axyrix.gg/proof/2238", admin: "Marcus_Chen" },
  { id: "#A8X-2237", player: "GodModeBob", playerId: 5, reason: "Anti Damage Immunity", date: "Apr 14, 2026", playtime: "8h 44m", status: "permanent", proof: "", admin: "Sarah_K" },
  { id: "#A8X-2236", player: "TPHacker", playerId: 6, reason: "Anti Teleport (>2km/s)", date: "Apr 14, 2026", playtime: "0h 8m", status: "permanent", proof: "", admin: "Niklas_W" },
  { id: "#A8X-2235", player: "InfStaminaPro", playerId: 7, reason: "Anti Infinite Stamina", date: "Apr 13, 2026", playtime: "21h", status: "expires-1d", proof: "", admin: "ThunderDan" },
  { id: "#A8X-2234", player: "ResStopper", playerId: 8, reason: "Anti Resource Stop attempt", date: "Apr 13, 2026", playtime: "1h 5m", status: "permanent", proof: "", admin: "Marcus_Chen" },
  { id: "#A8X-2233", player: "NoClipKid", playerId: 9, reason: "Anti NoClip", date: "Apr 12, 2026", playtime: "6h", status: "expired", proof: "", admin: "RoseQuartz" },
  { id: "#A8X-2232", player: "WeaponSpawner1", playerId: 10, reason: "Illegal Weapon Spawn (RPG)", date: "Apr 12, 2026", playtime: "3h 17m", status: "permanent", proof: "", admin: "Sarah_K" },
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

export const LOGS = Array.from({ length: 200 }).map((_, i) => {
  const t = EVENT_TYPES[i % EVENT_TYPES.length];
  const player = PLAYERS[i % PLAYERS.length];
  const hoursAgo = Math.floor(seeded(i, 9) * 24 * 31); // up to 31d
  return {
    id: `EV-${10000 + i}`,
    hoursAgo,
    time: `12:${(58 - i % 60).toString().padStart(2, "0")}:${(59 - (i * 3) % 60).toString().padStart(2, "0")}`,
    type: t.type,
    color: t.color,
    player: player.name,
    playerId: player.id,
    detail: t.type === "BAN_ISSUED" ? "Reason: AimBot Detected" : t.type === "DETECTION" ? "Anti-Spectate" : t.type === "ENTITY_CREATE" ? "EntityModel: 1923187793" : t.type === "EXPLOSION" ? "ExplosionType: 7" : "—",
  };
});

export const ADMINS = [
  { name: "Marcus_Chen", email: "marcus@phoenix-rp.gg", role: "Owner", license: "license:abc...91f", joined: "Jan 04, 2024", permissions: ["bans", "kicks", "config", "admins"] },
  { name: "Sarah_K", email: "sarah@phoenix-rp.gg", role: "Head Admin", license: "license:def...22a", joined: "Feb 12, 2024", permissions: ["bans", "kicks", "config"] },
  { name: "ThunderDan", email: "dan@phoenix-rp.gg", role: "Admin", license: "license:991...88c", joined: "Mar 03, 2024", permissions: ["bans", "kicks"] },
  { name: "Niklas_W", email: "niklas@phoenix-rp.gg", role: "Moderator", license: "license:771...44b", joined: "May 19, 2024", permissions: ["kicks"] },
  { name: "RoseQuartz", email: "rose@phoenix-rp.gg", role: "Moderator", license: "license:332...01d", joined: "Aug 02, 2024", permissions: ["kicks"] },
  { name: "ViperX", email: "viper@phoenix-rp.gg", role: "Trial Mod", license: "license:559...77e", joined: "Mar 14, 2026", permissions: [] },
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

// Traffic series per range
const buildSeries = (n: number, label: (i: number) => string) =>
  Array.from({ length: n }).map((_, i) => ({
    hour: label(i),
    players: Math.floor(140 + Math.sin(i / 3) * 80 + seeded(i, 11) * 30),
    bans: Math.floor(seeded(i, 12) * 6),
  }));

export const TRAFFIC = buildSeries(24, (i) => `${i.toString().padStart(2, "0")}:00`);
export const TRAFFIC_7D = buildSeries(7, (i) => ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]);
export const TRAFFIC_30D = buildSeries(30, (i) => `D${i + 1}`);

export type Notification = {
  id: string;
  type: "ban" | "detection" | "system" | "admin";
  title: string;
  body: string;
  time: string;
  unread: boolean;
};

export const NOTIFICATIONS: Notification[] = [
  { id: "n1", type: "detection", title: "Aimbot detected", body: "xXShadowKillxX flagged with 0.003ms snap.", time: "2m ago", unread: true },
  { id: "n2", type: "ban", title: "New ban issued", body: "MenuLoader_99 banned by Sarah_K.", time: "11m ago", unread: true },
  { id: "n3", type: "system", title: "Update available", body: "Axyrix v1.0.5 is ready to install.", time: "1h ago", unread: true },
  { id: "n4", type: "admin", title: "Admin added", body: "ViperX promoted to Trial Mod.", time: "3h ago", unread: false },
  { id: "n5", type: "detection", title: "Lua executor blocked", body: "RedEngine v4.2 signature match.", time: "5h ago", unread: false },
];
