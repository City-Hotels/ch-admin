import NewRoomsModal from "@/components/Business/Modals/NewRoomsModal";
import Button from "@/components/Button/Button";
import { H4 } from "@/components/Headings/Headings";
import ButtonLink from "@/components/Button/Link/Link";
import Modal from "@/components/Modal/Modal";
import { Table } from "@/components/Tables/Table/Table";
import type { IHotel } from "@/services/hotel/payload";
import { getRooms } from "@/services/room";
import { FilterRoomStatus, IRoom, IRoomFilter } from "@/services/room/payload";
import queryKeys from "@/utils/api/queryKeys";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Input from "../Inputs/Input/Input";
import FilterIcon from "@/assets/icons/filter2.svg";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import Img from "../Image/Image";
import FilterComponent from "./Filter/Filter";
import { HOTEL_PLACEHOLDER_IMAGE } from "@/utils/constants";
import { usePagination } from "../Tables/Table/Pagination";
import { Meta } from "@/utils/api/calls";

const Rooms: React.FC<{
  Limit: number;
  Filter?: IRoomFilter;
  hidePagination?: boolean;
  hotel: IHotel;
}> = ({ Limit, Filter, hidePagination, hotel }) => {
  const router = useRouter();
  const [Page, setPage] = useState(1);
  const [filters, setFilters] = useState({ ...Filter });
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [firstModal, setFirstModal] = React.useState(false);
  const { data } = useQuery([queryKeys.getHotelRooms, Limit, Page, filters], () =>
    getRooms({ Page, Limit, ...filters })
  );
  const totalRooms = data?.data.Meta;
  const rooms = (data?.data.Rooms as IRoom[]) || [];
  const meta = (data?.data.Meta as Meta) || [];

  const { currentPage, perPage, handlePageChange } = usePagination({
    defaultCurrentPage: 1,
    defaultPerPage: meta.Limit,
    refetch: (page: number) => {
      setPage(page);
    }
  });

  return (
    <div>
      <H4 className="mb-4">Manage rooms</H4>
      <div className=" bg-white">
        <Table
          headerColor="primary"
          withPagination
          className="w-full text-left rounded-sm"
          perPage={perPage}
          currentPage={currentPage}
          totalPages={meta.TotalPages}
          onPageChange={handlePageChange}
          total={meta.TotalCount}
          onRowClick={(room) => router.push(`/hotels/rooms/${room.Id}`)}
          errorMessage="You have not added any room yet"
          headerComponent={
            <div className="p-3 ">
              <div className="  flex items-center justify-between gap-3">
                <div className="md:min-w-[200px]">
                  <Input
                    type="search"
                    placeholder="Name"
                    className="w-full border border-[#EAEAEA] outline-none placeholder:text-[#666666] "
                    value={filters.Name}
                    onChange={(ev) =>
                      setFilters({ ...filters, Name: ev.currentTarget.value })
                    }
                  />
                </div>

                <div className="page-button-container">
                  <span className="page-button-wrapper flex gap-2">
                    <div
                      className={`rounded-full border w-17 px-2  py-2 text-center text-[12.54px]  hover:bg-white100. hover:text-primary400 hover:border-primary400 cursor-pointer   ${filters.Type === undefined ? "text-primary400 border-primary400 " : "text-white800 border-white700"}`}
                      onClick={() => {}}
                    >
                      All ({meta?.TotalCount})
                    </div>
                    {Object.values(FilterRoomStatus)
                      .filter((value) => typeof value === "string")
                      .map((status) => (
                        <div
                          key={status}
                          className={`rounded-full border  px-2 
                         
                           py-2 text-center text-[12.54px]  hover:bg-white100. hover:text-primary400 hover:border-primary400 cursor-pointer  ${filters.Status === FilterRoomStatus[status as keyof typeof FilterRoomStatus] ? "text-primary400 border-primary400 " : "text-white800 border-white700 "}`}
                          onClick={() => {
                            setFilters({
                              ...filters,
                              Status:
                                FilterRoomStatus[
                                  status as keyof typeof FilterRoomStatus
                                ]
                            });
                          }}
                        >
                          {status}
                          {status === FilterRoomStatus.AVAILABLEROOMS &&
                            `(${
                              rooms.filter(
                                (item: IRoom) =>
                                  item?.Status?.Status ===
                                  FilterRoomStatus.AVAILABLEROOMS
                              ).length
                            })`}
                          {status === FilterRoomStatus.BOOKED &&
                            `(${
                              rooms.filter(
                                (item: IRoom) =>
                                  item?.Status?.Status ===
                                  FilterRoomStatus.BOOKED
                              ).length
                            })`}
                        </div>
                      ))}
                  </span>
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
                <Button size="md" onClick={() => setFirstModal(true)}>
                  Add Room
                </Button>
              </div>
            </div>
          }
          header={[
            {
              key: "Name",
              title: "ROOM",
              width: "20%",
              renderHeader(column) {
                return (
                  <span className="px-3 py-4 font-inter font-semibold">
                    {column.title}
                  </span>
                );
              },
              render(_column, room) {
                return (
                  <div className="flex items-center gap-5 px-3">
                    <div className="size-[56px]">
                      <Img
                        path={`${
                          room?.Medias?.find((item) => item.Type === 2)?.Path ||
                          HOTEL_PLACEHOLDER_IMAGE
                        }`}
                        name={`room${room.Name}`}
                        className="size-full rounded-xl"
                      />
                    </div>
                    {room.Name}
                  </div>
                );
              }
            },
            {
              key: "Published_at",
              title: "BED TYPE",
              width: "10%",
              renderHeader(column) {
                return (
                  <span className="py-4 font-inter font-semibold">
                    {column.title}
                  </span>
                );
              },
              render(_column, room) {
                return <div>{room.Bed}</div>;
              }
            },
            {
              key: "Views",
              title: "ROOM TYPE",
              width: "12.5%",
              renderHeader(column) {
                return (
                  <div className="w-full py-4  text-center font-inter font-semibold">
                    {column.title}
                  </div>
                );
              },
              render(_column, room) {
                return (
                  <div className="text-center">
                    {room.Rating?.Impressions || 0}
                  </div>
                );
              }
            },
            {
              key: "MonthlyRate",
              title: "Monthly Rates ",
              width: "12.5%",
              renderHeader(column) {
                return (
                  <div className="w-full py-4  text-center font-inter font-semibold">
                    {column.title}
                  </div>
                );
              },
              render(_column, room) {
                return (
                  <div className="text-center">
                    {room.MonthlyRate || 0}
                  </div>
                );
              }
            },
            {
              key: "Bookings",
              title: "Views",
              width: "15%",
              renderHeader(column) {
                return (
                  <span className="w-full py-4 text-center  font-inter font-semibold">
                    {column.title}
                  </span>
                );
              },
              render(_column, room) {
                return (
                  <div className="text-center">
                    {room.Rating?.TotalBooking || 0}
                  </div>
                );
              }
            },
            {
              key: "NumberAvailable",
              title: "Available Rooms",
              width: "15%",
              renderHeader(column) {
                return (
                  <span className="w-full py-4 text-center  font-inter font-semibold">
                    {column.title}
                  </span>
                );
              },
              render(_column, room) {
                return (
                  <div className="text-center">
                    {room?.NumberAvailable || 0}
                  </div>
                );
              }
            },
            {
              key: "Status",
              title: "Status",
              renderHeader(column) {
                return (
                  <span className="mx-auto py-4  text-center font-inter font-semibold">
                    {column.title}
                  </span>
                );
              },
              width: "7%",
              render(_column, room) {
                // return (
                //   <div
                //     className={`${
                //       (room.Status === 0 && "bg-[#FFF8DD]") ||
                //       (room.Status === 1 && "bg-[#E5F0FD]") ||
                //       (room.Status === 2 && "bg-[#FFF5F8]") ||
                //       ""
                //     }   flex items-center justify-center gap-2 rounded-3xl px-[11px] py-[6px]`}
                //   >
                //     <div
                //       className={`text-right
                //     ${
                //       (room.Status === 0 && "text-[#E4B303]") ||
                //       (room.Status === 1 && "text-[#3554D1]") ||
                //       (room.Status === 2 && "text-[#F1416C]") ||
                //       ""
                //     }`}
                //     >
                //       {room.Status === 1 && "Published"}
                //       {room.Status === 0 && "Pending"}
                //       {room.Status === 2 && "In-review"}
                //     </div>
                //   </div>
                // );

                if (!room.Status)
                  room.Status = { Status: FilterRoomStatus.All };
                if (!room.Status.Status)
                  room.Status.Status = FilterRoomStatus.All;
                return (
                  <div
                    className={` ${
                      (room.Status.Status === FilterRoomStatus.All &&
                        "bg-[#FFF8DD] text-[#E4B303]") ||
                      (room.Status.Status === FilterRoomStatus.AVAILABLEROOMS &&
                        "bg-[#E5F0FD] text-[#3554D1]") ||
                      "bg-[#FFF5F8]  text-[#F1416C]"
                    }    inline-block rounded-full px-4 py-1`}
                  >
                    <div className="text-center text-[12px]">
                      {room?.Status?.Status === FilterRoomStatus.All &&
                        "All"}
                      {room?.Status?.Status ===
                        FilterRoomStatus.AVAILABLEROOMS && "Available Rooms"}
                      {room?.Status?.Status === FilterRoomStatus.BOOKED &&
                        "Booked"}
                    </div>
                  </div>
                );
              }
            }
          ]}
          data={rooms || []}
        />
        {rooms && rooms?.length > 0 && (
          <div className=" mt-3 flex items-center justify-center border-t py-4">
            <ButtonLink variant="text" color="text" href={"/hotels/rooms"}>
              View all
            </ButtonLink>
          </div>
        )}
      </div>
      <Modal
        openModal={firstModal}
        setOpenModal={setFirstModal}
        variant="filled"
        className=" w-11/12 overflow-y-scroll md:w-2/3 lg:w-2/4"
      >
        <NewRoomsModal hotel={hotel} />
      </Modal>

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

export default Rooms;
