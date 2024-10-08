// TODO: Correct this when you know the exact payload
export enum SpaceType {
  HOTEL = "HOTEL",
  APARTMENT = "APARTMENT",
  RESTAURANT = "RESTAURANT",
  EVENT = "EVENT",
  TOUR = "TOUR"
}

export enum HotelStatus {
  INACTIVE = 0,
  ACTIVE = 1,
  SUSPENDED = 2,
  REJECTED = 3
}

export enum IHotelStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  SUSPENDED = "SUSPENDED",
  REJECTED = "REJECTED"
}

export type HotelPayoad = {
  name: string;
};

export type IAddress = {
  City: string;
  Country: string;
  PostalCode: string;
  State: string;
  Street: string;
  Location: ILocation;
  Latitude: string;
  Longitude: string;

};
export type IMedia = {
  Path: string;
  Type: number;
  Status: number;
};

export type ISocialLinks = {
  Facebook: string;
  Twitter: string;
  Instagram: string;
  Pinterest: string;
};

export interface IManagementCompany {
  Name: string;
  OfficeAddress: IAddress;
  BusinessRegistration: string;
}

export type ICooperateInformation = {
  Support: SupportInformationPayload;
  Manager: ManagerInformationPayload;
  PayInData: BankInformationPayload;
  ParentCompany: IManagementCompany;
};

export type IManagementInformationPayload = {
  BusinessRegistration: string;
  ParentCompany: string;
  Country: string;
};

export type IHotel = {
  BusinessType: any;
  item: string;
  Id: string;
  Name: string;
  Rating: IRating;
  Score?: number;
  SEO: string;
  Slogan: string;
  Status: HotelStatus;
  Slug: string;
  SocialLinks?: ISocialLinks;
  Telephone: string;
  Address: IAddress;
  Email: string;
  Banner: IMedia;
  Facilities: IFacility[];
  Logo: IMedia;
  Medias: IMedia[];
  Price: IPrice;
  CooperateInformation?: ICooperateInformation;
  Created_at: string;
  Last_updated: string;
  Introduction: string;
};

export type HotelFilter = {
  Limit?: number;
  Page?: number;
  Id?: string;
  Name?: string;
  Status?: IHotelStatus;
  Telephone?: string;
  Email?: string;
  Location?: string;
  KidsAllowed?: string;
  GuestAllowed?: string;
  Facilities?: string;
  MinRating?: string;
  MaxRating?: string;
  MaxTotalReviews?: string;
  MinTotalReviews?: string;
  MaxTotalBooking?: string;
  MinTotalBooking?: string;
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

export type IRating = {
  Impressions: number;
  Clicks: number;
  Likes: number;
  Rating: number;
  TotalBooking: number;
  TotalCanceled: number;
  TotalRejected: number;
  TotalReviews: number;
  Class: number;
};

export type ILocation = {
  Description: string;
  Nearby: INearby[];
};

export enum NearbyTypes {
  PLACES = "Places",
  EATERY = "Eatery",
  COMMUTE = "Commute"
}

export type INearby = {
  Distance: string;
  Location: string;
  Type: string;
  Unit: string;
};

export type IPrice = {
  price: number;
  tax: boolean;
  adultmax: number;
  days: number;
};

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

export interface BankInformationPayload {
  Bank: string;
  AccountNumber: string;
  AccountName: string;
  SwiftCode: string;
  Country: string;
  Currency: string;
}
export interface SecurityInformationPayload {
  OldPassword: string;
  NewPassword: string;
  ConfirmPassword: string;
}
export interface ManagerInformationPayload {
  Firstname: string;
  Lastname: string;
  Email: string;
  Telephone: string;
}
export interface SupportInformationPayload {
  Firstname: string;
  Lastname: string;
  Email: string;
  Telephone: string;
}
export interface HotelInformationPayload {
  Name: string;
  Slogan: string;
  Introduction: string;
  Email: string;
  Telephone: string;
}

