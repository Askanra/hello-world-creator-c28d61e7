interface Section {
  title: string;
  body: React.ReactNode;
}

export const LegalLayout = ({ title, subtitle, sections }: { title: string; subtitle?: string; sections: Section[] }) => {
  return (
    <div className="container py-16 md:py-24 max-w-4xl">
      <p className="text-xs font-mono uppercase tracking-widest text-primary mb-4">// Legal</p>
      <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tighter mb-4">{title}</h1>
      {subtitle && <p className="text-muted-foreground mb-12">{subtitle}</p>}

      <div className="space-y-10">
        {sections.map((s) => (
          <section key={s.title}>
            <h2 className="font-display text-2xl font-semibold mb-3">{s.title}</h2>
            <div className="text-muted-foreground leading-relaxed space-y-3">{s.body}</div>
          </section>
        ))}
      </div>
    </div>
  );
};
