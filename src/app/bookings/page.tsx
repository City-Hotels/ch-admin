import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import BookingTable from "@/components/Bookings/BookingTable";

export const metadata: Metadata = {
  title: "City Hotel Backend Admin  Business Table",
  description:
    "Page displaying booking list on City Hotel",
};

const BookingsPage = () => {
  return (
    <DefaultLayout>
      <BookingTable Limit={9} Filter={{}} />
    </DefaultLayout>
  );
};

export default BookingsPage;
