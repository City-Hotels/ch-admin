import {
  PromotionStatus,
  AccountType,
  PricingType
} from "@/services/promotions/payload";
import { convertGrpcDate } from "@/utils/helpers";
import dayjs from "dayjs";
import React from "react";
import { Label, P2, H3, H5 } from "../Headings/Headings";
import PromotionGridProps from "./PromotionGrid.props";
import styles from "./PromotionGrid.module.scss";
import PromotionTable from "../Promotion/Promotion";

const PromotionGrid: React.FC<PromotionGridProps> = ({ promotion }) => {
  return (
    <div>
      <div className={`${styles.promotionGridContainer}`}>
        <div>
          <H3 className="mb-3 md:mb-6">Promotion</H3>

          <div className="md:px-2 flex flex-col gap-3">
            <div className={`${styles.promotionInnerGrid}`}>
              <div className="flex flex-col gap-3">
                <div>
                  <Label className={`${styles.promotionLabel}`}>Name</Label>
                  <P2 className={`${styles.promotionValue}`}>
                    {promotion?.Name ? promotion?.Name : "No Name"}
                  </P2>
                </div>

                <div>
                  <Label className={`${styles.promotionLabel}`}>
                    Description
                  </Label>
                  <P2 className={`${styles.promotionValue}`}>
                    {promotion?.Description
                      ? promotion?.Description
                      : "No Description"}
                  </P2>
                </div>

                <div>
                  <Label className={`${styles.promotionLabel}`}>Title</Label>
                  <P2 className={`${styles.promotionValue}`}>
                    {promotion?.Title}
                  </P2>
                </div>
              </div>

              <div className="md:px-2 flex flex-col gap-3">
                <div>
                  <Label className={`${styles.promotionLabel}`}>Id</Label>
                  <P2 className={`${styles.promotionValue}`}>
                    #{promotion?.Id}
                  </P2>
                </div>

                <div>
                  <Label className={`${styles.promotionLabel}`}>
                    Created At
                  </Label>
                  <P2 className={`${styles.promotionValue}`}>
                    {promotion?.Created_at &&
                      dayjs(convertGrpcDate(promotion?.Created_at)).format(
                        "DD/MM/YYYY"
                      )}
                  </P2>
                </div>

                <div>
                  <Label className={`${styles.promotionLabel}`}>
                    Last Updated
                  </Label>
                  <P2 className={`${styles.promotionValue}`}>
                    {promotion?.Updated_at &&
                      dayjs(convertGrpcDate(promotion?.Updated_at)).format(
                        "DD/MM/YYYY"
                      )}
                  </P2>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div>
                  <Label className={`${styles.promotionLabel}`}>
                    Max Participants
                  </Label>
                  <P2 className={`${styles.promotionValue}`}>
                    {promotion?.MaxParticipant
                      ? `${promotion.MaxParticipant}`
                      : "0"}
                  </P2>
                </div>

                <div>
                  <Label className={`${styles.promotionLabel}`}>
                    Promotion Status
                  </Label>
                  <P2 className={`${styles.promotionValue}`}>
                    {promotion?.Status === PromotionStatus.INACTIVE ||
                      (!promotion?.Status && "Inactive")}
                    {promotion?.Status === PromotionStatus.ACTIVE && "Active"}
                    {promotion?.Status === PromotionStatus.EXPIRED && "Expired"}
                  </P2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-7 md:mt-0 md:px-2">
          <H3 className="mb-3 md:mb-6">Requirements</H3>

          <div className="md:px-2 flex flex-col gap-3">
            <div className={`${styles.promotionInnerGrid}`}>
              <div className="flex flex-col gap-3">
                <div>
                  <Label className={`${styles.promotionLabel}`}>Location</Label>
                  <P2 className={`${styles.promotionValue}`}>
                    {promotion?.Requirement?.Location?.Country}{" "}
                    {promotion?.Requirement?.Location?.State}{" "}
                    {promotion?.Requirement?.Location?.City}{" "}
                    {promotion?.Requirement?.Location?.Street}
                  </P2>
                </div>

                <div>
                  <Label className={`${styles.promotionLabel}`}>
                    Maximum Bookings
                  </Label>
                  <P2 className={`${styles.promotionValue}`}>
                    {promotion?.Requirement?.MaximumBooking
                      ? `${promotion?.Requirement?.MaximumBooking}`
                      : 0}
                  </P2>
                </div>
              </div>

              <div className="md:px-2 flex flex-col gap-3">
                <div>
                  <Label className={`${styles.promotionLabel}`}>
                    Minimum Bookings
                  </Label>
                  <P2 className={`${styles.promotionValue}`}>
                    {promotion?.Requirement?.MaximumBooking
                      ? `${promotion?.Requirement?.MaximumBooking}`
                      : 0}
                  </P2>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div>
                  <Label className={`${styles.promotionLabel}`}>
                    Account Type
                  </Label>
                  <P2 className={`${styles.promotionValue}`}>
                    {promotion?.Requirement?.Account === AccountType.STANDARD ||
                      (!promotion?.Requirement?.Account && "Standard")}
                    {promotion?.Requirement?.Account === AccountType.PREMEIUM &&
                      "Premium"}
                    {promotion?.Requirement?.Account === AccountType.PLATINUM &&
                      "Platinum"}
                  </P2>
                </div>
              </div>
            </div>
          </div>

          {promotion &&
          promotion.Requirement &&
          promotion.Requirement.Promotions &&
          promotion.Requirement.Promotions?.length > 0 ? (
            <div className="mb-6">
              <PromotionTable Limit={5} Filter={{}} Promotion={promotion} />
            </div>
          ) : (
            <div className="my-5">
              <H5>No Promotions</H5>
            </div>
          )}
        </div>

        <div className=" mt-7 md:mt-0 md:px-2">
          <H3 className="mb-3 md:mb-6">Price</H3>

          <div className="md:px-2 flex flex-col gap-3">
            <div className={`${styles.promotionInnerGrid}`}>
              <div className="flex flex-col gap-3">
                <div>
                  <Label className={`${styles.promotionLabel}`}>
                    Booking Discount
                  </Label>
                  <P2 className={`${styles.promotionValue}`}>
                    {promotion?.Pricing?.BookingDiscount
                      ? promotion.Pricing?.BookingDiscount
                      : 0}
                  </P2>
                </div>

                <div>
                  <Label className={`${styles.promotionLabel}`}>
                    Pricing Type
                  </Label>
                  <P2 className={`${styles.promotionValue}`}>
                    {promotion?.Pricing?.PricingType ===
                      PricingType.COMMISION && "Commision"}
                    {promotion?.Pricing?.PricingType ===
                      PricingType.SUBSCRIPTION && "Subscription"}
                  </P2>
                </div>
              </div>

              <div className="md:px-2 flex flex-col gap-3">
                <div>
                  <Label className={`${styles.promotionLabel}`}>Rate</Label>
                  <P2 className={`${styles.promotionValue}`}>
                    {promotion?.Pricing?.Rate ? promotion?.Pricing?.Rate : 0}
                  </P2>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div>
                  <Label className={`${styles.promotionLabel}`}>Unit</Label>
                  <P2 className={`${styles.promotionValue}`}>
                    {promotion?.Pricing?.Unit
                      ? promotion?.Pricing?.Unit
                      : "No unit"}
                  </P2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionGrid;
