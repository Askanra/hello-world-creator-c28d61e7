import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "How long does setup take?", a: "About 5 minutes. Drop the resource into your server, add it to your server.cfg, paste your license key, restart. We have a one-page quickstart in the docs." },
  { q: "Will Axyrix slow down my server?", a: "No. Axyrix is engineered with native modules and async pipelines. Most servers see <1ms added per tick. We benchmark against 32, 64 and 128-slot loads on every release." },
  { q: "Which frameworks do you support?", a: "ESX, QBCore, QBox, vRP and standalone setups. Detection logic doesn't depend on your framework — we hook the engine, not your scripts." },
  { q: "What about false positives?", a: "Every detection runs through a multi-signal validation chain before issuing a ban. Our public false positive rate has been under 0.01% for the past 6 months." },
  { q: "Is it CFX-compliant?", a: "Yes. Axyrix is fully escrowed and listed on the Tebex platform. We do not collect personal data, and we are reviewed by the CFX team." },
  { q: "Can banned cheaters come back?", a: "Hardware fingerprinting + cross-server intelligence makes it extremely difficult. Banned HWIDs are flagged across the entire Axyrix network the moment they connect anywhere." },
  { q: "Do you offer refunds?", a: "Yes — 7-day money back, no questions asked. See our Refund Policy for details." },
  { q: "How fast do you ship updates?", a: "We ship updates every 2-3 days on average. Critical patches for new cheat releases usually go out within 24 hours of detection." },
];

export const FAQ = () => (
  <section className="py-32">
    <div className="container max-w-4xl">
      <div className="text-center mb-16">
        <p className="text-xs font-mono uppercase tracking-widest text-primary mb-4">// FAQ</p>
        <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter">
          Common <span className="text-gradient">questions</span>.
        </h2>
      </div>

      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((f, i) => (
          <AccordionItem key={f.q} value={`item-${i}`} className="glass rounded-xl border-0 px-6">
            <AccordionTrigger className="text-left font-display font-semibold text-base hover:no-underline">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed pb-5">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);
