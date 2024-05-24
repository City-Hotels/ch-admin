"use client";

import HotelMediaForm from "@/components/HotelMediaForm/HotelMediaForm";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { deleteHotelMedia, getHotel, uploadHotelMedia } from "@/services/hotel";
import { IHotel } from "@/services/hotel/payload";
import { ApiResponse } from "@/utils/api/calls";
import queryKeys from "@/utils/api/queryKeys";
import { useParams } from "next/navigation";
import React from "react";
import { useQuery } from "react-query";


const BannerImages = () => {

  const { idOrSlug } = useParams<{ idOrSlug: string }>();
  const hotelId = idOrSlug ? idOrSlug.toString() : "";

  const { data } = useQuery(
    [queryKeys.getHotelByID, idOrSlug],
    () => getHotel(idOrSlug?.toString()),
    {
      enabled: !!idOrSlug // Would only make this request if slug is truthy
    }
  );

  const hotel = data?.data as IHotel;

  const uploadImage = (
    data: FormData,
    setProgress: Function
  ): Promise<
    ApiResponse<{
      Path: string;
    }>
  > => {
    return uploadHotelMedia(data, setProgress, hotelId).then((res) => {
      return res;
    });
  };

  const deleteMedia = (file: string): Promise<void | ApiResponse<null>> => {
    return deleteHotelMedia(file, hotelId).then((res) => {
      return res;
    });
  };

  return (
    <DefaultLayout>
      <div className="w-[800px]">
        <HotelMediaForm hotel={hotel} onSubmit={uploadImage} onDeleteItem={deleteMedia}/>
      </div>
    </DefaultLayout>
  );
};

export default BannerImages;
