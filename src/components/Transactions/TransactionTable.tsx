"use client";
import { H4 } from "@/components/Headings/Headings";
import queryKeys from "@/utils/api/queryKeys";
import React, { useState } from "react";
import { useQuery } from "react-query";
import Dots from "@/assets/icons/dots-vertical.svg";
import dayjs from "dayjs";
import type { Meta } from "@/utils/api/calls";
import { usePagination } from "../Tables/Table/Pagination";
import { Table } from "../Tables/Table/Table";
import Modal from "@/components/Modal/Modal";
import FilterComponent from "./Filter/Filter";
import { convertGrpcDate, formatCurrencyNoSymbol } from "@/utils/helpers";
import {
  ITransaction,
  TransactionFilter,
  TransactionType,
  TransactionFilterStatus,
  ITransactionFilter
} from "@/services/transactions/payload";
import { getTransactions } from "@/services/transactions/index";
import Input from "../Inputs/Input/Input";
import Button from "../Button/Button";
import FilterIcon from "@/assets/icons/filter2.svg";

const TransactionTable: React.FC<{
  Limit: number;
  hidePagination?: boolean;
  Filter: TransactionFilter;
}> = ({ Limit, Filter, hidePagination }) => {

const [filters, setFilters] = useState({ ...Filter })

const [showFilterModal, setShowFilterModal] = useState(false);

  const [Page, setPage] = useState(1);


  const { isLoading, data } = useQuery(
    [queryKeys.getUserTransactions, Limit, Page, filters],
    () => getTransactions({ Limit, ...filters, Page })
  );

  const transactions = (data?.data.Transactions as ITransaction[]) || [];
  const meta = (data?.data.Meta as Meta) || [];

  console.log(transactions);

  const { currentPage, perPage, handlePageChange } = usePagination({
    defaultCurrentPage: 1,
    defaultPerPage: Limit,
    refetch: (page: number) => {
      setPage(page);
    }
  });

  return (
    <div className="bg-white p-2 rounded-md">
      <Table
        withPagination={!hidePagination}
        perPage={perPage}
        currentPage={currentPage}
        total={meta.TotalCount}
        onPageChange={handlePageChange}
        headerColor="primary"
        errorMessage="You have not gotten any bookings"
        headerComponent={
          <div>
            <div className="items-between  w-full items-center justify-between gap-3 ml-1">
              <H4>Transactions({transactions.length})</H4>


              <div className="flex items-center justify-end gap-3 mr-36 mt-5">
                <div className="md:min-w-[200px]">
                  <Input
                    type="search"
                    placeholder="Transaction Id"
                    className="w-full border border-[#EAEAEA] outline-none placeholder:text-[#666666] "
                    value={filters.UserId}
                    onChange={(ev) => setFilters({ ...filters, UserId: ev.currentTarget.value })}
                  />
                </div>

                <div className="page-button-container">
                  <span className="page-button-wrapper flex gap-2">
                    <div
                      className={`rounded-full border w-17 px-2  py-2 text-center text-[12.54px]  hover:bg-white100. hover:text-primary400 hover:border-primary400 cursor-pointer   ${filters.Type === undefined ? 'text-primary400 border-primary400 ' : 'text-white800 border-white700'}`}
                      onClick={() => {
                        setFilters({ ...filters, Type: undefined })
                      }}
                    >All ({meta.TotalCount})</div>
                    {Object.values( TransactionType)
                      .filter((value) => typeof value === "string")
                      .map((transactiontype) => (
                        <div
                          key={transactiontype}
                          className={`rounded-full border  px-2 
                       
                         py-2 text-center text-[12.54px]  hover:bg-white100. hover:text-primary400 hover:border-primary400 cursor-pointer 
                          ${filters.Type ===  TransactionType[transactiontype as keyof typeof  TransactionType] ? 'text-primary400 border-primary400 ' : 'text-white800 border-white700 '}`}
                          onClick={() => {
                            setFilters({ ...filters, Status: TransactionFilterStatus [transactiontype as keyof typeof TransactionFilterStatus] })
                          }}
                        >
                          {transactiontype}
                          {`(${transactions.length})`}

                          {transactiontype === TransactionType.WALLETFUND &&
                            `(${transactions.filter(
                              (item: ITransaction) =>
                                item.TransactionType=== TransactionType.WALLETFUND
                            ).length
                            })`}
                          {transactiontype === TransactionType.BOOKING &&
                            `(${transactions.filter(
                              (item: ITransaction) =>
                                item.TransactionType === TransactionType.BOOKING
                            ).length
                            })`}
                          {transactiontype === TransactionType.WITHDRAWAL &&
                            `(${transactions.filter(
                              (item: ITransaction) =>
                                item.TransactionType === TransactionType.WITHDRAWAL
                            ).length
                            })`}
                        </div>
                      ))}
                  </span>
                </div>
                <Button size="sm" color="outline-dark" variant="outline" onClick={() => setShowFilterModal(true)}>
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
            key: "Credit",
            title: "CREDIT",
            width: "15%",
            headerClass:
              "font-matter py-2 px-3 whitespace-nowrap text-[12px] font-normal leading-[150%] text-white",
            render(_column, item) {
              return (
                <div className="px-4">
                  {formatCurrencyNoSymbol(item.Credit || 0)}
                </div>
              );
            }
          },
          {
            key: "Debit",
            title: "DEBIT",
            width: "15%",
            headerClass:
              "font-matter py-2 px-3 whitespace-nowrap text-[12px] font-normal leading-[150%] text-white",
            render(_column, item) {
              return (
                <div className="px-4">
                  {formatCurrencyNoSymbol(item.Debit || 0)}
                </div>
              );
            }
          },
          {
            key: "Description",
            title: "DESCRIPTION",
            width: "10%",
            headerClass:
              "font-matter  whitespace-nowrap text-[12px] font-normal leading-[150%] text-white",
            render(_column, item) {
              return (
                <div
                  className={`text-[var(--grey-grey-600, #5D6679);] text-[14px] leading-[150%]`}
                >
                  {item.Description}
                </div>
              );
            }
          },
          {
            key: "ServiceId",
            title: "SERVICE ID",
            width: "10%",
            headerClass:
              "font-matter  whitespace-nowrap text-[12px] font-normal leading-[150%] text-white",
            render(_column, item) {
              return (
                <div
                  className={`text-[var(--grey-grey-600, #5D6679);] text-[14px] leading-[150%]`}
                >
                  {item.ServiceId.slice(0, 10)}
                </div>
              );
            }
          },
          {
            key: "Created_at",
            title: "DATE OF CREATION",
            width: "10%",
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
            key: "Last_updated",
            title: "LAST UPDATED",
            width: "10%",
            headerClass:
              "font-matter py-2 whitespace-nowrap text-[12px] font-normal leading-[150%] text-white",
            titleClass:
              "font-inter text-[10px] font-normal leading-[150%] text-black",
            render(_column, item) {
              return (
                <div
                  className={`text-[var(--grey-grey-600, #5D6679);] text-[14px] leading-[150%]`}
                >
                  {dayjs(convertGrpcDate(item.Last_updated)).format(
                    "DD/MM/YYYY"
                  )}
                </div>
              );
            }
          },

          {
            key: "TransactionType",
            title: "Transaction TYPE",
            headerClass:
              "font-matter py-2 whitespace-nowrap text-[12px] font-normal leading-[150%] text-white",
            width: "10%",
            render(_column, item) {
              return (
                <div
                  className={` ${
                    (item.TransactionType === TransactionType.WALLETFUND &&
                      "bg-warning50 text-warning400") ||
                    (item.TransactionType === TransactionType.BOOKING &&
                      "bg-success50 text-success400") ||
                    "bg-danger50  text-danger400"
                  }    inline-block rounded-full px-4 py-1`}
                >
                  <div className="text-center text-[12px]">
                    {item?.TransactionType === TransactionType.BOOKING &&
                      "Booking"}
                    {item?.TransactionType === TransactionType.WALLETFUND &&
                      "Wallent fund"}
                    {item?.TransactionType === TransactionType.WITHDRAWAL &&
                      "Withdrawal"}
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
        data={transactions}
        isLoading={isLoading}
      />
       <Modal
        openModal={showFilterModal}
        setOpenModal={setShowFilterModal}
        variant="plain"
      >
        <FilterComponent filter={filters} onClose={() => setShowFilterModal(false)} setFilter={(filter) => {
          console.log({ filter })
          setFilters(filter);
        }} />
      </Modal>
    </div>
  );
};

export default TransactionTable;
