import type { ApiResponse, Meta } from "@/utils/api/calls";
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
  putRequest
} from "@/utils/api/calls";
import type {
  IApartmentInformationPayload,
  IApartment,
  IPricingPayload,
  IDetailsPayload,
  IFacility,
  IAddress,
  ApartmentFilter
} from "./payload";

const searchApartment = (
  filter: ApartmentFilter
): Promise<
  ApiResponse<{
    Meta: Meta;
    Apartments: IApartment[];
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
  return getRequest<{ Apartments: IApartment[]; Meta: Meta }>({
    url: `/apartments/?${args}`
  });
};

const getApartment = (hotelId: string) => {
  return getRequest<IApartment>({
    url: `/apartments/${hotelId}`
  });
};

const createApartment = (data: IApartment) => {
  return postRequest<IApartment, { ApartmentId: string }>({
    url: "/host/apartments",
    data
  });
};

const getUserApartment = () => {
  return getRequest<{ Apartments: IApartment[]; Meta: Meta }>({
    url: "/host/apartments"
  });
};

const updateApartmentInformation = (
  apartmentid: string,
  data: IApartmentInformationPayload
) => {
  return patchRequest<IApartmentInformationPayload, any>({
    url: `/host/apartments/${apartmentid}/information`,
    data
  });
};

const updateApartmentPrice = (apartmentid: string, data: IPricingPayload) => {
  return patchRequest<IPricingPayload, any>({
    url: `/host/apartments/${apartmentid}/price`,
    data
  });
};

const updateApartmentDetails = (apartmentid: string, data: IDetailsPayload) => {
  return patchRequest<IDetailsPayload, any>({
    url: `/host/apartments/${apartmentid}/basics`,
    data
  });
};

const updateApartmentAddress = (apartmentid: string, data: IAddress) => {
  return patchRequest<IAddress, any>({
    url: `/host/apartments/${apartmentid}/details`,
    data
  });
};

const updateApartmentFacilities = (apartmentid: string, data: IFacility[]) => {
  return patchRequest<IFacility[], any>({
    url: `/host/apartments/${apartmentid}/facilities`,
    data
  });
};

const uploadApartmentMedia = (
  apartmentid: string,
  file: FormData,
  setProgress: Function
) => {
  return putRequest<FormData, { Path: string }>({
    url: `host/apartments/${apartmentid}/media`,
    data: file,
    config: {
      onUploadProgress: (ProgressEvent) => {
        if (ProgressEvent.total)
          setProgress((ProgressEvent.loaded / ProgressEvent.total) * 100);
      }
    }
  });
};

const deleteApartmentMedia = (apartmentid: string, path: string) => {
  return deleteRequest<{ Path: string }, null>({
    url: `host/apartments/${apartmentid}/media?Path=${path}`
  });
};

export {
  searchApartment,
  getApartment,
  getUserApartment,
  createApartment,
  updateApartmentInformation,
  updateApartmentPrice,
  uploadApartmentMedia,
  deleteApartmentMedia,
  updateApartmentDetails,
  updateApartmentAddress,
  updateApartmentFacilities
};
