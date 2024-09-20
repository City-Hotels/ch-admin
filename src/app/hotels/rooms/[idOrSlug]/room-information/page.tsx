"use client"
import React from "react";
import { toastIcons } from "@/utils/constants";
import { useMutation, useQuery } from "react-query";
import ToastWrapper from "@/components/toast/Toast";
import toast from "react-hot-toast";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useParams } from "next/navigation";
import queryKeys from "@/utils/api/queryKeys";
import { IRoom, IRoomInformationPayload } from "@/services/room/payload";
import { getRoom, updateRoomInformation } from "@/services/room";
import RoomInformationForm from "@/components/RoomInformation/RoomInformation";

const RoomInformation = () => {
  const { idOrSlug } = useParams<{ idOrSlug: string }>();
  const roomId = idOrSlug ? idOrSlug.toString() : "";
  const { mutate, isLoading: isSubmitting } = useMutation( (payload: IRoomInformationPayload) => updateRoomInformation(roomId, payload)
);

  const { isLoading, isError, data } = useQuery(
    [queryKeys.getRoomsByID, idOrSlug],
    () => getRoom(idOrSlug?.toString()),
    {
      enabled: !!idOrSlug // Would only make this request if slug is truthy
    }
  );
  const room = data?.data as IRoom;

  const onSubmit = (values: IRoomInformationPayload) => {
    mutate(values, {
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
        {!isLoading && room &&
          <RoomInformationForm onSubmit={onSubmit} room={room} isSubmitting={isSubmitting} />}
      </div>
    </DefaultLayout>
  );
};

export default RoomInformation;
