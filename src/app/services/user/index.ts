import { getRequest, patchRequest } from "../../utils/api/calls";
import type { IUser, UserPayload } from "./payload";

const getProfile = () => {
  return getRequest<IUser>({
    url: "/user"
  });
};

const updateProfile = (data: UserPayload) => {
  return patchRequest<UserPayload, any>({
    url: "/user",
    data
  });
};

export { getProfile, updateProfile };
