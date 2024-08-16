import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import BookingTable from "@/components/Bookings/BookingTable";
import UsersTable from "@/components/Users/UserTable";
import { UserRoles } from "@/services/user/payload";

export const metadata: Metadata = {
  title: "Users | City Hotel Backend Admin",
  description:
    "Page displaying the lists of users on City Hotel",
};

const CalendarPage = () => {
  return (
    <DefaultLayout>
      <UsersTable Limit={9} Filter={{ Role: UserRoles.USER }} />
    </DefaultLayout>
  );
};

export default CalendarPage;
