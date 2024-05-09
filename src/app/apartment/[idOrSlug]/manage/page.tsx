"use client"
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ManageApartment from "@/components/ManageApartment/ManageApartment";

import { useParams } from "next/navigation";

import React from "react";

const Index: React.FC = () => {
  const { idOrSlug } = useParams<{ idOrSlug: string }>();
  return (
    <DefaultLayout>
      <>
        <ManageApartment aparmentid={idOrSlug} />
      </>
    </DefaultLayout>
  );
};

export default Index;
