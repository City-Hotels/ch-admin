import { ApartmentFilter } from "@/services/apartment/payload";

export default interface FilterProps {
  className?: string;
  onClose?: Function;
  filter: ApartmentFilter;
  setFilter: (filter: ApartmentFilter) => void;
}
