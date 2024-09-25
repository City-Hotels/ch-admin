import { IGRPCDate } from "@/utils/api/calls";

export interface IPromotion {
  Name?: string;
  Description?: string;
  Id?: string;
  MaxParticipant?: Number;
  Medias?: IMedia[];
  Pricing?: IPrice;
  Requirement?: IRequirement;
  ShortDescription?: string;
  StartDate?: IGRPCDate;
  Status?: PromotionStatus;
  Slug?: string;
  SubTitle?: string;
  Title?: string;
  Type?: PromotionType;
  SearchStatus?: boolean;
  Created_at: IGRPCDate;
  Updated_at: IGRPCDate;
  EndDate?: IGRPCDate;
}

export interface ISubscribers {
  Created_at: IGRPCDate;
  Id?: string;
  Promotion: IPromotion;
  Service?: IService;
  Status?: SubscriptionStatus;
  Updated_at: IGRPCDate;
}

export interface ISubscribersUpdate {
  Id?: string;
  Status?: SubscriptionStatus;
}

export interface IService {
  Id?: string;
  Imageurl: string;
  Name: string;
  ServiceType: ServiceType;
}

export interface SubscriptionFilter {
  Limit?: number;
  Page?: number;
  Name?: string;
  Id?: string;
  PromotionId?: string;
  MaxParticipant?: number;
  MaximumBooking?: number;
  MinimumBooking?: number;
  BookingDiscount?: number;
  Rate?: number;
  Unit?: string;
  Status?: SubscriptionStatus;
  ServiceType?: ServiceFilterType;
  SearchStatus?: boolean;
  Title?: string;
  Type?: PromotionType;
  StartDate?: IGRPCDate;
  EndDate?: IGRPCDate;
}

export interface PromotionFilter {
  Limit?: number;
  Page?: number;
  Name?: string;
  Id?: string;
  MaxParticipant?: number;
  MaximumBooking?: number;
  MinimumBooking?: number;
  BookingDiscount?: number;
  Rate?: number;
  Unit?: string;
  Status?: PromotionStatus;
  PricingType?: PricingType;
  SearchStatus?: boolean;
  Title?: string;
  Type?: PromotionType;
  StartDate?: IGRPCDate;
  Promotion?: IPromotion;
  EndDate?: IGRPCDate;
}

export type IMedia = {
  Path: string;
  Type: number;
  Status: number;
};

export type IPrice = {
  BookingDiscount: number;
  Rate: number;
  Unit: string;
  PricingType: PricingType;
};

export type IRequirement = {
  Account: AccountType;
  Location: IAddress;
  MaximumBooking: number;
  MinimumBooking: number;
  ServiceType: String;
  Promotions: IPromotion[];
};

export type IAddress = {
  City: string;
  Country: string;
  Latitude?: string;
  Longitude?: string;
  PostalCode: string;
  State: string;
  Street: string;
};

export enum PricingType {
  SUBSCRIPTION = 0,
  COMMISION = 1
}
export enum AccountType {
  STANDARD = 0,
  PREMEIUM = 1,
  PLATINUM = 2
}

export enum PromotionStatus {
  INACTIVE = 0,
  ACTIVE = 1,
  EXPIRED = 2
}

export enum SubscriptionStatus {
  INACTIVE = 0,
  ACTIVE = 1,
  EXPIRED = 2
}

export enum SubscriptionFilterStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  EXPIRED = "EXPIRED"
}

export enum ServiceType {
  HOTEL = 0,
  APARTMENT = 1
}

export enum ServiceFilterType {
  HOTEL = "HOTEL",
  APARTMENT = "APARTMENT"
}

export enum PromotionType {
  REGULAR = 0,
  SPECIAL = 1
}
