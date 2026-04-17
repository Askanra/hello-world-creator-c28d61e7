import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Player } from "@/lib/demoData";
import { Copy, CopyCheck, Eye, Ban as BanIcon, Camera, LogOut, Search, Shield, Skull, Heart, Wifi } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useServerBase } from "@/hooks/useServer";

type Variant = "full" | "compact";

const DiscordLogo = () => (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor"><path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03Z" /></svg>
);
const SteamLogo = () => (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor"><path d="M12 0C5.626 0 .388 4.974 0 11.25l6.418 2.66a3.379 3.379 0 0 1 1.917-.59c.063 0 .126.001.188.005l2.853-4.13v-.058a4.515 4.515 0 0 1 4.514-4.515 4.515 4.515 0 0 1 4.515 4.515 4.515 4.515 0 0 1-4.515 4.515h-.105L11.66 16.6c0 .053.001.106.001.16a3.388 3.388 0 0 1-3.387 3.387 3.39 3.39 0 0 1-3.31-2.65L.275 15.585C1.732 20.474 6.467 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0Z" /></svg>
);

const IdRow = ({ icon, label, value }: { icon?: React.ReactNode; label: string; value: string }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    toast.success(`${label} copied`);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-muted/30 rounded text-xs font-mono group">
      {icon && <span className="text-muted-foreground shrink-0">{icon}</span>}
      <span className="text-muted-foreground w-16 shrink-0 text-[10px] uppercase">{label}</span>
      <span className="flex-1 truncate">{value}</span>
      <button onClick={copy} className="opacity-60 hover:opacity-100 transition shrink-0" aria-label={`Copy ${label}`}>
        {copied ? <CopyCheck className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
};

interface Props {
  player: Player | null;
  onClose: () => void;
  variant?: Variant;
}

export const PlayerDialog = ({ player, onClose, variant = "full" }: Props) => {
  const nav = useNavigate();
  const base = useServerBase();
  if (!player) return null;

  const compact = variant === "compact";
  const Icon = player.status === "threat" ? Skull : player.status === "watch" ? Eye : Shield;
  const statusColor = player.status === "threat" ? "text-red-400 bg-red-500/10 border-red-500/30" : player.status === "watch" ? "text-amber-400 bg-amber-500/10 border-amber-500/30" : "text-emerald-400 bg-emerald-500/10 border-emerald-500/30";

  const ids = [
    { label: "License", value: player.license, icon: null },
    { label: "Steam", value: player.steam, icon: <SteamLogo /> },
    { label: "Discord", value: player.discord, icon: <DiscordLogo /> },
    { label: "FiveM", value: player.fivem, icon: null },
    { label: "IP", value: player.ip, icon: null },
    { label: "HWID", value: player.hwid, icon: null },
    { label: "XBL", value: player.xbl, icon: null },
  ];

  const copyAll = () => {
    navigator.clipboard.writeText(ids.map((i) => `${i.label}: ${i.value}`).join("\n"));
    toast.success("All identifiers copied");
  };

  const sendToLookup = () => {
    nav(`${base}/lookup?q=${encodeURIComponent(player.license)}&category=License`);
    onClose();
  };

  return (
    <Dialog open={!!player} onOpenChange={onClose}>
      <DialogContent className={compact ? "max-w-md" : "max-w-2xl"}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className={`h-7 w-7 rounded-md flex items-center justify-center border ${statusColor}`}><Icon className="h-3.5 w-3.5" /></span>
            <span>{player.name}</span>
            <span className="text-xs font-mono text-muted-foreground">#{player.id}</span>
          </DialogTitle>
        </DialogHeader>

        <div className={compact ? "space-y-3" : "space-y-4"}>
          <div className={`grid ${compact ? "grid-cols-2" : "grid-cols-4"} gap-2`}>
            <Stat label="Trust" value={`${player.trust}/100`} />
            <Stat label="Ping" value={`${player.ping}ms`} icon={<Wifi className="h-3 w-3" />} />
            <Stat label="Health" value={`${player.health}%`} icon={<Heart className="h-3 w-3" />} />
            <Stat label="Playtime" value={player.playtime} />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Identifiers</div>
              <button onClick={copyAll} className="text-[10px] font-mono text-primary hover:underline flex items-center gap-1">
                <Copy className="h-3 w-3" /> Copy all
              </button>
            </div>
            <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
              {(compact ? ids.slice(0, 4) : ids).map((id) => (
                <IdRow key={id.label} icon={id.icon} label={id.label} value={id.value} />
              ))}
            </div>
          </div>

          <div className={`grid ${compact ? "grid-cols-2" : "grid-cols-4"} gap-2 pt-1`}>
            <Button variant="outline" size="sm" onClick={sendToLookup}>
              <Search className="h-3.5 w-3.5 mr-1.5" /> Lookup
            </Button>
            <Button variant="outline" size="sm" onClick={() => toast.success("Screenshot requested")}>
              <Camera className="h-3.5 w-3.5 mr-1.5" /> Screenshot
            </Button>
            <Button variant="outline" size="sm" onClick={() => toast.success(`${player.name} kicked`)}>
              <LogOut className="h-3.5 w-3.5 mr-1.5" /> Kick
            </Button>
            <Button variant="destructive" size="sm" onClick={() => toast.success(`Ban issued for ${player.name}`)}>
              <BanIcon className="h-3.5 w-3.5 mr-1.5" /> Ban
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Stat = ({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) => (
  <div className="bg-muted/30 rounded-lg p-2.5">
    <div className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1">{icon}{label}</div>
    <div className="font-bold text-sm">{value}</div>
  </div>
);
