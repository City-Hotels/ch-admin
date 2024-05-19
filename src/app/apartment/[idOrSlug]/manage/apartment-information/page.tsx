"use client";
import React, { useEffect } from "react";
import ApartmentInfo from "@/components/ApartmentInformation/ApartmentInformation";
import { toastIcons } from "@/utils/constants";
import { useMutation, useQuery } from "react-query";
import ToastWrapper from "@/components/toast/Toast";
import toast from "react-hot-toast";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useParams } from "next/navigation";
import queryKeys from "@/utils/api/queryKeys";
import { getApartment, updateApartmentInformation } from "@/services/apartment";
import {
  IApartment,
  IApartmentInformationPayload
} from "@/services/apartment/payload";

const AparmtentInformation = () => {
  const { idOrSlug } = useParams<{ idOrSlug: string }>();

  const { isLoading, isError, data } = useQuery(
    [queryKeys.getApartmentByID],
    () => getApartment(idOrSlug?.toString()),
    {
      enabled: !!idOrSlug // Would only make this request if slug is truthy
    }
  );

  const { Name, Description } = (data?.data as IApartment) || {
    Name: "",
    Description: ""
  };

  const [aparmentInformation, setAparmentInformation] =
    React.useState<IApartmentInformationPayload>({
      Name,
      Description
    });

  useEffect(() => {
    setAparmentInformation({
      Name,
      Description
    });
    return () => {console.log(Name, Description)};
  }, [Name, Description]);

  const { mutate, isLoading: isSubmitting } = useMutation(
   (payload: IApartmentInformationPayload) =>  updateApartmentInformation(idOrSlug?.toString(), payload)
  );

  const onSubmit = (info: IApartmentInformationPayload) => {
    mutate(info, {
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
        {!isLoading && Name && Description && (
          <ApartmentInfo
            onSubmit={onSubmit}
            apartment={aparmentInformation}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </DefaultLayout>
  );
};

export default AparmtentInformation;
