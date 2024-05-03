import SupportOfficerForm from "@/components/ManagementInformation/SupportOfficerForm";
import ToastWrapper from "@/components/toast/Toast";
import HotelAdminLayout from "@/layout/hotelAdmin/HotelAdmin";
import { updateSupportOfficerInformation } from "@/services/hotel";
import { SupportInformationPayload } from "@/services/hotel/payload";
import { toastIcons } from "@/utils/constants";
import React from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";

const index = () => {
  const hotel = useSelector(getStateHotel);

  const { Support } = hotel?.CooperateInformation || {};

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

  return (
    <HotelAdminLayout>
      <div className="w-full max-w-[600px]">
        <SupportOfficerForm manager={Support} onSubmit={onSubmit} isSubmitting={isLoading} />
      </div>
    </HotelAdminLayout>
  );
};

export default index;
