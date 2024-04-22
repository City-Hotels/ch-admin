import type { IFacility } from "@/services/apartment/payload";

export default interface DashBoardFacilityCardProps extends IFacility {
  selected?: boolean;
  onSelected?: Function;
  title?: string;
}
