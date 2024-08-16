export interface ILocation {
  Street: string;
  City: string;
  State: string;
  Country: string;
  Latitude: string;
  Longitude: string;
  PostalCode: string;
}

export interface INewLocation {
  Locations: ISearchLocation[];
  Meta: {
    CurrentPage: number;
    TotalPages: number;
  };
}
export interface ISearchLocation {
  Type: number;
  Country: ICountry;
}
export interface ICountry {
  Id: string;
  Name: string;
  Currency: string;
  Code: string;
  States: IState[];
}
export interface IState {
  Id: string;
  Name: string;
  Code: string;
  Cities: ICity[];
}
export interface ICity {
  Id: string;
  Name: string;
}
