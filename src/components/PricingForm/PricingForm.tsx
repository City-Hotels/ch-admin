import React, { useState } from "react";
import { H6, P, P2 } from "@/components/Headings/Headings";
import Checkbox from "@/components/Inputs/checkbox/Checkbox";
import { formatCurrencyNoSymbol } from "@/utils/helpers";
import styles from "./PricingForm.module.scss";
import type PricingFormsProps from "./PricingForm.props";
import Input from "../Inputs/Input/Input";

const PricingForm: React.FC<PricingFormsProps> = ({
  prices: { WeeklyRate, MonthlyRate, Price },
  hideDiscount,
  onUpdatePrices
}) => {
  const [deal, setDeal] = useState(false);

  const weeklyRate = (Price - (WeeklyRate / 100) * Price) * 7;
  const monthlyRate = (Price - (MonthlyRate / 100) * Price) * 28;

  return (
    <div className={styles.container}>
      <div>
        <H6 className="mb-2">Nightly Price</H6>
        <Input
          append="NGN"
          type="number"
          value={Price}
          onChange={(ev) =>
            onUpdatePrices({
              WeeklyRate,
              MonthlyRate,
              Price: Number(ev.currentTarget.value)
            })
          }
        />
      </div>

      <div>
        <H6 className="mt-5">Weekly rate</H6>
        <P2 className="text-white900">
          The following discount will apply to bookings which are for 7 or more
          nights
        </P2>

        <div className="flex flex-col items-center justify-between lg:flex-row lg:gap-5">
          <div className="w-full lg:w-1/2">
            <Input
              append="% Off"
              value={WeeklyRate}
              max={100}
              type="number"
              onChange={(ev) =>
                onUpdatePrices({
                  Price,
                  MonthlyRate,
                  WeeklyRate: Number(ev.currentTarget.value)
                })
              }
            />
          </div>
          <div className="w-full lg:w-1/2">
            <Input
              value={formatCurrencyNoSymbol(weeklyRate)}
              append="NGN"
              max={100}
              readOnly
            />
          </div>
        </div>
      </div>

      <div>
        <H6 className="mt-2">Monthly rate</H6>
        <P2 className=" text-white900">
          The following discount will apply to bookings which are for 28 or more
          nights
        </P2>

        <div className="flex  flex-col items-center justify-between lg:flex-row lg:gap-5">
          <div className="w-full lg:w-1/2">
            <Input
              append="% Off"
              value={MonthlyRate}
              min={0}
              max={100}
              type="number"
              onChange={(ev) =>
                onUpdatePrices({
                  Price,
                  WeeklyRate,
                  MonthlyRate: Number(ev.currentTarget.value)
                })
              }
            />
          </div>
          <div className="w-full lg:w-1/2">
            <Input
              value={formatCurrencyNoSymbol(monthlyRate)}
              append="NGN"
              min={0}
              max={100}
              readOnly
            />
          </div>
        </div>
      </div>

      {!hideDiscount && (
        <div className={`${styles.DealContainer}`}>
          <P className=" text-white900">
            Give guests a deal to get bookings and reviews faster.
          </P>

          <div className={`${styles.Deal}`}>
            <Checkbox
              label=""
              value={deal}
              onChange={() => setDeal(!deal)}
              className="my-4"
              name="close"
            />

            <P>Offer a 33% discount for your first 3 bookings</P>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingForm;
