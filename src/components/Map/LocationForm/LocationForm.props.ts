import type { ILocation } from "@/services/location/payload";

export default interface LocationFormProps
  extends React.HtmlHTMLAttributes<HTMLElement> {
  description: string;
  icon: any;
  value?: ILocation;
  onSelectLocation: (location: ILocation) => void;
}
