import { IPromotion } from "@/services/promotions/payload";

export default interface PromotionGridProps
  extends React.HtmlHTMLAttributes<HTMLElement> {
  promotion?: IPromotion;
}
