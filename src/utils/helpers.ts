// import type {
//   ICity,
//   ICountry,
//   ISearchLocation,
//   IState
// } from "@/services/location/payload";

const currencyNoShymbol = new Intl.NumberFormat("en-US", {
  style: "decimal",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
  // currency: "NGN"
});

export const formatCurrencyNoSymbol = (amount: number) =>
  currencyNoShymbol.format(amount);

export const convertGrpcDate = (grpcDate: {
  seconds: number;
  nanos: number;
}) => {
  const milliseconds = grpcDate.seconds * 1000 + grpcDate.nanos / 1000000;
  return new Date(milliseconds);
};

export function dateToTimestamp(date: Date): { seconds: number; nanos: number } {
  // Ensure the input is a valid Date object
  if (!(date instanceof Date)) {
    throw new Error("Invalid date object");
  }
  // Get the timestamp in milliseconds
  const millis = date.getTime();
  // Convert milliseconds to seconds (integer part)
  const seconds = Math.floor(millis / 1000);
  // Calculate the nanoseconds (remaining milliseconds converted to nanoseconds)
  const nanos = (millis % 1000) * 1e6;
  return { seconds, nanos };
}

// Assuming fileList is your FileList object
export const fileListToArray = (fileList: FileList): File[] => {
  const array: File[] = [];
  for (let i = 0; i < fileList.length; i += 1) {
    const file = fileList[i] as File;
    array.push(file);
  }
  return array;
};

// export interface IRsolvedLocation {
//   Name: string;
//   Id: string;
//   State?: string;
//   Country?: string;
//   Type: "city" | "state" | "country";
// }

// export const handleLocationData = (countries: ISearchLocation[]) => {
//   const locationData: IRsolvedLocation[] = [];

//   countries.forEach((country: { Country: ICountry }) => {
//     const countryName = country.Country.Name;

//     country.Country.States?.forEach((state: IState) => {
//       const stateName = state.Name;

//       if (state.Cities !== null || state.Cities !== undefined) {
//         state?.Cities?.forEach((city: ICity) => {
//           locationData.push({
//             Name: city.Name,
//             Id: `${city.Id}`,
//             State: stateName,
//             Country: countryName,
//             Type: "city"
//           });
//         });
//       }
//     });

//     country.Country.States?.forEach((state: IState) => {
//       locationData.push({
//         Name: state.Name,
//         Id: `${state.Id}`,
//         Country: countryName,
//         Type: "state"
//       });
//     });
//   });

//   return locationData.map((location) => ({
//     Street: "",
//     City: location.Type === "city" ? location.Name : "",
//     State: location.Type === "state" ? location.Name : location.State || "",
//     Country: location.Country || "",
//     Latitude: "",
//     Longitude: "",
//     PostalCode: ""
//   }));
// };
