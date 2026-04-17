import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, ArrowRight, Check } from "lucide-react";
import { demoLogin } from "@/lib/demoAuth";
import { toast } from "sonner";
import logo from "@/assets/axyrix-logo.png";

const Register = () => {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      demoLogin(email, name);
      toast.success("Account created — welcome to Axyrix!");
      nav("/dashboard");
    }, 700);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 grid-bg relative">
      <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />
      <div className="relative w-full max-w-md animate-fade-up">
        <Link to="/" className="flex items-center gap-2.5 mb-8 justify-center">
          <img src={logo} alt="Axyrix" className="h-10 w-10" />
          <span className="font-display font-bold text-xl tracking-tight">AXYRIX</span>
        </Link>

        <div className="glass rounded-2xl p-8 shadow-elegant">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono mb-4">
              <Sparkles className="h-3 w-3 text-primary" /> START FREE
            </div>
            <h1 className="font-display text-3xl font-bold tracking-tighter">Create your account</h1>
            <p className="text-sm text-muted-foreground mt-1">Start protecting your server in minutes</p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Display name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="ServerOwner" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@server.gg" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
            </div>

            <Button type="submit" variant="hero" className="w-full" disabled={loading}>
              {loading ? "Creating account..." : <>Create account <ArrowRight className="ml-1 h-4 w-4" /></>}
            </Button>
          </form>

          <ul className="mt-6 space-y-2">
            {["7-day free trial", "No credit card required", "Cancel anytime"].map((b) => (
              <li key={b} className="flex items-center gap-2 text-xs text-muted-foreground">
                <Check className="h-3.5 w-3.5 text-primary" /> {b}
              </li>
            ))}
          </ul>

          <div className="mt-6 pt-6 border-t border-border/50 text-center text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
