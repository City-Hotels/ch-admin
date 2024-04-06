import {
  ApiResponse,
  Meta,
  getRequest,
  patchRequest,
  postRequest,
  putRequest
} from "../../utils/api/calls";
import type {
  BankInformationPayload,
  CompleteHotelRegisterPayload,
  HotelFilter,
  HotelInformationPayload,
  ICooperateInformation,
  IHotel,
  ManagerInformationPayload,
  RegisterHotelPayload,
  SupportInformationPayload,
  VerifyHotelRegisterTokenPayload
} from "./payload";

const searchHotel = (
  filter: HotelFilter
): Promise<
  ApiResponse<{
    Meta: Meta;
    Hotels: IHotel[];
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
  return getRequest<{ Hotels: IHotel[]; Meta: Meta }>({
    url: `/hotels/search?${args}`
  });
};

const getHotel = (hotelId: string | undefined) => {
  return getRequest<IHotel>({
    url: `/hotels/${hotelId}`
  });
};

const getUserHotel = () => {
  return getRequest<{ Hotels: IHotel[] }>({
    url: `/hotels/`
  });
};

const getHotelCooperateInformation = () => {
  return getRequest<ICooperateInformation>({
    url: `/hotels/cooperate`
  });
};

const initiateRegisterHotel = (data: RegisterHotelPayload) => {
  return postRequest<RegisterHotelPayload, null>({
    url: "/hotels/register/initiate",
    data
  });
};

const verifyHotelRegisterToken = (data: VerifyHotelRegisterTokenPayload) => {
  return postRequest<VerifyHotelRegisterTokenPayload, null>({
    url: "/hotels/register/verify",
    data
  });
};

const completeHotelRegister = (data: CompleteHotelRegisterPayload) => {
  return postRequest<CompleteHotelRegisterPayload, null>({
    url: "/hotels/register/complete",
    data
  });
};

const updateHotelManagerInformation = (data: ManagerInformationPayload) => {
  return patchRequest({
    url: "/hotel/manager",
    data
  });
};

const updateSupportOfficerInformation = (data: SupportInformationPayload) => {
  return patchRequest({
    url: "/hotels/support",
    data
  });
};

const updatePaymentInformation = (data: BankInformationPayload) => {
  return patchRequest({
    url: "/hotels/payin",
    data
  });
};

const updateDebitInformation = (data: BankInformationPayload) => {
  return patchRequest({
    url: "/hotels/payin",
    data
  });
};

const updateHotelInformation = (data: HotelInformationPayload) => {
  return patchRequest({
    url: "/hotel/setup",
    data
  });
};

const uploadHotelMedia = (file: FormData, setProgress: Function) => {
  return putRequest<FormData, null>({
    url: `hotels/media`,
    data: file,
    config: {
      onUploadProgress: (ProgressEvent) => {
        if (ProgressEvent.total)
          setProgress((ProgressEvent.loaded / ProgressEvent.total) * 100);
      }
    }
  });
};

const uploadHotelBanner = (file: FormData, setProgress: Function) => {
  return putRequest<FormData, null>({
    url: `hotels/banner`,
    data: file,
    config: {
      onUploadProgress: (ProgressEvent) => {
        if (ProgressEvent.total)
          setProgress((ProgressEvent.loaded / ProgressEvent.total) * 100);
      }
    }
  });
};

export {
  searchHotel,
  getHotel,
  getUserHotel,
  initiateRegisterHotel,
  verifyHotelRegisterToken,
  completeHotelRegister,
  updateHotelManagerInformation,
  updateSupportOfficerInformation,
  updatePaymentInformation,
  updateDebitInformation,
  updateHotelInformation,
  uploadHotelMedia,
  getHotelCooperateInformation,
  uploadHotelBanner,
  getRequest
};
