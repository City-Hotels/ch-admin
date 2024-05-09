import { H3 } from "@/components/shared/headings/Headings";
import UserLayout from "@/layout/user/User";
import {
  deleteApartmentMedia,
  getApartment,
  uploadApartmentMedia
} from "@/services/apartment";
import type { IMedia } from "@/services/hotel/payload";
import queryKeys from "@/utils/api/queryKeys";
import { useRouter } from "next/router";
import React from "react";
import { useMutation, useQuery } from "react-query";
import ToastWrapper from "@/components/shared/toast/Toast";
import { toastIcons } from "@/utils/constants";
import { toast } from "react-hot-toast";
import type { IApartment } from "@/services/apartment/payload";
import type { GetServerSideProps } from "next";
import ImageForm from "@/components/ImageForm/ImageForm";

interface ManageApartmentPageProps {
  apartment?: IApartment;
}

const EditApartmentMedia: React.FC<ManageApartmentPageProps> = ({
  apartment
}) => {
  const [apartmentMedia, setApartmentMedia] = React.useState<IMedia[]>(
    apartment?.Medias || []
  );
  const router = useRouter();
  const { slug } = router.query;
  const apartmentId = slug ? slug.toString() : "";

  const { refetch } = useQuery(
    [queryKeys.getApartmentByID],
    () => {
      const res = getApartment(slug?.toString());
      return res;
    },
    {
      onSuccess: (response) => {
        const { Medias } = response.data;
        // Set state based on response
        // eslint-disable-next-line no-console
        setApartmentMedia(Medias);
      },
      enabled: !apartment?.Id // Would only make this request if slug is truthy
    }
  );

  const { mutate } = useMutation((media: IMedia) =>
    deleteApartmentMedia(apartmentId, media.Path)
  );

  const onDelete = async (mediaId: string) => {
    const index = apartmentMedia.findIndex((item) => item.Path === mediaId);
    const medias = apartmentMedia;
    const deleted = medias.splice(index, 1);
    setApartmentMedia(medias);
    if (deleted[0])
      mutate(deleted[0], {
        onSuccess({ message }) {
          refetch();
          toast.success((t) => <ToastWrapper message={message} t={t} />, {
            icon: toastIcons.success
          });
        }
      });
  };

  return (
    <UserLayout>
      <div className=" max-w-[586px]">
        <H3 className="mb-8">Edit Photos</H3>
        <ImageForm
          onSelected={uploadApartmentMedia}
          selected={undefined}
          uploaded={apartmentMedia}
          onDelete={onDelete}
          itemId={apartment?.Id}
        />
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

export default EditApartmentMedia;
