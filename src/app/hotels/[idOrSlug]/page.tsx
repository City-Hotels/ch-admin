"use client";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import BookingTable from "@/components/Bookings/BookingTable";
import { useQuery } from "react-query";
import queryKeys from "@/utils/api/queryKeys";
import { getHotel } from "@/services/hotel";
import { useParams } from "next/navigation";
import { IHotel } from "@/services/hotel/payload";
import { H3, H4 } from "@/components/Headings/Headings";
import SummaryCard from "@/components/Business/SummaryCard/SummaryCard";
import Rooms from "@/components/Business/Rooms";
import RoomTypes from "@/components/Business/RoomTypes";
import Facilities from "@/components/Business/Facilities";
import UserCard from "@/components/Business/userCard/UserCard";

import ButtonLink from "@/components/Button/Link/Link";
import React from "react";
import NewRoomsModal from "@/components/Business/Modals/NewRoomsModal";
import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import Review from "@/components/Business/review/Review";

// export const metadata: Metadata = {
//   title: "City Hotel Backend Admin  Business Table",
//   description:
//     "Page displaying booking list on City Hotel",
// };

const HotelPage = () => {
  const { idOrSlug } = useParams<{ idOrSlug: string }>();
  const { isLoading, isError, data } = useQuery(
    [queryKeys.getHotelByID],
    () => getHotel(idOrSlug?.toString()),
    {
      enabled: !!idOrSlug // Would only make this request if slug is truthy
    }
  );
  const hotel = data?.data as IHotel;
  const [firstModal, setFirstModal] = React.useState(false);

  return (
    <DefaultLayout>
      {hotel && (
        <div className="flex flex-col gap-9">
          <SummaryCard hotel={hotel} path="/apartment-01.jpg" />
          <BookingTable Limit={5} Filter={{ HostId: hotel?.Id }} />

          <div className="bg-white ">
            <div className="flex items-center justify-between my-4 mx-3">
              <H4 className="mb-4">Manage rooms</H4>
              <Button size="md" onClick={() => setFirstModal(true)}>
                Add Room
              </Button>
            </div>

            <Rooms Limit={5} Filter={{ HotelId: hotel.Id }} />
            {
              <div className=" mt-3 flex items-center justify-center border-t py-4">
                <ButtonLink variant="text" color="text" href={`/hotels/rooms?hotelid=${hotel.Id}`}>
                  View all
                </ButtonLink>
              </div>
            }

            <Modal
              openModal={firstModal}
              setOpenModal={setFirstModal}
              variant="filled"
              className=" w-11/12 overflow-y-scroll md:w-2/3 lg:w-2/4"
            >
              <NewRoomsModal hotel={hotel} />
            </Modal>
          </div>

          <Review hotel={hotel} />
          {/* <RoomTypes hotel={hotel}/> */}
          <Facilities hotel={hotel} />
          <UserCard />
        </div>
      )}
    </DefaultLayout>
  );
};

export default HotelPage;
