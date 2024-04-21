import { deleteRequest, getRequest, postRequest } from "../../utils/api/calls";
import type { IHotelUser, IHotelUserRole } from "./payload";

const getHotelUsers = () => {
  return getRequest<{ HotelUsers: IHotelUser[] }>({
    url: `/hotel/users`
  });
};

const createHotelUser = (data: IHotelUser) => {
  return postRequest<IHotelUser, null>({
    url: `/hotel/users`,
    data
  });
};

const deleteHotelUser = (HotelUserId: string) => {
  return deleteRequest<IHotelUser, null>({
    url: `/hotel/users/${HotelUserId}`
  });
};

const susependHotelUser = (HotelUserId: string) => {
  return deleteRequest<IHotelUser, null>({
    url: `/hotel/users/${HotelUserId}`
  });
};

const updateHotelUserPermission = (HotelUserId: string) => {
  return deleteRequest<IHotelUser, null>({
    url: `/hotel/users/${HotelUserId}`
  });
};

const getHotelRoles = () => {
  return getRequest<{ ServiceRoles: IHotelUserRole[] }>({
    url: `/hotel/roles`
  });
};

const createHotelUserRole = (data: IHotelUserRole) => {
  return postRequest<IHotelUserRole, null>({
    url: `/hotel/roles`,
    data
  });
};

const updateHotelUserRole = (data: IHotelUserRole) => {
  return deleteRequest<IHotelUserRole, null>({
    url: `/hotel/users/${data.Id}`,
    data
  });
};

export {
  getHotelUsers,
  createHotelUser,
  updateHotelUserRole,
  deleteHotelUser,
  susependHotelUser,
  updateHotelUserPermission,
  createHotelUserRole,
  getHotelRoles
};
