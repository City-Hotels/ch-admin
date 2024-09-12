import { PromotionFilter } from "@/services/promotions/payload";

export default interface FilterProps {
  className?: string;
  onClose?: Function;
  filter: PromotionFilter;
  setFilter: (filter: PromotionFilter) => void;
}
