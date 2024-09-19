import * as Yup from "yup";

export const emailValidation = Yup.string()
  .email("invalid email format")
  .required("Provide your email address");

export const passwordValidation = Yup.string()
  .min(8)
  .max(15)
  .required("Password is required")
  .matches(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[@$!%*#\-?&])[A-Za-z\d@$!%*#?&.]/,
    "Password should contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character (@$!%*#-?&)"
  );

export const phoneNumberValidation = Yup.number()
  .min(11, "Phone should not be less than 11 digits")
  .required("Phone number is required")
  .typeError("Phone number is not valid");

export const alphabetValidation = Yup.string()
  .trim()
  .required("This field is required")
  .matches(/^[A-Z][a-z]+$/i, "Only alphabets are allowed here");

// Validation schema for sign up form
export const signUpSchema = Yup.object({
  Firstname: Yup.string()
    .required("First name is required")
    .matches(/^[a-zA-Z]+$/, "First name should contain only alphabets"),
  Lastname: Yup.string()
    .required("Last name is required")
    .matches(/^[a-zA-Z]+$/, "Last name should contain only alphabets"),
  Email: emailValidation,
  Password: passwordValidation,
  Telephone: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{11}$/, "Phone number should contain 11 digits")
});

// Validation schema for sign up form
export const updateProfileSchema = Yup.object({
  Firstname: Yup.string()
    .required("First name is required")
    .matches(/^[a-zA-Z]+$/, "First name should contain only alphabets"),
  Lastname: Yup.string()
    .required("Last name is required")
    .matches(/^[a-zA-Z]+$/, "Last name should contain only alphabets"),
  Email: emailValidation,
  Telephone: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{11}$/, "Phone number should contain 11 digits")
  // Country: Yup.string().required("Please select your country"),
  // State: Yup.string().required("Please select your state")
});

// Validation schema for login form
export const loginSchema = Yup.object({
  LoginId: emailValidation,
  Password: Yup.string().required("Password is required to login")
});

// Validation schema for forgot password
export const forgotPasswordSchema = Yup.object({
  LoginId: emailValidation
});

// Validation schema for reset password
export const resetPasswordSchema = Yup.object({
  Password: passwordValidation,
  LoginId: emailValidation,
  Password_Confirmation: Yup.string()
    .oneOf([Yup.ref("Password")], "Passwords must match")
    .required("Password confirmation is required")
});
// Validation schema for reset password
export const changePasswordSchema = Yup.object({
  OldPassword: passwordValidation,
  NewPassword: passwordValidation,
  ConfirmPassword: Yup.string()
    .oneOf([Yup.ref("NewPassword")], "Passwords must match")
    .required("Password confirmation is required")
});

export const roomBookingFormSchema = Yup.object({
  CheckInDate: Yup.date().required("Check in date is required"),
  CheckOutDate: Yup.date().required("Check out date is required"),
  Guests: Yup.number().required("Please select number of guests"),
  NumberOfRooms: Yup.number().required("Please select number of guests")
});

// Validation schema for adding room
export const addRoomSchema = Yup.object({
  Name: Yup.string().required("Room name is required"),
  Dimension: Yup.number().required("Dimension is required"),
  MaxAdults: Yup.number().required("Dimension is required"),
  MaxChildren: Yup.number().required("Dimension is required"),
  MaxBedRoom: Yup.number().required("Dimension is required")
  // Facilities: Yup.string().required("Facilities is required")
});

export const accountInfoSchema = Yup.object({
  Name: Yup.string().required("Name is required"),
  Title: Yup.string().required("Title is required"),
  Description: Yup.string().required("Decription is required"),
  ShortDescription: Yup.string().required("Short Description is required"),
  MaxParticipant: Yup.number().required("Maximum number Participant is required")
});
export const requirementSchema = Yup.object({
  City: Yup.string(),
  Country: Yup.string(),
  PostalCode: Yup.string(),
  State: Yup.string(),
  Street: Yup.string(),
  ServiceType: Yup.string(),
  MaximumBooking: Yup.number(),
  MinimumBooking: Yup.number()
});

export const priceSchema = Yup.object({
  BookingDiscount: Yup.number().required("BookingDiscount is required"),
  Rate: Yup.number().required("Rate is required"),
  PricingType: Yup.string().required("PricingType is required"),
  Unit: Yup.string().required("Unit is required"),
});

export const addRoomByTypeSchema = Yup.object({
  Name: Yup.string().required("Room name is required"),
  TypeId: Yup.string().required("Please select room type")
  // Facilities: Yup.string().required("Facilities is required")
});

export const addRoomTypeSchema = Yup.object({
  Title: Yup.string().required("Name is required"),
  CancellationPolicy: Yup.string().required(
    "Please select cancellation policy"
  ),
  StandardType: Yup.string().required("Please select standard type"),
  MinOccupants: Yup.number().required("Enter min occupant"),
  MaxOccupants: Yup.number().required("Enter max occupant"),
  MaxBedRoom: Yup.number().required("Enter max bedroom"),
  BasePrice: Yup.number()
    .required("Please enter base price")
    .min(1, "Base price must be greater than zero(0)."),

  Facilities: Yup.string().required("Facilities is required")
});

export const roomPriceConfigurationSchema = Yup.object({
  NumberAvailable: Yup.number().required("Room quantity is required"),
  Price: Yup.number().required("Room Price is required"),
  PromoCost: Yup.number().required("Promo Price is required"),
  // PromoCode: Yup.string().required("Promo Price is required"),
  RefundPeriod: Yup.number().required("Promo Price is required"),
  Refundable: Yup.bool().required("Promo Price is required"),
  CancellationFee: Yup.number().required("Promo Price is required")
});
// Validation schema for hotel registeration
export const RegisterHotelSchema = Yup.object({
  HotelName: Yup.string().required("Hotel name is required"),
  Email: emailValidation,
  Telephone: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{11}$/, "Phone number should contain 11 digits")
});

// Validation schema for create hotel password
export const createHotelPasswordSchema = Yup.object({
  Password: passwordValidation,
  Password_Confirmation: Yup.string()
    .oneOf([Yup.ref("Password")], "Passwords must match")
    .required("Password confirmation is required")
});

// Validation schema for hotel registrar
export const HotelRegistrarSchema = Yup.object({
  Role: Yup.string().required("Role is required"),
  Firstname: Yup.string()
    .required("First name is required")
    .matches(/^[a-zA-Z]+$/, "First name should contain only alphabets"),
  Lastname: Yup.string()
    .required("Last name is required")
    .matches(/^[a-zA-Z]+$/, "Last name should contain only alphabets"),
  Telephone: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{11}$/, "Phone number should contain 11 digits"),
  Email: emailValidation
});

// Validation schema for bank information
export const BankInformationSchema = Yup.object({
  BankName: Yup.string().required("Bank Name is required"),
  AccountNumber: Yup.string()
    .required("Account number is required")
    .matches(/^[0-9]{10}$/, "Account number is required"),
  AccountName: Yup.string().required("Account name is required")
});

export const InitiateWithdrawSchema = Yup.object({
  Amount: Yup.number()
    .required("Please enter amount to withdraw")
    .min(100, "Please enter 100 and abive"),
  PaymentDetailsId: Yup.string().required("Please select payment details"),
  Verify: Yup.bool().isTrue("Please confirm withdrawal details")
});
// Validation schema for security information
export const SecurityInformationSchema = Yup.object({
  OldPassword: passwordValidation,
  NewPassword: passwordValidation,
  ConfirmPassword: Yup.string()
    .oneOf([Yup.ref("NewPassword")], "Passwords must match")
    .required("Password confirmation is required")
});
// Validation schema for management information
export const managementInformationSchema = Yup.object({
  Firstname: Yup.string().required("Manager firstname is required"),
  Lastname: Yup.string().required("Manager lastname Name is required"),
  Email: emailValidation,
  Telephone: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{11}$/, "Phone number should contain 11 digits"),
  ParentCompany: Yup.string().required("Parent company is required")
});

export const supportInformationSchema = Yup.object({
  Firstname: Yup.string().required("Manager firstname is required"),
  Lastname: Yup.string().required("Manager lastname Name is required"),
  Email: emailValidation,
  Telephone: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{11}$/, "Phone number should contain 11 digits")
});
// Validation schema for management information
export const hotelUserInformationSchema = Yup.object({
  Firstname: Yup.string().required("First Name is required"),
  Lastname: Yup.string().required("Last Name is required"),
  Email: emailValidation,
  Telephone: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{11}$/, "Phone number should contain 11 digits"),
  Role: Yup.string().required("Please select user role"),
  Permissions: Yup.array()
});
// Validation schema for management information
export const hotelRoleSchema = Yup.object({
  Role: Yup.string().required("Please select user role"),
  Permissions: Yup.array().min(1, "Assign atleast 1 permission")
});
export const selectPermissionsSchema = Yup.object({
  Permissions: Yup.array().min(1, "Select permission")
});

export const hotelInformationSchema = Yup.object({
  Name: Yup.string().required("Please provide the hotel name."),
  Slogan: Yup.string().required("A catchy slogan for your hotel is required."),
  Email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required."),
  Introduction: Yup.string().required(
    "Please provide a short message about your hotel."
  ),
  // Address: Yup.string().required("The hotel address is required."),

  Telephone: Yup.string()
    .required("Phone number is required.")
    .matches(/^[0-9]{11}$/, "Phone number should contain 11 digits.")
    .test("is-valid-phone", "Invalid phone number format", () => {
      // You can add custom validation logic here if needed
      // For example, checking if the phone number starts with a valid country code.
      return true;
    })
});

export const apartmentInformationSchema = Yup.object({
  Name: Yup.string().required("Please provide the Apartment name."),
  Description: Yup.string().required(
    "Please provide a short Description of your Apartment."
  )
});

export const createTicketSchema = Yup.object({
  ticketTitle: Yup.string().required("a title is required"),
  ticketSubtitle: Yup.string().required("please enter a subtitle"),
  ticketAssignee: Yup.string().required("please select an assignee"),
  description: Yup.string().required("ticket description is required")
});

// // Validation schema for hotel information
// export const hotelInformationSchema = Yup.object({
//   HotelName: Yup.string().required("Hotel Name is required"),
//   HotelSlogan: Yup.string().required("Hotel Slogan is required"),
//   Email: emailValidation,
//   Introduction: Yup.string().required("Location is required"),
//   // Location: Yup.string().required("Location is required"),
//   Address: Yup.string().required("Address is required"),
//   // State: Yup.string().required("State is required"),
//   // City: Yup.string().required("City is required"),
//   // GoogleCoordinate: Yup.string().required("Google Coordinate is required"),
//   // ContactEmail: emailValidation,
//   Telephone: Yup.string()
//     .required("Phone number is required")
//     .matches(/^[0-9]{11}$/, "Phone number should contain 11 digits")
// });

// Validation schema for verifying apartment address
export const verifyAddressSchema = Yup.object({
  City: Yup.string().required("City is required"),
  Country: Yup.string().required("Country is required"),
  // Latitude: Yup.string().required("Hotel Name is required"),
  // Longitude: Yup.string().required("Hotel Name is required"),
  // PostalCode: Yup.string().required("Hotel Name is required"),
  State: Yup.string().required("State is required"),
  Street: Yup.string().required("Street is required")
});

export const nearbyLocationFormSchema = Yup.object({
  Location: Yup.string().required("Pease enter location"),
  Distance: Yup.string().required("Please enter distance"),
  Unit: Yup.string().required("Please select unit")
});

export const faqFormSchema = Yup.object({
  Question: Yup.string().required("Pease enter question"),
  Answer: Yup.string().required("Please enter answer")
});

export const guestReviewSchema = Yup.object({
  BookingId: Yup.string().required("BookingId is required"),
  Cleaniness: Yup.number().required("How clean was the apartment"),
  Facility: Yup.number().required("Rate the faclities  AC, Shower etc"),
  FreeWifi: Yup.number().required("How was the wifi"),
  Overall: Yup.number().required("Your overall experience with the host"),
  ValueForMoney: Yup.number().required("Did you get your money's worth"),
  Comfort: Yup.number().required("Rate the comfort"),
  Review: Yup.string().required("Write a review message"),
  ReviewTitle: Yup.string().required("Title your review")
});

export const hostReviewSchema = Yup.object({
  BookingId: Yup.string().required("BookingId is required"),
  Overall: Yup.number().required("Your overall experience with the host"),
  Review: Yup.string().required("Write a review message")
});

export const createPaymentDetailsSchema = Yup.object({
  accountNumber: Yup.string().required("Please enter account number"),
  bankName: Yup.string(),
  bankCode: Yup.string().required("Please select bank"),
  country: Yup.string().required("Enter account country"),
  currency: Yup.string().required("Enter account currency"),
  routingNumber: Yup.string(),
  swiftCode: Yup.string()
});
