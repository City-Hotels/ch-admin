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
import { convertGrpcDate } from "@/utils/helpers";
import { ITransaction, TransactionType } from "@/services/transactions/payload";
import { getTransactions } from "@/services/transactions/index";
import Input from "../Inputs/Input/Input";

const TransactionTable: React.FC<{
  Limit: number;
  hidePagination?: boolean;
}> = ({ Limit, hidePagination }) => {
  // const [tableFilter, setTableFilter] = useState<BookingStatus | undefined>();

  const [Page, setPage] = useState(1);
  // const [filterValues, setFilterValues] = useState<{ Limit: number;  Page: number}>({ Limit: 10, })
  const { isLoading, refetch, data } = useQuery(
    [queryKeys.getTransactions, Limit, Page],
    () => getTransactions()
  );
  const transactions = (data?.data.Transactions as ITransaction[]) || [];
  //   const meta = (data?.data.Meta as Meta) || [];

  // const updateTableFilter = (filter: number) => {
  //   // TODO: Update table request fetch update list
  //   setTableFilter(filter as BookingStatus);
  // };
  console.log(transactions)

  const { currentPage, perPage } = usePagination({
    defaultCurrentPage: 1,
    defaultPerPage: 5,
    refetch: (page: number) => {
      setPage(page);
      refetch();
    }
  });
  return (
    <div className="bg-white p-2 rounded-md">
      <Table
        withPagination={!hidePagination}
        perPage={perPage}
        currentPage={currentPage}
        total={transactions.length}
        headerColor="primary"
        errorMessage="You have not gotten any bookings"
        headerComponent={
          <div>
            <div className="items-between flex w-full items-center justify-between gap-3">
              <H4>Transactions({transactions.length})</H4>
              <div className="flex items-center justify-end gap-3">
                <div className="page-button-container">
                  <span className="page-button-wrapper flex gap-2">
                    {Object.values(TransactionType)
                      .filter((value) => typeof value === "string")
                      .filter(
                        (value) =>
                          typeof value === "string" &&
                          !["BOOKING", "WITHDRAWAL"].includes(value)
                      )
                      .map((transactionType) => (
                        <div
                          // onClick={() =>
                          //   // updateTableFilter(BookingStatus[bookingStatus])
                          // ${
                          //   1 === 2
                          //     ? "border-orange-500 bg-orange-50 text-orange-500"
                          //     : "text-grey-500 border-grey600 bg-white "
                          //   }
                          // }
                          key={transactionType}
                          className={`rounded-full border  px-4 
                       
                         py-2 text-center text-[12.54px]`}
                        >
                          {transactionType}
                          {`(${transactions.length})`}

                          {transactionType === TransactionType.BOOKING &&
                            `(${
                              transactions.filter(
                                (item: ITransaction) =>
                                  item.TransactionType ===
                                  TransactionType.BOOKING
                              ).length
                            })`}
                          {transactionType === TransactionType.WALLETFUND &&
                            `(${
                              transactions.filter(
                                (item: ITransaction) =>
                                  item.TransactionType ===
                                  TransactionType.WALLETFUND
                              ).length
                            })`}
                          {transactionType === TransactionType.WITHDRAWAL &&
                            `(${
                              transactions.filter(
                                (item: ITransaction) =>
                                  item.TransactionType ===
                                  TransactionType.WITHDRAWAL
                              ).length
                            })`}
                        </div>
                      ))}
                  </span>
                </div>
                <div className="md:min-w-[250px]">
                  <Input
                    type="search"
                    placeholder="Search"
                    className=" m-0 w-full border border-[#EAEAEA] outline-none placeholder:text-[#666666] "
                  />
                </div>
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
              return <div className="px-4">{item.Credit}</div>;
            }
          },
          {
            key: "Debit",
            title: "DEBIT",
            width: "15%",
            headerClass:
              "font-matter py-2 px-3 whitespace-nowrap text-[12px] font-normal leading-[150%] text-white",
            render(_column, item) {
              return <div className="px-4">{item.Debit}</div>;
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
    </div>
  );
};

export default TransactionTable;
