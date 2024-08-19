"use client";
import React from "react";
import EditPassword from "@/components/EditPasswordInfo/EditPassword";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { H3 } from "@/components/Headings/Headings";

const SecurityInformation = () => {
  return (
    <DefaultLayout>
      <div className="w-[600px]">
        <H3 className="mb-10">Update Password</H3>

        <EditPassword />
      </div>
    </DefaultLayout>
  );
};

export default SecurityInformation;
