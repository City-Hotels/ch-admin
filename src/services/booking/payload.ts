import type { IApartment } from "../apartment/payload";
import type { IRoom, IRoomType } from "../room/payload";

export interface IGRPCDate {
  seconds: number;
  nanos: number;
};

export enum BookingStatus {
  PENDING = 0,
  CANCELLED = 1,
  DECLINED = 2,
  ACCEPTED = 3,
  CHECKEDIN = 4,
  CHECKEDOUT = 5
}

export enum BookingTypes {
  HOTELROOM = 0,
  APARTMENT = 1
}

export enum PaymentMethods {
  CARD = 0,
  CRYPTO = 1
}

export enum BookingForEnum {
  SELF = 0,
  SOMEONE = 1
}

export enum ReservationStatus {
  PENDING = 0,
  CANCELLED = 1,
  CHECKEDOUT = 2,
  DECLINED = 3,
  CHECKEDIN = 4,
  ACCEPTED = 5
}

export interface IBookingCustomer {
  Id?: string;
  Firstname: string;
  Lastname: string;
  Telephone: string;
  Email: string;
  ImageUrl?: string;
  BookingFor?: BookingForEnum;
}

export interface IOrder {
  Bookings: IBookingPayload[];
  SpecialRequest?: any;
  Cost?: number;
  CouponId?: string;
  CouponValue?: number;
  Payment?: IPayment;
  Customer?: IBookingCustomer;
  Id?: string;
  CreatedAt?: string;
}

export interface IBookingPayload {
  Adults?: number;
  Pets?: number;
  Children?: number;
  CheckInDate: string;
  CheckOutDate: string;
  HostName?: string;
  RoomName?: string;
  Cost?: number;
  Guests?: {
    Firstname: string;
    Lastname: string;
  }[];
  HostId: string;
  RoomId: string;
  SpecialRequest?: string;
  Type: BookingTypes;
}

export interface BookingExtras {
  Adults: number;
  Children: number;
  Pets: number;
  SpecialRequest: string;
  Guests: { Firstname: string; Lastname: string }[];
}
export interface IBooking {
  Id?: string;
  RoomId: string;
  Cost: number;
  HostId: string;
  HostName: string;
  Service: {
    Name: string;
    Id: string;
    Imageurl: string;
    Address: {
      Street: string;
      City: string;
      Country: string;
      PostalCode: string;
      Longitude: string;
      Latitude: string;
    };
  };
  Guest: {
    Firstname: string;
    Lastname: string;
    Id: string;
    Email: string;
    Telephone: string;
    Imageurl: string;
  };
  Host: {
    Firstname: string;
    Lastname: string;
    Email: string;
    Telephone: string;
    Bio: string;
    Id: string;
    RegisterDate: string;
  };
  Details?: BookingExtras;
  Type?: BookingTypes;
  CheckOutDate: string | Date;
  CheckInDate: string | Date;
  Created_at: IGRPCDate;
  Status?: BookingStatus;
  ReviewStatus?: BookingReviewStatus;
  Checkbox?: string;
  PaymentInfo: {
    Status: PaymentStatus;
    TotalPaid: number;
    Tax: number;
    Commission: number;
  };
  Quantity?: number;
}

export interface INewBooking {
  space: IRoom | IApartment | IRoomType;
  checkInDate: Date;
  checkOutDate: Date;
  type: BookingTypes;
  guest: IBookingGuest;
  guestConfig: IBookingGuestConfiguration;
  quantity: number;
}
export interface IBookingGuest {
  fullname: string;
  email: string;
}
export interface IBookingGuestConfiguration {
  pets: number;
  adults: number;
  children: number;
}

export interface IBookingApartment {
  Apartment: IApartment;
  CheckinDate: string;
  CheckoutDate: string;
  Guests: string;
}
export enum BookingReviewStatus {
  PENDINGREVIEW = 0,
  GUESTREVIEWED = 1,
  HOSTREVIEWED = 1,
  REVIEWCOMPLETE = 2
}

export interface IReservation {
  Id: string;
  BookingId: string;
  Service: {
    Name: string;
    Id: string;
    Imageurl: string;
    Address: {
      Street: string;
      City: string;
      Country: string;
      PostalCode: string;
      Longitude: string;
      Latitude: string;
    };
  };
  PaymentInfo: {
    Status: PaymentStatus;
    TotalPaid: number;
    Tax: number;
    Commission: number;
  };
  BookingDate: string;
  CheckInDate: string;
  CheckOutDate: string;
  Created_at: {
    seconds: number;
    nanos: number;
  };
  Status: BookingStatus;
  ReviewStatus: BookingReviewStatus;
  Details: BookingExtras;
  Guest: {
    Firstname: string;
    Lastname: string;
    Id: string;
    Email: string;
    Telephone: string;
    Imageurl: string;
  };
}

export interface IPayment {
  Method?: string;
  Option: PaymentOption;
  Reference: string;
  Status: PaymentStatus;
}

export enum PaymentStatus {
  PENDING = 0,
  COMPLETE = 1,
  CANCELLED = 2
}

export enum PaymentOption {
  ONLINE = 0,
  ONSITE = 1
}

export interface BookingFilter {
  Limit?: number;
  Page?: number;
  HotelId?: string;
  RoomId?: string;
  ServiceId?: string;
  CustomerId?: string;
}
