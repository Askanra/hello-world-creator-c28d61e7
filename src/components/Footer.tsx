import { Link } from "react-router-dom";
import { Github, MessageCircle, Twitter } from "lucide-react";
import logo from "@/assets/axyrix-logo.png";

export const Footer = () => {
  return (
    <footer className="border-t border-border/50 mt-24 pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <img src={logo} alt="Axyrix" className="h-10 w-10" />
              <span className="font-display font-bold text-xl">AXYRIX</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Next-generation FiveM anticheat. Built for serious server owners who refuse to compromise on security.
            </p>
            <div className="flex gap-2 mt-5">
              <a href="#" aria-label="Discord" className="p-2 rounded-lg glass hover:text-primary transition">
                <MessageCircle className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Twitter" className="p-2 rounded-lg glass hover:text-primary transition">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" aria-label="GitHub" className="p-2 rounded-lg glass hover:text-primary transition">
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm mb-4">Product</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/features" className="hover:text-primary">Features</Link></li>
              <li><Link to="/pricing" className="hover:text-primary">Pricing</Link></li>
              <li><Link to="/docs" className="hover:text-primary">Documentation</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
              <li><Link to="/imprint" className="hover:text-primary">Imprint</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm mb-4">Legal</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary">Terms of Service</Link></li>
              <li><Link to="/refund" className="hover:text-primary">Refund Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Axyrix Anticheat. All rights reserved.</p>
          <p className="font-mono text-xs">v1.0.0 · STATUS: <span className="text-primary">OPERATIONAL</span></p>
        </div>
      </div>
    </footer>
  );
};
