import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success("Message sent! We'll respond within 24 hours.");
      setLoading(false);
      (e.target as HTMLFormElement).reset();
    }, 800);
  };

  return (
    <div className="container py-16 md:py-24">
      <div className="max-w-2xl mb-12">
        <p className="text-xs font-mono uppercase tracking-widest text-primary mb-4">// Get in touch</p>
        <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter mb-6">
          Let's <span className="text-gradient">talk.</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Questions about pricing, custom plans, or technical setup? We respond within 24 hours.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="space-y-4">
          {[
            { icon: Mail, label: "Email", value: "support@axyrix.eu" },
            { icon: MessageCircle, label: "Discord", value: "discord.gg/axyrix" },
            { icon: MapPin, label: "Based in", value: "Berlin, Germany" },
          ].map((c) => (
            <div key={c.label} className="glass rounded-2xl p-5 flex items-start gap-4">
              <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                <c.icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1">{c.label}</div>
                <div className="font-medium">{c.value}</div>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={onSubmit} className="lg:col-span-2 glass rounded-2xl p-8 space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" required placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required placeholder="you@example.com" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" required placeholder="How can we help?" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" required placeholder="Tell us about your server, framework, expected players..." rows={6} />
          </div>
          <Button type="submit" variant="hero" size="lg" disabled={loading} className="w-full sm:w-auto">
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
