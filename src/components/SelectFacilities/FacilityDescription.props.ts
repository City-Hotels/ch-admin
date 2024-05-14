import type { IFacility } from "@/services/apartment/payload";

export default interface FacilityDescriptionProps extends IFacility {
  onUpdateDescription: (description: string) => void;
}
