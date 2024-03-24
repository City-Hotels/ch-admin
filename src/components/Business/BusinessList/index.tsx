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

const Index = () => {

  const [Page, setPage] = useState(1);
  const { isLoading, data, refetch } = useQuery(
    [queryKeys.getSeachHotels],
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
