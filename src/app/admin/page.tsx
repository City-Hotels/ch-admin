import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import UsersTable from "@/components/Users/UserTable";
import { UserRoles } from "@/services/user/payload";

export const metadata: Metadata = {
  title: "City Hotel Backend Admin  Business Table",
  description:
    "Page displaying the lists of Business on City Hotel",
};

const CalendarPage = () => {
  return (
    <DefaultLayout>
      <UsersTable Limit={10} Filter={{ Role: UserRoles.ADMIN }} />
    </DefaultLayout>
  );
};

export default CalendarPage;
