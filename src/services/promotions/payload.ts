import { IGRPCDate } from "@/utils/api/calls";

export interface IPromotion {
  Name: string;
  Description?: string;
  Id?: string;
  MaxParticipant: Number;
  Medias: IMedia[];
  Pricing: IPrice;
  Requirement: IRequirement;
  ShortDescription: string;
  StartDate: IGRPCDate;
  Status: PromotionStatus;
  SubTitle: string;
  Title: string;
  Type: PromotionType;
  Created_at: IGRPCDate;
  Updated_at: IGRPCDate;
  EndDate: IGRPCDate;
}

export interface PromotionFilter {
  Limit?: number;
  Page?: number;
  Name?: string;
  Id?: string;
  MaxParticipant?: number;
  Requirements?: IRequirement;
  Price?: string;
  ShortDescription?: string;
  Status?: PromotionFilterStatus;
  Title?: string;
  Type?: PromotionType;
  StartDate?: IGRPCDate;
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
  MaximumBooking: Number;
  MinimumBooking: Number;
  ServiceType: String;
  Promotions: IPromotion;
};

export type IAddress = {
  City: string;
  Country: string;
  Latitude: string;
  Longitude: string;
  PostalCode: string;
  State: string;
  Street: string;
};

export enum PricingType {
  BASIC = 0,
  LUXURY = 1
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
export enum PromotionFilterStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  EXPIRED = "EXPIRED"
}

export enum PromotionType {
  REGULAR = 0,
  SPECIAL = 1
}
