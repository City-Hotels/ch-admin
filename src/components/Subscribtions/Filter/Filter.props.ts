import { SubscriptionFilter } from "@/services/promotions/payload";

export default interface FilterProps {
  className?: string;
  onClose?: Function;
  filter: SubscriptionFilter;
  setFilter: (filter: SubscriptionFilter) => void;
}
