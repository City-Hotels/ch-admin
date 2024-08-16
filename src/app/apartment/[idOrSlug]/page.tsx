"use client"
import Carousel from "@/components/Carousel/Carousel";
import { H2, H3, H4, Label, P2 } from "@/components/Headings/Headings";
import { getApartment, uploadApartmentMedia } from "@/services/apartment";
import type { IApartment } from "@/services/apartment/payload";
import queryKeys from "@/utils/api/queryKeys";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "react-query";
import BookingTable from "@/components/Bookings/BookingTable";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ButtonLink from "@/components/Button/Link/Link";

const ApartmentPage = () => {
  const router = useRouter();
  const { idOrSlug } = useParams<{ idOrSlug: string }>();

  const { isLoading, data, isError } = useQuery(
    [queryKeys.getApartmentByID],
    () => getApartment(idOrSlug?.toString()),
    {
      enabled: !!idOrSlug // Would only make this request if slug is truthy
    }
  );

  const apartment = data?.data as IApartment;

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
        {!isLoading && !isError && apartment && (
          <>


            <div className="flex flex-col gap-x-12 lg:flex-row w-full">
              <div className="my-10">
                <Carousel
                  medias={apartment?.Medias || []}
                  autoSlide
                  activeClassName="rounded-xl w-[485px] max-h-[395px]"
                  thumbnailClassName="max-h-[82px] max-w-[83px] rounded-md"
                  onUpdate={uploadApartmentMedia}
                />
              </div>
              <div className="lg:mt-10 w-full">
                <div className="flex items-center w-full justify-between">
                  <H2 className="">{apartment.Name}</H2>
                  <div className="flex items-center gap-2">
                    <ButtonLink
                      size="sm"
                      color="muted"
                      href={`/apartment/${idOrSlug?.toString()}/manage`}
                    >
                      Manage
                    </ButtonLink>
                  </div>
                </div>
                <H3 className="lg:my-1">₦{apartment?.Pricing?.Price} /Night </H3>
                <P2 weight="bold">Apartment ID: #{apartment?.Id}</P2>

                <H4 className="pt-5 text-[14px]">Description</H4>
                <P2 className="min-h-[110px]">{apartment?.Description}</P2>
                <div className="mt-4 lg:w-[405px]">
                  <div className="mb-3 flex gap-3">
                    <Label className="border-b border-b-primary400 pb-1 text-primary400">
                      Facilities
                    </Label>
                    <Label>Others</Label>
                  </div>
                  <div className=" grid grid-cols-2 gap-2 md:grid-cols-1 lg:grid-cols-2">
                    <div className="flex h-[40px] w-[195px] items-center gap-2 rounded-lg bg-[#f3f1f1] px-2">
                      <P2>{apartment.MaxBedRoom} Bedroom</P2>
                    </div>
                    <div className="flex h-[40px] w-[195px] items-center gap-2 rounded-lg bg-[#f3f1f1] px-2">
                      <P2>{apartment.Dimension} SQFT</P2>
                    </div>
                    <div className="flex h-[40px] w-[195px] items-center gap-2 rounded-lg bg-[#f3f1f1] px-2">
                      <P2>{apartment.BathCount} Bathroom</P2>
                    </div>
                    <div className="flex h-[40px] w-[195px] items-center gap-2 rounded-lg bg-[#f3f1f1] px-2">
                      <P2>{apartment.Views || 0} Views</P2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {apartment && (
          <div className="flex flex-col gap-9">
            <BookingTable Limit={5} Filter={{ RoomId: apartment?.Id }} />
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default ApartmentPage;

