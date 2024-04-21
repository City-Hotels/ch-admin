import type { IHotelUserRole } from "@/services/hotel-users/payload";

export default interface NewUserRoleProps {
  closeModal: Function;
  hotelAdminRole?: IHotelUserRole;
}
