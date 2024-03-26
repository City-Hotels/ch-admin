import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MembershipTable from "@/components/Memberships/MembershipsTable";

export const metadata: Metadata = {
  title: "City Hotel Backend Admin  Memberships Table",
  description:
    "Page displaying Memberships list on City Hotel",
};

const Memberships = () => {
  return (
    <DefaultLayout>
      <MembershipTable Limit={9} Filter={{}} />
    </DefaultLayout>
  );
};

export default Memberships;
