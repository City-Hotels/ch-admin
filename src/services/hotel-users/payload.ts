export type IHotelUser = {
  Id?: string;
  Firstname: string;
  Lastname: string;
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
