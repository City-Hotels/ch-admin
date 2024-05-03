import React from "react";
import EditPassword from "@/components/EditPasswordInfo/EditPassword";
import HotelAdminLayout from "@/layout/hotelAdmin/HotelAdmin";
import { H3 } from "@/components/Headings/Headings";

const SecurityInformation = () => {
  return (
    <HotelAdminLayout>
      <div className="w-[600px]">
        <H3 className="mb-10">Update Password</H3>

        <EditPassword />
      </div>
    </HotelAdminLayout>
  );
};

export default SecurityInformation;
