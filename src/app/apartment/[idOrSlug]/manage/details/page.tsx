"use client"
import React, { useCallback, useEffect } from "react";
import type { IApartment, IDetailsPayload } from "@/services/apartment/payload";
import { useMutation, useQuery } from "react-query";
import { getApartment, updateApartmentDetails } from "@/services/apartment";
import { toastIcons } from "@/utils/constants";
import { toast } from "react-hot-toast";
import queryKeys from "@/utils/api/queryKeys";
import ApartmentDetailsForm from "@/components/ApartmentDetailsForm/ApartmentDetailsForm";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { H3 } from "@/components/Headings/Headings";
import { useParams } from "next/navigation";
import ToastWrapper from "@/components/toast/Toast";

const EditApartmentDetails: React.FC = () => {
  const { idOrSlug } = useParams<{ idOrSlug: string }>();

  const { data, refetch } = useQuery(
    [queryKeys.getApartmentByID],
    () => getApartment(idOrSlug?.toString()),
    {
      enabled: !!idOrSlug // Would only make this request if apartment was not fetch in server side
    }
  );

  const { MaxAdults,
    MaxChildren,
    MaxPets, BedCount, MaxBedRoom, BathCount } = data?.data as IApartment || {
      MaxAdults: 0,
      MaxChildren: 0,
      MaxPets: 0, BedCount: 0, MaxBedRoom: 0, BathCount: 0
    }

  const [apartmentDetails, setApartmentDetails] =
    React.useState<IDetailsPayload>({
      MaxAdults,
      MaxChildren,
      MaxPets, BedCount, MaxBedRoom, BathCount
    });

  useEffect(() => {
    setApartmentDetails({
      MaxAdults,
      MaxChildren,
      MaxPets, BedCount, MaxBedRoom, BathCount
    })
    return () => { }
  }, [MaxAdults,
    MaxChildren,
    MaxPets, BedCount, MaxBedRoom, BathCount, setApartmentDetails])


  const { mutate, isLoading } = useMutation((payload: IDetailsPayload) =>
    updateApartmentDetails(idOrSlug?.toString(), payload)
  );

  const onSubmit = useCallback((details: IDetailsPayload) => {
    mutate(details, {
      onSuccess({ message }) {
        refetch();
        toast.success((t) => <ToastWrapper message={message} t={t} />, {
          icon: toastIcons.success
        });
      },
      onError(error: any) {
        console.log({ error })
        refetch();
        toast.success((t) => <ToastWrapper message={"Update failed: " + error.message} t={t} />, {
          icon: toastIcons.error
        });
      },
    });
  }, [mutate, refetch]);

  useEffect(() => {
    onSubmit(apartmentDetails)
    return () => { }
  }, [apartmentDetails, onSubmit])

  return (
    <DefaultLayout>
      <div className="w-full lg:w-[556px]">
        <H3 className="mb-5">Edit Apartment Basics</H3>
        {
          <ApartmentDetailsForm
            isSubmitting={isLoading}
            value={apartmentDetails}
            onUpdateDetails={setApartmentDetails}
          />
        }
      </div>
    </DefaultLayout>
  );
};

export default EditApartmentDetails;
