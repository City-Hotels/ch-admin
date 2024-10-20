"use client";
import { P2 } from "@/components/Headings/Headings";
import { getPromotion } from "@/services/promotions";
import { IPromotion } from "@/services/promotions/payload";
import queryKeys from "@/utils/api/queryKeys";
import { useParams } from "next/navigation";
import React from "react";
import { useQuery } from "react-query";
import SubscriptionTable from "@/components/Subscribtions/SubscriptionTable";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import PromotionGrid from "@/components/PromotionGrid/PromotionGrid";

const CampaignPage = () => {
  const { idOrSlug } = useParams<{ idOrSlug: string }>();

  const { isLoading, data, isError } = useQuery(
    [queryKeys.getPromotionByID, idOrSlug],
    () => getPromotion(idOrSlug?.toString()),
    {
      enabled: !!idOrSlug // Would only make this request if slug is truthy
    }
  );

  const promotion = data?.data as IPromotion;

  return (
    <DefaultLayout>
      {isLoading && <P2 className="mb-2">Loading..</P2>}
      {isError && "Failed to load Promotions"}
      {promotion && <PromotionGrid promotion={promotion} />}

      {promotion && (
        <SubscriptionTable Limit={5} Filter={{ PromotionId: promotion?.Id }} />
      )}
    </DefaultLayout>
  );
};

export default CampaignPage;
