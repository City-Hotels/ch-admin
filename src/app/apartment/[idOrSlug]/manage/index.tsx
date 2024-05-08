import { EditApartmentInformation } from "@/components/user/apartment/edit-apartment/EditApartment";
import UserLayout from "@/layout/user/User";

import React from "react";

const Index: React.FC = () => {
  return (
    <UserLayout>
      <EditApartmentInformation />
    </UserLayout>
  );
};

export default Index;
