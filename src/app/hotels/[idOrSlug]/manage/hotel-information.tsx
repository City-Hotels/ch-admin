import React from "react";
import HotelInformation from "@/components/HotelInformation/HotelInformation";
import { updateHotelInformation } from "@/services/hotel";
import { toastIcons } from "@/utils/constants";
import { useMutation } from "react-query";
import ToastWrapper from "@/components/toast/Toast";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { HotelInformationPayload } from "@/services/hotel/payload";
import { AppDispatch } from "@/store";

const Hotelinformation = () => {
  const { mutate, isLoading: isSubmitting } = useMutation(updateHotelInformation);

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
    <HotelAdminLayout>
      <div className="max-w-[600px]">
        <HotelInformation onSubmit={onSubmit} hotel={hotel} isSubmitting={isSubmitting} />
      </div>
    </HotelAdminLayout>
  );
};

export default Hotelinformation;
