"use client";
import { H2, H3, H4, H5, Label, P2 } from "@/components/Headings/Headings";
import { getPromotion } from "@/services/promotions";
import {
  AccountType,
  IPromotion,
  PricingType,
  PromotionStatus
} from "@/services/promotions/payload";
import queryKeys from "@/utils/api/queryKeys";
import { useParams } from "next/navigation";
import React from "react";
import { useQuery } from "react-query";
import SubscriptionTable from "@/components/Subscribtions/SubscriptionTable";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Img from "@/components/Image/Image";
import dayjs from "dayjs";
import { convertGrpcDate } from "@/utils/helpers";

const CampaignPage = () => {
  const { idOrSlug } = useParams<{ idOrSlug: string }>();

  const { isLoading, data, isError } = useQuery(
    [queryKeys.getPromotionByID],
    () => getPromotion(idOrSlug?.toString()),
    {
      enabled: !!idOrSlug // Would only make this request if slug is truthy
    }
  );

  const promotion = data?.data as IPromotion;

  return (
    <DefaultLayout>
      {/* <div className="flex flex-col border border-solid border-grey20 rounded-lg w-full pb-1 bg-white mb-7">
        <div>
          <div className="flex items-start justify-between mt-2 mx-2">
            {promotion?.Medias && (
              <Img
                path={promotion?.Medias[0].Path}
                name="promotion image"
                className="w-27 h-25 rounded-lg"
              />
            )}

            <div>
              <H5 className="pt-2 text-[14px]">Name</H5>
              <P2 className="mb-4">{promotion?.Name}</P2>

              <H5 className="pt-2 text-[14px]">Location</H5>
              <P2 className="mb-4">
                {promotion?.Requirement?.Location?.Country}{" "}
                {promotion?.Requirement?.Location?.State}{" "}
                {promotion?.Requirement?.Location?.City}{" "}
                {promotion?.Requirement?.Location?.Street}
              </P2>

              <H5 className="pt-2 text-[14px]">Description</H5>
              <P2 className="mb-4">{promotion?.Description}</P2>

              <P2 weight="bold">Promotion ID: #{promotion?.Id}</P2>

              <P2>
                Max Participants:{" "}
                {promotion?.MaxParticipant
                  ? `${promotion?.MaxParticipant}`
                  : "0"}
              </P2>

              <div className="mt-4 lg:w-[405px]">
                <div className="mb-3 flex gap-3">
                  <Label className="border-b border-b-primary400 pb-1 text-primary400">
                    Requirements
                  </Label>
                </div>
                <div className=" grid grid-cols-2 gap-31 md:grid-cols-1 lg:grid-cols-2">
                  <div className="flex h-[40px] w-[250px] items-center gap-2 rounded-lg bg-[#f3f1f1] px-2">
                    <P2>
                      {" "}
                      {promotion?.Requirement?.MaximumBooking
                        ? `${promotion?.MaxParticipant} `
                        : "0"}{" "}
                      Maximum Bookings
                    </P2>
                  </div>
                  <div className="flex h-[40px] w-[250px] items-center gap-2 rounded-lg bg-[#f3f1f1] px-2">
                    <P2>
                      {" "}
                      {promotion?.Requirement?.MinimumBooking
                        ? `${promotion?.Requirement.MinimumBooking} `
                        : "0"}{" "}
                      Minimum Bookings
                    </P2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="w-full bg-white p-1 rounded grid grid-cols-1 md:grid-flow-row md:grid-cols-3 pb-4 mb-5">
        <div className="md:w[33%] px-2 flex flex-col gap-3">
          <div>
            <Label className="mb-1 text-sm">Name</Label>
            <P2 className="font-medium text-black">{promotion?.Name}</P2>
          </div>

          <div>
            <Label className="mb-1 text-sm">Id</Label>
            <P2 className="font-medium text-black">#{promotion?.Id}</P2>
          </div>

          <div>
            <Label className="mb-1 text-sm">Title</Label>
            <P2 className="font-medium text-black">{promotion?.Title}</P2>
          </div>

          <div>
            <Label className="mb-1 text-sm">Description</Label>
            <P2 className="font-medium text-black">{promotion?.Description}</P2>
          </div>

          <div>
            <Label className="mb-1 text-sm">Created At</Label>
            <P2 className="font-medium text-black">
              {promotion?.Created_at &&
                dayjs(convertGrpcDate(promotion?.Created_at)).format(
                  "DD/MM/YYYY"
                )}
            </P2>
          </div>

          <div>
            <Label className="mb-1 text-sm">Last Updated</Label>
            <P2 className="font-medium text-black">
              {promotion?.Updated_at &&
                dayjs(convertGrpcDate(promotion?.Updated_at)).format(
                  "DD/MM/YYYY"
                )}
            </P2>
          </div>

          <div>
            <Label className="mb-1 text-sm">Max Participants</Label>
            <P2 className="font-medium text-black">
              {promotion?.MaxParticipant ? `${promotion.MaxParticipant}` : "0"}
            </P2>
          </div>

          <div>
            <Label className="mb-1 text-sm">Promotion Status</Label>
            <P2 className="font-medium text-black">
              {promotion?.Status === PromotionStatus.INACTIVE && "Inactive"}
              {promotion?.Status === PromotionStatus.ACTIVE && "Active"}
              {promotion?.Status === PromotionStatus.EXPIRED && "Expired"}
            </P2>
          </div>
        </div>

        <div className="md:w[33%]  mt-7 md:mt-0 md:border-solid md:border-x md:border-x-neutral-40 px-2">
          <H3 className="mb-3 md:mb-6">Requirements</H3>

          <div className="flex flex-col gap-3">
            <div>
              <Label className="mb-1 text-sm">Location</Label>
              <P2 className="font-medium text-black">
                {promotion?.Requirement?.Location.Country}{" "}
                {promotion?.Requirement?.Location.State}{" "}
                {promotion?.Requirement?.Location.City}{" "}
                {promotion?.Requirement?.Location.Street}
              </P2>
            </div>

            <div>
              <Label className="mb-1 text-sm">Maximum Bookings</Label>
              <P2 className="font-medium text-black">
                {promotion?.Requirement?.MaximumBooking
                  ? `${promotion?.Requirement?.MaximumBooking}`
                  : "0"}
              </P2>
            </div>

            <div>
              <Label className="mb-1 text-sm">Minimum Bookings</Label>
              <P2 className="font-medium text-black">
                {promotion?.Requirement?.MaximumBooking
                  ? `${promotion?.Requirement?.MaximumBooking}`
                  : "0"}
              </P2>
            </div>

            <div>
              <Label className="mb-1 text-sm">Account Type</Label>
              <P2 className="font-medium text-black">
                {promotion?.Requirement?.Account === AccountType.PLATINUM &&
                  "Platinum"}
                {promotion?.Requirement?.Account === AccountType.PREMEIUM &&
                  "Premeium"}
                {promotion?.Requirement?.Account === AccountType.STANDARD &&
                  "Standard"}
              </P2>
            </div>
          </div>
        </div>

        <div className="md:w[33%] mt-7 md:mt-0 px-2">
          <H3 className="mb-3 md:mb-6">Price</H3>

          <div className="flex flex-col gap-3">
            <div>
              <Label className="mb-1 text-sm">Booking Discount</Label>
              <P2 className="font-medium text-black">
                {promotion?.Pricing?.BookingDiscount}
              </P2>
            </div>

            <div>
              <Label className="mb-1 text-sm">Rate</Label>
              <P2 className="font-medium text-black">
                {promotion?.Pricing?.Rate}
              </P2>
            </div>

            <div>
              <Label className="mb-1 text-sm">Unit</Label>
              <P2 className="font-medium text-black">
                {promotion?.Pricing?.Unit}
              </P2>
            </div>

            <div>
              <Label className="mb-1 text-sm">Account Type</Label>
              <P2 className="font-medium text-black">
                {promotion?.Pricing?.PricingType === PricingType.BASIC &&
                  "Basic"}
                {promotion?.Pricing?.PricingType === PricingType.LUXURY &&
                  "Luxury"}
              </P2>
            </div>
          </div>
        </div>
      </div>

      <SubscriptionTable Limit={5} Filter={{}} />
    </DefaultLayout>
  );
};

export default CampaignPage;
