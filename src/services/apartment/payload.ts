import { IGRPCDate } from "@/utils/api/calls";
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

export type ApartmentCompleteStatus = {
  LastCheckIn?: IGRPCDate,
  LastCheckOut?: IGRPCDate,
  NextCheckIn?: IGRPCDate,
  NextCheckOut?: IGRPCDate,
  Status: ApartmentStatus
}

export enum ApartmentStatus {
  PENDING = 0,
  ACTIVE = 1,
  BOOKED = 2,
  CHECKEDOUT = 3,
  CHECKEDIN = 4,
  SUSPENDED = 5,
};

export enum FilterApartmentStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  BOOKED = "BOOKED",
  CHECKEDOUT = "CHECKEDOUT",
  CHECKEDIN = "CHECKEDIN",
  SUSPENDED = "SUSPENDED",
};

export type IDetailsPayload = {
  MaxAdults: number;
  MaxChildren: number;
  MaxPets: number;
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
  Views?: number;
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
  MaxPets: number;
  MaxGuest: number;
  Medias: IMedia[];
  Name: string;
  Pricing: IPrice;
  SEO?: string;
  Slug?: string;
  Type?: ApartmentType;
  Status: ApartmentCompleteStatus
  Banner: IMedia;
  Logo: IMedia;
};


export enum HotelStatus {
  INACTIVE = 0,
  ACTIVE = 1,
  SUSPENDED = 2,
  REJECTED = 3
}

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

export interface IApartmentFilter {
  Limit?: number;
  Page?: number;
  ApartmentId?: string;
  ApartmentName?: string;
  Location?: string;
  MinPrice?: number;
  MaxPrice?: number;
  Dimension?: number;
  MinNightlyPrice?: number;
  MaxNightlyPrice?: number;
  MinWeeklyRate?: number;
  MaxWeeklyRate?: number;
  MinMonthlyRate?: number;
  Id?: string;
  RoomName?: string;
  HostId?: string;
  HostName?: string;
  MaxAdults?: number;
  MaxBedRoom?: number;
  MaxChildren?: number;
  MaxGuest?: number;
  Name?: string;
  Pricing?: IPrice;
  Type?: FilterApartmentType;
  MaxMonthlyRate?: number;
  Facilities?: string;
  CheckInDate?: string;
  CheckOutDate?: string;
  CarPark?: boolean;
  BedCount?: number;
  BathCount?: number;
  Status?: FilterApartmentStatus;
  Space?: FilterSpaceType;
}

export type IFacility = {
  Amenities?: string[];
  Icon: string;
  Id: string;
  Label: string;
  Status: boolean;
  Type: number;
  Description: string;
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
  Clicks: number;
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

export enum FilterApartmentType {
  HOTEL = "HOTEL",
  ROOM = "ROOM",
  SINGLEROOM = "SINGLEROOM",
  DOUBLEROOM = "DOUBLEROOM",
  SUITE = "SUITE",
  STUDIO = "STUDIO",
  ALL = "ALL"
}

export enum ApartmentType {
  HOTEL = 0,
  ROOM = 1,
  SINGLEROOM = 2,
  DOUBLEROOM = 3,
  SUITE = 4,
  STUDIO = 5,
  ALL = 6
}

export enum SpaceType {
  ENTIRESPACE = 0,
  PRIVATEROOOM = 1
}

export enum FilterSpaceType {
  ENTIRESPACE = "ENTIRESPACE",
  PRIVATEROOOM = "PRIVATEROOOM"
}

export enum PaymentMethodType {
  BANKDEPOSIT = "BANKDEPOSIT",
  CRYPTOWALLET = "CRYPTOWALLET"
}

export type IUpdateApartmentResponse = {
  ApartmentId: string;
};

export type IMedia = {
  Path: string;
  Type: number;
  Status: number;
};