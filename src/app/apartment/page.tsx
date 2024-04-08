import React from "react";
import Apartment from "@/components/Apartment";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { ApartmentType } from "@/services/apartment/payload";

export const metadata: Metadata = {
  title: "Hotel Apartment | Hotel Apartments Dashboard",
  description: "List of available Apartments"
};

const ApartmentPage = () => {
  return (
    <DefaultLayout>
      <Apartment Limit={9} Filter={{}} />
    </DefaultLayout>
  );
};

export default ApartmentPage;
