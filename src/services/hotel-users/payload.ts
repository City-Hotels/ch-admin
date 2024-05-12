export type IHotelUser = {
  Id?: string;
  Firstname: string;
  Lastname: string;
  Imageurl?: string;
  Email: string;
  Telephone: string;
  Role: string;
  Status: string;
  ExtraPermissions: string[];
};

export type IHotelUserRole = {
  Id: string;
  Title: string;
  Permissions: string[];
};
