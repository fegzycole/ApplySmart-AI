import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { PaginationButton } from "./PaginationButton";
import { PaginationInfo } from "./PaginationInfo";
import { PageNumbers } from "./PageNumbers";
import { PAGINATION_CONFIG } from "../../constants/pagination.constants";

interface DesktopPaginationProps {
  currentPage: number;
  totalPages: number;
  startItem: number;
  endItem: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export function DesktopPagination({
  currentPage,
  totalPages,
  startItem,
  endItem,
  totalItems,
  onPageChange
}: DesktopPaginationProps) {
  return (
    <div className="hidden lg:flex items-center justify-between">
      <PaginationInfo
        startItem={startItem}
        endItem={endItem}
        totalItems={totalItems}
        itemLabel={PAGINATION_CONFIG.itemLabel}
      />

      <div className="flex items-center gap-2">
        <PaginationButton
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          icon={ChevronsLeft}
          className={PAGINATION_CONFIG.buttonClassName}
        />

        <PaginationButton
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          icon={ChevronLeft}
          className={PAGINATION_CONFIG.buttonClassName}
        >
          Previous
        </PaginationButton>

        <PageNumbers
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />

        <PaginationButton
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          icon={ChevronRight}
          iconPosition="right"
          className={PAGINATION_CONFIG.buttonClassName}
        >
          Next
        </PaginationButton>

        <PaginationButton
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          icon={ChevronsRight}
          className={PAGINATION_CONFIG.buttonClassName}
        />
      </div>
    </div>
  );
}
