"use client";
import { H4 } from "@/components/Headings/Headings";
import queryKeys from "@/utils/api/queryKeys";
import React, { useState } from "react";
import { useQuery } from "react-query";
import Dots from "@/assets/icons/dots-vertical.svg";
import FilterIcon from "@/assets/icons/filter2.svg";
import dayjs from "dayjs";
import type { Meta } from "@/utils/api/calls";
import { usePagination } from "../Tables/Table/Pagination";
import { Table } from "../Tables/Table/Table";
import { convertGrpcDate } from "@/utils/helpers";
import Input from "../Inputs/Input/Input";
import { getMemberships } from "@/services/promotions/index";
import { useRouter } from "next/navigation";
import {
  IPromotion,
  PromotionFilter,
  PromotionStatus
} from "@/services/promotions/payload";
import FilterComponent from "./Filter/Filter";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";

const MembershipTable: React.FC<{
  Limit: number;
  hidePagination?: boolean;
  Filter: PromotionFilter;
}> = ({ Limit, Filter, hidePagination }) => {
  const [Page, setPage] = useState(1);
  const [tableFilter, setTableFilter] = useState({ ...Filter });
  const [showFilterModal, setShowFilterModal] = useState(false);

  const { isLoading, refetch, data } = useQuery(
    [queryKeys.getPromotions, Limit, Page, tableFilter],
    () => getMemberships({ Limit, ...tableFilter, Page })
  );
  const memberships = (data?.data.Promotions as IPromotion[]) || [];
  const meta = (data?.data.Meta as Meta) || [];

  const { currentPage, perPage, handlePageChange } = usePagination({
    defaultCurrentPage: 1,
    defaultPerPage: Limit,
    refetch: (page: number) => {
      setPage(page);
    }
  });

  const router = useRouter();

  return (
    <div className="bg-white p-2 rounded-md">
      <H4 className="p-2 text-black">
        Memberships {meta.TotalCount && <span>({meta.TotalCount})</span>}
      </H4>
      <Table
        withPagination={!hidePagination}
        perPage={perPage}
        currentPage={currentPage}
        total={meta.TotalCount}
        onPageChange={handlePageChange}
        headerColor="primary"
        errorMessage="You have not gotten any bookings"
        onRowClick={(subscriptionDetails) =>
          router.push(`/promotions/${subscriptionDetails.Id}/`)
        }
        headerComponent={
          <div className="p-3 overflow-x-scroll">
            <div className="items-between flex w-full items-center justify-between gap-3">
              <div className="flex items-center justify-end gap-3">
                <div className="md:min-w-[200px]">
                  <Input
                    type="search"
                    placeholder="Membership Id"
                    className="w-full border border-[#EAEAEA] outline-none placeholder:text-[#666666] max-[425px]:w-[153px]"
                    value={tableFilter.Id}
                    onChange={(ev) =>
                      setTableFilter({
                        ...tableFilter,
                        Id: ev.currentTarget.value
                      })
                    }
                  />
                </div>

                <div className="page-button-container">
                  <span className="page-button-wrapper flex gap-2">
                    <div
                      className={`rounded-full border w-17 px-2  py-2 text-center text-[12.54px]  hover:bg-white100. hover:text-primary400 hover:border-primary400 cursor-pointer   ${tableFilter.SearchStatus === false ? "text-primary400 border-primary400 " : "text-white800 border-white700"}`}
                      onClick={() => {
                        setTableFilter({ ...tableFilter, SearchStatus: false });
                      }}
                    >
                      All
                    </div>
                    {Object.values(PromotionStatus)
                      .filter((value) => typeof value === "string")
                      .map((promotionStatus) => (
                        <div
                          key={promotionStatus}
                          className={`rounded-full border  px-2 
                     
                       py-2 text-center text-[12.54px]  hover:bg-white100. hover:text-primary400 hover:border-primary400 cursor-pointer  ${tableFilter.Status === PromotionStatus[promotionStatus as keyof typeof PromotionStatus] && tableFilter.SearchStatus === true ? "text-primary400 border-primary400 " : "text-white800 border-white700 "}`}
                          onClick={() => {
                            setTableFilter({
                              ...tableFilter,
                              SearchStatus: true,
                              Status:
                              PromotionStatus[
                                  promotionStatus as keyof typeof PromotionStatus
                                ]
                            });
                          }}
                        >
                          {promotionStatus}

                          {promotionStatus === PromotionStatus.ACTIVE &&
                            `(${
                              memberships.filter(
                                (item: IPromotion) =>
                                  item.Status === PromotionStatus.ACTIVE
                              ).length
                            })`}
                          {promotionStatus === PromotionStatus.INACTIVE &&
                            `(${
                              memberships.filter(
                                (item: IPromotion) =>
                                  item.Status === PromotionStatus.INACTIVE
                              ).length
                            })`}
                          {promotionStatus === PromotionStatus.EXPIRED &&
                            `(${
                              memberships.filter(
                                (item: IPromotion) =>
                                  item.Status === PromotionStatus.EXPIRED
                              ).length
                            })`}
                        </div>
                      ))}
                  </span>
                </div>
              </div>
              <Button
                size="sm"
                color="outline-dark"
                variant="outline"
                onClick={() => setShowFilterModal(true)}
              >
                <span className="flex gap-2 px-3">
                  <FilterIcon /> Filter
                </span>
              </Button>
            </div>
          </div>
        }
        header={[
          {
            key: "Name",
            title: "Name",
            width: "20%",
            headerClass:
              "font-matter py-2 px-3 whitespace-nowrap text-[12px] font-normal leading-[150%] text-white",
            render(_column, item) {
              return <div className="px-4">{item.Name}</div>;
            }
          },
          {
            key: "ShortDescription",
            title: "SHORT DESCRIPTION",
            width: "30",
            headerClass:
              "font-matter  whitespace-nowrap text-[12px] font-normal leading-[150%] text-white",
            render(_column, item) {
              return (
                <div
                  className={`text-[var(--grey-grey-600, #5D6679);] text-[14px] leading-[150%]`}
                >
                  {item.ShortDescription}
                </div>
              );
            }
          },
          {
            key: "Id",
            title: "ID",
            width: "5%",
            headerClass:
              "font-matter  whitespace-nowrap text-[12px] font-normal leading-[150%] text-white",
            render(_column, item) {
              return (
                <div
                  className={`text-[var(--grey-grey-600, #5D6679);] text-[14px] leading-[150%]`}
                >
                  {item.Id && item?.Id.slice(0, 10)}
                </div>
              );
            }
          },
          {
            key: "Created_at",
            title: "CREATED AT",
            width: "5%",
            headerClass:
              "font-matter py-2 whitespace-nowrap text-[12px] font-normal leading-[150%] text-white",
            titleClass:
              "font-inter text-[10px] font-normal leading-[150%] text-black",
            render(_column, item) {
              return (
                <div
                  className={`text-[var(--grey-grey-600, #5D6679);] text-[14px] leading-[150%]`}
                >
                  {dayjs(convertGrpcDate(item.Created_at)).format("DD/MM/YYYY")}
                </div>
              );
            }
          },
          {
            key: "Updated_at",
            title: "LAST UPDATED",
            width: "5%",
            headerClass:
              "font-matter py-2 whitespace-nowrap text-[12px] font-normal leading-[150%] text-white",
            titleClass:
              "font-inter text-[10px] font-normal leading-[150%] text-black",
            render(_column, item) {
              return (
                <div
                  className={`text-[var(--grey-grey-600, #5D6679);] text-[14px] leading-[150%]`}
                >
                  {dayjs(convertGrpcDate(item.Updated_at)).format("DD/MM/YYYY")}
                </div>
              );
            }
          },
          {
            key: "Status",
            title: "PROMOTION STATUS",
            headerClass:
              "font-matter py-2 whitespace-nowrap text-[12px] font-normal leading-[150%] text-white",
            width: "5%",
            render(_column, item) {
              if (!item.Status) item.Status = PromotionStatus.INACTIVE;
              return (
                <div
                  className={` ${
                    (item.Status === PromotionStatus.INACTIVE &&
                      "bg-warning50 text-warning400") ||
                    (item.Status === PromotionStatus.ACTIVE &&
                      "bg-success50 text-success400") ||
                    "bg-danger50  text-danger400"
                  }    inline-block rounded-full px-4 py-1`}
                >
                  <div className="text-center text-[12px]">
                    {item?.Status === PromotionStatus.INACTIVE && "Inactive"}
                    {item?.Status === PromotionStatus.ACTIVE && "Active"}
                    {item?.Status === PromotionStatus.EXPIRED && "Expired"}
                  </div>
                </div>
              );
            }
          },
          {
            key: "more",
            title: "",
            width: "1%",
            render() {
              return <Dots className="mr-6 cursor-pointer" />;
            }
          }
        ]}
        data={memberships}
        isLoading={isLoading}
      />
      <Modal
        openModal={showFilterModal}
        setOpenModal={setShowFilterModal}
        variant="plain"
      >
        <FilterComponent
          filter={tableFilter}
          onClose={() => setShowFilterModal(false)}
          setFilter={(filter) => {
            setTableFilter(filter);
          }}
        />
      </Modal>
    </div>
  );
};

export default MembershipTable;
