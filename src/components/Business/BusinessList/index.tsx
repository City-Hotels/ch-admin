"use client";
import React, { useState } from "react";
import { Table } from "../../Tables/Table/Table";
import { searchHotel } from "@/services/hotel/index";
import { HotelStatus, type IHotel } from "@/services/hotel/payload";
import { useQuery } from "react-query";
import queryKeys from "@/utils/api/queryKeys";
import Img from "../../Image/Image";
import Input from "@/components/Inputs/Input/Input";
import { usePagination } from "@/components/Tables/Table/Pagination";
import { Meta } from "@/utils/api/calls";
import { H4 } from "@/components/Headings/Headings";

const Index = () => {

  const [Page, setPage] = useState(1);
  const { isLoading, data } = useQuery(
    [queryKeys.getSeachHotels, Page],
    () => searchHotel({ Page, Limit: 7 })
  );

  const hotels = data?.data.Hotels as IHotel[] || []
  const meta = (data?.data.Meta as Meta) || [];

  const { currentPage, perPage, handlePageChange } = usePagination({
    defaultCurrentPage: 1,
    defaultPerPage: meta.Limit,
    refetch: (page: number) => {
      setPage(page);
    }
  });

  return (
    <div className="bg-white">
      <Table
        withPagination
        headerColor="primary"
        className="w-full text-left"
        perPage={perPage}
        currentPage={currentPage}
        totalPages={meta.TotalPages}
        onPageChange={handlePageChange}
        total={meta.TotalCount}
        headerComponent={
          <div className="flex items-center justify-between gap-3 p-3">
            <H4>Hotels({meta.TotalCount || hotels.length})</H4>
            <Input
              type="search"
              placeholder="Search"
              className="lg:w-[300px] border border-[#EAEAEA] outline-none placeholder:text-[#666666] "
            />
          </div>
        }
        header={[
          {
            key: "Name",
            title: "Business Name",
            headerClass: "py-2",
            width: "2%",
            render(_column, item) {
              return <div className="py-2  flex items-center gap-2">
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
              return <div className="py-2 ">{item?.Address?.City || ""}</div>;
            }
          },
          {
            key: "business_country",
            title: "Country",
            width: "1%",
            render(_column, item) {
              return (
                <div className="py-2 ">{item?.Address?.Country || ""}</div>
              );
            }
          },
          {
            key: "total_bookings",
            title: "Total bookings",
            width: "1%",
            render(_column, item) {
              return (
                <div className="py-2 ">
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
                <div className="py-2 ">
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
                <div className="py-2 ">{item?.Rating?.Clicks || 0}</div>
              );
            }
          },
          {
            key: "status",
            title: "Status",
            width: "1%",
            render(_column, item) {
              if (!item.Status) item.Status = HotelStatus.UNPUBLISHED;
              return <div className={` ${(item.Status === HotelStatus.UNPUBLISHED &&
                "bg-warning50 text-warning400") ||
                (item.Status === HotelStatus.PUBLISHED &&
                  "bg-success50 text-success400") ||
                "bg-danger50  text-danger400"
                }    inline-block rounded-full px-4 py-1`}>{HotelStatus[item?.Status || 0]}</div>;
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
