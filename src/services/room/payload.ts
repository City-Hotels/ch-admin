import type { IFacility, IHotel, IMedia } from "../hotel/payload";

// TODO: Correct this when you know the exact payload
export type RoomPayload = {
  name: string;
};

export type IDetailsPayload = {
  MaxGuest: number;
  MaxBedRoom: number;
  BedCount: number;
  BathCount: number;
};

export type IPricingPayload = {
  WeeklyRate: number;
  Price: number;
  MonthlyRate: number;
};

export type IRoomInformationPayload = {
  Name: string;
  Description: string;
};

export type Meta = {
  Limit: number;
  PageNumber: number;
  CurrentPage: number;
  TotalCount: number;
};

export type IRoomInfoFormPayload = {
  Name: string;
  Dimension: number;
  MaxAdults: number;
  MaxChildren: number;
  MaxBedRoom: number;
  Facilities: IFacility[];
  Bed: string;
  BedCount: number;
  BathCount: number;
  StandardType: string;
};

export type IRoomPriceFormPayload = {
  NumberAvailable: number;
  Price: number;
  PromoCost: number;
  PromoCode: string;
  RefundPeriod: number;
  Refundable: boolean;
  CancellationFee: number;
  WeeklyRate: number;
  MonthlyRate: number;
  Quantity?: number;
  PrePayment?: boolean;
};

export type ICreateRoomByTypePayload = {
  TypeId: string;
  Name: string;
  Description?: string;
};

export type ICreateRoomPayload = IRoomInfoFormPayload & {
  Pricing?: IRoomPriceFormPayload;
};

export type ICreateRoomResponse = {
  RoomId: string;
};
export type ICreateRoomTypeResponse = {
  Id: string;
};

export type IUpdateRoomPayload = IRoomInfoFormPayload & {
  Pricing?: IRoomPriceFormPayload;
  Id: string;
};

export type IUpdateRoomResponse = {
  RoomId: string;
};

export type IRoom = {
  Bed: string;
  Created_at: string;
  Published_at?: string;
  Description: string;
  Facilities: IFacility[];
  HotelId: string;
  Hotel: IHotel;
  Id: string;
  Views?: number;
  Bookings?: number;
  Last_updated: string;
  MaxGuest: number;
  MaxAdults: number;
  MaxChildren: number;
  NumberAvailable: number;
  MaxBedRoom: number;
  BedCount: number;
  BathCount: number;
  CarPark: boolean;
  Dimension: number;
  Medias: IMedia[];
  Name: string;
  Pricing: IRoomPriceFormPayload;
  SEO: string;
  Slug: string;
  Status: 1 | 0 | 2; // 1 = "PUBLISHED", 0 = UNPUBLISHED, 2 = SUSPENDED
  Rating?: {
    Impressions?: number;
    Likes: number;
    Rating: number;
    TotalBooking: number;
    TotalCanceled?: number;
    TotalRejected?: number;
    Class?: number;
    TotalReviews?: number;
  };
  RoomType?: IRoomType;
};

export type IGetRoomsResponse = {
  Rooms: IRoom[];
  Meta: Meta;
};

export type IRoomType = {
  Bed: string;
  Created_at?: string;
  Published_at: string;
  Description: string;
  HotelId: string;
  Id: string;
  Last_updated?: string;
  MaxGuest: number;
  MaxAdults: number;
  MaxChildren: number;
  NumberAvailable: number;
  MaxBedRoom: number;
  BedCount: number;
  BathCount: number;
  CarPark: boolean;
  Dimension: number;
  Medias: IMedia[];
  Facilities: IFacility[];
  Name: string;
  Pricing: IRoomPriceFormPayload;
  Slug: string;
  Status: 1 | 0 | 2;
  StandardType: string;
  CancellationPolicy: string;
};
