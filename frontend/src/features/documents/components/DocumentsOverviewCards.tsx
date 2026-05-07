import { Card, CardContent } from "@/shared/components/ui/card";
import { DOCUMENT_OVERVIEW_CARDS } from "../constants/documents.constants";
import type { DocumentsOverview } from "../types/documents.types";

interface DocumentsOverviewCardsProps {
  overview: DocumentsOverview;
}

export function DocumentsOverviewCards({ overview }: DocumentsOverviewCardsProps) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {DOCUMENT_OVERVIEW_CARDS.map((card) => {
        const Icon = card.icon;
        const value = overview[card.key];

        return (
          <Card
            key={card.key}
            className="rounded-[1.35rem] border border-zinc-200/80 bg-white/80 shadow-lg shadow-zinc-200/30 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/80 dark:shadow-black/20"
          >
            <CardContent className="space-y-4 p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    {card.title}
                  </p>
                  <p className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-zinc-950 dark:text-white">
                    {value}
                  </p>
                </div>
                <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 text-white shadow-lg shadow-violet-500/25">
                  <Icon className="size-5" />
                </div>
              </div>
              <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {card.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}
