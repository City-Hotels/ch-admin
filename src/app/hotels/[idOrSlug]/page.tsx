"use client";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import BookingTable from "@/components/Bookings/BookingTable";
import { useQuery } from "react-query";
import queryKeys from "@/utils/api/queryKeys";
import { getHotel } from "@/services/hotel";
import { useParams } from "next/navigation";
import { IHotel } from "@/services/hotel/payload";
import { H3 } from "@/components/Headings/Headings";
import SummaryCard from "@/components/Business/SummaryCard/SummaryCard";
import Rooms from "@/components/Business/Rooms";
import RoomTypes from "@/components/Business/RoomTypes";
import Facilities from "@/components/Business/Facilities";
import UserCard from "@/components/Business/userCard/UserCard";
import Review from "@/components/Business/review/Review";
import ButtonLink from "@/components/Button/Link/Link";

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
  return (
    <DefaultLayout>
      <H3 className="mb-10">{hotel?.Name}</H3>
      {hotel && (
        <div className="flex flex-col gap-9">
          <SummaryCard hotel={hotel} path="/apartment-01.jpg" />
          <BookingTable Limit={5} Filter={{ HostId: hotel?.Id }} />
          <Rooms Limit={5} Filter={{}} />
          { (
            <div className=" mt-3 flex items-center justify-center border-t py-4">
              <ButtonLink variant="text" color="text" href={"/hotels/rooms"}>
                View all
              </ButtonLink>
            </div>
          )}
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
