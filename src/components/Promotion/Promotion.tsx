"use client";
import { H6 } from "@/components/Headings/Headings";
import queryKeys from "@/utils/api/queryKeys";
import React, { useState } from "react";
import { useQuery } from "react-query";
import Dots from "@/assets/icons/dots-vertical.svg";
import dayjs from "dayjs";
import type { Meta } from "@/utils/api/calls";
import { usePagination } from "../Tables/Table/Pagination";
import { Table } from "../Tables/Table/Table";
import { convertGrpcDate } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import Input from "../Inputs/Input/Input";
import { getCampaigns } from "@/services/promotions/index";
import {
  IPromotion,
  PromotionFilter,
  PromotionStatus
} from "@/services/promotions/payload";
import FilterComponent from "./Filter/Filter";
import Modal from "../Modal/Modal";

const PromotionTable: React.FC<{
  Limit: number;
  hidePagination?: boolean;
  Filter: PromotionFilter;
  Promotion?: IPromotion;
}> = ({ Limit, Filter, hidePagination, Promotion }) => {
  const [Page, setPage] = useState(1);
  const [tableFilter, setTableFilter] = useState({ ...Filter });
  const [showFilterModal, setShowFilterModal] = useState(false);

  const { isLoading, refetch, data } = useQuery(
    [queryKeys.getPromotions, Limit, Page, tableFilter],
    () => getCampaigns({ Limit, Page, ...tableFilter })
  );

  const meta = (data?.data.Meta as Meta) || [];
  const promotion = (data?.data.Promotions as IPromotion[]) || [];

  const { currentPage, perPage, handlePageChange } = usePagination({
    defaultCurrentPage: 1,
    defaultPerPage: Limit,
    refetch: (page: number) => {
      setPage(page);
    }
  });

  console.log(Promotion && Promotion?.Requirement?.Promotions?.length);

  const router = useRouter();

  return (
    <div className="bg-white py-2 rounded-md">
      <H6 className="p-2 text-black">
        Promotion {<span>({Promotion?.Requirement?.Promotions?.length})</span>}
      </H6>
      <Table
        withPagination={!hidePagination}
        perPage={perPage}
        currentPage={currentPage}
        total={Promotion?.Requirement?.Promotions?.length}
        onPageChange={handlePageChange}
        headerColor="primary"
        onRowClick={(subscriptionDetails) =>
          router.push(`/promotions/${subscriptionDetails.Id}/subscription`)
        }
        errorMessage="You have not gotten any promotions"
        headerComponent={
          <div className="p-3 overflow-x-scroll">
            <div className="items-between flex w-full items-center justify-between gap-3">
              <div className="flex items-center justify-end gap-3">
                <div className="md:min-w-[200px]">
                  <Input
                    type="search"
                    placeholder="Promotion Id"
                    className="md:w-full border border-[#EAEAEA] outline-none placeholder:text-[#666666] w-[153px]"
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
                              Promotion?.Requirement?.Promotions?.filter(
                                (item: IPromotion) =>
                                  item.Status === PromotionStatus.ACTIVE
                              ).length
                            })`}
                          {promotionStatus === PromotionStatus.INACTIVE &&
                            `(${
                              Promotion?.Requirement?.Promotions?.filter(
                                (item: IPromotion) =>
                                  item.Status === PromotionStatus.INACTIVE
                              ).length
                            })`}
                          {promotionStatus === PromotionStatus.EXPIRED &&
                            `(${
                              Promotion?.Requirement?.Promotions?.filter(
                                (item: IPromotion) =>
                                  item.Status === PromotionStatus.EXPIRED
                              ).length
                            })`}
                        </div>
                      ))}
                  </span>
                </div>
              </div>
            </div>
          </div>
        }
        header={[
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
                  {item?.Id && item?.Id.slice(0, 10)}
                </div>
              );
            }
          },
          {
            key: "Name",
            title: "Name",
            width: "20%",
            headerClass:
              "font-matter py-2 px-3 whitespace-nowrap text-[12px] font-normal leading-[150%] text-white",
            render(_column, item) {
              return <div className="px-4">{item?.Name}</div>;
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
                  {item?.ShortDescription}
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
                  {dayjs(convertGrpcDate(item?.Created_at)).format(
                    "DD/MM/YYYY"
                  )}
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
                  {dayjs(convertGrpcDate(item?.Updated_at)).format(
                    "DD/MM/YYYY"
                  )}
                </div>
              );
            }
          },
          {
            key: "Status",
            title: "STATUS",
            headerClass:
              "font-matter py-2 whitespace-nowrap text-[12px] font-normal leading-[150%] text-white",
            width: "5%",
            render(_column, item) {
              if (!item?.Status) item.Status = PromotionStatus.INACTIVE;
              return (
                <div
                  className={` ${
                    (item?.Status === PromotionStatus.INACTIVE &&
                      "bg-warning50 text-warning400") ||
                    (item?.Status === PromotionStatus.ACTIVE &&
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
        data={Promotion?.Requirement?.Promotions || []}
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

export default PromotionTable;
