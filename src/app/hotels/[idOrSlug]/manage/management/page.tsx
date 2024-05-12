"use client";
import React, { useCallback } from "react";
import type {
  ICooperateInformation,
  IHotel,
  IManagementInformationPayload
} from "@/services/hotel/payload";

import { H5 } from "@/components/Headings/Headings";
import { useMutation, useQuery } from "react-query";
import toast from "react-hot-toast";
import ToastWrapper from "@/components/toast/Toast";
import { toastIcons } from "@/utils/constants";
import { getHotel, getHotelCooperateInformation, updateHotelManagementInformation } from "@/services/hotel";
import Input from "@/components/Inputs/Input/Input";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import queryKeys from "@/utils/api/queryKeys";
import { useParams, useRouter } from "next/navigation";

const Form2: React.FC<{
  managementInfo: IManagementInformationPayload;
  hasParentCompany: boolean;
  setManagement: (data: IManagementInformationPayload) => void;
}> = ({ managementInfo, hasParentCompany, setManagement }) => {
  return (
    <div className="flex flex-col justify-center gap-8">
      <H5>Company Information</H5>
      <Input
        readOnly
        name="country"
        label="Country"
        value={managementInfo?.Country}
      />
      <Input
        className=""
        label="Parent Company"
        name="ParentCompany"
        value={managementInfo.ParentCompany}
        onChange={(ev) =>
          setManagement({
            ...managementInfo,
            ParentCompany: ev.currentTarget.value
          })
        }
      />

      <Input
        className=""
        label="Business Registration Number"
        name="BusinessRegistration"
        value={managementInfo.BusinessRegistration}
        onChange={(ev) =>
          setManagement({
            ...managementInfo,
            BusinessRegistration: ev.currentTarget.value
          })
        }
      />
    </div>
  );
};

export default function Type() {
  const router = useRouter();
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
  const { ParentCompany } = hotelCooperateRes?.data as ICooperateInformation || {};

  const [management, setManagement] =
    React.useState<IManagementInformationPayload>({
      ParentCompany: ParentCompany?.Name || "",
      BusinessRegistration:
        ParentCompany?.BusinessRegistration || "",
      Country:
        ParentCompany?.OfficeAddress?.Country ||
        hotel?.Address?.Country ||
        ""
    });
  const [hasParentCompany, setHasParentCompany] = React.useState(false);
  const [form, setForm] = React.useState<"form1" | "form2">("form1");

  const { mutate, isLoading } = useMutation(updateHotelManagementInformation);

  const onSubmit = useCallback(() => {
    if (form === "form1") {
      setForm("form2");
      return;
    }

    mutate(management, {
      onSuccess(data) {
        toast.success((t) => <ToastWrapper message={data?.message} t={t} />, {
          icon: toastIcons.success
        });
        router.push("manager");
      }
    });
  }, [management]);

  return (
    <DefaultLayout>
      <div className="m-10 w-full max-w-[600px]">
        <Form2
          managementInfo={management}
          hasParentCompany={hasParentCompany}
          setManagement={setManagement}
        />
      </div>
    </DefaultLayout>
  );
}
