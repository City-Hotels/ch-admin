// import { SpaceType, type IHotel } from "@/services/hotel/payload";
// import type { IRoom } from "@/services/room/payload";
// import type { ILocation } from "@/services/location/payload";
// import type { IFacility } from ""@/services/hotel/payload";
// import ChatIcon from "@/assets/icons/chat.svg";
// import DashboardIcon from "@/assets/icons/chat-home.svg";
// import HistoryIcon from "@/assets/icons/history.svg";
// import SettingsIcon from "@/assets/icons/settings.svg";
// import CalenderIcon from "@/assets/icons/calendar4.svg";
// import AddTypeIcon from "@/assets/icons/add-type.svg";
// import RoomIcon from "@/assets/icons/home.svg";
// import UserIcon from "@/assets/icons/user.svg";
// import ProfileIcon from "@/assets/icons/profile.svg";

import ErrorIcon from "@/assets/icons/error";
import SuccessIcon from "@/assets/icons/success";
import WarningIcon from "@/assets/icons/warning";

export const notificationBaseURL = process.env.NEXT_PUBLIC_NOTIFICATION_URL;
export const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
export const chatBaseURL = process.env.NEXT_PUBLIC_CHAT_URL;
export const supportFileUploadBaseURL = process.env.NEXT_PUBLIC_SUPPORT_FILE_UPLOAD_URL;
export const supportBaseURL = process.env.NEXT_PUBLIC_SUPPORT_URL;
export const HOTEL_PLACEHOLDER_IMAGE =
  "https://cityhotels.s3.amazonaws.com/hotel2.png";
// export const ROOM_PLACEHOLDER_IMAGE =
//   "https://cityhotels.s3.amazonaws.com/hotel2.png";

export const toastIcons = {
  success: SuccessIcon,
  error: ErrorIcon,
  warning: WarningIcon
};

// export enum BookingTypes {
//   HOTELROOM = 0
// }

// export enum Amenities {
//   WIFI = "WIFI",
//   TV = "TV",
//   WASHINGMACHINE = "WASHINGMACHINE",
//   AIRCONDITIONING = "AIRCONDITIONING",
//   FREEPARKING = "FREEPARKING",
//   PAIDPARKNG = "PAIDPARKNG",
//   DEDICATEDWORKSPACE = "DEDICATEDWORKSPACE"
// }

// export enum OtherAmenities {
//   SWIMMINGPOOL = "SWIMMINGPOOL",
//   HOTTUB = "HOTTUB",
//   GYM = "GYM",
//   OUTDOORSHOWER = "OUTDOORSHOWER",
//   BEACH = "BEACH",
//   PIATO = "PIATO",
//   BBQGRILL = "BBQGRILL",
//   POOLTABLE = "POOLTABLE",
//   PIANO = "PIANO"
// }

// export enum SafetyAmenities {
//   SMOKEDETECTOR = "SMOKEDETECTOR",
//   FIREEXTINGUISHER = "FIREEXTINGUISHER",
//   AIDKIT = "AIDKIT"
// }

// export type IPriceConfiguration = {
//   Price: number;
//   PromoCost: number;
//   PromoCode: string;
//   Refundable: boolean;
//   RefundPeriod: number;
//   PrePayment: boolean;
//   Quantity: number;
//   CancellationFee: number;
//   NumberAvailable: number;
// };

// export const UserNavs = [
//   {
//     icon: DashboardIcon,
//     title: "Dashboard",
//     route: "/user"
//   },
//   {
//     icon: HistoryIcon,
//     title: "Bookings",
//     route: "/user/bookings"
//   },
//   {
//     icon: ChatIcon,
//     title: "Messages",
//     route: "/chat",
//     stroke: true
//   },
//   {
//     icon: ChatIcon,
//     title: "Support",
//     route: "/support",
//     stroke: true
//   },
//   {
//     icon: SettingsIcon,
//     title: "Manage Account",
//     route: "/user/manage"
//   }
// ];

// export const HotelNavs = [
//   {
//     icon: RoomIcon,
//     title: "Hotel",
//     route: "/hotel"
//   },
//   {
//     icon: CalenderIcon,
//     title: "Reservations",
//     route: "/hotel/bookings",
//     stroke: true
//   },
//   {
//     icon: ChatIcon,
//     title: "Messages",
//     route: "/chat",
//     stroke: true
//   },
//   {
//     icon: UserIcon,
//     title: "Support",
//     route: "/support"
//   },
//   {
//     icon: null,
//     title: "SPACES",
//     route: ""
//   },
//   // {
//   //   icon: AddRoomIcon,
//   //   title: "Add New Rooms",
//   //   route: "/hotel/rooms/new"
//   // },
//   {
//     icon: RoomIcon,
//     title: "Rooms",
//     route: "/hotel/rooms"
//   },
//   {
//     icon: AddTypeIcon,
//     title: "Room types",
//     route: "/hotel/room-types"
//   },
//   {
//     icon: AddTypeIcon,
//     title: "Facilities",
//     route: "/hotel/facilities"
//   },
//   {
//     icon: null,
//     title: "Manage",
//     route: ""
//   },
//   {
//     icon: RoomIcon,
//     title: "Hotel Information",
//     route: "/hotel/manage"
//   },
//   {
//     icon: ProfileIcon,
//     title: "Profile",
//     route: "/hotel/user"
//   }
// ];

// export const mockHotel: IHotel = {
//   Id: "63a0308f2f40d02bb5e2d445",
//   Name: "De' Lovers Hotel",
//   Slogan: "De' Best Hotel In Town",
//   Email: "lovers@gmail.com",
//   Telephone: "08182876756",
//   // Rating: 4,
//   Facilities: [
//     {
//       Amenities: ["Gym"],
//       Icon: "/host-pic.png",
//       Id: "63e0c90cb03fc4bb1b38c2bf",
//       Label: "Amenities",
//       Status: true,
//       Description: "Best Facilities",
//       Type: 1
//     }
//   ],
//   Logo: {
//     Path: "https://cityhotels.s3.amazonaws.com/logo.png",
//     Status: 1,
//     Type: 0
//   },
//   Banner: {
//     Type: 1,
//     Path: "https://cityhotels.s3.amazonaws.com/banner.png",
//     Status: 1
//   },
//   Medias: [
//     {
//       Type: 2,
//       Path: "https://cityhotels.s3.amazonaws.com/hotel2.png",
//       Status: 1
//     }
//   ],
//   Slug: "de-lovers-hotel",
//   SEO: "",
//   Address: {
//     City: "Lagos",
//     Country: "Nigeria",
//     PostalCode: "",
//     State: "Lagos",
//     Street: "",
//     Location: {
//       Description: "",
//       Nearby: []
//     },
//     Latitude: "",
//     Longitude: ""
//   },
//   Price: {
//     price: 0,
//     tax: true,
//     adultmax: 3,
//     days: 5
//   },
//   Created_at: "",
//   Last_updated: "",
//   Status: 0,
//   Rating: {
//     Impressions: 0,
//     Likes: 0,
//     Rating: 0,
//     TotalBooking: 0,
//     TotalCanceled: 0,
//     TotalRejected: 0,
//     TotalReviews: 0,
//     Class: 0
//   },
//   Introduction: "",
//   BusinessType: SpaceType.HOTEL
// };

// export const mockRoom: IRoom = {
//   Id: "63a096c52f40d02bb5e2d447",
//   HotelId: "63a0308f2f40d02bb5e2d445",
//   Name: "Room 306",
//   Description:
//     "This is our regular standard room with tables chairs and tv set",
//   MaxGuest: 4,
//   MaxAdults: 2,
//   MaxChildren: 2,
//   NumberAvailable: 2,
//   MaxBedRoom: 1,
//   BedCount: 1,
//   BathCount: 1,
//   CarPark: true,
//   Hotel: {
//     Name: "",
//     Address: {
//       City: "",
//       Country: "",
//       PostalCode: "",
//       State: "",
//       Street: "",
//       Location: {
//         Description: "",
//         Nearby: []
//       },
//       Latitude: "",
//       Longitude: ""
//     },
//     Id: "",
//     Rating: {
//       Impressions: 0,
//       Likes: 0,
//       Rating: 0,
//       TotalBooking: 0,
//       TotalCanceled: 0,
//       TotalRejected: 0,
//       TotalReviews: 0,
//       Class: 0
//     },
//     SEO: "",
//     Slogan: "",
//     Status: 0,
//     Slug: "",
//     Telephone: "",
//     Email: "",
//     Banner: {
//       Path: "",
//       Type: 0,
//       Status: 0
//     },
//     Facilities: [],
//     Logo: {
//       Path: "",
//       Type: 0,
//       Status: 0
//     },
//     Medias: [],
//     Price: {
//       price: 0,
//       tax: false,
//       adultmax: 0,
//       days: 0
//     },
//     Created_at: "",
//     Last_updated: "",
//     Introduction: "",
//     BusinessType: SpaceType.HOTEL
//   },
//   Dimension: 1220,
//   Pricing: {
//     Price: 40000,
//     PromoCost: 37500,
//     PromoCode: "37500",
//     Refundable: false,
//     RefundPeriod: 10,
//     CancellationFee: 0,
//     NumberAvailable: 5,
//     WeeklyRate: 0,
//     MonthlyRate: 0
//   },
//   Bed: "Standard",
//   Published_at: "30 December, 2022",
//   Created_at: "",
//   Facilities: [],
//   Last_updated: "",
//   Medias: [
//     {
//       Path: "https://cityhotels.s3.amazonaws.com/hotel2.png",
//       Type: 2,
//       Status: 1
//     }
//   ],

//   SEO: "",
//   Slug: "",
//   Status: 1,
//   Views: 8980,
//   Bookings: 9088
// };

// export const BEDTYPES = ["King Size", "Queen Size", "Double Bed"];

// export const REVIEWS = [
//   {
//     id: "sdsdsd",
//     rating: "7/10",
//     date: "12th May 2023",
//     title: "A Great Value For Money.",
//     content:
//       "My hotel package included free breakfast, free parking, free wifi, cable, and pool. I paid about $80 for 5 nights and completely enjoyed my stay. The staffs were very professional and friendly. the room which was meticulously cleaned each was also sophisticated with modern amenities I.e card activated lighting, air conditioning, water heater etc. The free breakfast however could be improved. The hotel is strategically situated close to shopping, city life, banks, transportation, eateries, etc. ",
//     author: "-Krid, 3 Night trip with friends"
//   },
//   {
//     id: "sdsdssadd",
//     rating: "7/10",
//     date: "12th May 2023",
//     title: "A Great Value For Money.",
//     content:
//       "My hotel package included free breakfast, free parking, free wifi, cable, and pool. I paid about $80 for 5 nights and completely enjoyed my stay. The staffs were very professional and friendly. the room which was meticulously cleaned each was also sophisticated with modern amenities I.e card activated lighting, air conditioning, water heater etc. The free breakfast however could be improved. The hotel is strategically situated close to shopping, city life, banks, transportation, eateries, etc. ",
//     author: "-Krid, 3 Night trip with friends"
//   }
// ];

// export const FAQS = [
//   {
//     question: "Does Sheraton Lagos Hotel have a pool?",
//     answer:
//       "Lorem ipsum dolor sit amet consectetur. Viverra cursus pellentesque arcu fermentum dictum enim.  At maecenas enim ante eu. Facilisi lorem orci vel turpis neque. A orci laoreet pharetra nibh scelerisque imperdiet ipsum diam duis. In eget eu dignissim dictum consectetur porttitor. Felis quis gravida nec diam consectetur massa. Purus nullam cursus euismod tristique ornare."
//   },
//   {
//     question: "What are the check-in and check-out times at Beni Hotels?",
//     answer:
//       "Lorem ipsum dolor sit amet consectetur. Viverra cursus pellentesque arcu fermentum dictum enim.  At maecenas enim ante eu. Facilisi lorem orci vel turpis neque. A orci laoreet pharetra nibh scelerisque imperdiet ipsum diam duis. In eget eu dignissim dictum consectetur porttitor. Felis quis gravida nec diam consectetur massa. Purus nullam cursus euismod tristique ornare."
//   },
//   {
//     question:
//       "What are the cleanliness and hygiene measures currently in place at Beni Hotels?",
//     answer:
//       "Lorem ipsum dolor sit amet consectetur. Viverra cursus pellentesque arcu fermentum dictum enim.  At maecenas enim ante eu. Facilisi lorem orci vel turpis neque. A orci laoreet pharetra nibh scelerisque imperdiet ipsum diam duis. In eget eu dignissim dictum consectetur porttitor. Felis quis gravida nec diam consectetur massa. Purus nullam cursus euismod tristique ornare."
//   },
//   {
//     question: "Does Beni Hotels have any outdoor private spaces?",
//     answer:
//       "Lorem ipsum dolor sit amet consectetur. Viverra cursus pellentesque arcu fermentum dictum enim.  At maecenas enim ante eu. Facilisi lorem orci vel turpis neque. A orci laoreet pharetra nibh scelerisque imperdiet ipsum diam duis. In eget eu dignissim dictum consectetur porttitor. Felis quis gravida nec diam consectetur massa. Purus nullam cursus euismod tristique ornare."
//   },
//   {
//     question: "Does Sheraton Lagos Hotel have a pool?",
//     answer:
//       "Lorem ipsum dolor sit amet consectetur. Viverra cursus pellentesque arcu fermentum dictum enim.  At maecenas enim ante eu. Facilisi lorem orci vel turpis neque. A orci laoreet pharetra nibh scelerisque imperdiet ipsum diam duis. In eget eu dignissim dictum consectetur porttitor. Felis quis gravida nec diam consectetur massa. Purus nullam cursus euismod tristique ornare."
//   }
// ];

// export const mockLocation: ILocation = {
//   Street: "Some in Festac",
//   City: "Festac",
//   State: "Lagos",
//   Country: "Nigeria",
//   Latitude: "",
//   Longitude: "",
//   PostalCode: ""
// };

export const CountryOptions = [
  {
    label: "Nigeria",
    value: "nigeria"
  }
  // {
  //   label: "Singapore",
  //   value: "singapore"
  // },
  // {
  //   label: "Canada",
  //   value: "canada"
  // }
];

// export const CityOptions = [
//   {
//     label: "Lagos",
//     value: "lagos"
//   },
//   {
//     label: "Venice",
//     value: "venice"
//   },
//   {
//     label: "Birkingham",
//     value: "birkingham"
//   }
// ];
// export const StateOptions = [
//   {
//     label: "Lagos",
//     value: "lagos"
//   },
//   {
//     label: "Ogun",
//     value: "ogun"
//   },
//   {
//     label: "Ekiti",
//     value: "ekiti"
//   }
// ];
export const HOTELROLES = [
  {
    Id: "001",
    Title: "OWNER"
  },
  {
    Id: "002",
    Title: "MANAGER"
  },
  {
    Id: "003",
    Title: "IT/SUPPORT"
  },
  {
    Id: "004",
    Title: "RECEPTIONIST"
  },
  {
    Id: "005",
    Title: "ACCOUNTANT"
  },
  {
    Id: "006",
    Title: "PAYOUT"
  }
];

export const HOTELPERMISSONS = [
  {
    Id: "001",
    Name: "ADMIN"
  },
  {
    Id: "002",
    Name: "USER"
  },
  {
    Id: "003",
    Name: "FACILITY"
  },
  {
    Id: "004",
    Name: "RESERVATIONS"
  },
  {
    Id: "005",
    Name: "TRANSACTIONS"
  },
  {
    Id: "006",
    Name: "PAYOUT"
  },
  {
    Id: "007",
    Name: "ROOMS"
  }
];
// export const mockSafetyAmenities: IFacility[] = [
//   {
//     Icon: "/pool-2.svg",
//     Label: "Swimming Pool",
//     Id: SafetyAmenities.SMOKEDETECTOR,

//     Status: true,
//     Type: 0,
//     Description: "Swimming Amenity"
//   },
//   {
//     Icon: "/hot-tub.svg",
//     Label: "Hot tub",
//     Id: SafetyAmenities.FIREEXTINGUISHER,
//     Status: true,
//     Type: 0,
//     Description: "Hot tub Amenity"
//   },
//   {
//     Icon: "/gym-equipment.svg",
//     Label: "Gym",
//     Id: SafetyAmenities.AIDKIT,
//     Status: true,
//     Type: 0,
//     Description: "Gym Amenity"
//   }
// ];

// export const mockOtherAmenities: IFacility[] = [
//   {
//     Icon: "/pool-2.svg",
//     Label: "Swimming Pool",
//     Id: OtherAmenities.SWIMMINGPOOL,
//     Status: true,
//     Type: 0,
//     Description: "Swimming Amenity"
//   },
//   {
//     Icon: "/hot-tub.svg",
//     Label: "Hot tub",
//     Id: OtherAmenities.HOTTUB,
//     Status: true,
//     Type: 0,
//     Description: "Hot tub Amenity"
//   },
//   {
//     Icon: "/gym-equipment.svg",
//     Label: "Gym",
//     Id: OtherAmenities.GYM,

//     Status: true,
//     Type: 0,
//     Description: "Gym Amenity"
//   },
//   {
//     Icon: "/shower-1.svg",
//     Label: "Outdoor Shower",
//     Id: OtherAmenities.OUTDOORSHOWER,
//     Status: true,
//     Type: 0,
//     Description: "Shower Amenity"
//   },
//   {
//     Icon: "/beach.svg",
//     Label: "Beach access",
//     Id: OtherAmenities.BEACH,
//     Status: true,
//     Type: 0,
//     Description: "Beach Amenity"
//   },
//   {
//     Icon: "/patio.svg",
//     Label: "Patio",
//     Id: OtherAmenities.PIATO,
//     Status: true,
//     Type: 0,
//     Description: "Paito Amenity"
//   },
//   {
//     Icon: "/bbq-gril.svg",
//     Label: "BBQ Grill",
//     Id: OtherAmenities.BBQGRILL,
//     Status: true,
//     Type: 0,
//     Description: "BBQ Grill Amenity"
//   },
//   {
//     Icon: "/pool-table.svg",
//     Label: "Pool Table",
//     Id: OtherAmenities.POOLTABLE,
//     Status: true,
//     Type: 0,
//     Description: "PoolTable Amenity"
//   },
//   {
//     Icon: "/piano.svg",
//     Label: "Piano",
//     Id: OtherAmenities.PIANO,
//     Status: true,
//     Type: 0,
//     Description: "Piano Amenity"
//   }
// ];

// // export const mockFacilitiesTypes: IFacility[] = [
// //   {
// //     Icon: "/wifi-2.svg",
// //     Id: Amenities.WIFI,
// //     Label: "Wifi",
// //     Status: true,
// //     Type: 0,
// //     Description: "Wifi Amenity"
// //   },
// //   {
// //     Icon: "/tv-2.svg",
// //     Label: "TV",
// //     Id: Amenities.TV,
// //     Status: true,
// //     Type: 1,
// //     Description: "Tv Amenity"
// //   },
// //   {
// //     Icon: "/washing-machine-2.svg",
// //     Label: "Washing Machine",
// //     Id: Amenities.WASHINGMACHINE,
// //     Status: true,
// //     Type: 1,
// //     Description: "Washing Amenity"
// //   },
// //   {
// //     Icon: "/air-conditioner-2.svg",
// //     Label: "Air Conditioning",
// //     Id: Amenities.AIRCONDITIONING,
// //     Status: true,
// //     Type: 1,
// //     Description: "AirConditioner Amenity"
// //   },
// //   {
// //     Icon: "/free parking-2.svg",
// //     Label: "Free Parking",
// //     Id: Amenities.FREEPARKING,
// //     Status: true,
// //     Type: 1,
// //     Description: "Parking Amenity"
// //   },
// //   {
// //     Icon: "/free parking-2.svg",
// //     Label: "Paid Parking",
// //     Id: Amenities.PAIDPARKNG,
// //     Status: true,
// //     Type: 1,
// //     Description: "Parking Amenity"
// //   },
// //   {
// //     Icon: "/workspace-2.svg",
// //     Label: "Dedicated workspace",
// //     Id: Amenities.DEDICATEDWORKSPACE,
// //     Status: true,
// //     Type: 1,
// //     Description: "Workspace Amenity"
// //   }
// // ];

// export const userCardData = [
//   {
//     name: "You(Admin)",
//     status: "Active"
//   },
//   {
//     name: "User1",
//     status: "Active"
//   },
//   {
//     name: "User2",
//     status: "Active"
//   },
//   {
//     name: "User3",
//     status: "Active"
//   },
//   {
//     name: "User4",
//     status: "Inactive"
//   }
// ];
