import HotelBusinessTable from "@/components/Business/BusinessList/index";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "City Hotel Backend Admin  Business Table",
  description:
    "Page displaying the lists of Business on City Hotel",
};

const CalendarPage = () => {
  return (
    <DefaultLayout>
      <HotelBusinessTable />
    </DefaultLayout>
  );
};

export default CalendarPage;
