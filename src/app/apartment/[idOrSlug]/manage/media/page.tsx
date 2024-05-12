"use client"
import {
  deleteApartmentMedia,
  getApartment,
  uploadApartmentMedia
} from "@/services/apartment";
import type { IMedia } from "@/services/hotel/payload";
import queryKeys from "@/utils/api/queryKeys";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useMutation, useQuery } from "react-query";
import { toastIcons } from "@/utils/constants";
import { toast } from "react-hot-toast";
import type { IApartment } from "@/services/apartment/payload";
import type { GetServerSideProps } from "next";
import ImageForm from "@/components/ImageForm/ImageForm";
import { H3 } from "@/components/Headings/Headings";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ToastWrapper from "@/components/toast/Toast";

interface ManageApartmentPageProps {
  apartment?: IApartment;
}

const EditApartmentMedia: React.FC<ManageApartmentPageProps> = ({
  apartment
}) => {
  const [apartmentMedia, setApartmentMedia] = React.useState<IMedia[]>(
    apartment?.Medias || []
  );
  const { IdOrSlug } = useParams<{IdOrSlug: string}>();
  const apartmentId = IdOrSlug ? IdOrSlug.toString() : "";

  const { refetch } = useQuery(
    [queryKeys.getApartmentByID],
    () => {
      const res = getApartment(IdOrSlug?.toString() ?? "");
      return res;
    },
    {
      onSuccess: (response) => {
        const { Medias } = response.data;
        // Set state based on response
        // eslint-disable-next-line no-console
        setApartmentMedia(Medias);
      },
      enabled: !apartment?.Id // Would only make this request if IdOrSlug is truthy
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
    <DefaultLayout>
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
//   const { IdOrSlug } = params;
//   try {
//     const apartment = await getApartment(IdOrSlug?.toString() ?? "");
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

export default EditApartmentMedia;
