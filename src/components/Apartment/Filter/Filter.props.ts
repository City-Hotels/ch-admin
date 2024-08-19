import { IApartmentFilter } from "@/services/apartment/payload";

export default interface FilterProps {
  className?: string;
  onClose?: Function;
  filter: IApartmentFilter;
  setFilter: (filter: IApartmentFilter) => void;
}
