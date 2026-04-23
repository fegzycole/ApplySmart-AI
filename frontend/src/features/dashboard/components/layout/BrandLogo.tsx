import { Link } from "react-router";
import { Sparkles } from "lucide-react";

export function BrandLogo() {
  return (
    <Link to="/app" className="flex items-center gap-2 flex-shrink-0">
      <div className="size-8 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center">
        <Sparkles className="size-5 text-white" />
      </div>
      <span className="text-lg font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent hidden sm:block">
        ApplySmart AI
      </span>
    </Link>
  );
}
