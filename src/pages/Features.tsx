import { Shield, Zap, Eye, Lock, Activity, Cpu, Webhook, Database, Crosshair, Network, FileSearch, Globe, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FeatureAccordion, DetectionPreview, PanelPreview, HwidPreview, AimbotPreview, type FeatureItem } from "@/components/FeatureAccordion";

const features: FeatureItem[] = [
  { icon: Shield, title: "Advanced Detection Engine", desc: "Multi-layered scanning catches injectors, menu loaders, and exploit toolkits the moment they touch the client.", preview: <DetectionPreview /> },
  { icon: Crosshair, title: "Anti-Aimbot AI", desc: "Behavioral analysis flags impossible flicks, snap angles, and target acquisition patterns no human could perform.", preview: <AimbotPreview /> },
  { icon: Lock, title: "HWID & Anti-Spoof", desc: "Hardware fingerprinting prevents banned cheaters from returning under new accounts or VPNs.", preview: <HwidPreview /> },
  { icon: Eye, title: "Live Web Panel", desc: "Watch every server, player and detection in real-time from a slick dashboard accessible anywhere.", preview: <PanelPreview /> },
  { icon: Network, title: "Network Intelligence", desc: "Cross-server data sharing exposes serial offenders before they even join your community.", preview: <p className="text-sm text-muted-foreground">Every Axyrix-protected server contributes anonymized ban signals. When a HWID is banned for aimbot on Server A, Server B is alerted instantly if that HWID connects.</p> },
  { icon: Activity, title: "Event Protection", desc: "Server events are encrypted and validated to block client-side exploitation in its tracks.", preview: <p className="text-sm text-muted-foreground">All TriggerServerEvent calls are signed, rate-limited and validated against a whitelist. Forged or replayed events are dropped and logged.</p> },
  { icon: Webhook, title: "Discord Integration", desc: "Real-time alerts, ban logs and evidence exports pushed straight to your moderation channels.", preview: <p className="text-sm text-muted-foreground">Configurable webhooks for bans, detections, joins/leaves, admin actions and resource starts. Embeds include screenshots and evidence packs.</p> },
  { icon: Cpu, title: "Zero Performance Hit", desc: "Engineered with native modules and async pipelines — players never notice it's running.", preview: <p className="text-sm text-muted-foreground">Average overhead: 0.4ms/tick on 64-slot servers. Detection runs off the main thread; nothing blocks gameplay.</p> },
  { icon: Database, title: "Full Framework Support", desc: "Drop-in compatibility with ESX, QBCore, QBox, vRP and standalone setups.", preview: <p className="text-sm text-muted-foreground">No custom adapter scripts needed. Axyrix hooks the engine, not your framework, so it works the same regardless of which one you run.</p> },
  { icon: FileSearch, title: "Forensic Logging", desc: "Every detection captures full context: timestamps, packet data, and player actions for evidence.", preview: <p className="text-sm text-muted-foreground">Each detection produces an evidence bundle: 10 seconds of pre/post telemetry, screenshot, hardware ID, and packet trace — exportable as a single file.</p> },
  { icon: Zap, title: "Plug & Play", desc: "Five minute install. No complex configs, no headaches. It just works.", preview: <p className="text-sm text-muted-foreground">1. Drop into resources/ · 2. Add to server.cfg · 3. Paste license · 4. Restart. Sensible defaults work for 95% of servers out of the box.</p> },
  { icon: Globe, title: "24/7 Monitoring", desc: "Our team watches the cheat scene daily and ships updates every 2-3 days to stay ahead.", preview: <p className="text-sm text-muted-foreground">We monitor public cheat communities, leaked builds, and run honeypot servers. New cheat signatures usually ship within 24h of being spotted in the wild.</p> },
];

const Features = () => {
  return (
    <div className="container py-16 md:py-24">
      <div className="max-w-3xl mb-12">
        <p className="text-xs font-mono uppercase tracking-widest text-primary mb-4">// Capabilities</p>
        <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter mb-6">
          Everything you need <br /><span className="text-gradient">and nothing you don't.</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Axyrix isn't a single trick — it's a complete protection stack.
          Click any feature to see it in action.
        </p>
      </div>

      <FeatureAccordion items={features} />

      <div className="mt-16 glass rounded-2xl p-10 text-center">
        <h3 className="font-display text-3xl font-bold mb-3">See it for yourself</h3>
        <p className="text-muted-foreground mb-6">Explore the full live dashboard with our fictional Phoenix RP demo server.</p>
        <Button variant="hero" size="lg" asChild>
          <Link to="/dashboard">Open Live Demo <ArrowRight className="ml-1" /></Link>
        </Button>
      </div>
    </div>
  );
};

export default Features;
