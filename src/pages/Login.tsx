import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, ArrowRight } from "lucide-react";
import { demoLogin } from "@/lib/demoAuth";
import { toast } from "sonner";
import logo from "@/assets/axyrix-logo.png";

const Login = () => {
  const nav = useNavigate();
  const [email, setEmail] = useState("demo@axyrix.gg");
  const [password, setPassword] = useState("demo1234");
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      demoLogin(email);
      toast.success("Welcome back to Axyrix");
      nav("/dashboard");
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 grid-bg relative">
      <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />
      <div className="relative w-full max-w-md animate-fade-up">
        <Link to="/" className="flex items-center gap-2.5 mb-10 justify-center">
          <img src={logo} alt="Axyrix" className="h-10 w-10" />
          <span className="font-display font-bold text-xl tracking-tight">AXYRIX</span>
        </Link>

        <div className="glass rounded-2xl p-8 shadow-elegant">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono mb-4">
              <Shield className="h-3 w-3 text-primary" /> CLIENT AREA
            </div>
            <h1 className="font-display text-3xl font-bold tracking-tighter">Welcome back</h1>
            <p className="text-sm text-muted-foreground mt-1">Sign in to manage your servers</p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <button type="button" className="text-xs text-primary hover:underline">Forgot?</button>
              </div>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>

            <Button type="submit" variant="hero" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : <>Sign in <ArrowRight className="ml-1 h-4 w-4" /></>}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border/50 text-center text-sm text-muted-foreground">
            No account? <Link to="/register" className="text-primary hover:underline">Create one</Link>
          </div>

          <div className="mt-4 text-xs text-center text-muted-foreground/60 font-mono">
            DEMO MODE — any credentials work
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
