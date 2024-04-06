// TODO: Correct this when you know the exact payload
export enum HotelStatus {
  PUBLISHED = 1,
  UNPUBLISHED = 0,
  SUSPENDED = 2
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

export type ICooperateInformation = {
  Support: SupportInformationPayload;
  Manager: ManagerInformationPayload;
  PayInData: BankInformationPayload;
};

export type IHotel = {
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
  Status?: HotelStatus;
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
  Amenities: string[];
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
  HotelName: string;
  HotelSlogan: string;
  Email: string;
  Location: string;
  Address: string;
  State: string;
  City: string;
  GoogleCoordinate: string;
  ContactEmail: string;
  Telephone: string;
}
