import { ApiResponse, Meta, getRequest, postRequest } from "@/utils/api/calls";
import type { IPromotion, PromotionFilter } from "./payload";

const getMemberships = (
  filter: PromotionFilter
): Promise<
  ApiResponse<{
    Meta: Meta;
    Promotions: IPromotion[];
  }>
> => {
  const args = Object.keys(filter)
    .map(
      (item) =>
        `${encodeURIComponent(item)}=${encodeURIComponent(
          (filter as any)[item]
        )}`
    )
    .join("&");
  return getRequest<{ Meta: Meta; Promotions: IPromotion[] }>({
    url: `/promotions/memberships?${args}`
  });
};

const getCampaigns = (
  filter: PromotionFilter
): Promise<
  ApiResponse<{
    Meta: Meta;
    Promotions: IPromotion[];
  }>
> => {
  const args = Object.keys(filter)
    .map(
      (item) =>
        `${encodeURIComponent(item)}=${encodeURIComponent(
          (filter as any)[item]
        )}`
    )
    .join("&");
  return getRequest<{ Meta: Meta; Promotions: IPromotion[] }>({
    url: `/promotions/campaigns?${args}`
  });
};

const submitCampaign = (data: IPromotion) => {
  return postRequest<IPromotion, { Id: string }>({
    url: "/promotions/campaigns",
    data
  });
};

export { getMemberships, getCampaigns, submitCampaign };
