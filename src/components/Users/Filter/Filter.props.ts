import { IUserFilter } from "@/services/user/payload";

export default interface FilterProps {
  className?: string;
  onClose?: Function;
  filter: IUserFilter;
  setFilter: (filter: IUserFilter) => void;
}
