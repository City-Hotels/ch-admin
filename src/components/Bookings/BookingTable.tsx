'use client'
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
import { BookingFilter, BookingStatus, IBooking } from "@/services/booking/payload";
import { getBookings } from "@/services/booking";
import Input from "../Inputs/Input/Input";

const BookingTable: React.FC<{
  Limit: number;
  Filter: BookingFilter;
  hidePagination?: boolean;
}> = ({ Limit, Filter, hidePagination }) => {
  // const [tableFilter, setTableFilter] = useState<BookingStatus | undefined>();

  const [Page, setPage] = useState(1);
  // const [filterValues, setFilterValues] = useState<{ Limit: number;  Page: number}>({ Limit: 10, })
  const { isLoading, refetch, data } = useQuery(
    [queryKeys.getUserBookings, Limit, Page],
    () => getBookings({ Limit, ...Filter, Page })
  );
  const bookings = (data?.data.Bookings as IBooking[]) || [];
  const meta = (data?.data.Meta as Meta) || [];

  // const updateTableFilter = (filter: number) => {
  //   // TODO: Update table request fetch update list
  //   setTableFilter(filter as BookingStatus);
  // };

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
        total={bookings.length}
        headerColor="primary"
        errorMessage="You have not gotten any bookings"
        headerComponent={
          <div>
            <div className="items-between flex w-full items-center justify-between gap-3">
              <H4>Bookings({meta.TotalCount || bookings.length})</H4>
              <div className="flex items-center justify-end gap-3">
                <div className="page-button-container">
                  <span className="page-button-wrapper flex gap-2">
                    {Object.values(BookingStatus)
                      .filter((value) => typeof value === "string")
                      .filter(
                        (value) =>
                          typeof value === "string" &&
                          !["CANCELLED", "DECLINED"].includes(value)
                      )
                      .map((bookingStatus) => (
                        <div
                          // onClick={() =>
                          //   // updateTableFilter(BookingStatus[bookingStatus])
                          // ${
                          //   1 === 2
                          //     ? "border-orange-500 bg-orange-50 text-orange-500"
                          //     : "text-grey-500 border-grey600 bg-white "
                          //   }
                          // }
                          key={bookingStatus}
                          className={`rounded-full border  px-4 
                       
                         py-2 text-center text-[12.54px]`}
                        >
                          {bookingStatus}
                          {`(${bookings.length})`}

                          {bookingStatus === BookingStatus.PENDING &&
                            `(${bookings.filter(
                              (item: IBooking) =>
                                item.Status === BookingStatus.PENDING
                            ).length
                            })`}
                          {bookingStatus === BookingStatus.ACCEPTED &&
                            `(${bookings.filter(
                              (item: IBooking) =>
                                item.Status === BookingStatus.ACCEPTED
                            ).length
                            })`}
                          {bookingStatus === BookingStatus.CHECKEDIN &&
                            `(${bookings.filter(
                              (item: IBooking) =>
                                item.Status === BookingStatus.CHECKEDIN
                            ).length
                            })`}
                          {bookingStatus === BookingStatus.CHECKEDOUT &&
                            `(${bookings.filter(
                              (item: IBooking) =>
                                item.Status === BookingStatus.CHECKEDOUT
                            ).length
                            })`}
                          {bookingStatus === BookingStatus.CANCELLED &&
                            `(${bookings.filter(
                              (item: IBooking) =>
                                item.Status === BookingStatus.CANCELLED
                            ).length
                            })`}
                          {bookingStatus === BookingStatus.CANCELLED &&
                            `(${bookings.filter(
                              (item: IBooking) =>
                                item.Status === BookingStatus.CANCELLED
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
            key: "BookingId",
            title: "RESERVATION ID",
            width: "15%",
            headerClass:
              "font-matter py-2 px-3 whitespace-nowrap text-[12px] font-normal leading-[150%] text-white",
            render(_column, item) {
              return <div className="px-4">{item.Id}</div>;
            }
          },
          {
            key: "Customer",
            title: "GUEST",
            headerClass:
              "font-matter py-2 whitespace-nowrap text-[12px] font-normal leading-[150%] text-white",
            width: "15%",
            render(_column, item) {
              return (
                <div>
                  <div className={`text-[14px] leading-[150%] text-black`}>
                    {item.Guest?.Firstname}
                  </div>
                  <div
                    className={`text-[var(--grey-grey-400, #858D9D);] font-matter text-[11px] leading-[150%]`}
                  >
                    {item.Guest?.Email}
                  </div>
                </div>
              );
            }
          },
          {
            key: "Room",
            title: "ROOM",
            width: "10%",
            headerClass:
              "font-matter  whitespace-nowrap text-[12px] font-normal leading-[150%] text-white",
            render(_column, item) {
              return (
                <div>
                  <div
                    className={`text-[var(--grey-grey-600, #5D6679);] text-[14px] leading-[150%]`}
                  >
                    {item.Service.Id.slice(0, 10)}
                  </div>
                  <div
                    className={`text-[var(--grey-grey-600, #5D6679);] whitespace-nowrap text-[11px] leading-[150%]`}
                  >
                    {item.Service.Name}
                  </div>
                </div>
              );
            }
          },
          {
            key: "BookingDate",
            title: "BOOKING DATE",
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
            key: "CheckInDate",
            title: "CHECK IN",
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
                  {dayjs(item.CheckInDate).format("DD/MM/YYYY")}
                </div>
              );
            }
          },
          {
            key: "CheckOutDate",
            title: "CHECK OUT",
            width: "10%",
            headerClass:
              "font-matter  whitespace-nowrap text-[12px] font-normal leading-[150%] text-white",
            titleClass:
              "font-inter text-[10px] font-normal leading-[150%] text-black",
            render(_column, item) {
              return (
                <div
                  className={`text-[var(--grey-grey-600, #5D6679);] text-[14px] leading-[150%]`}
                >
                  {dayjs(item.CheckOutDate).format("DD/MM/YYYY")}
                </div>
              );
            }
          },
          {
            key: "PaymentStatus",
            title: "PAYMENT",
            headerClass:
              "font-matter py-2 whitespace-nowrap text-[12px] font-normal leading-[150%] text-white",
            width: "10%",
            render(_column, item) {
              return (
                <div
                  className={` ${"bg-success50 text-success400"} inline-block rounded-full px-4 py-1`}
                >
                  <div className="text-center text-[12px]">
                    {item?.PaymentInfo && "Paid"}
                  </div>
                </div>
              );
            }
          },
          {
            key: "BookingStatus",
            title: "STATUS",
            headerClass:
              "font-matter py-2 whitespace-nowrap text-[12px] font-normal leading-[150%] text-white",
            width: "10%",
            render(_column, item) {
              return (
                <div
                  className={` ${(item.Status === BookingStatus.PENDING &&
                    "bg-warning50 text-warning400") ||
                    (item.Status === BookingStatus.ACCEPTED &&
                      "bg-success50 text-success400") ||
                    "bg-danger50  text-danger400"
                    }    inline-block rounded-full px-4 py-1`}
                >
                  <div className="text-center text-[12px]">
                    {item?.Status === BookingStatus.CANCELLED && "Cancelled"}
                    {item?.Status === BookingStatus.PENDING && "Pending"}
                    {item?.Status === BookingStatus.ACCEPTED && "Accepted"}
                    {item?.Status === BookingStatus.CHECKEDIN && "Checked In"}
                    {item?.Status === BookingStatus.CHECKEDOUT && "Checked Out"}
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
        data={bookings}
        isLoading={isLoading}
      />
    </div>
  );
};

export default BookingTable;
