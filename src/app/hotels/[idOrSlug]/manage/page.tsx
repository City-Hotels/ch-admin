"use client"
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { ManageAccountComponent } from "@/components/ManageHotelAccount/ManageHotelAccount";
import { useParams } from "next/navigation";

import React from "react";

const Index: React.FC = () => {
  const { idOrSlug } = useParams<{ idOrSlug: string }>();
  return (
    <DefaultLayout>
      <>
        <ManageAccountComponent hotelid={idOrSlug} />
      </>
    </DefaultLayout>
  );
};

export default Index;
