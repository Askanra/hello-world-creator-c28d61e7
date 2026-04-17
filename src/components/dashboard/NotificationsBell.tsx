import { Bell, Check } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { NOTIFICATIONS, Notification } from "@/lib/demoData";
import { useState } from "react";

const typeColor: Record<Notification["type"], string> = {
  ban: "bg-red-500/20 text-red-400",
  detection: "bg-orange-500/20 text-orange-400",
  system: "bg-cyan-500/20 text-cyan-400",
  admin: "bg-purple-500/20 text-purple-400",
};

export const NotificationsBell = () => {
  const [items, setItems] = useState(NOTIFICATIONS);
  const unread = items.filter((n) => n.unread).length;

  const markAll = () => setItems(items.map((n) => ({ ...n, unread: false })));

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative p-2 rounded-lg hover:bg-muted/50 transition" aria-label="Notifications">
          <Bell className="h-4 w-4" />
          {unread > 0 && (
            <span className="absolute top-1 right-1 h-4 min-w-4 px-1 rounded-full bg-primary text-[9px] font-bold text-primary-foreground flex items-center justify-center">
              {unread}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
          <div className="font-semibold text-sm">Notifications</div>
          <button onClick={markAll} className="text-[10px] font-mono text-primary hover:underline flex items-center gap-1">
            <Check className="h-3 w-3" /> Mark all read
          </button>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {items.map((n) => (
            <div key={n.id} className={`px-4 py-3 border-b border-border/30 last:border-0 hover:bg-muted/30 ${n.unread ? "bg-primary/5" : ""}`}>
              <div className="flex items-start gap-2">
                <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded ${typeColor[n.type]}`}>{n.type}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold">{n.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{n.body}</div>
                  <div className="text-[10px] font-mono text-muted-foreground mt-1">{n.time}</div>
                </div>
                {n.unread && <span className="h-2 w-2 rounded-full bg-primary mt-1" />}
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
