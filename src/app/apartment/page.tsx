import React from "react";
import Apartment from "@/components/Apartment";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Hotel Apartment | Hotel Apartments Dashboard",
  description: "List of available Apartments"
};

const ApartmentPage = () => {
  return (
    <DefaultLayout>
      <Apartment />
    </DefaultLayout>
  );
};

export default ApartmentPage;
