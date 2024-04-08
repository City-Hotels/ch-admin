import { HotelFilter } from "@/services/hotel/payload";

export default interface FilterProps {
  className?: string;
  onClose?: Function;
  filter: HotelFilter;
  setFilter: (filter: HotelFilter) => void;
}
