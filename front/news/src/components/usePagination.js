import { useState, useMemo } from 'react';

export default function usePagination(items, pageCap) {
  const [pageItems, setPageItems] = useState(items.slice(0, pageCap));
  const [page, setPage] = useState(1);
  const pagesAmount = useMemo(() => Math.ceil(items.length / pageCap), [items, pageCap]);

  function changePage(page) {
    // normalize between 1 and pagesAmount
    const nextPage = Math.min(Math.max(1, page), pagesAmount);
    const start = (nextPage - 1) * pageCap;
    const end = start + pageCap;
    setPage(nextPage);
    setPageItems(items.slice(start, end));
  }

  return [
    // items in current page
    pageItems,
    // function to change page
    changePage,
    // binder for material-ui pagination
    {
      count: pagesAmount,
      page,
      onChange: (_, newPage) => changePage(newPage),
    },
  ];
};