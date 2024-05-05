import { IRoomFilter } from "@/services/room/payload";

export default interface FilterProps {
  className?: string;
  onClose?: Function;
  filter: IRoomFilter;
  setFilter: (filter: IRoomFilter) => void;
}
