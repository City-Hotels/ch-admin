"use client"
import {
  deleteApartmentMedia,
  getApartment,
  uploadApartmentMedia
} from "@/services/apartment";
import type { IMedia } from "@/services/hotel/payload";
import queryKeys from "@/utils/api/queryKeys";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { toastIcons } from "@/utils/constants";
import { toast } from "react-hot-toast";
import type { IApartment } from "@/services/apartment/payload";
import ImageForm from "@/components/ImageForm/ImageForm";
import { H3 } from "@/components/Headings/Headings";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ToastWrapper from "@/components/toast/Toast";


const EditApartmentMedia: React.FC = () => {
  const [apartmentMedia, setApartmentMedia] = React.useState<IMedia[]>([]);
  const { idOrSlug } = useParams<{ idOrSlug: string }>();
  const apartmentId = idOrSlug ? idOrSlug.toString() : "";

  const { refetch, data } = useQuery(
    [queryKeys.getApartmentByID],
    () => getApartment(idOrSlug?.toString()),
    {
      enabled: !!idOrSlug // Would only make this request if IdOrSlug is truthy
    }
  );

  const apartment = data?.data as IApartment

  useEffect(() => {
    if (apartment) setApartmentMedia(apartment.Medias)
    return () => { }
  }, [apartment])


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
          itemId={idOrSlug}
        />
      </div>
    </DefaultLayout>
  );
};


export default EditApartmentMedia;
