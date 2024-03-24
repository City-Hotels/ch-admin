import HotelBusinessTable from "@/components/Business/BusinessList/index";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Next.js Calender | CHB Admin - Dashboard",
  description:
    " Calender page for CHB Admin  Tailwind CSS Admin Dashboard Template",
};

const CalendarPage = () => {
  return (
    <DefaultLayout>
      <HotelBusinessTable />
    </DefaultLayout>
  );
};

export default CalendarPage;
