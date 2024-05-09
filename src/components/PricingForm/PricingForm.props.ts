import type { IPricingPayload } from "@/services/apartment/payload";

export default interface PrincingFormProps
  extends React.HtmlHTMLAttributes<HTMLElement> {
  prices: IPricingPayload;
  hideDiscount?: Boolean;
  onUpdatePrices: (prices: IPricingPayload) => void;
}
