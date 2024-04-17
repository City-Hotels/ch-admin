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
};

export interface TransactionFilter {
  Limit?: number;
  Page?: number;
  UserId?: string;
  ServiceId?: string;
  Reference?: string;
  StartDate?:string;
  EnStartDate?:string;
}


export enum TransactionType {
  WALLETFUND = 0,
  BOOKING = 1,
  WITHDRAWAL = 2
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
