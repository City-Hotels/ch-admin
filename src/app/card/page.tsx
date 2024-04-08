import React from "react";
import Card from "@/components/Featured/design";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js Card | CHB Admin - Dashboard",
  description:
    " Card page for CHB Admin  Tailwind CSS Admin Dashboard Template"
};

const CardPage = () => {
  return (
      <Card />
  );   
};

export default CardPage;
