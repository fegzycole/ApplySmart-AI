
export function getPageNumbers(currentPage: number, totalPages: number, maxVisible: number = 7): (number | string)[] {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | string)[] = [];
  const halfVisible = Math.floor(maxVisible / 2);

  pages.push(1);

  let start = Math.max(2, currentPage - halfVisible);
  let end = Math.min(totalPages - 1, currentPage + halfVisible);

  if (currentPage <= halfVisible + 1) {
    end = maxVisible - 1;
  }

  if (currentPage >= totalPages - halfVisible) {
    start = totalPages - maxVisible + 2;
  }

  if (start > 2) {
    pages.push('...');
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < totalPages - 1) {
    pages.push('...');
  }

  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
}

export function calculateItemRange(currentPage: number, itemsPerPage: number, totalItems: number) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  return { startItem, endItem };
}
