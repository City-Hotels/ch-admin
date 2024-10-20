import React from "react";
import Input from "@/components/formik/input/Input";
import { Formik } from "formik";
import { priceSchema } from "@/utils/formSchema";
import Button from "../Button/Button";
import { useRouter } from "next/navigation";
import FormProps from "./Account.props";
import { useMutation } from "react-query";
import { submitCampaign } from "@/services/promotions";
import { IPromotion } from "@/services/promotions/payload";

const Price: React.FC<FormProps> = ({ onSubmit, formInput }) => {
  const [isSubmitting, setSubmitting] = React.useState(false);
  const router = useRouter();


  const { mutate, isLoading: loading } = useMutation(submitCampaign);


  const handleSubmit = (values: IPromotion) => {
    setSubmitting(true);
    onSubmit(values);
    mutate(values, {
      onSuccess(res) {
        router.push(`/promotions/${res.data.Id}`);
      }
    });
  };

  return (
    <div className="px-6.5 pt-6">
      <Formik
        initialValues={formInput}
        onSubmit={handleSubmit}
        validationSchema={priceSchema}
      >
        {({ handleSubmit, errors, setFieldValue }) => {
          return (
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
                      type="number"
                      required
                      name={"Pricing.BookingDiscount"}
                      className="text-sm"
                    />
                  </div>
                  <div className="mb-4.5">
                    <Input
                      label="Rate"
                      title="Rate"
                      type="number"
                      required
                      name={"Pricing.Rate"}
                      className="text-sm"
                    />
                  </div>
                  <div className="mb-4.5">
                    <Input
                      label="Unit"
                      title="Unit"
                      type="text"
                      name={"Pricing.Unit"}
                      className="text-sm"
                    />
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
                          name={"PricingType"}
                          value={"Subscriptions"}
                          onChange={(ev) =>
                            ev.currentTarget.checked &&
                            setFieldValue("PricingType", 0)
                          }
                        />
                      </div>

                      <div className="flex items-center gap-3">
                        <label>Commision</label>
                        <input
                          type="radio"
                          name={"PricingType"}
                          value={"Commision"}
                          onChange={(ev) =>
                            ev.currentTarget.checked &&
                            setFieldValue("PricingType", 1)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  color="primary"
                  size="lg"
                  className="flex w-full justify-center rounded bg-primary400 p-3 font-medium text-gray hover:bg-opacity-90 mb-6"
                  type="submit"
                  isLoading={isSubmitting}
                >
                  Next
                </Button>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Price;
