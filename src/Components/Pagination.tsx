import { usePagination } from 'lib/usePagination';
import React from 'react';

export default function Pagination({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  className
}: {
  onPageChange: (currentPage: number | string) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  className: string;
}) {

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange?.filter(i => i === (Number(paginationRange?.length) - 1));

  return (
    <ul
      className="pagination-container"
    >
      <li
        className="pagination-item"
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange?.map(pageNumber => {
        if (pageNumber === '...') {
          return <li className="pagination-item dots">&#8230;</li>;
        }

        return (
          <li
            className={`${pageNumber === currentPage ? className : 'pagination-item'}`}
            onClick={() => onPageChange(pageNumber)}
            key={pageNumber}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={`${currentPage === Number(lastPage) ? className : 'pagination-item'}`}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
}
