"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { FC } from "react";
import { DOTS, usePagination } from "../../app/(authenticated)/(admin)/dashboard/news/_components/usePagination";

const Pagination: FC<{ totalPages: number }> = ({ totalPages }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    if (pageNumber !== DOTS) params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const paginationRange = usePagination({
    currentPage,
    totalCount: totalPages,
    pageSize: 10,
  });

  return (
    <div className={"mt-4 flex gap-1"}>
      <Link href={createPageURL(currentPage - 1)}>
        <ChevronLeftIcon
          className={`w-5 h-5 ${currentPage === 1 ? "text-gray-400" : ""}`}
        />
      </Link>
      {paginationRange?.map((pageNumber) => (
        <Link
          key={`paginator-${pageNumber}`}
          href={createPageURL(pageNumber)}
          className={`${
            pageNumber === DOTS
              ? "text-gray-400 cursor-not-allowed"
              : "text-black"
          } `}
        >
          {pageNumber}
        </Link>
      ))}
      <Link href={createPageURL(currentPage + 1)}>
        <ChevronRightIcon
          className={`w-5 h-5 ${
            currentPage === totalPages ? "text-gray-400" : ""
          }`}
        />
      </Link>
    </div>
  );
};

export default Pagination;
