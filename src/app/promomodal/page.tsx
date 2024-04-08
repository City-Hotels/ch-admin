import React from "react";
import PromotionsModal from "@/components/Promotionsmodal/modal";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js promomodal | CHB Admin - Dashboard",
  description:
    " Promomodal page for CHB Admin  Tailwind CSS Admin Dashboard Template"
};

const PromomodalPage = () => {
  return (
      <PromotionsModal/>
  );
};

export default PromomodalPage;
