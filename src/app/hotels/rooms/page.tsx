"use client";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useSearchParams } from "next/navigation";
import Rooms from "@/components/Business/Rooms";


// export const metadata: Metadata = {
//   title: "City Hotel Backend Admin  Business Table",
//   description:
//     "Page displaying booking list on City Hotel",
// };


const RoomsPage = () => {
  const searchParams = useSearchParams()
  const hotelId  = searchParams.get('hotelid')

  return (
    <DefaultLayout>
      {(
        <div className="flex flex-col gap-9">      
       {
        hotelId &&  <Rooms Limit={5} Filter={{HotelId: hotelId}}  />
       }  
        </div>
      )}
    </DefaultLayout>
  );
};

export default RoomsPage;
