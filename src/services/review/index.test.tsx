// import { getRequest, postRequest } from "../../utils/api/calls";
// import { addReview, getReviews } from "./index";
// import type { IReview } from "./payload";

// jest.mock("../../utils/api/calls", () => ({
//   getRequest: jest.fn(),
//   postRequest: jest.fn()
// }));

// describe("addReview", () => {
//   it("should call postRequest with correct url and data", () => {
//     const data: IReview = {
//       BookingId: "3",
//       HotelId: "3",
//       Message: "Great hotel!"
//     };

//     addReview(data);

//     expect(postRequest).toHaveBeenCalledWith({
//       url: "/review",
//       data
//     });
//   });
// });

// describe("getReviews", () => {
//   it("should call getRequest with correct url", () => {
//     getReviews();

//     expect(getRequest).toHaveBeenCalledWith({
//       url: "/review"
//     });
//   });
// });
