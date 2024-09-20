"use client"
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ManageRoom from "@/components/ManageRoom/ManageRoom";
import { useParams } from "next/navigation";

import React from "react";

const Index: React.FC = () => {
  const { idOrSlug } = useParams<{ idOrSlug: string }>();
  return (
    <DefaultLayout>
      <>
        <ManageRoom roomid={idOrSlug} />
      </>
    </DefaultLayout>
  );
};

export default Index;
