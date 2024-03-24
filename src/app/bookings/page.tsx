import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import BookingTable from "@/components/Bookings/BookingTable";

export const metadata: Metadata = {
  title: "City Hotel Backend Admin  Business Table",
  description:
    "Page displaying the lists of Business on City Hotel",
};

const CalendarPage = () => {
  return (
    <DefaultLayout>
      <BookingTable Limit={10} Filter={{}} />
    </DefaultLayout>
  );
};

export default CalendarPage;
