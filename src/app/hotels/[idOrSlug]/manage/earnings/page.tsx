import { H2, H3 } from "@/components/Headings/Headings";
import React from "react";
import Transactions from "@/components/user/transactions/Transactions";
import UserEarnings from "@/components/user/earnings/Earnings";
import HotelAdminLayout from "@/layout/hotelAdmin/HotelAdmin";

const Earnings = () => {
  return (
    <HotelAdminLayout>
      <div className="grid grid-cols-1 gap-6">
        <H2>Earnings</H2>
        <div className=" bg-white p-5">
          <UserEarnings />
        </div>

        <H3>Transaction History</H3>
        <div className="bg-white p-5">
          <Transactions />
        </div>
      </div>
    </HotelAdminLayout>
  );
};

export default Earnings;
