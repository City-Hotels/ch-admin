import React from "react";

import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Next.js E-commerce Dashboard | CHB Admin - Dashboard",
  description: " Home for CHB Admin Dashboard Template"
};

export default function Home() {
  return (
    <DefaultLayout>
      <ECommerce />
    </DefaultLayout>
  );
}
