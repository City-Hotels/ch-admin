import type { ILocation } from "../hotel/payload";
import type { IUser } from "../user/payload";

export type IApartmentTypePayload = {
  Type: ApartmentType;
};

export type IApartmentSpacePayload = {
  Type: SpaceType;
};

export type IPaymentMethodPayload = {
  Type: PaymentMethodType;
};

export type IDetailsPayload = {
  MaxGuest: number;
  MaxBedRoom: number;
  BedCount: number;
  BathCount: number;
};

export type IBankDetailsPayload = {
  BankName: string;
  Country: string;
  AccountNumber: string;
};

export type IApartment = {
  Address: IAddress;
  BathCount: number;
  Bed: string;
  BedCount: number;
  CarPark: boolean;
  Description: string;
  Dimension: number;
  Facilities: IFacility[];
  Rating: IRating;
  HostId: string;
  Host: IUser;
  Id: string;
  MaxAdults: number;
  MaxBedRoom: number;
  MaxChildren: number;
  MaxGuest: number;
  Medias: IMedia[];
  Name: string;
  Pricing: IPrice;
  SEO?: string;
  Slug?: string;
  Type?: ApartmentType;
  Space?: SpaceType;
};

export type IAddress = {
  City: string;
  Country: string;
  Latitude: string;
  Longitude: string;
  PostalCode: string;
  State: string;
  Street: string;
  Location: ILocation;
};

export type IFacility = {
  Amenities?: string[];
  Icon: string;
  Id: string;
  Label: string;
  Status: boolean;
  Type: number;
  Description: string;
};

export type IMedia = {
  Path: string;
  Type: number;
  Status: number;
};

export type IRating = {
  Impressions: number;
  Likes: number;
  Rating: number;
  Class: number;
  TotalBooking: number;
  TotalCanceled: number;
  TotalRejected: number;
  TotalReviews: number;
};

export type IPrice = {
  CancellationFee: number;
  NumberAvailable: number;
  PrePayment: boolean;
  Price: number;
  tax: boolean;
  PromoCode: string;
  PromoCost: number;
  RefundPeriod: number;
  Refundable: boolean;
  MonthlyRate: number;
  WeeklyRate: number;
};

export type IPricingPayload = {
  WeeklyRate: number;
  Price: number;
  MonthlyRate: number;
};

export type IApartmentInformationPayload = {
  Name: string;
  Description: string;
};

export type CompleteApartmentPayload = {
  Apartmnent: IApartment;
};

export enum ApartmentType {
  HOTEL = 0,
  ROOM = 1
  // SingleRoom = 0,
  // DoubleRoom = 1,
  // Suite = 2,
  // Studio = 3,
}

export enum SpaceType {
  ENTIRESPACE = 0,
  PRIVATEROOOM = 1
}

export enum PaymentMethodType {
  BANKDEPOSIT = "BANKDEPOSIT",
  CRYPTOWALLET = "CRYPTOWALLET"
}
