import type { IHotelUser } from "@/services/hotel-users/payload";

export default interface NewAdminProps {
  closeModal: Function;
  hotelAdmin?: IHotelUser;
  onClickCreateCustomRole: Function;
}
