import { IHotel } from "@/services/hotel/payload";

export default interface SummaryCardProps
  extends React.HtmlHTMLAttributes<HTMLElement> {
  path: string;
  hotel: IHotel;
}
