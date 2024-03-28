import { BookingFilter } from "@/services/booking/payload";

export default interface FilterProps {
  className?: string;
  onClose?: Function;
  filter: BookingFilter;
  setFilter: (filter: BookingFilter) => void;
}
