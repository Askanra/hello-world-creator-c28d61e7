import { ScrollText, Filter } from "lucide-react";
import { LOGS } from "@/lib/demoData";
import { Input } from "@/components/ui/input";

const Logs = () => (
  <div className="space-y-5 animate-fade-up">
    <div>
      <h1 className="font-display text-3xl font-bold tracking-tighter flex items-center gap-2"><ScrollText className="h-6 w-6 text-primary" /> Server Logs</h1>
      <p className="text-sm text-muted-foreground mt-1">Activity breakdown by event type over time</p>
    </div>

    <div className="glass rounded-xl p-4">
      <Input placeholder="Search by player, event ID, license, or details..." />
    </div>

    <div className="glass rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold flex items-center gap-2">Server Logs</h3>
          <p className="text-xs text-muted-foreground">{LOGS.length} total logs</p>
        </div>
        <button className="text-xs flex items-center gap-1 px-3 py-1.5 rounded-md bg-muted/30 hover:bg-muted/50"><Filter className="h-3 w-3" /> Filter</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-left text-muted-foreground border-b border-border/50">
              <th className="pb-2 font-mono uppercase tracking-wider text-[10px] w-20">Time</th>
              <th className="pb-2 font-mono uppercase tracking-wider text-[10px] w-32">Type</th>
              <th className="pb-2 font-mono uppercase tracking-wider text-[10px]">Player</th>
              <th className="pb-2 font-mono uppercase tracking-wider text-[10px]">Details</th>
            </tr>
          </thead>
          <tbody>
            {LOGS.map((l, i) => (
              <tr key={i} className="border-b border-border/30 hover:bg-muted/20 animate-fade-up" style={{ animationDelay: `${i * 20}ms` }}>
                <td className="py-2.5 font-mono text-muted-foreground">{l.time}</td>
                <td className="py-2.5"><span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${l.color}`}>{l.type}</span></td>
                <td className="py-2.5 font-medium">{l.player}</td>
                <td className="py-2.5 text-muted-foreground">{l.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default Logs;
