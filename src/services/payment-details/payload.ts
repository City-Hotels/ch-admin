export type IPaymentDetails = {
  AccountNumber: string;
  AccountName: string;
  BankName: string;
  Country: string;
  Currency: string;
  IsDefault: true;
  PaymentId: string;
  Reference: string;
  RoutingNumber: string;
  SwiftCode: string;
  UserId: string;
};

export type ICreatePaymentDetailsPayload = {
  accountNumber: string;
  bankName: string;
  bankCode?: string;
  country: string;
  currency: string;
  routingNumber?: string;
  swiftCode?: string;
};

export type IBank = {
  Name: string;
  Code: string;
};

export type IAccountVerificationPayload = {
  accountNumber: string;
  bankCode?: string;
  routingNumber?: string;
  swiftCode?: string;
};

export type IAccountVerificationResponse = {
  AccountName: string;
  AccountNumber?: string;
};
