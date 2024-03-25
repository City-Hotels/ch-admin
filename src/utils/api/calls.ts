import type { AxiosRequestConfig } from "axios";
import baseAxiosMethod from "./baseAxiosMethod";

type IRequest<IRequestType> = {
  url: string;
  data?: IRequestType;
  config?: AxiosRequestConfig<IRequestType>;
};

export type ApiResponse<IResponseDataType> = {
  success: boolean;
  message: string;
  data: IResponseDataType;
  code?: number;
  details?: any;
};

export type Meta = {
  Limit: number;
  PageNumber: number;
  CurrentPage: number;
  TotalPages: number;
  TotalCount: number;
};
export interface IGRPCDate {
  seconds: number;
  nanos: number;
};


export const postRequest = async <IRequestType, ResponseType>({
  url,
  data,
  config
}: IRequest<IRequestType>): Promise<ApiResponse<ResponseType>> => {
  const response = await baseAxiosMethod.post(url, data, config);
  return response?.data || response;
};

export const putRequest = async <IRequestType, ResponseType>({
  url,
  data,
  config
}: IRequest<IRequestType>): Promise<ApiResponse<ResponseType>> => {
  const response = await baseAxiosMethod.put(url, data, config);
  return response?.data || response;
};

export const patchRequest = async <IRequestType, ResponseType>({
  url,
  data,
  config
}: IRequest<IRequestType>): Promise<ApiResponse<ResponseType>> => {
  const response = await baseAxiosMethod.patch(url, data, config);
  return response?.data || response;
};

export const getRequest = async <ResponseType>({
  url,
  config
}: IRequest<any>): Promise<ApiResponse<ResponseType>> => {
  const response = await baseAxiosMethod.get(url, config);
  return response?.data || response;
};

export const deleteRequest = async <IRequestType, ResponseType>({
  url,
  config
}: IRequest<IRequestType>): Promise<ApiResponse<ResponseType>> => {
  const response = await baseAxiosMethod.delete(url, config);
  return response?.data || response;
};
