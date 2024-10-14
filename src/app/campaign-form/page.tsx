"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AccountInfoForm from "@/components/TabComponent/AccountInfo";
import RequirementsForm from "@/components/TabComponent/Requirements";
import PriceForm from "@/components/TabComponent/Price";
import { IPromotion } from "@/services/promotions/payload";

const FormLayout = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<IPromotion>({
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
        Street: "",
      },
      MaximumBooking: 0,
      MinimumBooking: 0,
      ServiceType: "",
      Account: 0
    }
  });

  const router = useRouter();

  const onNext = () => {
    setStep((prevStep) => prevStep + 1);
  };



  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <AccountInfoForm
            formInput={formData}
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
            formInput={formData}
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
            formInput={formData}
            onSubmit={(values: IPromotion) => {
              setFormData((prevData) => ({
                ...prevData,
                ...values
              }));
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
