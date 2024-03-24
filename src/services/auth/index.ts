import { postRequest, putRequest } from "@/utils/api/calls";
import type {
  ChangePasswordPayload,
  ForgotPasswordPayload,
  GoogleLoginPayload,
  LoginPayload,
  RegisterPayload,
  VerifyOTPPayload
} from "./payload";
import type { ILoginResponse } from "./response";

const login = (data: LoginPayload) => {
  return postRequest<LoginPayload, ILoginResponse>({
    url: "/auth/login",
    data
  });
};

const registerCustomer = (data: RegisterPayload) => {
  return postRequest<RegisterPayload, ILoginResponse>({
    url: "/user",
    data
  });
};

const googleLogin = (data: GoogleLoginPayload) => {
  return postRequest<GoogleLoginPayload, ILoginResponse>({
    url: "/auth/google/login",
    data
  });
};

const changePassword = (data: ChangePasswordPayload) => {
  return putRequest<ChangePasswordPayload, any>({
    url: "/auth/change-password",
    data
  });
};

const forgotPassword = (data: ForgotPasswordPayload) => {
  return putRequest({
    url: "/auth/forgot-password",
    data
  });
};

const validateResetOTP = (data: VerifyOTPPayload) => {
  return postRequest({
    url: "/auth/verify-otp",
    data
  });
};

const resetPassword = (data: any) => {
  return putRequest({
    url: "/auth/reset-password",
    data
  });
};

export {
  login,
  googleLogin,
  changePassword,
  forgotPassword,
  validateResetOTP,
  registerCustomer,
  resetPassword
};
