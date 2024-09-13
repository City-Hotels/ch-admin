"use client"
import { H1 } from '@/components/Headings/Headings';
import { getPromotion } from '@/services/promotions';
import { IPromotion } from '@/services/promotions/payload';
import queryKeys from '@/utils/api/queryKeys';
import { useParams } from 'next/navigation';
import React from 'react'
import { useQuery } from 'react-query';

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
    <div>
        <H1>{promotion?.Name}</H1>
    </div>
  )
}

export default CampaignPage