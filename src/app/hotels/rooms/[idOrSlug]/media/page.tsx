"use client"
import type { IMedia } from "@/services/hotel/payload";
import queryKeys from "@/utils/api/queryKeys";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { toastIcons } from "@/utils/constants";
import { toast } from "react-hot-toast";
import ImageForm from "@/components/ImageForm/ImageForm";
import { H3 } from "@/components/Headings/Headings";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ToastWrapper from "@/components/toast/Toast";
import { deleteRoomMedia, getRoom, uploadRoomMedia } from "@/services/room";
import { IRoom } from "@/services/room/payload";


const EdiRoomMedia: React.FC = () => {
  const [roomMedia, setRoomMedia] = React.useState<IMedia[]>([]);
  const { idOrSlug } = useParams<{ idOrSlug: string }>();
  const roomId = idOrSlug ? idOrSlug.toString() : "";

  const { refetch, data } = useQuery(
    [queryKeys.getRoomByID],
    () => getRoom(idOrSlug?.toString()),
    {
      enabled: !!idOrSlug // Would only make this request if IdOrSlug is truthy
    }
  );

  const room = data?.data as IRoom

  useEffect(() => {
    if (room) setRoomMedia(room.Medias)
    return () => { }
  }, [room])


  const { mutate } = useMutation((media: IMedia) =>
    deleteRoomMedia(roomId, media.Path)
  );

  const onDelete = async (mediaId: string) => {
    const index = roomMedia.findIndex((item) => item.Path === mediaId);
    const medias = roomMedia;
    const deleted = medias.splice(index, 1);
    setRoomMedia(medias);
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
          onSelected={uploadRoomMedia}
          selected={undefined}
          uploaded={roomMedia}
          onDelete={onDelete}
          itemId={idOrSlug}
        />
      </div>
    </DefaultLayout>
  );
};


export default EdiRoomMedia;
