import { IPromotion } from "@/services/promotions/payload";

export default interface FormProps {
    onSubmit: (values: IPromotion) => void; 
  }
  