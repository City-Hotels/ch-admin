import { TransactionFilter } from "@/services/transactions/payload"

export default interface FilterProps {
  className?: string;
  onClose?: Function;
  filter: TransactionFilter;
  setFilter: (filter: TransactionFilter) => void;
}
