"use client"
import React from "react";
import type { IApartment, IDetailsPayload } from "@/services/apartment/payload";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "react-query";
import { getApartment, updateApartmentDetails } from "@/services/apartment";
import { toastIcons } from "@/utils/constants";
import { toast } from "react-hot-toast";
import type { GetServerSideProps } from "next";
import queryKeys from "@/utils/api/queryKeys";
import ApartmentDetailsForm from "@/components/ApartmentDetailsForm/ApartmentDetailsForm";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { H3 } from "@/components/Headings/Headings";
import Button from "@/components/Button/Button";
import { useParams } from "next/navigation";
import ToastWrapper from "@/components/toast/Toast";

interface ManageApartmentPageProps {
  apartment?: IApartment;
}

const EditApartmentDetails: React.FC<ManageApartmentPageProps> = ({
  apartment
}) => {
  const router = useRouter();
  const [apartmentDetails, setApartmentDetails] =
    React.useState<IDetailsPayload>({
      MaxGuest: apartment?.MaxGuest || 0,
      MaxBedRoom: apartment?.MaxBedRoom || 0,
      BedCount: apartment?.BedCount || 0,
      BathCount: apartment?.BathCount || 0
    });

  const { idOrSlug } = useParams<{ idOrSlug: string }>();
  const apartmentId = idOrSlug ? idOrSlug.toString() : "";
  const { mutate, isLoading } = useMutation((payload: IDetailsPayload) =>
    updateApartmentDetails(apartmentId, payload)
  );

  useQuery(
    [queryKeys.getApartmentByID],
    () => {
      const res = getApartment(idOrSlug?.toString());
      return res;
    },
    {
      onSuccess: (response) => {
        const { MaxGuest, BedCount, MaxBedRoom, BathCount } = response.data;
        // Set state based on response
        // eslint-disable-next-line no-console
        setApartmentDetails({ MaxGuest, BedCount, MaxBedRoom, BathCount });
      },
      enabled: !apartment?.Id // Would only make this request if idOrSlug is truthy
    }
  );

  const onSubmit = () => {
    mutate(apartmentDetails, {
      onSuccess({ message }) {
        toast.success((t) => <ToastWrapper message={message} t={t} />, {
          icon: toastIcons.success
        });
      }
    });
  };

  return (
    <DefaultLayout>
      <div className="w-full lg:w-[556px]">
        <H3 className="mb-5">Edit Apartment Basics</H3>
        {
          <ApartmentDetailsForm
            value={apartmentDetails}
            onUpdateDetails={setApartmentDetails}
          />
        }
        <div className="mt-5 flex justify-end gap-3">
          <Button size="sm" color="muted" onClick={router.back}>
            Cancel
          </Button>
          <Button
            size="sm"
            color="primary"
            onClick={onSubmit}
            isLoading={isLoading}
          >
            Save
          </Button>
        </div>
      </div>
    </DefaultLayout>
  );
};

// export const getServerSideProps: GetServerSideProps<
//   ManageApartmentPageProps
// > = async ({ params }) => {
//   if (!params)
//     return {
//       props: {
//         apartment: undefined
//       }
//     };
//   const { slug } = params;
//   try {
//     const apartment = await getApartment(slug?.toString() ?? "");
//     return {
//       props: {
//         apartment: apartment.data as IApartment
//       }
//     };
//   } catch (error) {
//     return {
//       props: {
//         apartment: undefined
//       }
//     };
//   }
// };

export default EditApartmentDetails;
