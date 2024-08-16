"use client";
import React, { useState } from "react";
import { Table } from "../../Tables/Table/Table";
import { searchHotel } from "@/services/hotel/index";
import {
  HotelFilter,
  HotelStatus,
  IHotelStatus,
  type IHotel
} from "@/services/hotel/payload";
import { useQuery } from "react-query";
import queryKeys from "@/utils/api/queryKeys";
import Img from "../../Image/Image";
import Input from "@/components/Inputs/Input/Input";
import { usePagination } from "@/components/Tables/Table/Pagination";
import { Meta } from "@/utils/api/calls";
import Modal from "@/components/Modal/Modal";
import HotelFilterComponent from "./Filter/Filter";
import Button from "@/components/Button/Button";
import FilterIcon from "@/assets/icons/filter2.svg";
import { useRouter } from "next/navigation";

const Index: React.FC<{
  Limit: number;
  Filter: HotelFilter;
  hidePagination?: boolean;
}> = ({ Limit, Filter, hidePagination }) => {
  const router = useRouter();
  const [Page, setPage] = useState(1);
  const [filters, setFilters] = useState({ ...Filter });
  const [showFilterModal, setShowFilterModal] = useState(false);

  const { isLoading, data } = useQuery(
    [queryKeys.getSeachHotels, Page, Limit, filters],
    () => searchHotel({ Page, Limit, ...filters })
  );

  const hotels = (data?.data.Hotels as IHotel[]) || [];
  const meta = (data?.data.Meta as Meta) || [];

  const { currentPage, perPage, handlePageChange } = usePagination({
    defaultCurrentPage: 1,
    defaultPerPage: Limit,
    refetch: (page: number) => {
      setPage(page);
    }
  });

  return (
    <div className="bg-white">
      <Table
        withPagination={!hidePagination}
        perPage={perPage}
        currentPage={currentPage}
        total={meta.TotalCount}
        onPageChange={handlePageChange}
        headerColor="primary"
        errorMessage="No hotels match this filter"
        onRowClick={(hotel) =>
          router.push(`/hotels/${hotel.Slug}`)
        }
        headerComponent={
          <div className="p-3">
            <div className="items-between flex w-full items-center justify-between gap-3">
              <div className="flex items-center justify-end gap-3">
                <div className="md:min-w-[200px]">
                  <Input
                    type="search"
                    placeholder="Name"
                    className="w-full border border-[#413434] outline-none placeholder:text-[#666666] "
                    value={filters.Name}
                    onChange={(ev) =>
                      setFilters({ ...filters, Name: ev.currentTarget.value })
                    }
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
                    {Object.values(IHotelStatus)
                      .filter((value) => typeof value === "string")
                      .map((status) => (
                        <div
                          key={status}
                          className={`rounded-full border  px-2 
                       
                         py-2 text-center text-[12.54px]  hover:bg-white100. hover:text-primary400 hover:border-primary400 cursor-pointer  ${filters.Status === IHotelStatus[status as keyof typeof IHotelStatus] ? "text-primary400 border-primary400 " : "text-white800 border-white700 "}`}
                          onClick={() => {
                            setFilters({
                              ...filters,
                              Status:
                                IHotelStatus[status as keyof typeof IHotelStatus]
                            });
                          }}
                        >
                          {status}



                        </div>
                      ))}
                  </span>
                </div>
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
        }
        header={[
          {
            key: "Name",
            title: "Business Name",
            headerClass: "py-2",
            width: "2%",
            render(_column, item) {
              return (
                <div className="py-2  flex items-center gap-2">
                  {item.Medias && item?.Medias[0] ? (
                    <Img
                      alt=""
                      path={item?.Medias[0]?.Path || ""}
                      name=""
                      className="h-10 w-10 rounded-md"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray"></div>
                  )}
                  {item?.Name || ""}
                </div>
              );
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
                <div className="py-2 ">{item?.Rating?.TotalBooking || 0}</div>
              );
            }
          },
          {
            key: "total_reviews",
            title: "Total Reviews",
            width: "1%",
            render(_column, item) {
              return (
                <div className="py-2 ">{item?.Rating?.TotalReviews || 0}</div>
              );
            }
          },
          {
            key: "total_clicks",
            title: "Total Clicks",
            width: "1%",
            render(_column, item) {
              return <div className="py-2 ">{item?.Rating?.Clicks || 0}</div>;
            }
          },
          {
            key: "status",
            title: "Status",
            width: "1%",
            render(_column, item) {
              if (!item.Status) item.Status = HotelStatus.INACTIVE;
              return (
                <div
                  className={` ${(item.Status === HotelStatus.INACTIVE &&
                    "bg-warning50 text-warning400") ||
                    (item.Status === HotelStatus.ACTIVE &&
                      "bg-success50 text-success400") ||
                    (item.Status === HotelStatus.SUSPENDED &&
                      "bg-success50 text-grey50") ||
                    "bg-danger50  text-danger400"
                    }    inline-block rounded-full px-4 py-1`}
                >
                  {HotelStatus[item?.Status || 0]}
                </div>
              );
            }
          }
        ]}
        data={hotels}
        isLoading={isLoading}
      />
      <Modal
        openModal={showFilterModal}
        setOpenModal={setShowFilterModal}
        variant="plain"
      >
        <HotelFilterComponent
          filter={filters}
          onClose={() => setShowFilterModal(false)}
          setFilter={(filter) => {
            console.log({ filter });
            setFilters(filter);
          }}
        />
      </Modal>
    </div>
  );
};

export default Index;
