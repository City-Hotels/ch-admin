import { ApiResponse, Meta, deleteRequest, getRequest, patchRequest, postRequest } from "@/utils/api/calls";
import type { IPromotion, ISubscribers, ISubscribersUpdate, PromotionFilter, SubscriptionFilter } from "./payload";

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

const getPromotionSubcriptions = (
  filter: SubscriptionFilter
): Promise<
  ApiResponse<{
    Meta: Meta;
    Subscribers: ISubscribers[];
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
  return getRequest<{ Meta: Meta; Subscribers: ISubscribers[] }>({
    url: `/promotions/subscriptions?${args}`
  });
};

const getPromotion = (promotionId: string) => {
  return getRequest<IPromotion>({
    url: `/promotions/${promotionId}`
  });
};

const submitCampaign = (data: IPromotion) => {
  return postRequest<IPromotion, { Id: string }>({
    url: "/promotions/campaigns",
    data
  });
};

const updateSubscriptionStatus = (data: ISubscribersUpdate) => {
  return patchRequest({
    url: "/promotions/subscriptions/update-status",
    data
  });
};

const deleteSubscription = (subcriptionId: string) => {
  return deleteRequest({
    url: `/promotions/subscriptions/${subcriptionId}`,
  })
}


export {
  getMemberships,
  getCampaigns,
  submitCampaign,
  getPromotion,
  getPromotionSubcriptions,
  updateSubscriptionStatus,
  deleteSubscription
};
