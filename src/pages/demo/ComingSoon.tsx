import { Construction } from "lucide-react";

interface Props {
  title: string;
  description: string;
}

export const ComingSoon = ({ title, description }: Props) => (
  <div className="space-y-5 animate-fade-up">
    <div>
      <h1 className="font-display text-3xl font-bold tracking-tighter">{title}</h1>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
    </div>
    <div className="glass rounded-2xl p-12 text-center">
      <Construction className="h-12 w-12 text-primary mx-auto mb-4" />
      <h2 className="font-display text-2xl font-bold mb-2">Coming in Phase 2</h2>
      <p className="text-sm text-muted-foreground max-w-md mx-auto">
        This page will be built out next. The route is wired so navigation works correctly.
      </p>
    </div>
  </div>
);

export default ComingSoon;
