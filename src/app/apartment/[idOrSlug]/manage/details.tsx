import React from "react";

import type { IApartment, IDetailsPayload } from "@/services/apartment/payload";
import UserLayout from "@/layout/user/User";
import { H3 } from "@/components/shared/headings/Headings";
import DetailsForm from "@/components/user/apartment/details-form/DetailsForm";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import { getApartment, updateApartmentDetails } from "@/services/apartment";
import ToastWrapper from "@/components/shared/toast/Toast";
import { toastIcons } from "@/utils/constants";
import { toast } from "react-hot-toast";
import Button from "@/components/shared/button/Button";
import type { GetServerSideProps } from "next";
import queryKeys from "@/utils/api/queryKeys";

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

  const { slug } = router.query;
  const apartmentId = slug ? slug.toString() : "";
  const { mutate, isLoading } = useMutation((payload: IDetailsPayload) =>
    updateApartmentDetails(apartmentId, payload)
  );

  useQuery(
    [queryKeys.getApartmentByID],
    () => {
      const res = getApartment(slug?.toString());
      return res;
    },
    {
      onSuccess: (response) => {
        const { MaxGuest, BedCount, MaxBedRoom, BathCount } = response.data;
        // Set state based on response
        // eslint-disable-next-line no-console
        setApartmentDetails({ MaxGuest, BedCount, MaxBedRoom, BathCount });
      },
      enabled: !apartment?.Id // Would only make this request if slug is truthy
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
    <UserLayout>
      <div className="w-full lg:w-[556px]">
        <H3 className="mb-5">Edit Apartment Basics</H3>
        {
          <DetailsForm
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
    </UserLayout>
  );
};

export const getServerSideProps: GetServerSideProps<
  ManageApartmentPageProps
> = async ({ params }) => {
  if (!params)
    return {
      props: {
        apartment: undefined
      }
    };
  const { slug } = params;
  try {
    const apartment = await getApartment(slug?.toString());
    return {
      props: {
        apartment: apartment.data as IApartment
      }
    };
  } catch (error) {
    return {
      props: {
        apartment: undefined
      }
    };
  }
};

export default EditApartmentDetails;
