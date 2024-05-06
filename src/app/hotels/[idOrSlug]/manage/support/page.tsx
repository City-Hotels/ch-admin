import SupportOfficerForm from "@/components/ManagementInformation/SupportOfficerForm";
import ToastWrapper from "@/components/toast/Toast";
import { getHotel, updateSupportOfficerInformation } from "@/services/hotel";
import { IHotel, SupportInformationPayload } from "@/services/hotel/payload";
import { toastIcons } from "@/utils/constants";
import React from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useParams } from "next/navigation";
import queryKeys from "@/utils/api/queryKeys";

const index = () => {

  const { idOrSlug } = useParams<{ idOrSlug: string }>();

  const { data } = useQuery(
    [queryKeys.getHotelByID],
    () => getHotel(idOrSlug?.toString()),
    {
      enabled: !!idOrSlug // Would only make this request if slug is truthy
    }
  );

  const hotel = data?.data as IHotel;

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
    <DefaultLayout>
      <div className="w-full max-w-[600px]">
        <SupportOfficerForm manager={Support} onSubmit={onSubmit} isSubmitting={isLoading} />
      </div>
    </DefaultLayout>
  );
};

export default index;
