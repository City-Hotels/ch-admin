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
}
