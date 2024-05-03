import HotelMediaForm from "@/components/HotelMediaForm/HotelMediaForm";
import HotelAdminLayout from "@/layout/hotelAdmin/HotelAdmin";
import { deleteHotelMedia, uploadHotelMedia } from "@/services/hotel";
import { ApiResponse } from "@/utils/api/calls";
import React from "react";


const BannerImages = () => {

  const uploadImage = (
    data: FormData,
    setProgress: Function
  ): Promise<
    ApiResponse<{
      Path: string;
    }>
  > => {
    return uploadHotelMedia(data, setProgress).then((res) => {
      return res;
    });
  };

  const deleteMedia = (file: string): Promise<void | ApiResponse<null>> => {
    return deleteHotelMedia(file).then((res) => {
      return res;
    });
  };

  return (
    <HotelAdminLayout>
      <div className="w-[800px]">
        <HotelMediaForm hotel={hotel} onSubmit={uploadImage} onDeleteItem={deleteMedia} />
      </div>
    </HotelAdminLayout>
  );
};

export default BannerImages;
