import { PaginationButton } from "./PaginationButton";
import { getPageNumbers } from "../../utils/pagination.utils";
import { PAGINATION_CONFIG } from "../../constants/pagination.constants";

interface PageNumbersProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PageNumbers({ currentPage, totalPages, onPageChange }: PageNumbersProps) {
  const pageNumbers = getPageNumbers(currentPage, totalPages, PAGINATION_CONFIG.maxVisiblePages);

  return (
    <div className="flex items-center gap-1.5 px-4">
      {pageNumbers.map((page, index) => {
        if (page === '...') {
          return (
            <span key={`ellipsis-${index}`} className="px-2 text-zinc-400 dark:text-zinc-600">
              •••
            </span>
          );
        }

        const pageNumber = page as number;
        const isActive = pageNumber === currentPage;

        return (
          <PaginationButton
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            active={isActive}
            className={
              isActive
                ? PAGINATION_CONFIG.activeButtonClassName
                : `size-9 ${PAGINATION_CONFIG.buttonClassName}`
            }
          >
            {pageNumber}
          </PaginationButton>
        );
      })}
    </div>
  );
}
