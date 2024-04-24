import NewRoomsModal from "@/components/Business/Modals/NewRoomsModal";
import Button from "@/components/Button/Button";
import { H4 } from "@/components/Headings/Headings";
import ButtonLink from "@/components/Button/Link/Link";
import Modal from "@/components/Modal/Modal";
import { Table } from "@/components/Tables/Table/Table";
import type { IHotel } from "@/services/hotel/payload";
import { getRooms } from "@/services/room";
import { IRoom } from "@/services/room/payload";
import queryKeys from "@/utils/api/queryKeys";
import { useRouter } from "next/navigation";
import React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import Img from "../Image/Image";
import { HOTEL_PLACEHOLDER_IMAGE } from "@/utils/constants";

const Rooms: React.FC<{ hotel: IHotel }> = ({ hotel }) => {
  const router = useRouter();
  const [firstModal, setFirstModal] = React.useState(false);
  const { data } = useQuery([queryKeys.getHotelRooms], () =>
    getRooms({ HotelId: hotel?.Id })
  );
  const totalRooms = data?.data.Meta
  const rooms = data?.data.Rooms as IRoom[] || [];
  const meta = data?.data.Meta;

  return (
    <div>
      <H4 className="mb-4">Manage rooms</H4>
      <div className=" bg-white">
        <div className="flex items-center justify-between overflow-x-scroll px-2 py-4 md:overscroll-x-none">
          <div className="flex items-center gap-3">
            <div className="cursor-pointer rounded-full border border-[#989FAD] px-4 py-2 text-sm md:text-base max-[425px]:w-[107px]">
              All rooms({meta?.TotalCount})
            </div>
            <div className="cursor-pointer rounded-full border border-[#989FAD] px-4 py-2 text-sm md:text-base max-[425px]:w-[143px]">
              Available rooms({meta?.TotalCount})
            </div>
            <div className="cursor-pointer rounded-full border border-[#989FAD] px-4 py-2 text-sm md:text-base max-[425px]:w-[95px]">
              Booked(0)
            </div>
          </div>

          <Button size="md" onClick={() => setFirstModal(true)}>
            Add Room
          </Button>
        </div>
        <Table
          headerColor="primary"
          onRowClick={(room) => router.push(`/hotels/rooms/${room.Id}`)}
          errorMessage="You have not added any room yet"
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
                        path={`${room?.Medias?.find((item) => item.Type === 2)?.Path ||
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
              key: "Bookings",
              title: "Views",
              width: "20%",
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
              key: "status",
              title: "Status",
              renderHeader(column) {
                return (
                  <span className="mx-auto py-4  text-center font-inter font-semibold">
                    {column.title}
                  </span>
                );
              },
              width: "18%",
              render(_column, room) {
                return (
                  <div
                    className={`${(room.Status === 0 && "bg-[#FFF8DD]") ||
                      (room.Status === 1 && "bg-[#E5F0FD]") ||
                      (room.Status === 2 && "bg-[#FFF5F8]") ||
                      ""
                      }   flex items-center justify-center gap-2 rounded-3xl px-[11px] py-[6px]`}
                  >
                    <div
                      className={`text-right 
                    ${(room.Status === 0 && "text-[#E4B303]") ||
                        (room.Status === 1 && "text-[#3554D1]") ||
                        (room.Status === 2 && "text-[#F1416C]") ||
                        ""
                        }`}
                    >
                      {room.Status === 1 && "Published"}
                      {room.Status === 0 && "Pending"}
                      {room.Status === 2 && "In-review"}
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
            <ButtonLink variant="text" color="text" href={"/hotel/rooms"}>
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
    </div>
  );
};

export default Rooms;
