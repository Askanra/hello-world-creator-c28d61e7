import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Monthly",
    desc: "Perfect for testing and short-term projects",
    price: "€19",
    period: "/month",
    features: ["1 month full access", "Live web panel", "All Axyrix features", "Discord integration", "24/7 support"],
    cta: "Get Started",
  },
  {
    name: "Quarterly",
    desc: "Great value for established servers",
    price: "€49",
    period: "/3 months",
    features: ["3 months access", "Live web panel", "All Axyrix features", "Network intelligence", "Priority support"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Lifetime",
    desc: "The ultimate choice for professional communities",
    price: "€129",
    period: "one-time",
    features: ["Lifetime access", "All future updates", "All Axyrix features", "Network intelligence", "VIP support channel", "Free migration help"],
    cta: "Get Lifetime",
    popular: true,
  },
];

const Pricing = () => {
  return (
    <div className="container py-16 md:py-24">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-xs font-mono uppercase tracking-widest text-primary mb-4">// Pricing</p>
        <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter mb-6">
          Simple. Honest. <span className="text-gradient">Lifetime.</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          One purchase, full protection. All plans include every Axyrix feature.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-5 max-w-6xl mx-auto">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`relative glass rounded-2xl p-8 flex flex-col ${
              p.popular ? "border-primary/50 shadow-glow" : ""
            }`}
          >
            {p.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> MOST POPULAR
              </div>
            )}
            <h3 className="font-display text-2xl font-bold mb-2">{p.name}</h3>
            <p className="text-sm text-muted-foreground mb-6">{p.desc}</p>
            <div className="mb-6">
              <span className="font-display text-5xl font-bold">{p.price}</span>
              <span className="text-muted-foreground ml-1">{p.period}</span>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm">
                  <div className="h-5 w-5 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  {f}
                </li>
              ))}
            </ul>
            <Button variant={p.popular ? "hero" : "glass"} size="lg" asChild>
              <Link to="/contact">{p.cta}</Link>
            </Button>
          </div>
        ))}
      </div>

      <div className="text-center mt-16 text-sm text-muted-foreground">
        Need a custom enterprise plan? <Link to="/contact" className="text-primary hover:underline">Contact us</Link>
      </div>
    </div>
  );
};

export default Pricing;
