import { getProfile, updateProfile } from "./index";
import { getRequest, patchRequest } from "@/utils/api/calls";
import type { UserPayload } from "./payload";

jest.mock("../../utils/api/calls", () => ({
  getRequest: jest.fn(),
  postRequest: jest.fn(),
  patchRequest: jest.fn()
}));

describe("getProfile", () => {
  it("should call getRequest with correct url", () => {
    getProfile();

    expect(getRequest).toHaveBeenCalledWith({
      url: "/user"
    });
  });
});

describe("updateProfile", () => {
  it("should call patchRequest with correct url and data", () => {
    const data: UserPayload = {
      Firstname: "John",
      Lastname: "Doe",
      Email: "john.doe@example.com",
      Telephone: "081827277277",
      Country: "Nigeria",
      State: "Lagos"
    };
    const expectedUrl = "/user";

    updateProfile(data);

    expect(patchRequest).toHaveBeenCalledWith({
      url: expectedUrl,
      data
    });
  });
});
