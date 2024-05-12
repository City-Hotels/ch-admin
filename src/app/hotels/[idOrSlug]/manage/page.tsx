"use client"
import { H4 } from "@/components/Headings/Headings";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { ManageAccountComponent } from "@/components/ManageHotelAccount/ManageHotelAccount";
import { getHotel } from "@/services/hotel";
import { IHotel } from "@/services/hotel/payload";
import queryKeys from "@/utils/api/queryKeys";
import Link from "next/link";
import { useParams } from "next/navigation";

import React from "react";
import { useQuery } from "react-query";

const Index: React.FC = () => {
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
      <>
        <H4>Manage - <Link href={`/hotels/${idOrSlug}`}>{hotel?.Name}</Link> </H4>
        <ManageAccountComponent hotelid={idOrSlug} />
      </>
    </DefaultLayout>
  );
};

export default Index;
