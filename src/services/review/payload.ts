import type { ServerServiceTypes } from "@/utils/enums";

// TODO: Correct this when you know the exact payload
export interface IReviewService {
  Id: string;
  Name: string;
  HostName: string;
  HostId: string;
  Type: ServerServiceTypes;
  ImageUrl: string;
  HostImageUrl: string;
}

export interface IReview {
  map: any;
  BookingId: string;
  HotelId: string;
  Rating: IReviewRating;
  Message: string;
  Guest: IGuest;
  Service: IReviewService;
  Reply: { Message: string; Rating: IReviewRating };
  Title: string;
  Date: string;
  Created_at: { nanos: number; seconds: number };
}
export interface IReviewOnGuest {
  BookingId: string;
  Rating: IReviewRating;
  Service: IReviewService;
  Message: string;
  Created_at: { nanos: number; seconds: number };
}
export interface IReviewOnHost {
  BookingId: string;
  Title: string;
  Rating: IReviewRating;
  Message: string;
}

export interface IGuestReviewPayload {
  BookingId: string;
  Cleaniness?: number;
  Facility?: number;
  FreeWifi?: number;
  Overall?: number;
  ValueForMoney?: number;
  Comfort?: number;
  Review: string;
  ReviewTitle: string;
}

export interface IHostReviewPayload {
  BookingId: string;
  Overall?: number;
  Review: string;
}

export interface IReviewStatisticsPayload {
  Overall: number;
  Cleaniness: number;
  FreeWifi: number;
  Facility: number;
  Comfort: number;
  Service: number;
  ValueForMoney: number;
  OneStarCount: number;
  TwoStarCount: number;
  ThreeStarCount: number;
  FourStarCount: number;
  FiveStarCount: number;
}

export interface IGuest {
  Id: string;
  FullName: string;
  PhoneNumber: string;
  Email: string;
  ImageUrl: string;
}

export interface IReviewRating {
  Overall: number;
  Cleaniness: number;
  FreeWifi: number;
  Facility: number;
  ValueForMoney: number;
}
