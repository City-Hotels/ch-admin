"use client";
import { H4 } from "@/components/Headings/Headings";
import queryKeys from "@/utils/api/queryKeys";
import React, { useState, useRef, useEffect } from "react";
import { useQuery } from "react-query";
import Dots from "@/assets/icons/dots-vertical.svg";
import FilterIcon from "@/assets/icons/filter2.svg";
import dayjs from "dayjs";
import type { Meta } from "@/utils/api/calls";
import { usePagination } from "../Tables/Table/Pagination";
import { Table } from "../Tables/Table/Table";
import { convertGrpcDate } from "@/utils/helpers";
import Input from "../Inputs/Input/Input";
import { getPromotionSubcriptions } from "@/services/promotions/index";
import {
  ISubscribers,
  SubscriptionFilter,
  SubscriptionStatus
} from "@/services/promotions/payload";
import FilterComponent from "./Filter/Filter";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import SubscriptionSearch from "../SubscriptionSearchModal/SubscriptionSearch";

const SubscribtionsTable: React.FC<{
  Limit: number;
  hidePagination?: boolean;
  Filter: SubscriptionFilter;
}> = ({ Limit, Filter, hidePagination }) => {
  const [Page, setPage] = useState(1);
  const [tableFilter, setTableFilter] = useState({ ...Filter });
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [openSubscriptionModal, setOpenSubscriptionModal] = useState(false);
  const promotionId = Filter.PromotionId;
  console.log("Promotion Id:" + promotionId);

  const tableRef = useRef<HTMLDivElement>(null);

  const { isLoading, refetch, data } = useQuery(
    [
      queryKeys.getPromotionsSubscriptions,
      Limit,
      Page,
      tableFilter,
      promotionId
    ],
    () => getPromotionSubcriptions({ Limit, ...tableFilter, Page })
  );

  const subcriptions = (data?.data.Subscribers as ISubscribers[]) || [];
  const meta = (data?.data.Meta as Meta) || [];

  const { currentPage, perPage, handlePageChange } = usePagination({
    defaultCurrentPage: 1,
    defaultPerPage: Limit,
    refetch: (page: number) => {
      setPage(page);
    }
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openSubscriptionModal &&
        tableRef.current &&
        !tableRef.current.contains(event.target as Node)
      ) {
        setOpenSubscriptionModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openSubscriptionModal]);

  return (
    <div className="bg-white p-2 rounded-md relative z-10" ref={tableRef}>
      <H4 className="p-2 text-black">
        Subscriptions {meta.TotalCount && <span>({meta.TotalCount})</span>}
      </H4>
      <Table
        withPagination={!hidePagination}
        perPage={perPage}
        currentPage={currentPage}
        total={meta.TotalCount}
        onPageChange={handlePageChange}
        headerColor="primary"
        errorMessage="You have not gotten any subscriptions"
        headerComponent={
          <div className="p-3 overflow-x-scroll">
            <div className="items-between flex w-full items-center justify-between gap-3">
              <div className="flex items-center justify-end gap-3">
                <div className="md:min-w-[200px]">
                  <Input
                    type="search"
                    placeholder="Service Id"
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
                    {Object.values(SubscriptionStatus)
                      .filter((value) => typeof value === "string")
                      .map((subscriptionStatus) => (
                        <div
                          key={subscriptionStatus}
                          className={`rounded-full border  px-2 
                     
                       py-2 text-center text-[12.54px]  hover:bg-white100. hover:text-primary400 hover:border-primary400 cursor-pointer  ${tableFilter?.Status === SubscriptionStatus[subscriptionStatus as keyof typeof SubscriptionStatus] && tableFilter.SearchStatus === true ? "text-primary400 border-primary400 " : "text-white800 border-white700 "}`}
                          onClick={() => {
                            setTableFilter({
                              ...tableFilter,
                              SearchStatus: true,
                              Status:
                                SubscriptionStatus[
                                  subscriptionStatus as keyof typeof SubscriptionStatus
                                ]
                            });
                          }}
                        >
                          {subscriptionStatus}

                          {subscriptionStatus === SubscriptionStatus.ACTIVE &&
                            `(${
                              subcriptions.filter(
                                (item: ISubscribers) =>
                                  item.Status === SubscriptionStatus.ACTIVE
                              ).length
                            })`}
                          {subscriptionStatus === SubscriptionStatus.INACTIVE &&
                            `(${
                              subcriptions.filter(
                                (item: ISubscribers) =>
                                  item.Status === SubscriptionStatus.INACTIVE
                              ).length
                            })`}
                          {subscriptionStatus === SubscriptionStatus.EXPIRED &&
                            `(${
                              subcriptions.filter(
                                (item: ISubscribers) =>
                                  item.Status === SubscriptionStatus.EXPIRED
                              ).length
                            })`}
                        </div>
                      ))}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="">
                  <Button
                    size="sm"
                    color="primary"
                    className="w-[130px]"
                    onClick={() =>
                      setOpenSubscriptionModal(!openSubscriptionModal)
                    }
                  >
                    Add Subscription
                  </Button>

                  {openSubscriptionModal && (
                    <div className="absolute top-10 right-1 z-999">
                      <SubscriptionSearch
                        className=""
                        onApartmentSelected={refetch}
                        promotionId={promotionId}
                        setOpenSubscription={setOpenSubscriptionModal}
                      />
                    </div>
                  )}
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
          </div>
        }
        header={[
          {
            key: "Id",
            title: "Service ID",
            width: "5%",
            headerClass:
              "font-matter  whitespace-nowrap text-[12px] font-normal leading-[150%] text-white",
            render(_column, item) {
              return (
                <div
                  className={`text-[var(--grey-grey-600, #5D6679);] text-[14px] leading-[150%]`}
                >
                  {item.Service?.Id && item.Service.Id.slice(0, 10)}
                </div>
              );
            }
          },
          {
            key: "Name",
            title: "Name",
            width: "5%",
            headerClass:
              "font-matter py-2 px-3 whitespace-nowrap text-[12px] font-normal leading-[150%] text-white",
            render(_column, item) {
              return <div className="px-4">{item.Service?.Name}</div>;
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
                  {dayjs(convertGrpcDate(item.Updated_at)).format("DD/MM/YYYY")}
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
              if (!item.Status) item.Status = SubscriptionStatus.INACTIVE;
              return (
                <div
                  className={` ${
                    (item.Status === SubscriptionStatus.INACTIVE &&
                      "bg-warning50 text-warning400") ||
                    (item.Status === SubscriptionStatus.ACTIVE &&
                      "bg-success50 text-success400") ||
                    "bg-danger50  text-danger400"
                  }    inline-block rounded-full px-4 py-1`}
                >
                  <div className="text-center text-[12px]">
                    {item.Status === SubscriptionStatus.INACTIVE && "Inactive"}
                    {item.Status === SubscriptionStatus.ACTIVE && "Active"}
                    {item.Status === SubscriptionStatus.EXPIRED && "Expired"}
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
        data={subcriptions}
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

export default SubscribtionsTable;
