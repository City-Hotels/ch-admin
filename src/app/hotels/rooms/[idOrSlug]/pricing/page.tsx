"use client"
import React from "react";
import queryKeys from "@/utils/api/queryKeys";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "react-query";
import { toastIcons } from "@/utils/constants";
import { toast } from "react-hot-toast";
import PricingForm from "@/components/PricingForm/PricingForm";
import ToastWrapper from "@/components/toast/Toast";
import { H3, P } from "@/components/Headings/Headings";
import Button from "@/components/Button/Button";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useParams } from "next/navigation";
import { IPricingPayload } from "@/services/room/payload";
import { getRoom, updateRoomPrice } from "@/services/room";

const EditRoomPricing = () => {
  const router = useRouter();
  const { idOrSlug } = useParams<{ idOrSlug: string }>();
  const roomId = idOrSlug ? idOrSlug.toString() : "";

  const { mutate, isLoading } = useMutation((payload: IPricingPayload) =>
    updateRoomPrice(roomId, payload)
  );

  const [roomPrice, setRoomPrice] = React.useState<IPricingPayload>({
    WeeklyRate: 0,
    Price: 0,
    MonthlyRate: 0
  });

  useQuery(
    [queryKeys.getRoomsByID],
    () => {
      const res = getRoom(idOrSlug?.toString());
      return res;
    },
    {
      onSuccess: (response) => {
        const { Price, WeeklyRate, MonthlyRate } = response.data.Pricing;

        // Set state based on response
        // eslint-disable-next-line no-console
        setRoomPrice({ Price, WeeklyRate, MonthlyRate });
      },
      enabled: !!idOrSlug // Would only make this request if idOrSlug is truthy
    }
  );

  const onSubmit = () => {
    mutate(roomPrice, {
      onSuccess({ message }) {
        toast.success((t) => <ToastWrapper message={message} t={t} />, {
          icon: toastIcons.success
        });
      }
    });
  };

  return (
    <DefaultLayout>
      <div className="w-full lg:w-[556px]">
        <H3>Edit Prices</H3>
        <P className="mb-7 mt-5 text-white900">
          Choose your nightly room rates based on guests and other conditions.
        </P>
        <PricingForm
          hideDiscount={true}
          prices={{
            WeeklyRate: roomPrice.WeeklyRate,
            Price: roomPrice.Price,
            MonthlyRate: roomPrice.MonthlyRate
          }}
          onUpdatePrices={setRoomPrice}
        />
        <div className="mt-11 flex justify-end gap-3">
          <Button size="sm" color="muted" onClick={router.back}>
            Cancel
          </Button>
          <Button
            size="sm"
            color="primary"
            onClick={onSubmit}
            isLoading={isLoading}
          >
            Save
          </Button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default EditRoomPricing;
