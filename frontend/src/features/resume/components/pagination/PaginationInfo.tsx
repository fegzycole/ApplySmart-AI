interface PaginationInfoProps {
  startItem: number;
  endItem: number;
  totalItems: number;
  itemLabel: string;
}

export function PaginationInfo({ startItem, endItem, totalItems, itemLabel }: PaginationInfoProps) {
  return (
    <div className="text-sm text-zinc-600 dark:text-zinc-400">
      Showing <span className="font-semibold text-zinc-900 dark:text-white">{startItem}</span> to{" "}
      <span className="font-semibold text-zinc-900 dark:text-white">{endItem}</span> of{" "}
      <span className="font-semibold text-zinc-900 dark:text-white">{totalItems}</span> {itemLabel}
    </div>
  );
}
