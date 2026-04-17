import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Zap, Eye, Lock, Activity, Cpu, ArrowRight, Check, Star, Users, Server, Ban, MonitorPlay } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import dashboardImg from "@/assets/dashboard-preview.jpg";
import logo from "@/assets/axyrix-logo.png";
import { FAQ } from "@/components/FAQ";

const features = [
  { icon: Shield, title: "Advanced Detection", desc: "Multi-layered detection engine catches injectors, menus, and exploit toolkits in milliseconds." },
  { icon: Zap, title: "Plug & Play", desc: "Drop-in installation. Works out of the box with ESX, QBCore, QBox and vRP frameworks." },
  { icon: Eye, title: "Live Web Panel", desc: "Real-time monitoring dashboard with player analytics, ban management, and event logs." },
  { icon: Lock, title: "Anti-Spoof Engine", desc: "Hardware fingerprinting and HWID lock prevents banned cheaters from returning." },
  { icon: Activity, title: "Behavior AI", desc: "Machine-learning models detect aimbots, speed hacks, and unusual movement patterns." },
  { icon: Cpu, title: "Zero Performance Hit", desc: "Engineered for minimal footprint — your server stays smooth at 60+ FPS." },
];

const stats = [
  { value: "850+", label: "Servers Protected", icon: Server },
  { value: "120K+", label: "Cheaters Banned", icon: Ban },
  { value: "4.2M+", label: "Players Monitored", icon: Users },
  { value: "99.9%", label: "Uptime SLA", icon: Activity },
];

const testimonials = [
  { name: "Lucas V.", role: "Server Owner", text: "Switched from another anticheat last month. Axyrix caught more cheaters in the first week than the old one did in 6 months. Setup took 5 minutes." },
  { name: "Kevin D.", role: "Lead Developer", text: "Clean code, well documented, and the support team actually responds. The web panel is a huge step above what competitors offer." },
  { name: "Thomas R.", role: "Community Manager", text: "Our reports went from 40 a day to almost zero. Players notice the difference. Worth every euro." },
  { name: "Mark S.", role: "FiveM Veteran", text: "Lightweight, fast, and aggressive against exploits. No false positives in 3 months. This is what we've been waiting for." },
];

const Index = () => {
  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0 grid-pattern opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <img
          src={heroBg}
          alt=""
          className="absolute right-0 top-0 h-full w-2/3 object-cover opacity-30 mix-blend-screen pointer-events-none"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-hero" />

        <div className="container relative z-10 py-20">
          <div className="max-w-4xl animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-8 text-xs font-mono uppercase tracking-wider">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
              <span className="text-muted-foreground">v1.0 — Now with AI behavior detection</span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tighter mb-8">
              The anticheat <br />
              FiveM cheaters <br />
              <span className="text-gradient">actually fear.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
              Axyrix is a next-generation anticheat built for serious FiveM communities.
              Real-time detection, AI behavior analysis, and a panel that actually makes sense.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button variant="hero" size="xl" asChild>
                <Link to="/pricing">
                  Protect Your Server <ArrowRight className="ml-1" />
                </Link>
              </Button>
              <Button variant="glass" size="xl" asChild>
                <Link to="/dashboard">
                  <MonitorPlay className="mr-1" /> Try Live Demo
                </Link>
              </Button>
            </div>

            <div className="flex items-center gap-6 mt-12 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" /> CFX Compliant
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" /> Escrow Protected
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" /> No Data Collection
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 border-y border-border/50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center group">
                <s.icon className="h-6 w-6 mx-auto mb-3 text-primary/70 group-hover:text-primary transition" />
                <div className="font-display text-4xl md:text-5xl font-bold text-gradient mb-1">{s.value}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground font-mono">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-32">
        <div className="container">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-mono uppercase tracking-widest text-primary mb-4">// Features</p>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter mb-6">
              Built for the <span className="text-gradient">paranoid</span>.
            </h2>
            <p className="text-lg text-muted-foreground">
              Every layer engineered to expose, log, and eliminate cheaters before they ruin your community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="glass rounded-2xl p-7 group hover:border-primary/30 transition-all hover:-translate-y-1"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DASHBOARD */}
      <section className="py-32 relative">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-primary mb-4">// Control Panel</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tighter mb-6">
                Total visibility. <br /> Zero guesswork.
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Manage your entire server fleet from one elegant dashboard. Live detections,
                ban controls, player history, and analytics — all in real-time.
              </p>
              <ul className="space-y-3 mb-8">
                {["Live event stream with millisecond precision", "One-click ban & evidence export", "Multi-server management", "Discord & webhook integrations"].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm">
                    <div className="h-5 w-5 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    {t}
                  </li>
                ))}
              </ul>
              <Button variant="glass" asChild>
                <Link to="/dashboard">Open the live demo <ArrowRight /></Link>
              </Button>
            </div>

            <div className="relative">
              <div className="absolute -inset-8 bg-primary/20 rounded-full blur-3xl opacity-50" />
              <div className="relative glass rounded-2xl p-2 shadow-elegant">
                <img
                  src={dashboardImg}
                  alt="Axyrix dashboard"
                  className="rounded-xl w-full"
                  loading="lazy"
                  width={1600}
                  height={1000}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-32">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-mono uppercase tracking-widest text-primary mb-4">// Trusted</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tighter mb-4">
              What server owners say
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {testimonials.map((t) => (
              <div key={t.name} className="glass rounded-2xl p-7">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground/90 leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center font-display font-bold text-primary-foreground text-sm">
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQ />

      {/* CTA */}
      <section className="py-32">
        <div className="container">
          <div className="relative glass rounded-3xl p-12 md:p-20 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-hero opacity-60" />
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[60%] bg-primary/30 rounded-full blur-3xl" />
            <img src={logo} alt="" className="h-20 w-20 mx-auto mb-6 relative animate-float" />
            <h2 className="relative font-display text-4xl md:text-6xl font-bold tracking-tighter mb-6">
              Ready to lock down <br /> your server?
            </h2>
            <p className="relative text-lg text-muted-foreground max-w-xl mx-auto mb-10">
              Join hundreds of FiveM communities running Axyrix. Setup in under 5 minutes.
            </p>
            <div className="relative flex flex-wrap gap-3 justify-center">
              <Button variant="hero" size="xl" asChild>
                <Link to="/pricing">Get Axyrix <ArrowRight /></Link>
              </Button>
              <Button variant="glass" size="xl" asChild>
                <Link to="/contact">Talk to us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
