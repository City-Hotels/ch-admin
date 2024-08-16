import { Meta, getRequest, patchRequest } from "../../utils/api/calls";
import type { IUser, UserPayload } from "./payload";

const getProfile = () => {
  return getRequest<IUser>({
    url: "/user"
  });
};
const ListUsers = (filter: any) => {
  const args = Object.keys(filter)
    .map(
      (item) => `${encodeURIComponent(item)}=${encodeURIComponent(filter[item])}`
    )
    .join("&");

  return getRequest<{ Users: IUser[]; Meta: Meta }>({
    url: `/user/list?${args}`
  });
};

const updateProfile = (data: UserPayload) => {
  return patchRequest<UserPayload, any>({
    url: "/user",
    data
  });
};

const getUser = (userId: string | undefined) => {
  return getRequest<IUser>({
    url: `/user/${userId}`
  });
};

export { getProfile, ListUsers, updateProfile, getUser };
