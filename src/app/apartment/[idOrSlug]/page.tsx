"use client";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import BookingTable from "@/components/Bookings/BookingTable";
import { useQuery } from "react-query";
import queryKeys from "@/utils/api/queryKeys";
import { useParams } from "next/navigation";
import { H3 } from "@/components/Headings/Headings";
import { getApartment } from "@/services/apartment";
import { IApartment } from "@/services/apartment/payload";

// export const metadata: Metadata = {
//   title: "City Hotel Backend Admin  Business Table",
//   description:
//     "Page displaying booking list on City Hotel",
// };

const ApartmentsPage = () => {
  const { idOrSlug } = useParams<{ idOrSlug: string }>();

  const { isLoading, isError, data } = useQuery(
    [queryKeys.getApartmentByID],
    () => getApartment(idOrSlug?.toString()),
    {
      enabled: !!idOrSlug // Would only make this request if slug is truthy
    }
  );

  const apartment = data?.data as IApartment;
  return (
    <DefaultLayout>
      <H3 className="mb-10">{apartment?.Name}</H3>
      {apartment && (
        <BookingTable Limit={5} Filter={{ RoomId: apartment?.Id }} />
      )}
    </DefaultLayout>
  );
};

export default ApartmentsPage;
