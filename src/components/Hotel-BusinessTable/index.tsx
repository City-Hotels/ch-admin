"use client";
import React from "react";
import { Table } from "../Tables/Table/Table";
import { searchHotel } from "@/app/services/hotel/index";
import type { IHotel } from "@/app/services/hotel/payload";
import { useQuery } from "react-query";
import queryKeys from "@/utils/api/queryKeys";
import Image from "next/image";
import Img from "../Image/Image";

const Index = () => {
  const [hotels, setHotels] = React.useState<IHotel[]>([]);

  const { isLoading } = useQuery(
    [queryKeys.getHotelByID],
    () => {
      const res = searchHotel({});
      return res;
    },
    {
      onSuccess: (response) => {
        // Set state based on response
        // eslint-disable-next-line no-console
        // console.log(response.data.Hotels);
        setHotels(response.data.Hotels);
        console.log(hotels);
      }
      // enabled: !!slug // Would only make this request if slug is truthy
    }
  );

  return (
    <div>
      <Table
        headerColor="primary"
        className="w-full text-center"
        headerComponent={
          <div>
            {/* <div className="flex h-[42px] items-center justify-between gap-3">
              <div className="items-between mb-8 flex w-full justify-between gap-3">
                    <div className="min h-[50px] w-[calc(100%-200px)]">
                      <Input
                        type="search"
                        placeholder="Search"
                        className=" w-full border border-[#EAEAEA] outline-none placeholder:text-[#666666] "
                      />
                    </div>

                    <div className="h-[50px] w-[185px] ">
                      <Select
                        classNamePrefix="table__filter"
                        className="h-full text-[14px] text-[#666666]"
                        placeholder={"Sort By: Recents"}
                        name="options"
                        options={options}
                      />
                    </div>
                  </div>

              <span onClick={() => setShowAddUserModal(true)}>
                    <AddButton />
                  </span>
            </div> */}
          </div>
        }
        header={[
          {
            key: "business_image",
            title: "Business Image",
            width: "1%",
            render(_column, item) {
              return (
                <div className="py-3 pl-2">
                  {/* <Img alt="" path={item?.Medias[0].Path || ""} name="" className="h-10 w-10 rounded-md" /> */}

                  </div>
              );
            }
          },
          {
            key: "Name",
            title: "Business Name",
            width: "2%",
            render(_column, item) {
              return <div className="py-3 pl-2">{item?.Name || ""}</div>;
            }
          },
          {
            key: "business_city",
            title: "City",
            width: "1%",
            render(_column, item) {
              return <div className="py-3 pl-2">{item?.Address?.City || ""}</div>;
            }
          },
          {
            key: "business_country",
            title: "Country",
            width: "1%",
            render(_column, item) {
              return (
                <div className="py-3 pl-2">{item?.Address?.Country || ""}</div>
              );
            }
          },
          {
            key: "total_bookings",
            title: "Total bookings",
            width: "1%",
            render(_column, item) {
              return (
                <div className="py-3 pl-2">
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
                <div className="py-3 pl-2">
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
                <div className="py-3 pl-2">{item?.Rating?.Clicks || 0}</div>
              );
            }
          },
          {
            key: "status",
            title: "Status",
            width: "1%",
            render(_column, item) {
              return <div className="py-3 pl-2">{item?.Status || 0}</div>;
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
