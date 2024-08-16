import type { IHotelUserRole } from "@/services/hotel-users/payload";

export default interface PermissionsListModalProps {
  closeModal: Function;
  hotelAdminRole?: IHotelUserRole;
  values: string[];
  onChange: (values: string[]) => void;
}
