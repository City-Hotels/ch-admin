import {
  ApiResponse,
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
  putRequest
} from "../../utils/api/calls";
import type { IFacility, IMedia } from "../hotel/payload";
import type {
  ICreateRoomByTypePayload,
  ICreateRoomPayload,
  ICreateRoomResponse,
  ICreateRoomTypeResponse,
  IDetailsPayload,
  IGetRoomsResponse,
  IPricingPayload,
  IRoom,
  IRoomFilter,
  IRoomInformationPayload,
  IRoomType,
  IUpdateRoomPayload,
  IUpdateRoomResponse,
  Meta
} from "./payload";

const getTopRooms = () => {
  return getRequest<IGetRoomsResponse>({
    url: "rooms/search"
  });
};

const addRoom = (data: ICreateRoomPayload) => {
  return postRequest<ICreateRoomPayload, ICreateRoomResponse>({
    url: "rooms",
    data
  });
};

const addRoomByType = (data: ICreateRoomByTypePayload) => {
  return postRequest<ICreateRoomByTypePayload, ICreateRoomResponse>({
    url: "rooms/bytype",
    data
  });
};

const getRooms = (
  filter: IRoomFilter
): Promise<
  ApiResponse<{
    Meta: Meta;
    Rooms: IRoom[];
  }>
> => {
  const args = Object.keys(filter)
    .map(
      (item) =>
        `${encodeURIComponent(item)}=${encodeURIComponent(
          (filter as any)[item]
        )}`
    )
    .join("&");
  return getRequest<{ Rooms: IRoom[]; Meta: Meta }>({
    url: `rooms?${args}`
  });
};

const getRoom = (roomId: string | undefined) => {
  return getRequest<IRoom>({
    url: `rooms/${roomId}`
  });
};

const updateRoom = (data: IUpdateRoomPayload) => {
  return patchRequest<IUpdateRoomPayload, IUpdateRoomResponse>({
    url: `rooms/${data.Id}`,
    data
  });
};

const updateRoomInformation = (
  roomid: string,
  data: IRoomInformationPayload
) => {
  return patchRequest<IRoomInformationPayload, any>({
    url: `rooms/${roomid}/info`,
    data
  });
};

const updateRoomPrice = (roomid: string, data: IPricingPayload) => {
  return patchRequest<IPricingPayload, any>({
    url: `rooms/${roomid}/price`,
    data
  });
};

const updateRoomDetails = (roomid: string, data: IDetailsPayload) => {
  return patchRequest<IDetailsPayload, any>({
    url: `rooms/${roomid}/basics`,
    data
  });
};
const updateRoomFacilities = (roomid: string, data: IFacility[]) => {
  return putRequest<IFacility[], any>({
    url: `rooms/${roomid}/facilities`,
    data
  });
};

const uploadRoomMedia = (
  roomid: string,
  file: FormData,
  setProgress: Function
) => {
  return putRequest<FormData, { Path: string }>({
    url: `rooms/${roomid}/media`,
    data: file,
    config: {
      onUploadProgress: (ProgressEvent) => {
        if (ProgressEvent.total)
          setProgress((ProgressEvent.loaded / ProgressEvent.total) * 100);
      }
    }
  });
};

const uploadRoomBanner = (
  roomid: string,
  file: FormData,
  setProgress: Function
) => {
  return putRequest<FormData, { Path: string }>({
    url: `rooms/${roomid}/banner`,
    data: file,
    config: {
      onUploadProgress: (ProgressEvent) => {
        if (ProgressEvent.total)
          setProgress((ProgressEvent.loaded / ProgressEvent.total) * 100);
      }
    }
  });
};

const deleteRoomMedia = (roomid: string, path: string, type = 2) => {
  return deleteRequest<IMedia, null>({
    url: `host/apartments/${roomid}/media?Path=${path}&Type=${type}`
  });
};

const getRoomType = (idOrslug: string) => {
  return getRequest<IRoomType>({
    url: `rooms/types/${idOrslug}`
  });
};

const getRoomTypes = (data: any) => {
  const args = Object.keys(data)
    .map(
      (item) => `${encodeURIComponent(item)}=${encodeURIComponent(data[item])}`
    )
    .join("&");
  return getRequest<{ RoomTypes: IRoomType[]; Meta: Meta }>({
    url: `rooms/types?${args}`
  });
};

const addRoomType = (data: IRoomType) => {
  return postRequest<IRoomType, ICreateRoomTypeResponse>({
    url: "rooms/types",
    data
  });
};

const deleteRoomType = (data: IRoomType) => {
  return deleteRequest({
    url: `rooms/types/${data.Id}`
  });
};

const uploadRoomTypeMedia = (
  roomTypeId: string,
  file: FormData,
  setProgress: Function
) => {
  return putRequest<FormData, { Path: string }>({
    url: `rooms/types/${roomTypeId}/media`,
    data: file,
    config: {
      onUploadProgress: (ProgressEvent) => {
        if (ProgressEvent.total)
          setProgress((ProgressEvent.loaded / ProgressEvent.total) * 100);
      }
    }
  });
};

const deleteRoomTypeMedia = (roomTypeId: string, path: string) => {
  return deleteRequest<{ Path: string }, null>({
    url: `rooms/types/${roomTypeId}/media?Path=${path}`
  });
};

export {
  getTopRooms,
  getRooms,
  getRoom,
  addRoom,
  addRoomByType,
  updateRoom,
  uploadRoomMedia,
  updateRoomInformation,
  updateRoomPrice,
  updateRoomDetails,
  updateRoomFacilities,
  uploadRoomBanner,
  deleteRoomMedia,
  getRoomTypes,
  getRoomType,
  addRoomType,
  deleteRoomType,
  uploadRoomTypeMedia,
  deleteRoomTypeMedia
};
