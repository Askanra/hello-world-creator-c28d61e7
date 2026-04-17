import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Terminal, Settings, Shield, ArrowRight } from "lucide-react";

const sections = [
  { icon: BookOpen, title: "Getting Started", desc: "Install Axyrix on your FiveM server in under 5 minutes." },
  { icon: Terminal, title: "Configuration", desc: "Tune detection thresholds, ban behaviors and webhook integrations." },
  { icon: Settings, title: "Web Panel", desc: "Master the dashboard — manage servers, players, and bans." },
  { icon: Shield, title: "Detection Reference", desc: "Understand every detection type and how to respond to alerts." },
];

const Docs = () => (
  <div className="container py-16 md:py-24">
    <div className="max-w-3xl mb-16">
      <p className="text-xs font-mono uppercase tracking-widest text-primary mb-4">// Documentation</p>
      <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter mb-6">
        Read the <span className="text-gradient">docs.</span>
      </h1>
      <p className="text-lg text-muted-foreground">
        Everything you need to install, configure, and master Axyrix.
        Detailed guides written by the engineers who built it.
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-4 mb-12">
      {sections.map((s) => (
        <div key={s.title} className="glass rounded-2xl p-7 group hover:border-primary/30 transition cursor-pointer">
          <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
            <s.icon className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-display text-xl font-semibold mb-2 flex items-center gap-2">
            {s.title}
            <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition" />
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
        </div>
      ))}
    </div>

    <div className="glass rounded-2xl p-8 text-center">
      <h3 className="font-display text-2xl font-semibold mb-3">Can't find what you need?</h3>
      <p className="text-muted-foreground mb-5">Our support team is on Discord 24/7.</p>
      <Button variant="hero" asChild>
        <Link to="/contact">Contact Support</Link>
      </Button>
    </div>
  </div>
);

export default Docs;
