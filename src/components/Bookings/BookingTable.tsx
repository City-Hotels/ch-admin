'use client'
import { H4 } from "@/components/Headings/Headings";
import queryKeys from "@/utils/api/queryKeys";
import React, { useState } from "react";
import { useQuery } from "react-query";
import Dots from "@/assets/icons/dots-vertical.svg";
import FilterIcon from "@/assets/icons/filter2.svg";
import dayjs from "dayjs";
import type { Meta } from "@/utils/api/calls";
import { usePagination } from "@/components/Tables/Table/Pagination";
import { Table } from "@/components/Tables/Table/Table";
import { convertGrpcDate } from "@/utils/helpers";
import { BookingFilter, BookingStatus, BookingFilterStatus, IBooking } from "@/services/booking/payload";
import { getBookings } from "@/services/booking";
import Input from "@/components/Inputs/Input/Input";
import Avatar from "@/components/Avatar/Avatar";
import Modal from "@/components/Modal/Modal";
import FilterComponent from "./Filter/Filter";
import Button from "../Button/Button";

const BookingTable: React.FC<{
  Limit: number;
  Filter: BookingFilter;
  hidePagination?: boolean;
}> = ({ Limit, Filter, hidePagination }) => {
  const [filters, setFilters] = useState({ ...Filter })

  const [showFilterModal, setShowFilterModal] = useState(false);

  const [Page, setPage] = useState(1);
  const { isLoading, data } = useQuery(
    [queryKeys.getUserBookings, Limit, Page, filters],
    () => getBookings({ Limit, ...filters, Page })
  );
  const bookings = (data?.data.Bookings as IBooking[]) || [];
  const meta = (data?.data.Meta as Meta) || [];

  const { currentPage, perPage, handlePageChange } = usePagination({
    defaultCurrentPage: 1,
    defaultPerPage: Limit,
    refetch: (page: number) => {
      setPage(page);
    }
  });


  return (
    <div className="bg-white rounded-md">
      <H4 className="p-2 text-black">Bookings {meta.TotalCount && <span>({meta.TotalCount})</span>}</H4>
      <Table
        withPagination={!hidePagination}
        perPage={perPage}
        currentPage={currentPage}
        total={meta.TotalCount}
        onPageChange={handlePageChange}
        headerColor="primary"
        errorMessage="No bookings match this filter"
        headerComponent={
          <div className="p-3 overflow-x-scroll">
            <div className="items-between flex w-full items-center justify-between gap-3">
              <div className="flex items-center justify-end gap-3">
                <div className="md:min-w-[200px]">
                  <Input
                    type="search"
                    placeholder="Booking Id"
                    className="w-full border border-[#EAEAEA] outline-none placeholder:text-[#666666] max-[425px]:w-[153px]"
                    value={filters.BookingId}
                    onChange={(ev) => setFilters({ ...filters, BookingId: ev.currentTarget.value })}
                  />
                </div>

                <div className="page-button-container">
                  <span className="page-button-wrapper flex gap-2">
                    <div
                      className={`rounded-full border w-17 px-2  py-2 text-center text-[12.54px]  hover:bg-white100. hover:text-primary400 hover:border-primary400 cursor-pointer   ${filters.Status === undefined ? 'text-primary400 border-primary400 ' : 'text-white800 border-white700'}`}
                      onClick={() => {
                        setFilters({ ...filters, Status: undefined })
                      }}
                    >All ({meta.TotalCount})</div>
                    {Object.values(BookingStatus)
                      .filter((value) => typeof value === "string")
                      .map((bookingStatus) => (
                        <div
                          key={bookingStatus}
                          className={`rounded-full border  px-2 
                       
                         py-2 text-center text-[12.54px]  hover:bg-white100. hover:text-primary400 hover:border-primary400 cursor-pointer  ${filters.Status === BookingFilterStatus[bookingStatus as keyof typeof BookingFilterStatus] ? 'text-primary400 border-primary400 ' : 'text-white800 border-white700 '}`}
                          onClick={() => {
                            setFilters({ ...filters, Status: BookingFilterStatus[bookingStatus as keyof typeof BookingFilterStatus] })
                          }}
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
              </div>
              <Button size="sm" color="outline-dark" variant="outline" onClick={() => setShowFilterModal(true)}>
                <span className="flex gap-2 px-3">
                  <FilterIcon /> Filter
                </span>
              </Button>
            </div>
          </div>
        }
        header={[
          {
            key: "Customer",
            title: "GUEST",
            headerClass:
              "font-matter py-2 whitespace-nowrap text-[12px] font-normal leading-[150%] text-white",
            width: "15%",
            render(_column, item) {
              return (
                <div className="flex gap-2">
                  <Avatar Firstname={item.Guest?.Firstname || ""} Lastname={item.Guest?.Firstname || ""} Imageurl={item.Guest.Imageurl} className="w-10 h-10" />
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
                </div>
              );
            }
          },
          {
            key: "Room",
            title: "SERVICE",
            width: "20%",
            headerClass:
              "font-matter  whitespace-nowrap text-[12px] font-normal leading-[150%] text-white",
            render(_column, item) {
              return (
                <div>
                  <div
                    className={`text-[var(--grey-grey-600, #5D6679);] whitespace-nowrap text-[14px] leading-[150%]`}
                  >
                    {item.Service.Name}
                  </div>
                  <div
                    className={`text-[var(--grey-grey-600, #5D6679);] text-[12px] leading-[150%]`}
                  >
                    {item.Host.Firstname}  {item.Host.Lastname}
                  </div>
                </div>
              );
            }
          },
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
            key: "BookingDate",
            title: "DATE",
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
            key: "BookingStatus",
            title: "STATUS",
            headerClass:
              "font-matter py-2 whitespace-nowrap text-[12px] font-normal leading-[150%] text-white",
            width: "10%",
            render(_column, item) {
              if (!item.Status) item.Status = BookingStatus.PENDING;
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
                    {item?.Status === BookingStatus.PENDING && "Pending"}
                    {item?.Status === BookingStatus.CANCELLED && "Cancelled"}
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

export default BookingTable;
