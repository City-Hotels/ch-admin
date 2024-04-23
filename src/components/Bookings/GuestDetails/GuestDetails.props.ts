import type { IReservation } from "@/services/booking/payload";

export default interface GuestDetailsProps
  extends React.HtmlHTMLAttributes<HTMLElement> {
  reservation: IReservation;
}
