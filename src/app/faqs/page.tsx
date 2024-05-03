import React from "react";
import FAQs from "@/components/FAQs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQS Component Test Page",
  description: "Frequently Asked Questions"
};

const FAQsPage = () => {
  return <FAQs />;
};

export default FAQsPage;
