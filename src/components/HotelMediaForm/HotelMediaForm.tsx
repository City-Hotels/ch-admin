import React from "react";
import type { ApiResponse } from "@/utils/api/calls";
import MediaForm from "../MediaForm/MediaForm";
import { IHotel } from "@/services/hotel/payload";

export interface HotelMediaFormProps {
  hotel: IHotel;
  onSubmit: (
    data: FormData,
    setProgress: Function
  ) => Promise<ApiResponse<{ Path: string; }>>;
  onDeleteItem: (
    file: string
  ) => void;
}

const HotelMediaForm: React.FC<HotelMediaFormProps> = ({ hotel, onSubmit, onDeleteItem }) => {


  return (
    <div className="flex flex-col gap-4 rounded-md bg-white p-5 shadow-md">
      <MediaForm
        onSelect={(_itemId, form, setProgress) =>
          onSubmit(form, setProgress)
        }
        itemId={hotel?.Id}
        onDelete={(_itemId, path) => onDeleteItem(path)}
        previousFiles={hotel?.Medias || []}
      />
    </div>
  );
};

export default HotelMediaForm;
