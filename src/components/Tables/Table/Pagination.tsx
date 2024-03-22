import React, { useMemo } from "react";
import ArrowBackIcon from "@/assets/icons/chevron-left.svg";
import ArrowForwardIcon from "@/assets/icons/chevron-right.svg";
import Button from "@/components/Button/Button";

export interface IPagination {
  total: number;
  perPage: number;
  currentPage: number;
  totalPages: number;
  updatePerPage: (perPage: number) => void;
  onPageChange: (page: number) => void;
}

export interface IPaginationApi {
  start: number;
  length: number;
  total: number;
}

const Pagination = ({
  total,
  perPage,
  currentPage,
  totalPages,
  onPageChange
}: IPagination) => {

  const handlePageChange = (page: number) => {
    if (
      page > 0 &&
      page <= Math.ceil(total / perPage) &&
      page !== currentPage
    ) {
      onPageChange(page);
    }
  };

  const pages = useMemo(
    () =>
      new Array(totalPages)
        .fill(0)
        .map((_item, index) => index + 1),
    [total, perPage]
  );

  return (
    <div className="mt-3 flex w-full items-center justify-between px-6-=0 text-sm">
      <Button
        size="sm"
        color="text"
        variant="text"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <ArrowBackIcon />
      </Button>
      <div className="flex items-center justify-start gap-6 text-[#243757]">
        {new Array(totalPages)
          .fill(0)
          .map((_item, index) => index + 1)
          .filter((item) => currentPage - 3 < item || currentPage < 3)
          .filter((_item, i) => i < 4)
          .map((item) => (
            <div
              key={`pagination-icon-${item}`}
              onClick={() => handlePageChange(item)}
              className={`cursor-pointer font-inter  text-[14px] leading-5${item === currentPage
                ? " rounded-lg bg-orange50 p-3 text-orange500"
                : ""
                }`}
            >
              {item}{" "}
            </div>
          ))}
      </div>
      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        color="text"
        variant="text"
        disabled={currentPage === pages.length}
      >
        <ArrowForwardIcon />
      </Button>
    </div>
  );
};

export default Pagination;

interface IUsePagination {
  defaultPerPage?: number;
  defaultCurrentPage?: number;
  refetch?: (page: number, perPage: number) => void;
}

export const usePagination = ({
  defaultPerPage = 10,
  defaultCurrentPage = 1,
  refetch
}: IUsePagination) => {
  const [currentPage, setCurrentPage] = React.useState(defaultCurrentPage);
  const [perPage, setPerPage] = React.useState(defaultPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (refetch) refetch(currentPage, perPage);
  };

  const handleLimitChange = (limit: number) => {
    setPerPage(perPage);
    if (refetch) refetch(currentPage, limit);
  };

  return {
    currentPage,
    perPage,
    handlePageChange,
    handleLimitChange
  };
};
