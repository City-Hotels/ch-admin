import React from "react";
import PricingForm from "@/components/user/apartment/set-price/SetPrice";
import type { IPricingPayload } from "@/services/apartment/payload";
import UserLayout from "@/layout/user/User";
import { H3, P } from "@/components/shared/headings/Headings";
import Button from "@/components/shared/button/Button";
import { getApartment, updateApartmentPrice } from "@/services/apartment";
import queryKeys from "@/utils/api/queryKeys";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import ToastWrapper from "@/components/shared/toast/Toast";
import { toastIcons } from "@/utils/constants";
import { toast } from "react-hot-toast";

const EditApartmentPricing = () => {
  const router = useRouter();
  const { slug } = router.query;
  const apartmentId = slug ? slug.toString() : "";

  const { mutate, isLoading } = useMutation((payload: IPricingPayload) =>
    updateApartmentPrice(apartmentId, payload)
  );

  const [apartmentPrice, setApartmentPrice] = React.useState<IPricingPayload>({
    WeeklyRate: 0,
    Price: 0,
    MonthlyRate: 0
  });

  useQuery(
    [queryKeys.getApartmentByID],
    () => {
      const res = getApartment(slug?.toString());
      return res;
    },
    {
      onSuccess: (response) => {
        const { Price, WeeklyRate, MonthlyRate } = response.data.Pricing;

        // Set state based on response
        // eslint-disable-next-line no-console
        setApartmentPrice({ Price, WeeklyRate, MonthlyRate });
      },
      enabled: !!slug // Would only make this request if slug is truthy
    }
  );

  const onSubmit = () => {
    mutate(apartmentPrice, {
      onSuccess({ message }) {
        toast.success((t) => <ToastWrapper message={message} t={t} />, {
          icon: toastIcons.success
        });
      }
    });
  };

  return (
    <UserLayout>
      <div className="w-full lg:w-[556px]">
        <H3>Edit Prices</H3>
        <P className="mb-7 mt-5 text-white900">
          Choose your nightly room rates based on guests and other conditions.
        </P>
        <PricingForm
          hideDiscount={true}
          prices={{
            WeeklyRate: apartmentPrice.WeeklyRate,
            Price: apartmentPrice.Price,
            MonthlyRate: apartmentPrice.MonthlyRate
          }}
          onUpdatePrices={setApartmentPrice}
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
    </UserLayout>
  );
};

export default EditApartmentPricing;
