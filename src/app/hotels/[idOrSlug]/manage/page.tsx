import { ManageAccountComponent } from "@/components/ManageHotelAccount/ManageHotelAccount";
import HotelAdminLayout from "@/layout/hotelAdmin/HotelAdmin";

import React from "react";

const Index: React.FC = () => {
  return (
    <HotelAdminLayout>
      <>
        <ManageAccountComponent />
      </>
    </HotelAdminLayout>
  );
};

export default Index;
