import { Link } from "react-router";
import { Sparkles } from "lucide-react";

export function BrandLogo() {
  return (
    <Link to="/app" className="flex items-center gap-2 flex-shrink-0 group">
      <div className="size-9 rounded-full bg-primary flex items-center justify-center transition-all group-hover:rotate-12">
        <Sparkles className="size-5 text-primary-foreground" />
      </div>
      <span className="text-lg font-bold tracking-tight text-foreground hidden sm:block">
        ApplySmart
      </span>
    </Link>
  );
}
