"use client"
import React from "react";
import HotelInformation from "@/components/HotelInformation/HotelInformation";
import { getHotel, updateHotelInformation } from "@/services/hotel";
import { toastIcons } from "@/utils/constants";
import { useMutation, useQuery } from "react-query";
import ToastWrapper from "@/components/toast/Toast";
import toast from "react-hot-toast";
import { HotelInformationPayload, IHotel } from "@/services/hotel/payload";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useParams } from "next/navigation";
import queryKeys from "@/utils/api/queryKeys";

const Hotelinformation = () => {
  const { mutate, isLoading: isSubmitting } = useMutation(updateHotelInformation);

  const { idOrSlug } = useParams<{ idOrSlug: string }>();

  const { isLoading, isError, data } = useQuery(
    [queryKeys.getHotelByID],
    () => getHotel(idOrSlug?.toString()),
    {
      enabled: !!idOrSlug // Would only make this request if slug is truthy
    }
  );

  const hotel = data?.data as IHotel;

  const onSubmit = (values: HotelInformationPayload) => {
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
      <div className="max-w-[600px]">
        {!isLoading && hotel &&
          <HotelInformation onSubmit={onSubmit} hotel={hotel} isSubmitting={isSubmitting} />}
      </div>
    </DefaultLayout>
  );
};

export default Hotelinformation;
