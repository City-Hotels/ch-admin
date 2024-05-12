"use client";
import { H2, H3 } from "@/components/Headings/Headings";
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TransactionTable from "@/components/Transactions/TransactionTable";
import UserEarnings from "@/components/Earnings/Earnings";
import { getHotel } from "@/services/hotel";
import { IHotel } from "@/services/hotel/payload";
import queryKeys from "@/utils/api/queryKeys";
import { useQuery } from "react-query";
import { useParams } from "next/navigation";

const Earnings = () => {

  const { idOrSlug } = useParams<{ idOrSlug: string }>();

  const { data } = useQuery(
    [queryKeys.getHotelByID, idOrSlug],
    () => getHotel(idOrSlug?.toString()),
    {
      enabled: !!idOrSlug // Would only make this request if slug is truthy
    }
  );

  const hotel = data?.data as IHotel;
  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-6">
        <H2>Earnings</H2>
        <div className=" bg-white p-5">
          <UserEarnings />
        </div>

        <H3>Transaction History</H3>
        <div className="bg-white p-5">
          <TransactionTable Filter={{ UserId: hotel?.Id }} Limit={5} />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Earnings;
