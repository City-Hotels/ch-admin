import React from "react";
import Input from "@/components/formik/input/Input";
import { Formik } from "formik";
import { IPromotion } from "@/services/promotions/payload";
import { priceSchema } from "@/utils/formSchema";
import Button from "../Button/Button";

const initialValues: IPromotion = {
  Pricing: {
    BookingDiscount: 0,
    PricingType: 0,
    Rate: 0,
    Unit: ""
  },
  Created_at: {
    seconds: 0,
    nanos: 0
  },
  Updated_at: {
    seconds: 0,
    nanos: 0
  }
};

const onProceed = (values: IPromotion) => {
  console.log(values);
};

const Price = () => {
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onProceed}
        validationSchema={priceSchema}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <h2 className="font-medium text-black dark:text-white">
                  Pricing
                </h2>

                <div className="mb-4.5">
                  <Input
                    label="Booking Discount"
                    title="Booking Discount"
                    typeof="number"
                    required
                    name={"BookingDiscount"}
                  />
                </div>
                <div className="mb-4.5">
                  <Input
                    label="Rate"
                    title="Rate"
                    typeof="number"
                    required
                    name={"Rate"}
                  />
                </div>
                <div className="mb-4.5">
                  <Input label="Unit" title="Unit" typeof="text" name="Unit" />
                </div>

                <div className="my-6">
                  <h3 className="font-medium text-black dark:text-white">
                    Pricing Type
                  </h3>
                  <div className="mb-4.5 flex items-center gap-3">
                    <div className="flex items-center gap-3">
                      <label>Subscriptions</label>
                      <input
                        type="radio"
                        name="Pricing Type"
                        value={"Subscriptions"}
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <label>Commision</label>
                      <input
                        type="radio"
                        name="Pricing Type"
                        value={"Commision"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Button
              color="primary"
              size="lg"
              className="flex w-full justify-center rounded bg-primary400 p-3 font-medium text-gray hover:bg-opacity-90"
            >
              Next
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Price;
