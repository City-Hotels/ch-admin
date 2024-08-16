import HotelBusinessTable from "@/components/Business/BusinessList/index";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Hotels | City Spaces Backend Admin Business Table",
  description:
    "Page displaying the lists of Hotels on City Spaces and Bookings",
};

const HotelListPage = () => {
  return (
    <DefaultLayout>
      <HotelBusinessTable Limit={9} Filter={{ }} />
    </DefaultLayout>
  );
};

export default HotelListPage;
