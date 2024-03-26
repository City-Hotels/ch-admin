import { IGRPCDate } from "@/utils/api/calls";

export interface UserPayload {
  Firstname: string;
  Lastname: string;
  Email: string;
  Telephone: string;
  Imageurl?: string;
  Bio?: string;
  Country?: string;
  State?: string;
}

export enum UserRoles {
  ADMIN = "ADMIN",
  HOTELADMIN = "HOTELADMIN",
  USER = "USER"
}

export interface IUser {
  Firstname: string;
  Lastname: string;
  Id?: string;
  Email: string;
  Telephone: string;
  ImageUrl: string;
  Country: string;
  Bio?: string;
  State: string;
  Role?: UserRoles;
  CreatedAt: IGRPCDate;
}


export interface IUserFilter {
  Limit?: number;
  Page?: number;
  Firstname?: string;
  Lastname?: string;
  Email?: string;
  Telephone?: string;
  Country?: string;
  State?: string;
  Role?: string;
}

