import type { ILocation } from "@/services/location/payload";

export default interface MapProps
  extends React.HtmlHTMLAttributes<HTMLElement> {
  className?: string;
  location: ILocation;
  showAddress?: boolean;
}
