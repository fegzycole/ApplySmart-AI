import { ChevronLeft, ChevronRight } from "lucide-react";
import { PaginationButton } from "./PaginationButton";
import { PAGINATION_CONFIG } from "../../constants/pagination.constants";

interface MobilePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function MobilePagination({ currentPage, totalPages, onPageChange }: MobilePaginationProps) {
  return (
    <div className="lg:hidden">
      <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 text-center">
        Page <span className="font-semibold text-zinc-900 dark:text-white">{currentPage}</span> of{" "}
        <span className="font-semibold text-zinc-900 dark:text-white">{totalPages}</span>
      </div>
      <div className="flex items-center justify-between gap-2">
        <PaginationButton
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          icon={ChevronLeft}
          className={`flex-1 ${PAGINATION_CONFIG.buttonClassName}`}
        >
          Previous
        </PaginationButton>

        <PaginationButton
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          icon={ChevronRight}
          iconPosition="right"
          className={`flex-1 ${PAGINATION_CONFIG.buttonClassName}`}
        >
          Next
        </PaginationButton>
      </div>
    </div>
  );
}
