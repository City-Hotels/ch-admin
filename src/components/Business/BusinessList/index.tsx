"use client";
import React, { useState } from "react";
import { Table } from "../../Tables/Table/Table";
import { searchHotel } from "@/app/services/hotel/index";
import { HotelStatus, type IHotel } from "@/app/services/hotel/payload";
import { useQuery } from "react-query";
import queryKeys from "@/utils/api/queryKeys";
import Img from "../../Image/Image";
import Input from "@/components/Inputs/Input/Input";
import { usePagination } from "@/components/Tables/Table/Pagination";
import { Meta } from "@/utils/api/calls";

const Index = () => {

  const [Page, setPage] = useState(1);
  const { isLoading, data, refetch } = useQuery(
    [queryKeys.getHotelByID],
    () => searchHotel({ Page, Limit: 7 })
  );

  const hotels = data?.data.Hotels as IHotel[] || []
  const meta = (data?.data.Meta as Meta) || [];

  const { currentPage, perPage } = usePagination({
    defaultCurrentPage: 1,
    defaultPerPage: meta.Limit,
    refetch: (page: number) => {
      setPage(page);
      refetch();
    }
  });
  return (
    <div>
      <Table
        withPagination
        headerColor="primary"
        className="w-full text-left"
        perPage={perPage}
        currentPage={currentPage}
        totalPages={meta.TotalPages}
        total={meta.TotalCount}
        headerComponent={
          <div className="flex items-center justify-between gap-3">
            <div className=" lg:w-500px flex items-center gap-5">
              <svg
                className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                  fill=""
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                  fill=""
                />
              </svg>
              <Input
                type="search"
                placeholder="Search"
                className="w-full border border-[#EAEAEA] outline-none placeholder:text-[#666666] "
              />
            </div>
          </div>
        }
        header={[
          {
            key: "Name",
            title: "Business Name",
            width: "2%",
            render(_column, item) {
              return <div className="py-3  flex items-center gap-2">
                {item.Medias && item?.Medias[0] ? <Img alt="" path={item?.Medias[0]?.Path || ""} name="" className="h-10 w-10 rounded-md" /> : <div className="w-10 h-10 bg-gray"></div>}
                {item?.Name || ""}
              </div>;
            }
          },
          {
            key: "business_city",
            title: "City",
            width: "1%",
            render(_column, item) {
              return <div className="py-3 ">{item?.Address?.City || ""}</div>;
            }
          },
          {
            key: "business_country",
            title: "Country",
            width: "1%",
            render(_column, item) {
              return (
                <div className="py-3 ">{item?.Address?.Country || ""}</div>
              );
            }
          },
          {
            key: "total_bookings",
            title: "Total bookings",
            width: "1%",
            render(_column, item) {
              return (
                <div className="py-3 ">
                  {item?.Rating?.TotalBooking || 0}
                </div>
              );
            }
          },
          {
            key: "total_reviews",
            title: "Total Reviews",
            width: "1%",
            render(_column, item) {
              return (
                <div className="py-3 ">
                  {item?.Rating?.TotalReviews || 0}
                </div>
              );
            }
          },
          {
            key: "total_clicks",
            title: "Total Clicks",
            width: "1%",
            render(_column, item) {
              return (
                <div className="py-3 ">{item?.Rating?.Clicks || 0}</div>
              );
            }
          },
          {
            key: "status",
            title: "Status",
            width: "1%",
            render(_column, item) {
              return <div className="py-3 ">{HotelStatus[item?.Status || 0]}</div>;
            }
          }
        ]}
        data={hotels}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Index;
