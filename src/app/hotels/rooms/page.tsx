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
import Rooms from "@/components/Business/Rooms";


// export const metadata: Metadata = {
//   title: "City Hotel Backend Admin  Business Table",
//   description:
//     "Page displaying booking list on City Hotel",
// };

const RoomsPage = () => {
  return (
    <DefaultLayout>
      {(
        <div className="flex flex-col gap-9">      
          <Rooms Limit={5} Filter={{}}  />
        </div>
      )}
    </DefaultLayout>
  );
};

export default RoomsPage;
