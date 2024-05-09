
import type { IDetailsPayload } from "@/services/apartment/payload";

export interface CounterData {
  id: string;
  count: number;
  title: string;
  description: string;
  value?: number;
}

export interface ApartmentDetailsFormProps {
  value: IDetailsPayload;
  onUpdateDetails: (details: IDetailsPayload) => void;
}
