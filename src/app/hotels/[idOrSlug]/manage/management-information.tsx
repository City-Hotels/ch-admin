import ManagerForm from "@/components/ManagementInformation/ManagerForm";
import ToastWrapper from "@/components/toast/Toast";
import { toastIcons } from "@/utils/constants";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import HotelAdminLayout from "@/layout/hotelAdmin/HotelAdmin";
import React from "react";
import { ManagerInformationPayload } from "@/services/hotel/payload";
import { updateHotelManagerInformation } from "@/services/hotel";

const ManagerInformation = () => {
  const hotel = useSelector(getStateHotel);

  const { Manager } = hotel?.CooperateInformation || {};

  const { mutate, isLoading } = useMutation(updateHotelManagerInformation);

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
    <HotelAdminLayout>
      <div className="w-full max-w-[600px]">
        <ManagerForm onSubmit={onSubmit} manager={Manager} isSubmitting={isLoading} />
      </div>
    </HotelAdminLayout>
  );
};

export default ManagerInformation;
