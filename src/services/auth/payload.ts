export interface LoginPayload {
  LoginId: string;
  Password: string;
}

export interface ForgotPasswordPayload {
  LoginId: string;
}

export interface VerifyResetPasswordPayload {
  Token: string;
  LoginId: string;
}

export interface GoogleLoginPayload {
  Token: string;
}

export interface RegisterPayload {
  Firstname: string;
  Lastname: string;
  Email: string;
  Telephone: string;
  Password: string;
  Password_Confirmation?: string;
}

export interface ResetPasswordPayload {
  Password: string;
  Token: string;
  LoginId: string;
  Password_Confirmation?: string;
}
export interface VerifyOTPPayload {
  Token: string;
  LoginId: string;
}

export interface ChangePasswordPayload {
  OldPassword: string;
  ConfirmPassword: string;
  NewPassword: string;
}

export interface RegisterHotelPayload {
  HotelName: string;
  Email: string;
  Telephone: string;
}

export interface VerifyHotelRegisterTokenPayload {
  Token: string;
  Email: string;
}

export interface CreateHotelPasswordPayload {
  Password: string;
  Password_Confirmation: string;
}
export interface CompleteHotelRegisterPayload {
  Email: string;
  Registrar?: {
    Email: string;
    Firstname: string;
    Lastname: string;
    Password?: string;
    Role: string;
    Telephone: string;
  };
  Token: string;
}
export interface HotelRegistrarPayload {
  Role: string;
  Firstname: string;
  Lastname: string;
  Email: string;
  Telephone: string;
}
