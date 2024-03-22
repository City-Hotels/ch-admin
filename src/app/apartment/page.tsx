import React from "react";
import Apartment from "@/components/Apartment";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Next.js Apartment | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Apartment page for TailAdmin  Tailwind CSS Admin Dashboard Template"
};

const ApartmentPage = () => {
  return (
    <DefaultLayout>
      <Apartment />
    </DefaultLayout>
  );
};

export default ApartmentPage;
