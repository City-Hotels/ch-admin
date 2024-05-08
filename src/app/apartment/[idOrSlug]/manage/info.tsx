import Button from "@/components/shared/button/Button";
import ApartmentInfoForm from "@/components/user/apartment/apartment-info-form/ApartmentInfoForm";
import UserLayout from "@/layout/user/User";
import { getApartment, updateApartmentInformation } from "@/services/apartment";
import type {
  IApartment,
  IApartmentInformationPayload
} from "@/services/apartment/payload";
import queryKeys from "@/utils/api/queryKeys";
import { useRouter } from "next/router";
import React from "react";
import { useQuery, useMutation } from "react-query";
import ToastWrapper from "@/components/shared/toast/Toast";
import { toastIcons } from "@/utils/constants";
import { toast } from "react-hot-toast";
import type { GetServerSideProps } from "next";

interface ManageApartmentPageProps {
  apartment?: IApartment;
}

const EditApartmentInfo: React.FC<ManageApartmentPageProps> = ({
  apartment
}) => {
  const router = useRouter();
  const { slug } = router.query;
  const apartmentId = slug ? slug.toString() : "";
  const [apartmentInfo, setApartmentInfo] =
    React.useState<IApartmentInformationPayload>({
      Name: apartment?.Name || "",
      Description: apartment?.Description || ""
    });

  const { mutate, isLoading } = useMutation(
    (payload: IApartmentInformationPayload) =>
      updateApartmentInformation(apartmentId, payload)
  );

  useQuery([queryKeys.getApartmentByID], () => getApartment(apartmentId), {
    onSuccess: (response) => {
      const { Name, Description } = response.data;
      // Set state based on response
      // eslint-disable-next-line no-console
      setApartmentInfo({ Name, Description });
    },
    enabled: !apartment?.Id // Would only make this request if slug is truthy
  });

  const onSubmit = () => {
    mutate(apartmentInfo, {
      onSuccess({ message }) {
        toast.success((t) => <ToastWrapper message={message} t={t} />, {
          icon: toastIcons.success
        });
      }
    });
  };

  return (
    <UserLayout>
      <div className=" w-full lg:w-[586px]">
        <ApartmentInfoForm {...apartmentInfo} onChange={setApartmentInfo} />
        <div className="mt-11 flex justify-end gap-3">
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

export default EditApartmentInfo;
