"use client"
import Carousel from "@/components/Carousel/Carousel";
import { H2, H3, H4, Label, P2 } from "@/components/Headings/Headings";
import { getRoom, uploadRoomMedia } from "@/services/room";
import type { IRoom } from "@/services/room/payload";
import queryKeys from "@/utils/api/queryKeys";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "react-query";
import BookingTable from "@/components/Bookings/BookingTable";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ButtonLink from "@/components/Button/Link/Link";

const RoomPage = () => {
  const router = useRouter();
  const { idOrSlug } = useParams<{ idOrSlug: string }>();

  const { isLoading, data, isError } = useQuery(
    [queryKeys.getRoomByID],
    () => getRoom(idOrSlug?.toString()),
    {
      enabled: !!idOrSlug // Would only make this request if slug is truthy
    }
  );

  const room = data?.data as IRoom;

  return (
    <DefaultLayout>
      <div className="size-full items-center">
        {isLoading && (
          <div className="absolute left-1/2 top-1/2 min-h-[70vh] -translate-x-1/2 -translate-y-1/2">
            Loading
          </div>
        )}
        {isError && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            Error page
          </div>
        )}
        {!isLoading && !isError && room && (
          <>
            <div className="flex items-center justify-between">
              <H2 className="">{room.Name}</H2>
              <div className="flex items-center gap-2">
                <ButtonLink
                  size="sm"
                  color="muted"
                  href={`/hotel/rooms/${idOrSlug?.toString()}/manage`}
                >
                  Manage
                </ButtonLink>
              </div>
            </div>

            <div className="flex flex-col gap-x-16 lg:flex-row">
              <div className="my-5">
                <Carousel
                  medias={room?.Medias || []}
                  autoSlide
                  activeClassName="rounded-xl w-[485px] max-h-[395px]"
                  thumbnailClassName="max-h-[82px] max-w-[83px] rounded-md"
                  onUpdate={uploadRoomMedia} 
                />
              </div>
              <div className="lg:mt-10">
                <H3 className="lg:my-1">₦{room?.Pricing?.Price} /Night </H3>
                <P2>Room ID: #{room?.Id}</P2>

                <H4 className="pt-5 text-[14px]">Description</H4>
                <P2 className="min-h-[110px]">{room?.Description}</P2>
                <div className="mt-4 lg:w-[405px]">
                  <div className="mb-3 flex gap-3">
                    <Label className="border-b border-b-primary400 pb-1 text-primary400">
                      Facilities
                    </Label>
                    <Label>Others</Label>
                  </div>
                  <div className=" grid grid-cols-2 gap-2 md:grid-cols-1 lg:grid-cols-2">
                    <div className="flex h-[40px] w-[195px] items-center gap-2 rounded-lg bg-[#f3f1f1] px-2">
                      <P2>{room.MaxBedRoom} Bedroom</P2>
                    </div>
                    <div className="flex h-[40px] w-[195px] items-center gap-2 rounded-lg bg-[#f3f1f1] px-2">
                      <P2>{room.Dimension} SQFT</P2>
                    </div>
                    <div className="flex h-[40px] w-[195px] items-center gap-2 rounded-lg bg-[#f3f1f1] px-2">
                      <P2>{room.BathCount} Bathroom</P2>
                    </div>
                    <div className="flex h-[40px] w-[195px] items-center gap-2 rounded-lg bg-[#f3f1f1] px-2">
                      <P2>{room.Views || 0} Views</P2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="mt-10 bg-white">
          <BookingTable Limit={5} Filter={{ RoomId: room?.Id }} />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default RoomPage;
