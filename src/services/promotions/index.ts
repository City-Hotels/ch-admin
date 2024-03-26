import { ApiResponse, Meta, getRequest } from "@/utils/api/calls";
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

export { getMemberships };
