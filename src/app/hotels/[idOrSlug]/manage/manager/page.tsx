"use client";

import ManagerForm from "@/components/ManagementInformation/ManagerForm";
import ToastWrapper from "@/components/toast/Toast";
import { toastIcons } from "@/utils/constants";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import { ICooperateInformation, IHotel, ManagerInformationPayload } from "@/services/hotel/payload";
import { getHotel, getHotelCooperateInformation, updateHotelManagerInformation } from "@/services/hotel";
import { useParams } from "next/navigation";
import queryKeys from "@/utils/api/queryKeys";

const ManagerInformation = () => {
  const { idOrSlug } = useParams<{ idOrSlug: string }>();


  const { data: hotelCooperateRes } = useQuery(
    [queryKeys.getHotelCooperateInformation, idOrSlug],
    () => getHotelCooperateInformation(idOrSlug?.toString()),
    {
      enabled: !!idOrSlug// Would only make this request if slug is truthy
    }
  );
  const { Manager } = hotelCooperateRes?.data as ICooperateInformation || {};

  const { mutate, isLoading } = useMutation((payload: ManagerInformationPayload) => updateHotelManagerInformation(idOrSlug?.toString(), payload));
  const onSubmit = (values: ManagerInformationPayload) => {
    mutate(values, {
      onSuccess(data) {
        toast.success((t) => <ToastWrapper message={data?.message} t={t} />, {
          icon: toastIcons.success
        });
      }
    });
  };

  return (
    <DefaultLayout>
      <div className="w-full max-w-[600px]">
        <ManagerForm onSubmit={onSubmit} manager={Manager} isSubmitting={isLoading} />
      </div>
    </DefaultLayout>
  );
};

export default ManagerInformation;
