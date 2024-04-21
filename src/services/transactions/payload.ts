export type ITransaction = {
  Credit: number;
  Debit: number;
  Date: string;
  Description: string;
  Reference: string;
  ServiceId: string;
  TransactionType: TransactionType;
  UserId: string;
  Id: string;
  Created_at: {
    seconds: number;
    nanos: number;
  };
  Last_updated: {
    seconds: number;
    nanos: number;
  };
  type?: TransactionType;
  Status?: TransactionFilterStatus;
};

export interface TransactionFilter {
  Limit?: number;
  Page?: number;
  UserId?: string;
  ServiceId?: string;
  Reference?: string;
  Type?: TransactionType;
  HostName?: string;
  Paymentstatus?: PaymentStatus;
  Bookingtype?: BookingType;
  MinAmount?: string;
  MaxAmount?: string;
  Date?: string;
  Status?: TransactionFilterStatus;
}

export enum TransactionReviewFilterStatus {
  GUESTREVIEWED = "GUESTREVIEWED",
  HOSTREVIEWED = "HOSTREVIEWED",
  REVIEWCOMPLETE = "REVIEWCOMPLETE",
}

export enum TransactionType {
  WALLETFUND = 0,
  BOOKING = 1,
  WITHDRAWAL = 2
}
export enum PaymentStatus {
  COMPLETE =0,
  PENDING = 1,
  CANCELLED =2,
}
export enum BookingType {
  APARTMENT =0,
  HOTEL = 1,
}

export enum TransactionFilterStatus {
  WALLETFUND = "WALLETFUND",
  BOOKING = "BOOKING",
  WITHDRAWAL = "WITHDRAWAL"
}
export type ITransactionBalance = {
  Balance: number;
  Credit: number;
  Debit: number;
};

export type IInititateWithdraw = {
  Amount: number;
  PaymentDetailsId: string;
};

export type IConfirmWithdraw = {
  Amount: number;
  PaymentDetailsId: string;
  Token: string;
};

export type ITransactionFilter = {
  UserId?: string;
  ServiceId?: string;
  Reference?: string;
  Type?: TransactionType;
  Limit?: number;
  Page?: number;
  date?: string;
    HostId?: string;
      Cost: number;
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
    CheckOutDate: string | Date;
    CheckInDate: string | Date;
    Checkbox?: string;
    Quantity?: number;
};

