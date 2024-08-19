import { IHotel, ManagerInformationPayload } from "@/services/hotel/payload";
import { ApiResponse } from "@/utils/api/calls";

export default interface ManamentInformationFormProps {
  manager: ManagerInformationPayload;
  onSubmit: (
    data: ManagerInformationPayload,
  ) => void;
  isSubmitting: boolean;
}
