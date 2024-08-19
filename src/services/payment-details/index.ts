import { getRequest, patchRequest, postRequest } from "@/utils/api/calls";
import type {
  IAccountVerificationPayload,
  IAccountVerificationResponse,
  IBank,
  ICreatePaymentDetailsPayload,
  IPaymentDetails
} from "./payload";

const getBanks = () => {
  return getRequest<{ Banks: IBank[] }>({
    url: `/payment-details/banks`
  });
};

const verifyAccountNumber = (payload: IAccountVerificationPayload) => {
  return postRequest<IAccountVerificationPayload, IAccountVerificationResponse>(
    {
      url: `/payment-details/validate`,
      data: payload
    }
  );
};

const getPaymentDetails = () => {
  return getRequest<{ PaymentDetails: IPaymentDetails[] }>({
    url: `/payment-details`
  });
};

const createPaymentDetails = (payload: ICreatePaymentDetailsPayload) => {
  return postRequest<ICreatePaymentDetailsPayload, void>({
    url: `/payment-details`,
    data: payload
  });
};

const setDefaultPaymentDetails = (paymentdetailsId: string) => {
  return patchRequest<void, void>({
    url: `/payment-details/default/${paymentdetailsId}`
  });
};

export {
  getBanks,
  getPaymentDetails,
  createPaymentDetails,
  setDefaultPaymentDetails,
  verifyAccountNumber
};
