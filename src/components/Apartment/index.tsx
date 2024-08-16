"use client";
import React, { useState } from "react";
import { Table } from "../Tables/Table/Table";
import { searchApartment } from "@/services/apartment/index";
import { useQuery } from "react-query";
import queryKeys from "@/utils/api/queryKeys";
import Img from "../Image/Image";
import Input from "../Inputs/Input/Input";
import { usePagination } from "@/components/Tables/Table/Pagination";
import { Meta } from "@/utils/api/calls";
import { IApartment, IApartmentFilter, ApartmentType, ApartmentStatus, FilterSpaceType, FilterApartmentStatus } from "@/services/apartment/payload";
import Modal from "@/components/Modal/Modal";
import FilterComponent from "./Filter/Filter";
import FilterIcon from "@/assets/icons/filter2.svg";
import Button from "../Button/Button";
import { H4 } from "../Headings/Headings";
import { useRouter } from "next/navigation";

const Index: React.FC<{
  Limit: number;
  Filter?: IApartmentFilter;
  hidePagination?: boolean;
}> = ({ Limit, Filter, hidePagination }) => {
  const [Page, setPage] = useState(1);
  const [filters, setFilters] = useState({ ...Filter });
  const [showFilterModal, setShowFilterModal] = useState(false);
  const { isLoading, data } = useQuery(
    [queryKeys.getApartmentByID, Limit, Page, filters],
    () => searchApartment({ ...filters, Page, Limit })
  );

  const apartments = (data?.data.Apartments as IApartment[]) || [];
  const meta = (data?.data.Meta as Meta) || [];

  const { currentPage, perPage, handlePageChange } = usePagination({
    defaultCurrentPage: 1,
    defaultPerPage: meta.Limit,
    refetch: (page: number) => {
      setPage(page);
    }
  });
  const router = useRouter();
  return (
    <div className="bg-white rounded-md border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark ">
      <H4 className="p-2 text-black">Apartments</H4>
      <Table
        withPagination
        headerColor="primary"
        className="w-full text-left rounded-sm "
        perPage={perPage}
        currentPage={currentPage}
        totalPages={meta.TotalPages}
        onPageChange={handlePageChange}
        total={meta.TotalCount}
        onRowClick={(apartment) => router.push(`/apartment/${apartment.Slug}`)}
        headerComponent={
          <div className="p-3 ">
            <div className="  flex items-center justify-between gap-3">
              <div className="md:min-w-[200px]">
                <Input
                  type="search"
                  placeholder="Apartment Name"
                  className="w-full border border-[#EAEAEA] outline-none placeholder:text-[#666666] "
                  value={filters.ApartmentName}
                  onChange={(ev) =>
                    setFilters({ ...filters, ApartmentName: ev.currentTarget.value })
                  }
                />
              </div>

              <div className="page-button-container">
                <span className="page-button-wrapper flex gap-2">
                  <div
                    className={`rounded-full border w-17 px-2  py-2 text-center text-[12.54px]  hover:bg-white100. hover:text-primary400 hover:border-primary400 cursor-pointer   ${filters.Type === undefined ? 'text-primary400 border-primary400 ' : 'text-white800 border-white700'}`}
                    onClick={() => {

                    }}>All ({meta.TotalCount})</div>
                  {Object.values(FilterApartmentStatus)
                    .filter((value) => typeof value === "string")
                    .map((status) => (
                      <div
                        key={status}
                        className={`rounded-full border  px-2 
                       
                         py-2 text-center text-[12.54px]  hover:bg-white100. hover:text-primary400 hover:border-primary400 cursor-pointer  ${filters.Status === FilterApartmentStatus[status as keyof typeof FilterApartmentStatus] ? 'text-primary400 border-primary400 ' : 'text-white800 border-white700 '}`}
                        onClick={() => {
                          setFilters({ ...filters, Status: FilterApartmentStatus[status as keyof typeof FilterApartmentStatus] })
                        }}
                      >
                        {status}

                        {status === FilterApartmentStatus.PENDING &&
                          `(${apartments.filter(
                            (item: IApartment) =>
                              item.Status?.Status === ApartmentStatus.PENDING
                          ).length
                          })`}
                        {status === FilterApartmentStatus.ACTIVE &&
                          `(${apartments.filter(
                            (item: IApartment) =>
                              item?.Status?.Status === ApartmentStatus.ACTIVE
                          ).length
                          })`}
                        {status === FilterApartmentStatus.BOOKED &&
                          `(${apartments.filter(
                            (item: IApartment) =>
                              item?.Status?.Status === ApartmentStatus.BOOKED
                          ).length
                          })`}
                        {status === FilterApartmentStatus.CHECKEDOUT &&
                          `(${apartments.filter(
                            (item: IApartment) =>
                              item?.Status?.Status === ApartmentStatus.CHECKEDOUT
                          ).length
                          })`}
                        {status === FilterApartmentStatus.SUSPENDED &&
                          `(${apartments.filter(
                            (item: IApartment) =>
                              item?.Status?.Status === ApartmentStatus.SUSPENDED
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
        }
        header={[
          {
            key: "Name",
            title: "Apartment",
            width: "2%",
            headerClass:
              "font-matter-bold py-2 pl-5 whitespace-nowrap text-[12px] font-normal leading-[150%] text-white",
            render(_column, item) {
              return (
                <div className="py-3  flex items-center gap-2 rounded-sm  bg-white px-5 pb-2.5 pt-6  dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
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
            key: "host_name",
            title: "Host Name",
            headerClass:
              "font-matter-bold  whitespace-nowrap text-[12px] font-normal leading-[150%] text-white",
            width: "1%",
            render(_column, item) {
              return (
                <div className="py-3 text-nowrap">
                  {item?.Host.Firstname || ""}
                </div>
              );
            }
          },
          {
            key: "business_city",
            title: "city",
            width: "1%",
            headerClass:
              "font-matter-bold  whitespace-nowrap text-[12px] font-normal leading-[150%] text-white",
            render(_column, item) {
              return <div className="py-3 ">{item?.Address?.City || ""}</div>;
            }
          },
          {
            key: "business_country",
            title: "Country",
            headerClass:
              "font-matter-bold  whitespace-nowrap text-[12px] font-normal leading-[150%] text-white",
            width: "1%",
            render(_column, item) {
              return <div className="py-3 ">{item?.Address?.Country || 0}</div>;
            }
          },
          {
            key: "total_bookings",
            title: "Total Bookings",
            headerClass:
              "font-matter-bold  whitespace-nowrap text-[12px] font-normal leading-[150%] text-white",
            width: "1%",
            render(_column, item) {
              return (
                <div className="py-3 ">{item?.Rating?.TotalBooking || 0}</div>
              );
            }
          },
          {
            key: "total_reviews",
            title: "Total Reviews",
            headerClass:
              "font-matter-bold  whitespace-nowrap text-[12px] font-normal leading-[150%] text-white",
            width: "1%",
            render(_column, item) {
              return (
                <div className="py-3 ">{item?.Rating?.TotalReviews || 0}</div>
              );
            }
          },
          {
            key: "total_clicks",
            title: "Total Clicks",
            headerClass:
              "font-matter-bold  whitespace-nowrap text-[12px] font-normal leading-[150%] text-white",
            width: "1%",
            render(_column, item) {
              return <div className="py-3 ">{item?.Rating.Clicks || 0}</div>;
            }
          },
          {
            key: "status",
            title: "Status",
            headerClass:
              "font-matter-bold  whitespace-nowrap text-[12px] font-normal leading-[150%] text-white",
            width: "1%",
            render(_column, item) {

              if (!item.Status) item.Status = { Status: ApartmentStatus.PENDING }
              if (!item.Status.Status) item.Status.Status = ApartmentStatus.PENDING;
              return (
                <div
                  className={` ${(item.Status.Status === ApartmentStatus.PENDING &&
                    "bg-warning50 text-warning400") ||
                    (item.Status.Status === ApartmentStatus.ACTIVE &&
                      "bg-success50 text-success400") ||
                    "bg-danger50  text-danger400"
                    }    inline-block rounded-full px-4 py-1`}
                >
                  <div className="text-center text-[12px]">
                    {item?.Status?.Status === ApartmentStatus.PENDING && "Pending"}
                    {item?.Status?.Status === ApartmentStatus.ACTIVE && "Active"}
                    {item?.Status?.Status === ApartmentStatus.CHECKEDIN && "Checked In"}
                    {item?.Status?.Status === ApartmentStatus.CHECKEDOUT && "Checked Out"}
                    {item?.Status?.Status === ApartmentStatus.BOOKED && "Booked"}
                    {item?.Status?.Status === ApartmentStatus.SUSPENDED && "Suspended"}
                  </div>
                </div>
              );
            }
          }
        ]}
        data={apartments}
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

export default Index;