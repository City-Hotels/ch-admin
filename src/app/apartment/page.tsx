import React from "react";
import Apartment from "@/components/Apartment";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Next.js Apartment | CHB Admin - Dashboard",
  description:
    " Apartment page for CHB Admin  Tailwind CSS Admin Dashboard Template"
};

const ApartmentPage = () => {
  return (
    <DefaultLayout>
      <Apartment />
    </DefaultLayout>
  );
};

export default ApartmentPage;
