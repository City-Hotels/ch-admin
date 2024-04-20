"use client";
import React, { useState } from "react";
import { Table } from "../Tables/Table/Table";
import { searchApartment } from "@/services/apartment/index";
import { useQuery } from "react-query";
import queryKeys from "@/utils/api/queryKeys";
import FilterIcon from "@/assets/icons/filter2.svg";
import Img from "../Image/Image";
import Input from "../Inputs/Input/Input";
import { usePagination } from "@/components/Tables/Table/Pagination";
import { Meta } from "@/utils/api/calls";
import { IApartmentFilter, IApartment, ApartmentFilter, ApartmentType } from "@/services/apartment/payload";
import Modal from "@/components/Modal/Modal";
import FilterComponent from "./Filter/Filter";
import FilterIcon from "@/assets/icons/filter2.svg";
import Button from "../Button/Button";


const Index: React.FC<{
  Limit: number;
  Filter: IApartmentFilter;
  hidePagination?: boolean;
}> = ({ Limit, Filter, hidePagination }) => {
  const [filters, setFilters] = useState({ ...Filter })
import {
  ApartmentFilter,
  ApartmentType,
  IApartment
} from "@/services/apartment/payload";
import ApartmentFilterComponent from "./Filter/Filter";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";

const Index: React.FC<{
  Limit: number;
  Filter: ApartmentFilter;
  hidePagination?: boolean;
}> = ({ Limit, Filter, hidePagination }) => {
  const [Page, setPage] = useState(1);
  const [filters, setFilters] = useState({ ...Filter });
  const [showFilterModal, setShowFilterModal] = useState(false);
  const { isLoading, data } = useQuery(
    [queryKeys.getApartmentByID, Limit, Page, filters],
    () => searchApartment({ Page, Limit: 7, ...filters })
  );

  const apartments = (data?.data.Apartments as IApartment[]) || [];
  const meta = (data?.data.Meta as Meta) || [];

  const [showFilterModal, setShowFilterModal] = useState(false);
  
  const { currentPage, perPage, handlePageChange } = usePagination({
    defaultCurrentPage: 1,
    defaultPerPage: meta.Limit,
    refetch: (page: number) => {
      setPage(page);
    }
  });
  return (
    <div>
      <Table
        withPagination
        headerColor="primary"
        className="w-full text-left rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"
        perPage={perPage}
        currentPage={currentPage}
        totalPages={meta.TotalPages}
        onPageChange={handlePageChange}
        total={meta.TotalCount}
        headerComponent={
          <div className="flex items-center justify-between gap-3">
            <div className=" lg:w-500px flex items-center gap-5">
              
              <Input
                type="search"
                placeholder="Search bar"
                className="w-full border border-[#EAEAEA] outline-none placeholder:text-[#666666] "
                value={filters.Name}
                  onChange={(ev) =>
                    setFilters({ ...filters, Name: ev.currentTarget.value })
                  }
              />

                <div className="page-button-container">
                  <span className="page-button-wrapper flex gap-2">
                    <div
                      className={`rounded-full border w-17 px-2  py-2 text-center text-[12.54px]  hover:bg-white100. hover:text-primary400 hover:border-primary400 cursor-pointer   ${filters.Type === undefined ? 'text-primary400 border-primary400 ' : 'text-white800 border-white700'}`}
                      onClick={() => {
                        setFilters({ ...filters, Type: undefined })
                      }}
                    >All ({meta.TotalCount})</div>
                    {Object.values(ApartmentType)
                      .filter((value) => typeof value === "string")
                      .map((apartmentType) => (
                        <div
                          key={apartmentType}
                          className={`rounded-full border  px-2 
                       
                         py-2 text-center text-[12.54px]  hover:bg-white100. hover:text-primary400 hover:border-primary400 cursor-pointer  ${filters.Type === ApartmentType[apartmentType as keyof typeof ApartmentType] ? 'text-primary400 border-primary400 ' : 'text-white800 border-white700 '}`}
                          onClick={() => {
                            setFilters({ ...filters, Type: ApartmentType[apartmentType as keyof typeof ApartmentType] })
                          }}
                        >
                          {apartmentType}
                          {`(${apartments.length})`}

                          {apartmentType === ApartmentType.PENDING &&
                            `(${apartments.filter(
                              (item: IApartment) =>
                                item.Status === ApartmentType.PENDING
                            ).length
                            })`}
                          {apartmentType === ApartmentType.ACTIVE &&
                            `(${apartments.filter(
                              (item: IApartment) =>
                                item.Status === ApartmentType.ACTIVE
                            ).length
                            })`}
                          {apartmentType === ApartmentType.BOOKED &&
                            `(${apartments.filter(
                              (item: IApartment) =>
                                item.Status === ApartmentType.BOOKED
                            ).length
                            })`}
                          {apartmentType === ApartmentType.CHECKEDOUT &&
                            `(${apartments.filter(
                              (item: IApartment) =>
                                item.Status === ApartmentType.CHECKEDOUT
                            ).length
                            })`}
                          {apartmentType === ApartmentType.SUSPENDED &&
                            `(${apartments.filter(
                              (item: IApartment) =>
                                item.Status === ApartmentType.SUSPENDED
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
            title: "Name",
            width: "2%",
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
            render(_column, item) {
              return <div className="py-3 ">{item?.Address?.City || ""}</div>;
            }
          },
          {
            key: "business_country",
            title: "Country",
            width: "1%",
            render(_column, item) {
              return <div className="py-3 ">{item?.Address?.Country || 0}</div>;
            }
          },
          {
            key: "total_bookings",
            title: "Total Bookings",
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
            width: "1%",
            render(_column, item) {
              return <div className="py-3 ">{item?.Rating.Likes || 0}</div>;
            }
          },
          {
            key: "status",
            title: "Status",
            width: "1%",
            render(_column, item) {
              return <div className="py-3 ">{item?.Bed || ""}</div>;
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
