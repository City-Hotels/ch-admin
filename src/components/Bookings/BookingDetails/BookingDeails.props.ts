import type { IReservation } from "@/services/booking/payload";

export default interface BookingDetailsProp
  extends React.HtmlHTMLAttributes<HTMLElement> {
  reservation: IReservation;
}
