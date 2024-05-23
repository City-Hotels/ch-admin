import {
  ApiResponse,
  Meta,
  deleteRequest,
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
  IAddress,
  ICooperateInformation,
  IFacility,
  IHotel,
  IManagementInformationPayload,
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
    .filter((item) => (filter as any)[item] !== undefined)
    .map(
      (item) =>
        `${encodeURIComponent(item)}=${encodeURIComponent(
          (filter as any)[item]
        )}`
    )
    .join("&");
  return getRequest<{ Hotels: IHotel[]; Meta: Meta }>({
    url: `admin/hotels?${args}`
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

const getHotelCooperateInformation = (hotelId: string) => {
  return getRequest<ICooperateInformation>({
    url: `/hotels/${hotelId}/cooperate`
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

const updateHotelManagerInformation = (
  hotelid: string,
  data: ManagerInformationPayload
) => {
  return patchRequest<ManagerInformationPayload, any>({
    url: `/hotels/${hotelid}/manager`,
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
const updateHotelAddress = (data: IAddress) => {
  return patchRequest({
    url: "/hotels/address",
    data
  });
};


const updateHotelInformation = (hotelid: string, data: HotelInformationPayload) => {
  return patchRequest<HotelInformationPayload, any>({
    url: `/hotels/${hotelid}/info`,
    data
  });
};



const updateHotelManagementInformation = (
  data: IManagementInformationPayload
) => {
  return patchRequest({
    url: "/hotels/management",
    data
  });
};

const uploadHotelMedia = (file: FormData, setProgress: Function) => {
  return putRequest<FormData, { Path: string }>({
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

const deleteHotelMedia = (path: string) => {
  return deleteRequest<{ FilePath: string }, null>({
    url: `hotels/media?FilePath=${path}`
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

const updateHotelFacilities = (data: IFacility[]) => {
  return patchRequest({
    url: "/hotels/facilities",
    data
  });
};
const uploadHotelLogo = (file: FormData, setProgress: Function) => {
  return putRequest<FormData, { Path: string }>({
    url: `hotels/logo`,
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
  updateHotelManagementInformation,
  uploadHotelBanner,
  getRequest,
  updateHotelAddress,
  updateHotelFacilities,
  uploadHotelLogo,
  deleteHotelMedia
};
