"use client";
import SupportOfficerForm from "@/components/ManagementInformation/SupportOfficerForm";
import ToastWrapper from "@/components/toast/Toast";
import { getHotel, getHotelCooperateInformation, updateSupportOfficerInformation } from "@/services/hotel";
import { ICooperateInformation, IHotel, SupportInformationPayload } from "@/services/hotel/payload";
import { toastIcons } from "@/utils/constants";
import React from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useParams } from "next/navigation";
import queryKeys from "@/utils/api/queryKeys";

const SupportOfficeFormPage = () => {
  const { idOrSlug } = useParams<{ idOrSlug: string }>();

  const { data } = useQuery(
    [queryKeys.getHotelByID, idOrSlug],
    () => getHotel(idOrSlug?.toString()),
    {
      enabled: !!idOrSlug // Would only make this request if slug is truthy
    }
  );
  const hotel = data?.data as IHotel;

  const { data: hotelCooperateRes } = useQuery(
    [queryKeys.getHotelCooperateInformation, idOrSlug],
    () => getHotelCooperateInformation(idOrSlug?.toString()),
    {
      enabled: !!hotel?.Id // Would only make this request if slug is truthy
    }
  );
  const { Support } = hotelCooperateRes?.data as ICooperateInformation || {};

  const { mutate, isLoading } = useMutation(updateSupportOfficerInformation);
  const onSubmit = (values: SupportInformationPayload) => {
    mutate(values, {
      onSuccess(data) {
        toast.success((t) => <ToastWrapper message={data?.message} t={t} />, {
          icon: toastIcons.success
        });
      }
    });
  };

  const initialValues: SupportInformationPayload = {
    Firstname: Support?.Firstname || "",
    Lastname: Support?.Lastname || "",
    Email: Support?.Email || "",
    Telephone: Support?.Telephone || ""
  };

  return (
    <DefaultLayout>
      <div className="w-full max-w-[600px]">
        {<SupportOfficerForm manager={initialValues} onSubmit={onSubmit} isSubmitting={isLoading} />}
      </div>
    </DefaultLayout>
  );
};

export default SupportOfficeFormPage;
