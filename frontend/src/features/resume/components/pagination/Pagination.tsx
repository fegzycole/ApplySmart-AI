import { Card, CardContent } from "@/shared/components/ui/card";
import { DesktopPagination } from "./DesktopPagination";
import { MobilePagination } from "./MobilePagination";
import { calculateItemRange } from "../../utils/pagination.utils";
import { PAGINATION_CONFIG } from "../../constants/pagination.constants";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const { startItem, endItem } = calculateItemRange(currentPage, itemsPerPage, totalItems);

  return (
    <Card className={PAGINATION_CONFIG.cardClassName}>
      <CardContent className="p-4">
        <DesktopPagination
          currentPage={currentPage}
          totalPages={totalPages}
          startItem={startItem}
          endItem={endItem}
          totalItems={totalItems}
          onPageChange={onPageChange}
        />

        <MobilePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </CardContent>
    </Card>
  );
}
