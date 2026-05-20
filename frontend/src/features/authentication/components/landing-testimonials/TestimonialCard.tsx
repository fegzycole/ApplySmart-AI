import { Card, CardContent } from "@/shared/components/ui/card";
import { cn } from "@/shared/lib/utils";

interface TestimonialCardProps {
  quote: string;
  author: {
    name: string;
    role: string;
    initials: string;
  };
  gradient: {
    card: string;
    avatar: string;
  };
}

export function TestimonialCard({ quote, author, gradient }: TestimonialCardProps) {
  return (
    <Card
      className={cn(
        "transform border-0 bg-gradient-to-br shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl",
        gradient.card,
      )}
    >
      <CardContent className="pt-8">
        <div className="flex gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="size-5 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <span className="text-white text-xs">★</span>
            </div>
          ))}
        </div>
        <p className="text-zinc-700 dark:text-zinc-300 mb-6 text-lg leading-relaxed">
          {quote}
        </p>
        <div className="flex items-center gap-4">
          <div className={cn("flex size-12 items-center justify-center rounded-full bg-gradient-to-br shadow-lg", gradient.avatar)}>
            <span className="text-white font-semibold">{author.initials}</span>
          </div>
          <div>
            <p className="font-semibold text-zinc-900 dark:text-white">{author.name}</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{author.role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
