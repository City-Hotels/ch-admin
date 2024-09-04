"use client";
// import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AccountInfoForm from "@/components/TabComponent/AccountInfo";
import RequirementsForm from "@/components/TabComponent/Requirements";
import PriceForm from "@/components/TabComponent/Price";
import { submitCampaign } from "@/services/promotions";
import { useMutation } from "react-query";
import { IPromotion } from "@/services/promotions/payload";

// export const metadata: Metadata = {
//   title: "Next.js Form Layout | CHB Admin - Dashboard",
//   description:
//     " Form Layout page for CHB Admin - Next.js Tailwind CSS Admin Dashboard Template"
// };

const FormLayout = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<IPromotion>({
    // Initialize formData with default values or empty strings
    Name: "",
    Title: "",
    Description: "",
    ShortDescription: "",
    MaxParticipant: 0,
    Created_at: { seconds: 0, nanos: 0 },
    Updated_at: { seconds: 0, nanos: 0 },
    Pricing: {
      BookingDiscount: 0,
      PricingType: 0,
      Rate: 0,
      Unit: ""
    },
    Requirement: {
      Location: {
        City: "",
        Country: "",
        PostalCode: "",
        State: "",
        Street: ""
      },
      MaximumBooking: 0,
      MinimumBooking: 0,
      ServiceType: "",
      Account: 0
    },
  });

  const router = useRouter();

  const onNext = () => {
    // Move to next step
    setStep((prevStep) => prevStep + 1);
  };



  const { mutate, isLoading: loading } = useMutation(submitCampaign);
  const handleSubmit = (values: typeof formData) => {
    mutate(values, {
      onSuccess(data) {
        router.push("");
      }
    });
  };

  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <AccountInfoForm
            onSubmit={(values: IPromotion) => {
              setFormData((prevData) => ({
                ...prevData,
                ...values
              }));
              onNext();
            }}
          />
        );
      case 2:
        return (
          <RequirementsForm
            onSubmit={(values: IPromotion) => {
              setFormData((prevData) => ({
                ...prevData,
                ...values
              }));
              onNext();
            }}
          />
        );
      case 3:
        return (
          <PriceForm
            onSubmit={(values: IPromotion) => {
              setFormData((prevData) => ({
                ...prevData,
                ...values
              }));
              handleSubmit(formData);
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <DefaultLayout>
      <div>
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h1 className="font-medium text-black dark:text-white">
                Campaign Form
              </h1>
            </div>

            {renderForm()}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default FormLayout;
